use anchor_lang::prelude::*;

use crate::constants::*;
use crate::state::{MilestoneMarket, MarketStatus, Project};

#[derive(Accounts)]
pub struct SubmitMilestoneProof<'info> {
    #[account(mut)]
    pub artist: Signer<'info>,

    #[account(
        has_one = artist,
        seeds = [PROJECT_SEED, artist.key().as_ref(), &project.project_id.to_le_bytes()],
        bump = project.bump,
    )]
    pub project: Account<'info, Project>,

    #[account(
        mut,
        has_one = project,
        constraint = milestone_market.status == MarketStatus::Open @ crate::error::ErrorCode::InvalidMarketState,
        seeds = [MILESTONE_SEED, project.key().as_ref(), &[milestone_market.milestone_id]],
        bump = milestone_market.bump,
    )]
    pub milestone_market: Account<'info, MilestoneMarket>,
}

pub fn handler(ctx: Context<SubmitMilestoneProof>, proof_ipfs: String) -> Result<()> {
    require!(
        !proof_ipfs.is_empty(),
        crate::error::ErrorCode::NoProof
    );
    require!(
        proof_ipfs.len() <= MilestoneMarket::MAX_IPFS_LEN,
        crate::error::ErrorCode::NoProof
    );

    let clock = Clock::get()?;
    let market = &mut ctx.accounts.milestone_market;

    market.proof_ipfs = proof_ipfs;
    market.status = MarketStatus::ProofSubmitted;
    market.twap_start = clock.unix_timestamp;

    msg!(
        "Milestone {} proof submitted, TWAP window starts at {}",
        market.milestone_id,
        market.twap_start
    );

    Ok(())
}
