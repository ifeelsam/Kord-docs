'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { TradingHero } from '@/components/demo/trading-hero'
import { SwapForm } from '@/components/demo/swap-form'
import { LiquidityMetrics } from '@/components/demo/liquidity-metrics'
import { TradingCharts } from '@/components/demo/trading-charts'
import { RecentActivity } from '@/components/demo/recent-activity'
import { LPInfo } from '@/components/demo/lp-info'
import { PositionManager } from '@/components/demo/position-manager'

export default function TradingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [swapAmount, setSwapAmount] = useState('1.23')
  const [selectedTimeframe, setSelectedTimeframe] = useState('24H')

  return (
    <main className="min-h-screen bg-background">
      {/* Header with breadcrumb */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground mb-4">
            <Link href="/explore" className="hover:text-accent transition-colors">
              Projects
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/project/${id}`} className="hover:text-accent transition-colors">
              Echoes
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-green-500">Trade</span>
          </div>
        </div>
      </header>

      {/* Trading Hero */}
      <TradingHero selectedTimeframe={selectedTimeframe} setSelectedTimeframe={setSelectedTimeframe} />

      {/* Sticky Swap Form */}
      <div className="sticky top-[73px] bg-background/95 backdrop-blur-sm border-b border-border z-30">
        <SwapForm swapAmount={swapAmount} setSwapAmount={setSwapAmount} />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Liquidity Metrics */}
        <LiquidityMetrics />

        {/* Charts Section */}
        <TradingCharts selectedTimeframe={selectedTimeframe} />

        {/* Recent Activity */}
        <RecentActivity />

        {/* LP Info & Royalties */}
        <LPInfo />

        {/* Position Manager */}
        <PositionManager />
      </div>
    </main>
  )
}
