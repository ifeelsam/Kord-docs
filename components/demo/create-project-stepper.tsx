'use client'

interface CreateProjectStepperProps {
  steps: string[]
  currentStep: number
  autoSaveStatus: 'saved' | 'unsaved'
}

export function CreateProjectStepper({ steps, currentStep, autoSaveStatus }: CreateProjectStepperProps) {
  const progressPercent = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="sticky top-0 z-40 w-full bg-background/95 border-b border-border backdrop-blur">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-mono font-bold uppercase tracking-widest">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
          </h3>
          <span className={`text-xs font-mono ${autoSaveStatus === 'saved' ? 'text-accent' : 'text-muted-foreground'}`}>
            {autoSaveStatus === 'saved' ? '✓ Auto-saved' : '⚠ Unsaved changes'}
          </span>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-between gap-2">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono border ${
                  index <= currentStep
                    ? 'bg-accent text-background border-accent'
                    : 'bg-background text-muted-foreground border-border'
                }`}
              >
                {index < currentStep ? '✓' : index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-px mx-2 ${index < currentStep ? 'bg-accent' : 'bg-border'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-border rounded-full mt-4 overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="text-xs font-mono text-muted-foreground mt-2 text-right">
          {Math.round(progressPercent)}% Complete
        </p>
      </div>
    </div>
  )
}
