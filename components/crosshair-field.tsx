'use client'

import { useEffect, useRef } from 'react'

const HEADER_OVERHANG = 65
const EDGE_RESET_WIDTH = 1.5

export function CrosshairField({ children }: { children: React.ReactNode }) {
  const fieldRef = useRef<HTMLDivElement>(null)
  const readoutRef = useRef<HTMLSpanElement>(null)

  function updateReadout(x: number, y: number, width: number, height: number) {
    if (!readoutRef.current) return
    const normalizedX = (x / width).toFixed(3)
    const normalizedY = (1 - (y + HEADER_OVERHANG) / (height + HEADER_OVERHANG)).toFixed(3)
    readoutRef.current.textContent = `X ${normalizedX}\nY ${normalizedY}`
  }

  function positionAt(x: number, y: number, rect: DOMRect) {
    const el = fieldRef.current
    if (!el) return
    el.style.setProperty('--cx', `${x}px`)
    el.style.setProperty('--cy', `${y}px`)
    updateReadout(x, y, rect.width, rect.height)
  }

  function positionAfterTitle() {
    const el = fieldRef.current
    const title = el?.querySelector('[data-crosshair-anchor]')
    if (!el || !(title instanceof HTMLElement)) return

    const fieldRect = el.getBoundingClientRect()
    const range = document.createRange()
    range.selectNodeContents(title)
    const textRects = range.getClientRects()
    const lastLine = textRects.item(textRects.length - 1)
    if (!lastLine) return

    const x = Math.min(fieldRect.width - 20, lastLine.right - fieldRect.left + 10)
    const y = Math.min(
      fieldRect.height - 20,
      lastLine.bottom - fieldRect.top - Math.max(2, lastLine.height * 0.16),
    )
    positionAt(x, y, fieldRect)
    el.dataset.homeX = `${x}px`
    el.dataset.homeY = `${y}px`
    el.dataset.positioned = 'true'
  }

  useEffect(() => {
    const el = fieldRef.current
    const title = el?.querySelector('[data-crosshair-anchor]')
    if (!el || !(title instanceof HTMLElement)) return

    positionAfterTitle()
    const resizeObserver = new ResizeObserver(() => {
      if (el.dataset.active !== 'true') positionAfterTitle()
    })
    resizeObserver.observe(el)
    resizeObserver.observe(title)

    return () => resizeObserver.disconnect()
  }, [])

  function updatePosition(e: React.PointerEvent<HTMLDivElement>) {
    updateAtClientPosition(e.clientX, e.clientY)
  }

  function updateTouchPosition(e: React.TouchEvent<HTMLDivElement>) {
    const touch = e.touches[0]
    if (touch) updateAtClientPosition(touch.clientX, touch.clientY)
  }

  function updateAtClientPosition(clientX: number, clientY: number) {
    const el = fieldRef.current
    if (!el) return
    const rightEdge = document.documentElement.clientWidth
    if (clientX <= EDGE_RESET_WIDTH || clientX >= rightEdge - EDGE_RESET_WIDTH) {
      el.dataset.active = 'false'
      positionAfterTitle()
      return
    }
    const rect = el.getBoundingClientRect()
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left))
    const y = Math.max(-HEADER_OVERHANG, Math.min(rect.height, clientY - rect.top))
    positionAt(x, y, rect)
    el.dataset.active = 'true'
  }

  function handlePointerLeave(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === 'touch') return
    const header = document.querySelector('header')
    if (e.relatedTarget instanceof Node && header?.contains(e.relatedTarget)) return
    const el = fieldRef.current
    if (!el) return
    el.dataset.active = 'false'
    positionAfterTitle()
  }

  return (
    <div
      ref={fieldRef}
      data-crosshair-field
      data-active="false"
      data-positioned="false"
      onPointerDown={updatePosition}
      onPointerMove={updatePosition}
      onTouchStart={updateTouchPosition}
      onTouchMove={updateTouchPosition}
      onPointerLeave={handlePointerLeave}
      className="group/field relative touch-pan-y overflow-visible [--cx:50%] [--cy:50%]"
    >
      {/* Grid: hidden until the cursor is over the hero, then only visible near the cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-[65px] bottom-0 opacity-0 transition-opacity duration-300 group-data-[active=true]/field:opacity-100"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          WebkitMaskImage:
            'radial-gradient(circle 220px at var(--cx) calc(var(--cy) + 65px), black 0%, transparent 100%)',
          maskImage:
            'radial-gradient(circle 220px at var(--cx) calc(var(--cy) + 65px), black 0%, transparent 100%)',
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-[65px] bottom-0 overflow-hidden opacity-0 transition-opacity duration-300 group-data-[positioned=true]/field:opacity-100"
      >
        <div
          className="absolute inset-x-0 h-px bg-signal/50 transition-[top] duration-500 ease-out group-data-[active=true]/field:duration-0"
          style={{ top: 'calc(var(--cy) + 65px)' }}
        />
        <div
          className="absolute inset-y-0 w-px bg-signal/50 transition-[left] duration-500 ease-out group-data-[active=true]/field:duration-0"
          style={{ left: 'var(--cx)' }}
        />
        <div
          className="absolute size-10 -translate-x-1/2 -translate-y-1/2 transition-[left,top] duration-500 ease-out group-data-[active=true]/field:duration-0"
          style={{ left: 'var(--cx)', top: 'calc(var(--cy) + 65px)' }}
        >
          <span className="absolute inset-0 rounded-full border border-signal" />
          <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal" />
          <span className="absolute inset-0 animate-ping rounded-full border border-signal/40 group-data-[active=true]/field:hidden motion-reduce:hidden" />
        </div>
      </div>

      <span
        ref={readoutRef}
        data-crosshair-readout
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-4 whitespace-pre-line text-right font-mono text-[10px] leading-relaxed tabular-nums text-signal sm:right-12 sm:text-[11px]"
      >
        X ---
        {'\n'}Y ---
      </span>
      <div className="relative">{children}</div>
    </div>
  )
}