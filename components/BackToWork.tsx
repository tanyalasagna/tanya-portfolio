'use client';
import Link from 'next/link';
import { play } from 'cuelume';
import { ArrowLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { projects } from '@/data/projects';
import { startCoverTransition } from './CoverTransition';

export default function BackToWork({ className = '' }: { className?: string }) {
  const pathname = usePathname();

  // The cover settles back into its thumbnail on the home page
  const shrinkCover = (e: React.MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const slug = pathname.startsWith('/work/') ? pathname.split('/')[2] : null;
    const project = projects.find(p => p.slug === slug);
    const cover = document.querySelector<HTMLElement>('[data-case-cover]');
    if (!project || !project.thumbnail || !cover) return;
    const r = cover.getBoundingClientRect();
    // Only worth doing if the cover is still on screen
    if (r.bottom < 120 || r.top > window.innerHeight - 120) return;
    startCoverTransition({
      slug: project.slug,
      rect: { left: r.left, top: r.top, width: r.width, height: r.height },
      src: project.thumbnail,
      isVideo: /\.(mp4|webm|mov)$/i.test(project.thumbnail),
      time: cover.querySelector('video')?.currentTime ?? 0,
      alt: project.title,
      direction: 'back',
    });
  };

  return (
    <Link
      href="/"
      className={`text-[15px] sm:text-[16px] lg:text-[17px] underline decoration-[1.5px] decoration-current underline-offset-[4px] hover:no-underline px-[2px] -mx-[2px] rounded-[2px] ${className}`}
      style={{
        fontFamily: 'var(--font-dm-sans)',
        fontWeight: 400,
        fontStyle: 'italic',
        color: 'var(--text-muted)',
        opacity: 0.6,
        lineHeight: 1,
        display: 'inline-block',
        width: 'fit-content',
      }}
      onClick={e => { shrinkCover(e); play('close', { theme: 'bubble', emphasis: 'subtle' }); }}
    >
      <ArrowLeft size={16} strokeWidth={1.5} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', position: 'relative', top: '-1px' }} />Back
    </Link>
  );
}
