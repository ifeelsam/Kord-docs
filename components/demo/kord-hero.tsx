"use client"

export function KordHero() {
  return (
    <section className="flex flex-col items-center gap-8 py-20 px-4 text-center">
      <div className="flex items-center gap-2 text-muted-foreground text-sm font-mono uppercase tracking-widest">
        <span className="inline-block w-6 h-px bg-muted-foreground" />
        Kord
        <span className="inline-block w-6 h-px bg-muted-foreground" />
      </div>

      <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight text-balance transition-all duration-300 font-[family-name:var(--font-geist-pixel-square)]">
        Fund the Music
        <br />
        <span className="text-accent">You Love</span>
      </h1>

      <h2 className="text-2xl md:text-3xl text-muted-foreground font-mono">
        Own the Albums You Support
      </h2>

      <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed">
        Artist Jane Doe needs $47K to finish &apos;Echoes&apos;. Invest now → Get AUDIO royalties + early access.
      </p>

      <div className="mt-4 flex items-center justify-center gap-4 text-sm font-mono text-accent">
        <span>LIVE: 23 Projects Raising $1.2M</span>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <button className="px-6 py-3 text-sm font-mono bg-primary text-primary-foreground rounded-lg border border-primary hover:opacity-90 transition-opacity">
          Connect Wallet
        </button>
        <button className="px-6 py-3 text-sm font-mono bg-secondary text-secondary-foreground rounded-lg border border-border hover:border-muted-foreground transition-all">
          Explore Projects
        </button>
      </div>
    </section>
  )
}
