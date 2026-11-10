import { useEffect, useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '../components/layout/Container'
import { SectionHeading } from '../components/layout/SectionHeading'
import { ProjectCard } from '../components/ui/ProjectCard'
import { projects, profile } from '../data/portfolio'
import type { ProjectType } from '../types'
import { cn } from '../lib/cn'

interface TabItem {
  id: string
  label: string
  type?: ProjectType
}

const ALL_TABS: TabItem[] = [
  { id: 'all', label: 'All' },
  { id: 'company', label: 'Company', type: 'company' },
  { id: 'freelance', label: 'Freelance', type: 'freelance' },
  { id: 'personal', label: 'Personal', type: 'personal' },
  { id: 'college', label: 'College', type: 'college' },
]

export default function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const rawType = searchParams.get('type')?.toLowerCase() || 'all'

  // Only show a tab if at least one project has that type
  const availableTabs = useMemo(() => {
    return ALL_TABS.filter((tab) => {
      if (tab.id === 'all') return true
      return projects.some((p) => p.type === tab.type)
    })
  }, [])

  // Validate filter from query param, fallback to 'all' if invalid
  const activeTab = useMemo(() => {
    return availableTabs.some((t) => t.id === rawType) ? rawType : 'all'
  }, [rawType, availableTabs])

  // 150ms opacity fade transition for filtering
  const [displayedTab, setDisplayedTab] = useState(activeTab)
  const isFading = activeTab !== displayedTab

  useEffect(() => {
    if (activeTab !== displayedTab) {
      const timer = setTimeout(() => {
        setDisplayedTab(activeTab)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [activeTab, displayedTab])

  // Filter projects by displayed tab
  const filteredProjects = useMemo(() => {
    if (displayedTab === 'all') return projects
    return projects.filter((p) => p.type === displayedTab)
  }, [displayedTab])

  useEffect(() => {
    document.title = `All projects | ${profile.name}`
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        `Complete collection of software projects, freelance applications, and personal work built by ${profile.name}.`
      )
    }
  }, [])

  const handleTabClick = (tabId: string) => {
    if (tabId === activeTab) return
    const nextParams = new URLSearchParams(searchParams)
    if (tabId === 'all') {
      nextParams.delete('type')
    } else {
      nextParams.set('type', tabId)
    }
    setSearchParams(nextParams, { replace: true })
  }

  return (
    <main
      id="main-content"
      className="w-full min-h-screen bg-[var(--bg)] py-12 md:py-20 text-[var(--ink)]"
    >
      <Container className="max-w-[1520px]">
        {/* Editorial Heading Block */}
        <SectionHeading
          label="ALL WORK"
          line1="Everything I've"
          line2="built so far."
          intro="Company, freelance, personal and college projects in one place."
        />

        {/* Filter Tabs Row */}
        <div className="w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1 mb-10 md:mb-14 -mx-1 px-1">
          <div
            className="flex items-center gap-2.5 min-w-max"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {availableTabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-pressed={isActive}
                  onClick={() => handleTabClick(tab.id)}
                  className={cn(
                    'min-h-[44px] h-[44px] px-5 rounded-[2px] text-xs uppercase tracking-[0.08em] font-medium transition-all duration-150 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2',
                    isActive
                      ? 'bg-[var(--ink)] text-[var(--bg)] border border-[var(--ink)] font-semibold'
                      : 'bg-transparent text-[var(--ink)] border border-[var(--line)] hover:border-[var(--ink)] hover:bg-[var(--surface)]'
                  )}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Projects Grid: 3 columns from lg, 2 columns on md, 1 below */}
        <div
          className={cn(
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch auto-rows-fr [grid-auto-rows:1fr] mb-16 md:mb-24 transition-opacity duration-150 ease-in-out',
            isFading ? 'opacity-0' : 'opacity-100'
          )}
        >
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.slug}
              project={project}
              idx={idx}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-20 text-center text-[var(--muted)]">
            <p className="text-base">No projects found in this category.</p>
          </div>
        )}

        {/* Short CTA */}
        <div className="p-8 md:p-12 bg-[var(--bg-alt)] border border-[var(--line)] rounded-[2px] flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-xl md:text-2xl font-semibold text-[var(--ink)] tracking-tight">
              Have something in mind? Let's talk
            </h3>
            <p className="text-sm md:text-base text-[var(--muted)]">
              I'm open to conversations about software development, full-stack roles, and freelance projects.
            </p>
          </div>

          <Link
            to="/#contact"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-[var(--ink)] text-[var(--bg)] rounded-[2px] font-semibold text-sm hover:bg-[#A8E600] hover:text-[#14110D] transition-colors shrink-0 cursor-pointer w-full sm:w-auto"
          >
            <span>Start a conversation</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </main>
  )
}
