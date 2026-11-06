import { cn } from '../../lib/utils';

export interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  highlight,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' ? 'text-center mx-auto max-w-2xl' : 'text-left max-w-2xl',
        className
      )}
    >
      {badge && (
        <div
          className={cn(
            'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide mb-3',
            'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/25'
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)] animate-pulse" />
          {badge}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text)]">
        {title}{' '}
        {highlight && (
          <span className="gradient-text">{highlight}</span>
        )}
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg text-[var(--color-muted)] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
