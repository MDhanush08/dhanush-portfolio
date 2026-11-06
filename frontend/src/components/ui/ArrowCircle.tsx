import { memo } from 'react'
import { ArrowUpRight, ArrowDownRight, ArrowRight } from 'lucide-react'
import { cn } from '../../lib/cn'

interface ArrowCircleProps {
  className?: string
  icon?: 'up-right' | 'down-right' | 'right'
  size?: 'sm' | 'md' | 'lg'
  filled?: boolean
}

export const ArrowCircle = memo(function ArrowCircle({
  className,
  icon = 'up-right',
  size = 'md',
  filled = false,
}: ArrowCircleProps) {
  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
  }[size]

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }[size]

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center shrink-0 border transition-all duration-300',
        sizeClasses,
        filled
          ? 'bg-[#A8E600] text-[#14110D] border-[#A8E600]'
          : 'bg-transparent text-[var(--ink)] border-[var(--line)] group-hover:bg-[#A8E600] group-hover:text-[#14110D] group-hover:border-[#A8E600]',
        className
      )}
    >
      {icon === 'up-right' && (
        <ArrowUpRight
          className={cn(
            iconSizes,
            'transition-transform duration-300 group-hover:rotate-45'
          )}
        />
      )}
      {icon === 'down-right' && (
        <ArrowDownRight
          className={cn(
            iconSizes,
            'transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5'
          )}
        />
      )}
      {icon === 'right' && (
        <ArrowRight
          className={cn(
            iconSizes,
            'transition-transform duration-300 group-hover:translate-x-1'
          )}
        />
      )}
    </div>
  )
})
