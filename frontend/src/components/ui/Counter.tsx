import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import { cn } from '../../lib/utils';

export interface CounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export const Counter: React.FC<CounterProps> = ({
  end,
  prefix = '',
  suffix = '',
  duration = 1.4,
  className,
}) => {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!counterRef.current) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: end,
          duration,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: counterRef.current,
            start: 'top 90%',
            once: true,
          },
          onUpdate: () => {
            setDisplayValue(Math.round(obj.val));
          },
        });
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        setDisplayValue(end);
      });
    },
    { scope: counterRef, dependencies: [end, duration] }
  );

  return (
    <span ref={counterRef} className={cn('tabular-nums font-display', className)}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};
