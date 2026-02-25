'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FilterBarProps {
  filters: {
    genre: string
    status: string
    sort: string
    search: string
  }
  onFiltersChange: (filters: any) => void
}

const GENRES = ['All Genres', 'Electronic', 'Hip-Hop', 'Rock', 'Pop', 'Jazz', 'Indie']
const STATUSES = [
  { label: 'Live', count: 1247 },
  { label: 'Upcoming', count: 89 },
  { label: 'Successful', count: 2847 },
  { label: 'Failed', count: 23 },
]
const SORT_OPTIONS = [
  { value: 'trending', label: 'Trending' },
  { value: 'recently-funded', label: 'Recently Funded' },
  { value: 'ending-soon', label: 'Ending Soon' },
  { value: 'newest', label: 'Newest' },
]

export function FilterBar({ filters, onFiltersChange }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleGenreChange = (genre: string) => {
    const newGenre = genre === 'All Genres' ? 'all' : genre.toLowerCase()
    onFiltersChange({ ...filters, genre: newGenre })
  }

  const handleStatusChange = (status: string) => {
    onFiltersChange({ ...filters, status: status.toLowerCase() })
  }

  const handleSortChange = (sort: string) => {
    onFiltersChange({ ...filters, sort })
  }

  return (
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur py-4 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-3">
          {/* Genre Filter */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-mono text-muted-foreground uppercase">Genre:</span>
            <div className="flex flex-wrap gap-2">
              {GENRES.map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleGenreChange(genre)}
                  className={`px-3 py-1 text-xs font-mono rounded border transition-all ${
                    (genre === 'All Genres' && filters.genre === 'all') ||
                    (genre.toLowerCase() === filters.genre)
                      ? 'bg-accent text-accent-foreground border-accent'
                      : 'border-border bg-secondary text-muted-foreground hover:border-muted-foreground'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-mono text-muted-foreground uppercase">Status:</span>
            <div className="flex flex-wrap gap-2">
              {STATUSES.map(({ label, count }) => (
                <button
                  key={label}
                  onClick={() => handleStatusChange(label)}
                  className={`px-3 py-1 text-xs font-mono rounded border transition-all ${
                    label.toLowerCase() === filters.status
                      ? 'bg-accent text-accent-foreground border-accent'
                      : 'border-border bg-secondary text-muted-foreground hover:border-muted-foreground'
                  }`}
                >
                  {label} <span className="text-accent">({count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-mono text-muted-foreground uppercase">Sort:</span>
            <div className="flex gap-2">
              {SORT_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => handleSortChange(value)}
                  className={`px-3 py-1 text-xs font-mono rounded border transition-all ${
                    value === filters.sort
                      ? 'bg-accent text-accent-foreground border-accent'
                      : 'border-border bg-secondary text-muted-foreground hover:border-muted-foreground'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
