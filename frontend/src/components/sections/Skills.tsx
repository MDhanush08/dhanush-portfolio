import { portfolioData } from '../../data/portfolio';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';
import { Marquee } from '../ui/Marquee';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { SkillIcon } from '../ui/SkillIcon';

export function Skills() {
  const { skillGroups, allSkillsList } = portfolioData;

  return (
    <Section id="skills" className="pb-16">
      <SectionHeading
        badge="TECHNICAL ARSENAL"
        title="Comprehensive Tech Stack &"
        highlight="Domain Expertise"
        description="A proven set of production-tested technologies, frameworks, databases, and DevOps workflows honed over 2+ years."
      />

      {/* Infinite Tech Marquee */}
      <div className="mb-14">
        <Marquee items={allSkillsList} speed={40} />
      </div>

      {/* Grouped Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillGroups.map((group, groupIdx) => (
          <Reveal key={group.id} delay={groupIdx * 0.08}>
            <Card className="h-full flex flex-col justify-between p-6 bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-primary)]/40 transition-all">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold font-heading text-[var(--color-text)]">
                    {group.title}
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[var(--color-surface-2)] text-[var(--color-muted)]">
                    {group.skills.length} skills
                  </span>
                </div>

                <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-5">
                  {group.description}
                </p>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group/item flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 transition-colors"
                    >
                      <span className="text-[var(--color-primary)] transition-transform group-hover/item:scale-110">
                        <SkillIcon name={skill.iconName} className="w-4 h-4" />
                      </span>
                      <span className="text-xs font-mono text-[var(--color-text)] whitespace-nowrap">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
