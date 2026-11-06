import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Container } from '../components/layout/Container'
import { profile } from '../data/portfolio'

export default function NotFound() {
  useEffect(() => {
    document.title = `Page Not Found | ${profile.name}`
  }, [])

  return (
    <main id="main-content" className="w-full min-h-[70vh] flex items-center justify-center bg-[var(--bg)] py-20 text-[var(--ink)]">
      <Container className="text-center flex flex-col items-center gap-6">
        <span className="text-xs font-mono uppercase tracking-[0.16em] text-[var(--muted)]">
          404 — PAGE NOT FOUND
        </span>

        <h1 className="text-[clamp(3rem,8vw,6rem)] font-bold tracking-tight text-[var(--ink)] leading-none">
          Lost in pages.
        </h1>

        <p className="text-base md:text-lg text-[var(--muted)] max-w-[40ch]">
          The page or project you're looking for doesn't exist or has moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 h-11 px-6 bg-[var(--ink)] text-[var(--bg)] rounded-[2px] font-medium text-sm hover:bg-[#A8E600] hover:text-[#14110D] transition-colors mt-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to portfolio</span>
        </Link>
      </Container>
    </main>
  )
}
