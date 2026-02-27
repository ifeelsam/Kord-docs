'use client'

import Link from 'next/link'

export function DashboardHero() {
  return (
    <section className="border-b border-border py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-geist-pixel-square)] text-foreground mb-2">
              Welcome Back, @sam
            </h1>
            <h2 className="text-lg md:text-xl font-mono text-muted-foreground mb-4">
              Your Kord Dashboard
            </h2>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-mono text-accent">$2,847</span>
              <span className="text-sm font-mono text-green-500">+12% this week</span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm font-mono text-muted-foreground">
              <span>3 active projects</span>
              <span className="text-border">•</span>
              <span>12 tokens</span>
              <span className="text-border">•</span>
              <span>47K total invested</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link href="/create">
              <button className="w-full px-6 py-3 text-sm font-mono bg-primary text-primary-foreground rounded-lg border border-primary hover:opacity-90 transition-opacity">
                Create New Project
              </button>
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <button className="px-4 py-2 text-xs font-mono bg-secondary text-secondary-foreground rounded-lg border border-border hover:border-muted-foreground transition-all">
                Withdraw
              </button>
              <button className="px-4 py-2 text-xs font-mono bg-secondary text-secondary-foreground rounded-lg border border-border hover:border-muted-foreground transition-all">
                Deposit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
