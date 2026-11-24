'use client';
import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import Link from 'next/link';
import { play } from 'cuelume';
import { projects } from '@/data/projects';
import type { Project } from '@/data/projects';
import { PixelPill } from './PixelEdge';
import { clearCoverTransition, getCoverTransition, landCoverTransition, startCoverTransition } from './CoverTransition';
import type { FrostState } from './CoverTransition';

function Tooltip({ x, y }: { x: number; y: number }) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return createPortal(
    <div style={{
      position: 'fixed',
      left: x + 20,
      top: y + 8,
      pointerEvents: 'none',
      zIndex: 9999,
      whiteSpace: 'nowrap',
      clipPath: revealed ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
      filter: revealed ? 'blur(0px)' : 'blur(5px)',
      transition: 'clip-path 600ms cubic-bezier(0.16, 1, 0.3, 1), filter 500ms cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      <span style={{
        color: '#FFFFFF', fontSize: '15px',
        fontFamily: 'var(--font-dm-sans)', fontWeight: 400, fontStyle: 'italic',
        padding: '8px 12px', position: 'relative',
        letterSpacing: '0.02em', display: 'inline-flex',
        alignItems: 'center', gap: '6px',
      }}>
        <PixelPill fill="var(--ink)" stroke="#FFFFFF" strokeWidth={0.3} />
        <span style={{ position: 'relative' }}>View case study</span>
      </span>
    </div>,
    document.body
  );
}

// Letters set in Dreamer TM's first stylistic set, as in the name wordmark (the letter shapes stay the same on hover)
function WordmarkText({ text }: { text: string }) {
  return (
    <>
      {[...text].map((ch, i) => (
        // Dreamer's hyphen and comma look off, so they borrow Alegreya's, as in the headlines
        <span key={i} style={ch === '-' || ch === ',' ? { fontFamily: 'var(--font-dm-sans)', fontWeight: 700, letterSpacing: 0 } : { fontFeatureSettings: '"ss01"' }}>{ch}</span>
      ))}
    </>
  );
}

