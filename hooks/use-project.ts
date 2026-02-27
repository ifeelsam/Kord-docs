'use client'

import { useState, useEffect, useCallback } from 'react'
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useKordProgram, getProjectPda, getAnchorPda, getVestingPda } from '@/lib/kord-program'

export interface ProjectData {
    artist: PublicKey
    tokenMint: PublicKey
    projectId: number
    goal: number
    raised: number
    status: string
    milestones: { description: string; allocationBps: number; completed: boolean }[]
    allocations: { publicPct: number; lpPct: number; anchorPct: number; artistPct: number }
    bump: number
}

export interface AnchorAccountData {
    totalDeposited: number
    lpValue: number
}

export interface VestingData {
    startTs: number
    duration: number
    totalAmount: number
    claimed: number
}

function parseStatus(status: any): string {
    if (status.active) return 'active'
    if (status.funded) return 'funded'
    if (status.completed) return 'completed'
    if (status.cancelled) return 'cancelled'
    return 'unknown'
}

export function useProject(artistKey: PublicKey | null, projectId: number) {
    const { program } = useKordProgram()
    const [project, setProject] = useState<ProjectData | null>(null)
    const [anchorAccount, setAnchorAccount] = useState<AnchorAccountData | null>(null)
    const [vesting, setVesting] = useState<VestingData | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetch = useCallback(async () => {
        if (!program || !artistKey) return

        setIsLoading(true)
        setError(null)

        try {
            const [projectPda] = getProjectPda(artistKey, projectId)
            const [anchorPda] = getAnchorPda(projectPda)
            const [vestingPda] = getVestingPda(projectPda)

            const projectAcct = await program.account.project.fetch(projectPda)
            setProject({
                artist: projectAcct.artist,
                tokenMint: projectAcct.tokenMint,
                projectId: projectAcct.projectId.toNumber(),
                goal: projectAcct.goal.toNumber(),
                raised: projectAcct.raised.toNumber(),
                status: parseStatus(projectAcct.status),
                milestones: projectAcct.milestones.map((m: any) => ({
                    description: m.description,
                    allocationBps: m.allocationBps.toNumber(),
                    completed: m.completed,
                })),
                allocations: projectAcct.allocations,
                bump: projectAcct.bump,
            })

            try {
                const anchorAcct = await program.account.anchorAccount.fetch(anchorPda)
                setAnchorAccount({
                    totalDeposited: anchorAcct.totalDeposited.toNumber(),
                    lpValue: anchorAcct.lpValue.toNumber(),
                })
            } catch { /* may not exist yet */ }

            try {
                const vestingAcct = await program.account.artistVesting.fetch(vestingPda)
                setVesting({
                    startTs: vestingAcct.startTs.toNumber(),
                    duration: vestingAcct.duration.toNumber(),
                    totalAmount: vestingAcct.totalAllocation.toNumber(),
                    claimed: vestingAcct.claimed.toNumber(),
                })
            } catch { /* may not exist yet */ }
        } catch (err: any) {
            console.error('Fetch project error:', err)
            setError(err.message || 'Failed to fetch project')
        } finally {
            setIsLoading(false)
        }
    }, [program, artistKey, projectId])

    useEffect(() => {
        fetch()
    }, [fetch])

    return { project, anchorAccount, vesting, isLoading, error, refetch: fetch }
}

/** Fetch all projects on-chain */
export function useAllProjects() {
    const { program } = useKordProgram()
    const [projects, setProjects] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchAll = useCallback(async () => {
        if (!program) return
        setIsLoading(true)
        try {
            const all = await program.account.project.all()
            setProjects(all.map(a => ({
                publicKey: a.publicKey,
                artist: a.account.artist,
                tokenMint: a.account.tokenMint,
                projectId: a.account.projectId.toNumber(),
                goal: a.account.goal.toNumber(),
                raised: a.account.raised.toNumber(),
                status: parseStatus(a.account.status),
                milestones: a.account.milestones.map((m: any) => ({
                    description: m.description,
                    allocationBps: m.allocationBps.toNumber(),
                    completed: m.completed,
                })),
                goalSol: a.account.goal.toNumber() / LAMPORTS_PER_SOL,
                raisedSol: a.account.raised.toNumber() / LAMPORTS_PER_SOL,
                fundingPct: Math.round((a.account.raised.toNumber() / a.account.goal.toNumber()) * 100),
            })))
        } catch (err) {
            console.error('Fetch all projects error:', err)
        } finally {
            setIsLoading(false)
        }
    }, [program])

    useEffect(() => {
        fetchAll()
    }, [fetchAll])

    return { projects, isLoading, refetch: fetchAll }
}
