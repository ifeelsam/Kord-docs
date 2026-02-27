import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { KordProgram } from "../target/types/kord_program";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountIdempotentInstruction,
  getAccount,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createInitializeAccountInstruction,
} from "@solana/spl-token";
import { assert } from "chai";
import BN from "bn.js";

// ── Constants matching on-chain values ──────────────────────
const PROJECT_SEED = Buffer.from("project");
const MILESTONE_SEED = Buffer.from("milestone");
const ANCHOR_SEED = Buffer.from("anchor");
const VESTING_SEED = Buffer.from("vesting");
const VAULT_SEED = Buffer.from("vault");

const PRICE_PER_TOKEN_LAMPORTS = 100_000;
const TOKEN_DECIMALS = 6;
const MIN_CONTRIBUTION = 10_000_000;

/** Helper: create an ATA for a PDA owner (off-curve allowed) */
async function createAtaForPda(
  connection: anchor.web3.Connection,
  payer: anchor.web3.Keypair,
  mint: PublicKey,
  owner: PublicKey
): Promise<PublicKey> {
  const ata = getAssociatedTokenAddressSync(mint, owner, true);
  const ix = createAssociatedTokenAccountIdempotentInstruction(
    payer.publicKey,
    ata,
    owner,
    mint
  );
  const tx = new anchor.web3.Transaction().add(ix);
  await anchor.web3.sendAndConfirmTransaction(connection, tx, [payer]);
  return ata;
}

/** Helper: create a standalone token account (for when we need a second account for the same owner) */
async function createStandaloneTokenAccount(
  connection: anchor.web3.Connection,
  payer: anchor.web3.Keypair,
  mint: PublicKey,
  owner: PublicKey
): Promise<[PublicKey, anchor.web3.Keypair]> {
  const account = Keypair.generate();
  const space = 165;
  const lamports = await connection.getMinimumBalanceForRentExemption(space);

  const createIx = SystemProgram.createAccount({
    fromPubkey: payer.publicKey,
    newAccountPubkey: account.publicKey,
    space,
    lamports,
    programId: TOKEN_PROGRAM_ID,
  });
  const initIx = createInitializeAccountInstruction(
    account.publicKey,
    mint,
    owner,
    TOKEN_PROGRAM_ID
  );
  const tx = new anchor.web3.Transaction().add(createIx, initIx);
  await anchor.web3.sendAndConfirmTransaction(connection, tx, [payer, account]);
  return [account.publicKey, account];
}

