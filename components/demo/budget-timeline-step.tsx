'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

interface BudgetTimelineStepProps {
  formData: any
  onChange: (data: any) => void
  onNext: () => void
  onPrevious: () => void
}

export function BudgetTimelineStep({ formData, onChange, onNext, onPrevious }: BudgetTimelineStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const total = Object.values(formData.budgetBreakdown).reduce((sum: number, val: any) => sum + Number(val), 0)
  const budgetItems = [
    { key: 'production', label: 'Studio/Production' },
    { key: 'mixing', label: 'Mixing/Mastering' },
    { key: 'artwork', label: 'Artwork/Video' },
    { key: 'marketing', label: 'Marketing/Promo' },
    { key: 'distribution', label: 'Distribution' },
  ]

  const handleBudgetChange = (key: string, value: number) => {
    onChange({
      ...formData,
      budgetBreakdown: {
        ...formData.budgetBreakdown,
        [key]: value,
      },
    })
  }

  const handleFundingGoalChange = (value: number) => {
    onChange({ ...formData, fundingGoal: value })
  }

  const handleDateChange = (field: string, value: string) => {
    onChange({
      ...formData,
      [field]: new Date(value),
    })
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.fundingGoal || formData.fundingGoal < 1000) newErrors.fundingGoal = 'Min $1,000'
    if (formData.fundingGoal > 1000000) newErrors.fundingGoal = 'Max $1,000,000'
    if (total !== formData.fundingGoal) newErrors.budget = 'Budget must equal funding goal'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const formatCurrency = (num: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num)

  return (
    <div className="space-y-8 py-8">
      <Card className="p-6 border border-border">
        <div className="space-y-6">
          {/* Funding Goal */}
          <div>
            <label className="block text-sm font-mono font-bold mb-2">
              Funding Goal <span className="text-accent">*</span>
            </label>
            <div className="flex gap-2">
              <span className="flex items-center px-3 py-2 bg-secondary/30 rounded-md border border-border text-muted-foreground font-mono">
                $
              </span>
              <Input
                type="number"
                min="1000"
                max="1000000"
                value={formData.fundingGoal}
                onChange={(e) => handleFundingGoalChange(Number(e.target.value))}
                className="font-mono"
                aria-invalid={!!errors.fundingGoal}
              />
              <span className="flex items-center px-3 py-2 bg-secondary/30 rounded-md border border-border text-muted-foreground font-mono">
                USD
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1 font-mono">Average album: $25K-75K</p>
            {errors.fundingGoal && <p className="text-xs text-destructive mt-1">{errors.fundingGoal}</p>}
          </div>

          {/* Budget Breakdown */}
          <div>
            <label className="block text-sm font-mono font-bold mb-4">
              Budget Breakdown <span className="text-accent">*</span>
            </label>
            <div className="space-y-4">
              {budgetItems.map(({ key, label }) => {
                const amount = formData.budgetBreakdown[key as keyof typeof formData.budgetBreakdown] || 0
                const percentage = formData.fundingGoal > 0 ? (amount / formData.fundingGoal) * 100 : 0

                return (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <label className="text-sm font-mono">{label}</label>
                      <span className="text-xs font-mono text-muted-foreground">{Math.round(percentage)}%</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="flex items-center px-2 py-2 bg-secondary/30 rounded-md border border-border text-muted-foreground text-sm font-mono">
                        $
                      </span>
                      <Input
                        type="number"
                        min="0"
                        value={amount}
                        onChange={(e) => handleBudgetChange(key, Number(e.target.value))}
                        className="font-mono"
                      />
                    </div>
                    {/* Mini progress bar */}
                    <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all"
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Total */}
            <div className="mt-6 p-4 bg-secondary/30 rounded-lg border border-border flex justify-between items-center font-mono">
              <span className="font-bold">Total:</span>
              <span className={`text-sm font-bold ${total === formData.fundingGoal ? 'text-accent' : 'text-destructive'}`}>
                {formatCurrency(total)} {total === formData.fundingGoal ? '✓' : '✗'}
              </span>
            </div>
            {errors.budget && <p className="text-xs text-destructive mt-2">{errors.budget}</p>}
          </div>

          {/* Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-mono font-bold mb-2">
                Campaign Ends <span className="text-accent">*</span>
              </label>
              <Input
                type="date"
                value={formData.campaignEnd ? new Date(formData.campaignEnd).toISOString().split('T')[0] : ''}
                onChange={(e) => handleDateChange('campaignEnd', e.target.value)}
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground mt-1 font-mono">60 days from now</p>
            </div>

            <div>
              <label className="block text-sm font-mono font-bold mb-2">
                Estimated Delivery <span className="text-accent">*</span>
              </label>
              <Input
                type="date"
                value={formData.deliveryDate ? new Date(formData.deliveryDate).toISOString().split('T')[0] : ''}
                onChange={(e) => handleDateChange('deliveryDate', e.target.value)}
                className="font-mono"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between gap-4">
        <Button variant="outline" onClick={onPrevious} className="font-mono">
          ← Previous
        </Button>
        <Button onClick={() => validate() && onNext()} className="font-mono">
          Continue →
        </Button>
      </div>
    </div>
  )
}
