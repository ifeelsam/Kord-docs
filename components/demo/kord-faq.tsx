"use client"

import { useState } from "react"

const faqs = [
  {
    id: 1,
    question: "How do I know artists will deliver?",
    answer:
      "Milestone escrow - funds locked until proof submitted. Artists propose clear milestones for album completion, and investor funds are held in escrow until each milestone is verified and completed.",
  },
  {
    id: 2,
    question: "What do I get for investing?",
    answer:
      "Project tokens + AUDIO royalties, early access. You receive native project tokens that appreciate in value, plus a percentage of platform tokens (AUDIO) that represent your share in the revenue stream.",
  },
  {
    id: 3,
    question: "Can I sell my tokens anytime?",
    answer:
      "Yes! Raydium LP live from day 1. Tokens are immediately tradeable on Raydium (Solana's DEX) with full liquidity. You can exit your position whenever you want.",
  },
  {
    id: 4,
    question: "What chain?",
    answer:
      "Solana - instant, <$0.001 fees. All transactions are on the Solana blockchain for fast, cheap, and secure transfers without the gas fees of Ethereum.",
  },
]

export function KordFAQ() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-geist-pixel-square)] font-bold mb-2 tracking-tight">
            Common Questions
          </h2>
          <p className="text-muted-foreground font-mono text-sm">
            Everything you need to know about Kord
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-border rounded-lg overflow-hidden hover:border-accent transition-colors"
            >
              <button
                onClick={() =>
                  setExpanded(expanded === faq.id ? null : faq.id)
                }
                className="w-full px-6 py-4 flex items-center justify-between bg-card hover:bg-secondary transition-colors text-left"
              >
                <span className="font-mono font-bold text-sm">
                  {faq.question}
                </span>
                <span className="text-accent font-bold text-xl">
                  {expanded === faq.id ? "−" : "+"}
                </span>
              </button>

              {expanded === faq.id && (
                <div className="px-6 py-4 bg-secondary border-t border-border">
                  <p className="text-sm text-muted-foreground font-mono leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
