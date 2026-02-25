'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

interface ExploreHeroProps {
  onSearch: (query: string) => void
}

export function ExploreHero({ onSearch }: ExploreHeroProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearch(query)
  }

  return (
    <section className="flex flex-col items-center gap-8 py-16 px-4 text-center">
      <div className="flex items-center gap-2 text-muted-foreground text-sm font-mono uppercase tracking-widest">
        <span className="inline-block w-6 h-px bg-muted-foreground" />
        Explore
        <span className="inline-block w-6 h-px bg-muted-foreground" />
      </div>

      <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tight text-balance font-[family-name:var(--font-geist-pixel-square)]">
        <span className="text-accent">1,247</span> Live Projects
      </h1>

      <h2 className="text-xl md:text-2xl text-muted-foreground font-mono">
        Raising <span className="text-accent">$4.2M</span> for Independent Music
      </h2>

      <div className="w-full max-w-2xl mt-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search projects, artists..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-3 pl-10 text-foreground font-mono text-sm rounded-lg border border-border bg-secondary placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-xs md:text-sm font-mono text-muted-foreground">
        <div className="flex flex-col">
          <span className="text-accent font-semibold">1,247</span>
          <span>Total Projects</span>
        </div>
        <div className="flex flex-col">
          <span className="text-accent font-semibold">$4.2M</span>
          <span>Total Raised</span>
        </div>
        <div className="flex flex-col">
          <span className="text-accent font-semibold">98.2%</span>
          <span>Success Rate</span>
        </div>
      </div>
    </section>
  )
}
