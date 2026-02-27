'use client'

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface TradingChartsProps {
  selectedTimeframe: string
}

const priceChartData = [
  { time: '9am', price: 0.078 },
  { time: '10am', price: 0.081 },
  { time: '11am', price: 0.085 },
  { time: '12pm', price: 0.082 },
  { time: '1pm', price: 0.087 },
  { time: '2pm', price: 0.089 },
]

const volumeData = [
  { time: '9am', volume: 2.1, liquidity: 23 },
  { time: '10am', volume: 3.2, liquidity: 23.2 },
  { time: '11am', volume: 2.8, liquidity: 23.5 },
  { time: '12pm', volume: 3.5, liquidity: 23.3 },
  { time: '1pm', volume: 4.1, liquidity: 23.6 },
  { time: '2pm', volume: 3.0, liquidity: 23.4 },
]

const holderData = [
  { name: 'Whales (>1%)', value: 23 },
  { name: 'Large (0.1-1%)', value: 45 },
  { name: 'Medium (0.01-0.1%)', value: 147 },
  { name: 'Small (<0.01%)', value: 32 },
]

const transactionData = [
  { time: '12am', swaps: 23 },
  { time: '3am', swaps: 15 },
  { time: '6am', swaps: 34 },
  { time: '9am', swaps: 45 },
  { time: '12pm', swaps: 67 },
  { time: '3pm', swaps: 89 },
  { time: '6pm', swaps: 56 },
]

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e']

export function TradingCharts({ selectedTimeframe }: TradingChartsProps) {
  return (
    <section>
      <h2 className="text-2xl font-[family-name:var(--font-geist-pixel-square)] mb-6">Advanced Charts</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Price Chart */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <h3 className="font-mono text-sm uppercase tracking-widest mb-4">Price Chart ({selectedTimeframe})</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={priceChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#ffffff' }} stroke="#ffffff" />
              <YAxis tick={{ fontSize: 12, fill: '#ffffff' }} stroke="#ffffff" />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
              <Line type="monotone" dataKey="price" stroke="#22c55e" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div className="text-xs text-muted-foreground font-mono mt-2">$0.078 → $0.089 ↑</div>
        </div>

        {/* Volume & Liquidity Chart */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <h3 className="font-mono text-sm uppercase tracking-widest mb-4">Volume + Liquidity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#ffffff' }} stroke="#ffffff" />
              <YAxis tick={{ fontSize: 12, fill: '#ffffff' }} stroke="#ffffff" />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
              <Bar dataKey="volume" fill="#22c55e" opacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
          <div className="text-xs text-muted-foreground font-mono mt-2">Volume $18K | LP $23K</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Holder Distribution */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <h3 className="font-mono text-sm uppercase tracking-widest mb-4">Holder Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={holderData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                {holderData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="text-xs text-muted-foreground font-mono mt-2 space-y-1">
            {holderData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[holderData.indexOf(item)] }} />
                {item.name}: {item.value}
              </div>
            ))}
          </div>
        </div>

        {/* Transactions */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <h3 className="font-mono text-sm uppercase tracking-widest mb-4">Transactions (1H)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={transactionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#ffffff' }} stroke="#ffffff" />
              <YAxis tick={{ fontSize: 12, fill: '#ffffff' }} stroke="#ffffff" />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
              <Bar dataKey="swaps" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
          <div className="text-xs text-muted-foreground font-mono mt-2">147 swaps in last hour</div>
        </div>
      </div>
    </section>
  )
}
