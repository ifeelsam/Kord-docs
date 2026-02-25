"use client"

import { useState } from "react"

const variants = [
  { name: "Line", className: "font-[family-name:var(--font-geist-pixel-line)]" },
  { name: "Triangle", className: "font-[family-name:var(--font-geist-pixel-triangle)]" },
  { name: "Circle", className: "font-[family-name:var(--font-geist-pixel-circle)]" },
  { name: "Grid", className: "font-[family-name:var(--font-geist-pixel-grid)]" },
  { name: "Square", className: "font-[family-name:var(--font-geist-pixel-square)]" },
]

export function HeroSection() {
  const [activeVariant, setActiveVariant] = useState(0)

  return (
    <section className="flex flex-col items-center gap-8 py-20 px-4 text-center">
      <div className="flex items-center gap-2 text-muted-foreground text-sm font-mono uppercase tracking-widest">
        <span className="inline-block w-6 h-px bg-muted-foreground" />
        Geist Pixel
        <span className="inline-block w-6 h-px bg-muted-foreground" />
      </div>

      <h1
        className={`${variants[activeVariant].className} text-5xl md:text-7xl lg:text-8xl tracking-tight text-balance transition-all duration-300`}
      >
        Bitmap meets
        <br />
        <span className="text-accent">modern design</span>
      </h1>

      <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed">
        Five distinct variants built on a strict pixel grid.
        Precise, intentional, and unapologetically digital.
      </p>

      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {variants.map((v, i) => (
          <button
            key={v.name}
            onClick={() => setActiveVariant(i)}
            className={`px-4 py-2 text-sm rounded-lg border transition-all ${
              i === activeVariant
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-secondary text-secondary-foreground border-border hover:border-muted-foreground"
            }`}
          >
            {v.name}
          </button>
        ))}
      </div>
    </section>
  )
}
