'use client'

export function PositionManager() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-[family-name:var(--font-geist-pixel-square)] mb-6">Your Position</h2>

      {/* Position Header */}
      <div className="border border-border rounded-lg p-6 bg-card mb-6">
        <div className="text-center mb-6">
          <div className="text-3xl font-[family-name:var(--font-geist-pixel-square)] text-green-500 mb-2">
            $1,247
          </div>
          <div className="text-sm font-mono text-muted-foreground">value (5.3% of pool)</div>
        </div>

        {/* Position Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 pb-6 border-b border-border">
          <div>
            <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-2">SOL</div>
            <div className="text-lg font-[family-name:var(--font-geist-pixel-square)] text-green-500">6.23</div>
            <div className="text-xs text-muted-foreground font-mono">($970)</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-2">ECHOES</div>
            <div className="text-lg font-[family-name:var(--font-geist-pixel-square)] text-green-500">13,764</div>
            <div className="text-xs text-muted-foreground font-mono">($277)</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-2">Fees Earned</div>
            <div className="text-lg font-[family-name:var(--font-geist-pixel-square)] text-green-500">$12.34</div>
            <div className="text-xs text-muted-foreground font-mono">(0.3%)</div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-2">Share of Pool</div>
            <div className="text-lg font-[family-name:var(--font-geist-pixel-square)] text-green-500">5.3%</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-2">IL</div>
            <div className="text-lg font-[family-name:var(--font-geist-pixel-square)]">
              <span className="text-red-500">-$23</span>
              <div className="text-xs text-red-500 font-mono">-1.8%</div>
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-2">APR</div>
            <div className="text-lg font-[family-name:var(--font-geist-pixel-square)] text-green-500">24.7%</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button className="px-6 py-3 text-sm font-mono bg-green-500 text-black rounded-lg hover:opacity-90 transition-opacity">
          Add Liquidity
        </button>
        <button className="px-6 py-3 text-sm font-mono border border-border rounded-lg hover:border-green-500 transition-colors">
          Remove Liquidity
        </button>
        <button className="px-6 py-3 text-sm font-mono border border-border rounded-lg hover:border-green-500 transition-colors">
          Claim Fees
        </button>
      </div>
    </section>
  )
}
