use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, MintTo, Token, TokenAccount};

use crate::constants::*;
use crate::state::Project;

#[derive(Accounts)]
pub struct InitializeTokenAllocations<'info> {
    #[account(mut)]
    pub artist: Signer<'info>,

    #[account(
        mut,
        has_one = artist,
        has_one = token_mint,
        seeds = [PROJECT_SEED, artist.key().as_ref(), &project.project_id.to_le_bytes()],
        bump = project.bump,
    )]
    pub project: Account<'info, Project>,

    #[account(mut)]
    pub token_mint: Account<'info, Mint>,

    /// Token account for public sale tokens
    #[account(
        mut,
        token::mint = token_mint,
    )]
    pub public_sale_account: Account<'info, TokenAccount>,

    /// Token account for LP allocation
    #[account(
        mut,
        token::mint = token_mint,
    )]
    pub lp_token_account: Account<'info, TokenAccount>,

    /// Token account for anchor/royalty allocation
    #[account(
        mut,
        token::mint = token_mint,
    )]
    pub anchor_token_account: Account<'info, TokenAccount>,

    /// Token account for artist vesting allocation
    #[account(
        mut,
        token::mint = token_mint,
    )]
    pub artist_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

pub fn handler(ctx: Context<InitializeTokenAllocations>) -> Result<()> {
    let project = &ctx.accounts.project;
    let _project_key = project.key();

    // Ensure mint hasn't already been initialized (current supply should be 0)
    require!(
        ctx.accounts.token_mint.supply == 0,
        crate::error::ErrorCode::InvalidAllocation
    );

    let artist_key = project.artist;
    let project_id_bytes = project.project_id.to_le_bytes();

    // PDA signer seeds for the project (mint authority)
    let seeds = &[
        PROJECT_SEED,
        artist_key.as_ref(),
        project_id_bytes.as_ref(),
        &[project.bump],
    ];
    let signer_seeds = &[&seeds[..]];

    // Calculate allocations in token smallest units
    let public_amount =
        TOTAL_SUPPLY_UNITS * (PUBLIC_ALLOC_PCT as u64) / 100;
    let lp_amount =
        TOTAL_SUPPLY_UNITS * (LP_ALLOC_PCT as u64) / 100;
    let anchor_amount =
        TOTAL_SUPPLY_UNITS * (ANCHOR_ALLOC_PCT as u64) / 100;
    let artist_amount =
        TOTAL_SUPPLY_UNITS * (ARTIST_ALLOC_PCT as u64) / 100;

    // Mint to public sale account (50%)
    token::mint_to(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            MintTo {
                mint: ctx.accounts.token_mint.to_account_info(),
                to: ctx.accounts.public_sale_account.to_account_info(),
                authority: ctx.accounts.project.to_account_info(),
            },
            signer_seeds,
        ),
        public_amount,
    )?;

    // Mint to LP account (20%)
    token::mint_to(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            MintTo {
                mint: ctx.accounts.token_mint.to_account_info(),
                to: ctx.accounts.lp_token_account.to_account_info(),
                authority: ctx.accounts.project.to_account_info(),
            },
            signer_seeds,
        ),
        lp_amount,
    )?;

    // Mint to anchor account (20%)
    token::mint_to(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            MintTo {
                mint: ctx.accounts.token_mint.to_account_info(),
                to: ctx.accounts.anchor_token_account.to_account_info(),
                authority: ctx.accounts.project.to_account_info(),
            },
            signer_seeds,
        ),
        anchor_amount,
    )?;

    // Mint to artist vesting account (10%)
    token::mint_to(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            MintTo {
                mint: ctx.accounts.token_mint.to_account_info(),
                to: ctx.accounts.artist_token_account.to_account_info(),
                authority: ctx.accounts.project.to_account_info(),
            },
            signer_seeds,
        ),
        artist_amount,
    )?;

    // Store LP account reference on project
    let project_mut = &mut ctx.accounts.project;
    project_mut.lp_account = ctx.accounts.lp_token_account.key();

    Ok(())
}
