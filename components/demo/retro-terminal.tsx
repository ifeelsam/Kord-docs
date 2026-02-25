"use client"

import { useEffect, useState } from "react"

const lines = [
  { prompt: true, text: "npx create-next-app@latest my-pixel-app" },
  { prompt: false, text: "Creating a new Next.js app in ./my-pixel-app" },
  { prompt: false, text: "" },
  { prompt: false, text: "Installing dependencies:" },
  { prompt: false, text: "  - react" },
  { prompt: false, text: "  - react-dom" },
  { prompt: false, text: "  - next" },
  { prompt: false, text: "  - geist" },
  { prompt: false, text: "" },
  { prompt: false, text: "Initialized a git repository." },
  { prompt: false, text: "" },
  { prompt: false, text: "Success! Created my-pixel-app" },
  { prompt: true, text: "cd my-pixel-app && pnpm dev" },
  { prompt: false, text: "  > Ready on http://localhost:3000" },
]

export function RetroTerminal() {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    if (visibleLines < lines.length) {
      const timeout = setTimeout(
        () => setVisibleLines((v) => v + 1),
        lines[visibleLines]?.text === "" ? 100 : 120
      )
      return () => clearTimeout(timeout)
    }
  }, [visibleLines])

  return (
    <section className="px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-[family-name:var(--font-geist-pixel-square)] text-2xl md:text-3xl mb-2">
          Terminal & Code
        </h2>
        <p className="text-muted-foreground mb-8 text-sm">
          Pixel Line variant for terminal output and code contexts — clean and readable at small sizes.
        </p>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-chart-3/60" />
            <div className="w-3 h-3 rounded-full bg-accent/60" />
            <span className="text-xs text-muted-foreground font-mono ml-2">
              terminal
            </span>
          </div>
          <div className="p-5 font-[family-name:var(--font-geist-pixel-line)] text-sm leading-relaxed min-h-[320px]">
            {lines.slice(0, visibleLines).map((line, i) => (
              <div key={i} className="flex gap-2">
                {line.prompt && (
                  <span className="text-accent shrink-0">{"~$"}</span>
                )}
                <span className={line.prompt ? "text-foreground" : "text-muted-foreground"}>
                  {line.text}
                </span>
              </div>
            ))}
            {visibleLines < lines.length && (
              <span className="inline-block w-2 h-4 bg-accent animate-pulse" />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
