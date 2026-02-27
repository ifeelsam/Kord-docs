'use client'

import { Card } from '@/components/ui/card'
import { TrendingUp, X } from 'lucide-react'

interface ArtistAnalyticsModalProps {
  projectId: string
  onClose: () => void
  project: {
    title: string
    fundingProgress: number
    fundingAmount: string
    tokenPrice: string
    tokenChange: string
  }
}

export function ArtistAnalyticsModal({
  projectId,
  onClose,
  project,
}: ArtistAnalyticsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-foreground">
            {project.title} Analytics
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Funding section */}
          <div>
            <h3 className="text-lg font-[family-name:var(--font-geist-pixel-square)] text-foreground mb-4">
              📊 Funding Status
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-muted-foreground">
                    {project.fundingAmount}
                  </span>
                  <span className="font-mono text-accent font-bold">
                    {project.fundingProgress}%
                  </span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${project.fundingProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Token performance */}
          <div>
            <h3 className="text-lg font-[family-name:var(--font-geist-pixel-square)] text-foreground mb-4">
              📈 Token Performance
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-border bg-muted/30">
                <p className="text-xs font-mono text-muted-foreground mb-1">Price (24h)</p>
                <p className="text-lg font-mono text-foreground mb-2">
                  {project.tokenPrice}
                </p>
                <div className="flex items-center gap-1 text-green-500">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-mono">{project.tokenChange}</span>
                </div>
              </div>
              <div className="p-4 rounded-lg border border-border bg-muted/30">
                <p className="text-xs font-mono text-muted-foreground mb-1">Volume (24h)</p>
                <p className="text-lg font-mono text-foreground">$18.7K</p>
                <p className="text-xs font-mono text-green-500 mt-2">+23% today</p>
              </div>
            </div>
          </div>

          {/* Fees earned */}
          <div>
            <h3 className="text-lg font-[family-name:var(--font-geist-pixel-square)] text-foreground mb-4">
              💰 Fees Earned
            </h3>
            <div className="p-4 rounded-lg border border-border bg-muted/30">
              <p className="text-sm font-mono text-muted-foreground mb-1">
                Platform fee (5%)
              </p>
              <p className="text-2xl font-mono text-accent font-bold">$2,360</p>
              <p className="text-xs font-mono text-muted-foreground mt-2">
                From 247 investors
              </p>
            </div>
          </div>

          {/* Milestone */}
          <div>
            <h3 className="text-lg font-[family-name:var(--font-geist-pixel-square)] text-foreground mb-4">
              🎯 Next Milestone
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-mono text-foreground font-bold mb-2">
                  Mixing Complete
                </p>
                <p className="text-sm font-mono text-muted-foreground mb-4">
                  Status: Pending Community Vote
                </p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-muted-foreground">
                    Community approval
                  </span>
                  <span className="text-xs font-mono text-green-500">87%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: '87%' }}
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <button className="flex-1 px-4 py-2 text-sm font-mono bg-primary text-primary-foreground rounded-lg border border-primary hover:opacity-90 transition-opacity">
                  Submit Proof
                </button>
                <button className="flex-1 px-4 py-2 text-sm font-mono bg-secondary text-secondary-foreground rounded-lg border border-border hover:border-muted-foreground transition-all">
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* Community notes */}
          <div>
            <h3 className="text-lg font-[family-name:var(--font-geist-pixel-square)] text-foreground mb-4">
              💬 Community Notes
            </h3>
            <div className="p-4 rounded-lg border border-border bg-muted/30">
              <p className="text-sm font-mono text-foreground">
                {"Sounds great! Ready for final mix"}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
