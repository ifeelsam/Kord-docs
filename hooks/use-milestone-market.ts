'use client'

import { useState, useEffect, useCallback } from 'react'
import { PublicKey, SystemProgram } from '@solana/web3.js'
import { useKordProgram, getProjectPda, getMilestonePda, getVaultPda } from '@/lib/kord-program'
import BN from 'bn.js'

export interface MilestoneMarketData {
    milestoneId: number
    project: PublicKey
    yesPool: number
    noPool: number
    totalYesShares: number
    totalNoShares: number
    fundsLocked: number
    twapStart: number
    twapWindow: number
    proofIpfs: string
    status: string
    yesPricePct: number
    noPricePct: number
}

function parseMarketStatus(status: any): string {
    if (status.open) return 'open'
    if (status.proofSubmitted) return 'proofSubmitted'
    if (status.resolved) return 'resolved'
    return 'unknown'
}

export function useMilestoneMarket(artistKey: PublicKey | null, projectId: number, milestoneId: number) {
    const { program, provider } = useKordProgram()
    const [market, setMarket] = useState<MilestoneMarketData | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [txSignature, setTxSignature] = useState<string | null>(null)

    const fetchMarket = useCallback(async () => {
        if (!program || !artistKey) return
        setIsLoading(true)
        try {
            const [projectPda] = getProjectPda(artistKey, projectId)
            const [marketPda] = getMilestonePda(projectPda, milestoneId)
            const acct = await program.account.milestoneMarket.fetch(marketPda)

            const yp = acct.yesPool.toNumber()
            const np = acct.noPool.toNumber()
            const total = yp + np

            setMarket({
                milestoneId: acct.milestoneId,
                project: acct.project,
                yesPool: yp,
                noPool: np,
                totalYesShares: acct.totalYesShares.toNumber(),
                totalNoShares: acct.totalNoShares.toNumber(),
                fundsLocked: acct.fundsLocked.toNumber(),
                twapStart: acct.twapStart.toNumber(),
                twapWindow: acct.twapWindow.toNumber(),
                proofIpfs: acct.proofIpfs,
                status: parseMarketStatus(acct.status),
                yesPricePct: total > 0 ? Math.round((np / total) * 100) : 50,
                noPricePct: total > 0 ? Math.round((yp / total) * 100) : 50,
            })
        } catch (err: any) {
            console.error('Fetch market error:', err)
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }, [program, artistKey, projectId, milestoneId])

    useEffect(() => {
        fetchMarket()
    }, [fetchMarket])

    const trade = useCallback(async (isYes: boolean, amountLamports: number) => {
        if (!program || !provider || !artistKey) {
            setError('Wallet not connected')
            return null
        }

        setIsLoading(true)
        setError(null)
        try {
            const [projectPda] = getProjectPda(artistKey, projectId)
            const [marketPda] = getMilestonePda(projectPda, milestoneId)

            const tx = await program.methods
                .tradeOutcome(isYes, new BN(amountLamports))
                .accountsPartial({
                    trader: provider.wallet.publicKey,
                    milestoneMarket: marketPda,
                    systemProgram: SystemProgram.programId,
                })
                .rpc()

            setTxSignature(tx)
            await fetchMarket()
            return tx
        } catch (err: any) {
            console.error('Trade error:', err)
            setError(err.message || 'Trade failed')
            return null
        } finally {
            setIsLoading(false)
        }
    }, [program, provider, artistKey, projectId, milestoneId, fetchMarket])

    const submitProof = useCallback(async (proofIpfs: string) => {
        if (!program || !provider || !artistKey) return null
        setIsLoading(true)
        setError(null)
        try {
            const [projectPda] = getProjectPda(artistKey, projectId)
            const [marketPda] = getMilestonePda(projectPda, milestoneId)

            const tx = await program.methods
                .submitMilestoneProof(proofIpfs)
                .accountsPartial({
                    artist: provider.wallet.publicKey,
                    milestoneMarket: marketPda,
                })
                .rpc()

            setTxSignature(tx)
            await fetchMarket()
            return tx
        } catch (err: any) {
            setError(err.message || 'Submit proof failed')
            return null
        } finally {
            setIsLoading(false)
        }
    }, [program, provider, artistKey, projectId, milestoneId, fetchMarket])

    const resolve = useCallback(async () => {
        if (!program || !provider || !artistKey) return null
        setIsLoading(true)
        setError(null)
        try {
            const [projectPda] = getProjectPda(artistKey, projectId)
            const [marketPda] = getMilestonePda(projectPda, milestoneId)
            const [milestoneVaultPda] = getVaultPda(projectPda)

            const tx = await program.methods
                .resolveMilestone()
                .accountsPartial({
                    resolver: provider.wallet.publicKey,
                    milestoneMarket: marketPda,
                    artistWallet: artistKey,
                    milestoneVault: milestoneVaultPda,
                    systemProgram: SystemProgram.programId,
                })
                .rpc()

            setTxSignature(tx)
            await fetchMarket()
            return tx
        } catch (err: any) {
            setError(err.message || 'Resolve failed')
            return null
        } finally {
            setIsLoading(false)
        }
    }, [program, provider, artistKey, projectId, milestoneId, fetchMarket])

    return { market, trade, submitProof, resolve, isLoading, error, txSignature, refetch: fetchMarket }
}
