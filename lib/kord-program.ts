'use client'

import { useMemo } from 'react'
import { Program, AnchorProvider } from '@coral-xyz/anchor'
import { useConnection, useAnchorWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import type { KordProgram } from '@/idl/kord_program_types'
import idl from '@/idl/kord_program.json'

// ── Program ID (deployed on devnet) ─────────────────────────
export const PROGRAM_ID = new PublicKey('94tD81LyLHpaNZFVfoNT2g98Bi4FpZVEjVm8L2xj3KyH')

// ── PDA Seeds ───────────────────────────────────────────────
export const PROJECT_SEED = Buffer.from('project')
export const MILESTONE_SEED = Buffer.from('milestone')
export const ANCHOR_SEED = Buffer.from('anchor')
export const VESTING_SEED = Buffer.from('vesting')
export const VAULT_SEED = Buffer.from('vault')

// ── Constants ───────────────────────────────────────────────
export const PRICE_PER_TOKEN_LAMPORTS = 100_000
export const TOKEN_DECIMALS = 6
export const TOTAL_SUPPLY_UNITS = 1_000_000_000_000

// ── PDA Derivation Helpers ──────────────────────────────────
export function getProjectPda(artist: PublicKey, projectId: number): [PublicKey, number] {
    const ab = new ArrayBuffer(8)
    new DataView(ab).setBigUint64(0, BigInt(projectId), true /* little-endian */)
    const buf = Buffer.from(ab)
    return PublicKey.findProgramAddressSync(
        [PROJECT_SEED, artist.toBuffer(), buf],
        PROGRAM_ID
    )
}

export function getVaultPda(projectPda: PublicKey): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
        [VAULT_SEED, projectPda.toBuffer()],
        PROGRAM_ID
    )
}

export function getAnchorPda(projectPda: PublicKey): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
        [ANCHOR_SEED, projectPda.toBuffer()],
        PROGRAM_ID
    )
}

export function getVestingPda(projectPda: PublicKey): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
        [VESTING_SEED, projectPda.toBuffer()],
        PROGRAM_ID
    )
}

export function getMilestonePda(projectPda: PublicKey, milestoneId: number): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
        [MILESTONE_SEED, projectPda.toBuffer(), Buffer.from([milestoneId])],
        PROGRAM_ID
    )
}

// ── Program Hook ────────────────────────────────────────────
export function useKordProgram() {
    const { connection } = useConnection()
    const wallet = useAnchorWallet()

    const provider = useMemo(() => {
        if (!wallet) return null
        return new AnchorProvider(connection, wallet, {
            commitment: 'confirmed',
        })
    }, [connection, wallet])

    const program = useMemo(() => {
        if (!provider) return null
        return new Program<KordProgram>(idl as any, provider)
    }, [provider])

    return { program, provider, connected: !!wallet }
}
