import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, SplitText } from '../../lib/gsap';
import { cn } from '../../lib/utils';

export interface SplitHeadingProps {
  number?: string;
  kicker?: string;
  title: string;
  accent?: string;
  titleEnd?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SplitHeading: React.FC<SplitHeadingProps> = ({
  number,
  kicker,
  title,
  accent,
  titleEnd,
  description,
  align = 'center',
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!headingRef.current) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const split = new SplitText(headingRef.current, {
          type: 'lines,words',
          linesClass: 'overflow-hidden leading-tight',
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true,
          },
        });

        // Animate section number/kicker
        if (metaRef.current) {
          tl.fromTo(
            metaRef.current,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
          );
        }

        // Animate split words/lines from mask
        tl.fromTo(
          split.words,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.03,
            ease: 'power3.out',
          },
          metaRef.current ? '-=0.3' : 0
        );

        // Animate optional description
        if (descRef.current) {
          tl.fromTo(
            descRef.current,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
            '-=0.4'
          );
        }

        return () => {
          split.revert();
        };
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        if (headingRef.current) headingRef.current.style.opacity = '1';
        if (metaRef.current) metaRef.current.style.opacity = '1';
        if (descRef.current) descRef.current.style.opacity = '1';
      });
    },
    { scope: containerRef, dependencies: [title, accent, titleEnd, description] }
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        'mb-12 sm:mb-16',
        align === 'center' ? 'text-center mx-auto' : 'text-left',
        'max-w-3xl',
        className
      )}
    >
      {/* Section Meta Pill / Index */}
      {(number || kicker) && (
        <div
          ref={metaRef}
          className={cn(
            'inline-flex items-center gap-2 mb-3.5 px-3 py-1 rounded-full bg-(--color-surface-2) border border-(--color-border) text-xs mono-tag text-(--color-muted)',
            align === 'center' ? 'mx-auto' : ''
          )}
        >
          {number && (
            <span className="font-semibold text-(--color-primary)">
              {number}
            </span>
          )}
          {number && kicker && <span className="opacity-40">/</span>}
          {kicker && <span>{kicker}</span>}
        </div>
      )}

      {/* Main Fluid Display Heading with Accent */}
      <h2
        ref={headingRef}
        className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-(--color-text) tracking-tight leading-[1.08]"
      >
        <span>{title} </span>
        {accent && (
          <span className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-(--color-primary) to-(--color-secondary) px-1 inline-block">
            {accent}
          </span>
        )}
        {titleEnd && <span> {titleEnd}</span>}
      </h2>

      {/* Description */}
      {description && (
        <p
          ref={descRef}
          className="mt-4 sm:mt-5 text-base sm:text-lg text-(--color-muted) leading-relaxed max-w-2xl mx-auto"
        >
          {description}
        </p>
      )}
    </div>
  );
};
