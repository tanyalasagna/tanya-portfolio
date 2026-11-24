'use client';
import { useEffect, useRef, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { PixelPill } from './PixelEdge';

// A letter-size page is 816 CSS px wide at 100%, which is what the percentage shown in the toolbar is measured against
const PAGE_PX = 816;
const DEFAULT_PERCENT = 100; // where the page starts (a narrower column starts at its own fit instead, so a phone doesn't open scrolled sideways)
const STEP = 25;
const MIN = 25;
const MAX = 250;

type Link = { href: string; label: string; left: number; top: number; width: number; height: number };

// The resume page with a small floating pill of controls: how many pages it has, zoom out / zoom in, and Fit (the width of the column).
// The page is an image of the PDF, so it looks the same in every browser; its printed links stay clickable on top of it.
export default function ResumeViewer({ src, alt, pages = 1, links = [] }: { src: string; alt: string; pages?: number; links?: Link[] }) {
  const [chosen, setChosen] = useState<number | null>(null); // the zoom the visitor picked, in percent; null until they pick one
  const [colWidth, setColWidth] = useState(0);
  const colRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = colRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setColWidth(el.clientWidth));
    ro.observe(el);
    setColWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const fit = colWidth ? (colWidth / PAGE_PX) * 100 : DEFAULT_PERCENT; // the percentage at which the page is exactly as wide as the column
  const zoom = chosen ?? Math.min(DEFAULT_PERCENT, fit);
  const percent = Math.round(zoom);
  const start = Math.min(DEFAULT_PERCENT, fit);
  // Each click moves to the next multiple of 25 above or below wherever the page is now (so Fit, say 95%, steps to 100% and 75%)
  const zoomIn = () => setChosen(c => Math.min(MAX, (Math.floor((c ?? start) / STEP + 0.001) + 1) * STEP));
  const zoomOut = () => setChosen(c => Math.max(MIN, (Math.ceil((c ?? start) / STEP - 0.001) - 1) * STEP));
  const btn = 'relative inline-flex items-center justify-center w-8 h-8 border-0 bg-transparent p-0 disabled:opacity-35';
  const atFit = Math.abs(zoom - fit) < 0.5;
  const divider = <span aria-hidden className="self-stretch" style={{ width: 1, margin: '6px 0', background: 'rgba(255,255,255,0.28)' }} />;

  return (
    <div className="mt-6 relative">
      {/* The column the page fits to. The page is centred when it is narrower than the column, and scrolls sideways when it is wider. */}
      <div ref={colRef} className="overflow-x-auto" style={{ scrollbarWidth: 'thin' }}>
        <div className="relative mx-auto" style={{ width: `${(zoom / 100) * PAGE_PX}px` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} loading="lazy" decoding="async" draggable={false} style={{ display: 'block', width: '100%', height: 'auto' }} />
          {/* The border is dashed, like the lines after Experience, Projects, Education and Skills on the resume. It sits inside the page edge, because the scrolling column around it would cut off anything drawn outside */}
          <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ border: '1px dashed color-mix(in srgb, var(--text) 38%, transparent)' }} />
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={l.label}
              className="absolute"
              style={{ left: `${l.left}%`, top: `${l.top}%`, width: `${l.width}%`, height: `${l.height}%` }}
            />
          ))}
        </div>
      </div>

      {/* The controls: a small pixel pill. On desktop (lg and up) it floats at the bottom centre of the page while you scroll, and rests at its bottom edge at the end;
          the zero-height sticky row takes no space and the pill is lifted into the page. On a phone or tablet it does not float: it sits under the resume instead. */}
      <div className="mt-5 flex justify-center lg:sticky lg:bottom-6 lg:z-10 lg:mt-0 lg:h-0 lg:items-start lg:pointer-events-none">
        <div
          role="group"
          aria-label="Resume viewer controls"
          className="pointer-events-auto relative inline-flex items-center gap-1 text-[15px] sm:text-[16px] lg:-translate-y-full"
          style={{ padding: '6px 14px', color: '#FFFFFF', fontFamily: 'var(--font-dm-sans)' }}
        >
          <PixelPill fill="#383636" stroke="#FFFFFF" strokeWidth={0.3} />
          <span className="relative px-1.5 whitespace-nowrap" style={{ opacity: 0.85 }}>{pages} {pages === 1 ? 'page' : 'pages'}</span>
          {divider}
          <span className="relative inline-flex items-center">
            <button type="button" className={btn} style={{ cursor: 'pointer', color: 'inherit' }} onClick={zoomOut} disabled={zoom <= MIN} aria-label="Zoom out" data-cuelume-tap="" data-cuelume-emphasis="subtle">
              <Minus size={16} strokeWidth={1.75} aria-hidden />
            </button>
            <span className="inline-block min-w-[3.4ch] text-center" style={{ fontVariantNumeric: 'tabular-nums' }} aria-live="polite">{percent}%</span>
            <button type="button" className={btn} style={{ cursor: 'pointer', color: 'inherit' }} onClick={zoomIn} disabled={zoom >= MAX} aria-label="Zoom in" data-cuelume-tap="" data-cuelume-emphasis="subtle">
              <Plus size={16} strokeWidth={1.75} aria-hidden />
            </button>
          </span>
          {divider}
          <button
            type="button"
            onClick={() => setChosen(fit)}
            disabled={atFit}
            className="relative border-0 bg-transparent px-1.5 underline decoration-[1.5px] decoration-current underline-offset-[4px] hover:no-underline disabled:opacity-40 disabled:no-underline"
            style={{ cursor: atFit ? 'default' : 'pointer', color: 'inherit', font: 'inherit' }}
            data-cuelume-tap=""
            data-cuelume-emphasis="subtle"
          >
            Fit
          </button>
        </div>
      </div>
    </div>
  );
}
