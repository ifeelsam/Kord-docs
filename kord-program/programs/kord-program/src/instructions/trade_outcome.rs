use anchor_lang::prelude::*;
use anchor_lang::system_program;

use crate::constants::*;
use crate::events::OutcomeTraded;
use crate::state::{MilestoneMarket, MarketStatus, Project};

#[derive(Accounts)]
pub struct TradeOutcome<'info> {
    #[account(mut)]
    pub trader: Signer<'info>,

    #[account(
        seeds = [PROJECT_SEED, project.artist.as_ref(), &project.project_id.to_le_bytes()],
        bump = project.bump,
    )]
    pub project: Account<'info, Project>,

    #[account(
        mut,
        has_one = project,
        constraint = milestone_market.status == MarketStatus::Open || 
                     milestone_market.status == MarketStatus::ProofSubmitted 
                     @ crate::error::ErrorCode::MarketClosed,
        seeds = [MILESTONE_SEED, project.key().as_ref(), &[milestone_market.milestone_id]],
        bump = milestone_market.bump,
    )]
    pub milestone_market: Account<'info, MilestoneMarket>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<TradeOutcome>, is_yes: bool, amount: u64) -> Result<()> {
    require!(amount > 0, crate::error::ErrorCode::MinContribution);

    let market = &ctx.accounts.milestone_market;

    // Constant product AMM: x * y = k
    // Trader deposits `amount` into one pool, receives shares from the other
    let (input_pool, output_pool) = if is_yes {
        (market.yes_pool, market.no_pool)
    } else {
        (market.no_pool, market.yes_pool)
    };

    // k = input_pool * output_pool
    let k = input_pool
        .checked_mul(output_pool)
        .ok_or(crate::error::ErrorCode::Overflow)?;

    // New input pool = input_pool + amount
    let new_input = input_pool
        .checked_add(amount)
        .ok_or(crate::error::ErrorCode::Overflow)?;

    // New output pool = k / new_input
    let new_output = k
        .checked_div(new_input)
        .ok_or(crate::error::ErrorCode::Overflow)?;

    // Shares received = output_pool - new_output
    let shares_received = output_pool
        .checked_sub(new_output)
        .ok_or(crate::error::ErrorCode::Overflow)?;

    require!(shares_received > 0, crate::error::ErrorCode::InsufficientShares);

    // Transfer SOL from trader to market account
    system_program::transfer(
        CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.trader.to_account_info(),
                to: ctx.accounts.milestone_market.to_account_info(),
            },
        ),
        amount,
    )?;

    // Update pools on the mutable reference
    let market_mut = &mut ctx.accounts.milestone_market;
    if is_yes {
        market_mut.yes_pool = new_input;
        market_mut.no_pool = new_output;
        market_mut.total_yes_shares = market_mut
            .total_yes_shares
            .checked_add(shares_received)
            .ok_or(crate::error::ErrorCode::Overflow)?;
    } else {
        market_mut.no_pool = new_input;
        market_mut.yes_pool = new_output;
        market_mut.total_no_shares = market_mut
            .total_no_shares
            .checked_add(shares_received)
            .ok_or(crate::error::ErrorCode::Overflow)?;
    }

    emit!(OutcomeTraded {
        trader: ctx.accounts.trader.key(),
        market: market_mut.key(),
        is_yes,
        amount,
        shares_received,
    });

    Ok(())
}
