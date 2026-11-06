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
        const chips = gridRef.current.querySelectorAll('.skill-chip');

        // Animate cards staggering in
        gsap.fromTo(
          groupCards,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );

        // Animate chips popping in with short scale
        gsap.fromTo(
          chips,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.45,
            stagger: {
              each: 0.015,
              from: 'start',
            },
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        if (gridRef.current) {
          const allEls = gridRef.current.querySelectorAll('.skill-group-card, .skill-chip');
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
      <SplitHeading
        number="02"
        kicker="Technical Arsenal"
        title="Engineered with"
        accent="Versatility"
        titleEnd="& Precision"
        description="A battle-tested full-stack toolkit for architecting high-throughput APIs, reactive interfaces, and automated cloud pipelines."
      />

      {/* Two-row logo marquee moving in opposite directions (transform-only, paused on hover) */}
      <div className="mb-14 space-y-3 overflow-hidden select-none">
        {/* Row 1: Left */}
        <div className="relative w-full overflow-hidden py-1">
          <div className="flex w-max shrink-0 gap-4 animate-marquee-slide hover:[animation-play-state:paused]">
            <div className="flex shrink-0 items-center gap-4">
              {MARQUEE_ROW_1.map((tech, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-(--color-surface-2) border border-(--color-border) text-xs font-mono text-(--color-text) shadow-xs"
                >
                  <SkillIcon name={tech.iconName} className="w-4 h-4 text-(--color-primary)" />
                  <span className="font-medium whitespace-nowrap">{tech.name}</span>
                </div>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-4" aria-hidden="true">
              {MARQUEE_ROW_1.map((tech, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-(--color-surface-2) border border-(--color-border) text-xs font-mono text-(--color-text) shadow-xs"
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
          <div className="flex w-max shrink-0 gap-4 animate-marquee-reverse hover:[animation-play-state:paused]">
            <div className="flex shrink-0 items-center gap-4">
              {MARQUEE_ROW_2.map((tech, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-(--color-surface-2) border border-(--color-border) text-xs font-mono text-(--color-text) shadow-xs"
                >
                  <SkillIcon name={tech.iconName} className="w-4 h-4 text-(--color-secondary)" />
                  <span className="font-medium whitespace-nowrap">{tech.name}</span>
                </div>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-4" aria-hidden="true">
              {MARQUEE_ROW_2.map((tech, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-(--color-surface-2) border border-(--color-border) text-xs font-mono text-(--color-text) shadow-xs"
                >
                  <SkillIcon name={tech.iconName} className="w-4 h-4 text-(--color-secondary)" />
                  <span className="font-medium whitespace-nowrap">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grouped Cards Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioData.skillGroups.map((group, groupIdx) => (
          <Card
            key={groupIdx}
            hoverEffect
            className="skill-group-card flex flex-col justify-between p-6 rounded-2xl"
          >
            <div>
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-(--color-border)">
                <h3 className="font-display font-bold text-lg text-(--color-text)">
                  {group.category}
                </h3>
                <span className="text-xs font-mono text-(--color-muted) px-2.5 py-0.5 rounded-full bg-(--color-surface-2) border border-(--color-border)">
                  {group.skills.length} skills
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="skill-chip inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-(--color-surface-2) text-(--color-text) border border-(--color-border) text-xs font-mono transition-all duration-200 hover:-translate-y-1 hover:border-(--color-primary) cursor-default"
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
