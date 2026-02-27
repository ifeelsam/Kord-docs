pub mod constants;
pub mod error;
pub mod events;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("94tD81LyLHpaNZFVfoNT2g98Bi4FpZVEjVm8L2xj3KyH");

#[program]
pub mod kord_program {
    use super::*;

    // ── Phase 1: Project Creation ──────────────────────────

    pub fn create_project(
        ctx: Context<CreateProject>,
        project_id: u64,
        goal: u64,
        milestones: Vec<crate::state::Milestone>,
    ) -> Result<()> {
        create_project::handler(ctx, project_id, goal, milestones)
    }

    pub fn initialize_token_allocations(
        ctx: Context<InitializeTokenAllocations>,
    ) -> Result<()> {
        initialize_token_allocations::handler(ctx)
    }

    // ── Phase 2: Crowdfunding ──────────────────────────────

    pub fn contribute(ctx: Context<Contribute>, amount: u64) -> Result<()> {
        contribute::handler(ctx, amount)
    }

    pub fn emergency_refund(ctx: Context<EmergencyRefund>) -> Result<()> {
        emergency_refund::handler(ctx)
    }

    // ── Phase 3: Milestone Futarchy Markets ────────────────

    pub fn create_milestone_market(
        ctx: Context<CreateMilestoneMarket>,
        milestone_id: u8,
    ) -> Result<()> {
        create_milestone_market::handler(ctx, milestone_id)
    }

    pub fn trade_outcome(
        ctx: Context<TradeOutcome>,
        is_yes: bool,
        amount: u64,
    ) -> Result<()> {
        trade_outcome::handler(ctx, is_yes, amount)
    }

    pub fn submit_milestone_proof(
        ctx: Context<SubmitMilestoneProof>,
        proof_ipfs: String,
    ) -> Result<()> {
        submit_milestone_proof::handler(ctx, proof_ipfs)
    }

    // ── Phase 4: Resolution & Payout ───────────────────────

    pub fn resolve_milestone(ctx: Context<ResolveMilestone>) -> Result<()> {
        resolve_milestone::handler(ctx)
    }

    pub fn claim_yes_shares(
        ctx: Context<ClaimYesShares>,
        shares: u64,
    ) -> Result<()> {
        claim_yes_shares::handler(ctx, shares)
    }

    pub fn claim_no_shares(
        ctx: Context<ClaimNoShares>,
        shares: u64,
    ) -> Result<()> {
        claim_no_shares::handler(ctx, shares)
    }

    // ── Phase 5: Royalty Flow ──────────────────────────────

    pub fn deposit_audio_royalties(
        ctx: Context<DepositAudioRoyalties>,
        amount: u64,
    ) -> Result<()> {
        deposit_audio_royalties::handler(ctx, amount)
    }

    pub fn claim_artist_vesting(
        ctx: Context<ClaimArtistVesting>,
    ) -> Result<()> {
        claim_artist_vesting::handler(ctx)
    }
}
