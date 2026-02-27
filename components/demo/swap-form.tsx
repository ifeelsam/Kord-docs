'use client'

import { useState } from 'react'
import { ArrowUpDown } from 'lucide-react'

interface SwapFormProps {
  swapAmount: string
  setSwapAmount: (amount: string) => void
}

export function SwapForm({ swapAmount, setSwapAmount }: SwapFormProps) {
  const [outputAmount] = useState('13,764.04')
  const [slippage, setSlippage] = useState('0.5')

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="border border-border rounded-lg p-6 bg-card max-w-md">
        <h3 className="text-lg font-[family-name:var(--font-geist-pixel-square)] mb-6">Swap Tokens</h3>

        {/* From Token */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-mono text-muted-foreground">From</label>
            <span className="text-xs font-mono text-muted-foreground">Balance: 2.47 SOL</span>
          </div>
          <div className="flex gap-2 p-3 border border-border rounded-lg bg-background">
            <input
              type="text"
              value={swapAmount}
              onChange={(e) => setSwapAmount(e.target.value)}
              placeholder="0.00"
              className="flex-1 bg-transparent outline-none font-mono text-lg text-foreground placeholder-muted-foreground"
            />
            <button className="px-3 py-1 text-xs font-mono bg-muted rounded hover:bg-muted/80 transition-colors">
              SOL
            </button>
          </div>
          <button className="text-xs font-mono text-green-500 mt-2 hover:opacity-80 transition-opacity">
            [Max]
          </button>
        </div>

        {/* Swap Arrow */}
        <div className="flex justify-center mb-6">
          <button className="p-2 border border-border rounded-lg hover:border-green-500 transition-colors">
            <ArrowUpDown className="w-4 h-4 text-green-500" />
          </button>
        </div>

        {/* To Token */}
        <div className="mb-6">
          <label className="text-sm font-mono text-muted-foreground block mb-2">To</label>
          <div className="p-3 border border-border rounded-lg bg-background">
            <div className="text-lg font-mono text-green-500 mb-1">{outputAmount} ECHOES</div>
            <div className="text-xs text-muted-foreground font-mono">$1,225 value</div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-6 p-3 bg-background rounded-lg border border-border">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-muted-foreground">Price Impact</span>
            <span className="text-foreground">0.23%</span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-muted-foreground">Slippage</span>
            <select value={slippage} onChange={(e) => setSlippage(e.target.value)} className="bg-transparent text-foreground border-none outline-none cursor-pointer">
              <option>0.1%</option>
              <option>0.5%</option>
              <option>1%</option>
            </select>
          </div>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-muted-foreground">Route</span>
            <span className="text-foreground">Optimal</span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-muted-foreground">Deadline</span>
            <span className="text-foreground">20 mins</span>
          </div>
        </div>

        {/* Pro Tip */}
        <div className="text-xs text-muted-foreground font-mono mb-6 p-2 bg-background/50 border border-border/50 rounded">
          💡 Pro tip: Adjust slippage for large trades
        </div>

        {/* Swap Button */}
        <button className="w-full px-6 py-3 text-sm font-mono bg-green-500 text-black rounded-lg hover:opacity-90 transition-opacity">
          Swap →
        </button>
      </div>
    </div>
  )
}
