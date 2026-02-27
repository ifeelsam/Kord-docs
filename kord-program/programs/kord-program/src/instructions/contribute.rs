use anchor_lang::prelude::*;
use anchor_lang::system_program;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

use crate::constants::*;
use crate::events::ContributionMade;
use crate::state::{Project, ProjectStatus};

#[derive(Accounts)]
pub struct Contribute<'info> {
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

    /// Public sale token account (source of tokens for contributors)
    #[account(
        mut,
        token::mint = project.token_mint,
    )]
    pub public_sale_account: Account<'info, TokenAccount>,

    /// Contributor's token account (destination)
    #[account(
        mut,
        token::mint = project.token_mint,
    )]
    pub contributor_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<Contribute>, amount: u64) -> Result<()> {
    require!(
        amount >= MIN_CONTRIBUTION,
        crate::error::ErrorCode::MinContribution
    );

    let project = &ctx.accounts.project;

    // Check not already fully funded
    require!(
        project.raised < project.goal,
        crate::error::ErrorCode::FullyFunded
    );

    // Calculate tokens: amount_lamports / PRICE_PER_TOKEN_LAMPORTS * 10^decimals
    // tokens = (amount * 10^TOKEN_DECIMALS) / PRICE_PER_TOKEN_LAMPORTS
    let tokens = amount
        .checked_mul(10u64.pow(TOKEN_DECIMALS as u32))
        .ok_or(crate::error::ErrorCode::Overflow)?
        .checked_div(PRICE_PER_TOKEN_LAMPORTS)
        .ok_or(crate::error::ErrorCode::Overflow)?;

    // Check sufficient tokens in public sale account
    require!(
        ctx.accounts.public_sale_account.amount >= tokens,
        crate::error::ErrorCode::InsufficientShares
    );

    // Transfer SOL from contributor to vault
    system_program::transfer(
        CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.contributor.to_account_info(),
                to: ctx.accounts.milestone_vault.to_account_info(),
            },
        ),
        amount,
    )?;

    // Transfer tokens from public sale to contributor (PDA signs)
    let artist_key = project.artist;
    let project_id_bytes = project.project_id.to_le_bytes();
    let bump = project.bump;
    let seeds = &[
        PROJECT_SEED,
        artist_key.as_ref(),
        project_id_bytes.as_ref(),
        &[bump],
    ];
    let signer_seeds = &[&seeds[..]];

    token::transfer(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.public_sale_account.to_account_info(),
                to: ctx.accounts.contributor_token_account.to_account_info(),
                authority: ctx.accounts.project.to_account_info(),
            },
            signer_seeds,
        ),
        tokens,
    )?;

    // Update project raised amount
    let project_mut = &mut ctx.accounts.project;
    project_mut.raised = project_mut
        .raised
        .checked_add(amount)
        .ok_or(crate::error::ErrorCode::Overflow)?;

    // Auto-transition to Funded if goal reached
    if project_mut.raised >= project_mut.goal {
        project_mut.status = ProjectStatus::Funded;
    }

    emit!(ContributionMade {
        contributor: ctx.accounts.contributor.key(),
        project: project_mut.key(),
        amount,
        tokens_received: tokens,
    });

    Ok(())
}
