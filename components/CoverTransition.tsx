'use client';
import { useSyncExternalStore } from 'react';

// Thumbnail -> case study cover transition.
// When a thumbnail is clicked, a copy of it is placed on top of the page exactly where the thumbnail is. The page changes underneath it,
// and once the case study's cover has been laid out, the copy grows and glides to the cover's position. Then the real cover takes its place
// and the rest of the page fades in.

export type Rect = { left: number; top: number; width: number; height: number };
export type CoverTransitionInfo = { slug: string; rect: Rect; src: string; isVideo: boolean; time: number; alt: string };

const EXPAND_MS = 850;
const EASE = 'cubic-bezier(0.65, 0, 0.2, 1)';
const SAFETY_MS = 6000; // if the new page never reports in, drop the copy instead of leaving it on top of everything

let current: CoverTransitionInfo | null = null;
let overlayEl: HTMLDivElement | null = null;
let handedOver = false; // the copy has reached the cover: the real cover may show
let handoffTime = 0;    // how far into its video the copy was at that moment
let landing = false; // the copy is already on its way (React's dev double-run of effects must not start it twice)
let safety: number | undefined;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach(l => l());
const subscribe = (l: () => void) => { listeners.add(l); return () => { listeners.delete(l); }; };

export function startCoverTransition(info: CoverTransitionInfo) {
  current = info;
  window.clearTimeout(safety);
  safety = window.setTimeout(clearCoverTransition, SAFETY_MS);
  emit();
}

// Is a transition waiting to land on this case study?
export function getCoverTransition(slug?: string) {
  if (!current) return null;
  return slug === undefined || current.slug === slug ? current : null;
}

export function clearCoverTransition() {
  window.clearTimeout(safety);
  current = null;
  landing = false;
  handedOver = false;
  emit();
}

// True while a thumbnail is on its way to this case study's cover and the cover should stay hidden
export function useCoverPending(slug: string) {
  return useSyncExternalStore(subscribe, () => current !== null && current.slug === slug && !handedOver, () => false);
}
export function getCoverHandoffTime() { return handoffTime; }

// Called by the case study cover once it knows where it sits. Glides the copy there; when it arrives the real cover is shown in the same
// spot (via useCoverPending) and the copy is removed. The hand-over lives here, not in the caller, because the page can mount its cover twice
// while it settles, and only the first call gets to start the animation.
export function landCoverTransition(target: Rect) {
  if (landing) return;
  const el = overlayEl;
  const info = current;
  if (!el || !info) { clearCoverTransition(); return; }
  landing = true;
  window.clearTimeout(safety);
  const px = (r: Rect) => ({ left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px` });
  const anim = el.animate([px(info.rect), px(target)], { duration: EXPAND_MS, easing: EASE, fill: 'forwards' });
  const finish = () => {
    handoffTime = el.querySelector('video')?.currentTime ?? 0;
    handedOver = true;
    emit(); // the real cover appears in the same spot...
    requestAnimationFrame(() => clearCoverTransition()); // ...then the copy goes
  };
  anim.onfinish = finish;
  anim.oncancel = finish;
}

export default function CoverTransitionOverlay() {
  const t = useSyncExternalStore(subscribe, () => current, () => null);
  if (!t) return null;
  const media: React.CSSProperties = { display: 'block', width: '100%', height: '100%', objectFit: 'cover' };
  return (
    <div
      ref={el => { overlayEl = el; }}
      aria-hidden
      style={{ position: 'fixed', left: t.rect.left, top: t.rect.top, width: t.rect.width, height: t.rect.height, zIndex: 45, overflow: 'hidden', pointerEvents: 'none', background: 'var(--bg-hover)' }}
    >
      {t.isVideo ? (
        <video src={t.src} muted playsInline autoPlay style={media} onLoadedMetadata={e => { try { e.currentTarget.currentTime = t.time; } catch {} }} />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={t.src} alt="" style={media} />
      )}
    </div>
  );
}
