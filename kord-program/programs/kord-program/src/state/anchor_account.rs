use anchor_lang::prelude::*;

/// Tracks royalty deposits and LP value for a project's anchor allocation
#[account]
pub struct AnchorAccount {
    /// The project this anchor belongs to
    pub project: Pubkey,
    /// Total audio/royalty deposits (lamports)
    pub total_deposited: u64,
    /// Tracked LP value (lamports equivalent)
    pub lp_value: u64,
    /// PDA bump
    pub bump: u8,
}

impl AnchorAccount {
    pub const SIZE: usize = 8  // discriminator
        + 32  // project
        + 8   // total_deposited
        + 8   // lp_value
        + 1;  // bump
}
