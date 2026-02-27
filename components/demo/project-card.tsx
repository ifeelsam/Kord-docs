'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TrendingUp } from 'lucide-react'
import { ProjectDetailModal } from './project-detail-modal'

interface ProjectCardProps {
  id: string
  title: string
  artist: string
  artistHandle: string
  genre: string
  image: string
  fundingCurrent: number
  fundingGoal: number
  tokenPrice: number
  tokenChange: number
  daysLeft: number
  perks: string[]
}

export function ProjectCard({
  id,
  title,
  artist,
  artistHandle,
  genre,
  image,
  fundingCurrent,
  fundingGoal,
  tokenPrice,
  tokenChange,
  daysLeft,
  perks,
}: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const fundingPercentage = Math.round((fundingCurrent / fundingGoal) * 100)

  return (
    <>
      <Link href={`/project/${id}`}>
        <div className="group cursor-pointer rounded-lg border border-border bg-card hover:border-muted-foreground transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-accent/20">

        {/* Album Art */}
        <div className="relative h-48 overflow-hidden bg-secondary">
          <div className="w-full h-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center">
            <div className="text-center">
              <div className="text-sm font-mono text-muted-foreground mb-2">Album Art</div>
              <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-accent">
                {title.charAt(0)}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Title & Artist */}
          <div>
            <h3 className="text-lg font-semibold text-foreground line-clamp-1">{title}</h3>
            <p className="text-sm text-muted-foreground font-mono">
              {genre} by {artist}
            </p>
            <p className="text-xs text-accent font-mono mt-1">{artistHandle}</p>
          </div>

          {/* Funding Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-mono text-muted-foreground">
                ${fundingCurrent.toLocaleString()} / ${fundingGoal.toLocaleString()}
              </span>
              <span className="text-xs font-mono text-accent font-semibold">{fundingPercentage}%</span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${fundingPercentage}%` }}
              />
            </div>
          </div>

          {/* Token Info */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-mono text-muted-foreground">Token Price</p>
              <p className="text-sm font-semibold text-foreground">${tokenPrice.toFixed(3)}</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono text-green-500">
              <TrendingUp className="w-3 h-3" />
              <span>+{tokenChange}%</span>
            </div>
          </div>

          {/* Time Left */}
          <p className="text-xs text-muted-foreground font-mono">
            ⏰ {daysLeft} days left
          </p>

          {/* Perks */}
          <p className="text-xs text-accent font-mono">
            🎁 {perks.join(' + ')}
          </p>

          {/* CTA Button */}
          <button className="w-full py-2 px-3 mt-4 text-sm font-mono bg-accent text-accent-foreground rounded border border-accent hover:opacity-90 transition-all">
            Invest Now
          </button>
        </div>
        </div>
      </Link>
    </>
  )
}
