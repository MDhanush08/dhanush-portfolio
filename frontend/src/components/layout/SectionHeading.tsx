import { memo } from 'react'
import { cn } from '../../lib/cn'

interface SectionHeadingProps {
  label: string
  line1: string
  line2: string
  intro?: string
  className?: string
}

export const SectionHeading = memo(function SectionHeading({
  label,
  line1,
  line2,
  intro,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'w-full mb-12 md:mb-16 lg:mb-20 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-x-10 gap-y-4 items-start text-left',
        className
      )}
    >
      {/* Main content column: Label + Two-line H2 */}
      <div className="flex flex-col gap-3 max-w-[860px]">
        <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--muted)]">
          {label}
        </span>
        <h2 className="text-[clamp(2.25rem,1rem+4.6vw,5rem)] font-semibold tracking-[-0.03em] leading-[1.04] [text-wrap:balance]">
          <span className="block text-[var(--ink)]">{line1}</span>
          <span className="block text-[var(--muted)] italic font-normal">{line2}</span>
        </h2>
      </div>

      {/* Top-right short intro paragraph */}
      {intro && (
        <div className="lg:max-w-[34ch] pt-1 text-[var(--muted)] text-base md:text-[17px] leading-[1.6]">
          <p className="max-w-[34ch]">{intro}</p>
        </div>
      )}
    </div>
  )
})
