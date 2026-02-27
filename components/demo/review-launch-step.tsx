'use client'

import { useState } from 'react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useCreateProject } from '@/hooks/use-create-project'
import { useKordProgram } from '@/lib/kord-program'

interface ReviewLaunchStepProps {
  formData: any
  onLaunch: () => void
  onPrevious: () => void
}

export function ReviewLaunchStep({ formData, onLaunch, onPrevious }: ReviewLaunchStepProps) {
  const { createProject, isLoading: isLaunching, error: launchError } = useCreateProject()
  const { connected } = useKordProgram()
  const [txHash, setTxHash] = useState<string | null>(null)

  const total = Object.values(formData.budgetBreakdown).reduce((sum: number, val: any) => sum + Number(val), 0)
  const tokenomicsData = {
    totalSupply: 1000000,
    publicSale: 50,
    liquidityPool: 20,
    anchor: 20,
    artist: 10,
    initialLPSeed: total * 0.1,
    initialPrice: 0.1,
    expectedTokensSold: (total / 0.1) * 0.5,
  }

  const handleLaunch = async () => {
    // Convert USD goal to lamports (approximate: $1 ≈ 0.005 SOL placeholder)
    const goalLamports = Math.round(formData.fundingGoal * 0.005 * LAMPORTS_PER_SOL)
    const projectId = Date.now() // Use timestamp as unique project ID

    const milestones = [
      { description: 'Demo Recording', allocationBps: 3000 },
      { description: 'Mixing Complete', allocationBps: 3000 },
      { description: 'Mastering Done', allocationBps: 2000 },
      { description: 'Distribution', allocationBps: 2000 },
    ]

    const result = await createProject({
      projectId,
      goal: goalLamports,
      milestones,
    })

    if (result) {
      setTxHash(result.txSignature)
      onLaunch()
    }
  }

  const formatCurrency = (num: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num)
  const formatDate = (date: Date) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date)
  const daysRemaining = Math.ceil((formData.campaignEnd - new Date()) / (1000 * 60 * 60 * 24))

  return (
    <div className="space-y-8 py-8">
      {/* Project Preview */}
      <Card className="p-6 border border-border">
        <h3 className="text-sm font-mono font-bold mb-6 uppercase tracking-widest">Project Preview</h3>

        <div className="space-y-6">
          {/* Project Summary */}
          <div className="p-4 bg-secondary/30 rounded-lg border border-border space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="font-mono font-bold">{formData.projectTitle}</span>
              <span className="text-xs text-muted-foreground font-mono">by {formData.artistHandle}</span>
            </div>
            <div className="flex gap-3 flex-wrap text-xs font-mono">
              <span className="px-2 py-1 bg-accent/20 text-accent rounded border border-accent">
                {formatCurrency(formData.fundingGoal)} goal
              </span>
              <span className="px-2 py-1 bg-background border border-border rounded">
                {daysRemaining} days
              </span>
              <span className="px-2 py-1 bg-background border border-border rounded">
                {formData.genre}
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-mono line-clamp-2">{formData.description}</p>
          </div>

          {/* Checklist */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-mono">
              <span className="text-accent">✓</span>
              <span>Budget validated</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-mono">
              <span className="text-accent">✓</span>
              <span>Perks configured ({formData.perks?.length || 0} perks)</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-mono">
              <span className="text-accent">✓</span>
              <span>Timeline set ({formatDate(formData.campaignEnd)})</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Tokenomics */}
      <Card className="p-6 border border-border">
        <h3 className="text-sm font-mono font-bold mb-6 uppercase tracking-widest">Tokenomics (Fixed)</h3>

        <div className="space-y-4">
          <div className="p-4 bg-secondary/30 rounded-lg border border-border space-y-3">
            <div className="flex justify-between items-baseline text-sm font-mono">
              <span>Total Supply:</span>
              <span className="font-bold">{tokenomicsData.totalSupply.toLocaleString()} KORD-{formData.projectTitle?.split(' ')[0]?.toUpperCase() || 'PROJECT'} tokens</span>
            </div>

            {/* Distribution */}
            <div className="space-y-2 pt-3 border-t border-border">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-accent">{tokenomicsData.publicSale}% Public Sale</span>
                <span className="text-muted-foreground">{(tokenomicsData.totalSupply * 0.5).toLocaleString()} tokens</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-accent">{tokenomicsData.liquidityPool}% LP (Uniswap v4)</span>
                <span className="text-muted-foreground">{(tokenomicsData.totalSupply * 0.2).toLocaleString()} tokens</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-accent">{tokenomicsData.anchor}% Anchor (Team)</span>
                <span className="text-muted-foreground">{(tokenomicsData.totalSupply * 0.2).toLocaleString()} tokens</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-accent">{tokenomicsData.artist}% Artist</span>
                <span className="text-muted-foreground">{(tokenomicsData.totalSupply * 0.1).toLocaleString()} tokens</span>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2 pt-3 border-t border-border">
              <div className="flex justify-between text-sm font-mono">
                <span className="text-muted-foreground">Initial LP Seed:</span>
                <span>{formatCurrency(tokenomicsData.initialLPSeed)}</span>
              </div>
              <div className="flex justify-between text-sm font-mono">
                <span className="text-muted-foreground">Initial Price:</span>
                <span>${tokenomicsData.initialPrice.toFixed(2)} per token</span>
              </div>
              <div className="flex justify-between text-sm font-mono">
                <span className="text-muted-foreground">Expected Tokens Sold:</span>
                <span>{Math.round(tokenomicsData.expectedTokensSold).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tx Status */}
      {launchError && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
          <p className="text-sm font-mono text-destructive">❌ {launchError}</p>
        </div>
      )}
      {txHash && (
        <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
          <p className="text-sm font-mono text-accent">✅ Project created on-chain!</p>
          <a
            href={`https://explorer.solana.com/tx/${txHash}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-accent underline"
          >
            View on Solana Explorer →
          </a>
        </div>
      )}

      {/* Warnings */}
      <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 space-y-2">
        <p className="text-sm font-mono">
          <span className="text-destructive">⚠️</span> This creates immutable SPL token + smart contracts
        </p>
        <p className="text-sm font-mono">
          <span className="text-destructive">⚠️</span> 90% funds escrowed until milestones complete
        </p>
        <p className="text-sm font-mono">
          <span className="text-destructive">⚠️</span> 5% platform fee on successful raise
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between gap-4">
        <Button variant="outline" onClick={onPrevious} className="font-mono">
          ← Back
        </Button>
        <Button
          onClick={handleLaunch}
          disabled={isLaunching || !connected}
          className="font-mono"
          size="lg"
        >
          {!connected ? 'Connect Wallet First' : isLaunching ? 'Deploying On-Chain...' : 'Launch Project →'}
        </Button>
      </div>
    </div>
  )
}
