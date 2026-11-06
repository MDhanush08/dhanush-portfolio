import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from '../../lib/gsap';

export interface BackToTopProps {
  sentinelId?: string;
  className?: string;
}

export const BackToTop: React.FC<BackToTopProps> = ({
  sentinelId = 'top-sentinel',
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const circleRef = useRef<SVGCircleElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // IntersectionObserver for visibility past 400px
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const sentinel = document.getElementById(sentinelId);
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [sentinelId]);

  // ScrollTrigger to update circular progress ring stroke-dashoffset
  useGSAP(
    () => {
      const circumference = 2 * Math.PI * 18; // radius 18 -> ~113.1

      const trigger = ScrollTrigger.create({
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          if (circleRef.current) {
            const offset = circumference * (1 - self.progress);
            circleRef.current.style.strokeDashoffset = `${offset}`;
          }
        },
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: buttonRef }
  );

  const scrollToTop = () => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  const circumference = 2 * Math.PI * 18;

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Scroll back to top"
      className={cn(
        'fixed right-5 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-(--color-surface) text-(--color-text) border border-(--color-border) shadow-xl cursor-pointer transition-all duration-300 hover:text-(--color-primary) hover:-translate-y-1 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)',
        'bottom-22 sm:bottom-24',
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-3 pointer-events-none',
        className
      )}
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)',
      }}
    >
      {/* SVG Circular Scroll Progress Ring */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
        viewBox="0 0 44 44"
      >
        {/* Background track circle */}
        <circle
          cx="22"
          cy="22"
          r="18"
          className="stroke-(--color-border)"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Animated Progress circle */}
        <circle
          ref={circleRef}
          cx="22"
          cy="22"
          r="18"
          stroke="url(#btt-gradient)"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          fill="none"
          className="transition-[stroke-dashoffset] duration-75"
        />
        <defs>
          <linearGradient id="btt-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--secondary)" />
          </linearGradient>
        </defs>
      </svg>

      <ArrowUp className="w-4 h-4 transition-transform duration-200" aria-hidden="true" />
    </button>
  );
};
