'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { PixelPill } from './PixelEdge';

// Wraps anything (an image, a diagram) so clicking it opens a large version over a blurred page, with a "Close" pill at the top right.
// `hint` is a small line at the bottom right of what sits on the page. `children` is what sits on the page; `expanded` is what the overlay shows (defaults to the same thing).
export default function ClickToExpand({ children, expanded, label = 'Expand', hint, bordered = false }: { children: React.ReactNode; expanded?: React.ReactNode; label?: string; hint?: string; bordered?: boolean }) {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!open) { setShown(false); return; }
    const raf = requestAnimationFrame(() => setShown(true));
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        aria-label={label}
        onClick={() => setOpen(true)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(true); } }}
        style={{ cursor: 'zoom-in' }}
        data-cuelume-open=""
        data-cuelume-emphasis="subtle"
      >
        {bordered ? <div style={{ border: '0.5px solid var(--text)' }}>{children}</div> : children}
        {hint && (
          <div className="mt-2 text-right text-[14px] sm:text-[15px] lg:text-[16px]" style={{ fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.6 }}>
            {hint}
          </div>
        )}
      </div>

      {open && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={label}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background: 'rgba(255, 255, 255, 0.45)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            opacity: shown ? 1 : 0,
            // Inline on purpose: globals.css sets `* { transition: border-color }`, which beats Tailwind's transition utilities
            transition: 'opacity 250ms ease',
          }}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 inline-flex items-center gap-1.5 border-0 bg-transparent text-[15px] sm:text-[16px]"
            style={{ position: 'absolute', padding: '8px 12px', color: '#FFFFFF', fontFamily: 'var(--font-dm-sans)', cursor: 'pointer', zIndex: 1 }}
            data-cuelume-close=""
            data-cuelume-emphasis="subtle"
          >
            <PixelPill fill="#383636" stroke="#FFFFFF" strokeWidth={0.3} />
            <span style={{ position: 'relative' }}>Close</span>
            <X size={16} strokeWidth={1.5} aria-hidden style={{ position: 'relative' }} />
          </button>
          <div onClick={e => e.stopPropagation()} style={{ width: '85vw', maxHeight: '85vh', overflow: 'auto', cursor: 'default', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%' }}>{expanded ?? children}</div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
