import React from 'react';
import { Container } from './Container';
import { cn } from '../../lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  children: React.ReactNode;
  containerSize?: 'default' | 'narrow' | 'wide' | 'full';
  className?: string;
  containerClassName?: string;
  background?: React.ReactNode;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      id,
      children,
      containerSize = 'default',
      className,
      containerClassName,
      background,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        id={id}
        // scroll-mt-20 accounts for the ~64px fixed navbar; py-[clamp(64px,9vw,144px)] provides fluid vertical rhythm
        className={cn(
          'relative w-full py-[clamp(64px,9vw,144px)] scroll-mt-20 overflow-clip',
          className
        )}
        {...props}
      >
        {background}
        <Container size={containerSize} className={containerClassName}>
          {children}
        </Container>
      </section>
    );
  }
);

Section.displayName = 'Section';