describe("kord-program", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.kordProgram as Program<KordProgram>;
  const artist = provider.wallet as anchor.Wallet;

  const tokenMint = Keypair.generate();
  const projectId = new BN(1);
  const goal = new BN(5 * LAMPORTS_PER_SOL); // 5 SOL goal (smaller for testing)

  // PDAs
  let projectPda: PublicKey;
  let milestoneVaultPda: PublicKey;
  let anchorAccountPda: PublicKey;
  let artistVestingPda: PublicKey;

  // Token accounts — set in tests
  let publicSaleAta: PublicKey;
  let lpTokenAccount: PublicKey;
  let anchorAta: PublicKey;
  let artistAta: PublicKey;

  // Contributor
  const contributor = Keypair.generate();
  let contributorAta: PublicKey;

  // Milestone market
  let milestoneMarketPda: PublicKey;
  const milestoneId = 0;

  before(async () => {
    // Derive PDAs
    [projectPda] = PublicKey.findProgramAddressSync(
      [PROJECT_SEED, artist.publicKey.toBuffer(), projectId.toArrayLike(Buffer, "le", 8)],
      program.programId
    );
    [milestoneVaultPda] = PublicKey.findProgramAddressSync(
      [VAULT_SEED, projectPda.toBuffer()],
      program.programId
    );
    [anchorAccountPda] = PublicKey.findProgramAddressSync(
      [ANCHOR_SEED, projectPda.toBuffer()],
      program.programId
    );
    [artistVestingPda] = PublicKey.findProgramAddressSync(
      [VESTING_SEED, projectPda.toBuffer()],
      program.programId
    );
    [milestoneMarketPda] = PublicKey.findProgramAddressSync(
      [MILESTONE_SEED, projectPda.toBuffer(), Buffer.from([milestoneId])],
      program.programId
    );

    // Airdrop SOL to contributor
    const sig = await provider.connection.requestAirdrop(
      contributor.publicKey,
      10 * LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(sig);
  });

  // ── Phase 1: Project Creation ──────────────────────────────

  describe("Phase 1: Project Creation", () => {
    it("creates a project with milestones", async () => {
      const milestones = [
        { description: "Demo Recording", allocationBps: new BN(3000) },
        { description: "Mixing Complete", allocationBps: new BN(3000) },
        { description: "Mastering Done", allocationBps: new BN(2000) },
        { description: "Distribution", allocationBps: new BN(2000) },
      ];

      const tx = await program.methods
        .createProject(projectId, goal, milestones)
        .accounts({
          artist: artist.publicKey,
          project: projectPda,
          tokenMint: tokenMint.publicKey,
          milestoneVault: milestoneVaultPda,
          anchorAccount: anchorAccountPda,
          artistVesting: artistVestingPda,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        })
        .signers([tokenMint])
        .rpc();

      console.log("  ✅ create_project tx:", tx);

      const project = await program.account.project.fetch(projectPda);
      assert.ok(project.artist.equals(artist.publicKey));
      assert.ok(project.tokenMint.equals(tokenMint.publicKey));
      assert.equal(project.goal.toNumber(), goal.toNumber());
      assert.equal(project.raised.toNumber(), 0);
      assert.deepEqual(project.status, { active: {} });
      assert.equal(project.milestones.length, 4);
      assert.equal(project.allocations.publicPct, 50);
      assert.equal(project.allocations.lpPct, 20);
      assert.equal(project.allocations.anchorPct, 20);
      assert.equal(project.allocations.artistPct, 10);
    });

    it("initializes token allocations (1M supply → 50/20/20/10 split)", async () => {
      // Create token accounts for each allocation bucket
      // Public sale: ATA owned by project PDA
      publicSaleAta = await createAtaForPda(
        provider.connection,
        artist.payer,
        tokenMint.publicKey,
        projectPda
      );

      // LP: standalone token account (same owner = project PDA, but separate account)
      [lpTokenAccount] = await createStandaloneTokenAccount(
        provider.connection,
        artist.payer,
        tokenMint.publicKey,
        projectPda
      );

      // Anchor: ATA owned by anchor PDA
      anchorAta = await createAtaForPda(
        provider.connection,
        artist.payer,
        tokenMint.publicKey,
        anchorAccountPda
      );

      // Artist: ATA owned by artist wallet
      artistAta = getAssociatedTokenAddressSync(tokenMint.publicKey, artist.publicKey);
      const artistAtaIx = createAssociatedTokenAccountIdempotentInstruction(
        artist.publicKey,
        artistAta,
        artist.publicKey,
        tokenMint.publicKey
      );
      await provider.sendAndConfirm(new anchor.web3.Transaction().add(artistAtaIx));

      // Initialize token allocations
      const tx = await program.methods
        .initializeTokenAllocations()
        .accounts({
          artist: artist.publicKey,
          project: projectPda,
          tokenMint: tokenMint.publicKey,
          publicSaleAccount: publicSaleAta,
          lpTokenAccount: lpTokenAccount,
          anchorTokenAccount: anchorAta,
          artistTokenAccount: artistAta,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();

      console.log("  ✅ initialize_token_allocations tx:", tx);

      // Verify balances
      const pubBal = await provider.connection.getTokenAccountBalance(publicSaleAta);
      const lpBal = await provider.connection.getTokenAccountBalance(lpTokenAccount);
      const ancBal = await provider.connection.getTokenAccountBalance(anchorAta);
      const artBal = await provider.connection.getTokenAccountBalance(artistAta);

      console.log("    Public (50%):", pubBal.value.uiAmountString);
      console.log("    LP     (20%):", lpBal.value.uiAmountString);
      console.log("    Anchor (20%):", ancBal.value.uiAmountString);
      console.log("    Artist (10%):", artBal.value.uiAmountString);

      assert.equal(pubBal.value.amount, "500000000000"); // 500K * 10^6
      assert.equal(lpBal.value.amount, "200000000000");
      assert.equal(ancBal.value.amount, "200000000000");
      assert.equal(artBal.value.amount, "100000000000");
    });
  });

  // ── Phase 2: Crowdfunding ──────────────────────────────────

  describe("Phase 2: Crowdfunding", () => {
    it("accepts contributions and gives tokens", async () => {
      // Create contributor's ATA
      contributorAta = getAssociatedTokenAddressSync(
        tokenMint.publicKey,
        contributor.publicKey
      );
      const createContribAtaIx = createAssociatedTokenAccountIdempotentInstruction(
        contributor.publicKey,
        contributorAta,
        contributor.publicKey,
        tokenMint.publicKey
      );
      const createTx = new anchor.web3.Transaction().add(createContribAtaIx);
      await anchor.web3.sendAndConfirmTransaction(
        provider.connection,
        createTx,
        [contributor]
      );

      const amount = new BN(1 * LAMPORTS_PER_SOL); // 1 SOL

      const tx = await program.methods
        .contribute(amount)
        .accounts({
          contributor: contributor.publicKey,
          project: projectPda,
          milestoneVault: milestoneVaultPda,
          publicSaleAccount: publicSaleAta,
          contributorTokenAccount: contributorAta,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .signers([contributor])
        .rpc();

      console.log("  ✅ contribute tx:", tx);

      const project = await program.account.project.fetch(projectPda);
      assert.equal(project.raised.toNumber(), amount.toNumber());

      // tokens = (1 SOL * 10^6) / 100_000 = 10_000_000_000
      const contribBal = await provider.connection.getTokenAccountBalance(contributorAta);
      const expectedTokens = amount
        .mul(new BN(10 ** TOKEN_DECIMALS))
        .div(new BN(PRICE_PER_TOKEN_LAMPORTS));
      console.log("    Tokens received:", contribBal.value.uiAmountString);
      assert.equal(contribBal.value.amount, expectedTokens.toString());
    });

    it("rejects contributions below minimum", async () => {
      try {
        await program.methods
          .contribute(new BN(1000))
          .accounts({
            contributor: contributor.publicKey,
            project: projectPda,
            milestoneVault: milestoneVaultPda,
            publicSaleAccount: publicSaleAta,
            contributorTokenAccount: contributorAta,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          })
          .signers([contributor])
          .rpc();
        assert.fail("Expected MinContribution error");
      } catch (err: any) {
        const errStr = err.error?.errorCode?.code || err.toString();
        assert.include(errStr, "MinContribution");
        console.log("  ✅ Correctly rejected contribution below minimum");
      }
    });
  });

  // ── Phase 3: Milestone Markets ─────────────────────────────

  describe("Phase 3: Milestone Futarchy Markets", () => {
    before(async () => {
      // Fund project to goal so it transitions to "Funded"
      const project = await program.account.project.fetch(projectPda);
      const remaining = project.goal.sub(project.raised);

      if (remaining.gt(new BN(0))) {
        // Artist contributes the rest (using artist's existing ATA)
        await program.methods
          .contribute(remaining)
          .accounts({
            contributor: artist.publicKey,
            project: projectPda,
            milestoneVault: milestoneVaultPda,
            publicSaleAccount: publicSaleAta,
            contributorTokenAccount: artistAta,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        const after = await program.account.project.fetch(projectPda);
        console.log("    Project status:", JSON.stringify(after.status));
        assert.deepEqual(after.status, { funded: {} });
      }
    });

    it("creates a milestone market", async () => {
      const tx = await program.methods
        .createMilestoneMarket(milestoneId)
        .accounts({
          artist: artist.publicKey,
          project: projectPda,
          milestoneMarket: milestoneMarketPda,
          milestoneVault: milestoneVaultPda,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      console.log("  ✅ create_milestone_market tx:", tx);

      const market = await program.account.milestoneMarket.fetch(milestoneMarketPda);
      assert.equal(market.milestoneId, 0);
      assert.ok(market.fundsLocked.gt(new BN(0)));
      assert.deepEqual(market.status, { open: {} });
      console.log("    Funds locked:", market.fundsLocked.toString());
      console.log("    Yes pool:", market.yesPool.toString());
      console.log("    No pool:", market.noPool.toString());
    });

    it("trades YES outcome via constant-product AMM", async () => {
      const tradeAmount = new BN(0.1 * LAMPORTS_PER_SOL);
      const before = await program.account.milestoneMarket.fetch(milestoneMarketPda);

      const tx = await program.methods
        .tradeOutcome(true, tradeAmount)
        .accounts({
          trader: artist.publicKey,
          project: projectPda,
          milestoneMarket: milestoneMarketPda,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      console.log("  ✅ trade_outcome (YES) tx:", tx);

      const after = await program.account.milestoneMarket.fetch(milestoneMarketPda);
      assert.ok(after.yesPool.gt(before.yesPool), "YES pool increased");
      assert.ok(after.noPool.lt(before.noPool), "NO pool decreased");
      assert.ok(after.totalYesShares.gt(new BN(0)));
      console.log("    YES shares:", after.totalYesShares.toString());
    });

    it("trades NO outcome via constant-product AMM", async () => {
      const tradeAmount = new BN(0.05 * LAMPORTS_PER_SOL);

      const tx = await program.methods
        .tradeOutcome(false, tradeAmount)
        .accounts({
          trader: contributor.publicKey,
          project: projectPda,
          milestoneMarket: milestoneMarketPda,
          systemProgram: SystemProgram.programId,
        })
        .signers([contributor])
        .rpc();

      console.log("  ✅ trade_outcome (NO) tx:", tx);

      const after = await program.account.milestoneMarket.fetch(milestoneMarketPda);
      assert.ok(after.totalNoShares.gt(new BN(0)));
      console.log("    NO shares:", after.totalNoShares.toString());
    });

    it("artist submits milestone proof", async () => {
      const proofIpfs = "QmTzQ1JRkWErjk39mryYw2WVrgBz2Tfx1ELky9dERBwP1";

      const tx = await program.methods
        .submitMilestoneProof(proofIpfs)
        .accounts({
          artist: artist.publicKey,
          project: projectPda,
          milestoneMarket: milestoneMarketPda,
        })
        .rpc();

      console.log("  ✅ submit_milestone_proof tx:", tx);

      const market = await program.account.milestoneMarket.fetch(milestoneMarketPda);
      assert.equal(market.proofIpfs, proofIpfs);
      assert.deepEqual(market.status, { proofSubmitted: {} });
      assert.ok(market.twapStart.gt(new BN(0)));
    });
  });

  // ── Phase 4: Resolution ────────────────────────────────────

  describe("Phase 4: Resolution", () => {
    it("rejects early resolution (TWAP window not elapsed)", async () => {
      try {
        await program.methods
          .resolveMilestone()
          .accounts({
            resolver: artist.publicKey,
            project: projectPda,
            milestoneMarket: milestoneMarketPda,
            artistWallet: artist.publicKey,
            milestoneVault: milestoneVaultPda,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        assert.fail("Expected TwapNotReady error");
      } catch (err: any) {
        const errCode = err.error?.errorCode?.code || err.toString();
        assert.include(errCode, "TwapNotReady");
        console.log("  ✅ Correctly rejected: TWAP window not elapsed");
      }
    });
  });

  // ── Phase 5: Royalty Flow ──────────────────────────────────

  describe("Phase 5: Royalty Flow", () => {
    it("accepts royalty deposits", async () => {
      const depositAmount = new BN(0.5 * LAMPORTS_PER_SOL);

      const tx = await program.methods
        .depositAudioRoyalties(depositAmount)
        .accounts({
          depositor: artist.publicKey,
          project: projectPda,
          anchorAccount: anchorAccountPda,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      console.log("  ✅ deposit_audio_royalties tx:", tx);

      const anchorAcc = await program.account.anchorAccount.fetch(anchorAccountPda);
      assert.equal(anchorAcc.totalDeposited.toString(), depositAmount.toString());
      assert.equal(anchorAcc.lpValue.toString(), depositAmount.toString());
      console.log("    Total deposited:", anchorAcc.totalDeposited.toString());
    });
  });

  // ── Account Verification ──────────────────────────────────

  describe("Account Verification", () => {
    it("project state is consistent after all operations", async () => {
      const project = await program.account.project.fetch(projectPda);
      assert.deepEqual(project.status, { funded: {} });
      assert.ok(project.raised.gte(project.goal));
      assert.equal(project.milestones.length, 4);

      const totalBps = project.milestones.reduce(
        (sum, m) => sum + m.allocationBps.toNumber(),
        0
      );
      assert.equal(totalBps, 10000);
      console.log("  ✅ Project state verified: funded, 4 milestones, 10000 bps total");
    });

    it("artist vesting is initialized correctly", async () => {
      const vesting = await program.account.artistVesting.fetch(artistVestingPda);
      assert.ok(vesting.project.equals(projectPda));
      assert.ok(vesting.artist.equals(artist.publicKey));
      assert.ok(vesting.startTs.gt(new BN(0)));
      assert.equal(vesting.duration.toNumber(), 31_536_000);
      assert.equal(vesting.claimed.toNumber(), 0);
      console.log("  ✅ Artist vesting verified: 12-month duration, 0 claimed");
    });

    it("milestone market is in correct state", async () => {
      const market = await program.account.milestoneMarket.fetch(milestoneMarketPda);
      assert.deepEqual(market.status, { proofSubmitted: {} });
      assert.ok(market.totalYesShares.gt(new BN(0)));
      assert.ok(market.totalNoShares.gt(new BN(0)));
      assert.equal(market.proofIpfs, "QmTzQ1JRkWErjk39mryYw2WVrgBz2Tfx1ELky9dERBwP1");
      console.log("  ✅ Market state verified: proof submitted, shares > 0");
    });
  });
});
