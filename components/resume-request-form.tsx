'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

const EMAIL = 'andrewkim1210@gmail.com'

export function ResumeRequestForm() {
  const [requesterEmail, setRequesterEmail] = useState('')
  const [message, setMessage] = useState('')

  function submitRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const subject = encodeURIComponent('Resume request')
    const body = encodeURIComponent(`Hi Andrew,\n\nPlease send your resume to ${requesterEmail}.`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    setMessage('Your email app should open with the request ready to send.')
  }

  return (
    <form onSubmit={submitRequest} className="mt-10">
      <label htmlFor="request-email" className="text-sm font-medium">
        Email address
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          id="request-email"
          type="email"
          autoComplete="email"
          required
          value={requesterEmail}
          onChange={(event) => setRequesterEmail(event.target.value)}
          placeholder="you@example.com"
          className="h-12 min-w-0 flex-1 rounded-md border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-signal focus:ring-2 focus:ring-signal/20"
        />
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-signal"
        >
          Request resume
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </button>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground" aria-live="polite">
        {message || 'Submitting opens your email app with a request addressed to Andrew.'}
      </p>
    </form>
  )
}