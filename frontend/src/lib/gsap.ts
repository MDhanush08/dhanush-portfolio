import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

// Register plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

  // Set global defaults
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.7,
    force3D: true,
  });

  // Call ScrollTrigger.refresh() when fonts are fully loaded
  if (document.fonts) {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
