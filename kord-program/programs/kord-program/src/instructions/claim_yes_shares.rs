use anchor_lang::prelude::*;

use crate::constants::*;
use crate::state::{MilestoneMarket, MarketStatus, Project};

/// Tracks how many shares a user holds (stored off-chain or via a separate account in full impl)
/// For simplicity, we pass the shares amount and verify via the market's total
#[derive(Accounts)]
pub struct ClaimYesShares<'info> {
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

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<ClaimYesShares>, shares: u64) -> Result<()> {
    let market = &ctx.accounts.milestone_market;

    // Milestone must have passed for YES claimers to profit
    let yes_price_bps = market.yes_price_bps();
    require!(
        yes_price_bps >= TWAP_PASS_THRESHOLD_BPS,
        crate::error::ErrorCode::MilestoneFailed
    );

    require!(shares > 0, crate::error::ErrorCode::InsufficientShares);
    require!(
        shares <= market.total_yes_shares,
        crate::error::ErrorCode::InsufficientShares
    );

    // Payout proportional to YES shares:
    // payout = (shares / total_yes_shares) * remaining pool funds in market account
    let market_lamports = ctx.accounts.milestone_market.to_account_info().lamports();
    let min_rent = Rent::get()?.minimum_balance(MilestoneMarket::SIZE);
    let available = market_lamports.saturating_sub(min_rent);

    let payout = (shares as u128)
        .checked_mul(available as u128)
        .ok_or(crate::error::ErrorCode::Overflow)?
        .checked_div(market.total_yes_shares as u128)
        .ok_or(crate::error::ErrorCode::Overflow)? as u64;

    require!(payout > 0, crate::error::ErrorCode::NothingToClaim);

    // Transfer from market account to claimer
    let market_info = ctx.accounts.milestone_market.to_account_info();
    let claimer_info = ctx.accounts.claimer.to_account_info();
    **market_info.try_borrow_mut_lamports()? -= payout;
    **claimer_info.try_borrow_mut_lamports()? += payout;

    // Reduce total shares
    let market_mut = &mut ctx.accounts.milestone_market;
    market_mut.total_yes_shares = market_mut
        .total_yes_shares
        .checked_sub(shares)
        .ok_or(crate::error::ErrorCode::Overflow)?;

    msg!("YES claim: {} shares → {} lamports", shares, payout);

    Ok(())
}
