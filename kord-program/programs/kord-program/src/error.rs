use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Custom error message")]
    CustomError,
}
#[error_code]
pub enum ErrorCode {
    #[msg("Market is closed for trading")]
    MarketClosed,
    #[msg("No proof submitted by artist")]
    NoProof,
    #[msg("TWAP window not complete (24h req'd)")]
    TwapNotReady,
    #[msg("Project fully funded")]
    FullyFunded,
    #[msg("Insufficient contribution")]
    MinContribution,
    #[msg("Invalid milestone allocation")]
    InvalidMilestone,
}
