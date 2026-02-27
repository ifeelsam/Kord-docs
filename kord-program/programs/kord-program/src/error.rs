use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Market is closed for trading")]
    MarketClosed,

    #[msg("Market has not been resolved yet")]
    MarketNotResolved,

    #[msg("No proof submitted by artist")]
    NoProof,

    #[msg("TWAP window not complete (24h required)")]
    TwapNotReady,

    #[msg("Project is already fully funded")]
    FullyFunded,

    #[msg("Contribution below minimum amount")]
    MinContribution,

    #[msg("Invalid milestone allocation (must sum to 10000 bps)")]
    InvalidMilestone,

    #[msg("Unauthorized: only the artist can perform this action")]
    Unauthorized,

    #[msg("Project is not in Funded status")]
    ProjectNotFunded,

    #[msg("Milestone has already been resolved")]
    MilestoneAlreadyResolved,

    #[msg("Insufficient shares to claim")]
    InsufficientShares,

    #[msg("Vesting has not started yet")]
    VestingNotStarted,

    #[msg("Nothing to claim: fully vested or zero available")]
    NothingToClaim,

    #[msg("Cannot refund: project has exceeded the 5% funding threshold")]
    RefundThresholdExceeded,

    #[msg("Invalid allocation percentages (must sum to 100)")]
    InvalidAllocation,

    #[msg("Arithmetic overflow")]
    Overflow,

    #[msg("Project is not active")]
    ProjectNotActive,

    #[msg("Market is not in the correct state for this operation")]
    InvalidMarketState,

    #[msg("Milestone passed — no refund available")]
    MilestonePassed,

    #[msg("Milestone failed — no YES payout available")]
    MilestoneFailed,
}
