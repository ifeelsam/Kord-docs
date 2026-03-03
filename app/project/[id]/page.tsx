'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { ProjectDetailHero } from '@/components/demo/project-detail-hero'
import { ProjectDetailTabs } from '@/components/demo/project-detail-tabs'
import { InvestmentForm } from '@/components/demo/investment-form'
import { RisksAndLegals } from '@/components/demo/risks-and-legals'
import { useContribute } from '@/hooks/use-contribute'
import { PublicKey } from '@solana/web3.js'
import { toast } from 'sonner'
import BN from 'bn.js'

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id

  const [projectData, setProjectData] = useState<any>(null)
  const [isLoadingProject, setIsLoadingProject] = useState(true)
  const [investAmount, setInvestAmount] = useState(100)
  const [activeTab, setActiveTab] = useState('overview')

  const { contribute, isLoading, txSignature } = useContribute()

  useEffect(() => {
    if (!id) return
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`)
        if (res.ok) {
          const data = await res.json()
          // Convert date strings back to Date objects where expected
          data.timeline.campaignStart = new Date(data.timeline.campaignStart)
          data.timeline.campaignEnd = new Date(data.timeline.campaignEnd)
          data.timeline.deliveryDate = new Date(data.timeline.deliveryDate)
          setProjectData(data)
        } else {
          toast.error('Failed to load project details.')
        }
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoadingProject(false)
      }
    }
    fetchProject()
  }, [id])

  if (isLoadingProject || !projectData) {
    return <div className="min-h-screen flex items-center justify-center font-mono">Loading Project...</div>
  }

  const fundingPercentage = Math.round((projectData.funding.current / projectData.funding.goal) * 100)
  const daysLeft = Math.ceil((projectData.timeline.campaignEnd.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  const handleInvest = async () => {
    try {
      // using static mock data to call the smart contract
      const artistKey = new PublicKey('11111111111111111111111111111111') // Mock artist
      const projectId = 1
      const amountLamports = investAmount * 1e9 // Convert SOL to lamports
      const tokenMint = new PublicKey(projectData.token.mint)

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
          <span className="text-accent">{projectData.title} by {projectData.artistHandle}</span>
        </div>
      </div>

      {/* Project Hero */}
      <ProjectDetailHero
        project={projectData}
        fundingPercentage={fundingPercentage}
        daysLeft={daysLeft}
      />

      {/* Tabs */}
      <div className="sticky top-14 z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <ProjectDetailTabs activeTab={activeTab} onTabChange={setActiveTab} commentCount={projectData.comments.length} />
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <div>
                <h2 className="text-2xl font-bold mb-4 font-[family-name:var(--font-geist-pixel-square)]">About {projectData.title}</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">{projectData.description}</p>
              </div>

              {/* Budget Breakdown */}
              <div>
                <h3 className="text-xl font-bold mb-4 font-[family-name:var(--font-geist-pixel-square)]">Budget Breakdown</h3>
                <div className="space-y-3">
                  {projectData.budget.map((item: any) => (
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
                  <p>📅 Campaign: {projectData.timeline.campaignStart.toLocaleDateString()} - {projectData.timeline.campaignEnd.toLocaleDateString()} ({daysLeft} days left)</p>
                  <p>🎯 Delivery: {projectData.timeline.deliveryDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                </div>
              </div>

              {/* Artist Info */}
              <div>
                <h3 className="text-xl font-bold mb-4 font-[family-name:var(--font-geist-pixel-square)]">Artist</h3>
                <div className="space-y-2 text-sm font-mono text-muted-foreground">
                  <p>{projectData.artistHandle}</p>
                  <p>• {projectData.artistFollowers.audius.toLocaleString()} Audius followers</p>
                  <p>• {projectData.artistFollowers.socials.toLocaleString()} across socials</p>
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
                  tokenPrice={projectData.token.price}
                  daysLeft={daysLeft}
                  lpDepth={projectData.token.lpDepth}
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
                <p className="text-sm font-mono text-muted-foreground">Total Supply: 1,000,000 {projectData.token.symbol}</p>
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
                <p className="text-sm font-mono text-muted-foreground">• Seed Liquidity: ${projectData.token.lpDepth.toLocaleString()} (10% of funds)</p>
                <p className="text-sm font-mono text-muted-foreground">• Token Price: ${projectData.token.price.toFixed(3)} (+{projectData.token.change24h}%)</p>
                <p className="text-sm font-mono text-muted-foreground">• 24h Volume: ${(projectData.token.volume24h / 1000).toFixed(1)}K</p>
                <p className="text-sm font-mono text-muted-foreground">• Liquidity Depth: ${projectData.token.lpDepth.toLocaleString()} (2% slippage)</p>
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
            <h2 className="text-2xl font-bold font-[family-name:var(--font-geist-pixel-square)]">Community ({projectData.comments.length} comments)</h2>
            <div className="space-y-4">
              {projectData.comments.map((comment: any) => (
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
