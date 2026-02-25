"use client"

import { useEffect, useState } from "react"

function getTimeLeft() {
  const target = new Date()
  target.setDate(target.getDate() + 3)
  target.setHours(0, 0, 0, 0)
  const diff = target.getTime() - Date.now()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return { hours, minutes, seconds }
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="bg-secondary border border-border rounded-lg px-4 py-3 md:px-6 md:py-4 min-w-[72px] md:min-w-[96px] text-center">
        <span className="font-[family-name:var(--font-geist-pixel-square)] text-4xl md:text-6xl tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  )
}

export function CountdownBanner() {
  const [time, setTime] = useState<{ hours: number; minutes: number; seconds: number } | null>(null)

  useEffect(() => {
    setTime(getTimeLeft())
    const interval = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-xl border border-border bg-card p-8 md:p-12 flex flex-col items-center gap-6 text-center">
          <span className="font-[family-name:var(--font-geist-pixel-triangle)] text-xs md:text-sm uppercase tracking-[0.3em] text-accent">
            Launching Soon
          </span>
          <h2 className="font-[family-name:var(--font-geist-pixel-square)] text-2xl md:text-4xl text-balance">
            Something new is arriving
          </h2>
          <div className="flex items-center gap-3 md:gap-6 mt-2">
            <Digit value={time?.hours ?? 0} label="Hours" />
            <span className="font-[family-name:var(--font-geist-pixel-square)] text-3xl md:text-5xl text-muted-foreground mt-[-24px]">
              :
            </span>
            <Digit value={time?.minutes ?? 0} label="Min" />
            <span className="font-[family-name:var(--font-geist-pixel-square)] text-3xl md:text-5xl text-muted-foreground mt-[-24px]">
              :
            </span>
            <Digit value={time?.seconds ?? 0} label="Sec" />
          </div>
          <p className="text-muted-foreground text-sm max-w-md leading-relaxed mt-2">
            Pixel Square is the classic choice for countdown timers and event banners, with its strong readability at large sizes.
          </p>
        </div>
      </div>
    </section>
  )
}
