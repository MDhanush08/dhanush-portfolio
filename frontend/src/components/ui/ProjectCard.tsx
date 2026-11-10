import { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowUpRight,
  ExternalLink,
  ArrowRight,
  Smartphone,
  Globe,
  Monitor,
  Cpu,
  Sparkles,
  Layout,
  Lock,
} from 'lucide-react'
import { FaGithub } from 'react-icons/fa6'
import type { Project } from '../../types'
import { ProjectVisual } from './ProjectVisual'
import { Reveal } from './Reveal'
import { cn } from '../../lib/cn'

interface ProjectCardProps {
  project: Project
  idx?: number
  stagger?: boolean
  className?: string
  priority?: boolean
}

/**
 * Returns a clean category badge (icon + label) based on project category / visual type.
 * Matches the reference card top tag style (e.g. Mobile, AI / ML, Web, SaaS).
 */
function getCategoryBadge(project: Project) {
  const cat = (project.category || '').toLowerCase()
  const visual = project.visual

  if (visual === 'metals' || cat.includes('mobile')) {
    return {
      icon: Smartphone,
      label: 'Mobile',
    }
  }
  if (visual === 'emotion' || cat.includes('ai') || cat.includes('college')) {
    return {
      icon: Cpu,
      label: 'AI / ML',
    }
  }
  if (visual === 'viralforge') {
    return {
      icon: Sparkles,
      label: 'AI / Web',
    }
  }
  if (visual === 'dental') {
    return {
      icon: Globe,
      label: 'SaaS',
    }
  }
  if (visual === 'cms') {
    return {
      icon: Layout,
      label: 'Web',
    }
  }
  return {
    icon: Monitor,
    label: 'Web',
  }
}

export const ProjectCard = memo(function ProjectCard({
  project,
  idx = 0,
  className,
  priority = false,
}: ProjectCardProps) {
  const navigate = useNavigate()
  const maxChips = 4
  const displayedChips = project.cardChips.slice(0, maxChips)
  const remainingCount = project.cardChips.length - maxChips

  const badge = getCategoryBadge(project)
  const BadgeIcon = badge.icon

  const hasGithub = Boolean(
    project.links?.github &&
    project.links.github !== '[url]' &&
    project.links.github.trim() !== ''
  )
  const hasLive = Boolean(
    project.links?.live &&
    project.links.live !== '[url]' &&
    project.links.live.trim() !== ''
  )

  // Clicking anywhere on the card redirects to project details unless clicking code/live link
  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a, button')) {
      return
    }
    navigate(`/projects/${project.slug}`)
  }

  return (
    <Reveal
      delayMs={idx * 70}
      className={cn('w-full h-full flex flex-col', className)}
    >
      <div
        onClick={handleCardClick}
        className="group relative flex flex-col h-full w-full bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-[clamp(20px,2.4vw,28px)] transition-all duration-200 hover:border-[var(--ink)]/40 hover:shadow-sm text-left cursor-pointer"
      >
        {/* 1. TOP-LEFT TYPE CHIP: 1px border using --chip-border, background --chip-bg, text --chip-text, font weight 600, 13px, padding 6px 12px, icon using same text color */}
        <div className="flex items-center justify-between gap-2 mb-[18px]">
          <div className="inline-flex items-center gap-1.5 px-[12px] py-[6px] rounded-full text-[13px] font-semibold border border-[var(--chip-border)] bg-[var(--chip-bg)] text-[var(--chip-text)] w-fit leading-none select-none">
            <BadgeIcon className="w-3.5 h-3.5 text-[var(--chip-text)] shrink-0" />
            <span>{badge.label}</span>
          </div>
        </div>

        {/* 2. VISUAL PANEL: aspect-ratio 16/9, padding 0, overflow hidden, 1px var(--line) border, background var(--bg-alt), radius equal to card's inner radius */}
        <Link
          to={`/projects/${project.slug}`}
          tabIndex={-1}
          aria-hidden="true"
          className="block w-full aspect-[16/9] rounded-xl overflow-hidden border border-[var(--line)] bg-[var(--bg-alt)] p-0 relative select-none shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2"
        >
          <div className="w-full h-full transition-transform duration-300 ease-out group-hover:scale-[1.03]">
            <ProjectVisual
              type={project.visual}
              screenshot={project.screenshots?.[0]}
              alt={project.screenshotAlt || project.title}
              title={project.title}
              priority={priority}
            />
          </div>
        </Link>

        {/* 3. TITLE: 24px gap from image panel, text 24px weight 600, line-height 1.2 */}
        <h3 className="text-[24px] font-semibold text-[var(--ink)] tracking-tight leading-[1.2] mt-[24px]">
          <Link
            to={`/projects/${project.slug}`}
            className="hover:underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2 rounded-[2px]"
          >
            {project.title}
          </Link>
        </h3>

        {/* 4. DESCRIPTION: 10px gap from title, line-height 1.6, 2-line clamp */}
        <p className="text-sm sm:text-[15px] text-[var(--muted)] line-clamp-2 leading-[1.6] mt-[10px]">
          {project.shortDescription}
        </p>

        {/* 5. TECH CHIPS ROW: 18px gap from description, mt-auto pushes chips & footer to bottom of equal-height cards; gap 8px, padding 6px 12px, 13px text, readable border; 20px gap to divider */}
        <div className="mt-auto pt-[18px] mb-[20px] flex flex-wrap items-center gap-[8px]">
          {displayedChips.map((tech) => (
            <span
              key={tech}
              className="px-[12px] py-[6px] text-[13px] font-normal border border-[var(--line)] bg-[var(--bg-alt)] text-[var(--ink)] rounded-full leading-none"
            >
              {tech}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="px-[12px] py-[6px] text-[13px] font-mono border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] rounded-full leading-none">
              +{remainingCount}
            </span>
          )}
        </div>

        {/* 6. FOOTER ROW: 16px padding-top below divider, 0 extra bottom padding */}
        <div className="pt-[16px] pb-0 border-t border-[var(--line)] flex items-center justify-between gap-3">
          {/* Left: Code & Live Demo links when available, or View Details for redirect-only projects */}
          {hasGithub || hasLive ? (
            <div className="flex items-center gap-4 flex-wrap">
              {hasGithub && (
                <a
                  href={project.links!.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--ink)] hover:underline transition-colors focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2 rounded-[2px]"
                >
                  <FaGithub className="w-4 h-4 shrink-0 text-[var(--ink)]" />
                  <span>Code</span>
                </a>
              )}
              {hasLive && (
                <a
                  href={project.links!.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--ink)] hover:underline transition-colors focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2 rounded-[2px]"
                >
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 text-[var(--ink)]" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          ) : (
            <Link
              to={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--muted)] hover:text-[var(--ink)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2 rounded-[2px]"
            >
              {project.badge.toLowerCase().includes('private') ? (
                <>
                  <Lock className="w-3.5 h-3.5 opacity-60 shrink-0" />
                  <span>Private Project</span>
                </>
              ) : (
                <>
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </>
              )}
            </Link>
          )}

          {/* Right: Lime [ ↗ ] button redirecting to project details */}
          <Link
            to={`/projects/${project.slug}`}
            aria-label={`View details for ${project.title}`}
            className="w-8 h-8 rounded-lg bg-[#A8E600] text-[#14110D] flex items-center justify-center transition-all duration-200 hover:scale-105 hover:bg-[#b8f500] shadow-xs shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2"
          >
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </Reveal>
  )
})
