use anchor_lang::prelude::*;

#[account]
pub struct MilestoneMarket {
    /// The project this market belongs to
    pub project: Pubkey,
    /// Milestone index (0, 1, 2, ...)
    pub milestone_id: u8,
    /// Funds locked for this milestone (lamports)
    pub funds_locked: u64,
    /// YES pool liquidity (lamports)
    pub yes_pool: u64,
    /// NO pool liquidity (lamports)
    pub no_pool: u64,
    /// TWAP window in seconds (86400 = 24h)
    pub twap_window: u64,
    /// Timestamp when TWAP measurement starts (after proof submitted)
    pub twap_start: i64,
    /// IPFS hash of milestone proof
    pub proof_ipfs: String,
    /// Current market status
    pub status: MarketStatus,
    /// Total YES shares issued
    pub total_yes_shares: u64,
    /// Total NO shares issued
    pub total_no_shares: u64,
    /// PDA bump
    pub bump: u8,
}

impl MilestoneMarket {
    pub const MAX_IPFS_LEN: usize = 64;

    pub const SIZE: usize = 8  // discriminator
        + 32  // project
        + 1   // milestone_id
        + 8   // funds_locked
        + 8   // yes_pool
        + 8   // no_pool
        + 8   // twap_window
        + 8   // twap_start
        + (4 + Self::MAX_IPFS_LEN) // proof_ipfs (len prefix + max)
        + 1   // status enum
        + 8   // total_yes_shares
        + 8   // total_no_shares
        + 1;  // bump

    /// Yes price = no_pool / (yes_pool + no_pool)
    /// Returns price as basis points (0-10000)
    pub fn yes_price_bps(&self) -> u64 {
        let total = self.yes_pool.checked_add(self.no_pool).unwrap_or(0);
        if total == 0 {
            return 5000; // 50% default
        }
        self.no_pool
            .checked_mul(10_000)
            .unwrap_or(0)
            .checked_div(total)
            .unwrap_or(5000)
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum MarketStatus {
    Open,
    ProofSubmitted,
    Resolved,
}
