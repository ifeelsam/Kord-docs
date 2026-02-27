use anchor_lang::prelude::*;

/// Tracks artist vesting: 10% of total supply, 12-month linear unlock
#[account]
pub struct ArtistVesting {
    /// The project this vesting belongs to
    pub project: Pubkey,
    /// Artist wallet
    pub artist: Pubkey,
    /// Total token allocation (in token smallest units)
    pub total_allocation: u64,
    /// Amount already claimed
    pub claimed: u64,
    /// Vesting start timestamp
    pub start_ts: i64,
    /// Vesting duration in seconds (12 months)
    pub duration: u64,
    /// PDA bump
    pub bump: u8,
}

impl ArtistVesting {
    pub const SIZE: usize = 8  // discriminator
        + 32  // project
        + 32  // artist
        + 8   // total_allocation
        + 8   // claimed
        + 8   // start_ts
        + 8   // duration
        + 1;  // bump
}
