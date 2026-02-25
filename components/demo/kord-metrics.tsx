"use client"

const metrics = [
  { label: "Independent Music TAM", value: "$14.3M+", color: "text-accent" },
  { label: "Projects Funded", value: "2,847", color: "text-accent" },
  { label: "Success Rate", value: "98%", color: "text-accent" },
  { label: "Live Campaigns", value: "1,247", color: "text-accent" },
]

const stats = [
  { label: "Total Value Locked", value: "$2.8M" },
  { label: "Average ROI", value: "3.2x" },
  { label: "Active Investors", value: "47K" },
]

export function KordMetrics() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-card border border-border rounded-lg p-6 text-center"
            >
              <p className={`text-3xl md:text-4xl font-[family-name:var(--font-geist-pixel-square)] font-bold mb-2 ${metric.color}`}>
                {metric.value}
              </p>
              <p className="text-xs font-mono text-muted-foreground">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-secondary border border-border rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-[family-name:var(--font-geist-pixel-square)] font-bold text-accent mb-2">
                  {stat.value}
                </p>
                <p className="text-sm font-mono text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
