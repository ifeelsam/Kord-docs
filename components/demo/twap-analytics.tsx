'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp } from 'lucide-react'

const twapData = [
  { time: '0h', yes: 0.78, no: 0.22 },
  { time: '4h', yes: 0.81, no: 0.19 },
  { time: '8h', yes: 0.83, no: 0.17 },
  { time: '12h', yes: 0.85, no: 0.15 },
  { time: '16h', yes: 0.86, no: 0.14 },
  { time: '24h', yes: 0.862, no: 0.138 },
]

export function TwapAnalytics() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-[family-name:var(--font-geist-pixel-square)] mb-6">TWAP Analytics</h3>
        <p className="text-sm font-mono text-muted-foreground mb-6">Time-Weighted Average Price Resolution Mechanism</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="border border-border rounded-lg p-4 bg-card">
            <div className="text-xs font-mono text-muted-foreground mb-2">TWAP YES</div>
            <div className="text-3xl font-[family-name:var(--font-geist-pixel-square)] text-green-500">86.2%</div>
          </div>
          <div className="border border-border rounded-lg p-4 bg-card">
            <div className="text-xs font-mono text-muted-foreground mb-2">TWAP NO</div>
            <div className="text-3xl font-[family-name:var(--font-geist-pixel-square)] text-red-500">13.8%</div>
          </div>
          <div className="border border-border rounded-lg p-4 bg-card">
            <div className="text-xs font-mono text-muted-foreground mb-2">RESOLUTION</div>
            <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-green-500">{`YES if >50%`}</div>
          </div>
        </div>

        <div className="border border-border rounded-lg p-6 bg-card mb-8">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={twapData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#ffffff' }} stroke="#ffffff" />
              <YAxis tick={{ fontSize: 12, fill: '#ffffff' }} stroke="#ffffff" domain={[0, 1]} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
              <Line type="monotone" dataKey="yes" stroke="#22c55e" strokeWidth={2} dot={false} name="TWAP Yes" />
              <Line type="monotone" dataKey="no" stroke="#ef4444" strokeWidth={2} dot={false} name="TWAP No" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-border rounded-lg p-4 bg-card">
            <div className="text-xs font-mono text-muted-foreground mb-2">1H CHANGE</div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-green-500">+0.8%</span>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
          </div>
          <div className="border border-border rounded-lg p-4 bg-card">
            <div className="text-xs font-mono text-muted-foreground mb-2">24H VOLUME</div>
            <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)]">$2,847</div>
          </div>
          <div className="border border-border rounded-lg p-4 bg-card">
            <div className="text-xs font-mono text-muted-foreground mb-2">TIME REMAINING</div>
            <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)]">24h 13m</div>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <p className="text-sm font-mono text-muted-foreground">
          <strong>{'Resolution Rule:'}</strong> {'Final 24h TWAP > 50% = Milestone PASSED'}
        </p>
      </div>
    </div>
  )
}
