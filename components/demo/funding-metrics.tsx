'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const fundingBreakdownData = [
  { date: 'Day 1-7', amount: 12000 },
  { date: 'Day 8-14', amount: 23000 },
  { date: 'Day 15+', amount: 12000 },
]

const detailedFundingData = [
  { date: 'Feb 11', amount: 2000 },
  { date: 'Feb 12', amount: 3500 },
  { date: 'Feb 13', amount: 4200 },
  { date: 'Feb 14', amount: 5000 },
  { date: 'Feb 15', amount: 6800 },
  { date: 'Feb 16', amount: 8200 },
  { date: 'Feb 17', amount: 9500 },
  { date: 'Feb 18', amount: 11200 },
  { date: 'Feb 19', amount: 13000 },
  { date: 'Feb 20', amount: 21700 },
]

export function FundingMetrics() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-border rounded-lg p-4 bg-card">
          <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">Total Raised</h4>
          <div className="text-3xl font-[family-name:var(--font-geist-pixel-square)] text-accent">$47,200</div>
          <p className="text-xs text-muted-foreground font-mono mt-1">Progress to goal</p>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card">
          <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">Platform Fees</h4>
          <div className="text-3xl font-[family-name:var(--font-geist-pixel-square)] text-accent">$2,360</div>
          <p className="text-xs text-muted-foreground font-mono mt-1">5% of total raised</p>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card">
          <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">Total Investors</h4>
          <div className="text-3xl font-[family-name:var(--font-geist-pixel-square)] text-accent">247</div>
          <p className="text-xs text-muted-foreground font-mono mt-1">Active backers</p>
        </div>
      </div>

      {/* Funding by Period */}
      <div className="border border-border rounded-lg p-4 bg-card">
        <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Funding by Period</h4>
        <div className="grid grid-cols-3 gap-4">
          {fundingBreakdownData.map((item) => (
            <div key={item.date} className="p-3 bg-muted rounded border border-border/50">
              <div className="text-sm font-mono text-muted-foreground mb-1">{item.date}</div>
              <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-accent">${(item.amount / 1000).toFixed(1)}K</div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Funding Chart */}
      <div className="border border-border rounded-lg p-4 bg-card">
        <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Daily Funding Progress</h4>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={detailedFundingData}>
            <defs>
              <linearGradient id="colorFunding" x1="0" y1="0" x2="0" y2="1">
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
              formatter={(value) => `$${value.toLocaleString()}`}
            />
            <Area type="monotone" dataKey="amount" stroke="#22c55e" fill="url(#colorFunding)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Key Insights */}
      <div className="border border-border rounded-lg p-4 bg-card">
        <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Key Insights</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-2 border border-border/50 rounded">
            <span className="text-sm font-mono">Peak Day</span>
            <span className="text-accent font-mono">Feb 20th (+$8.7K, 184 investors)</span>
          </div>
          <div className="flex justify-between items-center p-2 border border-border/50 rounded">
            <span className="text-sm font-mono">Average Investment</span>
            <span className="text-accent font-mono">$191</span>
          </div>
          <div className="flex justify-between items-center p-2 border border-border/50 rounded">
            <span className="text-sm font-mono">Largest Investment</span>
            <span className="text-accent font-mono">$5,200 (@bigwhale)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
