'use client'

import { useState, useCallback } from 'react'
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync, createAssociatedTokenAccountIdempotentInstruction } from '@solana/spl-token'
import { useKordProgram, getProjectPda, getVaultPda } from '@/lib/kord-program'
import BN from 'bn.js'

export function useContribute() {
    const { program, provider } = useKordProgram()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [txSignature, setTxSignature] = useState<string | null>(null)

    const contribute = useCallback(async (
        artistKey: PublicKey,
        projectId: number,
        amountLamports: number,
        tokenMint: PublicKey,
    ) => {
        if (!program || !provider) {
            setError('Wallet not connected')
            return null
        }

        setIsLoading(true)
        setError(null)

        try {
            const contributor = provider.wallet.publicKey
            const [projectPda] = getProjectPda(artistKey, projectId)
            const [milestoneVaultPda] = getVaultPda(projectPda)

            const publicSaleAta = getAssociatedTokenAddressSync(tokenMint, projectPda, true)
            const contributorAta = getAssociatedTokenAddressSync(tokenMint, contributor)

            // Ensure contributor ATA exists
            const setupTx = new Transaction().add(
                createAssociatedTokenAccountIdempotentInstruction(contributor, contributorAta, contributor, tokenMint)
            )
            await provider.sendAndConfirm(setupTx)

            const tx = await program.methods
                .contribute(new BN(amountLamports))
                .accountsPartial({
                    contributor,
                    milestoneVault: milestoneVaultPda,
                    publicSaleAccount: publicSaleAta,
                    contributorTokenAccount: contributorAta,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    systemProgram: SystemProgram.programId,
                })
                .rpc()

            setTxSignature(tx)
            return tx
        } catch (err: any) {
            console.error('Contribute error:', err)
            setError(err.message || 'Contribution failed')
            return null
        } finally {
            setIsLoading(false)
        }
    }, [program, provider])

    const emergencyRefund = useCallback(async (
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
            const contributor = provider.wallet.publicKey
            const [projectPda] = getProjectPda(artistKey, projectId)
            const [milestoneVaultPda] = getVaultPda(projectPda)
            const contributorAta = getAssociatedTokenAddressSync(tokenMint, contributor)

            const tx = await program.methods
                .emergencyRefund()
                .accountsPartial({
                    contributor,
                    milestoneVault: milestoneVaultPda,
                    contributorTokenAccount: contributorAta,
                    tokenMint,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    systemProgram: SystemProgram.programId,
                })
                .rpc()

            setTxSignature(tx)
            return tx
        } catch (err: any) {
            console.error('Emergency refund error:', err)
            setError(err.message || 'Refund failed')
            return null
        } finally {
            setIsLoading(false)
        }
    }, [program, provider])

    return { contribute, emergencyRefund, isLoading, error, txSignature }
}
