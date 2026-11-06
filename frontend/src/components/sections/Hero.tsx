import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Code2, Download, Eye, Mail, Sparkles } from 'lucide-react';
import { TbBrandGithub, TbBrandLinkedin } from 'react-icons/tb';
import { portfolioData } from '../../data/portfolio';
import { gsap, useGSAP } from '../../lib/gsap';
import { Button } from '../ui/Button';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');

  const { personal, quickFacts } = portfolioData;
  const roles = personal.cyclingRoles;

  // Cycling role text with smooth fade transition
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState('out');
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setFadeState('in');
      }, 350);
    }, 3200);

    return () => clearInterval(interval);
  }, [roles.length]);

  // GSAP Entrance Animation
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from('.hero-badge', {
          opacity: 0,
          y: -20,
          duration: 0.6,
        })
          .from(
            '.hero-name',
            {
              opacity: 0,
              y: 25,
              duration: 0.8,
            },
            '-=0.3'
          )
          .from(
            '.hero-title',
            {
              opacity: 0,
              y: 20,
              duration: 0.7,
            },
            '-=0.4'
          )
          .from(
            '.hero-role-cycle',
            {
              opacity: 0,
              y: 15,
              duration: 0.6,
            },
            '-=0.3'
          )
          .from(
            '.hero-tagline',
            {
              opacity: 0,
              y: 15,
              duration: 0.6,
            },
            '-=0.3'
          )
          .from(
            '.hero-cta',
            {
              opacity: 0,
              y: 20,
              duration: 0.6,
              stagger: 0.1,
            },
            '-=0.3'
          )
          .from(
            '.hero-visual',
            {
              opacity: 0,
              scale: 0.94,
              duration: 0.9,
            },
            '-=0.5'
          )
          .from(
            '.hero-fact-item',
            {
              opacity: 0,
              y: 20,
              duration: 0.5,
              stagger: 0.08,
            },
            '-=0.3'
          );

        // Floating subtle tech elements animation
        gsap.to('.floating-chip-1', {
          y: -12,
          rotation: 2,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        gsap.to('.floating-chip-2', {
          y: 14,
          rotation: -2,
          duration: 3.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.5,
        });

        gsap.to('.floating-chip-3', {
          y: -10,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1,
        });
      });
    },
    { scope: containerRef }
  );

  const handleScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      const topOffset = 80;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - topOffset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[92vh] pt-32 pb-16 md:pt-40 md:pb-24 flex flex-col justify-center bg-grid-pattern overflow-hidden"
    >
      {/* Background radial gradients for ambient glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--color-primary)]/10 blur-[120px] -z-10" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[var(--color-secondary)]/10 blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & Hero Content */}
          <div className="lg:col-span-7 flex flex-col text-left">
            {/* Availability Badge */}
            <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-muted)] mb-6 w-fit shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for full-time & high-impact projects</span>
            </div>

            {/* Large Name */}
            <h1 className="hero-name text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--color-text)] mb-3">
              Hi, I'm <span className="gradient-text">{personal.name}</span>
            </h1>

            {/* Fixed Main Heading */}
            <h2 className="hero-title text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text)]/90 mb-3">
              {personal.headline}
            </h2>

            {/* Cycling dynamic role */}
            <div className="hero-role-cycle h-9 sm:h-10 flex items-center mb-6">
              <span className="text-base sm:text-lg font-mono text-[var(--color-muted)] mr-2 shrink-0">
                &gt; specialized as
              </span>
              <span
                className={`text-lg sm:text-xl font-mono font-semibold text-[var(--color-secondary)] transition-all duration-300 transform ${
                  fadeState === 'in'
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-2'
                }`}
              >
                {roles[roleIndex]}
              </span>
            </div>

            {/* Tagline */}
            <p className="hero-tagline text-base sm:text-lg text-[var(--color-muted)] leading-relaxed max-w-2xl mb-8">
              {personal.tagline}
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              <Button
                variant="primary"
                size="lg"
                icon={<Eye className="w-4 h-4" />}
                onClick={() => handleScrollTo('projects')}
              >
                View Projects
              </Button>

              <Button
                variant="secondary"
                size="lg"
                icon={<Mail className="w-4 h-4" />}
                onClick={() => handleScrollTo('contact')}
              >
                Contact Me
              </Button>

              <Button
                variant="outline"
                size="lg"
                href={personal.resumeUrl}
                target="_blank"
                download="Dhanush_M_Resume.pdf"
                icon={<Download className="w-4 h-4" />}
              >
                Resume
              </Button>
            </div>

            {/* Social Icons Strip */}
            <div className="hero-cta flex items-center gap-4 text-xs font-mono text-[var(--color-muted)]">
              <span>Connect:</span>
              <div className="flex items-center gap-3">
                <a
                  href={personal.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="p-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <TbBrandGithub className="w-4 h-4" />
                </a>
                <a
                  href={personal.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="p-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)] transition-colors"
                >
                  <TbBrandLinkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${personal.email}`}
                  aria-label="Direct email"
                  className="p-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Distinctive Animated Visual & Profile Placeholder */}
          <div className="lg:col-span-5 flex justify-center items-center relative hero-visual">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-square flex items-center justify-center">
              {/* Outer decorative glowing ring */}
              <div className="absolute inset-2 rounded-3xl bg-gradient-to-tr from-[var(--color-primary)]/20 via-[var(--color-secondary)]/15 to-transparent blur-2xl" />

              {/* Main Visual Frame */}
              <div className="relative w-full h-full rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-xl p-4 shadow-2xl flex flex-col justify-between overflow-hidden">
                {/* Window header */}
                <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[11px] font-mono text-[var(--color-muted)]">
                    dhanush_m.fullstack.tsx
                  </span>
                  <Code2 className="w-3.5 h-3.5 text-[var(--color-muted)]" />
                </div>

                {/* Profile Image / SVG Placeholder */}
                <div className="relative my-auto flex items-center justify-center p-2">
                  <img
                    src="/profile-placeholder.svg"
                    alt="Dhanush M - Software Developer"
                    width={320}
                    height={320}
                    className="w-full h-auto max-h-[260px] object-contain rounded-2xl select-none"
                    loading="eager"
                  />
                </div>

                {/* Card footer mini stats */}
                <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Active Developer</span>
                  </div>
                  <span className="text-[var(--color-muted)]">NestJS • React • Angular</span>
                </div>
              </div>

              {/* Floating Badge 1: Angular & NestJS */}
              <div className="floating-chip-1 absolute -top-4 -left-4 sm:-left-6 px-3.5 py-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl flex items-center gap-2 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-xs font-mono font-medium text-[var(--color-text)]">
                  Angular + NestJS
                </span>
              </div>

              {/* Floating Badge 2: PostgreSQL & GraphQL */}
              <div className="floating-chip-2 absolute -bottom-4 -right-4 sm:-right-6 px-3.5 py-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl flex items-center gap-2 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)]" />
                <span className="text-xs font-mono font-medium text-[var(--color-text)]">
                  GraphQL & PostgreSQL
                </span>
              </div>

              {/* Floating Badge 3: AI-Assisted */}
              <div className="floating-chip-3 absolute top-1/2 -right-5 sm:-right-8 px-3 py-1.5 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-primary)]/40 shadow-lg hidden sm:flex items-center gap-1.5 text-xs font-mono text-[var(--color-primary)]">
                <Sparkles className="w-3 h-3" />
                <span>AI Accelerated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Facts Strip */}
        <div className="mt-16 md:mt-20 pt-8 border-t border-[var(--color-border)] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {quickFacts.map((fact, index) => (
            <div
              key={index}
              className="hero-fact-item p-4 rounded-xl bg-[var(--color-surface)]/60 border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 transition-colors"
            >
              <p className="text-2xl sm:text-3xl font-extrabold font-heading gradient-text">
                {fact.value}
              </p>
              <p className="text-xs font-mono font-medium text-[var(--color-text)] mt-1">
                {fact.label}
              </p>
              {fact.subtext && (
                <p className="text-[11px] text-[var(--color-muted)] mt-0.5 line-clamp-1">
                  {fact.subtext}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Scroll indicator prompt */}
        <div className="hidden md:flex justify-center mt-12">
          <button
            type="button"
            onClick={() => handleScrollTo('about')}
            aria-label="Scroll to about section"
            className="flex flex-col items-center gap-1 text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors text-xs font-mono"
          >
            <span>Explore</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
