'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronUp } from 'lucide-react';
import { play } from 'cuelume';
import BackToWork from './BackToWork';
import CaseStudyCarousel from './CaseStudyCarousel';

export const CASE_STUDY_FOOTER_HEIGHT = 52;

export default function CaseStudyFooter() {
  const pathname = usePathname();
  const slug = pathname.startsWith('/work/') ? pathname.split('/')[2] : null;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!slug) return null;

  return (
    <div
      ref={ref}
      className="lg:hidden fixed left-0 right-0 bottom-0 z-40 flex flex-col px-4"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom)',
        background: 'var(--bg)',
        borderTop: '0.5px solid var(--divider)',
        borderTopLeftRadius: '6px',
        borderTopRightRadius: '6px',
        boxShadow: '0 -4px 18px rgba(0, 0, 0, 0.07)',
      }}
    >
      <div className="flex items-center justify-between" style={{ height: CASE_STUDY_FOOTER_HEIGHT }}>
      <BackToWork />

      <button
        type="button"
        onClick={() => { setOpen((v) => !v); play(open ? 'close' : 'open', { theme: 'bubble', emphasis: 'subtle' }); }}
        aria-expanded={open}
        aria-controls="more-case-studies"
        className="text-[15px] sm:text-[16px] underline decoration-[1.5px] decoration-current underline-offset-[4px] hover:no-underline"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 400,
          color: open ? 'var(--text)' : 'var(--text-muted)',
          opacity: open ? 1 : 0.6,
          fontStyle: 'italic',
          transition: 'color 200ms ease, opacity 200ms ease',
          lineHeight: 1,
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        More work
        <ChevronUp
          size={16}
          strokeWidth={1.5}
          aria-hidden
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 200ms ease' }}
        />
      </button>
      </div>

      {/* Grows the footer upward; kept mounted so the two random picks don't reshuffle on every open */}
      <div
        id="more-case-studies"
        aria-hidden={!open}
        inert={!open}
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          opacity: open ? 1 : 0,
          transition: 'grid-template-rows 320ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <CaseStudyCarousel currentSlug={slug} showLabel={false} align="end" className="pb-3" />
        </div>
      </div>
    </div>
  );
}
