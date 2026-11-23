'use client';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import JourneyMap, { MAP_H, MAP_W } from './JourneyMap';
import { PixelPill } from './PixelEdge';

// Solid stand-in for an 8% tint of the text colour on the map's grey, the way the sidebar pill tints the page background
const PILL_FILL = 'color-mix(in srgb, var(--text) 8%, #F0F0EE)';

// Before / after slider: the final map sits underneath and the original is laid over it, cut off at the divider.
// Drag the handle, or press on the map itself with a mouse, to move the divider; focus the handle and use the arrow keys, Home and End;
// or click the Before / After labels to glide to that version.
export default function JourneyCompare({ initial = 50 }: { initial?: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.6);
  const [pos, setPos] = useState(initial); // % of the map shown as "before"
  const [dragging, setDragging] = useState(false);
  const reduced = useReducedMotion();
  const touched = useRef(false); // once someone uses the slider, the hint never plays again
  const hinted = useRef(false);

  // The map is drawn at a fixed design size and scaled to whatever width it is given
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(Math.max(entry.contentRect.width / MAP_W, 0.5)));
    ro.observe(el);
    return () => ro.disconnect();
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

  const move = (clientX: number) => {
    const el = wrapRef.current?.firstElementChild as HTMLElement | null;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  // Glide the divider to a position (used by the Before / After labels)
  const tween = useRef(0);
  const animateTo = (target: number) => {
    touched.current = true;
    cancelAnimationFrame(tween.current);
    if (reduced) { setPos(target); return; }
    const from = pos;
    const start = performance.now();
    const DURATION = 700;
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setPos(from + (target - from) * eased);
      if (t < 1) tween.current = requestAnimationFrame(tick);
    };
    tween.current = requestAnimationFrame(tick);
  };

  const w = MAP_W * scale;
  const h = MAP_H * scale;
  const BAR = 48;
  // The labels ride along either side of the divider (left of it is the original, right of it is the final one). When a side has been
  // dragged shut its label stays pinned at that edge, so there's always a way back. Clicking one glides the divider so that version fills the map.
  const labelBtn = (side: 'l' | 'r') => {
    return (
      <div
        className="absolute top-0 flex items-center overflow-hidden"
        style={side === 'l'
          ? { left: 0, width: `max(min(${pos}%, calc(100% - 128px)), 104px)`, height: BAR, justifyContent: 'flex-end', paddingRight: 14 }
          : { right: 0, width: `max(min(${100 - pos}%, calc(100% - 128px)), 104px)`, height: BAR, justifyContent: 'flex-start', paddingLeft: 14 }}
      >
        <button
          type="button"
          onClick={() => animateTo(side === 'l' ? 100 : 0)}
          aria-label={side === 'l' ? 'Show the original kiosk map in full' : 'Show the final prototype map in full'}
          className="relative flex-none border-0 bg-transparent text-[15px] sm:text-[16px]"
          style={{ color: 'var(--text)', fontFamily: 'var(--font-dm-sans)', fontWeight: 700, lineHeight: 1.2, padding: '5px 12px', cursor: 'pointer', whiteSpace: 'nowrap' }}
        >
          {/* The same stepped pill, tint and hairline outline as the active Work / About / CV link in the sidebar */}
          <PixelPill fill={PILL_FILL} stroke="var(--text)" strokeWidth={0.5} />
          <span style={{ position: 'relative' }}>
            {side === 'l' ? <>{pos > 1 && '\u25C2 '}Before</> : <>After{pos < 99 && ' \u25B8'}</>}
          </span>
        </button>
      </div>
    );
  };

  return (
    <div ref={wrapRef} style={{ width: '100%', overflowX: scale <= 0.5 ? 'auto' : 'visible' }}>
      <div
        className="relative select-none"
        style={{ width: w, height: h + BAR, background: '#F0F0EE', cursor: 'ew-resize' }}
        onPointerDown={e => {
          if (e.pointerType === 'touch' || (e.target as HTMLElement).closest('button')) return;
          touched.current = true; cancelAnimationFrame(tween.current);
          e.currentTarget.setPointerCapture(e.pointerId); setDragging(true); move(e.clientX);
        }}
        onPointerMove={e => { if (dragging) move(e.clientX); }}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
      >
        {/* Header strip: labels that ride either side of the divider */}
        <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: BAR, zIndex: 5 }}>
          {labelBtn('l')}
          {labelBtn('r')}
        </div>

        <div style={{ position: 'absolute', left: 0, top: BAR, width: w, height: h }}>
          {/* After, underneath */}
          <div style={{ position: 'absolute', left: 0, top: 0, width: MAP_W, height: MAP_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
            <JourneyMap variant="after" />
          </div>
          {/* Before, on top, cut off at the divider */}
          <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <div style={{ position: 'absolute', left: 0, top: 0, width: MAP_W, height: MAP_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
              <JourneyMap variant="before" />
            </div>
          </div>
        </div>

        {/* Divider and its handle, running the full height */}
        <div
          role="slider"
          tabIndex={0}
          aria-label="Compare the original and final journey maps"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% original`}
          onPointerDown={e => { e.stopPropagation(); touched.current = true; cancelAnimationFrame(tween.current); e.currentTarget.setPointerCapture(e.pointerId); setDragging(true); move(e.clientX); }}
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
    </div>
  );
}
