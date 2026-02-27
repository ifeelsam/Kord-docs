'use client'

import { useState, useCallback } from 'react'
import { PublicKey, SystemProgram } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync } from '@solana/spl-token'
import { useKordProgram, getProjectPda, getAnchorPda, getVestingPda } from '@/lib/kord-program'
import BN from 'bn.js'

export function useRoyalties() {
    const { program, provider } = useKordProgram()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [txSignature, setTxSignature] = useState<string | null>(null)

    const deposit = useCallback(async (
        artistKey: PublicKey,
        projectId: number,
        amountLamports: number,
    ) => {
        if (!program || !provider) {
            setError('Wallet not connected')
            return null
        }

        setIsLoading(true)
        setError(null)
        try {
            const [projectPda] = getProjectPda(artistKey, projectId)
            const [anchorPda] = getAnchorPda(projectPda)

            const tx = await program.methods
                .depositAudioRoyalties(new BN(amountLamports))
                .accountsPartial({
                    depositor: provider.wallet.publicKey,
                    anchorAccount: anchorPda,
                    systemProgram: SystemProgram.programId,
                })
                .rpc()

            setTxSignature(tx)
            return tx
        } catch (err: any) {
            setError(err.message || 'Deposit failed')
            return null
        } finally {
            setIsLoading(false)
        }
    }, [program, provider])

    const claimVesting = useCallback(async (
        artistKey: PublicKey,
        projectId: number,
        tokenMint: PublicKey,
    ) => {
        if (!program || !provider) {
            setError('Wallet not connected')
            return null
        }

        setIsLoading(true)
        setError(null)
        try {
            const [projectPda] = getProjectPda(artistKey, projectId)
            const [vestingPda] = getVestingPda(projectPda)

            const vestingTokenAccount = getAssociatedTokenAddressSync(tokenMint, artistKey)
            const artistTokenAccount = getAssociatedTokenAddressSync(tokenMint, provider.wallet.publicKey)

            const tx = await program.methods
                .claimArtistVesting()
                .accountsPartial({
                    artist: provider.wallet.publicKey,
                    vestingTokenAccount,
                    artistTokenAccount,
                    tokenProgram: TOKEN_PROGRAM_ID,
                })
                .rpc()

            setTxSignature(tx)
            return tx
        } catch (err: any) {
            setError(err.message || 'Claim vesting failed')
            return null
        } finally {
            setIsLoading(false)
        }
    }, [program, provider])

    return { deposit, claimVesting, isLoading, error, txSignature }
}
