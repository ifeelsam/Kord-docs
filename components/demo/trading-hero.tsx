'use client'

import { AreaChart, Area, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface TradingHeroProps {
  selectedTimeframe: string
  setSelectedTimeframe: (tf: string) => void
}

const chartData = [
  { time: '9am', price: 0.078 },
  { time: '10am', price: 0.081 },
  { time: '11am', price: 0.085 },
  { time: '12pm', price: 0.082 },
  { time: '1pm', price: 0.087 },
  { time: '2pm', price: 0.089 },
]

export function TradingHero({ selectedTimeframe, setSelectedTimeframe }: TradingHeroProps) {
  return (
    <section className="border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-geist-pixel-square)] mb-2">
            Trade ECHOES
          </h1>
          <p className="text-muted-foreground font-mono text-sm">Echoes Album Token (@janedoe)</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="border border-border rounded-lg p-3 bg-card">
            <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-1">Price</div>
            <div className="text-xl font-[family-name:var(--font-geist-pixel-square)] text-green-500">$0.089</div>
            <div className="text-xs text-green-500 font-mono mt-1">+12.4% 24h</div>
          </div>
          <div className="border border-border rounded-lg p-3 bg-card">
            <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-1">Market Cap</div>
            <div className="text-xl font-[family-name:var(--font-geist-pixel-square)] text-green-500">$89K</div>
          </div>
          <div className="border border-border rounded-lg p-3 bg-card">
            <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-1">Liquidity</div>
            <div className="text-xl font-[family-name:var(--font-geist-pixel-square)] text-green-500">$23,400</div>
          </div>
          <div className="border border-border rounded-lg p-3 bg-card">
            <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-1">Holders</div>
            <div className="text-xl font-[family-name:var(--font-geist-pixel-square)] text-green-500">247</div>
          </div>
        </div>

        {/* Chart */}
        <div className="border border-border rounded-lg p-6 bg-card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-mono text-sm uppercase tracking-widest">Price Chart</h3>
            <div className="flex gap-2">
              {['1H', '6H', '24H', '7D'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`px-3 py-1 text-xs font-mono rounded border transition-colors ${
                    selectedTimeframe === tf
                      ? 'bg-green-500 text-black border-green-500'
                      : 'border-border hover:border-green-500'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
              <Area type="monotone" dataKey="price" stroke="#22c55e" fill="url(#colorPrice)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button className="px-6 py-3 text-sm font-mono bg-green-500 text-black rounded-lg hover:opacity-90 transition-opacity">
            Add Liquidity
          </button>
          <button className="px-6 py-3 text-sm font-mono border border-border rounded-lg hover:border-green-500 transition-colors">
            Portfolio Position
          </button>
        </div>
      </div>
    </section>
  )
}
