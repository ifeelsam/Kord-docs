'use client'

import { useState } from 'react'
import { Upload, Check, Clock, AlertCircle, X } from 'lucide-react'

interface MilestoneModalProps {
  isOpen: boolean
  onClose: () => void
}

export function MilestoneModal({ isOpen, onClose }: MilestoneModalProps) {
  const [proofFiles, setProofFiles] = useState<string[]>(['audio_mix_v1.mp3', 'mixing_notes.pdf'])

  const milestones = [
    { id: 1, title: 'Demos', status: 'complete' },
    { id: 2, title: 'Mixing', status: 'pending' },
    { id: 3, title: 'Mastering', status: 'pending' },
    { id: 4, title: 'Release', status: 'pending' },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-[family-name:var(--font-geist-pixel-square)]">Milestone Progress</h3>
            <div className="text-sm font-mono text-muted-foreground">2/4 Complete</div>
          </div>

          {/* Milestone Steps */}
          <div className="flex items-center justify-between mb-6">
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="flex items-center flex-1">
                <div className="relative flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      milestone.status === 'complete'
                        ? 'bg-accent border-accent'
                        : milestone.status === 'pending'
                          ? 'border-muted-foreground bg-transparent'
                          : 'border-muted-foreground bg-transparent'
                    }`}
                  >
                    {milestone.status === 'complete' ? (
                      <Check className="w-4 h-4 text-accent-foreground" />
                    ) : milestone.status === 'pending' ? (
                      <Clock className="w-4 h-4 text-muted-foreground" />
                    ) : null}
                  </div>
                  <div className="text-xs font-mono text-center mt-2 whitespace-nowrap">{milestone.title}</div>
                </div>
                {index < milestones.length - 1 && (
                  <div className="flex-1 mx-2 h-1 bg-muted" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Milestone */}
        <div className="border-t border-border pt-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-lg font-mono font-semibold">Current: Mixing Complete</h4>
              <span className="text-xs font-mono bg-muted px-2 py-1 rounded text-muted-foreground">
                ⏳ Pending Vote (87%)
              </span>
            </div>
            <p className="text-sm text-muted-foreground font-mono">
              Upload proof of completion. Community votes on milestone release.
            </p>
          </div>

          {/* Upload Section */}
          <div className="mb-6">
            <div className="text-sm font-mono text-muted-foreground mb-3">Proof of Completion:</div>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-4 cursor-pointer hover:border-accent transition-colors">
              <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm font-mono text-muted-foreground mb-1">
                Drag audio/video/screenshots/links here
              </p>
              <p className="text-xs text-muted-foreground font-mono">or click to browse</p>
            </div>

            {/* Uploaded Files */}
            {proofFiles.length > 0 && (
              <div className="mb-4">
                <div className="text-xs font-mono text-muted-foreground mb-2">
                  {proofFiles.length}/10 files ({Math.round((proofFiles.length / 10) * 100)}%)
                </div>
                <div className="space-y-2">
                  {proofFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border border-border/50 rounded bg-muted/30">
                      <span className="text-sm font-mono">{file}</span>
                      <button className="text-xs font-mono text-muted-foreground hover:text-accent transition-colors">×</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Community Notes */}
          <div className="mb-6 p-4 border border-border/50 rounded bg-muted/30">
            <h5 className="text-sm font-mono font-semibold mb-2">Community Notes:</h5>
            <p className="text-xs text-muted-foreground font-mono">
              "Mixes sound clean, vocals perfect" - @musicfan23
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm font-mono bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity">
              Submit Proof
            </button>
            <button className="px-4 py-2 text-sm font-mono border border-border rounded-lg hover:border-muted-foreground transition-colors">
              View Community Vote
            </button>
          </div>
        </div>

        {/* Locked Funds Notice */}
        <div className="mt-6 p-4 border border-border/50 rounded bg-muted/30 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-mono font-semibold mb-1">$15,000 Locked (30% of funding)</p>
            <p className="text-xs text-muted-foreground font-mono">
              This milestone funding is locked until community votes on completion proof. Release only after successful vote.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
