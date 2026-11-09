import { useState, memo } from 'react'
import { GraduationCap, Award, BookOpen, School, ArrowRight } from 'lucide-react'
import { Section } from '../layout/Section'
import { SectionHeading } from '../layout/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { educationData, languageData } from '../../data/portfolio'
import { cn } from '../../lib/cn'

export const Education = memo(function Education() {
  const [activeId, setActiveId] = useState(educationData[0].id)
  const activeItem = educationData.find((item) => item.id === activeId) || educationData[0]

  const getIcon = (id: string) => {
    switch (id) {
      case 'btech':
      case 'hsc':
        return <GraduationCap className="w-5 h-5 text-[#14110D]" />
      case 'sslc':
        return <School className="w-5 h-5 text-[#14110D]" />
      case 'ccna':
        return <Award className="w-5 h-5 text-[#14110D]" />
      case 'udemy':
      default:
        return <BookOpen className="w-5 h-5 text-[#14110D]" />
    }
  }

  const formalEducation = educationData.filter((e) => e.section === 'formal')
  const certifications = educationData.filter((e) => e.section === 'certification')

  return (
    <Section id="education" bg="paper" borderTop>
      <Reveal>
        <SectionHeading
          label="EDUCATION"
          line1="The path that"
          line2="brought me here."
          intro="A few milestones in my learning journey."
        />
      </Reveal>

      {/* Two columns from 900px */}
      <div className="grid grid-cols-1 min-[900px]:grid-cols-2 gap-10 lg:gap-16 items-start mb-16">
        {/* Left: 5 interactive rows organized into Formal Academics and Certifications */}
        <Reveal className="flex flex-col border-t border-[var(--line)]">
          {/* Formal Academics Header */}
          <div className="pt-3 pb-2 px-4 md:px-5 border-b border-[var(--line)] flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[var(--muted)] font-semibold bg-[var(--surface)]/40 select-none">
            <span>Formal Education</span>
          </div>

          {formalEducation.map((item) => {
            const isActive = activeId === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                onMouseEnter={() => setActiveId(item.id)}
                aria-pressed={isActive}
                className={cn(
                  'w-full text-left py-5 px-4 md:px-5 border-b border-[var(--line)] flex items-center justify-between gap-4 transition-colors duration-200 cursor-pointer rounded-[2px]',
                  isActive
                    ? 'bg-[var(--accent-soft)]'
                    : 'bg-transparent hover:bg-[var(--bg-alt)]/50'
                )}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--muted)]">
                    {item.category}
                  </span>
                  <span className="text-base md:text-lg font-semibold text-[var(--ink)] tracking-tight">
                    {item.title}
                  </span>
                  <span className="text-xs text-[var(--muted)]">
                    {item.institution}
                  </span>
                </div>

                <div className="shrink-0 pl-2">
                  <ArrowRight
                    className={cn(
                      'w-4 h-4 transition-transform duration-200',
                      isActive
                        ? 'translate-x-1 text-[var(--ink)]'
                        : 'text-[var(--muted)]/40'
                    )}
                  />
                </div>
              </button>
            )
          })}

          {/* Certifications & Courses Header */}
          <div className="pt-4 pb-2 px-4 md:px-5 border-b border-[var(--line)] flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[var(--muted)] font-semibold bg-[var(--surface)]/40 select-none">
            <span>Certifications & Courses</span>
          </div>

          {certifications.map((item) => {
            const isActive = activeId === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                onMouseEnter={() => setActiveId(item.id)}
                aria-pressed={isActive}
                className={cn(
                  'w-full text-left py-5 px-4 md:px-5 border-b border-[var(--line)] flex items-center justify-between gap-4 transition-colors duration-200 cursor-pointer rounded-[2px]',
                  isActive
                    ? 'bg-[var(--accent-soft)]'
                    : 'bg-transparent hover:bg-[var(--bg-alt)]/50'
                )}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--muted)]">
                    {item.category}
                  </span>
                  <span className="text-base md:text-lg font-semibold text-[var(--ink)] tracking-tight">
                    {item.title}
                  </span>
                  <span className="text-xs text-[var(--muted)]">
                    {item.institution}
                  </span>
                </div>

                <div className="shrink-0 pl-2">
                  <ArrowRight
                    className={cn(
                      'w-4 h-4 transition-transform duration-200',
                      isActive
                        ? 'translate-x-1 text-[var(--ink)]'
                        : 'text-[var(--muted)]/40'
                    )}
                  />
                </div>
              </button>
            )
          })}
        </Reveal>

        {/* Right: Detail Card with Cross-Fade */}
        <Reveal delayMs={100} className="w-full">
          <div className="relative w-full min-h-[340px] p-8 md:p-10 bg-[var(--bg-alt)] border border-[var(--line)] rounded-[2px] overflow-hidden flex flex-col justify-between shadow-xs">
            {/* Dynamic card content */}
            <div
              key={activeItem.id}
              className="relative z-10 flex flex-col gap-6 transition-opacity duration-200 ease-out text-left"
            >
              <div className="flex items-center justify-between">
                {/* Lime square with icon */}
                <div className="w-12 h-12 rounded-[2px] bg-[#A8E600] flex items-center justify-center shrink-0 shadow-xs">
                  {getIcon(activeItem.id)}
                </div>

                {/* Bordered chip */}
                {activeItem.periodOrProvider && (
                  <span className="px-3 py-1 text-xs font-mono font-medium border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] rounded-[2px]">
                    {activeItem.periodOrProvider}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--muted)]">
                  {activeItem.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-semibold text-[var(--ink)] tracking-tight">
                  {activeItem.title}
                </h3>
                <p className="text-base text-[var(--ink)] font-semibold">
                  {activeItem.institution}
                </p>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {activeItem.context}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* LANGUAGES Strip */}
      <Reveal>
        <div className="w-full border-t border-[var(--line)] pt-8 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12 text-left">
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
            LANGUAGES
          </span>

          <div className="flex flex-wrap items-center gap-6 md:gap-10">
            {languageData.map((lang, idx) => (
              <div key={lang.name} className="flex items-center gap-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-semibold text-[var(--ink)]">
                    {lang.name}
                  </span>
                  <span className="text-sm text-[var(--muted)]">
                    — {lang.level}
                  </span>
                </div>
                {idx < languageData.length - 1 && (
                  <div className="hidden sm:block w-[1px] h-4 bg-[var(--line)]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  )
})
