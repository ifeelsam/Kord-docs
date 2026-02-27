'use client'

export function YesNoMarket() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-[family-name:var(--font-geist-pixel-square)] mb-6">Yes/No Market</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-border rounded-lg p-4 bg-card">
            <div className="text-xs font-mono text-muted-foreground mb-2">YES PRICE</div>
            <div className="text-3xl font-[family-name:var(--font-geist-pixel-square)] text-green-500 mb-1">$0.87</div>
            <div className="text-sm font-mono text-green-500">87% Probability</div>
          </div>
          <div className="border border-border rounded-lg p-4 bg-card">
            <div className="text-xs font-mono text-muted-foreground mb-2">NO PRICE</div>
            <div className="text-3xl font-[family-name:var(--font-geist-pixel-square)] text-red-500 mb-1">$0.13</div>
            <div className="text-sm font-mono text-red-500">13% Probability</div>
          </div>
          <div className="border border-border rounded-lg p-4 bg-card">
            <div className="text-xs font-mono text-muted-foreground mb-2">RESOLUTION</div>
            <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-green-500 mb-1">86.2%</div>
            <div className="text-sm font-mono text-muted-foreground">TWAP Yes</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="text-xs font-mono text-muted-foreground mb-2">POOL DEPTH</div>
          <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)]">$8,742</div>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="text-xs font-mono text-muted-foreground mb-2">24H VOLUME</div>
          <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)]">$2,847</div>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="text-xs font-mono text-muted-foreground mb-2">YOUR POSITION</div>
          <div className="text-lg font-[family-name:var(--font-geist-pixel-square)] text-green-500">1,234 YES</div>
          <div className="text-sm font-mono text-muted-foreground">$1,073 value</div>
        </div>
      </div>
    </div>
  )
}
