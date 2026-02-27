'use client'

import Link from 'next/link'
import { TrendingUp } from 'lucide-react'

interface ProjectDetailHeroProps {
  project: any
  fundingPercentage: number
  daysLeft: number
}

export function ProjectDetailHero({ project, fundingPercentage, daysLeft }: ProjectDetailHeroProps) {
  return (
    <section className="bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Album Art */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm aspect-square bg-secondary rounded-lg border border-border overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Project Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-5xl font-bold mb-2 font-[family-name:var(--font-geist-pixel-square)]">
                {project.title}
              </h1>
              <p className="text-lg font-mono text-muted-foreground">
                {project.genre} Album by {project.artistHandle}
              </p>
            </div>

            {/* Funding Status */}
            <div className="bg-card rounded-lg border border-border p-6 space-y-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm font-mono text-muted-foreground mb-1">Funding Progress</p>
                  <p className="text-2xl font-bold font-mono">
                    ${project.funding.current.toLocaleString()} / ${project.funding.goal.toLocaleString()}
                  </p>
                </div>
                <p className="text-lg font-bold text-accent">{fundingPercentage}%</p>
              </div>
              <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent transition-all"
                  style={{ width: `${fundingPercentage}%` }}
                />
              </div>
            </div>

            {/* Token Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card rounded-lg border border-border p-4">
                <p className="text-xs font-mono text-muted-foreground mb-1">Token</p>
                <p className="text-lg font-bold font-mono">{project.token.symbol}</p>
              </div>
              <div className="bg-card rounded-lg border border-border p-4">
                <p className="text-xs font-mono text-muted-foreground mb-1">Price</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold font-mono">${project.token.price.toFixed(3)}</p>
                  <div className="flex items-center gap-1 text-accent text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>+{project.token.change24h}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card rounded-lg border border-border p-4">
                <p className="text-xs font-mono text-muted-foreground mb-1">Countdown</p>
                <p className="text-lg font-bold font-mono">⏰ {daysLeft} days left</p>
              </div>
              <div className="bg-card rounded-lg border border-border p-4">
                <p className="text-xs font-mono text-muted-foreground mb-1">Investors</p>
                <p className="text-lg font-bold font-mono">{project.investors.toLocaleString()}</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 px-6 py-3 text-sm font-mono bg-accent text-background rounded-lg font-bold hover:opacity-90 transition-opacity">
                Invest Now
              </button>
              <Link href={`/project/${project.id}/trade`} className="flex-1">
                <button className="w-full px-6 py-3 text-sm font-mono border border-accent text-accent rounded-lg hover:bg-accent/10 transition-colors">
                  Trade Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
