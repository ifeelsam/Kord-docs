'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const voters = [
  { rank: 1, name: '@bigwhale', yes: 12340, no: 0 },
  { rank: 2, name: '@musicfan23', yes: 5672, no: 1234 },
  { rank: 3, name: '@trancehead', yes: 3218, no: 0 },
  { rank: 4, name: '@crypto_investor', yes: 2847, no: 567 },
  { rank: 5, name: '@art_collector', yes: 2100, no: 890 },
  { rank: 6, name: '@defi_degen', yes: 1845, no: 1245 },
  { rank: 7, name: '@market_maker', yes: 1567, no: 423 },
  { rank: 8, name: '@betting_pro', yes: 1234, no: 678 },
  { rank: 9, name: '@sonic_fan', yes: 987, no: 234 },
  { rank: 10, name: '@rhythm_trader', yes: 645, no: 456 },
]

export function VotersLeaderboard() {
  return (
    <div>
      <h3 className="text-2xl font-[family-name:var(--font-geist-pixel-square)] mb-6">Voter Positions</h3>
      <p className="text-sm font-mono text-muted-foreground mb-6">127 total voters</p>

      {/* Desktop Table */}
      <div className="hidden md:block border border-border rounded-lg overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="font-mono text-xs uppercase text-muted-foreground">Rank</TableHead>
              <TableHead className="font-mono text-xs uppercase text-muted-foreground">Voter</TableHead>
              <TableHead className="font-mono text-xs uppercase text-muted-foreground text-right">Yes Shares</TableHead>
              <TableHead className="font-mono text-xs uppercase text-muted-foreground text-right">No Shares</TableHead>
              <TableHead className="font-mono text-xs uppercase text-muted-foreground text-right">Total Position</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {voters.map((voter) => (
              <TableRow key={voter.rank} className="border-b border-border hover:bg-muted/50">
                <TableCell className="font-mono text-sm font-bold text-green-500">#{voter.rank}</TableCell>
                <TableCell className="font-mono text-sm">{voter.name}</TableCell>
                <TableCell className="font-mono text-sm text-right text-green-500">{voter.yes.toLocaleString()}</TableCell>
                <TableCell className="font-mono text-sm text-right text-red-500">{voter.no.toLocaleString()}</TableCell>
                <TableCell className="font-mono text-sm text-right font-bold">
                  {(voter.yes + voter.no).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {voters.map((voter) => (
          <div key={voter.rank} className="border border-border rounded-lg p-4 bg-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="font-mono text-sm font-bold text-green-500">#{voter.rank}</span>
                <p className="font-mono text-sm mt-1">{voter.name}</p>
              </div>
              <span className="font-mono text-sm font-bold text-foreground">
                {(voter.yes + voter.no).toLocaleString()} total
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-muted-foreground">Yes Shares</span>
                <p className="text-green-500 font-bold">{voter.yes.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-muted-foreground">No Shares</span>
                <p className="text-red-500 font-bold">{voter.no.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Export Button */}
      <div className="mt-6 flex justify-end">
        <button className="px-4 py-2 text-sm font-mono border border-border rounded-lg hover:border-green-500 transition-colors">
          Export CSV
        </button>
      </div>
    </div>
  )
}
