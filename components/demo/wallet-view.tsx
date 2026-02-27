'use client'

import { Card } from '@/components/ui/card'
import { ArrowDownLeft, ArrowUpRight, Copy } from 'lucide-react'

export function WalletView() {
  const walletData = {
    balance: '2.47 SOL',
    balanceUsd: '$384',
    available: '1.84 SOL',
    availableUsd: '$287',
    invested: '$4,723',
  }

  const transactions = [
    {
      id: '1',
      date: '2h ago',
      type: 'invest',
      project: 'Echoes',
      amount: '-$100',
      status: 'Success',
    },
    {
      id: '2',
      date: '1d ago',
      type: 'withdraw',
      project: '-',
      amount: '+0.5 SOL',
      status: 'Success',
    },
    {
      id: '3',
      date: '3d ago',
      type: 'claim',
      project: 'My EP',
      amount: '+$2,300',
      status: 'Success',
    },
    {
      id: '4',
      date: '5d ago',
      type: 'invest',
      project: 'Summer Nights',
      amount: '-$250',
      status: 'Success',
    },
    {
      id: '5',
      date: '1w ago',
      type: 'deposit',
      project: '-',
      amount: '+1.0 SOL',
      status: 'Success',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-foreground mb-2">
          Your Wallet
        </h2>
        <p className="text-lg font-mono text-muted-foreground mb-6">
          Manage funds & transactions
        </p>

        {/* Balance cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <p className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest">
              Total Balance
            </p>
            <p className="text-2xl font-mono text-foreground font-bold mb-1">
              {walletData.balance}
            </p>
            <p className="text-sm font-mono text-muted-foreground">
              {walletData.balanceUsd}
            </p>
          </Card>

          <Card className="p-6">
            <p className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest">
              Available
            </p>
            <p className="text-2xl font-mono text-foreground font-bold mb-1">
              {walletData.available}
            </p>
            <p className="text-sm font-mono text-muted-foreground">
              {walletData.availableUsd}
            </p>
          </Card>

          <Card className="p-6">
            <p className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest">
              Total Invested
            </p>
            <p className="text-2xl font-mono text-foreground font-bold mb-1">
              {walletData.invested}
            </p>
            <p className="text-sm font-mono text-muted-foreground">
              In 4 projects
            </p>
          </Card>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button className="flex items-center gap-2 px-6 py-3 text-sm font-mono bg-primary text-primary-foreground rounded-lg border border-primary hover:opacity-90 transition-opacity">
            <ArrowDownLeft className="w-4 h-4" />
            Deposit SOL/USDC
          </button>
          <button className="flex items-center gap-2 px-6 py-3 text-sm font-mono bg-secondary text-secondary-foreground rounded-lg border border-border hover:border-muted-foreground transition-all">
            <ArrowUpRight className="w-4 h-4" />
            Withdraw
          </button>
          <button className="px-6 py-3 text-sm font-mono text-muted-foreground rounded-lg border border-border hover:border-muted-foreground transition-all">
            View on Solscan
          </button>
        </div>
      </div>

      {/* Transactions */}
      <div>
        <h3 className="text-xl font-[family-name:var(--font-geist-pixel-square)] text-foreground mb-4">
          Recent Transactions
        </h3>

        <div className="space-y-2">
          {transactions.map((tx) => (
            <Card
              key={tx.id}
              className="p-4 hover:border-accent transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    tx.type === 'invest'
                      ? 'bg-red-500/10'
                      : tx.type === 'withdraw'
                      ? 'bg-blue-500/10'
                      : 'bg-green-500/10'
                  }`}>
                    {tx.type === 'invest' || tx.type === 'withdraw' ? (
                      <ArrowUpRight className={`w-5 h-5 ${
                        tx.type === 'invest'
                          ? 'text-red-500'
                          : 'text-blue-500'
                      }`} />
                    ) : (
                      <ArrowDownLeft className="w-5 h-5 text-green-500" />
                    )}
                  </div>

                  <div>
                    <p className="font-[family-name:var(--font-geist-pixel-square)] text-foreground font-bold capitalize">
                      {tx.type === 'claim'
                        ? 'Claim Milestone'
                        : tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                    </p>
                    <p className="text-xs font-mono text-muted-foreground">
                      {tx.project !== '-'
                        ? `${tx.project} • ${tx.date}`
                        : tx.date}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`font-mono font-bold ${
                    tx.amount.startsWith('+')
                      ? 'text-green-500'
                      : tx.amount.startsWith('-')
                      ? 'text-red-500'
                      : 'text-foreground'
                  }`}>
                    {tx.amount}
                  </p>
                  <p className="text-xs font-mono text-green-500">
                    ✓ {tx.status}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Wallet address */}
      <Card className="p-6 border-border">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
          Wallet Address
        </p>
        <div className="flex items-center gap-3">
          <code className="flex-1 px-4 py-2 bg-muted rounded-lg font-mono text-sm text-foreground break-all">
            9B2L4kH...xQm9Z
          </code>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Copy className="w-5 h-5 text-muted-foreground hover:text-foreground" />
          </button>
        </div>
      </Card>
    </div>
  )
}
