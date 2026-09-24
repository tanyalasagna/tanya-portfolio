'use client';
import { useEffect, useState } from 'react';

const sections = ['problem', 'research', 'solution'] as const;

export default function CaseStudyNav() {
  const [active, setActive] = useState<string>('problem');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="flex flex-col gap-2.5">
      <span className="font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
        Case study
      </span>
      {sections.map((id) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            className="font-mono text-xs flex items-center gap-1.5 transition-opacity"
            style={{ color: isActive ? 'var(--text)' : 'var(--text-muted)', opacity: isActive ? 1 : 0.55 }}
          >
            {id}
            {isActive && <span>☆</span>}
          </a>
        );
      })}
    </div>
  );
}
