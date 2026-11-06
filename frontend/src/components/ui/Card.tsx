import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'surface' | 'surface-2';
  hoverEffect?: boolean;
  padded?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'surface',
      hoverEffect = false,
      padded = true,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[16px] border transition-all duration-200',
          variant === 'surface'
            ? 'bg-(--color-surface) border-(--color-border)'
            : 'bg-(--color-surface-2) border-(--color-border)',
          hoverEffect &&
            'hover:-translate-y-1 hover:border-(--color-primary)/50 hover:shadow-md cursor-default',
          padded && 'p-5 sm:p-6 lg:p-7',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
