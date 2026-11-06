import { useEffect, useRef } from 'react'

export function useScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null)
  const tickingRef = useRef(false)

  useEffect(() => {
    const updateProgress = () => {
      const el = barRef.current
      if (!el) return

      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0

      el.style.transform = `scaleX(${progress})`
      tickingRef.current = false
    }

    const onScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(updateProgress)
        tickingRef.current = true
      }
    }

    // Initial check
    updateProgress()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return barRef
}
