'use client'

import { useState, useEffect } from 'react'
import { CreateProjectHero } from '@/components/demo/create-project-hero'
import { CreateProjectStepper } from '@/components/demo/create-project-stepper'
import { ProjectDetailsStep } from '@/components/demo/project-details-step'
import { BudgetTimelineStep } from '@/components/demo/budget-timeline-step'
import { PerksStep } from '@/components/demo/perks-step'
import { ReviewLaunchStep } from '@/components/demo/review-launch-step'
import { SuccessModal } from '@/components/demo/success-modal'
import { KordFooter } from '@/components/demo/kord-footer'

const STEPS = ['Project Details', 'Budget & Timeline', 'Perks', 'Review & Launch']

export default function CreatePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    projectTitle: '',
    artistHandle: '',
    genre: '',
    description: '',
    albumArt: null,
    videoDemo: null,
    fundingGoal: 50000,
    budgetBreakdown: {
      production: 20000,
      mixing: 12000,
      artwork: 8000,
      marketing: 7000,
      distribution: 3000,
    },
    campaignEnd: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    deliveryDate: new Date(Date.now() + 80 * 24 * 60 * 60 * 1000),
    perks: ['1% AUDIO Royalties', 'Early Track Drop', 'Name in Credits', 'Concert Discount Code'],
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [unsavedChanges, setUnsavedChanges] = useState(false)

  // Auto-save draft to localStorage
  useEffect(() => {
    if (unsavedChanges) {
      const timer = setTimeout(() => {
        localStorage.setItem('kord-project-draft', JSON.stringify(formData))
        setUnsavedChanges(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [formData, unsavedChanges])

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('kord-project-draft')
    if (savedDraft) {
      try {
        setFormData(JSON.parse(savedDraft))
      } catch (e) {
        console.error('Failed to load draft', e)
      }
    }
  }, [])

  const handleFormDataChange = (newData: any) => {
    setFormData(newData)
    setUnsavedChanges(true)
  }

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleLaunch = () => {
    setShowSuccess(true)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ProjectDetailsStep
            formData={formData}
            onChange={handleFormDataChange}
            onNext={handleNext}
          />
        )
      case 1:
        return (
          <BudgetTimelineStep
            formData={formData}
            onChange={handleFormDataChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )
      case 2:
        return (
          <PerksStep
            formData={formData}
            onChange={handleFormDataChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )
      case 3:
        return (
          <ReviewLaunchStep
            formData={formData}
            onLaunch={handleLaunch}
            onPrevious={handlePrevious}
          />
        )
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <CreateProjectHero />

      <CreateProjectStepper
        steps={STEPS}
        currentStep={currentStep}
        autoSaveStatus={unsavedChanges ? 'unsaved' : 'saved'}
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {renderStep()}
      </div>

      <KordFooter />

      {showSuccess && <SuccessModal projectTitle={formData.projectTitle} onClose={() => setShowSuccess(false)} />}
    </main>
  )
}
