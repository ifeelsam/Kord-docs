'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const liquidityData = [
  { name: 'Yes', value: 7623, percentage: 87 },
  { name: 'No', value: 1119, percentage: 13 },
]

export function LiquidityTab() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-[family-name:var(--font-geist-pixel-square)] mb-6">Market Liquidity</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="border border-border rounded-lg p-4 bg-card">
            <div className="text-xs font-mono text-muted-foreground mb-2">YES POOL</div>
            <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-green-500 mb-1">$7,623</div>
            <div className="text-sm font-mono text-muted-foreground">87% of depth</div>
          </div>
          <div className="border border-border rounded-lg p-4 bg-card">
            <div className="text-xs font-mono text-muted-foreground mb-2">NO POOL</div>
            <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-red-500 mb-1">$1,119</div>
            <div className="text-sm font-mono text-muted-foreground">13% of depth</div>
          </div>
          <div className="border border-border rounded-lg p-4 bg-card">
            <div className="text-xs font-mono text-muted-foreground mb-2">TOTAL DEPTH</div>
            <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)]">$8,742</div>
          </div>
        </div>

        <div className="border border-border rounded-lg p-6 bg-card mb-8">
          <h4 className="font-mono text-sm uppercase tracking-widest text-muted-foreground mb-4">Liquidity Distribution</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={liquidityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
              <Bar dataKey="value" fill="#22c55e">
                <Cell fill="#22c55e" />
                <Cell fill="#ef4444" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-border rounded-lg p-4 bg-card">
            <div className="text-xs font-mono text-muted-foreground mb-2">24H FEES</div>
            <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)]">$23.41</div>
            <div className="text-sm font-mono text-muted-foreground">0.3% of volume</div>
          </div>
          <div className="border border-border rounded-lg p-4 bg-card">
            <div className="text-xs font-mono text-muted-foreground mb-2">YOUR LP SHARE</div>
            <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-green-500">2.7%</div>
            <div className="text-sm font-mono text-muted-foreground">$237 value</div>
          </div>
          <div className="border border-border rounded-lg p-4 bg-card">
            <div className="text-xs font-mono text-muted-foreground mb-2">IMPERMANENT LOSS</div>
            <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-red-500">-$8.23</div>
            <div className="text-sm font-mono text-red-500">-0.9%</div>
          </div>
        </div>
      </div>
    </div>
  )
}
