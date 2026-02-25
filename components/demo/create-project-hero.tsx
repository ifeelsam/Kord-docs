'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CreateProjectHero() {
  return (
    <section className="w-full border-b border-border py-12 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="space-y-6 text-center">
          <h1 className="text-5xl md:text-6xl font-[family-name:var(--font-geist-pixel-square)] tracking-tight">
            Create Your Project
          </h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground font-mono">
            Raise patient capital for your music
          </h2>

          <div className="flex flex-col sm:flex-row justify-center gap-3 text-sm font-mono">
            <div className="flex items-center justify-center gap-2 px-3 py-1 bg-secondary/30 rounded border border-border">
              <span className="text-accent">✓</span>
              <span className="text-muted-foreground">2,847 artists raised $14M+</span>
            </div>
            <div className="flex items-center justify-center gap-2 px-3 py-1 bg-secondary/30 rounded border border-border">
              <span className="text-accent">✓</span>
              <span className="text-muted-foreground">98% success rate</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Link href="/explore">
              <Button variant="outline" size="sm" className="font-mono text-xs">
                ← Back to Explore
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="font-mono text-xs text-muted-foreground hover:text-foreground">
              Preview
            </Button>
            <Button variant="ghost" size="sm" className="font-mono text-xs text-muted-foreground hover:text-foreground">
              Save Draft
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
