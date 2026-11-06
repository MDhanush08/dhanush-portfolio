import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, hover = true, glow = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 transition-all duration-300',
          hover &&
            'hover:-translate-y-1 hover:border-[var(--color-primary)]/50 hover:shadow-xl hover:shadow-[var(--color-primary)]/5',
          glow &&
            'before:absolute before:-inset-px before:rounded-2xl before:bg-gradient-to-r before:from-[var(--color-primary)]/20 before:to-[var(--color-secondary)]/20 before:-z-10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300',
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
