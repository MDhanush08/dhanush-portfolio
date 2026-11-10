import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds: string[], enabled: boolean = true): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || 'home')

  useEffect(() => {
    if (!enabled || typeof window === 'undefined' || sectionIds.length === 0) return

    // Calculate current navbar height
    const getNavH = () => {
      const rootStyle = getComputedStyle(document.documentElement)
      const navHVal = rootStyle.getPropertyValue('--nav-h').trim()
      const parsed = parseInt(navHVal, 10)
      if (!isNaN(parsed) && parsed > 0) return parsed
      return window.innerWidth >= 1024 ? 72 : 64
    }

    const navH = getNavH()

    // Handle scroll edge cases (very top -> 'home', very bottom -> 'contact')
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = window.innerHeight

      if (scrollY < 120 && sectionIds.includes('home')) {
        setActiveId('home')
        return
      }

      if (scrollY + clientHeight >= scrollHeight - 60 && sectionIds.length > 0) {
        setActiveId(sectionIds[sectionIds.length - 1])
        return
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    // IntersectionObserver with rootMargin based on --nav-h
    // Top margin negative navH ensures section is considered active when scrolled past navbar
    const rootMargin = `-${navH}px 0px -40% 0px`

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting)
        if (intersecting.length > 0) {
          intersecting.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          const targetId = intersecting[0].target.id
          if (targetId) {
            const scrollY = window.scrollY || document.documentElement.scrollTop
            if (scrollY < 120 && sectionIds.includes('home')) {
              setActiveId('home')
            } else {
              setActiveId(targetId)
            }
          }
        }
      },
      {
        rootMargin,
        threshold: [0, 0.1, 0.25, 0.5],
      }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) {
        observer.observe(el)
      }
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [sectionIds, enabled])

  return activeId
}
