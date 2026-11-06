import { useRef } from 'react';
import { Briefcase, Calendar, CheckCircle2, MapPin } from 'lucide-react';
import { portfolioData } from '../../data/portfolio';
import { gsap, useGSAP } from '../../lib/gsap';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';
import { Chip } from '../ui/Chip';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function Experience() {
  const { experiences } = portfolioData;
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const line = lineRef.current;
      const timeline = timelineRef.current;
      if (!line || !timeline) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timeline,
              start: 'top 70%',
              end: 'bottom 80%',
              scrub: 0.5,
            },
          }
        );
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(line, { scaleY: 1 });
      });
    },
    { scope: timelineRef }
  );

  return (
    <Section id="experience">
      <SectionHeading
        badge="CAREER MILESTONES"
        title="Professional Experience &"
        highlight="Track Record"
        description="Hands-on engineering roles where I delivered production SaaS platforms, scalable APIs, and automated CI/CD pipelines."
      />

      <div ref={timelineRef} className="relative max-w-4xl mx-auto">
        {/* Background Guide Line */}
        <div className="absolute left-4 md:left-8 top-4 bottom-4 w-0.5 bg-[var(--color-border)]" />

        {/* Dynamic Animated Drawing Line */}
        <div
          ref={lineRef}
          className="absolute left-4 md:left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-primary)] origin-top will-change-transform"
        />

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative pl-10 md:pl-20">
              {/* Timeline Node Dot */}
              <div className="absolute left-[9px] md:left-[25px] top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--color-bg)] border-2 border-[var(--color-primary)] z-10 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]" />
              </div>

              <Reveal delay={index * 0.15}>
                <Card className="p-6 md:p-8 bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-primary)]/40 transition-all shadow-md">
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-[var(--color-border)]">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20">
                          {exp.type}
                        </span>
                        <h3 className="text-xl font-bold font-heading text-[var(--color-text)]">
                          {exp.role}
                        </h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-[var(--color-muted)]">
                        <span className="flex items-center gap-1 text-[var(--color-text)] font-medium">
                          <Briefcase className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                          {exp.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[var(--color-muted)]" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-mono text-[var(--color-secondary)] bg-[var(--color-secondary)]/10 px-3 py-1 rounded-full border border-[var(--color-secondary)]/20 w-fit">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2.5 mb-6">
                    <p className="text-xs font-mono font-medium text-[var(--color-text)] uppercase tracking-wider">
                      Key Contributions:
                    </p>
                    {exp.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-xs text-[var(--color-muted)] leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-secondary)] shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack pills */}
                  <div className="pt-4 border-t border-[var(--color-border)] flex flex-wrap gap-1.5">
                    {exp.techStack.map((tech) => (
                      <Chip key={tech} label={tech} variant="default" size="sm" />
                    ))}
                  </div>
                </Card>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
