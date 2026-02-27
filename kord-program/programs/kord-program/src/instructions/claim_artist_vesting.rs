use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

use crate::constants::*;
use crate::state::{ArtistVesting, Project};

#[derive(Accounts)]
pub struct ClaimArtistVesting<'info> {
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
        has_one = artist,
        seeds = [VESTING_SEED, project.key().as_ref()],
        bump = artist_vesting.bump,
    )]
    pub artist_vesting: Account<'info, ArtistVesting>,

    /// Source token account holding vested tokens (PDA-owned)
    #[account(
        mut,
        token::mint = project.token_mint,
    )]
    pub vesting_token_account: Account<'info, TokenAccount>,

    /// Artist's destination token account
    #[account(
        mut,
        token::mint = project.token_mint,
    )]
    pub artist_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

pub fn handler(ctx: Context<ClaimArtistVesting>) -> Result<()> {
    let clock = Clock::get()?;
    let vesting = &ctx.accounts.artist_vesting;

    require!(
        vesting.total_allocation > 0,
        crate::error::ErrorCode::VestingNotStarted
    );

    // Calculate elapsed time since vesting start
    let elapsed = clock
        .unix_timestamp
        .checked_sub(vesting.start_ts)
        .ok_or(crate::error::ErrorCode::Overflow)?;

    require!(elapsed > 0, crate::error::ErrorCode::VestingNotStarted);

    // Linear unlock: vested = total_allocation * min(elapsed, duration) / duration
    let effective_elapsed = std::cmp::min(elapsed as u64, vesting.duration);
    let total_vested = (vesting.total_allocation as u128)
        .checked_mul(effective_elapsed as u128)
        .ok_or(crate::error::ErrorCode::Overflow)?
        .checked_div(vesting.duration as u128)
        .ok_or(crate::error::ErrorCode::Overflow)? as u64;

    let claimable = total_vested
        .checked_sub(vesting.claimed)
        .ok_or(crate::error::ErrorCode::Overflow)?;

    require!(claimable > 0, crate::error::ErrorCode::NothingToClaim);

    // Transfer tokens from vesting account to artist (PDA signs)
    let artist_key = ctx.accounts.project.artist;
    let project_id_bytes = ctx.accounts.project.project_id.to_le_bytes();
    let bump = ctx.accounts.project.bump;
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
                from: ctx.accounts.vesting_token_account.to_account_info(),
                to: ctx.accounts.artist_token_account.to_account_info(),
                authority: ctx.accounts.project.to_account_info(),
            },
            signer_seeds,
        ),
        claimable,
    )?;

    // Update vesting state
    let vesting_mut = &mut ctx.accounts.artist_vesting;
    vesting_mut.claimed = vesting_mut
        .claimed
        .checked_add(claimable)
        .ok_or(crate::error::ErrorCode::Overflow)?;

    msg!(
        "Artist claimed {} tokens ({}/{} total)",
        claimable,
        vesting_mut.claimed,
        vesting_mut.total_allocation
    );

    Ok(())
}
