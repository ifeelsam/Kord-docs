'use client'

import { useState } from 'react'

const activityData = [
  { id: 1, time: '2m ago', user: '@musicfan23', action: 'swapped 0.5 SOL → 5,618 ECHOES' },
  { id: 2, time: '5m ago', user: '@trancehead', action: 'swapped 1,200 ECHOES → 0.107 SOL' },
  { id: 3, time: '12m ago', user: '@bigwhale', action: 'added $2.3K liquidity' },
  { id: 4, time: '23m ago', user: '@janedoe', action: 'Anchor deposited 456 AUDIO' },
  { id: 5, time: '34m ago', user: '@musicfan12', action: 'swapped 2.1 SOL → 23,567 ECHOES' },
  { id: 6, time: '45m ago', user: '@trader.bot', action: 'swapped 0.75 SOL → 8,427 ECHOES' },
]

export function RecentActivity() {
  const [filter, setFilter] = useState('all')

  const filters = ['all', 'swaps', 'liquidity', 'royalties']

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-[family-name:var(--font-geist-pixel-square)]">Recent Activity</h2>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-xs font-mono rounded border transition-colors ${
                filter === f
                  ? 'bg-green-500 text-black border-green-500'
                  : 'border-border hover:border-green-500'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="border border-border rounded-lg bg-card overflow-hidden">
        <div className="divide-y divide-border">
          {activityData.map((activity) => (
            <div key={activity.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between text-sm font-mono">
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground w-12">{activity.time}</span>
                  <span className="text-green-500">{activity.user}</span>
                  <span className="text-foreground">{activity.action}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center">
        <button className="px-6 py-2 text-sm font-mono border border-border rounded-lg hover:border-green-500 transition-colors">
          View All Transactions
        </button>
      </div>
    </section>
  )
}
