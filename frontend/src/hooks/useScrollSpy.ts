import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds: string[], defaultSection: string = 'hero'): string {
  const [activeSection, setActiveSection] = useState<string>(defaultSection);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const visibleMap: Record<string, boolean> = {};

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleMap[entry.target.id] = entry.isIntersecting;
        });

        // Find the topmost visible section from our ordered sectionIds
        const active = sectionIds.find((id) => visibleMap[id]);
        if (active) {
          setActiveSection(active);
        }
      },
      {
        root: null,
        // Trigger when the element crosses the upper 20% to middle 60% of the viewport
        rootMargin: '-80px 0px -50% 0px',
        threshold: [0, 0.2, 0.5],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
}
