"use client"

const artists = [
  {
    id: 1,
    name: "DJ Helix",
    handle: "@djhelix",
    followers: "127K",
    quote: "Finally patient capital without label bullshit",
  },
  {
    id: 2,
    name: "Sarah Key",
    handle: "@sarahkey",
    followers: "89K",
    quote: "Fans invested $28K. Album hits stores next month",
  },
  {
    id: 3,
    name: "Luna Beats",
    handle: "@lunabeats",
    followers: "156K",
    quote: "Direct connection with my supporters. Life changing.",
  },
]

export function KordFeaturedArtists() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-geist-pixel-square)] font-bold mb-2 tracking-tight">
            Trusted by Music&apos;s Best
          </h2>
          <p className="text-muted-foreground font-mono text-sm">
            Artists & fans already building the future of music
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="bg-card border border-border rounded-lg p-6 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-secondary rounded-full mb-4 flex items-center justify-center text-muted-foreground text-xs font-mono">
                🎤
              </div>

              <p className="text-muted-foreground italic mb-4 text-sm">
                &quot;{artist.quote}&quot;
              </p>

              <h3 className="font-mono font-bold text-sm mb-1">
                {artist.name}
              </h3>

              <p className="text-muted-foreground text-xs font-mono mb-1">
                {artist.handle}
              </p>

              <p className="text-accent text-xs font-mono font-bold">
                {artist.followers} followers
              </p>
            </div>
          ))}
        </div>

        <div className="bg-secondary border border-border rounded-lg p-6 text-center">
          <p className="text-xs font-mono text-muted-foreground mb-3">
            Built on Solana + Audius
          </p>
          <div className="flex justify-center gap-4 text-muted-foreground text-xs font-mono">
            <span>[Audius Logo]</span>
            <span>[Solana Logo]</span>
            <span>[Phantom Logo]</span>
          </div>
        </div>
      </div>
    </section>
  )
}
