'use client'

import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, Share2, Download } from 'lucide-react'

interface AnalyticsHeroProps {
  projectId: string
}

// Mock data for charts
const fundingData = [
  { date: 'Day 1', amount: 2000 },
  { date: 'Day 3', amount: 5000 },
  { date: 'Day 5', amount: 8000 },
  { date: 'Day 7', amount: 12000 },
  { date: 'Day 10', amount: 18000 },
  { date: 'Day 12', amount: 23000 },
  { date: 'Day 14', amount: 35200 },
  { date: 'Day 16', amount: 41200 },
  { date: 'Day 18', amount: 47200 },
]

const tokenPriceData = [
  { hour: '00:00', price: 0.079 },
  { hour: '04:00', price: 0.081 },
  { hour: '08:00', price: 0.083 },
  { hour: '12:00', price: 0.086 },
  { hour: '16:00', price: 0.088 },
  { hour: '20:00', price: 0.089 },
]

export function AnalyticsHero({ projectId }: AnalyticsHeroProps) {
  return (
    <section className="border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="relative w-full h-48 md:h-64 lg:h-80 mb-8 rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=600&fit=crop"
            alt="Echoes Album Art"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-geist-pixel-square)] mb-2 text-white">
              Echoes Analytics
            </h1>
            <p className="text-white/80 font-mono text-sm shadow-sm">Electronic Album by @sam</p>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Funding Card */}
          <div className="border border-border rounded-lg p-4 bg-card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Funding</h3>
              <span className="text-green-500 font-mono text-sm">94%</span>
            </div>
            <div className="mb-3">
              <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-green-500">
                $47,200
              </div>
              <div className="text-xs text-muted-foreground font-mono">of $50,000 goal</div>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }} />
            </div>
          </div>

          {/* Token Card */}
          <div className="border border-border rounded-lg p-4 bg-card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Token</h3>
              <span className="text-green-500 font-mono text-sm">+12%</span>
            </div>
            <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-green-500 mb-1">
              $0.089
            </div>
            <div className="text-xs text-muted-foreground font-mono">24h volume: $18.7K</div>
          </div>

          {/* Investors Card */}
          <div className="border border-border rounded-lg p-4 bg-card">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">Investors</h3>
            <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-green-500 mb-1">
              247
            </div>
            <div className="text-xs text-muted-foreground font-mono">Avg: $191 per investor</div>
          </div>

          {/* Fees Card */}
          <div className="border border-border rounded-lg p-4 bg-card">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">Fees Earned</h3>
            <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-green-500 mb-1">
              $2,360
            </div>
            <div className="text-xs text-muted-foreground font-mono">5% platform share</div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Funding Progress Chart */}
          <div className="border border-border rounded-lg p-4 bg-card">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Funding Progress</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={fundingData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#ffffff' }} stroke="#ffffff" />
                <YAxis tick={{ fontSize: 12, fill: '#ffffff' }} stroke="#ffffff" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                  }}
                />
                <Area type="monotone" dataKey="amount" stroke="#22c55e" fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Token Price Chart */}
          <div className="border border-border rounded-lg p-4 bg-card">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Token Price (24h)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={tokenPriceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" tick={{ fontSize: 12, fill: '#ffffff' }} stroke="#ffffff" />
                <YAxis tick={{ fontSize: 12, fill: '#ffffff' }} stroke="#ffffff" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                  }}
                />
                <Line type="monotone" dataKey="price" stroke="#22c55e" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 justify-end">
          <button className="px-4 py-2 text-sm font-mono border border-border rounded-lg hover:border-muted-foreground transition-colors flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share Project
          </button>
          <button className="px-4 py-2 text-sm font-mono border border-border rounded-lg hover:border-muted-foreground transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </button>
          <button className="px-4 py-2 text-sm font-mono bg-green-500 text-black rounded-lg hover:opacity-90 transition-opacity">
            Submit Milestone
          </button>
        </div>
      </div>
    </section>
  )
}
