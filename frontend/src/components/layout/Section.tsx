import React from 'react';
import { cn } from '../../lib/utils';
import { Container } from './Container';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  containerSize?: 'default' | 'narrow' | 'wide';
  noContainer?: boolean;
}

export function Section({
  id,
  children,
  className,
  containerSize = 'default',
  noContainer = false,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative py-20 md:py-28 lg:py-32 scroll-mt-20 overflow-hidden',
        className
      )}
      {...props}
    >
      {noContainer ? (
        children
      ) : (
        <Container size={containerSize}>{children}</Container>
      )}
    </section>
  );
}
