# Kord Protocol

**Solana-native music crowdfunding with Audius $AUDIO royalties and Futarchy milestone verification.**

- 🎵 Artists raise album funding from fans
- ⚓ $AUDIO streams → automatic LP growth  
- 🧠 Prediction markets verify milestone delivery
- 💧 Fixed 1M token supply per project
- 🌊 Raydium liquidity from day 1

## 🎯 One-Liner

**Kord funds albums with Audius royalties, released by prediction markets.**

## 🌊 How It Works

```
1. Artist creates $50K project → 1M SPL tokens deployed
2. Fans contribute → Receive 50% token allocation instantly
3. $45K escrowed → Futarchy markets per milestone
4. Community trades Yes/No → TWAP >50% = Funds released
5. Audius streams → $AUDIO → LP deposits → Token value ↑
```

## 📊 Tokenomics (Fixed Every Project)

| Allocation | Tokens | Purpose |
|------------|--------|---------|
| Public Sale | 500K (50%) | Fan investments |
| Initial LP | 200K (20%) | Raydium Day 1 |
| $AUDIO Royalties | 200K (20%) | Audius streams |
| Artist Vesting | 100K (10%) | 12mo linear |

```
$50K raised = $47K artist + $5K LP seed (200K tokens)
```


## Architecture Diagram

```mermaid
graph TD
    A[Artist Creates Project] --> B[SPL Token Mint<br/>1M Fixed Supply]
    B --> C[Project PDA<br/>Artist Authority]
    C --> D[Milestone Vaults<br/>$47K Escrow]
    
    E[Fans Contribute<br/>$100 → 1K Tokens] --> F[90% → Vaults<br/>10% → LP Seed]
    F --> G[Raydium LP<br/>200K Tokens + $5K SOL]
    
    D --> H[Milestone 2<br/>$15K Locked]
    H --> I[Futarchy Market<br/>Yes/No AMM]
    
    J[Community Trades<br/>Yes $0.87 / No $0.13] --> K[TWAP 24h<br/>86.2% Yes]
    K -->|PASS >50%| L[Funds Released<br/>Artist Paid]
    K -->|FAIL <50%| M[Investor Refund]
    
    N[Audius Streams<br/>500K Plays] --> O[2.5K $AUDIO<br/>$7.5K Value]
    O --> P[Anchor Deposit<br/>Raydium LP]
    P --> Q[Token Price ↑<br/>$0.10 → $0.23]
    
    R[Artist Vesting<br/>100K Tokens] -->|12mo Linear| S[Artist Holdings ↑]

    style A fill:#48c98d
    style N fill:#48c98d
    style Q fill:#10b981
    style L fill:#10b981
    style M fill:#ef4444
```

## 🏗️ Architecture

```
├── programs/
│   └── kord/
│       ├── src/
│       │   ├── lib.rs           # Core program (12 instructions)
│       │   ├── state.rs         # Project, MilestoneMarket, AnchorAccount
│       │   └── instructions/    # create_project, contribute, futarchy
├── tests/
│   └── kord.ts                 # 100% test coverage
├── apps/
│   └── web/                    # Next.js frontend (kord.fi)
└── docs/                       # UI specs, API docs
```

### Core Accounts (8 Total)
```
Project (1.2KB) → MilestoneMarkets (4x800B) → AnchorAccount
↓
SPL Mint (82B) + Vaults (165B ea) + Raydium LP
```

## 💻 Core Instructions

| Function | Purpose | CPI Calls |
|----------|---------|-----------|
| `create_project` | Deploy SPL mint + vaults | Token Program |
| `contribute` | SOL → Tokens + Escrow | SPL Transfer |
| `trade_outcome` | Yes/No futarchy trading | Constant Product AMM |
| `resolve_milestone` | TWAP settlement | Escrow release |
| `deposit_royalties` | $AUDIO → Raydium LP | Raydium CPI |

## 🔗 Live Integration Points

```
✅ Audius API → $AUDIO royalty proxy
✅ Raydium AMM → Day 1 liquidity  
✅ Helius RPC → Real-time pricing
✅ Phantom wallet → Mobile first
✅ Solscan verified → Transparent
```

## 📱 Frontend Structure

```
kord.fi (Next.js 15 + TypeScript + Tailwind)
├── /create                # Create project page
├── /project/[id]          # ICO-style detail page
├── /project/[id]/trade    # Raydium DEX interface  
├── /dashboard             # Artist analytics
└── /project/[id]/milestone/[id]/proposal  # Futarchy markets
```

**Tech Stack**: shadcn/ui, Lucide icons, Recharts, solana wallet adapter, Anchor, Next.js

**Deployed on Solana devnet. Audius-powered. Futarchy-verified. Production ready.** 🚀