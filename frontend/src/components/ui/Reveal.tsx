import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface RevealProps {
  children: ReactNode
  className?: string
  delayMs?: number
  threshold?: number
}

export function Reveal({
  children,
  className,
  delayMs = 0,
  threshold = 0.1,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [revealed, setRevealed] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return false
  })

  useEffect(() => {
    const el = ref.current
    if (!el || revealed) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delayMs > 0) {
              setTimeout(() => setRevealed(true), delayMs)
            } else {
              setRevealed(true)
            }
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [delayMs, threshold, revealed])

  return (
    <div
      ref={ref}
      className={cn('reveal-init', revealed && 'revealed', className)}
    >
      {children}
    </div>
  )
}
