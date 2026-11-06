import React, { useRef } from 'react';
import { Section } from '../layout/Section';
import { SplitHeading } from '../ui/SplitHeading';
import { Card } from '../ui/Card';
import { Chip } from '../ui/Chip';
import { Counter } from '../ui/Counter';
import { portfolioData } from '../../data/portfolio';
import {
  Sparkles,
  Layers,
  MapPin,
  FolderGit2,
  ShieldCheck,
  Cpu,
} from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap, SplitText } from '../../lib/gsap';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);
  const bentoGridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop scrubbed opacity reveal for the statement paragraph
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (statementRef.current) {
          const split = new SplitText(statementRef.current, {
            type: 'words',
            wordsClass: 'inline-block transition-opacity duration-75',
          });

          gsap.fromTo(
            split.words,
            { opacity: 0.2 },
            {
              opacity: 1,
              stagger: 0.05,
              ease: 'none',
              scrollTrigger: {
                trigger: statementRef.current,
                start: 'top 75%',
                end: 'bottom 45%',
                scrub: 0.3,
              },
            }
          );
        }

        // Stagger bento cards
        if (bentoGridRef.current) {
          const cards = bentoGridRef.current.querySelectorAll('.bento-card');
          gsap.fromTo(
            cards,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.09,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: bentoGridRef.current,
                start: 'top 80%',
                once: true,
              },
            }
          );
        }
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        if (statementRef.current) statementRef.current.style.opacity = '1';
        if (bentoGridRef.current) {
          const cards = bentoGridRef.current.querySelectorAll('.bento-card');
          cards.forEach((c) => {
            if (c instanceof HTMLElement) {
              c.style.opacity = '1';
              c.style.transform = 'none';
            }
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <Section ref={sectionRef} id="about">
      <SplitHeading
        number="01"
        kicker="About Me"
        title="Engineering Scalable Web Apps with"
        accent="Architectural"
        titleEnd="Rigor"
        description="A bridge between fluid frontend design, resilient backend microservices, and AI-accelerated velocity."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Large Scannable Statement Paragraph */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <Card className="bento-card relative overflow-hidden p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-wider text-(--color-primary)">
              <span className="w-1.5 h-1.5 rounded-full bg-(--color-primary)" />
              <span>Full-Stack Perspective</span>
            </div>

            {/* Large Statement Scrubbed from 20% to 100% Opacity */}
            <p
              ref={statementRef}
              className="font-display font-medium text-2xl sm:text-3xl text-(--color-text) leading-[1.3] mb-6 select-text"
            >
              Software Developer with 2 years of experience crafting secure, enterprise web applications. Specializing in Angular, React.js, NestJS, and Hasura GraphQL with deep expertise in role-based security and continuous Docker deployment.
            </p>

            <p className="text-base text-(--color-muted) leading-relaxed">
              Every interface I construct is measured for high accessibility, sub-second interaction feedback, and robust API resilience.
            </p>

            {/* Core Competencies Chips */}
            <div className="pt-6 border-t border-(--color-border) flex flex-wrap gap-2">
              <Chip icon={<Layers className="w-3.5 h-3.5" />}>Full-Stack Architecture</Chip>
              <Chip icon={<ShieldCheck className="w-3.5 h-3.5" />}>JWT &amp; RBAC Security</Chip>
              <Chip icon={<Cpu className="w-3.5 h-3.5" />}>NestJS &amp; GraphQL APIs</Chip>
              <Chip icon={<Sparkles className="w-3.5 h-3.5" />}>AI-Augmented Velocity</Chip>
            </div>
          </Card>
        </div>

        {/* Right Column: Bento Grid with Animated Counters & AI Card */}
        <div ref={bentoGridRef} className="lg:col-span-6 flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Fact 1: Years Experience */}
            <Card hoverEffect className="bento-card p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-(--color-primary)/10 text-(--color-primary) flex items-center justify-center mb-4">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="text-3xl sm:text-4xl font-display font-extrabold text-(--color-text) mb-1">
                  <Counter end={2} suffix="+ Years" />
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-(--color-primary) font-semibold mb-1.5">
                  Professional Experience
                </div>
                <p className="text-xs text-(--color-muted) leading-relaxed">
                  Building SaaS platforms, billing microservices, and GraphQL APIs.
                </p>
              </div>
            </Card>

            {/* Fact 2: Core Flagship SaaS Products */}
            <Card hoverEffect className="bento-card p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-(--color-secondary)/10 text-(--color-secondary) flex items-center justify-center mb-4">
                  <FolderGit2 className="w-4 h-4" />
                </div>
                <div className="text-3xl sm:text-4xl font-display font-extrabold text-(--color-text) mb-1">
                  <Counter end={2} suffix=" Flagship" />
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-(--color-secondary) font-semibold mb-1.5">
                  Enterprise Platforms
                </div>
                <p className="text-xs text-(--color-muted) leading-relaxed">
                  Dental Interface 360 and Lala Invoice production systems.
                </p>
              </div>
            </Card>

            {/* Fact 3: Location & Availability */}
            <Card hoverEffect className="bento-card sm:col-span-2 p-5 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-display font-bold text-(--color-text)">
                    {portfolioData.location}
                  </div>
                  <p className="text-xs text-(--color-muted) mt-0.5">
                    Open to full-time engineering roles (Remote, Hybrid, or On-site).
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* AI-Assisted Developer Highlight Card */}
          <Card
            hoverEffect
            className="bento-card relative overflow-hidden border-(--color-primary)/40 bg-gradient-to-br from-(--color-surface) via-(--color-surface) to-(--color-surface-2) p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="p-2 rounded-xl bg-(--color-primary)/10 text-(--color-primary)">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <h4 className="font-display font-bold text-lg text-(--color-text)">
                  {portfolioData.aiAssistedNote.title}
                </h4>
                <p className="text-xs font-mono text-(--color-primary)">
                  High-Leverage Modern Development
                </p>
              </div>
            </div>

            <p className="text-sm text-(--color-muted) leading-relaxed mb-4">
              {portfolioData.aiAssistedNote.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {portfolioData.aiAssistedNote.tools.map((tool, idx) => (
                <Chip key={idx} variant="primary" size="sm">
                  {tool}
                </Chip>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
};
