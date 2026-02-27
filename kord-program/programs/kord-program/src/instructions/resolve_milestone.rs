use anchor_lang::prelude::*;

use crate::constants::*;
use crate::events::MilestoneResolved;
use crate::state::{MilestoneMarket, MarketStatus, Project};

#[derive(Accounts)]
pub struct ResolveMilestone<'info> {
    #[account(mut)]
    pub resolver: Signer<'info>,

    #[account(
        mut,
        seeds = [PROJECT_SEED, project.artist.as_ref(), &project.project_id.to_le_bytes()],
        bump = project.bump,
    )]
    pub project: Account<'info, Project>,

    #[account(
        mut,
        has_one = project,
        constraint = milestone_market.status == MarketStatus::ProofSubmitted @ crate::error::ErrorCode::InvalidMarketState,
        seeds = [MILESTONE_SEED, project.key().as_ref(), &[milestone_market.milestone_id]],
        bump = milestone_market.bump,
    )]
    pub milestone_market: Account<'info, MilestoneMarket>,

    /// Artist wallet to receive funds on PASS
    /// CHECK: Validated against project.artist
    #[account(
        mut,
        constraint = artist_wallet.key() == project.artist @ crate::error::ErrorCode::Unauthorized,
    )]
    pub artist_wallet: SystemAccount<'info>,

    /// SOL vault PDA
    /// CHECK: Validated by seeds
    #[account(
        mut,
        seeds = [VAULT_SEED, project.key().as_ref()],
        bump,
    )]
    pub milestone_vault: SystemAccount<'info>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<ResolveMilestone>) -> Result<()> {
    let clock = Clock::get()?;
    let market = &ctx.accounts.milestone_market;

    // Check TWAP window has elapsed
    let elapsed = clock
        .unix_timestamp
        .checked_sub(market.twap_start)
        .ok_or(crate::error::ErrorCode::Overflow)?;

    require!(
        elapsed >= market.twap_window as i64,
        crate::error::ErrorCode::TwapNotReady
    );

    // Calculate TWAP (simplified: snapshot price at resolution time)
    // Yes_Price = no_pool / (yes_pool + no_pool) in bps
    let yes_price_bps = market.yes_price_bps();
    let passed = yes_price_bps >= TWAP_PASS_THRESHOLD_BPS;

    let payout_amount = market.funds_locked;

    if passed {
        // PASS: Transfer locked funds to artist


        let vault_info = ctx.accounts.milestone_vault.to_account_info();
        let artist_info = ctx.accounts.artist_wallet.to_account_info();
        **vault_info.try_borrow_mut_lamports()? -= payout_amount;
        **artist_info.try_borrow_mut_lamports()? += payout_amount;
    }
    // On FAIL: funds remain in vault for NO share holders to claim

    // Mark market as resolved
    let market_mut = &mut ctx.accounts.milestone_market;
    market_mut.status = MarketStatus::Resolved;

    // Check if all milestones complete → update project status
    // (Simplified: just emit for now; a full impl would check all markets)

    emit!(MilestoneResolved {
        market: market_mut.key(),
        passed,
        payout_amount,
    });

    msg!(
        "Milestone {} resolved: passed={}, yes_price_bps={}, payout={}",
        market_mut.milestone_id,
        passed,
        yes_price_bps,
        payout_amount,
    );

    Ok(())
}
