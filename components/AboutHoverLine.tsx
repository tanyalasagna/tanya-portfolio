'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const INSTAGRAM = 'https://www.instagram.com/loopieloopcrochet/';

const CROCHET = [
  { src: '/images/about/crochet-1.webp', alt: 'A blue crocheted scarf with little white clouds', h: 150, tilt: -6, mt: 14 },
  { src: '/images/about/crochet-2.webp', alt: 'A pink crocheted shoulder bag with a heart pattern', h: 150, tilt: 2, mt: 0 },
  { src: '/images/about/crochet-3.webp', alt: 'An orange crocheted shoulder bag with a white butterfly', h: 150, tilt: -4, mt: 10 },
];

const FILM = [
  { src: '/images/about/film-1.webp', alt: 'A film photo of the sun setting over the sea, with people on the rocks and wet sand' },
  { src: '/images/about/film-2.webp', alt: 'A film photo of a beach with colourful buildings on a hill' },
  { src: '/images/about/film-3.webp', alt: 'A film photo of a palace on a lake shore, seen from the water' },
  { src: '/images/about/film-4.webp', alt: 'A film photo of a lake below a hill with a long wall, and a white pavilion' },
];

type Which = 'crochet' | 'film' | null;

const underline = 'underline decoration-dotted decoration-[1.5px] decoration-current underline-offset-[4px] cursor-pointer';
const captionCls = 'mt-3 text-[14px] sm:text-[15px]';
const captionStyle = { color: 'var(--text-muted)', fontStyle: 'italic', opacity: 0.8, lineHeight: 1.35 } as const;

