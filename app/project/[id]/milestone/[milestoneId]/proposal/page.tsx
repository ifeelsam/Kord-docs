'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProposalHero } from '@/components/demo/proposal-hero'
import { BinaryMarketForm } from '@/components/demo/binary-market-form'
import { YesNoMarket } from '@/components/demo/yes-no-market'
import { TwapAnalytics } from '@/components/demo/twap-analytics'
import { LiquidityTab } from '@/components/demo/liquidity-tab'
import { VotersLeaderboard } from '@/components/demo/voters-leaderboard'
import { ProposalProgress } from '@/components/demo/proposal-progress'
import { MilestoneActivityFeed } from '@/components/demo/milestone-activity-feed'

export default function ProposalPage({ 
  params 
}: { 
  params: Promise<{ id: string; milestoneId: string }> 
}) {
  const { id, milestoneId } = use(params)
  const [activeTab, setActiveTab] = useState('yes-no')
  const [betAmount, setBetAmount] = useState('50')
  const [betType, setBetType] = useState<'yes' | 'no'>('yes')

  return (
    <main className="min-h-screen bg-background">
      {/* Header with breadcrumb */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
            <Link href="/dashboard" className="hover:text-green-500 transition-colors">
              Dashboard
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/project/${id}`} className="hover:text-green-500 transition-colors">
              Echoes
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/project/${id}/milestone/${milestoneId}`} className="hover:text-green-500 transition-colors">
              Milestone 2
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-green-500">Proposal</span>
          </div>
        </div>
      </header>

      {/* Proposal Hero */}
      <ProposalHero />

      {/* Sticky Market Tabs */}
      <div className="border-b border-border sticky top-[73px] bg-background/95 backdrop-blur-sm z-30">
        <div className="max-w-6xl mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-transparent p-0 w-full justify-start gap-8 h-auto rounded-none border-b border-border">
              <TabsTrigger value="yes-no" className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-green-500 data-[state=active]:bg-transparent px-0 py-3">
                Yes/No Market
              </TabsTrigger>
              <TabsTrigger value="twap" className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-green-500 data-[state=active]:bg-transparent px-0 py-3">
                TWAP
              </TabsTrigger>
              <TabsTrigger value="liquidity" className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-green-500 data-[state=active]:bg-transparent px-0 py-3">
                Liquidity
              </TabsTrigger>
              <TabsTrigger value="voters" className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-green-500 data-[state=active]:bg-transparent px-0 py-3">
                Voters (127)
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Sticky Trade Form */}
      <div className="border-b border-border sticky top-[129px] bg-background/95 backdrop-blur-sm z-30">
        <BinaryMarketForm betAmount={betAmount} setBetAmount={setBetAmount} betType={betType} setBetType={setBetType} />
      </div>

      {/* Tab Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="yes-no">
            <YesNoMarket />
          </TabsContent>
          <TabsContent value="twap">
            <TwapAnalytics />
          </TabsContent>
          <TabsContent value="liquidity">
            <LiquidityTab />
          </TabsContent>
          <TabsContent value="voters">
            <VotersLeaderboard />
          </TabsContent>
        </Tabs>
      </div>

      {/* Proposal Progress */}
      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <ProposalProgress />
        </div>
      </div>

      {/* Activity Feed */}
      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <MilestoneActivityFeed />
        </div>
      </div>
    </main>
  )
}
