import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, SplitText, ScrollTrigger } from '../../lib/gsap';

export interface CinematicIntroProps {
  onIntroComplete?: () => void;
  onHeroStart?: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  onIntroComplete,
  onHeroStart,
}) => {
  const [shouldRender, setShouldRender] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const seen = sessionStorage.getItem('dhanush_intro_seen');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return !seen && !prefersReduced;
  });

  const [counterValue, setCounterValue] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const curtainBottomRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!shouldRender) {
      onIntroComplete?.();
      onHeroStart?.();
      return;
    }

    // Lock body scroll during intro
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [shouldRender, onIntroComplete, onHeroStart]);

  useGSAP(
    () => {
      if (!shouldRender || !containerRef.current || !nameRef.current) return;

      const split = new SplitText(nameRef.current, {
        type: 'chars',
        charsClass: 'inline-block overflow-hidden',
      });

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          sessionStorage.setItem('dhanush_intro_seen', 'true');
          setShouldRender(false);
          onIntroComplete?.();
          ScrollTrigger.refresh();
        },
      });
      tlRef.current = tl;

      const counterObj = { val: 0 };

      // 1. Counter and progress bar fill
      tl.to(counterObj, {
        val: 100,
        duration: 0.75,
        ease: 'power2.inOut',
        onUpdate: () => {
          setCounterValue(Math.round(counterObj.val));
        },
      });

      if (progressLineRef.current) {
        tl.fromTo(
          progressLineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.75, ease: 'power2.inOut' },
          0
        );
      }

      // 2. Character mask reveal for "Dhanush M"
      tl.fromTo(
        split.chars,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.04,
          ease: 'power3.out',
        },
        '-=0.15'
      );

      // 3. Subtitle fade in
      if (roleRef.current) {
        tl.fromTo(
          roleRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          '-=0.25'
        );
      }

      // Brief hold
      tl.to({}, { duration: 0.25 });

      // Call hero entrance slightly before curtains finish so it feels continuous
      tl.call(() => {
        onHeroStart?.();
      }, undefined, '+=0');

      // 4. Two curtains slide away (top slides up, bottom slides down or full curtain slide)
      tl.to(
        [curtainRef.current, curtainBottomRef.current],
        {
          yPercent: (i) => (i === 0 ? -100 : 100),
          duration: 0.85,
          ease: 'power4.inOut',
          stagger: 0,
        },
        '+=0.05'
      );

      // Fade out the container
      tl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.2,
          pointerEvents: 'none',
        },
        '-=0.2'
      );

      return () => {
        split.revert();
      };
    },
    { scope: containerRef, dependencies: [shouldRender] }
  );

  const handleSkip = () => {
    if (tlRef.current) {
      tlRef.current.progress(1);
    } else {
      document.body.style.overflow = '';
      sessionStorage.setItem('dhanush_intro_seen', 'true');
      setShouldRender(false);
      onIntroComplete?.();
      onHeroStart?.();
      ScrollTrigger.refresh();
    }
  };

  if (!shouldRender) return null;

  const formattedCounter = String(counterValue).padStart(3, '0');

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-label="Welcome cinematic intro"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Top Curtain Panel */}
      <div
        ref={curtainRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-[#0B0F19] border-b border-[#263045]/60 z-10"
      />
      {/* Bottom Curtain Panel */}
      <div
        ref={curtainBottomRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#0B0F19] border-t border-[#263045]/60 z-10"
      />

      {/* Center Cinematic Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-lg w-full">
        {/* Monospace Counter */}
        <div className="font-mono text-xs sm:text-sm text-[#22D3EE] tracking-widest mb-4">
          <span className="opacity-40">[ </span>
          <span>{formattedCounter}</span>
          <span className="opacity-40"> / 100 ]</span>
        </div>

        {/* Thin Progress Line */}
        <div className="w-48 sm:w-60 h-[2px] bg-[#1A2236] rounded-full overflow-hidden mb-8">
          <div
            ref={progressLineRef}
            className="w-full h-full bg-gradient-to-r from-[#6366F1] to-[#22D3EE]"
          />
        </div>

        {/* Name with SplitText Characters Mask */}
        <div className="overflow-hidden py-1">
          <h1
            ref={nameRef}
            className="font-display font-extrabold text-4xl sm:text-6xl text-[#E5E7EB] tracking-tight leading-none"
          >
            Dhanush <span className="text-[#6366F1]">M</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p
          ref={roleRef}
          className="mt-3 font-mono text-xs sm:text-sm uppercase tracking-widest text-[#9CA3AF]"
        >
          Software Developer
        </p>

        {/* Skip Button */}
        <button
          type="button"
          onClick={handleSkip}
          aria-label="Skip intro animation"
          className="absolute -bottom-24 right-0 sm:right-4 text-xs font-mono uppercase tracking-wider text-[#9CA3AF] hover:text-[#E5E7EB] px-3 py-1.5 rounded-full border border-[#263045] hover:border-[#6366F1] transition-colors cursor-pointer"
        >
          Skip Intro [Esc]
        </button>
      </div>
    </div>
  );
};
