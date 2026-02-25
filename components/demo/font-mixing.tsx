export function FontMixing() {
  return (
    <section className="px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-[family-name:var(--font-geist-pixel-square)] text-2xl md:text-3xl mb-2">
          Mixing with Geist Sans & Mono
        </h2>
        <p className="text-muted-foreground mb-8 text-sm">
          Geist Pixel shares the same metrics and alignment as the rest of the Geist family, making it easy to mix.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1: Feature Announcement */}
          <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
            <span className="font-[family-name:var(--font-geist-pixel-circle)] text-xs uppercase tracking-[0.25em] text-accent">
              New Feature
            </span>
            <h3 className="font-[family-name:var(--font-geist-pixel-square)] text-2xl md:text-3xl">
              Edge Runtime v3
            </h3>
            <p className="font-sans text-muted-foreground text-sm leading-relaxed">
              Deploy serverless functions to 30+ edge locations with sub-millisecond cold starts. 
              Built for the speed your users deserve.
            </p>
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
              <span className="font-mono text-xs text-muted-foreground">v3.0.0</span>
              <span className="text-border">|</span>
              <span className="font-[family-name:var(--font-geist-pixel-line)] text-xs text-accent">
                STABLE
              </span>
            </div>
          </div>

          {/* Card 2: Pricing-like */}
          <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
            <span className="font-[family-name:var(--font-geist-pixel-circle)] text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Pro Plan
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-[family-name:var(--font-geist-pixel-square)] text-5xl">
                $20
              </span>
              <span className="font-sans text-muted-foreground text-sm">/month</span>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground font-sans">
              <li className="flex items-center gap-2">
                <span className="font-[family-name:var(--font-geist-pixel-grid)] text-accent text-xs">+</span>
                Unlimited deployments
              </li>
              <li className="flex items-center gap-2">
                <span className="font-[family-name:var(--font-geist-pixel-grid)] text-accent text-xs">+</span>
                Custom domains
              </li>
              <li className="flex items-center gap-2">
                <span className="font-[family-name:var(--font-geist-pixel-grid)] text-accent text-xs">+</span>
                Advanced analytics
              </li>
              <li className="flex items-center gap-2">
                <span className="font-[family-name:var(--font-geist-pixel-grid)] text-accent text-xs">+</span>
                Priority support
              </li>
            </ul>
            <button className="mt-auto bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
              Get started
            </button>
          </div>

          {/* Card 3: Notification / Banner */}
          <div className="md:col-span-2 rounded-xl border border-accent/30 bg-accent/5 p-6 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-[family-name:var(--font-geist-pixel-triangle)] text-lg md:text-xl mb-1">
                Infrastructure Update
              </h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                All regions have been upgraded to the latest runtime. Performance improvements
                of up to 40% observed. No action required on your end.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="font-[family-name:var(--font-geist-pixel-grid)] text-xs text-accent px-3 py-1.5 border border-accent/30 rounded-md">
                RESOLVED
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                2 min ago
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
