import { type ReactNode, forwardRef } from 'react'
import { cn } from '../../lib/cn'
import { Container } from './Container'

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  containerClassName?: string
  bg?: 'paper' | 'paper-alt' | 'surface'
  borderTop?: boolean
  borderBottom?: boolean
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      id,
      children,
      className,
      containerClassName,
      bg = 'paper',
      borderTop = false,
      borderBottom = false,
    },
    ref
  ) => {
    const bgStyle =
      bg === 'paper-alt'
        ? 'bg-[var(--bg-alt)]'
        : bg === 'surface'
          ? 'bg-[var(--surface)]'
          : 'bg-[var(--bg)]'

    return (
      <section
        ref={ref}
        id={id}
        tabIndex={-1}
        className={cn(
          'w-full scroll-mt-[72px] py-[clamp(72px,9vw,144px)] outline-none',
          bgStyle,
          borderTop && 'border-t border-[var(--line)]',
          borderBottom && 'border-b border-[var(--line)]',
          className
        )}
      >
        <Container className={containerClassName}>{children}</Container>
      </section>
    )
  }
)

Section.displayName = 'Section'
