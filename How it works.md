### Phase 1: Artist Proposal (5 mins) {#phase-1}
```
1. Connect Phantom → "Fund My Album"
2. Enter: "New Album: $50k needed" + budget breakdown
3. Minimum perks auto-selected: 
   ✅ 1% AUDIO royalties 
   ✅ Early Audius drop 
   ✅ Concert discount code
4. Launch → Live for fan investments
```

### Phase 2: Fan Crowdfunding {#phase-2}
```
Fans browse Audius → "Invest $100" → Get tokens instantly
90% funds → Artist milestones, 10% → LP seed
```

### Phase 3: Milestone Delivery {#phase-3}
```
Artist uploads proof → Community verifies → 
20% funds released → Artist hits next milestone
```

### Phase 4: Royalties = Token Value {#phase-4}
```
Streams generate AUDIO → Anchor deposits LP → 
Token price grows with real album success
```

***

## 🎛️ Smart Contracts {#contracts}

**Solana Anchor Program** `Kord_factory`:

```rust
pub fn create_project(
    name: String, 
    goal: u64, 
    milestones: Vec<Milestone>
) → ProjectSPL + Vault + LP Pair
```

**Key flows**:
```rust
contribute(amount: u64)     // Fans → Tokens
claim_milestone(stage: u8)  // Artist → Funds  
add_audio_royalties(amount) // Anchor → LP growth
```

***

## 📱 User Flows {#flows}

### Artist Journey {#artist}
```
"Need $50k for album" → Create → Fans fund → 
Deliver milestones → Release on Audius → 
**Passive royalties grow LP value forever**
```

### Fan Journey {#fan}
```
Discover album → Invest $50 → Track progress → 
**Get AUDIO royalties + concert perks + trade appreciated tokens**
```

***

## 💰 Platform Revenue {#revenue}
```
✅ 5% fee on successful raises 
✅ 0.3% Raydium LP trading fees
✅ Premium artist analytics
```

***

## 🔒 Security {#security}
```
✅ 24h timelocks on LP deposits
✅ Anchor multisig (3/5 keys)
✅ SPL Token-2022 transfer hooks
✅ Sec3 audit ready
```

***

## 🛠️ Tech Stack {#stack}
```
Frontend: Next.js + Solana Wallet Adapter
Contracts: Anchor Rust + SPL Token-2022
DEX: Raydium AMM + Jupiter swaps
Data: Helius RPC + Audius API
Storage: IPFS + Arweave permanence
```

***

## 📈 Market Opportunity {#market}
```
TAM: $14.3B indie music market
SAM: $232M blockchain-ready artists
Kord: **First with real AUDIO royalties → LP**
```

***

## 🚀 Launch Plan {#next}
```
[ ] Devnet deployment (1 week)
[ ] Audius API integration spec
[ ] 10 test projects
[ ] Artist onboarding (100 targets)
```

***

**Kord**: **"Artists need funds. Fans want ownership. We built the bridge."** 🎵⚡