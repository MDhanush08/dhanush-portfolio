import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const posRef = useRef({
    mouseX: -100,
    mouseY: -100,
    ringX: -100,
    ringY: -100,
  });

  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if device supports hover and fine pointer
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReducedMotion) return;

    const onMouseMove = (e: MouseEvent) => {
      posRef.current.mouseX = e.clientX;
      posRef.current.mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('a') ||
          target.closest('button') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          target.closest('.interactive'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const render = () => {
      const pos = posRef.current;
      // Smooth lerp for outer ring
      pos.ringX += (pos.mouseX - pos.ringX) * 0.18;
      pos.ringY += (pos.mouseY - pos.ringY) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.ringX}px, ${pos.ringY}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer follow ring */}
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed top-0 left-0 -ml-4 -mt-4 z-50 rounded-full border border-[var(--color-secondary)]/50 transition-size duration-150 ease-out will-change-transform ${
          isHovered
            ? 'w-12 h-12 -ml-6 -mt-6 bg-[var(--color-primary)]/10 border-[var(--color-primary)]'
            : 'w-8 h-8'
        }`}
        style={{
          boxShadow: isHovered
            ? '0 0 20px rgba(99, 102, 241, 0.3)'
            : '0 0 10px rgba(34, 211, 238, 0.2)',
        }}
      />
      {/* Center pinpoint dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[var(--color-primary)] z-50 will-change-transform"
      />
    </>
  );
}
