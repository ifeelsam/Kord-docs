'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface InvestorLeaderboardProps {
  onMilestoneClick?: () => void
}

const investorData = [
  { rank: 1, name: '@bigwhale', amount: '$5,200', tokens: '27,102', percent: '2.7%' },
  { rank: 2, name: '@musicfan23', amount: '$1,800', tokens: '20,015', percent: '1.8%' },
  { rank: 3, name: '@trancehead', amount: '$1,200', tokens: '13,400', percent: '1.2%' },
  { rank: 4, name: '@synth_lover', amount: '$950', tokens: '10,674', percent: '0.9%' },
  { rank: 5, name: '@beat_hunter', amount: '$850', tokens: '9,551', percent: '0.8%' },
  { rank: 6, name: '@audio_collector', amount: '$750', tokens: '8,427', percent: '0.7%' },
  { rank: 7, name: '@melody_seeker', amount: '$650', tokens: '7,304', percent: '0.6%' },
  { rank: 8, name: '@rhythm_king', amount: '$600', tokens: '6,742', percent: '0.6%' },
  { rank: 9, name: '@sound_explorer', amount: '$580', tokens: '6,523', percent: '0.5%' },
  { rank: 10, name: '@vibe_finder', amount: '$550', tokens: '6,180', percent: '0.5%' },
]

export function InvestorLeaderboard({ onMilestoneClick }: InvestorLeaderboardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="space-y-8">
      {/* Milestone Section */}
      <div className="border border-border rounded-lg p-6 bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-[family-name:var(--font-geist-pixel-square)] mb-2">
              Milestone Progress
            </h3>
            <p className="text-sm text-muted-foreground font-mono">2/4 milestones complete • $15k locked</p>
          </div>
          <button
            onClick={onMilestoneClick}
            className="px-6 py-2 text-sm font-mono bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Submit Milestone
          </button>
        </div>
      </div>

      {/* Investors Section */}
      <div className="border border-border rounded-lg p-6 bg-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-[family-name:var(--font-geist-pixel-square)]">Top Investors</h3>
          <span className="text-sm font-mono text-muted-foreground">247 total</span>
        </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm font-mono">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 text-muted-foreground font-semibold">Rank</th>
              <th className="text-left py-3 text-muted-foreground font-semibold">Investor</th>
              <th className="text-right py-3 text-muted-foreground font-semibold">Investment</th>
              <th className="text-right py-3 text-muted-foreground font-semibold">Tokens</th>
              <th className="text-right py-3 text-muted-foreground font-semibold">% of Total</th>
            </tr>
          </thead>
          <tbody>
            {investorData.map((investor) => (
              <tr
                key={investor.rank}
                className="border-b border-border/50 hover:bg-muted/30 transition-colors"
              >
                <td className="py-3 text-accent font-semibold">#{investor.rank}</td>
                <td className="py-3">{investor.name}</td>
                <td className="py-3 text-right text-accent">{investor.amount}</td>
                <td className="py-3 text-right">{investor.tokens}</td>
                <td className="py-3 text-right text-muted-foreground">{investor.percent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-2">
        {investorData.slice(0, expanded ? investorData.length : 5).map((investor) => (
          <div
            key={investor.rank}
            className="border border-border/50 rounded-lg p-3 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-sm font-semibold text-accent">#{investor.rank} {investor.name}</div>
                <div className="text-xs text-muted-foreground font-mono mt-1">{investor.tokens} tokens</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-accent">{investor.amount}</div>
                <div className="text-xs text-muted-foreground font-mono">{investor.percent}</div>
              </div>
            </div>
          </div>
        ))}

        {!expanded && investorData.length > 5 && (
          <button
            onClick={() => setExpanded(true)}
            className="w-full py-2 text-sm font-mono border border-border rounded-lg hover:border-muted-foreground transition-colors flex items-center justify-center gap-2"
          >
            View All {investorData.length} Investors
            <ChevronDown className="w-4 h-4" />
          </button>
        )}
      </div>

        {/* Export Button */}
        <div className="mt-6 pt-6 border-t border-border flex justify-end">
          <button className="px-4 py-2 text-sm font-mono border border-border rounded-lg hover:border-muted-foreground transition-colors">
            Export CSV
          </button>
        </div>
      </div>
    </div>
  )
}