function Thumbnail({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = /\.(mp4|webm|mov)$/i.test(project.thumbnail ?? '');
  const [hovered, setHovered] = useState(false); // pointer is over the thumbnail image itself
  const [titleHovered, setTitleHovered] = useState(false);
  // After pointer leaves, the frost stays spread out and simply melts away, then resets (collapsing it would look abrupt)
  const [clearing, setClearing] = useState(false);
  useEffect(() => {
    if (hovered) return;
    const t = setTimeout(() => setClearing(false), 1400);
    return () => clearTimeout(t);
  }, [hovered]);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const frostRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // How far along the hover frost is right now (it builds up over a second or so), read from the live thumbnail
  const readFrost = (): FrostState | undefined => {
    const tint = frostRef.current, media = thumbRef.current?.querySelector<HTMLElement>('video, img');
    if (!tint || !shadowRef.current || !bottomRef.current || !media) return undefined;
    const ts = getComputedStyle(tint), ms = getComputedStyle(media);
    return {
      maskSize: ts.maskSize || ts.getPropertyValue('-webkit-mask-size') || '340% 340%',
      blur: ts.backdropFilter || 'blur(9px) saturate(1.08)',
      tintOpacity: ts.opacity,
      shadowOpacity: getComputedStyle(shadowRef.current).opacity,
      bottomOpacity: getComputedStyle(bottomRef.current).opacity,
      mediaOpacity: ms.opacity,
      mediaTransform: ms.transform === 'none' ? 'scale(1)' : ms.transform,
    };
  };

  // Clicking sends a copy of the thumbnail on ahead of the page, to grow into the case study's cover
  const beginTransition = (e: React.MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = thumbRef.current;
    if (!el || !project.thumbnail) return;
    const r = el.getBoundingClientRect();
    startCoverTransition({
      slug: project.slug,
      rect: { left: r.left, top: r.top, width: r.width, height: r.height },
      src: project.thumbnail,
      isVideo,
      time: videoRef.current?.currentTime ?? 0,
      alt: project.title,
      frosted: hovered ? readFrost() : undefined, // clicked while hovering: the copy keeps the frost, exactly as far along as it was
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // A tap on a phone also fires mouse events, but there is no pointer to follow there, so no tooltip
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    setCursor({ x: e.clientX, y: e.clientY });
  };

  // The grid renders a copy of every thumbnail per screen size (the ones that don't fit are hidden with CSS), so a video must
  // only load and play while it is actually on screen. Hidden copies never intersect, so they stay idle and download nothing.
  const startedOnce = useRef(false);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (project.videoPlayOnce && startedOnce.current) return; // play-once videos only auto-play the first time
        startedOnce.current = true;
        v.play().catch(() => {});
      } else if (!project.videoPlayOnce || v.ended) {
        v.pause();
      }
    }, { rootMargin: '100px' });
    io.observe(v);
    return () => io.disconnect();
  }, [project.videoPlayOnce]);

  const handleEnter = () => {
    setHovered(true);
    setClearing(true);
    if (project.videoPlayOnce && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <>
      {hovered && cursor && <Tooltip x={cursor.x} y={cursor.y} />}
      <div style={{ position: 'relative' }}>

      <Link
        href={`/work/${project.slug}`}
        style={{ display: 'block', textDecoration: 'none' }}
        onClick={e => { beginTransition(e); play('open', { theme: 'bubble', emphasis: 'subtle' }); }}
      >
        <div
          ref={thumbRef}
          data-cover-thumb={project.slug}
          style={{ aspectRatio: project.thumbnailAspect ?? '4/3', overflow: 'hidden', position: 'relative', cursor: hovered ? 'none' : 'auto' }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleEnter}
          onMouseLeave={() => setHovered(false)}
        >
          {isVideo ? (
            <video
              ref={videoRef}
              src={project.thumbnail}
              muted loop={!project.videoPlayOnce} playsInline preload="none"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hovered ? 'scale(1.008)' : 'scale(1)', opacity: hovered ? 0.9 : 1, transition: 'transform 3000ms cubic-bezier(0.19, 1, 0.22, 1), opacity 600ms ease' }}
              onEnded={project.videoEndOnFirstFrame ? () => { if (videoRef.current) videoRef.current.currentTime = 0; } : undefined}
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={project.thumbnail} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hovered ? 'scale(1.008)' : 'scale(1)', opacity: hovered ? 0.9 : 1, transition: 'transform 3000ms cubic-bezier(0.19, 1, 0.22, 1), opacity 600ms ease' }} />
          )}
          {/* Frost: a soft-edged patch of frosted glass, tinted with the site's dark, that spreads out from the centre of the
              thumbnail (same every time, wherever the pointer enters) until it covers it. Blur and tint build up slower than they clear, so it feels like it settles on. */}
          <div ref={frostRef} style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(160deg, rgba(255,255,255,0.16) 0%, color-mix(in srgb, var(--ink) 28%, transparent) 100%)',
            backdropFilter: hovered ? 'blur(9px) saturate(1.08)' : 'blur(0px) saturate(1)',
            WebkitBackdropFilter: hovered ? 'blur(9px) saturate(1.08)' : 'blur(0px) saturate(1)',
            WebkitMaskImage: 'radial-gradient(circle at center, #000 0%, #000 45%, transparent 72%)',
            maskImage: 'radial-gradient(circle at center, #000 0%, #000 45%, transparent 72%)',
            WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center', maskPosition: 'center',
            WebkitMaskSize: hovered || clearing ? '340% 340%' : '0% 0%', maskSize: hovered || clearing ? '340% 340%' : '0% 0%',
            opacity: hovered ? 1 : 0,
            transition: hovered
              ? 'mask-size 1600ms cubic-bezier(0.22, 1, 0.36, 1), -webkit-mask-size 1600ms cubic-bezier(0.22, 1, 0.36, 1), backdrop-filter 1400ms cubic-bezier(0.22, 1, 0.36, 1), -webkit-backdrop-filter 1400ms cubic-bezier(0.22, 1, 0.36, 1), opacity 900ms ease'
              : 'backdrop-filter 1300ms cubic-bezier(0.33, 0, 0.2, 1), -webkit-backdrop-filter 1300ms cubic-bezier(0.33, 0, 0.2, 1), opacity 1300ms cubic-bezier(0.33, 0, 0.2, 1)',
            pointerEvents: 'none',
          }} />
          {/* Dark gradient shadow overlay */}
          <div ref={shadowRef} style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 1800ms cubic-bezier(0.19, 1, 0.22, 1)',
            pointerEvents: 'none',
          }} />
          {/* Bottom blur overlay */}
          <div ref={bottomRef} style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '36%',
            backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)',
            maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 1800ms cubic-bezier(0.19, 1, 0.22, 1)',
            pointerEvents: 'none',
          }} />
          {/* Hairline outline drawn on top: a 0.5px CSS border gets rounded up to 1px, an inset shadow keeps it as thin as the nav pill's */}
          <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 0 0.5px #F0F0EE', pointerEvents: 'none' }} />
        </div>
      </Link>
        {/* Only the thumbnail and the title are links; the tags below are plain text with the default pointer */}
        <div style={{ paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <Link
            href={`/work/${project.slug}`}
            style={{ display: 'inline-block', alignSelf: 'flex-start', textDecoration: 'none' }}
            onClick={e => { beginTransition(e); play('open', { theme: 'bubble', emphasis: 'subtle' }); }}
            onMouseEnter={() => setTitleHovered(true)}
            onMouseLeave={() => setTitleHovered(false)}
          >
          {/* Set like the name wordmark: Dreamer TM with every letter in ss01 */}
          <p className="text-[23px] lg:text-[28px] leading-tight" style={{ color: hovered || titleHovered ? 'var(--text-muted)' : 'var(--text)', fontFamily: "'Dreamer TM', serif", fontWeight: 400, letterSpacing: '0.06em', lineHeight: 1.15, opacity: hovered || titleHovered ? 0.85 : 1, transition: 'color 400ms ease, opacity 400ms ease' }}>
            {project.mobileTitle ? (
              <>
                <span className="lg:hidden"><WordmarkText text={project.mobileTitle} /></span>
                <span className="hidden lg:inline"><WordmarkText text={project.title} /></span>
              </>
            ) : <WordmarkText text={project.title} />}
          </p>
          </Link>
          <p className="text-[15px] lg:text-[18px]" style={{ lineHeight: 1.2, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '5px' }}>
            {[project.tags.join(', '), ...(project.description ? project.description.split(' \\ ') : [])].map((part, i, arr) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ color: i === 0 ? 'var(--text)' : 'var(--text-muted)', fontStyle: 'normal', fontFamily: i === 0 ? 'var(--font-dm-sans)' : undefined, opacity: 0.8 }}>{part}</span>
                {i < arr.length - 1 && (
                  <span aria-hidden style={{ color: 'var(--text-muted)', opacity: 0.8 }}>{'\\'}</span>
                )}
              </span>
            ))}
          </p>
        </div>
      </div>
    </>
  );
}

