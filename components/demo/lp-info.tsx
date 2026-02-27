'use client'

export function LPInfo() {
  return (
    <section>
      <h2 className="text-2xl font-[family-name:var(--font-geist-pixel-square)] mb-6">Liquidity & Royalties</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* How ECHOES Value Grows */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <h3 className="text-lg font-[family-name:var(--font-geist-pixel-square)] mb-4">How ECHOES Value Grows</h3>
          <ol className="space-y-3 text-sm font-mono">
            <li className="flex gap-3">
              <span className="text-green-500 font-bold">1.</span>
              <span className="text-foreground">Album streams → Audius AUDIO tokens</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-500 font-bold">2.</span>
              <span className="text-foreground">Anchor Org collects → Deposits LP</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-500 font-bold">3.</span>
              <span className="text-foreground">LP value ↑ → ECHOES price ↑ → You profit</span>
            </li>
          </ol>
        </div>

        {/* Anchor Status */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <h3 className="text-lg font-[family-name:var(--font-geist-pixel-square)] mb-4">Anchor Status</h3>
          <div className="space-y-4 text-sm">
            <div>
              <div className="flex items-center justify-between mb-2 font-mono">
                <span className="text-muted-foreground">AUDIO Collected</span>
                <span className="text-green-500">1,234 ($3,702)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2 font-mono">
                <span className="text-muted-foreground">LP Deposited</span>
                <span className="text-green-500">$2,340 (63%)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '63%' }} />
              </div>
            </div>
            <div className="pt-4 border-t border-border text-xs text-muted-foreground font-mono">
              ⏰ Next Deposit: Mar 5th (Monthly)
            </div>
          </div>
        </div>
      </div>

      {/* Info Links */}
      <div className="mt-6 flex gap-4 text-sm">
        <a href="#" className="px-4 py-2 border border-border rounded-lg hover:border-green-500 transition-colors font-mono">
          Anchor Org on Solscan
        </a>
        <a href="#" className="px-4 py-2 border border-border rounded-lg hover:border-green-500 transition-colors font-mono">
          Royalty Flow Diagram
        </a>
      </div>
    </section>
  )
}
