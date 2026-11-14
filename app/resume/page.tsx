import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { ResumeRequestForm } from '@/components/resume-request-form'

export default function ResumePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 pb-24">
        <Link
          href="/#contact"
          className="group mt-8 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft
            className="size-3.5 transition-transform group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          Contact
        </Link>

        <section className="mx-auto max-w-xl py-20 sm:py-28">
          <p className="font-mono text-xs uppercase tracking-wider text-signal">Resume request</p>
          <h1 className="mt-4 text-balance text-4xl font-medium tracking-tight sm:text-5xl">
            Get in touch for my resume.
          </h1>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Enter your email and I&apos;ll follow up with a copy.
          </p>
          <ResumeRequestForm />
        </section>
      </main>
    </>
  )
}