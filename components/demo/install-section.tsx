"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <pre className="bg-secondary rounded-lg p-4 text-sm font-mono overflow-x-auto">
        <code className="text-foreground">{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-1.5 rounded-md bg-card border border-border opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-accent" />
        ) : (
          <Copy className="w-3.5 h-3.5 text-muted-foreground" />
        )}
      </button>
    </div>
  )
}

export function InstallSection() {
  return (
    <section className="px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-[family-name:var(--font-geist-pixel-square)] text-2xl md:text-3xl mb-2">
          Get Started
        </h2>
        <p className="text-muted-foreground mb-8 text-sm">
          Install the geist package and import your preferred variant.
        </p>

        <div className="space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 block">
              Install
            </span>
            <CodeBlock code="npm i geist" />
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 block">
              Layout Setup
            </span>
            <CodeBlock
              code={`import { GeistPixelSquare } from "geist/font/pixel-square";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={GeistPixelSquare.variable}>
      <body>{children}</body>
    </html>
  );
}`}
            />
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 block">
              Usage in Components
            </span>
            <CodeBlock
              code={`// Use the CSS variable directly in your classes
<h1 className="font-[family-name:var(--font-geist-pixel-square)]">
  Hello, Pixel World
</h1>

// Available variants:
// --font-geist-pixel-line
// --font-geist-pixel-triangle
// --font-geist-pixel-circle
// --font-geist-pixel-grid
// --font-geist-pixel-square`}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
