'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, Droplets } from 'lucide-react'

const activities = [
  { id: 1, time: '2m ago', user: '@musicfan23', action: 'bought', amount: '500 YES', value: '$435', impact: '+0.1%' },
  { id: 2, time: '5m ago', user: '@trancehead', action: 'sold', amount: '1,200 NO', value: '$156', impact: '-0.2%' },
  { id: 3, time: '12m ago', user: '@bigwhale', action: 'liquidity', amount: '$847 to YES pool', value: '', impact: '' },
  { id: 4, time: '23m ago', user: 'Anchor', action: 'twap', amount: 'TWAP updated', value: 'Yes 86.2%', impact: '' },
  { id: 5, time: '34m ago', user: '@crypto_investor', action: 'bought', amount: '234 YES', value: '$203', impact: '+0.05%' },
  { id: 6, time: '45m ago', user: '@defi_degen', action: 'sold', amount: '567 NO', value: '$73', impact: '-0.08%' },
]

export function MilestoneActivityFeed() {
  const [filter, setFilter] = useState('all')

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(a => {
        if (filter === 'trades') return a.action === 'bought' || a.action === 'sold'
        if (filter === 'liquidity') return a.action === 'liquidity'
        if (filter === 'twap') return a.action === 'twap'
        return true
      })

  const getIcon = (action: string) => {
    if (action === 'bought') return <TrendingUp className="w-4 h-4 text-green-500" />
    if (action === 'sold') return <TrendingDown className="w-4 h-4 text-red-500" />
    if (action === 'liquidity') return <Droplets className="w-4 h-4 text-blue-500" />
    return <span className="text-sm font-mono text-muted-foreground">📊</span>
  }

  const getActionLabel = (action: string) => {
    if (action === 'bought') return 'bought'
    if (action === 'sold') return 'sold'
    if (action === 'liquidity') return 'added liquidity'
    return 'TWAP updated'
  }

  return (
    <div>
      <h3 className="text-2xl font-[family-name:var(--font-geist-pixel-square)] mb-6">Recent Market Activity</h3>

      {/* Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { value: 'all', label: 'All Activity' },
          { value: 'trades', label: 'Trades' },
          { value: 'liquidity', label: 'Liquidity' },
          { value: 'twap', label: 'TWAP Updates' },
        ].map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-4 py-2 text-sm font-mono rounded-lg border transition-colors ${
              filter === value
                ? 'bg-green-500 text-black border-green-500'
                : 'border-border text-muted-foreground hover:border-green-500'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="space-y-3">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="border border-border rounded-lg p-4 bg-card hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-0.5">{getIcon(activity.action)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-sm font-bold">{activity.user}</span>
                    <span className="text-xs font-mono text-muted-foreground">{getActionLabel(activity.action)}</span>
                    <span className="text-xs font-mono">{activity.amount}</span>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground mt-1">
                    {activity.time}
                  </div>
                </div>
              </div>
              <div className="text-right">
                {activity.value && (
                  <div className="text-sm font-mono font-bold">{activity.value}</div>
                )}
                {activity.impact && (
                  <div className={`text-xs font-mono ${activity.impact.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {activity.impact}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-6 text-center">
        <button className="px-6 py-2 text-sm font-mono border border-border rounded-lg hover:border-green-500 transition-colors">
          Load More Activity
        </button>
      </div>
    </div>
  )
}
