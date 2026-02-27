'use client'

export function InvestorsMetrics() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="border border-border rounded-lg p-4 bg-card">
          <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">Total Investors</h4>
          <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-accent">247</div>
          <p className="text-xs text-muted-foreground font-mono mt-1">Active backers</p>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card">
          <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">Whales</h4>
          <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-accent">23</div>
          <p className="text-xs text-muted-foreground font-mono mt-1">9% of investors</p>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card">
          <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">Average Ticket</h4>
          <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-accent">$191</div>
          <p className="text-xs text-muted-foreground font-mono mt-1">Per investor</p>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card">
          <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">New Investors</h4>
          <div className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-accent">180</div>
          <p className="text-xs text-muted-foreground font-mono mt-1">73% first-time</p>
        </div>
      </div>

      {/* Investor Types */}
      <div className="border border-border rounded-lg p-4 bg-card">
        <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Investor Breakdown</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 border border-border/50 rounded">
            <div className="text-sm font-mono text-muted-foreground mb-2">Top Investor</div>
            <div className="text-lg font-mono text-accent">@bigwhale</div>
            <div className="text-xs text-muted-foreground font-mono">$5,200</div>
          </div>
          <div className="p-3 border border-border/50 rounded">
            <div className="text-sm font-mono text-muted-foreground mb-2">Returners</div>
            <div className="text-lg font-mono text-accent">67</div>
            <div className="text-xs text-muted-foreground font-mono">27% repeat</div>
          </div>
          <div className="p-3 border border-border/50 rounded">
            <div className="text-sm font-mono text-muted-foreground mb-2">New Investors</div>
            <div className="text-lg font-mono text-accent">180</div>
            <div className="text-xs text-muted-foreground font-mono">73% new</div>
          </div>
        </div>
      </div>

      {/* Top 10 Investors Table */}
      <div className="border border-border rounded-lg p-4 bg-card overflow-x-auto">
        <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Top Investors</h4>
        <table className="w-full text-sm font-mono">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-muted-foreground">Rank</th>
              <th className="text-left py-2 text-muted-foreground">Investor</th>
              <th className="text-right py-2 text-muted-foreground">Investment</th>
              <th className="text-right py-2 text-muted-foreground">Tokens</th>
              <th className="text-right py-2 text-muted-foreground">% of Total</th>
            </tr>
          </thead>
          <tbody>
            {[
              { rank: 1, name: '@bigwhale', amount: '$5,200', tokens: '27,102', percent: '2.7%' },
              { rank: 2, name: '@musicfan23', amount: '$1,800', tokens: '20,015', percent: '1.8%' },
              { rank: 3, name: '@trancehead', amount: '$1,200', tokens: '13,400', percent: '1.2%' },
              { rank: 4, name: '@synth_lover', amount: '$950', tokens: '10,674', percent: '0.9%' },
              { rank: 5, name: '@beat_hunter', amount: '$850', tokens: '9,551', percent: '0.8%' },
              { rank: 6, name: '@audio_collector', amount: '$750', tokens: '8,427', percent: '0.7%' },
              { rank: 7, name: '@melody_seeker', amount: '$650', tokens: '7,304', percent: '0.6%' },
              { rank: 8, name: '@rhythm_king', amount: '$600', tokens: '6,742', percent: '0.6%' },
              { rank: 9, name: '@sound_explorer', amount: '$580', tokens: '6,523', percent: '0.5%' },
              { rank: 10, name: '@vibe_finder', amount: '$550', tokens: '6,180', percent: '0.5%' },
            ].map((investor) => (
              <tr key={investor.rank} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                <td className="py-3 text-accent">#{investor.rank}</td>
                <td className="py-3">{investor.name}</td>
                <td className="py-3 text-right text-accent">{investor.amount}</td>
                <td className="py-3 text-right">{investor.tokens}</td>
                <td className="py-3 text-right text-muted-foreground">{investor.percent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export Action */}
      <div className="flex justify-end">
        <button className="px-4 py-2 text-sm font-mono border border-border rounded-lg hover:border-muted-foreground transition-colors">
          Export CSV
        </button>
      </div>
    </div>
  )
}
