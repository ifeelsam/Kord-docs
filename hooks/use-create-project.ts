'use client'

import { useState, useCallback } from 'react'
import { Keypair, PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync, createAssociatedTokenAccountIdempotentInstruction, createInitializeAccountInstruction } from '@solana/spl-token'
import { useConnection } from '@solana/wallet-adapter-react'
import { useKordProgram, getProjectPda, getVaultPda, getAnchorPda, getVestingPda } from '@/lib/kord-program'
import { Transaction } from '@solana/web3.js'
import BN from 'bn.js'

interface CreateProjectArgs {
    projectId: number
    goal: number // in lamports
    milestones: { description: string; allocationBps: number }[]
}

export function useCreateProject() {
    const { program, provider } = useKordProgram()
    const { connection } = useConnection()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [txSignature, setTxSignature] = useState<string | null>(null)

    const createProject = useCallback(async (args: CreateProjectArgs) => {
        if (!program || !provider) {
            setError('Wallet not connected')
            return null
        }

        setIsLoading(true)
        setError(null)
        setTxSignature(null)

        try {
            const artist = provider.wallet.publicKey
            const tokenMint = Keypair.generate()

            const [projectPda] = getProjectPda(artist, args.projectId)
            const [anchorAccountPda] = getAnchorPda(projectPda)

            const milestones = args.milestones.map(m => ({
                description: m.description,
                allocationBps: new BN(m.allocationBps),
            }))

            // Step 1: Create project (Anchor auto-resolves PDA accounts)
            const createTx = await program.methods
                .createProject(new BN(args.projectId), new BN(args.goal), milestones)
                .accountsPartial({
                    artist,
                    tokenMint: tokenMint.publicKey,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    systemProgram: SystemProgram.programId,
                    rent: SYSVAR_RENT_PUBKEY,
                })
                .signers([tokenMint])
                .rpc()

            console.log('create_project tx:', createTx)

            // Step 2: Create token accounts
            const publicSaleAta = getAssociatedTokenAddressSync(tokenMint.publicKey, projectPda, true)
            const anchorAta = getAssociatedTokenAddressSync(tokenMint.publicKey, anchorAccountPda, true)
            const artistAta = getAssociatedTokenAddressSync(tokenMint.publicKey, artist)

            // LP: standalone token account (separate from project ATA)
            const lpTokenKeypair = Keypair.generate()
            const space = 165
            const lamports = await connection.getMinimumBalanceForRentExemption(space)

            const setupTx = new Transaction()
            setupTx.add(createAssociatedTokenAccountIdempotentInstruction(artist, publicSaleAta, projectPda, tokenMint.publicKey))
            setupTx.add(createAssociatedTokenAccountIdempotentInstruction(artist, anchorAta, anchorAccountPda, tokenMint.publicKey))
            setupTx.add(createAssociatedTokenAccountIdempotentInstruction(artist, artistAta, artist, tokenMint.publicKey))
            setupTx.add(SystemProgram.createAccount({
                fromPubkey: artist,
                newAccountPubkey: lpTokenKeypair.publicKey,
                space,
                lamports,
                programId: TOKEN_PROGRAM_ID,
            }))
            setupTx.add(createInitializeAccountInstruction(lpTokenKeypair.publicKey, tokenMint.publicKey, projectPda, TOKEN_PROGRAM_ID))

            await provider.sendAndConfirm(setupTx, [lpTokenKeypair])

            // Step 3: Initialize token allocations
            const allocTx = await program.methods
                .initializeTokenAllocations()
                .accountsPartial({
                    artist,
                    project: projectPda,
                    tokenMint: tokenMint.publicKey,
                    publicSaleAccount: publicSaleAta,
                    lpTokenAccount: lpTokenKeypair.publicKey,
                    anchorTokenAccount: anchorAta,
                    artistTokenAccount: artistAta,
                    tokenProgram: TOKEN_PROGRAM_ID,
                })
                .rpc()

            console.log('initialize_token_allocations tx:', allocTx)

            setTxSignature(createTx)
            return {
                txSignature: createTx,
                projectPda,
                tokenMint: tokenMint.publicKey,
            }
        } catch (err: any) {
            console.error('Create project error:', err)
            setError(err.message || 'Failed to create project')
            return null
        } finally {
            setIsLoading(false)
        }
    }, [program, provider, connection])

    return { createProject, isLoading, error, txSignature }
}
