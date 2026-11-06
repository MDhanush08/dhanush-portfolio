import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { cn } from '../../lib/utils';

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  scale?: number;
}

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  yOffset = 30,
  scale = 0.98,
}: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: yOffset,
            scale,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        // If reduced motion is requested, simply fade in immediately without translation
        gsap.set(el, { opacity: 1, y: 0, scale: 1 });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={cn('will-change-[transform,opacity]', className)}>
      {children}
    </div>
  );
}
