import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';

interface RevealOptions {
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  threshold?: number;
  selector?: string; // If targeting children within the container
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(options: RevealOptions = {}) {
  const containerRef = useRef<T>(null);
  const { y = 24, duration = 0.6, delay = 0, stagger = 0, selector } = options;

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const mm = gsap.matchMedia();

      // Only run motion animations if the user doesn't prefer reduced motion
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const targets = selector
          ? containerRef.current!.querySelectorAll(selector)
          : containerRef.current;

        if (!targets || (targets instanceof NodeList && targets.length === 0)) return;

        gsap.fromTo(
          targets,
          {
            opacity: 0,
            y,
          },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            stagger: stagger > 0 ? stagger : undefined,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              once: true,
            },
            onStart: () => {
              if (targets instanceof NodeList) {
                targets.forEach((el) => {
                  if (el instanceof HTMLElement) el.style.willChange = 'opacity, transform';
                });
              } else if (targets instanceof HTMLElement) {
                targets.style.willChange = 'opacity, transform';
              }
            },
            onComplete: () => {
              if (targets instanceof NodeList) {
                targets.forEach((el) => {
                  if (el instanceof HTMLElement) el.style.willChange = 'auto';
                });
              } else if (targets instanceof HTMLElement) {
                targets.style.willChange = 'auto';
              }
            },
          }
        );
      });

      // For reduced motion, ensure elements are immediately visible without motion
      mm.add('(prefers-reduced-motion: reduce)', () => {
        const targets = selector
          ? containerRef.current!.querySelectorAll(selector)
          : containerRef.current;
        if (targets instanceof NodeList) {
          targets.forEach((el) => {
            if (el instanceof HTMLElement) {
              el.style.opacity = '1';
              el.style.transform = 'none';
            }
          });
        } else if (targets instanceof HTMLElement) {
          targets.style.opacity = '1';
          targets.style.transform = 'none';
        }
      });
    },
    { scope: containerRef, dependencies: [y, duration, delay, stagger, selector] }
  );

  return containerRef;
}
