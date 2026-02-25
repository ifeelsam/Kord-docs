'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface SuccessModalProps {
  projectTitle: string
  onClose: () => void
}

export function SuccessModal({ projectTitle, onClose }: SuccessModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const projectSlug = projectTitle.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="bg-background border-2 border-accent rounded-xl p-8 max-w-md w-full mx-4 text-center space-y-6 animate-in fade-in zoom-in duration-300">
        {/* Success Icon */}
        <div className="text-4xl">🎉</div>

        <div className="space-y-2">
          <h2 className="text-2xl font-[family-name:var(--font-geist-pixel-square)] font-bold">
            Project Live!
          </h2>
          <p className="text-sm text-muted-foreground font-mono">
            "{projectTitle}" is now raising funds
          </p>
        </div>

        {/* Project Link */}
        <div className="bg-secondary/30 border border-border rounded-lg p-4 space-y-2">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">Live Link</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-xs font-mono text-accent break-all">
              kord.fi/{projectSlug}
            </code>
            <button
              onClick={() => navigator.clipboard.writeText(`kord.fi/${projectSlug}`)}
              className="px-2 py-1 text-xs font-mono bg-accent text-background rounded hover:bg-accent/90 transition-colors"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Share Options */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">Share With Fans</p>
          <div className="flex gap-2 justify-center">
            <a
              href={`https://twitter.com/intent/tweet?text=Check out my project on Kord: kord.fi/${projectSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-xs font-mono bg-[#1DA1F2] text-white rounded hover:opacity-90 transition-opacity"
            >
              Twitter
            </a>
            <a
              href={`https://discord.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-xs font-mono bg-[#5865F2] text-white rounded hover:opacity-90 transition-opacity"
            >
              Discord
            </a>
            <button className="px-3 py-2 text-xs font-mono border border-border rounded hover:border-accent hover:text-accent transition-colors">
              Profile
            </button>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-accent/5 border border-accent/30 rounded-lg p-4 text-left space-y-2">
          <p className="text-xs font-mono font-bold text-accent uppercase tracking-widest">Next Steps</p>
          <ul className="text-xs font-mono text-muted-foreground space-y-1">
            <li>• Share link with fans & community</li>
            <li>• Track funding progress in Dashboard</li>
            <li>• Notify investors of milestones</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4">
          <Button
            variant="outline"
            onClick={() => {
              window.location.href = '/explore'
            }}
            className="flex-1 font-mono"
          >
            Back to Explore
          </Button>
          <Button
            onClick={onClose}
            className="flex-1 font-mono"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
