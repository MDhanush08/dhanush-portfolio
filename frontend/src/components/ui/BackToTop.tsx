import { useEffect, useState, memo } from 'react'
import { ArrowUp } from 'lucide-react'
import { cn } from '../../lib/cn'

interface BackToTopProps {
  hidden?: boolean
}

export const BackToTop = memo(function BackToTop({ hidden = false }: BackToTopProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      setVisible(scrollY > 400)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({
      top: 0,
      behavior: reduced ? 'auto' : 'smooth',
    })
  }

  if (hidden) return null

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={cn(
        'fixed right-[calc(1.5rem+env(safe-area-inset-right,0px))] bottom-[calc(5.75rem+env(safe-area-inset-bottom,0px))] z-40 w-11 h-11 rounded-full bg-[var(--ink)] text-[var(--bg)] border border-[var(--ink)] flex items-center justify-center cursor-pointer shadow-md transition-all duration-300 hover:bg-[#A8E600] hover:text-[#14110D] hover:border-[#A8E600] focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2',
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      )}
    >
      <ArrowUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  )
})
