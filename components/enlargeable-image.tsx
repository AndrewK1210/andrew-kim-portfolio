'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { Expand, X } from 'lucide-react'

type EnlargeableImageProps = {
  src: string
  alt: string
  sizes: string
  frameClassName: string
  priority?: boolean
}

export function EnlargeableImage({
  src,
  alt,
  sizes,
  frameClassName,
  priority = false,
}: EnlargeableImageProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button
        type="button"
        aria-label={`Enlarge image: ${alt}`}
        onClick={() => dialogRef.current?.showModal()}
        className={`group/image relative block w-full overflow-hidden bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal ${frameClassName}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-contain"
        />
        <span
          aria-hidden="true"
          className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-background/85 text-foreground opacity-0 shadow transition-opacity group-hover/image:opacity-100 group-focus-visible/image:opacity-100"
        >
          <Expand className="size-4" />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={alt}
        onCancel={() => dialogRef.current?.close()}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close()
        }}
        className="m-auto h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-7xl overflow-hidden rounded-xl border border-white/20 bg-black/90 p-0 text-white shadow-2xl backdrop:bg-black/80"
      >
        <div className="relative size-full">
          <Image src={src} alt={alt} fill sizes="100vw" className="object-contain" />
          <button
            type="button"
            aria-label="Close enlarged image"
            onClick={() => dialogRef.current?.close()}
            className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <X className="size-5" />
          </button>
        </div>
      </dialog>
    </>
  )
}
