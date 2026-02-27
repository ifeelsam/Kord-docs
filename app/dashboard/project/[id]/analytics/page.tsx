'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { AnalyticsHero } from '@/components/demo/analytics-hero'
import { AnalyticsMetricsTabs } from '@/components/demo/analytics-metrics-tabs'
import { MilestoneModal } from '@/components/demo/milestone-modal'
import { InvestorLeaderboard } from '@/components/demo/investor-leaderboard'

export default function AnalyticsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [activeTab, setActiveTab] = useState('funding')
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      {/* Header with breadcrumb */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground mb-4">
            <Link href="/dashboard" className="hover:text-accent transition-colors">
              Dashboard
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/project/${id}`} className="hover:text-accent transition-colors">
              Echoes
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-accent">Analytics</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <AnalyticsHero projectId={id} />

      {/* Metrics Tabs */}
      <div className="border-t border-border sticky top-[73px] bg-background/95 backdrop-blur-sm z-30">
        <AnalyticsMetricsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Investor Leaderboard - Now First */}
        <InvestorLeaderboard onMilestoneClick={() => setIsMilestoneModalOpen(true)} />
      </div>

      {/* Milestone Modal */}
      <MilestoneModal isOpen={isMilestoneModalOpen} onClose={() => setIsMilestoneModalOpen(false)} />
    </main>
  )
}
