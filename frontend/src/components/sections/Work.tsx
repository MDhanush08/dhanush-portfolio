import { memo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Section } from '../layout/Section'
import { SectionHeading } from '../layout/SectionHeading'
import { ProjectVisual } from '../ui/ProjectVisual'
import { Reveal } from '../ui/Reveal'
import { projects } from '../../data/portfolio'
import { cn } from '../../lib/cn'

export const Work = memo(function Work() {
  return (
    <Section id="work" bg="paper-alt" borderTop>
      <Reveal>
        <SectionHeading
          index="01"
          label="SELECTED WORK"
          line1="Built for the"
          line2="real world."
          intro="A selection of product work, experiments and things I've made along the way."
        />
      </Reveal>

      {/* Grid of 4 cards: 2 columns from 900px with second column offset down by ~96px */}
      <div className="grid grid-cols-1 min-[900px]:grid-cols-2 gap-x-[clamp(24px,4vw,64px)] gap-y-[clamp(40px,6vw,96px)] items-start">
        {projects.map((project, idx) => {
          const isSecondColumn = idx % 2 === 1
          const displayedChips = project.cardChips.slice(0, 4)
          const remainingCount = project.cardChips.length - displayedChips.length

          return (
            <Reveal
              key={project.slug}
              delayMs={idx * 80}
              className={cn(
                'w-full',
                isSecondColumn && 'min-[900px]:mt-24'
              )}
            >
              <Link
                to={`/projects/${project.slug}`}
                className="group block w-full text-left rounded-[3px] focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-4"
              >
                {/* Visual Panel: 16/10 aspect ratio, 1px border, overflow hidden */}
                <div className="relative w-full aspect-[16/10] border border-[var(--line)] bg-[var(--surface)] overflow-hidden rounded-[2px] mb-5">
                  {/* Top-left index */}
                  <div className="absolute top-4 left-4 z-20 text-[11px] font-mono tracking-wider font-semibold text-[var(--ink)] bg-[var(--surface)]/90 px-2 py-0.5 border border-[var(--line)] rounded-[2px] select-none">
                    {project.index}
                  </div>

                  {/* Top-right circular arrow button */}
                  <div className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] flex items-center justify-center transition-all duration-300 group-hover:bg-[#A8E600] group-hover:text-[#14110D] group-hover:border-[#A8E600]">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                  </div>

                  {/* Visual Content (Scales to 1.03 on hover) */}
                  <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                    <ProjectVisual
                      type={project.visual}
                      screenshot={project.screenshots?.[0]}
                      alt={project.title}
                    />
                  </div>
                </div>

                {/* Content block below panel */}
                <div className="flex flex-col gap-2.5">
                  {/* Category and Tech Chips row */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--muted)]">
                      {project.category}
                    </span>

                    {/* Tech Chips */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {displayedChips.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[11px] font-normal border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] rounded-[2px]"
                        >
                          {tech}
                        </span>
                      ))}
                      {remainingCount > 0 && (
                        <span className="px-1.5 py-0.5 text-[11px] font-normal border border-[var(--line)] bg-[var(--bg)] text-[var(--muted)] rounded-[2px]">
                          +{remainingCount}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title with draw-in underline effect */}
                  <h3 className="relative w-fit text-[clamp(1.375rem,2vw,1.75rem)] font-medium text-[var(--ink)] tracking-tight leading-snug">
                    <span>{project.title}</span>
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--ink)] origin-left scale-x-0 transition-transform duration-240 group-hover:scale-x-100" />
                  </h3>

                  {/* Short description clamped to 2 lines */}
                  <p className="text-sm md:text-base text-[var(--muted)] line-clamp-2 leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
})
