'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Project } from '@/data/projects';

export default function CaseStudyCard({ project, padTop = 26 }: { project: Project; padTop?: number }) {
  const [hovered, setHovered] = useState(false);
  const [thumbActive, setThumbActive] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [showShimmer, setShowShimmer] = useState(false);
  const isVideo = /\.(mp4|webm|mov)$/i.test(project.thumbnail ?? '');
  const href = `/work/${project.slug}`;
  const videoRef = useRef<HTMLVideoElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Delay shimmer by 200ms — avoids flash for fast/cached media
  useEffect(() => {
    if (mediaLoaded) return;
    const t = setTimeout(() => setShowShimmer(true), 200);
    return () => clearTimeout(t);
  }, [mediaLoaded]);

  // Handle already-cached media (won't fire load events after mount)
  useEffect(() => {
    if (isVideo) {
      if (videoRef.current && videoRef.current.readyState >= 3) setMediaLoaded(true);
    } else {
      if (imgRef.current && imgRef.current.complete) setMediaLoaded(true);
    }
  }, [isVideo]);

  const handleMediaReady = () => setMediaLoaded(true);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setCursor({ x: e.clientX, y: e.clientY });
  };

  const handleThumbEnter = () => {
    setThumbActive(true);
    if (project.videoPlayOnce && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const mediaStyle: React.CSSProperties = {
    transition: 'transform 3000ms cubic-bezier(0.19, 1, 0.22, 1), opacity 600ms ease',
    transform: hovered ? 'scale(1.008)' : 'scale(1)',
    opacity: hovered ? 0.93 : 1,
  };

  const thumbnailMedia = project.thumbnail ? (
    isVideo ? (
      <video
        ref={videoRef}
        src={project.thumbnail}
        autoPlay
        muted
        loop={!project.videoPlayOnce}
        playsInline
        className="w-full h-full object-cover origin-center"
        style={mediaStyle}
        onCanPlay={handleMediaReady}
        onError={handleMediaReady}
        onEnded={project.videoEndOnFirstFrame ? () => { if (videoRef.current) videoRef.current.currentTime = 0; } : undefined}
      />
    ) : (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img ref={imgRef} src={project.thumbnail} alt={project.title} className="w-full h-full object-cover origin-center" style={mediaStyle} onLoad={handleMediaReady} onError={handleMediaReady} />
    )
  ) : (
    <div className="w-full h-full flex items-center justify-center font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
      project thumbnail
    </div>
  );

  const overlayStyle: React.CSSProperties = {
    transition: 'opacity 1800ms cubic-bezier(0.19, 1, 0.22, 1)',
    opacity: thumbActive ? 1 : 0,
  };

  const tooltipStyle: React.CSSProperties = {
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
  };

  const thumbnailWrapper = (extraStyle: React.CSSProperties) => (
    <Link href={href} style={{ color: 'inherit' }} data-cuelume-open="" data-cuelume-emphasis="subtle">
      <div
        onMouseEnter={handleThumbEnter}
        onMouseLeave={() => setThumbActive(false)}
        style={{ position: 'relative', overflow: 'hidden', border: '0.5px solid var(--thumb-border)', ...extraStyle }}
      >
        {thumbnailMedia}
        {/* Shimmer — fades out once media is ready */}
        <div
          className={showShimmer && !mediaLoaded ? 'media-shimmer' : ''}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 1,
            opacity: showShimmer && !mediaLoaded ? 1 : 0,
            transition: 'opacity 500ms ease',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '60%', background: 'linear-gradient(to top, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)', ...overlayStyle }} />
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '30%', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)', maskImage: 'linear-gradient(to top, black 0%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)', ...overlayStyle }} />
      </div>
    </Link>
  );

  const titleStyle: React.CSSProperties = {
    color: 'var(--text)',
    fontFamily: 'var(--font-dm-sans)',
    fontWeight: 600,
    fontStyle: 'normal',
    letterSpacing: '0',
    opacity: hovered ? 0.7 : 1,
    transition: 'opacity 500ms ease',
  };

  const tooltipEl = (
    <div style={tooltipStyle}>
      <span style={{
        background: '#383636',
        color: '#FFFFFF',
        fontSize: '15px',
        fontStyle: 'normal',
        fontFamily: 'var(--font-dm-sans)',
        fontWeight: 400,
        padding: '8px 12px',
        borderRadius: '999px',
        border: '0.5px solid rgba(255,255,255,0.65)',
        letterSpacing: '0.02em',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
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
        onMouseMove={handleCardMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setThumbActive(false); }}
      >

      <div className="@container" style={{ overflow: 'hidden' }}>
        <div className="flex flex-col" style={{ paddingTop: `${padTop}px` }}>
          {thumbnailWrapper({ width: '100%', aspectRatio: project.thumbnailAspect ?? '4/3', background: 'var(--divider)' })}
          <div className="pt-4 md:pt-[10px]" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {/* Line 1: tag */}
            <p className="text-[16px] lg:text-[17.5px]" style={{ fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.2, opacity: 0.7 }}>
              {project.tags.join(', ')}
            </p>
            {/* Line 2: title */}
            <Link href={href} data-cuelume-open="" data-cuelume-emphasis="subtle">
              <h2 className="leading-tight text-[18px] lg:text-[20px]" style={{ ...titleStyle }}>
                {project.mobileTitle ? (
                  <>
                    <span className="lg:hidden">{project.mobileTitle}</span>
                    <span className="hidden lg:inline">{project.title}</span>
                  </>
                ) : project.title}
              </h2>
            </Link>
            {/* Line 3: descriptors */}
            {project.description ? (
              <p className="text-[16px] lg:text-[17.5px]" style={{ lineHeight: 1.2, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '5px' }}>
                {project.description.split(' \\ ').map((part, i, arr) => (
                  <span key={i} style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    {part}
                    {i < arr.length - 1 && (
                      <img src="/images/Chunky Black Pixel Sparkle Icon (1).png" alt="" aria-hidden width="18" height="18" style={{ flexShrink: 0 }} />
                    )}
                  </span>
                ))}
              </p>
            ) : null}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
