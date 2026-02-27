'use client'

import Link from 'next/link'

export function KordFooter() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-[family-name:var(--font-geist-pixel-square)] font-bold text-lg mb-4">
              Kord
            </h3>
            <p className="text-xs font-mono text-muted-foreground">
              Fund the music you love. Own the albums you support.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-mono font-bold text-sm mb-3 uppercase tracking-widest">
              Product
            </h4>
            <ul className="space-y-2 text-xs font-mono text-muted-foreground">
              <li>
                <Link href="/explore" className="hover:text-accent transition-colors">
                  Explore Projects
                </Link>
              </li>
              <li>
                <Link href="/create" className="hover:text-accent transition-colors">
                  Create Project
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-accent transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Developer Docs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono font-bold text-sm mb-3 uppercase tracking-widest">
              Company
            </h4>
            <ul className="space-y-2 text-xs font-mono text-muted-foreground">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-mono font-bold text-sm mb-3 uppercase tracking-widest">
              Social
            </h4>
            <ul className="space-y-2 text-xs font-mono text-muted-foreground">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Twitter (@kord_fi)
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-xs font-mono text-muted-foreground">
          <p>© 2026 Kord. Built on Solana + Audius.</p>
        </div>
      </div>
    </footer>
  )
}
