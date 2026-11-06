import { useRef, memo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Container } from './Container'
import { ThemeToggle } from '../ui/ThemeToggle'
import { Drawer } from './Drawer'
import { profile } from '../../data/portfolio'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { cn } from '../../lib/cn'

interface NavbarProps {
  isDrawerOpen: boolean
  setIsDrawerOpen: (open: boolean) => void
}

const NAV_LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export const Navbar = memo(function Navbar({
  isDrawerOpen,
  setIsDrawerOpen,
}: NavbarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const hamburgerRef = useRef<HTMLButtonElement | null>(null)

  // Top 3px lime scroll progress bar
  const progressBarRef = useScrollProgress()

  // ScrollSpy active section on Home
  const activeSection = useScrollSpy(
    NAV_LINKS.map((l) => l.id),
    isHome
  )

  const handleNavClick = (sectionId: string) => {
    if (isHome) {
      const el = document.getElementById(sectionId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // Navigate to Home, then scroll to section
      navigate(`/#${sectionId}`)
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 bg-[var(--bg)] border-b border-[var(--line)]">
        {/* 3px lime scroll progress bar at the very top */}
        <div
          ref={progressBarRef}
          className="absolute top-0 left-0 right-0 h-[3px] bg-[#A8E600] origin-left pointer-events-none z-50 scale-x-0"
        />

        <nav aria-label="Main Navigation">
          <Container className="h-[72px] flex items-center justify-between">
            {/* Left: Lime circle logo + Two-line text */}
            <Link
              to="/"
              className="group flex items-center gap-3.5 focus-visible:outline-2 focus-visible:outline-[var(--ink)] select-none"
            >
              <div className="w-9 h-9 rounded-full bg-[#A8E600] text-[#14110D] font-bold text-xs flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                {profile.initials}
              </div>
              <div className="flex flex-col text-left">
                <span className="font-semibold text-sm leading-tight text-[var(--ink)]">
                  {profile.name}
                </span>
                <span className="text-[11px] text-[var(--muted)] leading-tight">
                  {profile.role}
                </span>
              </div>
            </Link>

            {/* Center: Desktop Navigation Links (>=1024px) */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const isActive = isHome && activeSection === link.id
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => handleNavClick(link.id)}
                    className={cn(
                      'relative py-1 text-sm font-medium transition-colors cursor-pointer',
                      isActive
                        ? 'text-[var(--ink)] font-semibold'
                        : 'text-[var(--muted)] hover:text-[var(--ink)]'
                    )}
                  >
                    <span>{link.label}</span>
                    {/* Animated scaleX underline on hover and active state */}
                    <span
                      className={cn(
                        'absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--ink)] origin-left transition-transform duration-200',
                        isActive
                          ? 'scale-x-100'
                          : 'scale-x-0 hover:scale-x-100 group-hover:scale-x-100'
                      )}
                    />
                  </button>
                )
              })}
            </div>

            {/* Right: Theme Toggle + Contact CTA + Hamburger on Mobile */}
            <div className="flex items-center gap-3 md:gap-4">
              <ThemeToggle />

              {/* "Let's talk ↗" outlined button */}
              <button
                type="button"
                onClick={() => handleNavClick('contact')}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 h-10 text-sm font-medium border border-[var(--ink)] text-[var(--ink)] bg-transparent hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors cursor-pointer rounded-[2px]"
              >
                <span>Let's talk</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {/* Hamburger button below 1024px */}
              <button
                ref={hamburgerRef}
                type="button"
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                aria-label={isDrawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isDrawerOpen}
                aria-controls="mobile-navigation-drawer"
                className="lg:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-[2px] border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--ink)]"
              >
                <span
                  className={cn(
                    'w-5 h-[1.5px] bg-[var(--ink)] transition-transform duration-200 origin-center',
                    isDrawerOpen && 'translate-y-[7.5px] rotate-45'
                  )}
                />
                <span
                  className={cn(
                    'w-5 h-[1.5px] bg-[var(--ink)] transition-opacity duration-200',
                    isDrawerOpen && 'opacity-0'
                  )}
                />
                <span
                  className={cn(
                    'w-5 h-[1.5px] bg-[var(--ink)] transition-transform duration-200 origin-center',
                    isDrawerOpen && '-translate-y-[7.5px] -rotate-45'
                  )}
                />
              </button>
            </div>
          </Container>
        </nav>
      </header>

      {/* Spacer so content is not hidden beneath fixed 72px navbar */}
      <div className="h-[72px] w-full" aria-hidden="true" />

      {/* Mobile Right-Side Drawer rendered with Portal */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeSection={activeSection}
        onNavigate={handleNavClick}
        triggerRef={hamburgerRef}
      />
    </>
  )
})
