'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { ProjectCard } from './project-card'

interface ProjectGridProps {
  filters: {
    genre: string
    status: string
    sort: string
    search: string
  }
}

// Mock project data
const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'Echoes',
    artist: 'Jane Doe',
    artistHandle: '@janedoe',
    genre: 'Electronic',
    image: 'ipfs://QmExample1',
    fundingCurrent: 47200,
    fundingGoal: 50000,
    tokenPrice: 0.089,
    tokenChange: 12.4,
    daysLeft: 13,
    perks: ['Early drop', '1% AUDIO'],
  },
  {
    id: '2',
    title: 'Rhythm Waves',
    artist: 'Alex Rivera',
    artistHandle: '@alexrivera',
    genre: 'Hip-Hop',
    image: 'ipfs://QmExample2',
    fundingCurrent: 32500,
    fundingGoal: 45000,
    tokenPrice: 0.056,
    tokenChange: 8.2,
    daysLeft: 21,
    perks: ['VIP Pass', '2% AUDIO'],
  },
  {
    id: '3',
    title: 'Midnight Songs',
    artist: 'Sam Turner',
    artistHandle: '@samturner',
    genre: 'Rock',
    image: 'ipfs://QmExample3',
    fundingCurrent: 61200,
    fundingGoal: 65000,
    tokenPrice: 0.124,
    tokenChange: 15.8,
    daysLeft: 5,
    perks: ['Vinyl Edition', '3% AUDIO'],
  },
  {
    id: '4',
    title: 'Jazz Dreams',
    artist: 'Maria Gonzalez',
    artistHandle: '@mariagonzalez',
    genre: 'Jazz',
    image: 'ipfs://QmExample4',
    fundingCurrent: 28100,
    fundingGoal: 40000,
    tokenPrice: 0.042,
    tokenChange: 5.1,
    daysLeft: 28,
    perks: ['Studio Session', '1.5% AUDIO'],
  },
  {
    id: '5',
    title: 'Pop Sensation',
    artist: 'Chris Lambert',
    artistHandle: '@chrislambert',
    genre: 'Pop',
    image: 'ipfs://QmExample5',
    fundingCurrent: 52800,
    fundingGoal: 60000,
    tokenPrice: 0.098,
    tokenChange: 11.3,
    daysLeft: 9,
    perks: ['Meet & Greet', '2.5% AUDIO'],
  },
  {
    id: '6',
    title: 'Indie Vibes',
    artist: 'Taylor Chen',
    artistHandle: '@taylorchen',
    genre: 'Indie',
    image: 'ipfs://QmExample6',
    fundingCurrent: 38900,
    fundingGoal: 50000,
    tokenPrice: 0.067,
    tokenChange: 9.7,
    daysLeft: 16,
    perks: ['Exclusive Mix', '1.8% AUDIO'],
  },
  {
    id: '7',
    title: 'Electronic Era',
    artist: 'Nicole Park',
    artistHandle: '@nicolepark',
    genre: 'Electronic',
    image: 'ipfs://QmExample7',
    fundingCurrent: 44300,
    fundingGoal: 55000,
    tokenPrice: 0.076,
    tokenChange: 10.2,
    daysLeft: 19,
    perks: ['NFT Collectible', '2.2% AUDIO'],
  },
  {
    id: '8',
    title: 'Soul & Sounds',
    artist: 'David Brown',
    artistHandle: '@davidbrown',
    genre: 'Soul',
    image: 'ipfs://QmExample8',
    fundingCurrent: 55600,
    fundingGoal: 58000,
    tokenPrice: 0.112,
    tokenChange: 13.5,
    daysLeft: 7,
    perks: ['Concert Ticket', '3% AUDIO'],
  },
  {
    id: '9',
    title: 'Future Beats',
    artist: 'Emma Wilson',
    artistHandle: '@emmawilson',
    genre: 'Electronic',
    image: 'ipfs://QmExample9',
    fundingCurrent: 22100,
    fundingGoal: 48000,
    tokenPrice: 0.038,
    tokenChange: 3.4,
    daysLeft: 35,
    perks: ['Production Credits', '1.2% AUDIO'],
  },
]

export function ProjectGrid({ filters }: ProjectGridProps) {
  const [projects, setProjects] = useState<any[]>([])
  const [displayedCount, setDisplayedCount] = useState(6)
  const [isLoading, setIsLoading] = useState(true)
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true)
      try {
        const res = await fetch('/api/projects')
        const data = await res.json()

        let formattedData = data.map((p: any) => ({
          id: p.id,
          title: p.title,
          artist: p.artist?.displayName || p.artist?.handle || 'Unknown Artist',
          artistHandle: `@${p.artist?.handle}`,
          genre: p.genre || 'Various',
          image: p.imageUrl || 'ipfs://QmExample', // Default if no image
          fundingCurrent: Number(p.fundingCurrent),
          fundingGoal: Number(p.fundingGoal),
          tokenPrice: Number(p.tokenPrice),
          tokenChange: 0, // Mock for now since we don't have historical price
          daysLeft: p.endDate ? Math.ceil((new Date(p.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0,
          perks: [] // Mock perks for now
        }))

        // Filter projects based on current filters
        if (filters.genre !== 'all') {
          formattedData = formattedData.filter((p: any) => p.genre.toLowerCase() === filters.genre.toLowerCase())
        }

        if (filters.search) {
          const query = filters.search.toLowerCase()
          formattedData = formattedData.filter(
            (p: any) =>
              p.title.toLowerCase().includes(query) ||
              p.artist.toLowerCase().includes(query) ||
              p.artistHandle.toLowerCase().includes(query)
          )
        }

        setProjects(formattedData)
      } catch (err) {
        console.error('Failed to fetch projects', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
    setDisplayedCount(6)
  }, [filters])

  // Infinite scroll implementation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
          setIsLoading(true)
          // Simulate network delay
          setTimeout(() => {
            setDisplayedCount((prev) => Math.min(prev + 6, projects.length))
            setIsLoading(false)
          }, 500)
        }
      },
      { threshold: 0.1 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => observer.disconnect()
  }, [isLoading, projects.length])

  const displayedProjects = projects.slice(0, displayedCount)
  const hasMore = displayedCount < projects.length

  if (projects.length === 0) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg text-muted-foreground font-mono mb-6">
            No projects match your filters :(
          </p>
          <div className="space-y-3 text-muted-foreground text-sm font-mono">
            <p>🔄 Clear all filters</p>
            <p>✨ Check trending projects</p>
            <p>🎵 Try different genres</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Updating {projects.length} projects...
            </div>
          </div>
        )}

        {/* End of results or load more indicator */}
        {!hasMore && projects.length > 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground font-mono mb-6">All caught up! 🎉</p>
            <div className="space-y-2 text-sm text-muted-foreground font-mono">
              <p>👆 Scroll up to see trending projects</p>
              <p>⭐ Follow artists for new launches</p>
              <p>🔔 Enable notifications for ending soon</p>
            </div>
          </div>
        )}

        {/* Infinite scroll trigger */}
        {hasMore && (
          <div ref={observerTarget} className="h-10 flex items-center justify-center">
            <div className="text-xs text-muted-foreground font-mono">Loading more projects...</div>
          </div>
        )}
      </div>
    </section>
  )
}
