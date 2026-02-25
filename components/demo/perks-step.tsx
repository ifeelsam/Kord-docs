'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

interface PerksStepProps {
  formData: any
  onChange: (data: any) => void
  onNext: () => void
  onPrevious: () => void
}

const DEFAULT_PERKS = [
  '1% AUDIO Royalties',
  'Early Track Drop',
  'Name in Credits',
  'Concert Discount Code',
]

const CUSTOM_PERK_OPTIONS = [
  'Exclusive merch',
  'VIP meet & greet',
  'Discord access',
  'Behind-the-scenes content',
]

export function PerksStep({ formData, onChange, onNext, onPrevious }: PerksStepProps) {
  const [customPerkInput, setCustomPerkInput] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const selectedPerks = formData.perks || []
  const hasMinimumPerks = selectedPerks.length >= 4

  const togglePerk = (perk: string) => {
    const updated = selectedPerks.includes(perk)
      ? selectedPerks.filter((p: string) => p !== perk)
      : [...selectedPerks, perk]
    onChange({ ...formData, perks: updated })
  }

  const addCustomPerk = () => {
    if (customPerkInput.trim()) {
      const updated = [...selectedPerks, customPerkInput.trim()]
      onChange({ ...formData, perks: updated })
      setCustomPerkInput('')
    }
  }

  const removePerk = (perk: string) => {
    const updated = selectedPerks.filter((p: string) => p !== perk)
    onChange({ ...formData, perks: updated })
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (selectedPerks.length < 4) {
      newErrors.perks = 'Minimum 4 perks required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return (
    <div className="space-y-8 py-8">
      <Card className="p-6 border border-border">
        <div className="space-y-8">
          {/* Minimum Required Perks */}
          <div>
            <h3 className="text-sm font-mono font-bold mb-4 uppercase tracking-widest">
              Minimum Perks Required
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DEFAULT_PERKS.map((perk) => (
                <button
                  key={perk}
                  onClick={() => togglePerk(perk)}
                  className={`p-4 rounded-lg border-2 transition-all text-sm font-mono text-left ${
                    selectedPerks.includes(perk)
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                >
                  <span className="mr-2">{selectedPerks.includes(perk) ? '✓' : '○'}</span>
                  {perk}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Perks */}
          <div>
            <h3 className="text-sm font-mono font-bold mb-4 uppercase tracking-widest">
              Add Custom Perks
            </h3>
            <div className="space-y-3">
              {/* Quick add buttons */}
              <div className="flex flex-wrap gap-2">
                {CUSTOM_PERK_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      if (!selectedPerks.includes(option)) {
                        onChange({ ...formData, perks: [...selectedPerks, option] })
                      }
                    }}
                    disabled={selectedPerks.includes(option)}
                    className="px-3 py-2 rounded-lg border border-border hover:border-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed text-xs font-mono transition-colors"
                  >
                    + {option}
                  </button>
                ))}
              </div>

              {/* Custom perk input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Enter custom perk..."
                  value={customPerkInput}
                  onChange={(e) => setCustomPerkInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCustomPerk()}
                  className="font-mono"
                />
                <Button
                  variant="outline"
                  onClick={addCustomPerk}
                  className="font-mono"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>

          {/* Selected Perks Summary */}
          <div className="bg-secondary/30 rounded-lg border border-border p-4 space-y-3">
            <h4 className="text-sm font-mono font-bold">Your Perks ({selectedPerks.length}):</h4>
            <div className="space-y-2">
              {selectedPerks.map((perk: string) => (
                <div
                  key={perk}
                  className="flex items-center justify-between p-3 bg-background rounded border border-border"
                >
                  <span className="text-sm font-mono">{perk}</span>
                  <button
                    onClick={() => removePerk(perk)}
                    className="text-muted-foreground hover:text-destructive transition-colors text-xs font-mono"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            {!hasMinimumPerks && (
              <p className="text-xs text-destructive font-mono">
                {errors.perks || `Add ${4 - selectedPerks.length} more perk(s) to continue`}
              </p>
            )}
          </div>

          {/* Perks Preview */}
          <div className="bg-accent/10 border border-accent rounded-lg p-4">
            <p className="text-sm font-mono text-accent">
              <span className="font-bold">Preview:</span> Investors get: {selectedPerks.slice(0, 3).join(' + ')}
              {selectedPerks.length > 3 ? ` + ${selectedPerks.length - 3} more` : ''}
            </p>
          </div>
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between gap-4">
        <Button variant="outline" onClick={onPrevious} className="font-mono">
          ← Previous
        </Button>
        <Button
          onClick={() => validate() && onNext()}
          disabled={!hasMinimumPerks}
          className="font-mono"
        >
          Continue →
        </Button>
      </div>
    </div>
  )
}
