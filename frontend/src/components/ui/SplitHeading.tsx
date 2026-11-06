import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import { cn } from '../../lib/utils';

export interface SplitHeadingProps {
  number?: string;
  kicker?: string;
  title: string;
  accent?: string; // Optional backwards compatibility if passed
  titleEnd?: string; // Optional backwards compatibility if passed
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
  const containerRef = useRef<HTMLDivElement>(null);

  // The whole heading block fades up as one unit (opacity 0 to 1, y 24 to 0, 0.6s, power3.out, once: true)
  useGSAP(
    () => {
      if (!containerRef.current) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        if (containerRef.current) {
          containerRef.current.style.opacity = '1';
          containerRef.current.style.transform = 'none';
        }
      });
    },
    { scope: containerRef, dependencies: [title, description] }
  );

  const fullTitle = accent
    ? `${title} ${accent}${titleEnd ? ` ${titleEnd}` : ''}`
    : title;

  return (
    <div
      ref={containerRef}
      className={cn(
        'mb-10 sm:mb-14 text-left w-full',
        className
      )}
    >
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
    </div>
  );
};
