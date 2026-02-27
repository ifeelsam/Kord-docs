use anchor_lang::prelude::*;

use crate::constants::*;
use crate::events::MilestoneMarketCreated;
use crate::state::{MilestoneMarket, MarketStatus, Project, ProjectStatus};

#[derive(Accounts)]
#[instruction(milestone_id: u8)]
pub struct CreateMilestoneMarket<'info> {
    #[account(mut)]
    pub artist: Signer<'info>,

    #[account(
        mut,
        has_one = artist,
        constraint = project.status == ProjectStatus::Funded @ crate::error::ErrorCode::ProjectNotFunded,
        seeds = [PROJECT_SEED, artist.key().as_ref(), &project.project_id.to_le_bytes()],
        bump = project.bump,
    )]
    pub project: Account<'info, Project>,

    #[account(
        init,
        payer = artist,
        space = MilestoneMarket::SIZE,
        seeds = [MILESTONE_SEED, project.key().as_ref(), &[milestone_id]],
        bump,
    )]
    pub milestone_market: Account<'info, MilestoneMarket>,

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

pub fn handler(ctx: Context<CreateMilestoneMarket>, milestone_id: u8) -> Result<()> {
    let project = &ctx.accounts.project;

    // Validate milestone_id exists
    require!(
        (milestone_id as usize) < project.milestones.len(),
        crate::error::ErrorCode::InvalidMilestone
    );

    let milestone = &project.milestones[milestone_id as usize];

    // Calculate funds to lock: (project.raised * milestone.allocation_bps) / 10000
    let funds_locked = project
        .raised
        .checked_mul(milestone.allocation_bps)
        .ok_or(crate::error::ErrorCode::Overflow)?
        .checked_div(10_000)
        .ok_or(crate::error::ErrorCode::Overflow)?;

    // Initialize the market
    let market = &mut ctx.accounts.milestone_market;
    market.project = project.key();
    market.milestone_id = milestone_id;
    market.funds_locked = funds_locked;
    // Initialize pools with equal liquidity (seed liquidity)
    let seed_liquidity = funds_locked / 10; // 10% of locked funds as seed
    market.yes_pool = seed_liquidity;
    market.no_pool = seed_liquidity;
    market.twap_window = TWAP_WINDOW;
    market.twap_start = 0;
    market.proof_ipfs = String::new();
    market.status = MarketStatus::Open;
    market.total_yes_shares = 0;
    market.total_no_shares = 0;
    market.bump = ctx.bumps.milestone_market;

    emit!(MilestoneMarketCreated {
        project: project.key(),
        milestone_id,
        funds_locked,
    });

    Ok(())
}
