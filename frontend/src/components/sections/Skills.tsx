import React, { useRef } from 'react';
import { Section } from '../layout/Section';
import { SplitHeading } from '../ui/SplitHeading';
import { Card } from '../ui/Card';
import { SkillIcon } from '../ui/SkillIcon';
import { portfolioData } from '../../data/portfolio';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';

// Row 1 Marquee items
const MARQUEE_ROW_1 = [
  { name: 'Angular', iconName: 'SiAngular' },
  { name: 'React.js', iconName: 'SiReact' },
  { name: 'NestJS', iconName: 'SiNestjs' },
  { name: 'TypeScript', iconName: 'SiTypescript' },
  { name: 'GraphQL', iconName: 'SiGraphql' },
  { name: 'Hasura', iconName: 'SiHasura' },
  { name: 'PostgreSQL', iconName: 'SiPostgresql' },
  { name: 'Redis', iconName: 'SiRedis' },
];

// Row 2 Marquee items
const MARQUEE_ROW_2 = [
  { name: 'Docker', iconName: 'SiDocker' },
  { name: 'GitLab CI/CD', iconName: 'SiGitlab' },
  { name: 'Tailwind CSS', iconName: 'SiTailwindcss' },
  { name: 'Node.js', iconName: 'SiNodedotjs' },
  { name: 'Stripe', iconName: 'SiStripe' },
  { name: 'Firebase', iconName: 'SiFirebase' },
  { name: 'Antigravity', iconName: 'TbSparkles' },
  { name: 'Gemini API', iconName: 'SiGoogle' },
];

export const Skills: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (!gridRef.current) return;

        const groupCards = gridRef.current.querySelectorAll('.skill-group-card');

        // Animate cards staggering in
        gsap.fromTo(
          groupCards,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        if (gridRef.current) {
          const allEls = gridRef.current.querySelectorAll('.skill-group-card');
          allEls.forEach((el) => {
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
    <Section ref={containerRef} id="skills">
      {/* Clean left-aligned heading with exact requested title */}
      <SplitHeading
        number="02"
        kicker="Skills"
        title="Tools I work with"
        description="A full-stack toolkit for architecting reliable APIs, reactive interfaces, and automated pipelines."
      />

      {/* Two-row logo marquee moving in opposite directions (transform-only, paused on hover) */}
      <div className="mb-12 space-y-3 overflow-hidden select-none">
        {/* Row 1: Left */}
        <div className="relative w-full overflow-hidden py-1">
          <div className="flex w-max shrink-0 gap-3.5 animate-marquee-slide hover:[animation-play-state:paused]">
            <div className="flex shrink-0 items-center gap-3.5">
              {MARQUEE_ROW_1.map((tech, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-(--color-surface-2) border border-(--color-border) text-xs font-mono text-(--color-text) shadow-xs"
                >
                  <SkillIcon name={tech.iconName} className="w-4 h-4 text-(--color-primary)" />
                  <span className="font-medium whitespace-nowrap">{tech.name}</span>
                </div>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-3.5" aria-hidden="true">
              {MARQUEE_ROW_1.map((tech, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-(--color-surface-2) border border-(--color-border) text-xs font-mono text-(--color-text) shadow-xs"
                >
                  <SkillIcon name={tech.iconName} className="w-4 h-4 text-(--color-primary)" />
                  <span className="font-medium whitespace-nowrap">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Right */}
        <div className="relative w-full overflow-hidden py-1">
          <div className="flex w-max shrink-0 gap-3.5 animate-marquee-reverse hover:[animation-play-state:paused]">
            <div className="flex shrink-0 items-center gap-3.5">
              {MARQUEE_ROW_2.map((tech, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-(--color-surface-2) border border-(--color-border) text-xs font-mono text-(--color-text) shadow-xs"
                >
                  <SkillIcon name={tech.iconName} className="w-4 h-4 text-(--color-secondary)" />
                  <span className="font-medium whitespace-nowrap">{tech.name}</span>
                </div>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-3.5" aria-hidden="true">
              {MARQUEE_ROW_2.map((tech, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-(--color-surface-2) border border-(--color-border) text-xs font-mono text-(--color-text) shadow-xs"
                >
                  <SkillIcon name={tech.iconName} className="w-4 h-4 text-(--color-secondary)" />
                  <span className="font-medium whitespace-nowrap">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grouped Cards Grid - Auto-fit minmax(280px, 1fr) for fluid scaling across wide screens */}
      <div ref={gridRef} className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
        {portfolioData.skillGroups.map((group, groupIdx) => (
          <Card
            key={groupIdx}
            hoverEffect
            className="skill-group-card flex flex-col justify-between p-5 sm:p-6 rounded-2xl"
          >
            <div>
              <div className="pb-3 mb-4 border-b border-(--color-border)">
                <h3 className="font-sans font-semibold text-base sm:text-lg text-(--color-text)">
                  {group.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-(--color-surface-2) text-(--color-text) border border-(--color-border) text-xs font-sans font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-(--color-primary) cursor-default"
                  >
                    <SkillIcon name={skill.iconName} className="w-3.5 h-3.5 text-(--color-primary)" />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};
