'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { ArtistProjectCard } from '@/components/demo/artist-project-card'
import { ArtistAnalyticsModal } from '@/components/demo/artist-analytics-modal'

export function ArtistView() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const projects = [
    {
      id: '1',
      title: 'Echoes',
      fundingProgress: 94,
      fundingAmount: '$47K / $50K',
      daysLeft: 13,
      tokenPrice: '$0.089',
      tokenChange: '+12%',
      currentMilestone: 'Milestone 2/4: Mixing',
      milestoneProgress: 30,
      investors: 247,
      feesEarned: '$2.8K',
      albumArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    },
    {
      id: '2',
      title: 'Summer Nights',
      fundingProgress: 67,
      fundingAmount: '$33.5K / $50K',
      daysLeft: 28,
      tokenPrice: '$0.045',
      tokenChange: '+5%',
      currentMilestone: 'Milestone 1/4: Recording',
      milestoneProgress: 15,
      investors: 156,
      feesEarned: '$1.2K',
      albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-[family-name:var(--font-geist-pixel-square)] text-foreground mb-4">
          Your Artist Projects
        </h2>
        
        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button className="px-3 py-2 text-xs font-mono bg-secondary text-secondary-foreground rounded-lg border border-border hover:border-muted-foreground transition-all">
            Status ▼
          </button>
          <button className="px-3 py-2 text-xs font-mono bg-muted text-foreground rounded-lg border border-border hover:border-muted-foreground transition-all">
            All
          </button>
          <button className="px-3 py-2 text-xs font-mono text-muted-foreground rounded-lg border border-border hover:border-muted-foreground transition-all">
            Active
          </button>
          <button className="px-3 py-2 text-xs font-mono text-muted-foreground rounded-lg border border-border hover:border-muted-foreground transition-all">
            Upcoming
          </button>
          <button className="px-3 py-2 text-xs font-mono text-muted-foreground rounded-lg border border-border hover:border-muted-foreground transition-all">
            Successful
          </button>
          <button className="px-3 py-2 text-xs font-mono text-muted-foreground rounded-lg border border-border hover:border-muted-foreground transition-all">
            Failed
          </button>
        </div>

        {/* Project cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project.id)}
              className="cursor-pointer"
            >
              <ArtistProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Modal */}
      {selectedProject && (
        <ArtistAnalyticsModal
          projectId={selectedProject}
          onClose={() => setSelectedProject(null)}
          project={projects.find(p => p.id === selectedProject)!}
        />
      )}
    </div>
  )
}
