'use client';
import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import Link from 'next/link';
import { play } from 'cuelume';
import { projects } from '@/data/projects';
import type { Project } from '@/data/projects';

function Thumbnail({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = /\.(mp4|webm|mov)$/i.test(project.thumbnail ?? '');
  const [hovered, setHovered] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

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

  const tooltipEl = (
    <div style={{
      position: 'fixed',
      left: cursor.x + 20,
      top: cursor.y + 8,
      pointerEvents: 'none',
      zIndex: 9999,
      whiteSpace: 'nowrap',
      clipPath: hovered ? 'inset(0 0% 0 0 round 999px)' : 'inset(0 100% 0 0 round 999px)',
      filter: hovered ? 'blur(0px)' : 'blur(5px)',
      transition: hovered
        ? 'clip-path 600ms cubic-bezier(0.16, 1, 0.3, 1), filter 500ms cubic-bezier(0.16, 1, 0.3, 1)'
        : 'none',
    }}>
      <span style={{
        background: '#383636', color: '#FFFFFF', fontSize: '15px',
        fontFamily: 'var(--font-dm-sans)', fontWeight: 400,
        padding: '8px 12px', borderRadius: '999px',
        border: '0.5px solid rgba(255,255,255,0.65)',
        letterSpacing: '0.02em', display: 'inline-flex',
        alignItems: 'center', gap: '6px',
      }}>
        Read case study
      </span>
    </div>
  );

  return (
    <>
      {typeof document !== 'undefined' && createPortal(tooltipEl, document.body)}
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
        <div style={{ aspectRatio: project.thumbnailAspect ?? '4/3', overflow: 'hidden', borderRadius: '6px', position: 'relative' }}>
          {isVideo ? (
            <video
              ref={videoRef}
              src={project.thumbnail}
              autoPlay muted loop={!project.videoPlayOnce} playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hovered ? 'scale(1.008)' : 'scale(1)', opacity: hovered ? 0.93 : 1, transition: 'transform 3000ms cubic-bezier(0.19, 1, 0.22, 1), opacity 600ms ease' }}
              onEnded={project.videoEndOnFirstFrame ? () => { if (videoRef.current) videoRef.current.currentTime = 0; } : undefined}
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={project.thumbnail} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hovered ? 'scale(1.008)' : 'scale(1)', opacity: hovered ? 0.93 : 1, transition: 'transform 3000ms cubic-bezier(0.19, 1, 0.22, 1), opacity 600ms ease' }} />
          )}
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
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%',
            backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)',
            maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 1800ms cubic-bezier(0.19, 1, 0.22, 1)',
            pointerEvents: 'none',
          }} />
        </div>
        <div style={{ paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p className="text-[16px] lg:text-[18px]" style={{ color: 'var(--text)', fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', lineHeight: 1.2, opacity: 0.7 }}>
            {project.tags.join(', ')}
          </p>
          <p className="text-[18px] lg:text-[21px] leading-tight" style={{ color: 'var(--text)', fontFamily: "'Alegreya Sans', sans-serif", fontWeight: 600, lineHeight: 1.2 }}>
            {project.mobileTitle ? (
              <>
                <span className="lg:hidden">{project.mobileTitle}</span>
                <span className="hidden lg:inline">{project.title}</span>
              </>
            ) : project.title}
          </p>
          {project.description && (
            <p className="text-[16px] lg:text-[18px]" style={{ lineHeight: 1.2, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '5px' }}>
              {project.description.split(' \\ ').map((part, i, arr) => (
                <span key={i} style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  {part}
                  {i < arr.length - 1 && (
                    <img src="/images/Chunky Black Pixel Sparkle Icon (1).png" alt="" aria-hidden width="18" height="18" style={{ flexShrink: 0 }} />
                  )}
                </span>
              ))}
            </p>
          )}
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
      <div className="hidden lg:block xl:hidden pb-20" style={{ paddingLeft: '48px', paddingRight: '32px', paddingTop: '88px' }}>
        <div ref={desktopSingle} style={{ display: 'flex', flexDirection: 'column', gap: '64px', maxWidth: '680px' }}>
          {projects.map((p) => (
            <div key={p.slug} style={{ opacity: 0 }}>
              <Thumbnail project={p} />
            </div>
          ))}
        </div>
      </div>

      {/* xl+: staggered two columns */}
      <div className="hidden xl:block pb-20" style={{ paddingLeft: 'max(32px, 8vw)', paddingRight: '32px', paddingTop: '88px' }}>
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
