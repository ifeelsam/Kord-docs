use anchor_lang::prelude::*;

// ── PDA Seeds ──────────────────────────────────────────────
#[constant]
pub const PROJECT_SEED: &[u8] = b"project";
#[constant]
pub const MILESTONE_SEED: &[u8] = b"milestone";
#[constant]
pub const ANCHOR_SEED: &[u8] = b"anchor";
#[constant]
pub const VESTING_SEED: &[u8] = b"vesting";
#[constant]
pub const VAULT_SEED: &[u8] = b"vault";

// ── Tokenomics ─────────────────────────────────────────────
/// Total token supply (before decimals). With 6 decimals = 1_000_000_000_000 smallest units.
pub const TOTAL_SUPPLY: u64 = 1_000_000;
pub const TOKEN_DECIMALS: u8 = 6;

/// Supply in smallest units (TOTAL_SUPPLY * 10^TOKEN_DECIMALS)
pub const TOTAL_SUPPLY_UNITS: u64 = 1_000_000_000_000; // 1M * 10^6

// Allocation percentages
pub const PUBLIC_ALLOC_PCT: u8 = 50;
pub const LP_ALLOC_PCT: u8 = 20;
pub const ANCHOR_ALLOC_PCT: u8 = 20;
pub const ARTIST_ALLOC_PCT: u8 = 10;

/// Price per token in lamports (0.0001 SOL ≈ $0.10 placeholder)
pub const PRICE_PER_TOKEN_LAMPORTS: u64 = 100_000;

// ── Time Constants ─────────────────────────────────────────
/// TWAP measurement window: 24 hours in seconds
pub const TWAP_WINDOW: u64 = 86_400;

/// Artist vesting duration: 12 months in seconds
pub const VESTING_DURATION: u64 = 31_536_000;

// ── Thresholds ─────────────────────────────────────────────
/// Emergency refund only allowed when raised < 5% of goal
pub const MIN_FUND_PCT_FOR_REFUND: u64 = 5;

/// Minimum contribution in lamports (0.01 SOL)
pub const MIN_CONTRIBUTION: u64 = 10_000_000;

/// TWAP pass threshold in basis points (5000 = 50%)
pub const TWAP_PASS_THRESHOLD_BPS: u64 = 5_000;
