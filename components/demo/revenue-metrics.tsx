'use client'

import { AlertCircle } from 'lucide-react'

export function RevenueMetrics() {
  return (
    <div className="space-y-6">
      {/* Status Alert */}
      <div className="border border-border rounded-lg p-4 bg-muted flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-mono text-sm font-semibold mb-1">Campaign Active</h4>
          <p className="text-xs text-muted-foreground">Revenue tracking begins after funding completes and album is released.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-border rounded-lg p-4 bg-card">
          <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">Anchor Wallet</h4>
          <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-accent">$0</div>
          <p className="text-xs text-muted-foreground font-mono mt-1">Royalty balance</p>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card">
          <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">LP Deposits</h4>
          <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-accent">$0</div>
          <p className="text-xs text-muted-foreground font-mono mt-1">Liquidity pool</p>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card">
          <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">AUDIO Tokens</h4>
          <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-accent">0 AUDIO</div>
          <p className="text-xs text-muted-foreground font-mono mt-1">$0 value</p>
        </div>
      </div>

      {/* Projections */}
      <div className="border border-border rounded-lg p-4 bg-card">
        <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Projected Revenue</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm font-mono text-muted-foreground mb-3">Monthly Estimate (After Release)</div>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 border border-border/50 rounded">
                <span className="text-sm font-mono">AUDIO Royalties</span>
                <span className="text-accent font-mono">~2.5K AUDIO</span>
              </div>
              <div className="flex justify-between items-center p-2 border border-border/50 rounded">
                <span className="text-sm font-mono">USD Value</span>
                <span className="text-accent font-mono">~$500</span>
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm font-mono text-muted-foreground mb-3">Year 1 Projection</div>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 border border-border/50 rounded">
                <span className="text-sm font-mono">Total AUDIO</span>
                <span className="text-accent font-mono">~30K AUDIO</span>
              </div>
              <div className="flex justify-between items-center p-2 border border-border/50 rounded">
                <span className="text-sm font-mono">USD Value</span>
                <span className="text-accent font-mono">~$6,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Distribution */}
      <div className="border border-border rounded-lg p-4 bg-card">
        <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Revenue Distribution</h4>
        <div className="space-y-3">
          <div className="p-3 border border-border/50 rounded">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-mono">Artist Payment</span>
              <span className="text-accent font-mono">95% ($5,700/year)</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-accent h-2 rounded-full" style={{ width: '95%' }} />
            </div>
          </div>
          <div className="p-3 border border-border/50 rounded">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-mono">Platform Share</span>
              <span className="text-accent font-mono">5% ($300/year)</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-accent h-2 rounded-full" style={{ width: '5%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="border border-border/50 rounded-lg p-4 bg-muted/50">
        <h4 className="font-mono text-xs uppercase tracking-widest text-foreground mb-2">How Revenue Works</h4>
        <div className="text-xs text-muted-foreground space-y-1 font-mono">
          <p>1. Album release must be completed via milestone</p>
          <p>2. Royalties are collected on a monthly basis</p>
          <p>3. Artists receive 95% of monthly royalties</p>
          <p>4. Platform takes 5% for maintenance & development</p>
          <p>5. AUDIO tokens are distributed to NFT holders proportionally</p>
        </div>
      </div>
    </div>
  )
}
