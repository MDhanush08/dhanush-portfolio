import React from 'react';
import { Section } from '../layout/Section';
import { SplitHeading } from '../ui/SplitHeading';
import { Card } from '../ui/Card';
import { SkillIcon } from '../ui/SkillIcon';
import { Reveal } from '../ui/Reveal';
import { portfolioData } from '../../data/portfolio';

export const Skills: React.FC = () => {
  return (
    <Section id="skills">
      {/* Clean left-aligned heading with exact requested title */}
      <SplitHeading
        number="02"
        kicker="Skills"
        title="Tools I work with"
        description="A full-stack toolkit for architecting reliable APIs, reactive interfaces, and automated pipelines."
      />

      {/* Grouped Cards Grid - Auto-fit minmax(280px, 1fr) for fluid scaling across wide screens */}
      <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
        {portfolioData.skillGroups.map((group, groupIdx) => (
          <Card
            key={groupIdx}
            hoverEffect
            className="flex flex-col justify-between p-5 sm:p-6 rounded-2xl"
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
      </Reveal>
    </Section>
  );
};
