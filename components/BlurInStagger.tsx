'use client';
import { Children, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// The same entrance as the thumbnails on the landing page: each child softly comes out of a blur and fades up, one after the other.
// Each child starts hidden (so nothing flashes before the animation runs) and the animation is skipped for visitors who prefer reduced motion.
const FROM = { opacity: 0, filter: 'blur(6px)' };
const TO = { opacity: 1, filter: 'blur(0px)', duration: 0.65, ease: 'power2.out' };

export default function BlurInStagger({ children, stagger = 0.12, delay = 0.05 }: { children: React.ReactNode; stagger?: number; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const kids = Array.from(el.children) as HTMLElement[];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      kids.forEach(k => { k.style.opacity = '1'; });
      return;
    }
    const ctx = gsap.context(() => {
      // Don't leave `filter: blur(0px)` behind: it would keep every child on its own layer for good
      gsap.fromTo(kids, FROM, { ...TO, stagger, delay, clearProps: 'filter' });
    });
    return () => ctx.revert();
  }, [stagger, delay]);

  return (
    <div ref={ref}>
      {Children.toArray(children).map((child, i) => (
        <div key={i} style={{ opacity: 0 }}>{child}</div>
      ))}
    </div>
  );
}