// The last line of the About text. "crocheting gifts for friends" and "capturing places I <3 on film" are underlined; hovering (or tapping, on a phone) one of them
// shows its pictures in the space beside the text: the crochet pieces close together like a small pile of prints, or the film photos taking turns.
export default function AboutHoverLine() {
  const [open, setOpen] = useState<Which>(null);
  const [frame, setFrame] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touched = useRef(false);
  const wasOpen = useRef(false); // whether the pictures were already showing when the press began (a tap focuses the phrase first, which would open them)
  const [isTouch, setIsTouch] = useState(false); // the last press was a finger, not a mouse

  const show = useCallback((w: Exclude<Which, null>) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(w);
  }, []);
  // A short delay lets the pointer travel from the words to the pictures without them vanishing
  const hide = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 220);
  }, []);

  // The film photos take turns while they are showing (they stay on the first photo for anyone who prefers reduced motion)
  useEffect(() => {
    if (open !== 'film') { setFrame(0); return; }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setFrame(f => (f + 1) % FILM.length), 1500);
    return () => clearInterval(t);
  }, [open]);

  // On a phone, tapping anywhere else puts the pictures away
  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => { if (!wrapRef.current?.contains(e.target as Node)) setOpen(null); };
    document.addEventListener('pointerdown', away);
    return () => document.removeEventListener('pointerdown', away);
  }, [open]);

  const trigger = (w: Exclude<Which, null>) => ({
    onPointerDown: (e: React.PointerEvent) => { touched.current = e.pointerType !== 'mouse'; wasOpen.current = open === w; setIsTouch(touched.current); },
    onPointerEnter: (e: React.PointerEvent) => { if (e.pointerType === 'mouse') show(w); },
    onPointerLeave: (e: React.PointerEvent) => { if (e.pointerType === 'mouse') hide(); },
    onFocus: () => show(w),
    onBlur: hide,
  });

  const popoverBase: React.CSSProperties = {
    position: 'absolute', zIndex: 5,
    transition: 'opacity 220ms ease, filter 220ms ease, visibility 220ms',
  };
  const shown = (w: Exclude<Which, null>): React.CSSProperties => open === w
    ? { opacity: 1, filter: 'blur(0px)', visibility: 'visible', pointerEvents: 'auto' }
    : { opacity: 0, filter: 'blur(6px)', visibility: 'hidden', pointerEvents: 'none' };

  // Beside the text from tablet up, just underneath it on a phone
  const place = 'top-full mt-3 left-0 md:top-1/2 md:mt-0 md:-translate-y-1/2 md:left-[calc(100%+32px)]';

  return (
    <div ref={wrapRef} className="relative mb-4 md:max-w-[70%]">
      <p className="text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed" style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--text)', margin: 0 }}>
        I still enjoy making things in different ways, whether that&rsquo;s designing digital experiences,{' '}
        <a
          href={INSTAGRAM} target="_blank" rel="noopener noreferrer"
          // With a mouse the underline goes away while its pictures are showing (the film phrase keeps its underline); on a phone it stays, as there is no hover
          className={open === 'crochet' && !isTouch ? underline.replace('underline ', 'no-underline ') : underline}
          style={{ color: 'inherit' }}
          onClick={e => { if (touched.current) { e.preventDefault(); if (wasOpen.current) setOpen(null); else show('crochet'); } }}
          {...trigger('crochet')}
        >crocheting gifts for friends</a>,
        or{' '}
        <span
          tabIndex={0} role="button" aria-expanded={open === 'film'}
          className={underline}
          onClick={() => { if (touched.current) { if (wasOpen.current) setOpen(null); else show('film'); } }}
          {...trigger('film')}
        >capturing places I &lt;3 on film</span>.
      </p>

      {/* The crochet pieces, close together like a little pile of prints */}
      <div
        className={`${place} w-[280px]`}
        style={{ ...popoverBase, ...shown('crochet') }}
        onPointerEnter={e => { if (e.pointerType === 'mouse') show('crochet'); }}
        onPointerLeave={e => { if (e.pointerType === 'mouse') hide(); }}
      >
        <div className="flex items-start justify-center" style={{ filter: 'drop-shadow(0 2px 5px rgba(56, 54, 54, 0.22))' }}>
          {CROCHET.map((c, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={c.src} src={c.src} alt={c.alt} draggable={false}
              style={{ height: c.h, width: 'auto', marginLeft: i === 0 ? 0 : -16, marginTop: c.mt, transform: `rotate(${c.tilt}deg)`, position: 'relative', zIndex: i === 1 ? 2 : 1 }} />
          ))}
        </div>
        {/* With a mouse this is plain text (the pictures go away as the pointer leaves, so it could not be clicked; the phrase above is the link).
            On a phone, where the pictures stay until you tap away, it is an underlined link to the Instagram. */}
        <p className={captionCls} style={captionStyle}>
          {(() => {
            const icon = (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ display: 'inline', verticalAlign: 'middle', position: 'relative', top: '-1px', marginLeft: '5px' }}>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
              </svg>
            );
            return isTouch ? (
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="underline decoration-dotted decoration-[1.5px] decoration-current underline-offset-[4px] px-[2px] -mx-[2px] rounded-[2px]">
                More on loopieloopcrochet{icon}
              </a>
            ) : (<>More on loopieloopcrochet{icon}</>);
          })()}
        </p>
      </div>

      {/* The film photos, taking turns in one small print */}
      <div className={`${place} w-[230px]`} style={{ ...popoverBase, ...shown('film') }}>
        <div className="relative" style={{ background: '#fff', padding: 5, boxShadow: '0 2px 8px rgba(56, 54, 54, 0.14)' }}>
          <div className="relative" style={{ aspectRatio: '3 / 2' }}>
            {FILM.map((f, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={f.src} src={f.src} alt={i === frame ? f.alt : ''} aria-hidden={i === frame ? undefined : true} draggable={false}
                className="absolute inset-0 h-full w-full object-cover" style={{ opacity: i === frame ? 1 : 0, transition: 'opacity 400ms ease' }} />
            ))}
          </div>
        </div>
        <p className={captionCls} style={captionStyle}>Shot on 35mm film</p>
      </div>
    </div>
  );
}
