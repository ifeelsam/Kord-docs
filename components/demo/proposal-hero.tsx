'use client'

import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, Upload, Clock, RotateCcw } from 'lucide-react'

const chartData = [
  { time: '0h', yesPrice: 0.75, noPrice: 0.25 },
  { time: '4h', yesPrice: 0.79, noPrice: 0.21 },
  { time: '8h', yesPrice: 0.82, noPrice: 0.18 },
  { time: '12h', yesPrice: 0.84, noPrice: 0.16 },
  { time: '16h', yesPrice: 0.86, noPrice: 0.14 },
  { time: '20h', yesPrice: 0.87, noPrice: 0.13 },
]

export function ProposalHero() {
  return (
    <section className="border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-geist-pixel-square)] mb-2">
            Milestone 2 Proposal
          </h1>
          <p className="text-lg text-muted-foreground font-mono">
            "Mixing Complete" - $15K Release (30%)
          </p>
        </div>

        {/* Market Stats Card */}
        <div className="border border-border rounded-lg p-6 bg-card mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <div className="text-sm font-mono text-muted-foreground mb-1">Funds Locked</div>
              <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-green-500">$15,000</div>
            </div>
            <div>
              <div className="text-sm font-mono text-muted-foreground mb-1">Voters</div>
              <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-green-500">127</div>
            </div>
            <div>
              <div className="text-sm font-mono text-muted-foreground mb-1">Volume (24h)</div>
              <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-green-500">$8,742</div>
            </div>
            <div>
              <div className="text-sm font-mono text-muted-foreground mb-1">Time Left</div>
              <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-green-500">24h</div>
            </div>
          </div>

          {/* Price Bars */}
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm text-green-500">Yes: $0.87 (87%)</span>
                <span className="font-mono text-xs text-muted-foreground">Implied: 87%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: '87%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm text-red-500">No: $0.13 (13%)</span>
                <span className="font-mono text-xs text-muted-foreground">Implied: 13%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-red-500 h-3 rounded-full" style={{ width: '13%' }} />
              </div>
            </div>
          </div>

          {/* TWAP Stats */}
          <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
            <div>
              <div className="text-sm font-mono text-muted-foreground mb-1">TWAP (24h)</div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-green-500">86.2%</span>
                <span className="text-sm font-mono text-green-500 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> +2.1%
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-mono text-muted-foreground mb-1">Resolution</div>
              <div className="text-lg font-mono text-green-500">Pending</div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="border border-border rounded-lg p-6 bg-card mb-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#ffffff' }} stroke="#ffffff" />
              <YAxis tick={{ fontSize: 12, fill: '#ffffff' }} stroke="#ffffff" domain={[0, 1]} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
              <Line type="monotone" dataKey="yesPrice" stroke="#22c55e" strokeWidth={2} dot={false} name="Yes Price" />
              <Line type="monotone" dataKey="noPrice" stroke="#ef4444" strokeWidth={2} dot={false} name="No Price" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Artist Controls */}
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-mono bg-green-500 text-black rounded-lg hover:opacity-90 transition-opacity">
            <Upload className="w-4 h-4" />
            Upload Proof
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-mono border border-green-500 text-green-500 rounded-lg hover:bg-green-500/10 transition-colors">
            <Clock className="w-4 h-4" />
            Extend 24h
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-mono border border-red-500 text-red-500 rounded-lg hover:bg-red-500/10 transition-colors">
            <RotateCcw className="w-4 h-4" />
            Cancel
          </button>
        </div>
      </div>
    </section>
  )
}
