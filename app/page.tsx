import { SiteHeader } from '@/components/site-header'
import { Home } from '@/components/home'
import { About } from '@/components/about'
import { Projects } from '@/components/projects'
import { Skills } from '@/components/skills'
import { Contact } from '@/components/contact'

export default function Page() {
  return (
    <>
      <SiteHeader overlay />
      <main>
        <Home />
        <About />
        <div className="mx-auto max-w-5xl px-6">
          <Projects />
          <Skills />
          <Contact />
        </div>
      </main>
      <footer className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col gap-2 border-t pt-6 font-mono text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Andrew Kim</span>
          <span>Designed &amp; built in Vancouver, BC</span>
        </div>
      </footer>
    </>
  )
}
