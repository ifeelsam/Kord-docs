"use client"

import { useState } from "react"

const sizes = [
  { label: "12px", className: "text-xs" },
  { label: "14px", className: "text-sm" },
  { label: "16px", className: "text-base" },
  { label: "20px", className: "text-xl" },
  { label: "24px", className: "text-2xl" },
  { label: "32px", className: "text-3xl" },
  { label: "48px", className: "text-5xl" },
  { label: "64px", className: "text-6xl" },
]

const variantOptions = [
  { name: "Line", className: "font-[family-name:var(--font-geist-pixel-line)]" },
  { name: "Triangle", className: "font-[family-name:var(--font-geist-pixel-triangle)]" },
  { name: "Circle", className: "font-[family-name:var(--font-geist-pixel-circle)]" },
  { name: "Grid", className: "font-[family-name:var(--font-geist-pixel-grid)]" },
  { name: "Square", className: "font-[family-name:var(--font-geist-pixel-square)]" },
]

export function SizeScale() {
  const [selectedVariant, setSelectedVariant] = useState(4)

  return (
    <section className="px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-[family-name:var(--font-geist-pixel-square)] text-2xl md:text-3xl mb-2">
          Type Scale
        </h2>
        <p className="text-muted-foreground mb-6 text-sm">
          Geist Pixel maintains clarity from small labels to large display text.
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {variantOptions.map((v, i) => (
            <button
              key={v.name}
              onClick={() => setSelectedVariant(i)}
              className={`px-3 py-1.5 text-xs rounded-md border transition-all ${
                i === selectedVariant
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary text-secondary-foreground border-border hover:border-muted-foreground"
              }`}
            >
              {v.name}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card p-6 space-y-6">
          {sizes.map((s) => (
            <div key={s.label} className="flex items-baseline gap-4">
              <span className="text-xs font-mono text-muted-foreground w-10 shrink-0 text-right tabular-nums">
                {s.label}
              </span>
              <span className={`${variantOptions[selectedVariant].className} ${s.className} transition-all`}>
                The quick brown fox
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
