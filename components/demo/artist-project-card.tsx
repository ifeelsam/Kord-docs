'use client'

import { Card } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'

interface ArtistProjectCardProps {
  project: {
    id: string
    title: string
    fundingProgress: number
    fundingAmount: string
    daysLeft: number
    tokenPrice: string
    tokenChange: string
    currentMilestone: string
    milestoneProgress: number
    investors: number
    feesEarned: string
    albumArt: string
  }
}

export function ArtistProjectCard({ project }: ArtistProjectCardProps) {
  return (
    <Card className="overflow-hidden hover:border-accent transition-colors cursor-pointer">
      <div className="relative">
        <img
          src={project.albumArt}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-[family-name:var(--font-geist-pixel-square)] text-foreground">
            {project.title}
          </h3>
          <p className="text-sm font-mono text-accent">
            {project.fundingProgress}% funded
          </p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Funding */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-mono text-muted-foreground">
              {project.fundingAmount}
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              {project.daysLeft} days left
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-accent"
              style={{ width: `${project.fundingProgress}%` }}
            />
          </div>
        </div>

        {/* Token price */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-mono text-muted-foreground">Token Price</p>
            <p className="text-sm font-mono text-foreground">{project.tokenPrice}</p>
          </div>
          <div className="flex items-center gap-1 text-green-500">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-mono">{project.tokenChange}</span>
          </div>
        </div>

        {/* Milestone */}
        <div>
          <p className="text-xs font-mono text-muted-foreground mb-2">
            {project.currentMilestone}
          </p>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500"
              style={{ width: `${project.milestoneProgress}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground border-t border-border pt-4">
          <span>{project.investors} investors</span>
          <span className="text-accent">{project.feesEarned} fees</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="flex-1 px-3 py-2 text-xs font-mono bg-muted text-foreground rounded-lg border border-border hover:border-muted-foreground transition-all">
            View Analytics
          </button>
          <button className="flex-1 px-3 py-2 text-xs font-mono text-muted-foreground rounded-lg border border-border hover:border-muted-foreground transition-all">
            Manage
          </button>
        </div>
      </div>
    </Card>
  )
}
