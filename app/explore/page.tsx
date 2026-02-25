'use client'

import { useState, useCallback } from 'react'
import { ExploreHero } from '@/components/demo/explore-hero'
import { FilterBar } from '@/components/demo/filter-bar'
import { ProjectGrid } from '@/components/demo/project-grid'
import { KordFooter } from '@/components/demo/kord-footer'

export default function ExplorePage() {
  const [filters, setFilters] = useState({
    genre: 'all',
    status: 'live',
    sort: 'trending',
    search: '',
  })

  const handleFilterChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters)
  }, [])

  return (
    <main className="min-h-screen">
      <ExploreHero onSearch={(search) => handleFilterChange({ ...filters, search })} />

      <div className="max-w-7xl mx-auto px-4">
        <hr className="border-border" />
      </div>

      <FilterBar filters={filters} onFiltersChange={handleFilterChange} />

      <div className="max-w-7xl mx-auto px-4">
        <hr className="border-border" />
      </div>

      <ProjectGrid filters={filters} />

      <KordFooter />
    </main>
  )
}
