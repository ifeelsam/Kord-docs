'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function RisksAndLegals() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-6 bg-card rounded-lg border border-border hover:border-muted-foreground transition-colors"
        >
          <h3 className="text-lg font-bold font-mono">⚠️ Important Risk Disclosures</h3>
          <ChevronDown
            className={`w-5 h-5 text-muted-foreground transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && (
          <div className="mt-4 p-6 bg-card rounded-lg border border-border space-y-3">
            <ul className="space-y-3 text-sm font-mono text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-accent">•</span>
                <span>No guarantees artist will deliver (98% historical success)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">•</span>
                <span>Token value may go to zero post-funding</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">•</span>
                <span>Liquidity provided by platform (10% seed)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">•</span>
                <span>Not a security - utility tokens for perks only</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">•</span>
                <span>Solana network risks (outages, failed tx)</span>
              </li>
            </ul>

            <p className="text-xs text-muted-foreground border-t border-border pt-4 mt-4">
              By investing you acknowledge these risks.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
