import React, { useState, useEffect, useRef } from 'react';
import { Section } from '../layout/Section';
import { Button } from '../ui/Button';
import { portfolioData } from '../../data/portfolio';
import {
  ArrowRight,
  Download,
  Mail,
  ChevronDown,
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import {
  SiAngular,
  SiReact,
  SiNestjs,
  SiPostgresql,
  SiDocker,
} from 'react-icons/si';
import { useGSAP } from '@gsap/react';
import { gsap, SplitText } from '../../lib/gsap';

export interface HeroProps {
  startEntrance?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ startEntrance = true }) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');
  const [imageFailed, setImageFailed] = useState(false);

  const heroContainerRef = useRef<HTMLDivElement>(null);
  const statusBadgeRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLParagraphElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cyclerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const factsRef = useRef<HTMLDivElement>(null);
  const photoContainerRef = useRef<HTMLDivElement>(null);
  const photoMaskRef = useRef<HTMLDivElement>(null);
  const photoImgRef = useRef<HTMLImageElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Floating badges references for desktop fine-pointer parallax
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const badge3Ref = useRef<HTMLDivElement>(null);

  // Cycling roles text transition
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const interval = setInterval(() => {
      if (prefersReduced) {
        setCurrentRoleIndex((prev) => (prev + 1) % portfolioData.cyclingRoles.length);
        return;
      }

      setFadeState('out');
      setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % portfolioData.cyclingRoles.length);
        setFadeState('in');
      }, 200);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  // GSAP Hero Entrance Sequence
  useGSAP(
    () => {
      if (!startEntrance || !heroContainerRef.current) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        let split: SplitText | null = null;
        if (h1Ref.current) {
          split = new SplitText(h1Ref.current, {
            type: 'lines,words,chars',
            linesClass: 'overflow-hidden leading-tight',
            charsClass: 'inline-block',
          });
        }

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          onComplete: () => {
            // Revert SplitText so DOM returns to normal text for responsive wrapping
            split?.revert();
          },
        });

        // 1. Text elements stagger
        tl.fromTo(
          statusBadgeRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5 }
        ).fromTo(
          greetingRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4 },
          '-=0.3'
        );

        if (split && split.chars.length > 0) {
          tl.fromTo(
            split.chars,
            { yPercent: 110, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.02,
              ease: 'power3.out',
            },
            '-=0.2'
          );
        }

        tl.fromTo(
          [
            subtitleRef.current,
            cyclerRef.current,
            taglineRef.current,
            ctasRef.current,
            factsRef.current,
          ],
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          '-=0.4'
        );

        // 2. Photo mask scaleY reveal & image scale 1.15 -> 1
        if (photoMaskRef.current) {
          tl.fromTo(
            photoMaskRef.current,
            { scaleY: 1, transformOrigin: 'top center' },
            { scaleY: 0, duration: 0.85, ease: 'power4.inOut' },
            '-=0.6'
          );
        }

        if (photoImgRef.current) {
          tl.fromTo(
            photoImgRef.current,
            { scale: 1.15 },
            { scale: 1, duration: 1.1, ease: 'power3.out' },
            '-=0.85'
          );
        }

        // 3. Floating tech badges pop in
        if (badgesRef.current) {
          const badgeItems = badgesRef.current.querySelectorAll('.floating-badge');
          tl.fromTo(
            badgeItems,
            { scale: 0.6, opacity: 0, y: 16 },
            { scale: 1, opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'back.out(1.7)' },
            '-=0.4'
          );
        }

        // 4. Scroll indicator
        if (scrollIndicatorRef.current) {
          tl.fromTo(
            scrollIndicatorRef.current,
            { opacity: 0, y: -8 },
            { opacity: 1, y: 0, duration: 0.5 },
            '-=0.2'
          );
        }

        return () => {
          split?.revert();
        };
      });

      // Desktop subtle fine-pointer parallax using gsap.quickTo
      mm.add('(min-width: 1024px) and (pointer: fine)', () => {
        if (!photoContainerRef.current) return;

        const xQuick1 = gsap.quickTo(badge1Ref.current, 'x', { duration: 0.6, ease: 'power2.out' });
        const yQuick1 = gsap.quickTo(badge1Ref.current, 'y', { duration: 0.6, ease: 'power2.out' });
        const xQuick2 = gsap.quickTo(badge2Ref.current, 'x', { duration: 0.8, ease: 'power2.out' });
        const yQuick2 = gsap.quickTo(badge2Ref.current, 'y', { duration: 0.8, ease: 'power2.out' });
        const xQuick3 = gsap.quickTo(badge3Ref.current, 'x', { duration: 0.7, ease: 'power2.out' });
        const yQuick3 = gsap.quickTo(badge3Ref.current, 'y', { duration: 0.7, ease: 'power2.out' });

        const handleMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
          const normX = (clientX - centerX) / centerX;
          const normY = (clientY - centerY) / centerY;

          xQuick1(normX * 10);
          yQuick1(normY * 10);
          xQuick2(normX * -12);
          yQuick2(normY * -12);
          xQuick3(normX * 8);
          yQuick3(normY * 8);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const elements = [
          statusBadgeRef.current,
          greetingRef.current,
          h1Ref.current,
          subtitleRef.current,
          cyclerRef.current,
          taglineRef.current,
          ctasRef.current,
          factsRef.current,
          photoContainerRef.current,
          badgesRef.current,
          scrollIndicatorRef.current,
        ];
        elements.forEach((el) => {
          if (el) {
            el.style.opacity = '1';
            el.style.transform = 'none';
          }
        });
        if (photoMaskRef.current) photoMaskRef.current.style.display = 'none';
      });
    },
    { scope: heroContainerRef, dependencies: [startEntrance] }
  );

  return (
    <>
      <Section
        id="hero"
        className="min-h-[calc(100svh-4rem)] flex flex-col justify-center py-6 sm:py-10 lg:py-14 relative overflow-clip"
        containerClassName="relative z-10 flex-1 flex flex-col justify-center"
        background={
          <div
            className="pointer-events-none absolute inset-0 -z-10 overflow-clip"
            aria-hidden="true"
          >
            {/* Static soft radial glow backgrounds sized in vw so they scale with screen */}
            <div
              className="absolute -top-[15vw] -right-[10vw] w-[45vw] min-w-[360px] max-w-[850px] aspect-square rounded-full opacity-35 dark:opacity-25"
              style={{
                background:
                  'radial-gradient(circle, var(--primary) 0%, rgba(99, 102, 241, 0.08) 55%, transparent 70%)',
              }}
            />
            <div
              className="absolute -bottom-[10vw] -left-[10vw] w-[40vw] min-w-[320px] max-w-[750px] aspect-square rounded-full opacity-30 dark:opacity-20"
              style={{
                background:
                  'radial-gradient(circle, var(--secondary) 0%, rgba(34, 211, 238, 0.05) 55%, transparent 70%)',
              }}
            />
            <div className="absolute inset-0 bg-grid-pattern opacity-25 dark:opacity-20" />
          </div>
        }
      >
        <div
          ref={heroContainerRef}
          className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-[clamp(32px,5vw,96px)] items-center w-full"
        >
          {/* Left Column: Typography & CTAs */}
          <div className="flex flex-col items-start text-left w-full">
            {/* Status Pill Badge */}
            <div
              ref={statusBadgeRef}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-500 text-xs font-mono font-medium mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{portfolioData.statusBadge}</span>
            </div>

            {/* Greeting Line */}
            <p
              ref={greetingRef}
              className="font-mono text-xs sm:text-sm text-(--color-muted) uppercase tracking-widest mb-1.5"
            >
              Hi, I'm
            </p>

            {/* Fluid H1: Poppins 700, tracking -0.03em, line-height 1.05, wraps cleanly at 360px */}
            <h1
              ref={h1Ref}
              className="font-sans font-bold text-(--color-text) tracking-[-0.03em] leading-[1.05] mb-2.5 break-words max-w-full"
              style={{ fontSize: 'clamp(2.5rem, 1.8rem + 4.5vw, 5.5rem)' }}
            >
              Dhanush{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-(--color-primary) to-(--color-secondary)">
                M
              </span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="font-sans font-semibold text-(--color-text)/90 tracking-tight mb-2"
              style={{ fontSize: 'clamp(1.25rem, 1rem + 1.2vw, 2.25rem)' }}
            >
              {portfolioData.role}
            </p>

            {/* Cycling Role Line with reserved height */}
            <div
              ref={cyclerRef}
              className="h-8 sm:h-9 flex items-center mb-4 overflow-hidden"
              aria-live="polite"
            >
              <span
                className={`font-mono text-sm sm:text-base text-(--color-primary) font-semibold transition-all duration-200 ${
                  fadeState === 'in'
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-2'
                }`}
              >
                &gt; {portfolioData.cyclingRoles[currentRoleIndex]}
              </span>
            </div>

            {/* Tagline */}
            <p
              ref={taglineRef}
              className="text-sm sm:text-base text-(--color-muted) max-w-xl leading-relaxed mb-7"
            >
              {portfolioData.tagline}
            </p>

            {/* CTAs & Socials */}
            <div
              ref={ctasRef}
              className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 w-full"
            >
              <Button
                href="#projects"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                View Projects
              </Button>

              <Button href="#contact" variant="secondary" size="md">
                Contact Me
              </Button>

              <Button
                href={portfolioData.resumeUrl}
                download="Dhanush_M_Resume.pdf"
                variant="outline"
                size="md"
                icon={<Download className="w-4 h-4" />}
              >
                Resume
              </Button>

              {/* Social Buttons */}
              <div className="flex items-center gap-1.5 ml-0 sm:ml-2 pt-1 sm:pt-0">
                <a
                  href={portfolioData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Dhanush M on GitHub"
                  className="w-11 h-11 flex items-center justify-center rounded-xl text-(--color-muted) hover:text-(--color-text) bg-(--color-surface-2) border border-(--color-border) hover:border-(--color-primary) transition-colors"
                >
                  <FaGithub className="w-4 h-4" />
                </a>
                <a
                  href={portfolioData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Dhanush M on LinkedIn"
                  className="w-11 h-11 flex items-center justify-center rounded-xl text-(--color-muted) hover:text-(--color-text) bg-(--color-surface-2) border border-(--color-border) hover:border-(--color-primary) transition-colors"
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${portfolioData.contact.email}`}
                  aria-label="Send Email to Dhanush M"
                  className="w-11 h-11 flex items-center justify-center rounded-xl text-(--color-muted) hover:text-(--color-text) bg-(--color-surface-2) border border-(--color-border) hover:border-(--color-primary) transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick-Facts Strip */}
            <div
              ref={factsRef}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl pt-5 border-t border-(--color-border)"
            >
              {portfolioData.quickFacts.map((fact, i) => (
                <div
                  key={i}
                  className="px-3.5 py-2.5 rounded-xl bg-(--color-surface-2)/70 border border-(--color-border)"
                >
                  <div className="font-sans font-semibold text-sm sm:text-base text-(--color-text)">
                    {fact.value}
                  </div>
                  <div className="text-xs text-(--color-muted) font-medium mt-0.5">
                    {fact.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Profile Photo Frame + Floating Badges */}
          <div
            ref={photoContainerRef}
            className="flex justify-center lg:justify-end w-full relative"
          >
            <div className="relative w-[clamp(280px,34vw,560px)] aspect-[4/5] mx-auto lg:ml-auto">
              {/* Outer Decorative Offset Outline */}
              <div
                className="absolute -inset-2 rounded-2xl border border-(--color-border) -z-10 opacity-70"
                aria-hidden="true"
              />

              {/* Decorative Gradient Border Container */}
              <div className="p-1 h-full w-full rounded-2xl bg-gradient-to-tr from-(--color-primary) via-(--color-secondary)/50 to-transparent shadow-2xl">
                {/* 4:5 Aspect Ratio Photo Container */}
                <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-(--color-surface) border border-(--color-border)">
                  {/* Mask Overlay for Entrance Animation */}
                  <div
                    ref={photoMaskRef}
                    className="absolute inset-0 bg-(--color-bg) z-20 pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Profile Photo */}
                  {!imageFailed ? (
                    <img
                      ref={photoImgRef}
                      src="/profile.jpg"
                      alt="Dhanush M - Software Developer"
                      width={400}
                      height={500}
                      fetchPriority="high"
                      onError={() => setImageFailed(true)}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                  ) : (
                    /* Fallback Monogram "DM" Card */
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-(--color-surface) via-(--color-surface-2) to-(--color-surface) p-6 text-center">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-(--color-primary) to-(--color-secondary) text-white flex items-center justify-center font-sans font-bold text-3xl shadow-lg mb-3">
                        DM
                      </div>
                      <div className="font-sans font-bold text-lg text-(--color-text)">
                        Dhanush M
                      </div>
                      <div className="font-mono text-xs text-(--color-primary) mt-1">
                        Full Stack Developer
                      </div>
                    </div>
                  )}

                  {/* Bottom Inner Gradient Vignette */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-(--color-surface)/90 to-transparent pointer-events-none" />

                  {/* Location Badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-lg bg-(--color-surface)/85 border border-(--color-border)">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-xs font-mono font-medium text-(--color-text)">
                        Tiruchirappalli, TN, IN
                      </span>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-(--color-primary) font-semibold">
                      Full-Stack
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Tech Badges (Hidden on mobile <600px to avoid text overlap; visible 600px+) */}
              <div ref={badgesRef} className="pointer-events-none hidden sm:block">
                {/* Badge 1: NestJS (Top Left) */}
                <div
                  ref={badge1Ref}
                  className="floating-badge absolute px-2.5 py-1.5 rounded-lg bg-(--color-surface) border border-(--color-border) shadow-xl flex items-center gap-1.5 animate-gentle-float text-xs font-mono font-medium text-(--color-text)"
                  style={{ top: '3%', left: '-5%', animationDuration: '4.8s' }}
                >
                  <SiNestjs className="w-3.5 h-3.5 text-[#E0234E]" />
                  <span>NestJS</span>
                </div>

                {/* Badge 2: React (Top Right) */}
                <div
                  ref={badge2Ref}
                  className="floating-badge absolute px-2.5 py-1.5 rounded-lg bg-(--color-surface) border border-(--color-border) shadow-xl flex items-center gap-1.5 animate-gentle-float text-xs font-mono font-medium text-(--color-text)"
                  style={{ top: '10%', right: '-5%', animationDuration: '5.6s', animationDelay: '-1.5s' }}
                >
                  <SiReact className="w-3.5 h-3.5 text-[#61DAFB]" />
                  <span>React.js</span>
                </div>

                {/* Badge 3: Angular (Middle Left) */}
                <div
                  ref={badge3Ref}
                  className="floating-badge absolute px-2.5 py-1.5 rounded-lg bg-(--color-surface) border border-(--color-border) shadow-xl flex items-center gap-1.5 animate-gentle-float text-xs font-mono font-medium text-(--color-text)"
                  style={{ top: '48%', left: '-6%', animationDuration: '6.2s', animationDelay: '-3s' }}
                >
                  <SiAngular className="w-3.5 h-3.5 text-[#DD0031]" />
                  <span>Angular</span>
                </div>

                {/* Badge 4: PostgreSQL (Bottom Right) */}
                <div
                  className="floating-badge absolute px-2.5 py-1.5 rounded-lg bg-(--color-surface) border border-(--color-border) shadow-xl flex items-center gap-1.5 animate-gentle-float text-xs font-mono font-medium text-(--color-text)"
                  style={{ bottom: '14%', right: '-5%', animationDuration: '5.2s', animationDelay: '-0.8s' }}
                >
                  <SiPostgresql className="w-3.5 h-3.5 text-[#4169E1]" />
                  <span>PostgreSQL</span>
                </div>

                {/* Badge 5: Docker (Bottom Left) */}
                <div
                  className="floating-badge absolute px-2.5 py-1.5 rounded-lg bg-(--color-surface) border border-(--color-border) shadow-xl flex items-center gap-1.5 animate-gentle-float text-xs font-mono font-medium text-(--color-text)"
                  style={{ bottom: '-3%', left: '8%', animationDuration: '4.4s', animationDelay: '-2.2s' }}
                >
                  <SiDocker className="w-3.5 h-3.5 text-[#2496ED]" />
                  <span>Docker</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator at bottom */}
        <div
          ref={scrollIndicatorRef}
          className="mt-10 sm:mt-8 flex flex-col items-center justify-center text-center opacity-70 hover:opacity-100 transition-opacity"
        >
          <a
            href="#about"
            aria-label="Scroll to About section"
            className="flex flex-col items-center gap-1 text-(--color-muted) hover:text-(--color-primary) transition-colors text-xs font-mono uppercase tracking-widest"
          >
            <span>Scroll</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </Section>

      {/* Under-the-hero Fold: Scrolling Text Marquee */}
      <div className="w-full overflow-hidden border-y border-(--color-border) bg-(--color-surface-2)/60 py-3.5 select-none">
        <div className="flex w-max shrink-0 gap-6 animate-marquee-slide hover:[animation-play-state:paused]">
          <div className="flex shrink-0 items-center gap-6 text-xl sm:text-2xl lg:text-3xl font-sans font-bold tracking-tight">
            <span className="text-(--color-text)">ANGULAR</span>
            <span className="text-(--color-muted)/60">•</span>
            <span className="text-(--color-primary)">REACT</span>
            <span className="text-(--color-muted)/60">•</span>
            <span className="text-(--color-text)">NESTJS</span>
            <span className="text-(--color-muted)/60">•</span>
            <span className="text-(--color-secondary)">GRAPHQL</span>
            <span className="text-(--color-muted)/60">•</span>
            <span className="text-(--color-text)">POSTGRESQL</span>
            <span className="text-(--color-muted)/60">•</span>
            <span className="text-(--color-primary)">HASURA</span>
            <span className="text-(--color-muted)/60">•</span>
            <span className="text-(--color-secondary)">REDIS</span>
            <span className="text-(--color-muted)/60">•</span>
            <span className="text-(--color-text)">DOCKER</span>
            <span className="text-(--color-muted)/60">•</span>
            <span className="text-(--color-primary)">GITLAB CI/CD</span>
            <span className="text-(--color-muted)/60">•</span>
            <span className="text-(--color-secondary)">STRIPE</span>
            <span className="text-(--color-muted)/60">•</span>
            <span className="text-(--color-text)">ANTIGRAVITY</span>
            <span className="text-(--color-muted)/60">•</span>
          </div>
          <div className="flex shrink-0 items-center gap-6 text-xl sm:text-2xl lg:text-3xl font-sans font-bold tracking-tight" aria-hidden="true">
            <span className="text-(--color-text)">ANGULAR</span>
            <span className="text-(--color-muted)/60">•</span>
            <span className="text-(--color-primary)">REACT</span>
            <span className="text-(--color-muted)/60">•</span>
            <span className="text-(--color-text)">NESTJS</span>
            <span className="text-(--color-muted)/60">•</span>
            <span className="text-(--color-secondary)">GRAPHQL</span>
            <span className="text-(--color-muted)/60">•</span>
            <span className="text-(--color-text)">POSTGRESQL</span>
            <span className="text-(--color-muted)/60">•</span>
            <span className="text-(--color-primary)">HASURA</span>
            <span className="text-(--color-muted)/60">•</span>
            <span className="text-(--color-secondary)">REDIS</span>
            <span className="text-(--color-muted)/60">•</span>
            <span className="text-(--color-text)">DOCKER</span>
            <span className="text-(--color-muted)/60">•</span>
            <span className="text-(--color-primary)">GITLAB CI/CD</span>
            <span className="text-(--color-muted)/60">•</span>
            <span className="text-(--color-secondary)">STRIPE</span>
            <span className="text-(--color-muted)/60">•</span>
            <span className="text-(--color-text)">ANTIGRAVITY</span>
            <span className="text-(--color-muted)/60">•</span>
          </div>
        </div>
      </div>
    </>
  );
};
