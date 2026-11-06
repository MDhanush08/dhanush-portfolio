import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds: string[], enabled: boolean = true): string {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return

    const observers: IntersectionObserver[] = []

    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find the visible entry with highest intersection ratio or topmost
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      }
    }

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-80px 0px -40% 0px',
      threshold: [0, 0.2, 0.5],
    })

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) {
        observer.observe(el)
      }
    })

    observers.push(observer)

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [sectionIds, enabled])

  return activeId
}
