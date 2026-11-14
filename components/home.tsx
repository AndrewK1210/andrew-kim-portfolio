import { CrosshairField } from '@/components/crosshair-field'
import { LocalClock } from '@/components/local-clock'

const facts = [
  { label: 'Focus', value: 'PCB design' },
  { label: 'Local time', value: <LocalClock /> },
  { label: 'Education', value: 'BAsc Electrical Engineering, UBC' },
  { label: 'Based in', value: 'Vancouver, BC' },
]

export function Home() {
  return (
    <section id="home" aria-labelledby="home-title" className="pb-20">
      <CrosshairField>
        <div className="mx-auto flex min-h-[34rem] max-w-5xl flex-col px-6 pb-8 pt-6 text-center sm:min-h-[40rem] sm:pb-10 sm:pt-8">
          <div className="flex flex-1 flex-col items-center justify-center -translate-y-6">
            <h1
              id="home-title"
              data-crosshair-anchor
              className="text-balance text-6xl font-medium leading-[1.05] tracking-tight sm:text-8xl lg:text-9xl"
            >
              Andrew Kim
            </h1>
            <p className="mt-5 max-w-3xl text-balance text-xl leading-relaxed text-muted-foreground sm:text-2xl">
              An engineer who builds machines that sense, think, and move.
            </p>
          </div>
          <dl className="grid gap-x-8 gap-y-6 text-left sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} data-reveal className="border-b pb-4">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-sm">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </CrosshairField>
    </section>
  )
}