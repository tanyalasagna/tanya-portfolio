'use client';
import { useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { circleRuns } from './PixelNumber';

type Page = { src: string; alt: string };

const TURN_MS = 950;
const BUTTON_GREY = '#8C8A87'; // the buttons are a soft grey (the badges stay dark); the light chevron still reads clearly on it

// A real-book flipbook. The cover sits alone, closed; opening it reveals two-page spreads; after the last spread the final page is
// left on its own and the book closes again. Pages are paper leaves with a front and a back that physically turn around the spine,
// with a soft shadow that passes across the page as it moves and a gutter shadow at the fold.
//
// Pages are numbered 1..N: leaf i holds page 2i+1 on its front and page 2i+2 on its back, so an even page count fills every leaf.
// `turned` is how many leaves have been flipped: 0 = closed on the cover, N/2 = closed on the back page.
export default function FlipBook({ pages, ratio = '1000 / 1353' }: { pages: Page[]; ratio?: string }) {
  const leafCount = Math.ceil(pages.length / 2);
  const [turned, setTurned] = useState(0);
  const [turning, setTurning] = useState<{ leaf: number; n: number } | null>(null);
  const reduced = useReducedMotion();
  const touchX = useRef<number | null>(null);

  const turnTo = (t: number) => {
    const target = Math.max(0, Math.min(leafCount, t));
    if (target === turned) return;
    // Several steps at once (the dots) just move the book; a single step also animates the passing shadow on that leaf
    if (Math.abs(target - turned) === 1) setTurning({ leaf: Math.min(target, turned), n: (turning?.n ?? 0) + 1 });
    setTurned(target);
  };
  const next = () => turnTo(turned + 1);
  const prev = () => turnTo(turned - 1);

  // Inline on purpose: globals.css sets `* { transition: border-color }`, which beats Tailwind's transition utilities
  const ease = 'cubic-bezier(0.5, 0, 0.25, 1)';
  const move = (props: string) => (reduced ? 'none' : props);

  // What the spread reads as, for the label under the book
  const label = turned === 0 ? 'Cover' : turned === leafCount ? `Page ${pages.length}` : `Pages ${2 * turned}–${2 * turned + 1}`;
  // The book is wider than the visible page when it is closed, so slide it to keep the single page centred
  const shift = turned === 0 ? '-25%' : turned === leafCount ? '25%' : '0%';
  const spreadFor = (i: number) => i; // one dot per state, 0..leafCount

  // The circle keeps the 9x9 pixel grid used by the numbered badges. The chevron inside is drawn on a grid twice as fine (18x18, so its steps are half
  // a badge pixel). It is three steps thick, which makes it an even six steps wide, so it sits exactly in the middle of the (also even) circle.
  const chevron = (dir: 'prev' | 'next'): [number, number][] => {
    const cells: [number, number][] = [];
    for (let r = 0; r < 8; r++) {
      const d = Math.min(r, 7 - r); // how far this row is from the top or bottom of the chevron
      const x = dir === 'next' ? 6 + d : 6 + (3 - d);
      cells.push([x, 5 + r], [x + 1, 5 + r], [x + 2, 5 + r]);
    }
    return cells;
  };
  const navBtn = (dir: 'prev' | 'next') => {
    const disabled = dir === 'prev' ? turned === 0 : turned === leafCount;
    return (
      <button
        type="button"
        onClick={dir === 'prev' ? prev : next}
        disabled={disabled}
        aria-label={dir === 'prev' ? 'Previous pages' : 'Next pages'}
        className="flex-none flex items-center justify-center border-0 bg-transparent p-0 w-11 h-11"
        style={{ cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.25 : 1, transition: move('opacity 200ms ease') }}
        data-cuelume-tap=""
        data-cuelume-emphasis="subtle"
      >
        <svg viewBox="0 0 18 18" width={27} height={27} shapeRendering="crispEdges" aria-hidden style={{ display: 'block' }}>
          {circleRuns.map((r, i) => <rect key={i} x={r.x * 2} y={r.y * 2} width={r.w * 2} height={2.08} fill={BUTTON_GREY} />)}
          {chevron(dir).map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill="#F0F0EE" />)}
        </svg>
      </button>
    );
  };

  // Pages worth loading: the ones in view and a couple either side
  const wanted = (idx: number) => idx >= 2 * turned - 3 && idx <= 2 * turned + 2;

  const gutterRight = 'linear-gradient(to right, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.06) 6%, rgba(0,0,0,0) 14%)';
  const gutterLeft = 'linear-gradient(to left, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.06) 6%, rgba(0,0,0,0) 14%)';

  const face = (idx: number, side: 'front' | 'back', leaf: number) => {
    const p = pages[idx];
    if (!p) return null;
    const isRight = side === 'front';
    const clickable = isRight ? leaf === turned : leaf === turned - 1; // the visible page of each side
    return (
      <div
        style={{
          position: 'absolute', inset: 0, background: '#fff', overflow: 'hidden',
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          transform: isRight ? 'none' : 'rotateY(180deg)',
        }}
      >
        {wanted(idx) && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={p.src} alt={p.alt} decoding="async" draggable={false} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
        {/* Gutter shadow where the paper curves into the spine */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, background: isRight ? gutterRight : gutterLeft, pointerEvents: 'none' }} />
        {/* Shadow that sweeps over the page while its leaf is turning */}
        {!reduced && turning?.leaf === leaf && (
          <div
            key={turning.n}
            aria-hidden
            style={{ position: 'absolute', inset: 0, background: isRight ? 'linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.05))' : 'linear-gradient(to left, rgba(0,0,0,0.5), rgba(0,0,0,0.05))', opacity: 0, pointerEvents: 'none', animation: `fb-shade ${TURN_MS}ms ease-in-out` }}
          />
        )}
        {clickable && (
          <button
            type="button"
            tabIndex={-1}
            aria-hidden
            onClick={isRight ? next : prev}
            className="absolute inset-0 w-full h-full border-0 bg-transparent p-0"
            style={{ cursor: isRight ? (turned === leafCount ? 'default' : 'e-resize') : 'w-resize' }}
          />
        )}
      </div>
    );
  };

  return (
    <div
      role="group"
      aria-roledescription="flipbook"
      aria-label="Kiosk design guidelines"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      }}
      className="outline-none"
    >
      <style>{'@keyframes fb-shade{0%{opacity:0}45%{opacity:1}100%{opacity:0}}'}</style>

      {/* Two pages wide; the book slides sideways so a closed cover or back page sits in the middle */}
      <div
        className="relative mx-auto w-full"
        style={{ maxWidth: '760px', perspective: '2400px' }}
        onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={e => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
        }}
      >
        <div
          style={{ position: 'relative', width: '100%', aspectRatio: `${2 * Number(ratio.split('/')[0])} / ${Number(ratio.split('/')[1])}`, transformStyle: 'preserve-3d', transform: `translateX(${shift})`, transition: move(`transform ${TURN_MS}ms ${ease}`) }}
        >
          {Array.from({ length: leafCount }, (_, i) => {
            const isTurned = i < turned;
            return (
              <div
                key={i}
                style={{
                  position: 'absolute', top: 0, left: '50%', width: '50%', height: '100%',
                  transformOrigin: 'left center', transformStyle: 'preserve-3d',
                  transform: isTurned ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                  // Stack order flips halfway through the turn: unturned leaves pile up with the first on top, turned ones with the last on top
                  zIndex: isTurned ? i + 1 : leafCount - i,
                  transition: move(`transform ${TURN_MS}ms ${ease}, z-index 0s linear ${TURN_MS / 2}ms`),
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.14)',
                }}
              >
                {face(2 * i, 'front', i)}
                {face(2 * i + 1, 'back', i)}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4 sm:gap-6">
        {navBtn('prev')}
        <div className="flex flex-col items-center gap-3 min-w-[9.5rem]">
          <span
            aria-live="polite"
            className="text-[14px] sm:text-[15px] lg:text-[16px]"
            style={{ fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.8, fontVariantNumeric: 'tabular-nums' }}
          >
            {label}{turned !== 0 && turned !== leafCount ? ` of ${pages.length}` : ''}
          </span>
          <div className="flex items-center gap-2">
            {Array.from({ length: leafCount + 1 }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => turnTo(spreadFor(i))}
                aria-label={i === 0 ? 'Go to the cover' : i === leafCount ? `Go to page ${pages.length}` : `Go to pages ${2 * i}–${2 * i + 1}`}
                aria-current={i === turned}
                className="border-0 p-0 rounded-full"
                style={{ width: 8, height: 8, background: '#383636', opacity: i === turned ? 1 : 0.25, cursor: 'pointer', transition: move('opacity 200ms ease') }}
              />
            ))}
          </div>
        </div>
        {navBtn('next')}
      </div>
    </div>
  );
}
