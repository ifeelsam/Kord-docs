"use client"

export function KordFinalCTA() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-geist-pixel-square)] font-bold mb-2 tracking-tight">
            Ready to Fund Music?
          </h2>
          <p className="text-muted-foreground font-mono text-sm">
            Or become a star and raise capital on your own terms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* For Investors */}
          <div className="bg-card border border-border rounded-lg p-8 flex flex-col">
            <h3 className="text-2xl font-[family-name:var(--font-geist-pixel-square)] font-bold mb-4">
              For Investors
            </h3>

            <div className="space-y-2 mb-6 flex-grow">
              <p className="text-sm font-mono text-muted-foreground">
                ✓ Invest in albums you love
              </p>
              <p className="text-sm font-mono text-muted-foreground">
                ✓ Get AUDIO royalties back
              </p>
              <p className="text-sm font-mono text-muted-foreground">
                ✓ Own a piece of the future
              </p>
              <p className="text-sm font-mono text-muted-foreground">
                ✓ Trade tokens anytime
              </p>
            </div>

            <button className="w-full px-6 py-3 bg-primary text-primary-foreground font-mono text-sm rounded-lg border border-primary hover:opacity-90 transition-opacity">
              Browse Projects →
            </button>
          </div>

          {/* For Artists */}
          <div className="bg-card border border-border rounded-lg p-8 flex flex-col">
            <h3 className="text-2xl font-[family-name:var(--font-geist-pixel-square)] font-bold mb-4">
              For Artists
            </h3>

            <div className="space-y-2 mb-6 flex-grow">
              <p className="text-sm font-mono text-muted-foreground">
                ✓ Raise patient capital now
              </p>
              <p className="text-sm font-mono text-muted-foreground">
                ✓ Keep 100% of your masters
              </p>
              <p className="text-sm font-mono text-muted-foreground">
                ✓ Connect with fans directly
              </p>
              <p className="text-sm font-mono text-muted-foreground">
                ✓ No label middleman
              </p>
            </div>

            <button className="w-full px-6 py-3 bg-secondary text-secondary-foreground font-mono text-sm rounded-lg border border-border hover:border-accent transition-colors">
              Create Project →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
