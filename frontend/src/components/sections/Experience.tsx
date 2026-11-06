import React, { useRef } from 'react';
import { Section } from '../layout/Section';
import { SplitHeading } from '../ui/SplitHeading';
import { Card } from '../ui/Card';
import { Chip } from '../ui/Chip';
import { portfolioData } from '../../data/portfolio';
import { Briefcase, Calendar, MapPin, CheckCircle2, FolderGit2 } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';

export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Timeline line drawing scrub
        if (lineRef.current && timelineRef.current) {
          gsap.fromTo(
            lineRef.current,
            { scaleY: 0, transformOrigin: 'top center' },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: timelineRef.current,
                start: 'top 75%',
                end: 'bottom 70%',
                scrub: 0.3,
              },
            }
          );
        }

        // Each entry reveal and dot scale
        if (timelineRef.current) {
          const items = timelineRef.current.querySelectorAll('.timeline-entry');
          items.forEach((item) => {
            const card = item.querySelector('.timeline-card');
            const dot = item.querySelector('.timeline-dot');

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                once: true,
              },
            });

            if (dot) {
              tl.fromTo(
                dot,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2)' }
              );
            }

            if (card) {
              tl.fromTo(
                card,
                { opacity: 0, x: 24 },
                { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
                '-=0.25'
              );
            }
          });
        }
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        if (lineRef.current) lineRef.current.style.transform = 'scaleY(1)';
        if (timelineRef.current) {
          const all = timelineRef.current.querySelectorAll('.timeline-card, .timeline-dot');
          all.forEach((el) => {
            if (el instanceof HTMLElement) {
              el.style.opacity = '1';
              el.style.transform = 'none';
            }
          });
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <Section ref={containerRef} id="experience">
      {/* Clean left-aligned heading with exact requested title */}
      <SplitHeading
        number="03"
        kicker="Experience"
        title="My career journey"
        description="Delivering multi-role enterprise SaaS platforms, resilient APIs, and client systems."
      />

      <div ref={timelineRef} className="relative max-w-4xl mr-auto">
        {/* Background Guide Line */}
        <div
          className="absolute left-4 sm:left-6 top-3 bottom-6 w-0.5 bg-(--color-border)"
          aria-hidden="true"
        />

        {/* Animated Drawing Timeline Line */}
        <div
          ref={lineRef}
          className="absolute left-4 sm:left-6 top-3 bottom-6 w-0.5 bg-gradient-to-b from-(--color-primary) to-(--color-secondary)"
          aria-hidden="true"
        />

        <div className="space-y-10 sm:space-y-12">
          {portfolioData.experience.map((exp) => (
            <div key={exp.id} className="timeline-entry relative pl-11 sm:pl-16">
              {/* Timeline Node / Dot */}
              <div
                className="timeline-dot absolute left-2 sm:left-4 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full bg-(--color-surface) border-2 border-(--color-primary) flex items-center justify-center shadow-md z-10"
                aria-hidden="true"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-(--color-primary)" />
              </div>

              <Card hoverEffect className="timeline-card space-y-5 p-6 sm:p-7 rounded-2xl">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3.5 border-b border-(--color-border)">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Briefcase className="w-4 h-4 text-(--color-primary)" />
                      {/* Titles weight 600 */}
                      <h3 className="font-sans font-semibold text-lg sm:text-xl text-(--color-text)">
                        {exp.role}
                      </h3>
                    </div>
                    <div className="text-sm font-medium text-(--color-primary)">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-(--color-muted)">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-(--color-surface-2) border border-(--color-border)">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-(--color-surface-2) border border-(--color-border)">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Highlights with comfortable spacing (8 to 12px) */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-(--color-muted) mb-3">
                    Key Architectural Responsibilities
                  </h4>
                  {/* Descriptions weight 400 at full readable contrast, 10px spacing */}
                  <ul className="space-y-2.5">
                    {exp.highlights.map((hl, hIdx) => (
                      <li
                        key={hIdx}
                        className="flex items-start gap-2.5 text-sm font-normal text-(--color-text) leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Chips: small Poppins 500 (13px) */}
                <div className="pt-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-(--color-muted) mb-2.5">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="inline-flex items-center px-2.5 py-1 rounded-md bg-(--color-surface-2) text-(--color-text) border border-(--color-border) text-[13px] font-sans font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Freelance Project Showcase */}
                {exp.id === 'freelance-developer' &&
                  portfolioData.freelanceProjects.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-(--color-border)">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-(--color-muted) mb-3">
                        <FolderGit2 className="w-3.5 h-3.5 text-(--color-secondary)" />
                        <span>Delivered Client Deployments</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {portfolioData.freelanceProjects.map((p, pIdx) => (
                          <div
                            key={pIdx}
                            className="p-3.5 rounded-xl bg-(--color-surface-2) border border-(--color-border)"
                          >
                            <div className="text-sm font-sans font-semibold text-(--color-text) mb-1">
                              {p.title}
                            </div>
                            <p className="text-xs font-normal text-(--color-muted) mb-2.5 leading-relaxed">
                              {p.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {p.techStack.map((t, idx) => (
                                <span
                                  key={idx}
                                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-(--color-surface) text-(--color-text) border border-(--color-border)"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
