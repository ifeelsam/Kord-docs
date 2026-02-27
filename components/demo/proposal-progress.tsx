'use client'

import { CheckCircle2, AlertCircle, Clock } from 'lucide-react'

export function ProposalProgress() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-[family-name:var(--font-geist-pixel-square)] mb-6">Milestone 2 Details</h3>
        <p className="text-lg text-muted-foreground font-mono mb-6">"Mixing Complete" - 30% Release</p>

        <div className="border border-border rounded-lg p-6 bg-card mb-8">
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Description</label>
              <p className="text-foreground mt-2">All 10 tracks mixed + initial mastering</p>
            </div>
            <div>
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Funds at Risk</label>
              <p className="text-foreground mt-2">$15,000 (30% of total)</p>
            </div>
            <div>
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Deadline</label>
              <p className="text-foreground mt-2">Feb 28, 2026 23:59 UTC</p>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div>
                  <div className="text-xs font-mono text-muted-foreground">Current Status</div>
                  <div className="font-mono text-sm text-green-500">Active</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-yellow-500" />
                <div>
                  <div className="text-xs font-mono text-muted-foreground">Resolution</div>
                  <div className="font-mono text-sm text-yellow-500">Pending</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TWAP Indicator */}
        <div className="border border-border rounded-lg p-6 bg-card mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">TWAP Resolution</div>
              <div className="text-3xl font-[family-name:var(--font-geist-pixel-square)] text-green-500 mb-2">86.2% Yes</div>
              <p className="text-sm font-mono text-muted-foreground">Will PASS if &gt; 50%</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-[family-name:var(--font-geist-pixel-square)] text-green-500">✓</div>
            </div>
          </div>
        </div>

        {/* Resolution States Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-green-500/30 rounded-lg p-4 bg-green-500/5">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="font-mono text-sm font-bold text-green-500">PASSED</span>
            </div>
            <p className="text-xs font-mono text-muted-foreground">$15K released to artist</p>
          </div>
          <div className="border border-red-500/30 rounded-lg p-4 bg-red-500/5">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="font-mono text-sm font-bold text-red-500">FAILED</span>
            </div>
            <p className="text-xs font-mono text-muted-foreground">$15K returned to investors</p>
          </div>
          <div className="border border-yellow-500/30 rounded-lg p-4 bg-yellow-500/5">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <span className="font-mono text-sm font-bold text-yellow-500">PENDING</span>
            </div>
            <p className="text-xs font-mono text-muted-foreground">TWAP calculation in progress...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
