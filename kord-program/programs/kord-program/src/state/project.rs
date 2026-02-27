use anchor_lang::prelude::*;

#[account]
pub struct Project {
    /// The artist who created this project
    pub artist: Pubkey,
    /// SPL token mint (1M fixed supply)
    pub token_mint: Pubkey,
    /// Escrow vault for milestone funds (SOL)
    pub milestone_vault: Pubkey,
    /// LP token account reference
    pub lp_account: Pubkey,
    /// Funding goal in lamports
    pub goal: u64,
    /// Amount raised so far in lamports
    pub raised: u64,
    /// Current project status
    pub status: ProjectStatus,
    /// List of milestones
    pub milestones: Vec<Milestone>,
    /// Token allocation breakdown
    pub allocations: TokenAllocations,
    /// PDA bump
    pub bump: u8,
    /// Project ID (unique per artist)
    pub project_id: u64,
    /// Timestamp of creation
    pub created_at: i64,
}

impl Project {
    /// Base size without the Vec<Milestone>
    /// 32 + 32 + 32 + 32 + 8 + 8 + 1 + 4(vec prefix) + allocations(32) + 1 + 8 + 8 = ~198
    pub const BASE_SIZE: usize = 8  // discriminator
        + 32  // artist
        + 32  // token_mint
        + 32  // milestone_vault
        + 32  // lp_account
        + 8   // goal
        + 8   // raised
        + 1   // status enum
        + 4   // vec length prefix
        + 32  // allocations (4 x u8)
        + 1   // bump
        + 8   // project_id
        + 8;  // created_at

    pub const MAX_MILESTONES: usize = 10;

    /// Size of a single milestone entry (4 + 64 max string + 8)
    pub const MILESTONE_SIZE: usize = 4 + 64 + 8;

    pub fn space(num_milestones: usize) -> usize {
        Self::BASE_SIZE + (num_milestones * Self::MILESTONE_SIZE)
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum ProjectStatus {
    Active,
    Funded,
    Complete,
    Cancelled,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Milestone {
    /// Description, e.g. "Mixing Complete"
    pub description: String,
    /// Allocation in basis points (e.g. 3000 = 30%)
    pub allocation_bps: u64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct TokenAllocations {
    /// Public sale percentage
    pub public_pct: u8,
    /// Initial LP percentage
    pub lp_pct: u8,
    /// Anchor royalties percentage
    pub anchor_pct: u8,
    /// Artist vesting percentage
    pub artist_pct: u8,
}

impl Default for TokenAllocations {
    fn default() -> Self {
        Self {
            public_pct: 50,
            lp_pct: 20,
            anchor_pct: 20,
            artist_pct: 10,
        }
    }
}
