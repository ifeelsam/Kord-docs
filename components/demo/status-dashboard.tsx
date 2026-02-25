"use client"

import { useEffect, useState } from "react"
import { Activity, Cpu, HardDrive, Wifi } from "lucide-react"

function AnimatedValue({ base, range }: { base: number; range: number }) {
  const [value, setValue] = useState(base)

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(base + Math.floor(Math.random() * range))
    }, 1500)
    return () => clearInterval(interval)
  }, [base, range])

  return <>{value}</>
}

const metrics = [
  { label: "CPU", icon: Cpu, base: 42, range: 20, unit: "%" },
  { label: "MEM", icon: HardDrive, base: 6, range: 3, unit: "GB" },
  { label: "NET", icon: Wifi, base: 120, range: 80, unit: "ms" },
  { label: "REQ/s", icon: Activity, base: 1240, range: 400, unit: "" },
]

export function StatusDashboard() {
  return (
    <section className="px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-[family-name:var(--font-geist-pixel-square)] text-2xl md:text-3xl mb-2">
          System Monitoring
        </h2>
        <p className="text-muted-foreground mb-8 text-sm">
          Pixel Grid variant excels in data-dense dashboards where legibility at small sizes matters.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="p-5 rounded-lg bg-card border border-border flex flex-col gap-3"
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <m.icon className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-wider">
                  {m.label}
                </span>
              </div>
              <p className="font-[family-name:var(--font-geist-pixel-grid)] text-3xl md:text-4xl">
                <AnimatedValue base={m.base} range={m.range} />
                <span className="text-lg text-muted-foreground ml-1">{m.unit}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-5 rounded-lg bg-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              System Log
            </span>
            <span className="font-[family-name:var(--font-geist-pixel-line)] text-xs text-accent">
              LIVE
            </span>
          </div>
          <div className="font-[family-name:var(--font-geist-pixel-grid)] text-sm space-y-2 text-muted-foreground">
            <p>
              <span className="text-accent">{"[00:14:32]"}</span> Deploy production
              <span className="text-foreground ml-2">OK</span>
            </p>
            <p>
              <span className="text-accent">{"[00:14:28]"}</span> Build completed in 4.2s
            </p>
            <p>
              <span className="text-accent">{"[00:14:24]"}</span> Running edge functions
              <span className="text-foreground ml-2">3 regions</span>
            </p>
            <p>
              <span className="text-accent">{"[00:14:20]"}</span> Cache invalidated
              <span className="text-foreground ml-2">tag: blog-posts</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
