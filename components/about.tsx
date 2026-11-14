import { SectionHeading } from '@/components/section-heading'

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading index="02" title="About" id="about-title" />
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <p data-reveal className="max-w-2xl text-pretty text-xl leading-relaxed text-muted-foreground">
            I&apos;m an electrical engineering student at UBC in Vancouver, focused on PCB design and
            hands-on projects. I share build processes and behind-the-scenes clips through short reels.
          </p>
          <div
            data-reveal
            className="group relative mx-auto aspect-[9/16] w-full max-w-[18rem] overflow-hidden rounded-md"
          >
            <video
              aria-label="Reel by Andrew Kim"
              className="absolute inset-0 size-full object-cover"
              controls
              playsInline
              preload="metadata"
            >
              <source src="/videos/reel.mp4" type="video/mp4" />
              Your browser does not support the video element.
            </video>
            <a
              href="https://www.instagram.com/andrew_k.build/"
              target="_blank"
              rel="noreferrer"
              className="absolute left-3 top-3 z-10 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 font-mono text-[11px] text-white/90 opacity-100 backdrop-blur-sm transition-opacity duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
            >
              @andrew_k.build
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
