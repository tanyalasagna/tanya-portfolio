'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import JourneyMap, { MAP_H, MAP_W } from './JourneyMap';
import { PixelPill } from './PixelEdge';

const LIGHT_GREY = '#A9A7A5';

// What the slider compares: two things drawn at the same fixed design size (w x h, in px). By default the two journey maps.
type Layers = { w: number; h: number; before: React.ReactNode; after: React.ReactNode; noun: string };
const MAP_LAYERS: Layers = { w: MAP_W, h: MAP_H, before: <JourneyMap variant="before" />, after: <JourneyMap variant="after" />, noun: 'map' };
const EXPANDED_SCALE = 0.85; // on a phone, the expanded map is wider than the screen and scrolls sideways

// The note above the map: which way to drag for which map. The Before / After labels are light grey with an arrow, and turn the site's dark
// (arrow gone) once that map fills the whole box, i.e. the handle is all the way to that side.
function Note({ pos, reduced, noun }: { pos: number; reduced: boolean | null; noun: string }) {
  const fade = reduced ? 'none' : 'color 180ms ease';
  return (
    <div style={{ fontFamily: 'var(--font-dm-sans)' }}>
      <p className="text-[14px] sm:text-[15px] lg:text-[16px]" style={{ margin: 0, fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.8 }}>
        Drag the handle left to see the <span style={{ fontWeight: 600 }}>Before</span> {noun}, or right to explore the <span style={{ fontWeight: 600 }}>After</span> {noun}.
      </p>
      <div className="mt-2 flex items-center justify-between text-[14px] sm:text-[15px] lg:text-[16px]" style={{ fontWeight: 600 }}>
        <span className="inline-flex items-center gap-1.5" style={{ color: pos <= 2 ? 'var(--text)' : LIGHT_GREY, transition: fade }}>{pos > 2 && <ArrowLeft size={16} strokeWidth={1.75} aria-hidden />}Before</span>
        <span className="inline-flex items-center gap-1.5" style={{ color: pos >= 98 ? 'var(--text)' : LIGHT_GREY, transition: fade }}>After{pos < 98 && <ArrowRight size={16} strokeWidth={1.75} aria-hidden />}</span>
      </div>
    </div>
  );
}

