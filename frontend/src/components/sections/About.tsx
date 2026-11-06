import { memo } from 'react'
import {
  ArrowRight,
  FileDown,
  MapPin,
  Layout,
  Server,
  Database,
  Cloud,
  Wrench,
  Cpu,
} from 'lucide-react'
import { Section } from '../layout/Section'
import { SectionHeading } from '../layout/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { profile, skillCategories } from '../../data/portfolio'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  layout: Layout,
  server: Server,
  database: Database,
  cloud: Cloud,
  wrench: Wrench,
  cpu: Cpu,
}

export const About = memo(function About() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Section id="about" bg="paper" borderTop>
      <Reveal>
        <SectionHeading
          index="02"
          label="A BIT ABOUT ME"
          line1="Good software"
          line2="starts with curiosity."
          intro="From secure APIs to thoughtful interfaces, I enjoy working across the full stack and making complex things feel simple."
        />
      </Reveal>

      {/* Two columns from 900px */}
      <div className="grid grid-cols-1 min-[900px]:grid-cols-2 gap-12 lg:gap-20 items-start mb-20 lg:mb-28">
        {/* Left column */}
        <Reveal className="flex flex-col gap-6">
          <p className="text-[clamp(1.375rem,1rem+1.4vw,2rem)] font-medium text-[var(--ink)] leading-[1.35] tracking-tight">
            I'm a software developer with{' '}
            <span className="bg-[#A8E600] text-[#14110D] px-2 py-0.5 rounded-[2px] [box-decoration-break:clone] font-semibold">
              {profile.aboutHighlight}
            </span>{' '}
            building secure, scalable web applications.
          </p>

          <p className="text-base md:text-[17px] text-[var(--muted)] leading-[1.7]">
            {profile.aboutBio}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <button
              type="button"
              onClick={scrollToContact}
              className="group inline-flex items-center gap-2 text-base font-medium text-[var(--ink)] hover:underline hover:decoration-2 hover:underline-offset-4 cursor-pointer"
            >
              <span>Start a conversation</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <a
              href={profile.resumeUrl}
              download="Dhanush_M_Resume.pdf"
              className="group inline-flex items-center gap-2 text-base font-medium text-[var(--ink)] hover:underline hover:decoration-2 hover:underline-offset-4 cursor-pointer"
            >
              <span>Download résumé</span>
              <FileDown className="w-4 h-4 text-[#A8E600] transition-transform duration-200 group-hover:translate-y-0.5" />
            </a>
          </div>
        </Reveal>

        {/* Right column: 3 numbered rows + location row */}
        <Reveal delayMs={100} className="flex flex-col border-t border-[var(--line)]">
          {profile.aboutHighlights.map((item) => (
            <div
              key={item.number}
              className="py-5 border-b border-[var(--line)] flex items-start gap-4 text-left"
            >
              <span className="text-xs font-mono text-[var(--muted)] pt-1 select-none">
                {item.number}
              </span>
              <div className="flex flex-col gap-1">
                <h4 className="text-base md:text-lg font-semibold text-[var(--ink)]">
                  {item.title}
                </h4>
                <p className="text-sm text-[var(--muted)]">{item.detail}</p>
              </div>
            </div>
          ))}

          {/* Location row */}
          <div className="py-5 border-b border-[var(--line)] flex items-center gap-3 text-sm font-medium text-[var(--ink)]">
            <MapPin className="w-4 h-4 text-[#A8E600] shrink-0" />
            <span>Based in Tiruchirappalli, Tamil Nadu</span>
          </div>
        </Reveal>
      </div>

      {/* TOOLS OF THE TRADE Section */}
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-[var(--line)] mb-6">
          <span className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--muted)]">
            TOOLS OF THE TRADE
          </span>
          <span className="text-xs text-[var(--muted)]">
            A broad toolkit, used with purpose.
          </span>
        </div>

        {/* 6 Category Cells Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 min-[900px]:grid-cols-3 border-t border-l border-[var(--line)]">
          {skillCategories.map((cat) => {
            const IconComponent = ICON_MAP[cat.iconName] || Layout

            return (
              <div
                key={cat.title}
                className="p-6 md:p-7 border-r border-b border-[var(--line)] bg-[var(--surface)] flex flex-col gap-4 text-left"
              >
                {/* Header with Icon and Title */}
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-[2px] bg-[var(--bg-alt)] border border-[var(--line)] flex items-center justify-center text-[var(--ink)]">
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-sm font-semibold tracking-tight text-[var(--ink)]">
                    {cat.title}
                  </h4>
                </div>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-[12px] font-normal border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] rounded-[2px] transition-colors duration-150 hover:bg-[var(--ink)] hover:text-[var(--bg)] hover:border-[var(--ink)] select-none"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Reveal>
    </Section>
  )
})
