'use client'

import { Zap } from 'lucide-react'

interface BinaryMarketFormProps {
  betAmount: string
  setBetAmount: (amount: string) => void
  betType: 'yes' | 'no'
  setBetType: (type: 'yes' | 'no') => void
  onTrade?: () => void
  isTrading?: boolean
  txHash?: string | null
  yesPrice?: number
  noPrice?: number
}

export function BinaryMarketForm({ betAmount, setBetAmount, betType, setBetType, onTrade, isTrading, txHash, yesPrice: yesPriceProp, noPrice: noPriceProp }: BinaryMarketFormProps) {
  const yesPrice = yesPriceProp ?? 0.87
  const noPrice = noPriceProp ?? 0.13
  const selectedPrice = betType === 'yes' ? yesPrice : noPrice
  const shares = (parseFloat(betAmount) / selectedPrice).toFixed(2)
  const slippage = 0.8

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="border border-border rounded-lg p-6 bg-card">
        <h3 className="text-lg font-[family-name:var(--font-geist-pixel-square)] mb-6">Bet on Milestone Outcome</h3>

        <div className="space-y-4">
          {/* Amount Selection */}
          <div>
            <label className="block text-sm font-mono text-muted-foreground mb-3">Amount</label>
            <div className="flex gap-2 flex-wrap mb-4">
              {['50', '100', '250'].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setBetAmount(amount)}
                  className={`px-4 py-2 text-sm font-mono rounded-lg border transition-colors ${betAmount === amount
                      ? 'bg-green-500 text-black border-green-500'
                      : 'border-border text-muted-foreground hover:border-green-500'
                    }`}
                >
                  ${amount}
                </button>
              ))}
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                placeholder="Custom"
                className="px-4 py-2 text-sm font-mono bg-muted border border-border rounded-lg text-foreground flex-1 min-w-[120px]"
              />
              <span className="px-4 py-2 text-sm font-mono text-muted-foreground flex items-center">SOL</span>
            </div>
          </div>

          {/* Bet Type */}
          <div>
            <label className="block text-sm font-mono text-muted-foreground mb-3">Bet Type</label>
            <div className="flex gap-4">
              {[
                { value: 'yes' as const, label: 'Yes (87%)', color: 'green' },
                { value: 'no' as const, label: 'No (13%)', color: 'red' },
              ].map(({ value, label, color }) => (
                <button
                  key={value}
                  onClick={() => setBetType(value)}
                  className={`flex-1 px-4 py-3 text-sm font-mono rounded-lg border transition-colors ${betType === value
                      ? `bg-${color}-500 text-black border-${color}-500`
                      : `border-border text-muted-foreground hover:border-${color}-500`
                    }`}
                >
                  <span className={betType === value ? '' : color === 'green' ? 'text-green-500' : 'text-red-500'}>
                    ●
                  </span>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
            <div>
              <div className="text-xs font-mono text-muted-foreground mb-1">Market Price</div>
              <div className="text-lg font-[family-name:var(--font-geist-pixel-square)]">${selectedPrice.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-xs font-mono text-muted-foreground mb-1">You'll Get</div>
              <div className="text-lg font-[family-name:var(--font-geist-pixel-square)] text-green-500">{shares} shares</div>
            </div>
            <div>
              <div className="text-xs font-mono text-muted-foreground mb-1">Est. Value</div>
              <div className="text-lg font-[family-name:var(--font-geist-pixel-square)]">${betAmount}</div>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-muted-foreground pt-4 border-t border-border">
            <div>
              <span>Slippage:</span>
              <div className="text-foreground">{slippage}%</div>
            </div>
            <div>
              <span>TWAP Impact:</span>
              <div className="text-foreground">+0.12%</div>
            </div>
            <div>
              <span>Deadline:</span>
              <div className="text-foreground">24h</div>
            </div>
            <div>
              <span>Route:</span>
              <div className="text-foreground">Kord AMM</div>
            </div>
          </div>
        </div>

        {/* Trade Button */}
        <button
          onClick={onTrade}
          disabled={isTrading}
          className="w-full mt-6 px-6 py-3 text-sm font-mono bg-green-500 text-black rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-bold disabled:opacity-50"
        >
          <Zap className="w-4 h-4" />
          {isTrading ? 'Confirming...' : 'Trade'}
        </button>
        {txHash && (
          <a
            href={`https://explorer.solana.com/tx/${txHash}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 text-xs font-mono text-green-500 text-center underline"
          >
            ✅ View tx on Explorer →
          </a>
        )}
      </div>
    </div>
  )
}
