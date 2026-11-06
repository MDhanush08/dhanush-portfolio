import React from 'react';
import { Reveal } from './Reveal';
import { cn } from '../../lib/utils';

export interface SplitHeadingProps {
  number?: string;
  kicker?: string;
  title: string;
  accent?: string;
  titleEnd?: string;
  description?: string;
  className?: string;
}

export const SplitHeading: React.FC<SplitHeadingProps> = ({
  number,
  kicker,
  title,
  accent,
  titleEnd,
  description,
  className,
}) => {
  const fullTitle = accent
    ? `${title} ${accent}${titleEnd ? ` ${titleEnd}` : ''}`
    : title;

  return (
    <Reveal className={cn('mb-10 sm:mb-14 text-left w-full', className)}>
      {/* Small mono label above: left-aligned */}
      {(number || kicker) && (
        <div className="flex items-center gap-2 mb-2.5 text-xs font-mono text-(--color-primary) tracking-wider uppercase">
          {number && <span className="font-semibold">{number}</span>}
          {number && kicker && <span className="text-(--color-muted)/60">/</span>}
          {kicker && <span className="text-(--color-muted) font-medium">{kicker}</span>}
        </div>
      )}

      {/* Main H2: Left-aligned on every screen, Poppins 600, text-wrap: balance, max-width ~24ch */}
      <h2
        className="font-sans font-semibold text-(--color-text) tracking-[-0.02em] leading-[1.2]"
        style={{
          fontSize: 'clamp(1.75rem, 1.2rem + 2.4vw, 3rem)',
          maxWidth: '24ch',
          textWrap: 'balance',
        }}
      >
        {fullTitle}
      </h2>

      {/* Optional intro paragraph: left-aligned, max-width ~60ch */}
      {description && (
        <p className="mt-3 sm:mt-3.5 text-sm sm:text-base text-(--color-muted) leading-relaxed max-w-[60ch]">
          {description}
        </p>
      )}
    </Reveal>
  );
};
