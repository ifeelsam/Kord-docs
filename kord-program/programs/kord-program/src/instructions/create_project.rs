use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token};

use crate::constants::*;
use crate::events::ProjectCreated;
use crate::state::{
    AnchorAccount, ArtistVesting, Milestone, Project, ProjectStatus, TokenAllocations,
};

#[derive(Accounts)]
#[instruction(project_id: u64, goal: u64, milestones: Vec<Milestone>)]
pub struct CreateProject<'info> {
    #[account(mut)]
    pub artist: Signer<'info>,

    #[account(
        init,
        payer = artist,
        space = Project::space(milestones.len()),
        seeds = [PROJECT_SEED, artist.key().as_ref(), &project_id.to_le_bytes()],
        bump,
    )]
    pub project: Account<'info, Project>,

    #[account(
        init,
        payer = artist,
        mint::decimals = TOKEN_DECIMALS,
        mint::authority = project,
    )]
    pub token_mint: Account<'info, Mint>,

    /// SOL vault for the project (PDA-owned)
    /// CHECK: This is a PDA used as a SOL vault, validated by seeds
    #[account(
        mut,
        seeds = [VAULT_SEED, project.key().as_ref()],
        bump,
    )]
    pub milestone_vault: SystemAccount<'info>,

    #[account(
        init,
        payer = artist,
        space = AnchorAccount::SIZE,
        seeds = [ANCHOR_SEED, project.key().as_ref()],
        bump,
    )]
    pub anchor_account: Account<'info, AnchorAccount>,

    #[account(
        init,
        payer = artist,
        space = ArtistVesting::SIZE,
        seeds = [VESTING_SEED, project.key().as_ref()],
        bump,
    )]
    pub artist_vesting: Account<'info, ArtistVesting>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handler(
    ctx: Context<CreateProject>,
    project_id: u64,
    goal: u64,
    milestones: Vec<Milestone>,
) -> Result<()> {
    // Validate milestones: allocations must sum to 10000 bps
    let total_bps: u64 = milestones.iter().map(|m| m.allocation_bps).sum();
    require!(total_bps == 10_000, crate::error::ErrorCode::InvalidMilestone);
    require!(
        milestones.len() <= Project::MAX_MILESTONES,
        crate::error::ErrorCode::InvalidMilestone
    );

    let clock = Clock::get()?;
    let project = &mut ctx.accounts.project;

    project.artist = ctx.accounts.artist.key();
    project.token_mint = ctx.accounts.token_mint.key();
    project.milestone_vault = ctx.accounts.milestone_vault.key();
    project.lp_account = Pubkey::default(); // Set later when LP initialized
    project.goal = goal;
    project.raised = 0;
    project.status = ProjectStatus::Active;
    project.milestones = milestones;
    project.allocations = TokenAllocations::default();
    project.bump = ctx.bumps.project;
    project.project_id = project_id;
    project.created_at = clock.unix_timestamp;

    // Initialize anchor account
    let anchor_acc = &mut ctx.accounts.anchor_account;
    anchor_acc.project = project.key();
    anchor_acc.total_deposited = 0;
    anchor_acc.lp_value = 0;
    anchor_acc.bump = ctx.bumps.anchor_account;

    // Initialize artist vesting
    let vesting = &mut ctx.accounts.artist_vesting;
    vesting.project = project.key();
    vesting.artist = ctx.accounts.artist.key();
    vesting.total_allocation = 0; // Set during initialize_token_allocations
    vesting.claimed = 0;
    vesting.start_ts = clock.unix_timestamp;
    vesting.duration = VESTING_DURATION;
    vesting.bump = ctx.bumps.artist_vesting;

    emit!(ProjectCreated {
        artist: ctx.accounts.artist.key(),
        project_id,
        goal,
        token_mint: ctx.accounts.token_mint.key(),
    });

    Ok(())
}
