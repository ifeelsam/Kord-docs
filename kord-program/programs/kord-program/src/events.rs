use anchor_lang::prelude::*;

#[event]
pub struct ProjectCreated {
    pub artist: Pubkey,
    pub project_id: u64,
    pub goal: u64,
    pub token_mint: Pubkey,
}

#[event]
pub struct ContributionMade {
    pub contributor: Pubkey,
    pub project: Pubkey,
    pub amount: u64,
    pub tokens_received: u64,
}

#[event]
pub struct MilestoneMarketCreated {
    pub project: Pubkey,
    pub milestone_id: u8,
    pub funds_locked: u64,
}

#[event]
pub struct OutcomeTraded {
    pub trader: Pubkey,
    pub market: Pubkey,
    pub is_yes: bool,
    pub amount: u64,
    pub shares_received: u64,
}

#[event]
pub struct MilestoneResolved {
    pub market: Pubkey,
    pub passed: bool,
    pub payout_amount: u64,
}

#[event]
pub struct RoyaltiesDeposited {
    pub project: Pubkey,
    pub amount: u64,
    pub lp_value_added: u64,
}
