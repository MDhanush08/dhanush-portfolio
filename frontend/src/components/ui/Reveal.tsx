import React from 'react';
import { useReveal } from '../../hooks/useReveal';
import { cn } from '../../lib/utils';

export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  selector?: string;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  y = 24,
  duration = 0.6,
  delay = 0,
  stagger = 0,
  selector,
  className,
  ...props
}) => {
  const ref = useReveal<HTMLDivElement>({
    y,
    duration,
    delay,
    stagger,
    selector,
  });

  return (
    <div ref={ref} className={cn('w-full', className)} {...props}>
      {children}
    </div>
  );
};
