import { memo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Mail, FileDown } from 'lucide-react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { Container } from './Container'
import { profile } from '../../data/portfolio'

const FOOTER_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  // { id: 'contact', label: 'Contact' },
]

export const Footer = memo(function Footer() {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  const handleLinkClick = (id: string) => {
    if (id === 'home') {
      if (isHome) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        navigate('/')
      }
      return
    }

    if (isHome) {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate(`/#${id}`)
    }
  }

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHome) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="w-full bg-[var(--bg)] border-t border-[var(--line)] py-12 md:py-16 text-[var(--ink)]">
      <Container className="flex flex-col gap-10">
        {/* Main Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start justify-between">
          {/* Col 1: Branding */}
          <div className="flex flex-col gap-3 text-left">
            <Link
              to="/"
              onClick={handleLogoClick}
              aria-label="Dhanush M — Back to top"
              className="flex items-center gap-3 w-fit focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2 rounded-[2px]"
            >
              <span className="w-8 h-8 rounded-full bg-[#A8E600] text-[#14110D] font-bold text-xs flex items-center justify-center select-none">
                {profile.initials}
              </span>
              <div className="flex flex-col text-left">
                <span className="font-semibold text-sm leading-tight text-[var(--ink)]">
                  {profile.name}
                </span>
                <span className="text-xs text-[var(--muted)]">{profile.role}</span>
              </div>
            </Link>
            <p className="text-xs text-[var(--muted)] max-w-[30ch]">
              Based in {profile.locationCity}, {profile.locationRegion}, {profile.locationCountry}.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 justify-start md:justify-center items-center text-left">
            {FOOTER_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleLinkClick(link.id)}
                className="text-xs uppercase tracking-[0.08em] font-medium text-[var(--muted)] hover:text-[var(--ink)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2 rounded-[2px]"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Col 3: Social & Resume */}
          <div className="flex flex-col items-start md:items-end gap-3">
            <div className="flex items-center gap-2">
              <a
                href={profile.github}
                aria-label="Dhanush on GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-8 sm:h-8 rounded-full border border-[var(--line)] bg-[var(--surface)] flex items-center justify-center text-[var(--muted)] hover:bg-[#A8E600] hover:text-[#14110D] hover:border-[#A8E600] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2"
              >
                <FaGithub className="w-3.5 h-3.5" />
              </a>
              <a
                href={profile.linkedin}
                aria-label="Dhanush on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-8 sm:h-8 rounded-full border border-[var(--line)] bg-[var(--surface)] flex items-center justify-center text-[var(--muted)] hover:bg-[#A8E600] hover:text-[#14110D] hover:border-[#A8E600] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2"
              >
                <FaLinkedinIn className="w-3.5 h-3.5" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Send email"
                className="w-9 h-9 sm:w-8 sm:h-8 rounded-full border border-[var(--line)] bg-[var(--surface)] flex items-center justify-center text-[var(--muted)] hover:bg-[#A8E600] hover:text-[#14110D] hover:border-[#A8E600] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>

            <a
              href={profile.resumeUrl}
              download="Dhanush_M_Resume.pdf"
              className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--ink)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2 rounded-[2px]"
            >
              <FileDown className="w-3.5 h-3.5 text-[#A8E600]" />
              <span className="underline decoration-1 underline-offset-4">Download résumé</span>
            </a>
          </div>
        </div>

        {/* Hairline + Subfooter */}
        <div className="pt-6 border-t border-[var(--line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[var(--muted)] text-left">
          <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          <span>Built with React and GSAP.</span>
        </div>
      </Container>
    </footer>
  )
})
