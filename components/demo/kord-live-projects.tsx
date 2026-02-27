"use client"

const projects = [
  {
    id: 1,
    title: "Echoes",
    artist: "Jane Doe",
    handle: "@sam",
    genre: "Electronic",
    raised: 47200,
    goal: 50000,
    price: 0.089,
    change: 12,
    perk: "Early drop + 1% AUDIO",
  },
  {
    id: 2,
    title: "Neon Dreams",
    artist: "Alex Rivers",
    handle: "@alexrivers",
    genre: "Synthwave",
    raised: 32500,
    goal: 40000,
    price: 0.065,
    change: 8,
    perk: "Vinyl + Meet & Greet",
  },
  {
    id: 3,
    title: "Cosmic Soul",
    artist: "Maria Sound",
    handle: "@mariasound",
    genre: "Ambient",
    raised: 28900,
    goal: 35000,
    price: 0.052,
    change: 5,
    perk: "Exclusive Remix Pack",
  },
  {
    id: 4,
    title: "Digital Hearts",
    artist: "DJ Helix",
    handle: "@djhelix",
    genre: "Electronic",
    raised: 41300,
    goal: 45000,
    price: 0.078,
    change: 15,
    perk: "Producer Credits + Token",
  },
  {
    id: 5,
    title: "Melancholy",
    artist: "Sarah Key",
    handle: "@sarahkey",
    genre: "Indie",
    raised: 28000,
    goal: 30000,
    price: 0.095,
    change: 22,
    perk: "Album + Concert Ticket",
  },
]

export function KordLiveProjects() {
  const percentage = (raised: number, goal: number) =>
    Math.round((raised / goal) * 100)

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-geist-pixel-square)] font-bold mb-2 tracking-tight">
            Live Projects
          </h2>
          <p className="text-muted-foreground font-mono text-sm">
            $1.47M Raised Today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-card border border-border rounded-lg p-4 hover:border-accent transition-colors"
            >
              <div className="mb-3 aspect-square bg-secondary rounded-md flex items-center justify-center text-muted-foreground text-xs font-mono">
                [Album Art]
              </div>

              <h3 className="font-mono font-bold text-sm mb-1 truncate">
                {project.title}
              </h3>

              <p className="text-xs text-muted-foreground mb-3 font-mono">
                by {project.artist}{" "}
                <span className="block text-muted-foreground/60">
                  {project.handle} · {project.genre}
                </span>
              </p>

              <div className="mb-3 space-y-1">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span>
                    ${(project.raised / 1000).toFixed(0)}K
                  </span>
                  <span className="text-accent font-bold">
                    {percentage(project.raised, project.goal)}%
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-accent h-full transition-all"
                    style={{
                      width: `${percentage(project.raised, project.goal)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="text-xs font-mono space-y-1 mb-3 pb-3 border-b border-border">
                <p>
                  Price:{" "}
                  <span className="text-foreground font-bold">
                    ${project.price}
                  </span>
                </p>
                <p className="text-accent">
                  <span className="font-bold">+{project.change}%</span>
                </p>
              </div>

              <p className="text-xs text-muted-foreground mb-3 font-mono">
                {project.perk}
              </p>

              <button className="w-full px-3 py-2 bg-secondary text-secondary-foreground text-xs font-mono rounded border border-border hover:border-accent transition-colors">
                Invest Now
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="text-sm font-mono text-accent hover:text-primary transition-colors flex items-center justify-center gap-2 mx-auto">
            VIEW ALL PROJECTS →
          </button>
        </div>
      </div>
    </section>
  )
}
