import React, { useRef } from 'react';
import { Section } from '../layout/Section';
import { SplitHeading } from '../ui/SplitHeading';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ProjectPlaceholder } from '../ui/ProjectPlaceholder';
import { portfolioData } from '../../data/portfolio';
import { ExternalLink, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';

export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const stackCardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop Only (>= 1024px): Sticky Card Stacking and Parallax
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        if (!stackCardsRef.current) return;

        const cards = stackCardsRef.current.querySelectorAll<HTMLElement>('.project-stack-card');

        cards.forEach((card, i) => {
          if (i < cards.length - 1) {
            const nextCard = cards[i + 1];

            gsap.to(card, {
              scale: 0.94,
              opacity: 0.6,
              transformOrigin: 'top center',
              ease: 'none',
              scrollTrigger: {
                trigger: nextCard,
                start: 'top 85%',
                end: 'top 20%',
                scrub: 0.3,
              },
            });
          }

          // Subtle inner parallax on the card's visual panel
          const visual = card.querySelector('.project-visual-panel');
          if (visual) {
            gsap.fromTo(
              visual,
              { y: 10 },
              {
                y: -10,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.3,
                },
              }
            );
          }
        });
      });

      // Mobile / Tablet (< 1024px) / Reduced Motion: Reset all transforms
      mm.add('(max-width: 1023px), (prefers-reduced-motion: reduce)', () => {
        if (!stackCardsRef.current) return;
        const cards = stackCardsRef.current.querySelectorAll<HTMLElement>('.project-stack-card');
        cards.forEach((c) => {
          c.style.transform = 'none';
          c.style.opacity = '1';
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <Section ref={containerRef} id="projects">
      {/* Clean left-aligned heading with exact requested title */}
      <SplitHeading
        number="04"
        kicker="Projects"
        title="Selected projects"
        description="A curation of multi-role SaaS applications, billing software, and intelligent computer vision platforms."
      />

      {/* Desktop Sticky Stacking Cards Container */}
      <div ref={stackCardsRef} className="space-y-8 lg:space-y-12 relative">
        {portfolioData.projects.map((project, idx) => {
          const indexFormatted = String(idx + 1).padStart(2, '0');
          const isFeatured = project.isFeatured;
          const stickyTopOffset = 84 + idx * 24;

          return (
            <div
              key={project.id}
              className="project-stack-card lg:sticky transition-all duration-300"
              style={{
                top: `${stickyTopOffset}px`,
              }}
            >
              <Card
                className={`group relative overflow-hidden p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                  isFeatured
                    ? 'border-(--color-primary)/50 bg-gradient-to-br from-(--color-surface) via-(--color-surface) to-(--color-surface-2) shadow-xl'
                    : 'border-(--color-border) bg-(--color-surface) shadow-lg'
                } hover:border-(--color-primary)/70`}
              >
                {/* Background Subtle Accent Glow */}
                <div
                  className="pointer-events-none absolute -right-24 -top-24 w-80 h-80 rounded-full opacity-15 -z-10"
                  style={{
                    background:
                      idx % 2 === 0
                        ? 'radial-gradient(circle, var(--primary) 0%, transparent 70%)'
                        : 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)',
                  }}
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-9 items-center">
                  {/* Left Column: Index & Project Details */}
                  <div className="lg:col-span-7 space-y-4">
                    {/* Index + Badge Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-(--color-border)">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xl sm:text-2xl font-bold text-(--color-primary)">
                          {indexFormatted}
                        </span>
                        <span className="text-xs font-mono uppercase tracking-wider text-(--color-muted) px-2.5 py-0.5 rounded-full bg-(--color-surface-2) border border-(--color-border)">
                          {project.category}
                        </span>
                        {isFeatured && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-(--color-primary)/15 text-(--color-primary) text-xs font-mono font-semibold">
                            <Sparkles className="w-3.5 h-3.5" />
                            Flagship Enterprise
                          </span>
                        )}
                      </div>

                      {project.isPrivate ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/25">
                          <Lock className="w-3 h-3" />
                          <span>{project.privateBadgeText || 'Private / Client Project'}</span>
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/25">
                          Open Source
                        </span>
                      )}
                    </div>

                    {/* Title (Weight 600) & Tagline */}
                    <div>
                      <h3 className="font-sans font-semibold text-xl sm:text-2xl lg:text-3xl text-(--color-text) tracking-tight mb-1">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-mono text-(--color-secondary) font-medium">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Description (Weight 400 at full readable contrast) */}
                    <p className="text-sm sm:text-base font-normal text-(--color-muted) leading-relaxed">
                      {project.description}
                    </p>

                    {/* Architectural Highlights with 8-12px spacing */}
                    {project.highlights && project.highlights.length > 0 && (
                      <div className="pt-1">
                        <ul className="space-y-2.5">
                          {project.highlights.slice(0, 3).map((hl, hIdx) => (
                            <li
                              key={hIdx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm font-normal text-(--color-text) leading-relaxed"
                            >
                              <CheckCircle2 className="w-4 h-4 text-(--color-secondary) shrink-0 mt-0.5" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tech Chips in small Poppins 500 (13px) with enough padding */}
                    <div className="pt-1.5">
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center px-2.5 py-1 rounded-md bg-(--color-surface-2) text-(--color-text) border border-(--color-border) text-[13px] font-sans font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Role & Links Footer */}
                    <div className="pt-3.5 flex flex-wrap items-center justify-between gap-4 border-t border-(--color-border)">
                      <div className="text-xs font-mono text-(--color-muted)">
                        Role: <span className="text-(--color-text) font-medium">{project.role}</span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        {project.githubUrl && (
                          <Button
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="secondary"
                            size="sm"
                            icon={<FaGithub className="w-3.5 h-3.5" />}
                          >
                            Repository
                          </Button>
                        )}

                        {project.liveUrl && project.liveUrl !== '#' && (
                          <Button
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="primary"
                            size="sm"
                            icon={<ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />}
                            iconPosition="right"
                          >
                            Live Demo
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Visual Panel with Parallax on desktop */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="project-visual-panel w-full transition-transform duration-300">
                      <ProjectPlaceholder
                        type={project.placeholderType}
                        title={project.title}
                        isPrivate={project.isPrivate}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </Section>
  );
};
