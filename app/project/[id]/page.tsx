'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { ProjectDetailHero } from '@/components/demo/project-detail-hero'
import { ProjectDetailTabs } from '@/components/demo/project-detail-tabs'
import { InvestmentForm } from '@/components/demo/investment-form'
import { RisksAndLegals } from '@/components/demo/risks-and-legals'
import { useContribute } from '@/hooks/use-contribute'
import { PublicKey } from '@solana/web3.js'
import { toast } from 'sonner'
import BN from 'bn.js'

// Mock project data - will be replaced with real data from API
const mockProject = {
  id: 'echoes-janedoe',
  title: 'Echoes',
  artist: 'Jane Doe',
  artistHandle: '@janedoe',
  genre: 'Electronic',
  description: 'High-energy electronic album blending trance and future bass. Features 10 original tracks + 2 remixes. Targeting festival summer 2026 release.',
  image: 'https://via.placeholder.com/600x600?text=Echoes',
  funding: {
    current: 47200,
    goal: 50000,
  },
  token: {
    symbol: 'ECHOES',
    price: 0.089,
    change24h: 12,
    volume24h: 18700,
    lpDepth: 23000,
    mint: 'So11111111111111111111111111111111111111112', // using SOL as placeholder
  },
  timeline: {
    campaignStart: new Date('2026-02-12'),
    campaignEnd: new Date('2026-03-12'),
    deliveryDate: new Date('2026-06-01'),
  },
  investors: 247,
  tokensSold: 500000,
  perks: [
    '1% AUDIO Royalties',
    'Early Track Drop',
    'Name in Credits',
    '20% Concert Discounts',
  ],
  budget: [
    { item: 'Studio Time', amount: 20000, percentage: 40 },
    { item: 'Mixing/Mastering', amount: 12000, percentage: 24 },
    { item: 'Artwork/Video', amount: 8000, percentage: 16 },
    { item: 'Marketing', amount: 7000, percentage: 14 },
    { item: 'Distribution', amount: 3000, percentage: 6 },
  ],
  artistFollowers: {
    audius: 127000,
    socials: 89000,
  },
  comments: [
    {
      id: '1',
      user: '@musicfan23',
      avatar: 'https://via.placeholder.com/40x40?text=MF',
      text: 'This sounds 🔥 Pre-ordered 2K tokens',
      timestamp: '2h ago',
      likes: 23,
    },
    {
      id: '2',
      user: '@trancehead',
      avatar: 'https://via.placeholder.com/40x40?text=TH',
      text: "Jane's production quality insane. Big",
      timestamp: '4h ago',
      likes: 12,
    },
  ],
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [investAmount, setInvestAmount] = useState(100)
  const [activeTab, setActiveTab] = useState('overview')

  const { contribute, isLoading, txSignature } = useContribute()

  const fundingPercentage = Math.round((mockProject.funding.current / mockProject.funding.goal) * 100)
  const daysLeft = Math.ceil((mockProject.timeline.campaignEnd.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  const handleInvest = async () => {
    try {
      // using static mock data to call the smart contract
      const artistKey = new PublicKey('11111111111111111111111111111111') // Mock artist
      const projectId = 1
      const amountLamports = investAmount * 1e9 // Convert SOL to lamports
      const tokenMint = new PublicKey(mockProject.token.mint)

      const tx = await contribute(artistKey, projectId, amountLamports, tokenMint)
      if (tx) {
        toast.success('Investment successful!')
      }
    } catch (err) {
      toast.error('Investment failed. Check wallet connection.')
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-2 text-sm font-mono text-muted-foreground">
          <Link href="/explore" className="hover:text-accent transition-colors">
            Explore
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-accent">{mockProject.title} by {mockProject.artistHandle}</span>
        </div>
      </div>

      {/* Project Hero */}
      <ProjectDetailHero
        project={mockProject}
        fundingPercentage={fundingPercentage}
        daysLeft={daysLeft}
      />

      {/* Tabs */}
      <div className="sticky top-14 z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <ProjectDetailTabs activeTab={activeTab} onTabChange={setActiveTab} commentCount={mockProject.comments.length} />
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <div>
                <h2 className="text-2xl font-bold mb-4 font-[family-name:var(--font-geist-pixel-square)]">About {mockProject.title}</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">{mockProject.description}</p>
              </div>

              {/* Budget Breakdown */}
              <div>
                <h3 className="text-xl font-bold mb-4 font-[family-name:var(--font-geist-pixel-square)]">Budget Breakdown</h3>
                <div className="space-y-3">
                  {mockProject.budget.map((item) => (
                    <div key={item.item} className="flex items-center justify-between">
                      <span className="text-sm font-mono text-muted-foreground">{item.item}</span>
                      <div className="flex items-center gap-4">
                        <div className="w-48 h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent transition-all"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-mono font-bold w-20 text-right">${item.amount.toLocaleString()} {item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-xl font-bold mb-4 font-[family-name:var(--font-geist-pixel-square)]">Timeline</h3>
                <div className="space-y-2 text-sm font-mono text-muted-foreground">
                  <p>📅 Campaign: {mockProject.timeline.campaignStart.toLocaleDateString()} - {mockProject.timeline.campaignEnd.toLocaleDateString()} ({daysLeft} days left)</p>
                  <p>🎯 Delivery: {mockProject.timeline.deliveryDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                </div>
              </div>

              {/* Artist Info */}
              <div>
                <h3 className="text-xl font-bold mb-4 font-[family-name:var(--font-geist-pixel-square)]">Artist</h3>
                <div className="space-y-2 text-sm font-mono text-muted-foreground">
                  <p>{mockProject.artistHandle}</p>
                  <p>• {mockProject.artistFollowers.audius.toLocaleString()} Audius followers</p>
                  <p>• {mockProject.artistFollowers.socials.toLocaleString()} across socials</p>
                  <p>• "Echoes" follows critically acclaimed EP "Vortex"</p>
                </div>
              </div>
            </div>

            {/* Sticky Investment Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-4">
                <InvestmentForm
                  investAmount={investAmount}
                  onAmountChange={setInvestAmount}
                  tokenPrice={mockProject.token.price}
                  daysLeft={daysLeft}
                  lpDepth={mockProject.token.lpDepth}
                  onInvest={handleInvest}
                  isInvesting={isLoading}
                  txHash={txSignature}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tokenomics' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 font-[family-name:var(--font-geist-pixel-square)]">Tokenomics</h2>
              <div className="bg-card rounded-lg border border-border p-6 space-y-4">
                <p className="text-sm font-mono text-muted-foreground">Total Supply: 1,000,000 {mockProject.token.symbol}</p>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-sm font-mono">Public Sale</span>
                    <span className="text-sm font-mono text-accent">50% (500K)</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-sm font-mono">Initial LP</span>
                    <span className="text-sm font-mono text-accent">20% (200K)</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-sm font-mono">Anchor Royalties</span>
                    <span className="text-sm font-mono text-accent">20% (200K)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-mono">Artist Vesting</span>
                    <span className="text-sm font-mono text-accent">10% (100K)</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 font-[family-name:var(--font-geist-pixel-square)]">Current LP Status</h3>
              <div className="bg-card rounded-lg border border-border p-6 space-y-2">
                <p className="text-sm font-mono text-muted-foreground">• Seed Liquidity: ${mockProject.token.lpDepth.toLocaleString()} (10% of funds)</p>
                <p className="text-sm font-mono text-muted-foreground">• Token Price: ${mockProject.token.price.toFixed(3)} (+{mockProject.token.change24h}%)</p>
                <p className="text-sm font-mono text-muted-foreground">• 24h Volume: ${(mockProject.token.volume24h / 1000).toFixed(1)}K</p>
                <p className="text-sm font-mono text-muted-foreground">• Liquidity Depth: ${mockProject.token.lpDepth.toLocaleString()} (2% slippage)</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'perks' && (
          <div>
            <h2 className="text-2xl font-bold mb-8 font-[family-name:var(--font-geist-pixel-square)]">Minimum Guaranteed Perks</h2>
            <div className="space-y-3">
              <div className="bg-card rounded-lg border border-border p-6 space-y-2">
                <p className="font-mono font-bold text-accent">🎁 1% AUDIO Royalties</p>
                <p className="text-sm text-muted-foreground">All streams generate AUDIO tokens → LP value growth</p>
              </div>
              <div className="bg-card rounded-lg border border-border p-6 space-y-2">
                <p className="font-mono font-bold text-accent">🎵 Early Track Drop</p>
                <p className="text-sm text-muted-foreground">First single before public release (Audius exclusive)</p>
              </div>
              <div className="bg-card rounded-lg border border-border p-6 space-y-2">
                <p className="font-mono font-bold text-accent">📜 Name in Credits</p>
                <p className="text-sm text-muted-foreground">Official album credits + digital certificate</p>
              </div>
              <div className="bg-card rounded-lg border border-border p-6 space-y-2">
                <p className="font-mono font-bold text-accent">🎫 20% Concert Discounts</p>
                <p className="text-sm text-muted-foreground">Discount code for all tour dates 2026</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'community' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-geist-pixel-square)]">Community ({mockProject.comments.length} comments)</h2>
            <div className="space-y-4">
              {mockProject.comments.map((comment) => (
                <div key={comment.id} className="bg-card rounded-lg border border-border p-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={comment.avatar}
                      alt={comment.user}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm">{comment.user}</span>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{comment.text}</p>
                      <div className="mt-2 flex items-center gap-4 text-xs font-mono text-muted-foreground">
                        <button className="hover:text-accent transition-colors">👍 {comment.likes}</button>
                        <button className="hover:text-accent transition-colors">Reply</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Risks & Legals */}
      <RisksAndLegals />
    </main>
  )
}
