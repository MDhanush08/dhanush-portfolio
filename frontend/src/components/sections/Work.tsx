import { memo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Section } from '../layout/Section'
import { SectionHeading } from '../layout/SectionHeading'
import { ProjectCard } from '../ui/ProjectCard'
import { Reveal } from '../ui/Reveal'
import { projects } from '../../data/portfolio'

export const Work = memo(function Work() {
  const featuredProjects = projects.filter((p) => p.featured)

  return (
    <Section id="work" bg="paper-alt" borderTop>
      <Reveal>
        <SectionHeading
          label="SELECTED WORK"
          line1="Built for the"
          line2="real world."
          intro="A selection of real-world applications, professional projects, and personal work that reflects my development experience."
        />
      </Reveal>

      {/* Grid of 4 cards: 2 columns from 900px with a subtle, balanced stagger offset */}
      <div className="grid grid-cols-1 min-[900px]:grid-cols-2 gap-x-[clamp(24px,3.5vw,48px)] gap-y-[clamp(36px,5vw,60px)] items-start">
        {featuredProjects.map((project, idx) => (
          <ProjectCard
            key={project.slug}
            project={project}
            idx={idx}
            stagger
          />
        ))}
      </div>

      {/* Bottom CTA to All Projects */}
      <Reveal delayMs={150} className="mt-12 md:mt-16 flex flex-col items-start gap-3 text-left">
        <p className="text-sm md:text-[15px] text-[var(--muted)]">
          Showing selected work. See everything I've built.
        </p>
        <Link
          to="/projects"
          className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-[2px] font-medium text-sm sm:text-base border border-[var(--ink)] bg-transparent text-[var(--ink)] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#A8E600] [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#14110D] [@media(hover:hover)_and_(pointer:fine)]:hover:border-[#A8E600] transition-colors duration-200 cursor-pointer w-full sm:w-auto"
        >
          <span>View all projects</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-[3px] [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-[3px]" />
        </Link>
      </Reveal>
    </Section>
  )
})
