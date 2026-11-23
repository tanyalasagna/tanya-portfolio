'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { getCoverTransition } from './CoverTransition';

export default function CaseStudyContent({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  // Arrived from a thumbnail that is growing into the cover: leave the cover alone and start the rest a little later, as it lands
  const arriving = useRef(getCoverTransition() !== null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const kids = ref.current ? Array.from(ref.current.children) : [];
      kids.forEach((el, i) => {
        if (arriving.current && i === 0) return;
        // A blur filter forces the browser to re-paint the whole element every frame. That's fine for the cover and the title,
        // but the case study body is many screens tall and full of video, so it only fades (cheap, runs on the GPU).
        const tall = (el as HTMLElement).offsetHeight > window.innerHeight * 1.5;
        gsap.fromTo(
          el,
          tall ? { opacity: 0 } : { opacity: 0, filter: 'blur(6px)' },
          {
            opacity: 1,
            ...(tall ? {} : { filter: 'blur(0px)' }),
            duration: 0.65,
            ease: 'power2.out',
            delay: 0.05 + i * 0.1 + (arriving.current ? 0.55 : 0),
            // Don't leave `filter: blur(0px)` behind: it keeps the element on its own layer for good
            clearProps: 'filter,opacity',
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
