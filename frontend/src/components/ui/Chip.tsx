import React from 'react';
import { cn } from '../../lib/utils';

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'outline' | 'badge' | 'status';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

export const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'default',
  size = 'md',
  icon,
  className,
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1 gap-1.5 rounded-[6px]',
    md: 'text-xs sm:text-sm px-3 py-1.5 gap-2 rounded-[8px]',
  };

  const variantStyles = {
    default:
      'bg-(--color-surface-2) text-(--color-text) border border-(--color-border)',
    primary:
      'bg-(--color-primary)/10 text-(--color-primary) border border-(--color-primary)/25 font-medium',
    outline:
      'bg-transparent text-(--color-muted) border border-(--color-border) hover:border-(--color-primary)/40',
    badge:
      'bg-amber-500/10 text-amber-500 border border-amber-500/20 font-medium',
    status:
      'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-mono transition-colors duration-150 select-none',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
