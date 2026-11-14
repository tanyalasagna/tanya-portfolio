'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { PixelPill } from './PixelEdge';
import SparklePrompt from './SparklePrompt';

const BORDER = '0.5px solid var(--text)';

// The research artifacts in a row under the paragraph.
// Clicking any of them opens it full screen over a blurred page with a "Close" pill at the top right.
export default function ArtifactGallery({ images }: { images: string[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const [shown, setShown] = useState(false); // drives the fade, set a frame after mounting

  useEffect(() => {
    if (!open) { setShown(false); return; }
    const raf = requestAnimationFrame(() => setShown(true));
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null); };
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const thumb = (src: string) => (
    <button
      type="button"
      key={src}
      onClick={() => setOpen(src)}
      aria-label="Expand artifact"
      className="block w-full p-0 bg-transparent"
      style={{ cursor: 'zoom-in', border: 'none' }}
      data-cuelume-open=""
      data-cuelume-emphasis="subtle"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="w-full" style={{ display: 'block', border: BORDER }} />
    </button>
  );

  return (
    <>
      <SparklePrompt className="mb-4">Click artifacts to expand</SparklePrompt>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
        {images.map(thumb)}
      </div>

      {open && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Expanded artifact"
          onClick={() => setOpen(null)}
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
            onClick={() => setOpen(null)}
            aria-label="Close"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 inline-flex items-center gap-1.5 border-0 bg-transparent text-[15px] sm:text-[16px]"
            style={{ position: 'absolute', padding: '8px 12px', color: '#FFFFFF', fontFamily: 'var(--font-dm-sans)', cursor: 'pointer' }}
            data-cuelume-close=""
            data-cuelume-emphasis="subtle"
          >
            <PixelPill fill="#383636" stroke="#FFFFFF" strokeWidth={0.3} />
            <span style={{ position: 'relative' }}>Close</span>
            <X size={16} strokeWidth={1.5} aria-hidden style={{ position: 'relative' }} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={open}
            alt=""
            onClick={e => e.stopPropagation()}
            style={{ display: 'block', maxWidth: '100vw', maxHeight: '100vh', background: '#FFFFFF', border: BORDER }}
          />
        </div>,
        document.body,
      )}
    </>
  );
}
