'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { play } from 'cuelume';
import { ArrowRight } from 'lucide-react';
import { projects, type Project } from '@/data/projects';

function pickTwoRandom<T>(items: T[]): T[] {
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 2);
}

export default function CaseStudyCarousel({ currentSlug, className = '', showLabel = true, align = 'start' }: { currentSlug: string; className?: string; showLabel?: boolean; align?: 'start' | 'end' }) {
  // Picked after mount so server and client render the same markup
  const [picks, setPicks] = useState<Project[]>([]);
  useEffect(() => {
    setPicks(pickTwoRandom(projects.filter((p) => p.slug !== currentSlug)));
  }, [currentSlug]);

  return (
    <div className={className} style={{ marginBottom: '8px', minHeight: showLabel ? '78px' : '48px' }}>
      {showLabel && <span className="text-[15px] sm:text-[16px] lg:text-[17px]" style={{
        display: 'block',
        color: 'var(--text-muted)',
        opacity: 0.6,
        fontFamily: 'var(--font-dm-sans)',
        fontStyle: 'italic',
        fontWeight: 400,
        paddingBottom: '8px',
        paddingLeft: '2px',
      }}>
        More work:
      </span>}
      <div className={`flex flex-col ${align === 'end' ? 'items-end' : ''}`} style={{ gap: '6px' }}>
        {picks.map((p) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            onClick={() => play('open', { theme: 'bubble', emphasis: 'subtle' })}
            className="text-[15px] sm:text-[16px] lg:text-[17px] underline decoration-[1.5px] decoration-current underline-offset-[4px] hover:no-underline px-[2px] -mx-[2px] rounded-[2px]"
            style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 400, fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.6, lineHeight: 1, display: 'inline-block', width: 'fit-content' }}
          >
            {p.displayTitle ?? p.title}<ArrowRight size={16} strokeWidth={1.5} style={{ display: 'inline', marginLeft: '6px', verticalAlign: 'middle', position: 'relative', top: '-1px' }} />
          </Link>
        ))}
      </div>
    </div>
  );
}
