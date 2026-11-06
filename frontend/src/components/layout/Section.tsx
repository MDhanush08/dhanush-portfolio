import React from 'react';
import { Container } from './Container';
import { cn } from '../../lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  children: React.ReactNode;
  containerSize?: 'default' | 'narrow' | 'wide';
  className?: string;
  containerClassName?: string;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      id,
      children,
      containerSize = 'default',
      className,
      containerClassName,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        id={id}
        // scroll-mt-20 ensures that navigating to #id accounts for the ~64px sticky navbar
        className={cn(
          'relative w-full py-16 sm:py-20 lg:py-28 scroll-mt-20 overflow-hidden',
          className
        )}
        {...props}
      >
        <Container size={containerSize} className={containerClassName}>
          {children}
        </Container>
      </section>
    );
  }
);

Section.displayName = 'Section';
