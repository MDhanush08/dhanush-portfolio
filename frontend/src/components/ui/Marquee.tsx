import React from 'react';
import { cn } from '../../lib/utils';

export interface MarqueeProps {
  children: React.ReactNode;
  speedSeconds?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  speedSeconds = 30,
  pauseOnHover = true,
  className,
}) => {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden select-none py-3',
        className
      )}
    >
      {/* Left/Right subtle fade gradient edges using CSS radial/linear */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-(--color-bg) to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-(--color-bg) to-transparent" />

      <div
        className={cn(
          'flex w-max shrink-0 gap-6 animate-marquee-slide',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
        style={{
          animationDuration: `${speedSeconds}s`,
        }}
      >
        <div className="flex shrink-0 items-center gap-6">{children}</div>
        <div className="flex shrink-0 items-center gap-6" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};
