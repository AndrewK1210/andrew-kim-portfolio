'use client'

import { useEffect } from 'react'

export function RevealObserver() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', '')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    document.body.classList.add('reveal-ready')

    const seen = new WeakSet<Element>()
    const scan = () => {
      document.querySelectorAll('[data-reveal]:not([data-revealed])').forEach((el) => {
        if (!seen.has(el)) {
          seen.add(el)
          io.observe(el)
        }
      })
    }

    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
      document.body.classList.remove('reveal-ready')
    }
  }, [])

  return null
}