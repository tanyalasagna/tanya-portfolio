'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function CaseStudyContent({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (ref.current?.children.length) {
        gsap.fromTo(
          ref.current.children,
          { opacity: 0, filter: 'blur(6px)' },
          { opacity: 1, filter: 'blur(0px)', duration: 0.65, ease: 'power2.out', stagger: 0.1, delay: 0.05 }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
