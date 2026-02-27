use anchor_lang::prelude::*;
use anchor_spl::token::{self, Burn, Mint, Token, TokenAccount};

use crate::constants::*;
use crate::state::{Project, ProjectStatus};

#[derive(Accounts)]
pub struct EmergencyRefund<'info> {
    #[account(mut)]
    pub contributor: Signer<'info>,

    #[account(
        mut,
        constraint = project.status == ProjectStatus::Active @ crate::error::ErrorCode::ProjectNotActive,
        seeds = [PROJECT_SEED, project.artist.as_ref(), &project.project_id.to_le_bytes()],
        bump = project.bump,
    )]
    pub project: Account<'info, Project>,

    /// SOL vault PDA
    /// CHECK: Validated by seeds
    #[account(
        mut,
        seeds = [VAULT_SEED, project.key().as_ref()],
        bump,
    )]
    pub milestone_vault: SystemAccount<'info>,

    /// Contributor's token account (tokens to burn)
    #[account(
        mut,
        token::mint = token_mint,
        token::authority = contributor,
    )]
    pub contributor_token_account: Account<'info, TokenAccount>,

    /// Token mint
    #[account(
        mut,
        address = project.token_mint,
    )]
    pub token_mint: Account<'info, Mint>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<EmergencyRefund>) -> Result<()> {
    let project = &ctx.accounts.project;

    // Only allow refund if raised < 5% of goal
    let threshold = project
        .goal
        .checked_mul(MIN_FUND_PCT_FOR_REFUND)
        .ok_or(crate::error::ErrorCode::Overflow)?
        .checked_div(100)
        .ok_or(crate::error::ErrorCode::Overflow)?;

    require!(
        project.raised < threshold,
        crate::error::ErrorCode::RefundThresholdExceeded
    );

    let contributor_tokens = ctx.accounts.contributor_token_account.amount;
    require!(
        contributor_tokens > 0,
        crate::error::ErrorCode::InsufficientShares
    );

    // Calculate SOL refund: tokens * PRICE_PER_TOKEN_LAMPORTS / 10^decimals
    let refund_amount = contributor_tokens
        .checked_mul(PRICE_PER_TOKEN_LAMPORTS)
        .ok_or(crate::error::ErrorCode::Overflow)?
        .checked_div(10u64.pow(TOKEN_DECIMALS as u32))
        .ok_or(crate::error::ErrorCode::Overflow)?;

    // Transfer lamports from vault PDA to contributor
    let vault_info = ctx.accounts.milestone_vault.to_account_info();
    let contributor_info = ctx.accounts.contributor.to_account_info();
    **vault_info.try_borrow_mut_lamports()? -= refund_amount;
    **contributor_info.try_borrow_mut_lamports()? += refund_amount;

    // Burn contributor's tokens
    token::burn(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Burn {
                mint: ctx.accounts.token_mint.to_account_info(),
                from: ctx.accounts.contributor_token_account.to_account_info(),
                authority: ctx.accounts.contributor.to_account_info(),
            },
        ),
        contributor_tokens,
    )?;

    // Update project raised
    let project_mut = &mut ctx.accounts.project;
    project_mut.raised = project_mut
        .raised
        .checked_sub(refund_amount)
        .ok_or(crate::error::ErrorCode::Overflow)?;

    Ok(())
}
