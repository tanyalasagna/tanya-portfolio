'use client';
import { useEffect, useRef, useState } from 'react';

// Pixel-stepped corners for a bar's divider edge: a square notch is cut from each corner
// (via clip-path) and the divider line is redrawn around it, so the corner reads as one
// jutting pixel step instead of a smooth curve.

export const PIXEL_STEP = 4;

const LINE = '0.5px solid var(--divider)';

export function pixelNotchClip(edge: 'top' | 'bottom', s = PIXEL_STEP) {
  return edge === 'bottom'
    ? `polygon(0 0, 100% 0, 100% calc(100% - ${s}px), calc(100% - ${s}px) calc(100% - ${s}px), calc(100% - ${s}px) 100%, ${s}px 100%, ${s}px calc(100% - ${s}px), 0 calc(100% - ${s}px))`
    : `polygon(${s}px 0, calc(100% - ${s}px) 0, calc(100% - ${s}px) ${s}px, 100% ${s}px, 100% 100%, 0 100%, 0 ${s}px, ${s}px ${s}px)`;
}

export function PixelEdgeLine({ edge, s = PIXEL_STEP }: { edge: 'top' | 'bottom'; s?: number }) {
  const v = edge; // the edge the line runs along
  const inner = edge === 'bottom' ? 'borderTop' : 'borderBottom';
  // s + 1 keeps the step's lines half a pixel inside the notch edge, so rounding can't push them into the clipped area
  const corner = { position: 'absolute' as const, [v]: 0, width: s + 1, height: s + 1, boxSizing: 'border-box' as const, [inner]: LINE, pointerEvents: 'none' as const };
  return (
    <>
      {/* Drawn as a border, not a 0.5px fill: browsers keep borders at least one device pixel, while thin fills can round away */}
      <div aria-hidden style={{ position: 'absolute', [v]: 0, left: s, right: s, [edge === 'bottom' ? 'borderBottom' : 'borderTop']: LINE, pointerEvents: 'none' }} />
      <div aria-hidden style={{ ...corner, left: 0, borderRight: LINE }} />
      <div aria-hidden style={{ ...corner, right: 0, borderLeft: LINE }} />
    </>
  );
}

// Pixel-pill outline (three stair-steps of `p` px at each corner) as SVG polygon points for a w×h box, pulled in by `inset`
export function pixelRoundedPoints(w: number, h: number, p = 3, inset = 0) {
  const a = p, b = 2 * p, c = 3 * p;
  const L = inset, T = inset, R = w - inset, B = h - inset;
  return [
    [L + c, T], [R - c, T], [R - c, T + a], [R - b, T + a], [R - b, T + b], [R - a, T + b], [R - a, T + c], [R, T + c],
    [R, B - c], [R - a, B - c], [R - a, B - b], [R - b, B - b], [R - b, B - a], [R - c, B - a], [R - c, B],
    [L + c, B], [L + c, B - a], [L + b, B - a], [L + b, B - b], [L + a, B - b], [L + a, B - c], [L, B - c],
    [L, T + c], [L + a, T + c], [L + a, T + b], [L + b, T + b], [L + b, T + a], [L + c, T + a],
  ].map(([x, y]) => `${x},${y}`).join(' ');
}

// A pixel-stepped pill drawn as SVG measured to its parent box, so a thin outline follows the steps exactly
// (a CSS border would break at the steps, and clip-path insets that thin get rounded away)
export function PixelPill({ fill, stroke, strokeWidth = 0.5, visible = true }: { fill: string; stroke: string; strokeWidth?: number; visible?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => { const r = el.getBoundingClientRect(); setSize({ w: r.width, h: r.height }); });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <svg
      ref={ref}
      aria-hidden
      width="100%"
      height="100%"
      style={{ position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none', opacity: visible ? 1 : 0, transition: 'opacity 180ms ease' }}
    >
      {size.w > 0 && (
        <polygon
          points={pixelRoundedPoints(size.w, size.h, 3, strokeWidth / 2)}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      )}
    </svg>
  );
}
