'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface InvestmentFormProps {
  investAmount: number
  onAmountChange: (amount: number) => void
  tokenPrice: number
  daysLeft: number
  lpDepth: number
}

export function InvestmentForm({
  investAmount,
  onAmountChange,
  tokenPrice,
  daysLeft,
  lpDepth,
}: InvestmentFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [slippage, setSlippage] = useState(0.5)

  const tokensToReceive = Math.floor(investAmount / tokenPrice)
  const slippageAmount = investAmount * (slippage / 100)
  const estimatedValue = investAmount - slippageAmount

  const quickAmounts = [100, 250, 500, 1000]

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-4 sticky top-32">
      <h3 className="text-lg font-bold font-[family-name:var(--font-geist-pixel-square)]">Invest in Echoes</h3>

      <div className="text-xs font-mono text-muted-foreground space-y-1">
        <p>Current Price: ${tokenPrice.toFixed(3)} per token</p>
        <p>LP Depth: ${lpDepth.toLocaleString()}</p>
      </div>

      <div className="border-t border-border pt-4 space-y-4">
        {/* Amount Selection */}
        <div>
          <p className="text-xs font-mono text-muted-foreground mb-2">Amount</p>
          <div className="space-y-2">
            <div className="flex gap-2 flex-wrap">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => onAmountChange(amount)}
                  className={`px-3 py-1 text-xs font-mono rounded transition-all ${
                    investAmount === amount
                      ? 'bg-accent text-background'
                      : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>
            <input
              type="number"
              value={investAmount}
              onChange={(e) => onAmountChange(Number(e.target.value))}
              placeholder="Custom amount"
              className="w-full px-3 py-2 bg-secondary border border-border rounded text-sm font-mono text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        {/* Tokens Calculation */}
        <div className="bg-secondary rounded p-3 space-y-1">
          <p className="text-xs font-mono text-muted-foreground">You'll Get</p>
          <p className="text-lg font-bold font-mono">{tokensToReceive.toLocaleString()} tokens</p>
          <p className="text-xs font-mono text-muted-foreground">Est. Value: ${estimatedValue.toFixed(0)}</p>
        </div>

        {/* Slippage & Network */}
        <div className="space-y-2 border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono text-muted-foreground">Slippage</label>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono">{slippage.toFixed(1)}%</span>
              <button className="p-1 hover:bg-secondary rounded">
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span>Deadline</span>
            <span>{daysLeft} days</span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span>Network</span>
            <span>Solana Mainnet</span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span>Gas</span>
            <span>~0.001 SOL</span>
          </div>
        </div>

        {/* CTA */}
        <button className="w-full px-4 py-3 text-sm font-mono bg-accent text-background rounded-lg font-bold hover:opacity-90 transition-opacity mt-4">
          Invest ${investAmount}
        </button>

        {/* Pro Tip */}
        <p className="text-xs font-mono text-muted-foreground text-center">
          💡 Smaller investments = higher slippage
        </p>
      </div>
    </div>
  )
}