// The two maps at a given scale with the draggable divider. The handle's position picks the map: all the way left shows the Before map, all the way
// right shows the After map, and in between they sit side by side (After to the left of the handle, Before to the right).
// Drag the handle, or press on the map itself with a mouse; focus the handle and use the arrow keys, Home and End.
function CompareBox({ pos, setPos, scale, touched, onTap, layers }: {
  pos: number; setPos: (p: number | ((p: number) => number)) => void; scale: number; touched: React.MutableRefObject<boolean>; onTap?: () => void; layers: Layers;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const reduced = useReducedMotion();
  const w = layers.w * scale;
  const h = layers.h * scale;

  const move = (clientX: number) => {
    const el = boxRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={boxRef}
      className="relative select-none"
      style={{ width: w, height: h, background: '#F0F0EE', cursor: onTap ? 'zoom-in' : 'ew-resize', flex: 'none' }}
      onClick={onTap}
      onPointerDown={e => {
        if (e.pointerType === 'touch' || (e.target as HTMLElement).closest('[role=slider]')) return;
        touched.current = true;
        e.currentTarget.setPointerCapture(e.pointerId); setDragging(true); move(e.clientX);
      }}
      onPointerMove={e => { if (dragging) move(e.clientX); }}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      {/* Before, underneath: it is what you see to the right of the handle, so it fills the map when the handle is all the way left */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: layers.w, height: layers.h, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        {layers.before}
      </div>
      {/* After, on top and cut off at the handle: it is what you see to the left of it, so it fills the map when the handle is all the way right */}
      <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: layers.w, height: layers.h, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          {layers.after}
        </div>
      </div>

      {/* Divider and its handle, running the full height */}
      <div
        role="slider"
        tabIndex={0}
        aria-label={`Slide left for the Before ${layers.noun}, right for the After ${layers.noun}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={pos <= 2 ? `Before ${layers.noun}` : pos >= 98 ? `After ${layers.noun}` : 'Before and After side by side'}
        onClick={e => e.stopPropagation()} // grabbing the handle never counts as a tap on the map
        onPointerDown={e => { e.stopPropagation(); touched.current = true; e.currentTarget.setPointerCapture(e.pointerId); setDragging(true); move(e.clientX); }}
        onPointerMove={e => { if (dragging) move(e.clientX); }}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        onKeyDown={e => {
          touched.current = true;
          if (e.key === 'ArrowLeft') { e.preventDefault(); setPos(p => Math.max(0, p - 5)); }
          else if (e.key === 'ArrowRight') { e.preventDefault(); setPos(p => Math.min(100, p + 5)); }
          else if (e.key === 'Home') { e.preventDefault(); setPos(0); }
          else if (e.key === 'End') { e.preventDefault(); setPos(100); }
        }}
        className="absolute top-0 h-full outline-none"
        style={{ left: `${pos}%`, width: 44, marginLeft: -22, cursor: 'ew-resize', touchAction: 'none', zIndex: 4 }}
      >
        <div style={{ position: 'absolute', left: 21, top: 0, width: 2, height: '100%', background: '#383636' }} />
        <div
          className="absolute flex items-center justify-center"
          style={{ left: 2, top: '50%', width: 40, height: 40, marginTop: -20, borderRadius: '50%', background: '#383636', color: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.25)', transform: dragging ? 'scale(1.08)' : 'none', transition: reduced ? 'none' : 'transform 150ms ease' }}
        >
          <ChevronLeft size={16} strokeWidth={2} aria-hidden style={{ marginRight: -3 }} />
          <ChevronRight size={16} strokeWidth={2} aria-hidden style={{ marginLeft: -3 }} />
        </div>
      </div>
    </div>
  );
}

// Before / after journey map slider. On a phone the map is shrunk to fit the screen, and tapping it opens a larger version (which scrolls sideways).
export default function JourneyCompare({ initial = 50, before, after, width, height, noun, padded = false }: {
  initial?: number; before?: React.ReactNode; after?: React.ReactNode; width?: number; height?: number; noun?: string; padded?: boolean;
}) {
  // Journey maps unless something else (e.g. two screenshots) is passed in
  const layers: Layers = before && after && width && height
    ? { w: width, h: height, before, after, noun: noun ?? 'version' }
    : MAP_LAYERS;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.6);
  const [pos, setPos] = useState(initial); // % of the map that is the After map (left of the handle)
  const [small, setSmall] = useState(false); // phone-sized screen
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const touched = useRef(false); // once someone uses the slider, the hint never plays again
  const hinted = useRef(false);

  // The map is drawn at a fixed design size and scaled to whatever width it is given
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / layers.w));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setSmall(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // A small wiggle the first time the slider scrolls into view, so it's clear the divider can be moved
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || reduced) return;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hinted.current || touched.current) return;
      hinted.current = true;
      io.disconnect();
      const start = performance.now();
      const DURATION = 1700;
      const AMPLITUDE = 7; // % of the map either side of the middle
      const tick = (now: number) => {
        if (touched.current) return;
        const t = Math.min((now - start) / DURATION, 1);
        // two swings that die away, ending back in the middle
        setPos(initial + AMPLITUDE * Math.sin(t * Math.PI * 4) * (1 - t));
        if (t < 1) raf = requestAnimationFrame(tick);
        else setPos(initial);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [reduced, initial]);

  // The expanded view: a blurred overlay with the bigger map, closed with the pill, a tap outside the map or Escape
  useEffect(() => {
    if (!open) { setShown(false); return; }
    const raf = requestAnimationFrame(() => {
      setShown(true);
      // Start with the handle in the middle of the screen, so it's in view straight away
      const sc = scrollerRef.current;
      if (sc) sc.scrollLeft = 16 + (pos / 100) * layers.w * EXPANDED_SCALE - sc.clientWidth / 2;
    });
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps -- only needed at the moment of opening
  }, [open]);

  return (
    <>
      <div className="mb-3"><Note pos={pos} reduced={reduced} noun={layers.noun} /></div>
      {/* `padded` sets the comparison in a light-grey block with even padding all round, like the other media on the site */}
      <div className={padded ? 'p-4 sm:p-6 lg:p-8' : undefined} style={padded ? { background: '#F0F0EE' } : undefined}>
        <div ref={wrapRef} style={{ width: '100%' }}>
          <CompareBox pos={pos} setPos={setPos} scale={scale} touched={touched} onTap={small ? () => setOpen(true) : undefined} layers={layers} />
        </div>
      </div>
      {small && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-2 block ml-auto border-0 bg-transparent p-0 text-[14px]"
          style={{ fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.7, cursor: 'pointer' }}
        >
          (Tap to expand)
        </button>
      )}

      {open && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${layers.noun === 'map' ? 'Journey maps' : 'Before and after'}, expanded`}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex flex-col"
          style={{
            background: 'rgba(255, 255, 255, 0.55)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            opacity: shown ? 1 : 0,
            // Inline on purpose: globals.css sets `* { transition: border-color }`, which beats Tailwind's transition utilities
            transition: 'opacity 250ms ease',
          }}
        >
          <div className="flex items-start justify-between gap-4 px-4 pt-4" onClick={e => e.stopPropagation()}>
            <div className="min-w-0 flex-1"><Note pos={pos} reduced={reduced} noun={layers.noun} /></div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="relative flex-none inline-flex items-center gap-1.5 border-0 bg-transparent text-[15px]"
              style={{ padding: '8px 12px', color: '#FFFFFF', fontFamily: 'var(--font-dm-sans)', cursor: 'pointer' }}
            >
              <PixelPill fill="#383636" stroke="#FFFFFF" strokeWidth={0.3} />
              <span style={{ position: 'relative' }}>Close</span>
              <X size={16} strokeWidth={1.5} aria-hidden style={{ position: 'relative' }} />
            </button>
          </div>
          <div ref={scrollerRef} className="flex-1 min-h-0 flex items-center" style={{ overflowX: 'auto' }}>
            <div className="px-4 mx-auto flex-none" onClick={e => e.stopPropagation()}>
              <CompareBox pos={pos} setPos={setPos} scale={EXPANDED_SCALE} touched={touched} layers={layers} />
            </div>
          </div>
          <p className="px-4 pb-4 text-center text-[14px]" style={{ margin: 0, fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.7 }} onClick={e => e.stopPropagation()}>
            Scroll sideways to see the whole {layers.noun}.
          </p>
        </div>,
        document.body,
      )}
    </>
  );
}
