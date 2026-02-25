'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface ProjectDetailModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    id: string
    title: string
    artist: string
    artistHandle: string
    genre: string
    fundingCurrent: number
    fundingGoal: number
    tokenPrice: number
    tokenChange: number
    daysLeft: number
    perks: string[]
  }
}

const MODAL_TABS = ['Overview', 'Tokenomics', 'Perks', 'Milestones', 'Comments']

export function ProjectDetailModal({ isOpen, onClose, project }: ProjectDetailModalProps) {
  const [activeTab, setActiveTab] = useState('Overview')
  const [investAmount, setInvestAmount] = useState(100)

  if (!isOpen) return null

  const fundingPercentage = Math.round((project.fundingCurrent / project.fundingGoal) * 100)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card rounded-lg border border-border shadow-xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card/95 backdrop-blur">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">{project.title}</h2>
            <p className="text-sm text-muted-foreground font-mono">by {project.artist}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary rounded transition-colors"
          >
            <X className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-6 pt-6 border-b border-border overflow-x-auto">
          {MODAL_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-mono whitespace-nowrap border-b-2 transition-all ${
                activeTab === tab
                  ? 'border-accent text-accent'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'Overview' && '📋'} {tab === 'Tokenomics' && '💰'} {tab === 'Perks' && '🎁'}{' '}
              {tab === 'Milestones' && '💼'} {tab === 'Comments' && '💬'} {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Album Art Preview */}
          <div className="h-64 bg-secondary rounded-lg flex items-center justify-center border border-border">
            <div className="text-center">
              <div className="text-6xl font-[family-name:var(--font-geist-pixel-square)] text-accent mb-4">
                {project.title.charAt(0)}
              </div>
              <p className="text-sm text-muted-foreground font-mono">Album Preview</p>
            </div>
          </div>

          {/* Funding Info */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-mono text-muted-foreground">Funding Progress</span>
                <span className="text-sm font-mono text-accent font-semibold">{fundingPercentage}%</span>
              </div>
              <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent"
                  style={{ width: `${fundingPercentage}%` }}
                />
              </div>
              <p className="text-xs font-mono text-muted-foreground mt-2">
                ${project.fundingCurrent.toLocaleString()} / ${project.fundingGoal.toLocaleString()}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded border border-border bg-secondary">
                <p className="text-xs font-mono text-muted-foreground mb-1">Token Price</p>
                <p className="text-lg font-semibold text-foreground">${project.tokenPrice.toFixed(3)}</p>
                <p className="text-xs text-green-500 font-mono mt-1">+{project.tokenChange}%</p>
              </div>
              <div className="p-3 rounded border border-border bg-secondary">
                <p className="text-xs font-mono text-muted-foreground mb-1">Time Remaining</p>
                <p className="text-lg font-semibold text-foreground">{project.daysLeft} days</p>
                <p className="text-xs text-accent font-mono mt-1">⏰ Deadline soon</p>
              </div>
            </div>
          </div>

          {/* Invest Panel */}
          <div className="p-4 rounded border border-border bg-secondary space-y-4">
            <h3 className="font-semibold text-foreground">Ready to Invest?</h3>

            <div className="space-y-2">
              <label className="text-sm font-mono text-muted-foreground">Amount (USD)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={investAmount}
                  onChange={(e) => setInvestAmount(Number(e.target.value))}
                  className="flex-1 px-3 py-2 rounded border border-border bg-background text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[100, 500, 1000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setInvestAmount(amount)}
                  className="py-2 px-3 text-xs font-mono rounded border border-border bg-background hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                >
                  ${amount}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-3 px-4 text-sm font-mono bg-accent text-accent-foreground rounded border border-accent hover:opacity-90 transition-all">
                Invest ${investAmount}
              </button>
            </div>

            <p className="text-xs text-muted-foreground font-mono text-center">
              Connect your wallet to proceed
            </p>
          </div>

          {/* Perks */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Investor Perks</h3>
            <ul className="space-y-2">
              {project.perks.map((perk) => (
                <li key={perk} className="text-sm font-mono text-muted-foreground flex items-start gap-2">
                  <span className="text-accent">→</span>
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
