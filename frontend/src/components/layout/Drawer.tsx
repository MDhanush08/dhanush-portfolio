import { useEffect, useRef, memo } from 'react'
import { createPortal } from 'react-dom'
import { X, FileDown, Sun, Moon, Mail } from 'lucide-react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { profile } from '../../data/portfolio'
import { useTheme } from '../../hooks/useTheme'
import { cn } from '../../lib/cn'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  activeSection: string
  onNavigate: (sectionId: string) => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

const NAV_ITEMS = [
  { id: 'home', number: '01', label: 'Home' },
  { id: 'about', number: '02', label: 'About' },
  { id: 'work', number: '03', label: 'Work' },
  { id: 'experience', number: '04', label: 'Experience' },
  { id: 'education', number: '05', label: 'Education' },
  { id: 'contact', number: '06', label: 'Contact' },
]

export const Drawer = memo(function Drawer({
  isOpen,
  onClose,
  activeSection,
  onNavigate,
  triggerRef,
}: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const { theme, toggleTheme } = useTheme()

  // Scroll lock and scrollbar width compensation
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }
      // Set initial focus to close button after slight tick for accessibility
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus()
      }, 50)
      return () => clearTimeout(timer)
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isOpen])

  // Esc key and window resize to 1024px+ closes drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
        triggerRef.current?.focus()
      }
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [isOpen, onClose, triggerRef])

  // Trap focus inside drawer
  const handleTabKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !drawerRef.current) return

    const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusables.length === 0) return

    const first = focusables[0]
    const last = focusables[focusables.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === first) {
        last.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === last) {
        first.focus()
        e.preventDefault()
      }
    }
  }

  // Tapping a drawer link: unlock body scroll FIRST, close drawer, scroll on next frame
  const handleItemClick = (id: string) => {
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
    onClose()
    requestAnimationFrame(() => {
      onNavigate(id)
    })
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <div
      aria-hidden={!isOpen}
      className={cn(
        'fixed inset-0 z-50 transition-opacity duration-300',
        isOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
      )}
      onKeyDown={handleTabKey}
    >
      {/* Dimmed backdrop */}
      <div
        onClick={() => {
          onClose()
          triggerRef.current?.focus()
        }}
        className={cn(
          'absolute inset-0 bg-black/50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
      />

      {/* Drawer panel with internal scrolling and safe-area insets */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        className={cn(
          'absolute top-0 right-0 bottom-0 h-[100dvh] w-[min(86vw,340px)] bg-[var(--bg)] border-l border-[var(--line)] shadow-2xl flex flex-col justify-between overflow-y-auto overscroll-contain transition-transform duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Drawer Header */}
        <div className="h-[var(--nav-h)] px-5 sm:px-6 border-b border-[var(--line)] flex items-center justify-between shrink-0 pt-[env(safe-area-inset-top,0px)]">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#A8E600] text-[#14110D] font-bold text-xs flex items-center justify-center select-none">
              {profile.initials}
            </span>
            <div className="flex flex-col text-left">
              <span className="font-semibold text-sm leading-tight text-[var(--ink)]">
                {profile.name}
              </span>
              <span className="text-[11px] text-[var(--muted)] leading-tight">
                {profile.role}
              </span>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => {
              onClose()
              triggerRef.current?.focus()
            }}
            aria-label="Close navigation menu"
            className="w-11 h-11 rounded-full flex items-center justify-center text-[var(--ink)] hover:bg-[var(--bg-alt)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 py-2 flex flex-col overflow-y-auto overscroll-contain">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItemClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative min-h-[56px] px-5 sm:px-6 py-2.5 flex items-center gap-4 text-base sm:text-lg font-medium text-left transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-[-2px] rounded-[2px]',
                  isActive
                    ? 'text-[var(--ink)] font-semibold bg-[var(--bg-alt)]'
                    : 'text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--bg-alt)]/50'
                )}
              >
                {/* 3px lime left bar for active link */}
                {isActive && (
                  <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#A8E600]" />
                )}
                <span className="text-xs font-mono text-[var(--muted)] select-none">
                  {/* {item.number} */}
                </span>
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>

        {/* Drawer Footer with safe-area insets */}
        <div className="p-4 sm:p-5 border-t border-[var(--line)] flex flex-col gap-3.5 mt-auto shrink-0 bg-[var(--bg-alt)]/30 pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
          {/* Download Resume button */}
          <a
            href={profile.resumeUrl}
            download="Dhanush_M_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[44px] h-11 px-4 bg-[var(--ink)] text-[var(--bg)] rounded-[2px] font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#A8E600] hover:text-[#14110D] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2"
          >
            <FileDown className="w-4 h-4" />
            <span>Download résumé</span>
          </a>

          {/* Light / Dark Mode toggle row */}
          <div className="flex items-center justify-between py-1 text-sm text-[var(--ink)]">
            <span className="font-medium text-xs">Theme</span>
            <button
              type="button"
              onClick={toggleTheme}
              className="min-h-[44px] flex items-center gap-2 px-3 py-1.5 rounded-[2px] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] cursor-pointer text-xs font-medium focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2"
            >
              {theme === 'dark' ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#A8E600]" />
                  <span>Dark mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#A8E600]" />
                  <span>Light mode</span>
                </>
              )}
            </button>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3 pt-2 border-t border-[var(--line)] text-[var(--muted)]">
            <a
              href={profile.github}
              aria-label="Dhanush on GitHub"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-[var(--line)] flex items-center justify-center hover:bg-[#A8E600] hover:text-[#14110D] hover:border-[#A8E600] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href={profile.linkedin}
              aria-label="Dhanush on LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-[var(--line)] flex items-center justify-center hover:bg-[#A8E600] hover:text-[#14110D] hover:border-[#A8E600] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2"
            >
              <FaLinkedinIn className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Send email"
              className="w-11 h-11 rounded-full border border-[var(--line)] flex items-center justify-center hover:bg-[#A8E600] hover:text-[#14110D] hover:border-[#A8E600] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
})
