import React from 'react';
import { cn } from '../../lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide' | 'full';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = 'default',
  ...props
}) => {
  const maxSizes = {
    narrow: 'max-w-4xl',
    default: 'max-w-[1680px]',
    wide: 'max-w-[1680px]',
    full: 'max-w-none',
  };

  return (
    <div
      className={cn(
        'w-full mx-auto px-[clamp(20px,5vw,96px)]',
        maxSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
