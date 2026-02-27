'use client'

interface ProjectDetailTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
  commentCount: number
}

export function ProjectDetailTabs({ activeTab, onTabChange, commentCount }: ProjectDetailTabsProps) {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'tokenomics', label: 'Tokenomics' },
    { id: 'perks', label: 'Perks' },
    { id: 'community', label: `Community (${commentCount})` },
  ]

  return (
    <div className="flex items-center gap-6 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-2 py-4 text-sm font-mono whitespace-nowrap border-b-2 transition-all ${
            activeTab === tab.id
              ? 'border-accent text-accent'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
