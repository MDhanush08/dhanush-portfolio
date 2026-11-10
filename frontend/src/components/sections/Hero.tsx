import { useRef, useState, memo } from 'react'
import { ArrowDownRight, ArrowRight, MapPin, ChevronDown, Code2, ArrowUpRight } from 'lucide-react'
import { Container } from '../layout/Container'
import { HeroVisualSvg } from '../ui/HeroVisualSvg'
import { profile } from '../../data/portfolio'
import { useGSAP, gsap } from '../../lib/gsap'

// Portrait image path - easily replaceable with your custom photo in public/portrait.jpg
const HERO_PORTRAIT_SRC = '/dhanush-img.png'

export const Hero = memo(function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [imgError, setImgError] = useState(false)

  // Scoped GSAP entrance animation (one short timeline, no looping, respects reduced motion)
  useGSAP(
    () => {
      if (typeof window === 'undefined') return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 0.65 },
      })

      // Staggered text elements entrance
      tl.from(
        '.hero-animate',
        {
          y: 18,
          opacity: 0,
          stagger: 0.07,
        },
        0
      )

      // Signature visual frame entrance
      tl.from(
        '.hero-visual-frame',
        {
          opacity: 0,
          scale: 0.98,
          duration: 0.7,
        },
        0.1
      )
    },
    { scope: containerRef }
  )

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full min-h-[calc(100svh-var(--nav-h))] scroll-mt-[var(--nav-h)] flex flex-col justify-center bg-[var(--bg)] py-12 lg:py-16 overflow-hidden"
    >
      <Container className="w-full h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-[clamp(32px,5vw,96px)] items-center">
          {/* Left Column: Text & Meta */}
          <div className="flex flex-col items-start text-left z-10 w-full">
            {/* Small label row with lime dot, title, hairline, location */}
            <div className="hero-animate flex items-center gap-3 text-xs uppercase font-medium tracking-[0.08em] text-[var(--muted)] mb-4">
              <span className="w-2 h-2 rounded-full bg-[#A8E600] shrink-0" />
              <span>Full Stack Software Developer</span>
              <span className="w-6 h-[1px] bg-[var(--line)]" />
              <span>Trichy, India</span>
            </div>

            {/* Huge Two-line H1 with 320px+ responsive clamp */}
            <h1 className="hero-animate text-[clamp(2.75rem,10.5vw,9rem)] font-semibold tracking-[-0.03em] leading-[0.95] mb-4 select-none">
              <span className="block text-[var(--ink)]">{profile.firstName}</span>
              <span className="block text-[var(--muted)]">{profile.lastName}</span>
            </h1>

            {/* Professional Title */}
            <p className="hero-animate text-[clamp(1.25rem,2vw,1.75rem)] font-medium text-[var(--ink)] tracking-tight">
              Full Stack Software Developer
            </p>

            {/* Introduction */}
            {/* <p className="hero-animate text-base md:text-lg text-[var(--muted)] leading-[1.7] max-w-[62ch] mt-[clamp(14px,1.6vw,20px)]">
              I'm a Full Stack Software Developer with 2 years of professional experience building web applications and backend services. I work with Angular, React, TypeScript, Node.js and NestJS, using SQL, PostgreSQL and MongoDB to build reliable and scalable solutions.
            </p> */}
            <p className="hero-animate text-base md:text-lg text-[var(--muted)] leading-[1.7] max-w-[62ch] mt-[clamp(14px,1.6vw,20px)]">
              I have 2 years of professional experience building web applications and backend services. I work with Angular, React, TypeScript, Node.js and NestJS, using SQL, PostgreSQL and MongoDB to build reliable and scalable solutions.
            </p>

            {/* Action Buttons: 12px gap on mobile (gap-3), wraps cleanly */}
            <div className="hero-animate flex flex-wrap items-center gap-3 sm:gap-6 mt-[clamp(28px,3.5vw,44px)]">
              {/* Primary Solid Button */}
              <button
                type="button"
                onClick={scrollToWork}
                className="group inline-flex items-center gap-2 h-12 px-6 bg-[var(--ink)] text-[var(--bg)] rounded-[2px] font-medium text-sm sm:text-base border border-[var(--ink)] hover:bg-[#A8E600] hover:text-[#14110D] hover:border-[#A8E600] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2"
              >
                <span>View Projects</span>
                <ArrowDownRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </button>

              {/* Text Link */}
              <button
                type="button"
                onClick={scrollToAbout}
                className="group inline-flex items-center gap-2 min-h-[44px] text-sm sm:text-base font-medium text-[var(--ink)] hover:underline hover:decoration-2 hover:underline-offset-6 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2 rounded-[2px]"
              >
                <span>About Me</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Meta Row: "02 YEARS OF PROFESSIONAL EXPERIENCE" | "Trichy, Tamil Nadu, India" */}
            <div className="hero-animate pt-6 border-t border-[var(--line)] w-full flex flex-wrap sm:flex-nowrap items-center gap-5 sm:gap-8 text-xs text-[var(--muted)] mt-[clamp(36px,4.5vw,56px)]">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-semibold text-[var(--ink)] tracking-tight">
                  02
                </span>
                <span className="uppercase tracking-[0.08em] font-medium">
                  YEARS OF PROFESSIONAL EXPERIENCE
                </span>
              </div>

              <div className="hidden sm:block w-[1px] h-6 bg-[var(--line)] shrink-0" />

              <div className="flex items-center gap-2 text-[var(--muted)]">
                <MapPin className="w-4 h-4 text-[#A8E600] shrink-0" />
                <span className="font-medium">Trichy, Tamil Nadu, India</span>
              </div>
            </div>
          </div>

          {/* Right Column: Signature Visual Element */}
          <div className="relative flex justify-center lg:justify-end w-full">
            <div className="hero-visual-frame relative w-full max-w-[420px] lg:max-w-[560px] aspect-[4/5] p-3 bg-[var(--surface)] border border-[var(--line)] rounded-[2px] shadow-sm">
              {/* Lime circular sticker at top-left: "BUILD WITH CARE." rotated ~ -8deg */}
              <div className="absolute -top-4 -left-2 sm:-top-6 sm:-left-6 z-20 w-[84px] h-[84px] sm:w-[104px] sm:h-[104px] rounded-full bg-[#A8E600] text-[#14110D] flex flex-col items-center justify-center text-center font-bold tracking-tight rotate-[-8deg] shadow-md select-none border border-[#14110D]/10">
                <span className="text-[10px] sm:text-xs leading-none">BUILD</span>
                <span className="text-[10px] sm:text-xs leading-none">WITH</span>
                <span className="text-[10px] sm:text-xs leading-none">CARE.</span>
              </div>

              {/* Vertical label at right edge (screens >= 1100px) */}
              <div className="hidden xl:block absolute -right-8 top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] text-[9px] uppercase tracking-[0.16em] font-medium text-[var(--muted)] select-none">
                DESIGN / ENGINEERING / DETAIL
              </div>

              {/* Inner visual container */}
              <div className="relative w-full h-full overflow-hidden bg-[var(--bg-alt)] rounded-[1px]">
                {!imgError ? (
                  <img
                    src={HERO_PORTRAIT_SRC}
                    width={896}
                    height={1200}
                    alt="Professional developer portrait of Dhanush M., Full Stack Software Developer"
                    fetchPriority="high"
                    decoding="async"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-top select-none"
                  />
                ) : (
                  <HeroVisualSvg className="w-full h-full object-cover" />
                )}

                {/* FIG. 01 caption at bottom-left */}
                {/* <div className="absolute left-3 bottom-3 text-[10px] uppercase tracking-[0.12em] font-mono text-[var(--muted)] bg-[var(--surface)]/80 px-2 py-0.5 rounded-[2px] select-none">
                  FIG. 01
                </div> */}
              </div>

              {/* Floating card overlapping bottom-right */}
              <button
                type="button"
                onClick={scrollToAbout}
                className="group absolute -bottom-4 -right-1 sm:-bottom-8 sm:-right-6 z-20 p-2.5 sm:p-3.5 bg-[var(--surface)] border border-[var(--line)] rounded-[2px] shadow-lg flex items-center gap-3 text-left transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2"
              >
                <div className="w-9 h-9 rounded-[2px] bg-[#A8E600]/20 text-[var(--ink)] flex items-center justify-center shrink-0">
                  <Code2 className="w-5 h-5 text-[#14110D]" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-[var(--ink)]">
                      Thoughtful by design
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[var(--muted)] group-hover:text-[var(--ink)] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <span className="text-[11px] text-[var(--muted)]">
                    Secure · Scalable · Human
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Bottom-Left Static "SCROLL TO EXPLORE" */}
        <div className="hidden lg:flex items-center gap-2 pt-8 text-[11px] uppercase tracking-[0.1em] font-medium text-[var(--muted)] select-none">
          <span>SCROLL TO EXPLORE</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#A8E600]" />
        </div>
      </Container>
    </section>
  )
})
