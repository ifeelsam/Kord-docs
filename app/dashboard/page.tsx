'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DashboardHero } from '@/components/demo/dashboard-hero'
import { ArtistView } from '@/components/demo/artist-view'
import { PortfolioView } from '@/components/demo/portfolio-view'
import { WalletView } from '@/components/demo/wallet-view'
import { KordFooter } from '@/components/demo/kord-footer'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('portfolio')

  return (
    <main className="min-h-screen">
      <DashboardHero />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="artist" className="flex items-center gap-2">
              Artist
              <span className="text-xs font-mono text-muted-foreground">(2)</span>
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center gap-2">
              Portfolio
              <span className="text-xs font-mono text-muted-foreground">(12)</span>
            </TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
          </TabsList>

          <TabsContent value="artist" className="mt-8">
            <ArtistView />
          </TabsContent>

          <TabsContent value="portfolio" className="mt-8">
            <PortfolioView />
          </TabsContent>

          <TabsContent value="wallet" className="mt-8">
            <WalletView />
          </TabsContent>
        </Tabs>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <hr className="border-border" />
      </div>

      <KordFooter />
    </main>
  )
}
