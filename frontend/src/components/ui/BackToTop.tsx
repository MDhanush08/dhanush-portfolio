import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface BackToTopProps {
  sentinelId?: string;
  className?: string;
}

export const BackToTop: React.FC<BackToTopProps> = ({
  sentinelId = 'top-sentinel',
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const sentinel = document.getElementById(sentinelId);
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the sentinel is intersecting (user is within first 400px), hide button.
        // When it exits view, show the button.
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

  const scrollToTop = () => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className={cn(
        'fixed right-5 z-40 flex items-center justify-center w-11 h-11 rounded-full bg-(--color-surface-2) text-(--color-text) border border-(--color-border) shadow-md cursor-pointer transition-all duration-300 hover:border-(--color-primary) hover:text-(--color-primary) hover:-translate-y-1 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)',
        // Sits above the chatbot toggle button (which is at bottom-5)
        'bottom-20 sm:bottom-22',
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
      <ArrowUp className="w-5 h-5 transition-transform duration-200" aria-hidden="true" />
    </button>
  );
};
