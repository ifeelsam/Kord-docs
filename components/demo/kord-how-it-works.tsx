"use client"

const steps = [
  {
    num: "01",
    title: "Artists Propose",
    description: "Need $50K for album",
    detail: "Upload budget + timeline",
    highlight: "5 minute setup",
  },
  {
    num: "02",
    title: "Fans Invest",
    description: "Buy tokens instantly",
    detail: "Get tokens + perks",
    highlight: "$100 → 1,000 tokens",
  },
  {
    num: "03",
    title: "Royalties Flow",
    description: "AUDIO tokens → LP value",
    detail: "Token price grows automatically",
    highlight: "Real revenue sharing",
  },
]

export function KordHowItWorks() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-geist-pixel-square)] font-bold mb-2 tracking-tight">
            How It Works
          </h2>
          <p className="text-muted-foreground font-mono text-sm">
            Artists Get Funded. Fans Love It.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="flex flex-col">
              <div className="text-5xl font-[family-name:var(--font-geist-pixel-square)] font-bold text-accent mb-4">
                {step.num}
              </div>

              <h3 className="text-xl font-[family-name:var(--font-geist-pixel-square)] font-bold mb-2">
                {step.title}
              </h3>

              <p className="text-muted-foreground text-sm mb-4">
                {step.description}
              </p>

              <div className="bg-secondary border border-border rounded-lg p-4 mb-4 flex-grow">
                <p className="text-xs font-mono text-muted-foreground mb-3">
                  {step.detail}
                </p>
              </div>

              <p className="text-accent font-mono text-sm font-bold">
                {step.highlight}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
