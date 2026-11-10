import { memo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../../types'
import { ProjectVisual } from './ProjectVisual'
import { Reveal } from './Reveal'
import { cn } from '../../lib/cn'

interface ProjectCardProps {
  project: Project
  idx?: number
  stagger?: boolean
  className?: string
}

export const ProjectCard = memo(function ProjectCard({
  project,
  idx = 0,
  stagger = false,
  className,
}: ProjectCardProps) {
  const isSecondColumn = idx % 2 === 1
  const displayedChips = project.cardChips.slice(0, 4)

  return (
    <Reveal
      delayMs={idx * 70}
      className={cn(
        'w-full',
        stagger && isSecondColumn && 'min-[900px]:mt-10 lg:min-[900px]:mt-12',
        className
      )}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="group block w-full text-left rounded-[3px] focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-4"
      >
        {/* Visual Panel: 16/10 aspect ratio, clean border, subtle shadow, 200-300ms hover */}
        <div className="relative w-full aspect-[16/10] border border-[var(--line)] bg-[var(--surface)] overflow-hidden rounded-[2px] mb-4 shadow-xs transition-colors duration-250 group-hover:border-[var(--ink)]/40">
          {/* Top-right circular arrow button */}
          <div className="absolute top-3.5 right-3.5 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] flex items-center justify-center transition-all duration-250 group-hover:bg-[#A8E600] group-hover:text-[#14110D] group-hover:border-[#A8E600] shadow-xs">
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-45" />
          </div>

          {/* Visual Content (Scales to 1.03 on hover smoothly) */}
          <div className="w-full h-full transition-transform duration-300 ease-out group-hover:scale-[1.03]">
            <ProjectVisual
              type={project.visual}
              screenshot={project.screenshots?.[0]}
              alt={project.title}
              title={project.title}
            />
          </div>
        </div>

        {/* Content block below panel */}
        <div className="flex flex-col gap-2.5">
          {/* Category and Tech Chips row */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
              {project.category}
            </span>

            {/* Tech Chips (3-4 primary technology tags) */}
            <div className="flex flex-wrap items-center gap-1.5">
              {displayedChips.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[11px] font-normal border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] rounded-[2px]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Title with subtle hover underline */}
          <h3 className="relative w-fit text-[clamp(1.25rem,1.8vw,1.625rem)] font-semibold text-[var(--ink)] tracking-tight leading-snug">
            <span>{project.title}</span>
            <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--ink)] origin-left scale-x-0 transition-transform duration-250 group-hover:scale-x-100" />
          </h3>

          {/* Short description clamped to 2 lines for balanced cadence */}
          <p className="text-sm md:text-[15px] text-[var(--muted)] line-clamp-2 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>
      </Link>
    </Reveal>
  )
})
