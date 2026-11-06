import { memo, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface ChipProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'muted' | 'accent'
  onClick?: () => void
}

export const Chip = memo(function Chip({
  children,
  className,
  variant = 'default',
  onClick,
}: ChipProps) {
  const variantStyles = {
    default:
      'border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg)] hover:border-[var(--ink)]',
    muted:
      'border border-[var(--line)] bg-[var(--bg-alt)] text-[var(--muted)] hover:bg-[var(--ink)] hover:text-[var(--bg)]',
    accent:
      'border border-[#A8E600] bg-[#A8E600]/15 text-[var(--ink)] font-medium',
  }[variant]

  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex items-center px-2.5 py-1 text-[12px] font-normal rounded-[2px] tracking-normal transition-colors duration-150 select-none whitespace-nowrap',
        variantStyles,
        className
      )}
    >
      {children}
    </span>
  )
})
