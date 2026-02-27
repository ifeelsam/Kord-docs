'use client'

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const tokenPriceData = [
  { day: 'Mon', price: 0.079, volume: 8500 },
  { day: 'Tue', price: 0.081, volume: 12300 },
  { day: 'Wed', price: 0.083, volume: 11200 },
  { day: 'Thu', price: 0.086, volume: 14700 },
  { day: 'Fri', price: 0.088, volume: 16500 },
  { day: 'Sat', price: 0.089, volume: 18700 },
  { day: 'Sun', price: 0.087, volume: 9200 },
]

const holdersData = [
  { day: 'Feb 14', holders: 50 },
  { day: 'Feb 15', holders: 78 },
  { day: 'Feb 16', holders: 112 },
  { day: 'Feb 17', holders: 145 },
  { day: 'Feb 18', holders: 189 },
  { day: 'Feb 19', holders: 215 },
  { day: 'Feb 20', holders: 247 },
]

const investorSizeData = [
  { name: '$0-100', value: 42 },
  { name: '$100-1K', value: 52 },
  { name: '$1K+', value: 6 },
]

const COLORS = ['hsl(var(--accent))', 'hsl(var(--accent) / 0.7)', 'hsl(var(--accent) / 0.5)']

export function TokenMetrics() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="border border-border rounded-lg p-4 bg-card">
          <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">Market Cap</h4>
          <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-accent">$89,000</div>
          <p className="text-xs text-muted-foreground font-mono mt-1">1M supply @ $0.089</p>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card">
          <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">24h Volume</h4>
          <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-accent">$18.7K</div>
          <p className="text-xs text-muted-foreground font-mono mt-1">Trading volume</p>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card">
          <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">LP Depth</h4>
          <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-accent">$23.4K</div>
          <p className="text-xs text-muted-foreground font-mono mt-1">Liquidity available</p>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card">
          <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">Slippage (2%)</h4>
          <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-accent">$0.8K</div>
          <p className="text-xs text-muted-foreground font-mono mt-1">on $100K trade</p>
        </div>
      </div>

      {/* Price & Volume Chart */}
      <div className="border border-border rounded-lg p-4 bg-card">
        <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">7-Day Price & Volume</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={tokenPriceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis yAxisId="left" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
              }}
            />
            <Bar yAxisId="left" dataKey="volume" fill="hsl(var(--accent))" opacity={0.6} />
            <Line yAxisId="right" type="monotone" dataKey="price" stroke="hsl(var(--accent))" strokeWidth={2} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Holders Growth */}
      <div className="border border-border rounded-lg p-4 bg-card">
        <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Token Holders Growth</h4>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={holdersData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
              }}
            />
            <Line type="monotone" dataKey="holders" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ fill: 'hsl(var(--accent))' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Tokenomics Reminder */}
      <div className="border border-border rounded-lg p-4 bg-muted">
        <h4 className="font-mono text-xs uppercase tracking-widest text-foreground mb-3">Tokenomics (1M Total)</h4>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-sm font-mono text-muted-foreground">Public</div>
            <div className="text-xl font-[family-name:var(--font-geist-pixel-square)] text-accent">50%</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-mono text-muted-foreground">LP</div>
            <div className="text-xl font-[family-name:var(--font-geist-pixel-square)] text-accent">20%</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-mono text-muted-foreground">Anchor</div>
            <div className="text-xl font-[family-name:var(--font-geist-pixel-square)] text-accent">20%</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-mono text-muted-foreground">Artist</div>
            <div className="text-xl font-[family-name:var(--font-geist-pixel-square)] text-accent">10%</div>
          </div>
        </div>
      </div>

      {/* Investor Size Distribution */}
      <div className="border border-border rounded-lg p-4 bg-card">
        <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Investor Size Distribution</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={investorSizeData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="hsl(var(--accent))"
                dataKey="value"
              >
                {investorSizeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-3">
            {investorSizeData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between p-2 border border-border/50 rounded">
                <span className="text-sm font-mono">{item.name}</span>
                <span className="text-accent font-mono">{item.value} investors</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
