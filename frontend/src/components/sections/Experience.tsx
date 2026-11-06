import { memo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Section } from '../layout/Section'
import { SectionHeading } from '../layout/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { experienceData } from '../../data/portfolio'

export const Experience = memo(function Experience() {
  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Section id="experience" bg="paper-alt" borderTop>
      <Reveal>
        <SectionHeading
          index="03"
          label="EXPERIENCE"
          line1="Making ideas"
          line2="work harder."
          intro="Product-minded engineering across SaaS, billing and client applications."
        />
      </Reveal>

      {/* Experience rows */}
      <div className="flex flex-col border-t border-[var(--line)]">
        {experienceData.map((item, idx) => (
          <Reveal
            key={item.title}
            delayMs={idx * 100}
            className="py-10 md:py-14 border-b border-[var(--line)] grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[260px_1fr] gap-6 md:gap-10 text-left items-start"
          >
            {/* Dates column */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono uppercase tracking-[0.08em] font-semibold text-[var(--muted)]">
                {item.dates}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[var(--muted)] font-medium">
                {item.label}
              </span>
            </div>

            {/* Content column */}
            <div className="flex flex-col gap-6">
              {/* Header row with Title, Company & Projects Button */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <h3 className="text-2xl md:text-3xl font-semibold text-[var(--ink)] tracking-tight">
                    {item.title}
                  </h3>
                  {item.company && (
                    <span className="text-base font-medium text-[var(--muted)]">
                      {item.company}
                    </span>
                  )}
                </div>

                {!item.isFreelance && (
                  <button
                    type="button"
                    onClick={scrollToWork}
                    aria-label="See projects"
                    className="w-10 h-10 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] flex items-center justify-center hover:bg-[#A8E600] hover:text-[#14110D] hover:border-[#A8E600] transition-colors cursor-pointer shrink-0"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Sub-entries (for full-time work with specific products) */}
              {item.subEntries && (
                <div className="flex flex-col border-t border-[var(--line)] mt-2">
                  {item.subEntries.map((sub) => (
                    <div
                      key={sub.key}
                      className="py-6 border-b border-[var(--line)] last:border-b-0 flex flex-col gap-3"
                    >
                      <div className="flex flex-col gap-1">
                        {sub.slug ? (
                          <Link
                            to={`/projects/${sub.slug}`}
                            className="group inline-flex items-center gap-2 w-fit text-lg md:text-xl font-semibold text-[var(--ink)] tracking-tight"
                          >
                            <span className="relative">
                              {sub.title}
                              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--ink)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
                            </span>
                            <ArrowUpRight className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--ink)] group-hover:rotate-45 transition-transform" />
                          </Link>
                        ) : (
                          <h4 className="text-lg md:text-xl font-semibold text-[var(--ink)]">
                            {sub.title}
                          </h4>
                        )}
                        <span className="text-xs text-[var(--muted)] font-medium">
                          {sub.roleSubtitle}
                        </span>
                      </div>

                      {/* Bullets */}
                      <ul className="flex flex-col gap-2 my-1 pl-4 list-disc text-sm md:text-base text-[var(--muted)] leading-relaxed">
                        {sub.bullets.map((bullet, bIdx) => (
                          <li key={bIdx}>{bullet}</li>
                        ))}
                      </ul>

                      {/* Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {sub.chips.map((chip) => (
                          <span
                            key={chip}
                            className="px-2 py-0.5 text-[11px] border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] rounded-[2px]"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Description and Chips for Freelance / standard entries */}
              {item.description && (
                <p className="text-base text-[var(--muted)] leading-relaxed">
                  {item.description}
                </p>
              )}

              {item.chips && (
                <div className="flex flex-wrap gap-1.5">
                  {item.chips.map((chip) => (
                    <span
                      key={chip}
                      className="px-2.5 py-1 text-[12px] border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] rounded-[2px]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
})
