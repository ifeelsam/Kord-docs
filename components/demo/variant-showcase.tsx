const variants = [
  {
    name: "Line",
    className: "font-[family-name:var(--font-geist-pixel-line)]",
    description: "Thin, delicate strokes. Ideal for subtle labels and lightweight UI text.",
  },
  {
    name: "Triangle",
    className: "font-[family-name:var(--font-geist-pixel-triangle)]",
    description: "Angular pixel fills. Best for bold headings and attention-grabbing displays.",
  },
  {
    name: "Circle",
    className: "font-[family-name:var(--font-geist-pixel-circle)]",
    description: "Soft, rounded pixel shapes. Great for friendly, approachable interfaces.",
  },
  {
    name: "Grid",
    className: "font-[family-name:var(--font-geist-pixel-grid)]",
    description: "Structured, even density. Perfect for data-heavy dashboards and tables.",
  },
  {
    name: "Square",
    className: "font-[family-name:var(--font-geist-pixel-square)]",
    description: "Classic pixel form. The most traditional variant for retro-modern aesthetics.",
  },
]

export function VariantShowcase() {
  return (
    <section className="px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-[family-name:var(--font-geist-pixel-square)] text-2xl md:text-3xl mb-2">
          Five Variants
        </h2>
        <p className="text-muted-foreground mb-10 text-sm">
          Each variant constructed on a consistent pixel grid, tuned for different densities and moods.
        </p>
        <div className="grid gap-6">
          {variants.map((v) => (
            <div
              key={v.name}
              className="flex flex-col md:flex-row md:items-center gap-4 p-6 rounded-lg bg-card border border-border"
            >
              <div className="md:w-48 shrink-0">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-mono">
                  Pixel {v.name}
                </span>
              </div>
              <div className="flex-1">
                <p className={`${v.className} text-3xl md:text-4xl lg:text-5xl`}>
                  Aa Bb Cc 0123
                </p>
              </div>
              <p className="text-muted-foreground text-sm md:w-64 shrink-0 leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
