'use client'

export function LiquidityMetrics() {
  const metrics = [
    { label: 'Pool Value', value: '$23,400', sublabel: 'Total LP Value' },
    { label: '24h Fees', value: '$56', sublabel: '0.3% of volume' },
    { label: 'Your Position', value: '$1,247', sublabel: '5.3% of pool' },
    { label: 'Volume', value: '$18.7K', sublabel: '24h Trading' },
    { label: 'AUDIO Royalties', value: '1,234', sublabel: 'Pending Deposit' },
    { label: 'Impermanent Loss', value: '-$23', sublabel: '-1.8% IL' },
  ]

  return (
    <section>
      <h2 className="text-2xl font-[family-name:var(--font-geist-pixel-square)] mb-6">Liquidity Metrics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {metrics.map((metric, i) => (
          <div key={i} className="border border-border rounded-lg p-4 bg-card hover:border-green-500/50 transition-colors">
            <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-2">{metric.label}</div>
            <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-green-500 mb-1">{metric.value}</div>
            <div className="text-xs text-muted-foreground font-mono">{metric.sublabel}</div>
          </div>
        ))}
      </div>

      {/* Pool Composition */}
      <div className="border border-border rounded-lg p-6 bg-card">
        <h3 className="font-mono text-sm uppercase tracking-widest mb-4">Pool Composition</h3>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2 text-sm font-mono">
              <span className="text-foreground">SOL</span>
              <span className="text-green-500">$11,700 (50%)</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '50%' }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2 text-sm font-mono">
              <span className="text-foreground">ECHOES</span>
              <span className="text-green-500">$11,700 (50%)</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '50%' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
