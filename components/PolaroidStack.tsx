'use client';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { play } from 'cuelume';
import PixelNumber from './PixelNumber';

// `caption` is optional: when a photo has one, it fades in below the photo while the photo is picked up
type Photo = { src: string; alt: string; caption?: React.ReactNode };

// A slight tilt for each photo, in degrees
const TILTS = [2, -2, 1.5];
// How far the rest of the stack slides away from the photo being hovered, and how far that photo lifts
const SPREAD = 24;
const LIFT = 10;

// Photos set like Polaroids and loosely stacked: each overlaps the one before it, and the last sits on top.
// Hovering a photo straightens it and lifts it clear of the stack; the photos on either side slide away from it (the ones on the same side move together, so they stay stacked).
// The outer box of each photo never moves, so the hover area is steady and doesn't flicker as the card animates.
export default function PolaroidStack({ photos }: { photos: Photo[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const hoveredRef = useRef<number | null>(null);
  hoveredRef.current = hovered;
  const rowRef = useRef<HTMLDivElement>(null);
  const pointerType = useRef<string>('mouse');
  const reduced = useReducedMotion();
  const lastSound = useRef(0);

  // Picks a photo up (or puts them all down), with a sound on desktop only (taps on a touch screen stay silent, like the rest of the site): a soft "select" that rises when you move
  // on to a later photo and falls going back to an earlier one, and a quiet "close" when the last one is put down.
  const change = (next: number | null, silent = false) => {
    const prev = hoveredRef.current;
    if (next === prev) return;
    setHovered(next);
    if (silent) return;
    const now = performance.now();
    if (now - lastSound.current < 90) return; // never a stutter when the pointer sweeps across the stack
    lastSound.current = now;
    if (next === null) play('close', { emphasis: 'subtle', theme: 'bubble', volume: 0.7 });
    else play('select', { emphasis: 'subtle', theme: 'bubble', direction: prev === null || next > prev ? 'forward' : 'back' });
  };

  // On a touch screen there is no hover, so a tap picks a photo up (tap it again to put it back); tapping anywhere else puts it back too
  useEffect(() => {
    if (hovered === null) return;
    const away = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return;
      if (!rowRef.current?.contains(e.target as Node)) change(null, true);
    };
    document.addEventListener('pointerdown', away);
    return () => document.removeEventListener('pointerdown', away);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `change` only reads refs and stable setters
  }, [hovered]);

  return (
    <div ref={rowRef} className="relative flex items-start" onPointerLeave={e => { if (e.pointerType === 'mouse') change(null); }}>
      {photos.map((p, i) => {
        const isHovered = hovered === i;
        // The photos before the hovered one slide left, the ones after it slide right
        const shift = hovered === null || isHovered ? 0 : i < hovered ? -SPREAD : SPREAD;
        return (
          <div
            key={p.src}
            // On a phone the prints are bigger and overlap more (38% wide, 14% overlap), so the stack still fits; from tablet up they are 23.5% wide with a 6% overlap
            className={`w-[38%] md:w-[23.5%] ${i === 0 ? 'ml-0' : 'ml-[-14%] md:ml-[-6%]'}`}
            style={{ flex: 'none', position: 'relative', zIndex: isHovered ? 10 : i + 1 }}
            tabIndex={0}
            onPointerDown={e => { pointerType.current = e.pointerType; }}
            onPointerEnter={e => { if (e.pointerType === 'mouse') change(i); }}
            onClick={() => { if (pointerType.current !== 'mouse') change(hoveredRef.current === i ? null : i, true); }}
            onFocus={e => { if (e.currentTarget.matches(':focus-visible')) change(i); }} // keyboard focus only; a tap or click is handled above
            onBlur={() => { if (hoveredRef.current === i) change(null); }}
          >
            <div
              className="motion-reduce:transition-none"
              style={{
                position: 'relative',
                background: '#FFFFFF',
                padding: '8px 8px 28px',
                // Layered, low-opacity shadows: a hairline edge, a tight contact shadow, then two long soft ones that fall away, like a print lying on paper.
                // Lifted, the long shadows grow a little, as if the print has been picked up.
                boxShadow: isHovered
                  ? '0 0 0 0.5px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.06), 0 10px 18px -2px rgba(0, 0, 0, 0.08), 0 26px 44px -12px rgba(0, 0, 0, 0.16), 0 48px 72px -28px rgba(0, 0, 0, 0.12)'
                  : '0 0 0 0.5px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.06), 0 6px 12px -2px rgba(0, 0, 0, 0.07), 0 18px 32px -10px rgba(0, 0, 0, 0.14), 0 36px 56px -24px rgba(0, 0, 0, 0.1)',
                transform: `translate(${shift}px, ${isHovered ? -LIFT : 0}px) rotate(${isHovered ? 0 : TILTS[i % TILTS.length]}deg)`,
                // Inline on purpose: globals.css sets `* { transition: border-color }`, which beats Tailwind's transition utilities
                transition: 'transform 380ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 380ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt={p.alt} loading="lazy" decoding="async" draggable={false} className="w-full" style={{ display: 'block', aspectRatio: '1 / 1', objectFit: 'cover' }} />
            </div>
          </div>
        );
      })}

      {/* Captions: the photo's number in a small pixel badge, then its caption in plain grey type. The one for the photo that is picked up appears to the right of the stack,
          in the empty space beside it (never on a photo), with its first line level with the bottom of the Polaroids. Every caption starts from the same point, so it is always
          clear where to look. On a phone, where there is no room beside the stack, it sits under it instead, at the far right. They take no room in the layout. */}
      {photos.map((p, i) => {
        if (!p.caption) return null;
        const shown = hovered === i;
        return (
          <div
            key={`caption-${p.src}`}
            aria-hidden={!shown}
            className="pointer-events-none absolute left-0 right-0 top-full mt-3 flex justify-end md:left-[calc(58.5%+44px)] md:right-auto md:top-[calc(100%-24px)] md:mt-0 md:w-[min(260px,34%)] md:justify-start"
          >
            <div
              className="flex items-start gap-2 text-[14px] sm:text-[15px] lg:text-[16px]"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                // It simply appears: a quick fade with just a hint of blur, and goes just as quickly (the old one is gone as the new one arrives)
                opacity: shown ? 1 : 0,
                ...(reduced ? {} : { filter: shown ? 'blur(0px)' : 'blur(3px)' }),
                transition: shown ? 'opacity 120ms ease-out, filter 120ms ease-out' : 'opacity 80ms ease-in, filter 80ms ease-in',
              }}
            >
              <span aria-hidden className="flex-none" style={{ marginTop: '-1px' }}><PixelNumber n={i + 1} size={20} /></span>
              {/* The site's black, italic. Only the text is italic; the icons are line drawings and stay upright. */}
              <span className="text-left" style={{ color: 'var(--text)', fontStyle: 'italic' }}>{p.caption}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
