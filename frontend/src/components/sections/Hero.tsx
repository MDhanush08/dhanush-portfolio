import React, { useState, useEffect, useRef } from 'react';
import { Section } from '../layout/Section';
import { Button } from '../ui/Button';
import { portfolioData } from '../../data/portfolio';
import { Mail, ArrowRight, Download, Terminal } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';

export const Hero: React.FC = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');

  const heroContainerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cyclerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const factsRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  // Cycling roles text transition (pure CSS opacity/transform swap with reserved height)
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const interval = setInterval(() => {
      if (prefersReducedMotion) {
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

  // Entrance animation (short timeline ~1s total, only transform & opacity)
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(
          [
            badgeRef.current,
            greetingRef.current,
            headingRef.current,
            subtitleRef.current,
            cyclerRef.current,
            taglineRef.current,
            ctasRef.current,
            factsRef.current,
          ],
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
          }
        ).fromTo(
          visualRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.3'
        );
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const elements = [
          badgeRef.current,
          greetingRef.current,
          headingRef.current,
          subtitleRef.current,
          cyclerRef.current,
          taglineRef.current,
          ctasRef.current,
          factsRef.current,
          visualRef.current,
        ];
        elements.forEach((el) => {
          if (el) {
            el.style.opacity = '1';
            el.style.transform = 'none';
          }
        });
      });
    },
    { scope: heroContainerRef }
  );

  return (
    <Section
      id="hero"
      className="min-h-[calc(100vh-4rem)] flex items-center pt-8 pb-16 sm:py-20"
      containerClassName="relative"
    >
      {/* Background static radial glows and faint grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        {/* Soft static radial glow */}
        <div
          className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full opacity-40 dark:opacity-30"
          style={{
            background:
              'radial-gradient(ellipse at center, var(--primary) 0%, rgba(99, 102, 241, 0.1) 40%, transparent 70%)',
          }}
        />
        {/* Very faint background dot grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-20" />
      </div>

      <div
        ref={heroContainerRef}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full"
      >
        {/* Left Column: Text & Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Top Pill Badge: Open to opportunities */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-500 text-xs font-mono font-medium mb-5"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{portfolioData.statusBadge}</span>
          </div>

          {/* Greeting Line */}
          <p
            ref={greetingRef}
            className="font-mono text-sm sm:text-base text-(--color-muted) mb-1 tracking-wide"
          >
            Hi, I'm
          </p>

          {/* Name H1 with fluid clamp */}
          <h1
            ref={headingRef}
            className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight text-(--color-text) leading-[1.08] mb-2"
          >
            Dhanush{' '}
            <span className="bg-gradient-to-r from-(--color-primary) to-(--color-secondary) bg-clip-text text-transparent">
              M
            </span>
          </h1>

          {/* Fixed Subtitle */}
          <p
            ref={subtitleRef}
            className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-(--color-text)/90 tracking-tight mb-2"
          >
            {portfolioData.role}
          </p>

          {/* Single-line cycling text with reserved height */}
          <div
            ref={cyclerRef}
            className="h-8 sm:h-9 flex items-center mb-4 overflow-hidden"
            aria-live="polite"
          >
            <span
              className={`font-mono text-base sm:text-lg text-(--color-primary) font-semibold transition-all duration-200 ${
                fadeState === 'in'
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-2'
              }`}
            >
              &gt; {portfolioData.cyclingRoles[currentRoleIndex]}
            </span>
          </div>

          {/* Short Tagline */}
          <p
            ref={taglineRef}
            className="text-base sm:text-lg text-(--color-muted) max-w-xl leading-relaxed mb-8"
          >
            {portfolioData.tagline}
          </p>

          {/* CTA Row */}
          <div
            ref={ctasRef}
            className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 w-full"
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
              Download Resume
            </Button>

            {/* Social Icons */}
            <div className="flex items-center gap-1.5 ml-0 sm:ml-2 pt-2 sm:pt-0">
              <a
                href={portfolioData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dhanush M on GitHub"
                className="w-11 h-11 flex items-center justify-center rounded-[10px] text-(--color-muted) hover:text-(--color-text) bg-(--color-surface-2) border border-(--color-border) hover:border-(--color-primary) transition-colors"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href={portfolioData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dhanush M on LinkedIn"
                className="w-11 h-11 flex items-center justify-center rounded-[10px] text-(--color-muted) hover:text-(--color-text) bg-(--color-surface-2) border border-(--color-border) hover:border-(--color-primary) transition-colors"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${portfolioData.contact.email}`}
                aria-label="Send Email to Dhanush M"
                className="w-11 h-11 flex items-center justify-center rounded-[10px] text-(--color-muted) hover:text-(--color-text) bg-(--color-surface-2) border border-(--color-border) hover:border-(--color-primary) transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick-Facts Strip */}
          <div
            ref={factsRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl pt-6 border-t border-(--color-border)"
          >
            {portfolioData.quickFacts.map((fact, i) => (
              <div
                key={i}
                className="px-3.5 py-2.5 rounded-[10px] bg-(--color-surface-2)/70 border border-(--color-border)"
              >
                <div className="font-heading font-bold text-base sm:text-lg text-(--color-text)">
                  {fact.value}
                </div>
                <div className="text-xs text-(--color-muted) font-medium">
                  {fact.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Code Window & Visual Placeholder */}
        <div
          ref={visualRef}
          className="lg:col-span-5 flex justify-center lg:justify-end w-full"
        >
          <div className="relative w-full max-w-[420px] animate-gentle-float">
            {/* Background profile placeholder card */}
            <div className="rounded-[20px] overflow-hidden border border-(--color-border) bg-(--color-surface) shadow-xl aspect-square w-full relative">
              <img
                src="/profile-placeholder.svg"
                alt="Dhanush M profile illustration"
                className="w-full h-full object-cover"
                loading="eager"
              />

              {/* Code Editor Window Card Overlay */}
              <div className="absolute inset-x-4 bottom-4 rounded-[14px] bg-(--color-surface)/95 border border-(--color-border) shadow-2xl p-4 font-mono text-xs overflow-hidden">
                {/* Editor Chrome Top Bar */}
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-(--color-border)/80 text-(--color-muted)">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <Terminal className="w-3 h-3 text-(--color-primary)" />
                    <span>developer.ts</span>
                  </div>
                </div>

                {/* Monospace TypeScript Code Snippet */}
                <div className="space-y-1 text-(--color-text) leading-relaxed">
                  <p>
                    <span className="text-(--color-secondary)">const</span> developer = &#123;
                  </p>
                  <p className="pl-3">
                    name: <span className="text-emerald-400">'Dhanush M'</span>,
                  </p>
                  <p className="pl-3">
                    role: <span className="text-emerald-400">'Software Developer'</span>,
                  </p>
                  <p className="pl-3">
                    stack: [<span className="text-amber-400">'Angular'</span>,{' '}
                    <span className="text-amber-400">'React'</span>,{' '}
                    <span className="text-amber-400">'NestJS'</span>],
                  </p>
                  <p className="pl-3">
                    openToWork:{' '}
                    <span className="text-(--color-primary) font-semibold">true</span>,
                  </p>
                  <p>&#125;;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
