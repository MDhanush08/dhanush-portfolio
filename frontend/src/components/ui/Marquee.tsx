import { SkillIcon } from './SkillIcon';

export interface MarqueeItem {
  name: string;
  category?: string;
  iconName?: string;
}

export interface MarqueeProps {
  items: MarqueeItem[];
  direction?: 'left' | 'right';
  speed?: number; // seconds for a full loop
}

export function Marquee({ items, direction = 'left', speed = 35 }: MarqueeProps) {
  // Triple the array to ensure continuous loop without gaps on large screens
  const repeatedItems = [...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-4 select-none group">
      {/* Subtle fade masks on left and right edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-28 z-10 bg-gradient-to-r from-[var(--color-bg)] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-28 z-10 bg-gradient-to-l from-[var(--color-bg)] to-transparent" />

      <div
        className="flex w-max gap-4 animate-marquee group-hover:[animation-play-state:paused]"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {repeatedItems.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs transition-colors hover:border-[var(--color-primary)]/50"
          >
            {item.iconName && (
              <span className="text-[var(--color-primary)]">
                <SkillIcon name={item.iconName} className="w-4 h-4" />
              </span>
            )}
            <span className="text-sm font-mono font-medium text-[var(--color-text)] whitespace-nowrap">
              {item.name}
            </span>
            {item.category && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--color-surface-2)] text-[var(--color-muted)]">
                {item.category}
              </span>
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333333%);
          }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
