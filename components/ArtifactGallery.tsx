'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { PixelPill } from './PixelEdge';
import SparklePrompt from './SparklePrompt';

const BORDER = '0.5px solid var(--text)';

// The research artifacts in a row under the paragraph.
// Clicking any of them opens it full screen over a blurred page with a "Close" pill at the top right.
type Item = string | { src: string; alt?: string; caption?: string };

// `captionHint` puts a small hint at the bottom right of each image (use it instead of `prompt`).
// `images` can be plain URLs or { src, alt, caption }; `columns` is how many sit side by side from tablet up; `prompt` sets or hides the hint line.
export default function ArtifactGallery({ images, columns = 3, prompt = 'Click artifacts to expand', captionHint }: { images: Item[]; columns?: 2 | 3; prompt?: string | null; captionHint?: string }) {
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

  const thumb = (item: Item) => {
    const { src, alt = '', caption } = typeof item === 'string' ? { src: item } as { src: string; alt?: string; caption?: string } : item;
    return (
      <figure key={src} className="m-0">
        {caption && (
          <figcaption className="mb-2 text-[14px] sm:text-[15px] lg:text-[16px]" style={{ fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.6 }}>
            {caption}
          </figcaption>
        )}
        <button
          type="button"
          onClick={() => setOpen(src)}
          aria-label={alt ? `Expand: ${alt}` : 'Expand artifact'}
          className="block w-full p-0 bg-transparent"
          style={{ cursor: 'zoom-in', border: 'none' }}
          data-cuelume-open=""
          data-cuelume-emphasis="subtle"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="w-full" style={{ display: 'block', border: BORDER }} />
        </button>
        {captionHint && (
          <div className="mt-2 text-right text-[14px] sm:text-[15px] lg:text-[16px]" style={{ fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.6 }}>
            {captionHint}
          </div>
        )}
      </figure>
    );
  };

  return (
    <>
      {prompt && <SparklePrompt className="mb-4">{prompt}</SparklePrompt>}
      <div className={`grid grid-cols-1 ${columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'} gap-3 items-start`}>
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
