import { KordHero } from "@/components/demo/kord-hero"
import { KordLiveProjects } from "@/components/demo/kord-live-projects"
import { KordHowItWorks } from "@/components/demo/kord-how-it-works"
import { KordFAQ } from "@/components/demo/kord-faq"
import { KordFinalCTA } from "@/components/demo/kord-final-cta"
import { KordFooter } from "@/components/demo/kord-footer"

export default function Page() {
  return (
    <main className="min-h-screen">
      <KordHero />

      <div className="max-w-5xl mx-auto px-4">
        <hr className="border-border" />
      </div>

      <KordLiveProjects />

      <div className="max-w-5xl mx-auto px-4">
        <hr className="border-border" />
      </div>

      <KordHowItWorks />

      <div className="max-w-5xl mx-auto px-4">
        <hr className="border-border" />
      </div>

      <KordFAQ />

      <div className="max-w-5xl mx-auto px-4">
        <hr className="border-border" />
      </div>

      <KordFinalCTA />

      <KordFooter />
    </main>
  )
}
