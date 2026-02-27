'use client'

import { Card } from '@/components/ui/card'
import { TrendingUp, TrendingDown } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export function PortfolioView() {
  const portfolioSummary = [
    { label: 'Total Value', value: '$2,847', change: '+12% this week' },
    { label: 'Average ROI', value: '3.2x', change: '' },
    { label: 'Win Rate', value: '89%', change: '17/19 projects' },
    { label: 'Biggest Winner', value: 'Echoes +423%', change: '$1,247 value' },
    { label: 'Most Held', value: '14K ECHO', change: '$1,247 value' },
    { label: 'Fees Earned', value: '$127', change: 'Trading fees' },
  ]

  const holdings = [
    {
      id: '1',
      project: 'Echoes',
      artist: '@sam',
      value: '$1,247',
      tokens: '14K',
      price: '$0.089',
      roi: '+23%',
      profit: '$289',
      daysLeft: '13d',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop',
    },
    {
      id: '2',
      project: 'Summer Nights',
      artist: '@musicartist',
      value: '$823',
      tokens: '18.3K',
      price: '$0.045',
      roi: '+5%',
      profit: '$39',
      daysLeft: '28d',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
    },
    {
      id: '3',
      project: 'Wave Runner',
      artist: '@djwaves',
      value: '$447',
      tokens: '9.2K',
      price: '$0.048',
      roi: '-12%',
      profit: '-$62',
      daysLeft: '45d',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=100&fit=crop',
    },
    {
      id: '4',
      project: 'Midnight Echo',
      artist: '@neonbeat',
      value: '$330',
      tokens: '15K',
      price: '$0.022',
      roi: '+156%',
      profit: '$213',
      daysLeft: '8d',
      image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=100&h=100&fit=crop',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Summary cards */}
      <div>
        <h2 className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-foreground mb-4">
          Your Portfolio
        </h2>
        <p className="text-lg font-mono text-muted-foreground mb-6">
          <span className="text-accent">$2,847</span> total value <span className="text-green-500">(+12% this week)</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolioSummary.map((item, idx) => (
            <Card key={idx} className="p-4">
              <p className="text-xs font-mono text-muted-foreground mb-2">
                {item.label}
              </p>
              <p className="text-xl font-mono text-foreground font-bold mb-1">
                {item.value}
              </p>
              {item.change && (
                <p className="text-xs font-mono text-muted-foreground">
                  {item.change}
                </p>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Filter bar */}
      <div>
        <div className="flex flex-wrap gap-2 mb-6">
          <button className="px-3 py-2 text-xs font-mono bg-secondary text-secondary-foreground rounded-lg border border-border hover:border-muted-foreground transition-all">
            Show ▼
          </button>
          <button className="px-3 py-2 text-xs font-mono bg-muted text-foreground rounded-lg border border-border hover:border-muted-foreground transition-all">
            All
          </button>
          <button className="px-3 py-2 text-xs font-mono text-muted-foreground rounded-lg border border-border hover:border-muted-foreground transition-all">
            Profitable
          </button>
          <button className="px-3 py-2 text-xs font-mono text-muted-foreground rounded-lg border border-border hover:border-muted-foreground transition-all">
            Loss
          </button>
          <button className="px-3 py-2 text-xs font-mono text-muted-foreground rounded-lg border border-border hover:border-muted-foreground transition-all">
            Recently Added
          </button>
        </div>

        {/* Holdings table */}
        <div className="space-y-3">
          {holdings.map((holding) => {
            const isProfit = holding.profit.startsWith('+')
            return (
              <Card
                key={holding.id}
                className="p-4 hover:border-accent transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={holding.image}
                    alt={holding.project}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-[family-name:var(--font-geist-pixel-square)] text-foreground font-bold">
                      {holding.project}
                    </h3>
                    <p className="text-sm font-mono text-muted-foreground">
                      {holding.artist} • {holding.daysLeft} left
                    </p>
                    <p className="text-xs font-mono text-muted-foreground mt-1">
                      {holding.tokens} tokens @ {holding.price}
                    </p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="font-mono text-foreground font-bold">
                      {holding.value}
                    </p>
                    <p className="text-sm font-mono text-muted-foreground">
                      {holding.tokens}
                    </p>
                  </div>

                  <div className="text-right flex-shrink-0 w-24">
                    <div className={`flex items-center gap-1 justify-end mb-1 ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
                      {isProfit ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="font-mono text-sm font-bold">
                        {holding.roi}
                      </span>
                    </div>
                    <p className={`text-xs font-mono ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
                      {holding.profit}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/project/${holding.id}/trade`} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                      <button className="px-3 py-2 text-xs font-mono bg-muted text-foreground rounded-lg border border-border hover:border-muted-foreground transition-all">
                        Trade
                      </button>
                    </Link>
                    <button className="px-3 py-2 text-xs font-mono text-muted-foreground rounded-lg border border-border hover:border-muted-foreground transition-all">
                      Perks
                    </button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