const FROM = { opacity: 0, filter: 'blur(6px)' };
const TO = { opacity: 1, filter: 'blur(0px)', duration: 0.65, ease: 'power2.out' };

const leftCol = projects.filter((_, i) => i % 2 === 0);
const rightCol = projects.filter((_, i) => i % 2 === 1);

export default function StaggeredGrid() {
  const mobileRef = useRef<HTMLDivElement>(null);
  const tabletL = useRef<HTMLDivElement>(null);
  const tabletR = useRef<HTMLDivElement>(null);
  const desktopSingle = useRef<HTMLDivElement>(null);
  const desktopL = useRef<HTMLDivElement>(null);
  const desktopR = useRef<HTMLDivElement>(null);

  // Coming back from a case study: the cover settles into this project's thumbnail
  useEffect(() => {
    const t = getCoverTransition(undefined, 'back');
    if (!t) return;
    const el = Array.from(document.querySelectorAll<HTMLElement>(`[data-cover-thumb="${t.slug}"]`)).find(e => e.getBoundingClientRect().width > 0);
    if (!el) { clearCoverTransition(); return; }
    const r = el.getBoundingClientRect();
    // Where it will sit once the page has been scrolled back to the top (that happens right after this effect)
    landCoverTransition({ left: r.left, top: r.top + window.scrollY, width: r.width, height: r.height });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (mobileRef.current?.children.length)
        gsap.fromTo(mobileRef.current.children, FROM, { ...TO, stagger: 0.1, delay: 0.05 });
      if (tabletL.current?.children.length)
        gsap.fromTo(tabletL.current.children, FROM, { ...TO, stagger: 0.12, delay: 0.05 });
      if (tabletR.current?.children.length)
        gsap.fromTo(tabletR.current.children, FROM, { ...TO, stagger: 0.12, delay: 0.17 });
      if (desktopSingle.current?.children.length)
        gsap.fromTo(desktopSingle.current.children, FROM, { ...TO, stagger: 0.12, delay: 0.05 });
      if (desktopL.current?.children.length)
        gsap.fromTo(desktopL.current.children, FROM, { ...TO, stagger: 0.12, delay: 0.05 });
      if (desktopR.current?.children.length)
        gsap.fromTo(desktopR.current.children, FROM, { ...TO, stagger: 0.12, delay: 0.22 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Mobile: single column, 16px padding aligns with wordmark */}
      <div className="md:hidden px-4 pt-12 pb-20">
        <div ref={mobileRef} style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {projects.map((p) => (
            <div key={p.slug} style={{ opacity: 0 }}>
              <Thumbnail project={p} />
            </div>
          ))}
        </div>
      </div>

      {/* Tablet: two columns, 16px padding aligns with wordmark, no stagger offset */}
      <div className="hidden md:block lg:hidden px-4 pt-12 pb-20">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
          <div ref={tabletL} style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {leftCol.map((p) => (
              <div key={p.slug} style={{ opacity: 0 }}>
                <Thumbnail project={p} />
              </div>
            ))}
          </div>
          <div ref={tabletR} style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {rightCol.map((p) => (
              <div key={p.slug} style={{ opacity: 0 }}>
                <Thumbnail project={p} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* lg only: single column (thumbnails too small for two columns at this width) */}
      <div className="hidden lg:block xl:hidden pb-20" style={{ paddingLeft: '76px', paddingRight: '24px', paddingTop: '88px' }}>
        <div ref={desktopSingle} style={{ display: 'flex', flexDirection: 'column', gap: '64px', maxWidth: '640px' }}>
          {projects.map((p) => (
            <div key={p.slug} style={{ opacity: 0 }}>
              <Thumbnail project={p} />
            </div>
          ))}
        </div>
      </div>

      {/* xl+: staggered two columns */}
      <div className="hidden xl:block pb-20" style={{ paddingLeft: 'max(76px, 5.5vw)', paddingRight: '32px', paddingTop: '88px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }}>
          <div ref={desktopL} style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
            {leftCol.map((p) => (
              <div key={p.slug} style={{ opacity: 0 }}>
                <Thumbnail project={p} />
              </div>
            ))}
          </div>
          <div ref={desktopR} style={{ display: 'flex', flexDirection: 'column', gap: '64px', marginTop: '120px' }}>
            {rightCol.map((p) => (
              <div key={p.slug} style={{ opacity: 0 }}>
                <Thumbnail project={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
