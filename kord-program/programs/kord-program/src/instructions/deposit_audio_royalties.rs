use anchor_lang::prelude::*;
use anchor_lang::system_program;

use crate::constants::*;
use crate::events::RoyaltiesDeposited;
use crate::state::{AnchorAccount, Project, ProjectStatus};

#[derive(Accounts)]
pub struct DepositAudioRoyalties<'info> {
    #[account(mut)]
    pub depositor: Signer<'info>,

    #[account(
        constraint = project.status == ProjectStatus::Funded || 
                     project.status == ProjectStatus::Complete
                     @ crate::error::ErrorCode::ProjectNotFunded,
        seeds = [PROJECT_SEED, project.artist.as_ref(), &project.project_id.to_le_bytes()],
        bump = project.bump,
    )]
    pub project: Account<'info, Project>,

    #[account(
        mut,
        has_one = project,
        seeds = [ANCHOR_SEED, project.key().as_ref()],
        bump = anchor_account.bump,
    )]
    pub anchor_account: Account<'info, AnchorAccount>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<DepositAudioRoyalties>, amount: u64) -> Result<()> {
    require!(amount > 0, crate::error::ErrorCode::MinContribution);

    // Transfer SOL from depositor to anchor account (LP accounting stub)
    system_program::transfer(
        CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.depositor.to_account_info(),
                to: ctx.accounts.anchor_account.to_account_info(),
            },
        ),
        amount,
    )?;

    // Update anchor account tracking
    let anchor_acc = &mut ctx.accounts.anchor_account;
    anchor_acc.total_deposited = anchor_acc
        .total_deposited
        .checked_add(amount)
        .ok_or(crate::error::ErrorCode::Overflow)?;
    // LP value added is 1:1 for now (stub — real Raydium CPI would return actual LP value)
    anchor_acc.lp_value = anchor_acc
        .lp_value
        .checked_add(amount)
        .ok_or(crate::error::ErrorCode::Overflow)?;

    emit!(RoyaltiesDeposited {
        project: ctx.accounts.project.key(),
        amount,
        lp_value_added: amount,
    });

    Ok(())
}
