'use client'

import { useEffect } from 'react'

const HEADER_OVERHANG = 65
const EDGE_RESET_WIDTH = 1.5

const links = [
  { href: '/#about', label: 'About' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#contact', label: 'Contact' },
]

function updateCrosshair(clientX: number, clientY: number) {
  const field = document.querySelector<HTMLElement>('[data-crosshair-field]')
  if (!field) return
  const rightEdge = document.documentElement.clientWidth
  if (clientX <= EDGE_RESET_WIDTH || clientX >= rightEdge - EDGE_RESET_WIDTH) {
    resetCrosshair()
    return
  }

  const rect = field.getBoundingClientRect()
  const relativeX = Math.max(0, Math.min(rect.width, clientX - rect.left))
  const relativeY = Math.max(-HEADER_OVERHANG, Math.min(rect.height, clientY - rect.top))
  field.style.setProperty('--cx', `${relativeX}px`)
  field.style.setProperty('--cy', `${relativeY}px`)
  field.dataset.active = 'true'

  const header = document.querySelector<HTMLElement>('[data-home-crosshair-header]')
  if (header) {
    const headerRect = header.getBoundingClientRect()
    header.style.setProperty('--header-cx', `${clientX - headerRect.left}px`)
    header.style.setProperty('--header-cy', `${clientY - headerRect.top}px`)
    header.dataset.crosshairActive = 'true'
  }

  const readout = field.querySelector<HTMLElement>('[data-crosshair-readout]')
  if (readout) {
    const normalizedX = (relativeX / rect.width).toFixed(3)
    const normalizedY = (
      1 -
      (relativeY + HEADER_OVERHANG) / (rect.height + HEADER_OVERHANG)
    ).toFixed(3)
    readout.textContent = `X ${normalizedX}\nY ${normalizedY}`
  }
}

function resetCrosshair() {
  const field = document.querySelector<HTMLElement>('[data-crosshair-field]')
  if (!field) return
  field.dataset.active = 'false'
  if (field.dataset.homeX) field.style.setProperty('--cx', field.dataset.homeX)
  if (field.dataset.homeY) field.style.setProperty('--cy', field.dataset.homeY)
  const header = document.querySelector<HTMLElement>('[data-home-crosshair-header]')
  if (header) {
    header.dataset.crosshairActive = 'false'
    header.style.setProperty('--header-cx', `${header.getBoundingClientRect().width / 2}px`)
    header.style.setProperty('--header-cy', `${header.getBoundingClientRect().height / 2}px`)
  }
}

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  useEffect(() => {
    let previousWidth = document.documentElement.clientWidth
    const handleResize = () => {
      const currentWidth = document.documentElement.clientWidth
      if (currentWidth !== previousWidth) resetCrosshair()
      previousWidth = currentWidth
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    updateCrosshair(event.clientX, event.clientY)
  }

  function handleTouchMove(event: React.TouchEvent<HTMLElement>) {
    const touch = event.touches[0]
    if (touch) updateCrosshair(touch.clientX, touch.clientY)
  }

  function handlePointerLeave(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType === 'touch') return
    const field = document.querySelector('[data-crosshair-field]')
    if (event.relatedTarget instanceof Node && field?.contains(event.relatedTarget)) {
      event.currentTarget.dataset.crosshairActive = 'false'
      return
    }
    resetCrosshair()
  }

  return (
    <header
      data-home-crosshair-header
      data-crosshair-active="false"
      onPointerDown={handlePointerMove}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      className={`group/header sticky top-0 z-40 border-b border-border/60 backdrop-blur-md ${overlay ? 'bg-background/45' : 'bg-background/80'}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-0 transition-opacity duration-200 group-data-[crosshair-active=true]/header:opacity-100"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          WebkitMaskImage:
            'radial-gradient(circle 220px at var(--header-cx, 50%) var(--header-cy, 50%), black 0%, transparent 100%)',
          maskImage:
            'radial-gradient(circle 220px at var(--header-cx, 50%) var(--header-cy, 50%), black 0%, transparent 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-0 transition-opacity duration-200 group-data-[crosshair-active=true]/header:opacity-100"
      >
        <div
          className="absolute inset-x-0 h-px bg-signal/50"
          style={{ top: 'var(--header-cy)' }}
        />
        <div
          className="absolute inset-y-0 w-px bg-signal/50"
          style={{ left: 'var(--header-cx)' }}
        />
        <div
          className="absolute size-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: 'var(--header-cx, 50%)', top: 'var(--header-cy, 50%)' }}
        >
          <span className="absolute inset-0 rounded-full border border-signal" />
          <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal" />
        </div>
      </div>
      <div className="relative z-30 mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a href="/#home" className="flex items-center gap-1.5 font-mono text-xs sm:gap-2 sm:text-sm">
          <span className="size-2 rounded-full bg-signal" aria-hidden="true" />
          <span>andrew.kim</span>
        </a>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-0 sm:gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-md px-1.5 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground sm:px-3 sm:text-sm"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
