import { type ReactNode, forwardRef } from 'react'
import { cn } from '../../lib/cn'

interface ContainerProps {
  children: ReactNode
  className?: string
  id?: string
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, id }, ref) => {
    return (
      <div
        ref={ref}
        id={id}
        className={cn(
          'w-full mx-auto max-w-[1520px] px-[clamp(20px,5vw,80px)]',
          className
        )}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = 'Container'
