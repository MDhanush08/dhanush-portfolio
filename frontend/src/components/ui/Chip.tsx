import React from 'react';
import { cn } from '../../lib/utils';

export interface ChipProps {
  label: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'primary' | 'accent' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export function Chip({
  label,
  icon,
  variant = 'default',
  size = 'sm',
  className,
}: ChipProps) {
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-sm px-3.5 py-1.5 gap-2',
  };

  const variantClasses = {
    default:
      'bg-[var(--color-surface-2)] text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/40',
    primary:
      'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/25',
    accent:
      'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] border border-[var(--color-secondary)]/25',
    outline:
      'bg-transparent text-[var(--color-muted)] border border-[var(--color-border)] hover:text-[var(--color-text)]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-mono font-medium rounded-full transition-colors duration-150 select-none',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{label}</span>
    </span>
  );
}
