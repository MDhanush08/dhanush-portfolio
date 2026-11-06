import React from 'react';
import { cn } from '../../lib/utils';

export interface SectionHeadingProps {
  kicker?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  titleHighlight,
  description,
  align = 'center',
  className,
}) => {
  return (
    <div
      className={cn(
        'mb-10 sm:mb-14',
        align === 'center' ? 'text-center mx-auto' : 'text-left',
        'max-w-2xl',
        className
      )}
    >
      {kicker && (
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-mono font-medium rounded-full bg-(--color-primary)/10 text-(--color-primary) border border-(--color-primary)/20 tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-(--color-primary)" />
          {kicker}
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-tight text-(--color-text)">
        {title}{' '}
        {titleHighlight && (
          <span className="bg-gradient-to-r from-(--color-primary) to-(--color-secondary) bg-clip-text text-transparent">
            {titleHighlight}
          </span>
        )}
      </h2>

      {description && (
        <p className="mt-3.5 sm:mt-4 text-base sm:text-lg text-(--color-muted) leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
