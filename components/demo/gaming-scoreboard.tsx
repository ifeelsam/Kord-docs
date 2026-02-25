import { Trophy, Zap, Target, Flame } from "lucide-react"

const players = [
  { rank: 1, name: "PHANTOM", score: 98420, streak: 12, icon: Flame },
  { rank: 2, name: "CIPHER", score: 87310, streak: 8, icon: Zap },
  { rank: 3, name: "NEXUS", score: 76890, streak: 6, icon: Target },
  { rank: 4, name: "GLITCH", score: 65230, streak: 4, icon: Zap },
  { rank: 5, name: "VOID", score: 54100, streak: 3, icon: Target },
]

export function GamingScoreboard() {
  return (
    <section className="px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-[family-name:var(--font-geist-pixel-square)] text-2xl md:text-3xl mb-2">
          Leaderboard
        </h2>
        <p className="text-muted-foreground mb-8 text-sm">
          Pixel Triangle brings angular energy to gaming and competitive interfaces.
        </p>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="grid grid-cols-[48px_1fr_auto_auto] md:grid-cols-[64px_1fr_auto_auto] gap-4 px-5 py-3 border-b border-border text-xs font-mono uppercase tracking-wider text-muted-foreground">
            <span>#</span>
            <span>Player</span>
            <span className="text-right">Streak</span>
            <span className="text-right min-w-[80px]">Score</span>
          </div>

          {players.map((p) => (
            <div
              key={p.name}
              className={`grid grid-cols-[48px_1fr_auto_auto] md:grid-cols-[64px_1fr_auto_auto] gap-4 px-5 py-4 items-center border-b border-border last:border-b-0 ${
                p.rank === 1 ? "bg-accent/5" : ""
              }`}
            >
              <span className="font-[family-name:var(--font-geist-pixel-triangle)] text-xl md:text-2xl">
                {p.rank === 1 ? (
                  <Trophy className="w-5 h-5 text-accent" />
                ) : (
                  <span className="text-muted-foreground">{String(p.rank).padStart(2, "0")}</span>
                )}
              </span>
              <div className="flex items-center gap-3">
                <p.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="font-[family-name:var(--font-geist-pixel-triangle)] text-lg md:text-xl tracking-wider">
                  {p.name}
                </span>
              </div>
              <span className="font-[family-name:var(--font-geist-pixel-line)] text-sm text-accent text-right">
                {p.streak}x
              </span>
              <span className="font-[family-name:var(--font-geist-pixel-triangle)] text-lg md:text-xl text-right tabular-nums min-w-[80px]">
                {p.score.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
