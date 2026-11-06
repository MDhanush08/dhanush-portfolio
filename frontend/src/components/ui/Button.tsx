import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'text' | 'lime'
  size?: 'sm' | 'md' | 'lg'
  to?: string
  href?: string
  download?: boolean | string
  icon?: ReactNode
  children: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      to,
      href,
      download,
      icon,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'group inline-flex items-center justify-center font-medium tracking-tight rounded-[2px] cursor-pointer select-none transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2'

    const sizeClasses = {
      sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
      md: 'text-sm px-4 py-2.5 gap-2 h-10',
      lg: 'text-base px-6 py-3.5 gap-2.5 h-12',
    }[size]

    const variantClasses = {
      primary:
        'bg-[var(--ink)] text-[var(--bg)] border border-[var(--ink)] hover:bg-[#A8E600] hover:text-[#14110D] hover:border-[#A8E600]',
      outline:
        'bg-transparent text-[var(--ink)] border border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg)]',
      lime:
        'bg-[#A8E600] text-[#14110D] border border-[#A8E600] hover:bg-[var(--ink)] hover:text-[var(--bg)] hover:border-[var(--ink)]',
      text:
        'bg-transparent text-[var(--ink)] p-0 h-auto hover:underline hover:decoration-2 hover:underline-offset-4 gap-1.5',
    }[variant]

    const combinedClasses = cn(
      baseClasses,
      variant !== 'text' && sizeClasses,
      variantClasses,
      className
    )

    if (to) {
      return (
        <Link to={to} className={combinedClasses}>
          <span>{children}</span>
          {icon && <span className="shrink-0 transition-transform duration-200">{icon}</span>}
        </Link>
      )
    }

    if (href) {
      return (
        <a
          href={href}
          download={download}
          className={combinedClasses}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          <span>{children}</span>
          {icon && <span className="shrink-0 transition-transform duration-200">{icon}</span>}
        </a>
      )
    }

    return (
      <button ref={ref} className={combinedClasses} {...props}>
        <span>{children}</span>
        {icon && <span className="shrink-0 transition-transform duration-200">{icon}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'
