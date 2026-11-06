import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Marquee } from '../ui/Marquee';
import { Reveal } from '../ui/Reveal';
import { SkillIcon } from '../ui/SkillIcon';
import { portfolioData } from '../../data/portfolio';

// Highlighted technologies for the top marquee bar
const MARQUEE_TECH = [
  { name: 'Angular', iconName: 'SiAngular' },
  { name: 'React.js', iconName: 'SiReact' },
  { name: 'NestJS', iconName: 'SiNestjs' },
  { name: 'Node.js', iconName: 'SiNodedotjs' },
  { name: 'TypeScript', iconName: 'SiTypescript' },
  { name: 'GraphQL', iconName: 'SiGraphql' },
  { name: 'Hasura', iconName: 'SiHasura' },
  { name: 'PostgreSQL', iconName: 'SiPostgresql' },
  { name: 'Redis', iconName: 'SiRedis' },
  { name: 'Docker', iconName: 'SiDocker' },
  { name: 'GitLab CI/CD', iconName: 'SiGitlab' },
  { name: 'Tailwind CSS', iconName: 'SiTailwindcss' },
  { name: 'GSAP', iconName: 'SiGreensock' },
  { name: 'Stripe', iconName: 'SiStripe' },
  { name: 'Firebase', iconName: 'SiFirebase' },
  { name: 'Antigravity', iconName: 'TbSparkles' },
];

export const Skills: React.FC = () => {
  return (
    <Section id="skills">
      <SectionHeading
        kicker="Technical Arsenal"
        title="Comprehensive"
        titleHighlight="Skills &amp; Technologies"
        description="A robust full-stack toolkit built for engineering reliable, high-throughput, and responsive web platforms."
      />

      {/* CSS Keyframe Marquee */}
      <div className="mb-14">
        <Marquee speedSeconds={35}>
          {MARQUEE_TECH.map((tech, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-4 py-2 rounded-[10px] bg-(--color-surface-2) border border-(--color-border) text-xs font-mono text-(--color-text) shadow-xs"
            >
              <SkillIcon name={tech.iconName} className="w-4 h-4 text-(--color-primary)" />
              <span className="font-medium whitespace-nowrap">{tech.name}</span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Grouped Skills Grid */}
      <Reveal stagger={0.08} selector=".skill-group-card">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.skillGroups.map((group, groupIdx) => (
            <Card
              key={groupIdx}
              hoverEffect
              className="skill-group-card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-(--color-border)">
                  <h3 className="font-heading font-bold text-base sm:text-lg text-(--color-text)">
                    {group.category}
                  </h3>
                  <span className="text-xs font-mono text-(--color-muted) px-2 py-0.5 rounded-full bg-(--color-surface-2) border border-(--color-border)">
                    {group.skills.length} skills
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-(--color-surface-2) text-(--color-text) border border-(--color-border) text-xs font-mono transition-colors hover:border-(--color-primary)/50"
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
      </Reveal>
    </Section>
  );
};
