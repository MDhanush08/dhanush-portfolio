import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const Button = React.forwardRef<HTMLElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      href,
      download,
      target,
      rel,
      icon,
      iconPosition = 'left',
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary) disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

    const sizeStyles = {
      sm: 'min-h-[40px] px-3.5 py-1.5 text-xs rounded-[8px] gap-1.5',
      md: 'min-h-[44px] px-5 py-2.5 text-sm rounded-[10px] gap-2',
      lg: 'min-h-[50px] px-6 py-3 text-base rounded-[12px] gap-2.5',
    };

    const variantStyles = {
      primary:
        'bg-gradient-to-r from-(--color-primary) to-(--color-secondary) text-white shadow-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:opacity-95',
      secondary:
        'bg-(--color-surface-2) text-(--color-text) border border-(--color-border) hover:border-(--color-primary) hover:bg-(--color-surface) hover:-translate-y-0.5 active:translate-y-0 shadow-sm',
      outline:
        'bg-transparent text-(--color-text) border border-(--color-border) hover:border-(--color-primary) hover:text-(--color-primary) hover:-translate-y-0.5 active:translate-y-0',
      ghost:
        'bg-transparent text-(--color-muted) hover:text-(--color-text) hover:bg-(--color-surface-2) active:opacity-90',
    };

    const combinedClassName = cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      className
    );

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          download={download}
          target={target}
          rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
          className={combinedClassName}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={props.type || 'button'}
        disabled={disabled}
        className={combinedClassName}
        {...props}
      >
        {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
