use anchor_lang::prelude::*;

use crate::constants::*;
use crate::state::{MilestoneMarket, MarketStatus, Project};

#[derive(Accounts)]
pub struct ClaimNoShares<'info> {
    #[account(mut)]
    pub claimer: Signer<'info>,

    #[account(
        seeds = [PROJECT_SEED, project.artist.as_ref(), &project.project_id.to_le_bytes()],
        bump = project.bump,
    )]
    pub project: Account<'info, Project>,

    #[account(
        mut,
        has_one = project,
        constraint = milestone_market.status == MarketStatus::Resolved @ crate::error::ErrorCode::MarketNotResolved,
        seeds = [MILESTONE_SEED, project.key().as_ref(), &[milestone_market.milestone_id]],
        bump = milestone_market.bump,
    )]
    pub milestone_market: Account<'info, MilestoneMarket>,

    /// SOL vault PDA (holds locked milestone funds on FAIL)
    /// CHECK: Validated by seeds
    #[account(
        mut,
        seeds = [VAULT_SEED, project.key().as_ref()],
        bump,
    )]
    pub milestone_vault: SystemAccount<'info>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<ClaimNoShares>, shares: u64) -> Result<()> {
    let market = &ctx.accounts.milestone_market;

    // Milestone must have failed for NO claimers to get refund
    let yes_price_bps = market.yes_price_bps();
    require!(
        yes_price_bps < TWAP_PASS_THRESHOLD_BPS,
        crate::error::ErrorCode::MilestonePassed
    );

    require!(shares > 0, crate::error::ErrorCode::InsufficientShares);
    require!(
        shares <= market.total_no_shares,
        crate::error::ErrorCode::InsufficientShares
    );

    // Payout proportional to NO shares from locked funds:
    // payout = (shares / total_no_shares) * funds_locked
    let payout = (shares as u128)
        .checked_mul(market.funds_locked as u128)
        .ok_or(crate::error::ErrorCode::Overflow)?
        .checked_div(market.total_no_shares as u128)
        .ok_or(crate::error::ErrorCode::Overflow)? as u64;

    require!(payout > 0, crate::error::ErrorCode::NothingToClaim);

    // Transfer from vault to claimer
    let _project_key = ctx.accounts.project.key();
    let vault_info = ctx.accounts.milestone_vault.to_account_info();
    let claimer_info = ctx.accounts.claimer.to_account_info();
    **vault_info.try_borrow_mut_lamports()? -= payout;
    **claimer_info.try_borrow_mut_lamports()? += payout;

    // Reduce total shares
    let market_mut = &mut ctx.accounts.milestone_market;
    market_mut.total_no_shares = market_mut
        .total_no_shares
        .checked_sub(shares)
        .ok_or(crate::error::ErrorCode::Overflow)?;

    msg!("NO claim: {} shares → {} lamports refund", shares, payout);

    Ok(())
}
