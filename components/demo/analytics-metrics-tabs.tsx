'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { FundingMetrics } from './funding-metrics'
import { TokenMetrics } from './token-metrics'
import { InvestorsMetrics } from './investors-metrics'
import { RevenueMetrics } from './revenue-metrics'

interface AnalyticsMetricsTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function AnalyticsMetricsTabs({ activeTab, setActiveTab }: AnalyticsMetricsTabsProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-transparent border border-border">
          <TabsTrigger 
            value="funding"
            className="font-mono text-sm data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
          >
            Funding (94%)
          </TabsTrigger>
          <TabsTrigger 
            value="token"
            className="font-mono text-sm data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
          >
            Token
          </TabsTrigger>
          <TabsTrigger 
            value="investors"
            className="font-mono text-sm data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
          >
            Investors (247)
          </TabsTrigger>
          <TabsTrigger 
            value="revenue"
            className="font-mono text-sm data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
          >
            Revenue
          </TabsTrigger>
        </TabsList>

        <TabsContent value="funding" className="mt-6">
          <FundingMetrics />
        </TabsContent>

        <TabsContent value="token" className="mt-6">
          <TokenMetrics />
        </TabsContent>

        <TabsContent value="investors" className="mt-6">
          <InvestorsMetrics />
        </TabsContent>

        <TabsContent value="revenue" className="mt-6">
          <RevenueMetrics />
        </TabsContent>
      </Tabs>
    </div>
  )
}
