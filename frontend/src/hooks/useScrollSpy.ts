import { useState, useEffect, useCallback, useMemo } from 'react'

export function useScrollSpy(
  sectionIds: string[],
  enabled: boolean = true
): [string, (id: string) => void] {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || 'home')

  const getNavH = useCallback(() => {
    if (typeof window === 'undefined') return 72
    const rootStyle = getComputedStyle(document.documentElement)
    const navHVal = rootStyle.getPropertyValue('--nav-h').trim()
    const parsed = parseInt(navHVal, 10)
    if (!isNaN(parsed) && parsed > 0) return parsed
    return window.innerWidth >= 1024 ? 72 : 64
  }, [])

  // Stable string key to prevent unnecessary effect triggers
  const idsKey = useMemo(() => sectionIds.join(','), [sectionIds])

  useEffect(() => {
    if (!enabled || typeof window === 'undefined' || sectionIds.length === 0) return

    const checkActiveSection = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = window.innerHeight
      const navH = getNavH()

      // 1. At or near the top of the page -> 'home'
      if (scrollY < 120 && sectionIds.includes('home')) {
        setActiveId('home')
        return
      }

      // 2. Reached bottom of the page -> last section ('contact')
      if (scrollY + clientHeight >= scrollHeight - 60 && sectionIds.length > 0) {
        setActiveId(sectionIds[sectionIds.length - 1])
        return
      }

      // 3. Focal point: line across the viewport where the reader's attention sits
      // Desktop: 72px navH + ~250px to 320px focal offset
      const focalPoint = navH + Math.min(Math.max(clientHeight * 0.28, 150), 320)

      // Find the section that spans across this focal line
      let matchedId = ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= focalPoint && rect.bottom > focalPoint) {
          matchedId = id
          break
        }
      }

      // 4. Fallback if between sections or during rapid momentum scrolling:
      // Pick the section whose top is closest to the focal line from above
      if (!matchedId) {
        let maxTop = -Infinity
        for (const id of sectionIds) {
          const el = document.getElementById(id)
          if (!el) continue
          const rect = el.getBoundingClientRect()
          if (rect.top <= focalPoint && rect.top > maxTop) {
            maxTop = rect.top
            matchedId = id
          }
        }
      }

      if (matchedId) {
        setActiveId(matchedId)
      }
    }

    // Check immediately on mount and after layout settles
    checkActiveSection()
    const rafId = requestAnimationFrame(checkActiveSection)
    const timeoutId = setTimeout(checkActiveSection, 150)

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkActiveSection()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(timeoutId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [idsKey, sectionIds, enabled, getNavH])

  return [activeId, setActiveId]
}
