import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delayMs = 0,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const noObserver = typeof IntersectionObserver === 'undefined';
      return prefersReduced || noObserver;
    }
    return false;
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-[opacity,transform] duration-400 ease-out motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100',
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-3',
        className
      )}
      style={{
        transitionDelay: delayMs > 0 ? `${delayMs}ms` : undefined,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
