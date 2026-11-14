'use client';
import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import Link from 'next/link';
import { play } from 'cuelume';
import { projects } from '@/data/projects';
import type { Project } from '@/data/projects';
import { PixelPill } from './PixelEdge';

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
        fontFamily: 'var(--font-dm-sans)', fontWeight: 400,
        padding: '8px 12px', position: 'relative',
        letterSpacing: '0.02em', display: 'inline-flex',
        alignItems: 'center', gap: '6px',
      }}>
        <PixelPill fill="#383636" stroke="#FFFFFF" strokeWidth={0.3} />
        <span style={{ position: 'relative' }}>Read case study</span>
      </span>
    </div>,
    document.body
  );
}

function Thumbnail({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = /\.(mp4|webm|mov)$/i.test(project.thumbnail ?? '');
  const [hovered, setHovered] = useState(false);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setCursor({ x: e.clientX, y: e.clientY });
  };

  const handleEnter = () => {
    setHovered(true);
    if (project.videoPlayOnce && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <>
      {hovered && cursor && <Tooltip x={cursor.x} y={cursor.y} />}
      <div
        style={{ position: 'relative', cursor: hovered ? 'none' : 'auto' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleEnter}
        onMouseLeave={() => setHovered(false)}
      >

      <Link
        href={`/work/${project.slug}`}
        style={{ display: 'block', textDecoration: 'none' }}
        onClick={() => play('open', { theme: 'bubble', emphasis: 'subtle' })}
      >
        <div style={{ aspectRatio: project.thumbnailAspect ?? '4/3', overflow: 'hidden', position: 'relative' }}>
          {isVideo ? (
            <video
              ref={videoRef}
              src={project.thumbnail}
              autoPlay muted loop={!project.videoPlayOnce} playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hovered ? 'scale(1.008)' : 'scale(1)', opacity: hovered ? 0.9 : 1, transition: 'transform 3000ms cubic-bezier(0.19, 1, 0.22, 1), opacity 600ms ease' }}
              onEnded={project.videoEndOnFirstFrame ? () => { if (videoRef.current) videoRef.current.currentTime = 0; } : undefined}
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={project.thumbnail} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hovered ? 'scale(1.008)' : 'scale(1)', opacity: hovered ? 0.9 : 1, transition: 'transform 3000ms cubic-bezier(0.19, 1, 0.22, 1), opacity 600ms ease' }} />
          )}
          {/* Slight dark tint over the whole thumbnail */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0, 0, 0, 0.06)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 1800ms cubic-bezier(0.19, 1, 0.22, 1)',
            pointerEvents: 'none',
          }} />
          {/* Dark gradient shadow overlay */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 1800ms cubic-bezier(0.19, 1, 0.22, 1)',
            pointerEvents: 'none',
          }} />
          {/* Bottom blur overlay */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '36%',
            backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)',
            maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 1800ms cubic-bezier(0.19, 1, 0.22, 1)',
            pointerEvents: 'none',
          }} />
          {/* Hairline outline drawn on top: a 0.5px CSS border gets rounded up to 1px, an inset shadow keeps it as thin as the nav pill's */}
          <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 0 0.5px var(--text)', pointerEvents: 'none' }} />
        </div>
        <div style={{ paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p className="text-[18px] sm:text-[19px] lg:text-[22px] leading-tight" style={{ color: hovered ? 'var(--text-muted)' : 'var(--text)', fontFamily: "'Alegreya Sans', sans-serif", fontWeight: 600, lineHeight: 1.2, opacity: hovered ? 0.6 : 1, transition: 'color 400ms ease, opacity 400ms ease' }}>
            {project.mobileTitle ? (
              <>
                <span className="lg:hidden">{project.mobileTitle}</span>
                <span className="hidden lg:inline">{project.title}</span>
              </>
            ) : project.title}
          </p>
          <p className="text-[14px] sm:text-[15px] lg:text-[18px]" style={{ lineHeight: 1.2, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '5px' }}>
            {[project.tags.join(', '), ...(project.description ? project.description.split(' \\ ') : [])].map((part, i, arr) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ color: i === 0 ? 'var(--text)' : 'var(--text-muted)', fontStyle: i === 0 ? 'italic' : 'normal', fontFamily: i === 0 ? 'var(--font-dm-sans)' : undefined, opacity: 0.8 }}>{part}</span>
                {i < arr.length - 1 && (
                  <span
                    aria-hidden
                    style={{
                      display: 'inline-block',
                      width: 20,
                      height: 20,
                      flexShrink: 0,
                      backgroundColor: 'var(--text)',
                      WebkitMaskImage: 'url("/images/Chunky Black Pixel Sparkle Icon (1).png")',
                      maskImage: 'url("/images/Chunky Black Pixel Sparkle Icon (1).png")',
                      WebkitMaskSize: 'contain',
                      maskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      maskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      maskPosition: 'center',
                    }}
                  />
                )}
              </span>
            ))}
          </p>
        </div>
      </Link>
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
