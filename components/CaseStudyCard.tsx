'use client';
import Link from 'next/link';
import { useState, useRef } from 'react';
import type { Project } from '@/data/projects';

export default function CaseStudyCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const [thumbActive, setThumbActive] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const isVideo = /\.(mp4|webm|mov)$/i.test(project.thumbnail ?? '');
  const href = `/work/${project.slug}`;
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
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
        onEnded={project.videoEndOnFirstFrame ? () => { if (videoRef.current) videoRef.current.currentTime = 0; } : undefined}
      />
    ) : (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover origin-center" style={mediaStyle} />
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
    position: 'absolute',
    left: cursor.x,
    top: cursor.y,
    transform: 'translate(20px, 8px)',
    pointerEvents: 'none',
    zIndex: 20,
    whiteSpace: 'nowrap',
    clipPath: hovered ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
    transition: hovered ? 'clip-path 350ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
  };

  const thumbnailWrapper = (extraStyle: React.CSSProperties) => (
    <Link href={href} style={{ color: 'inherit' }}>
      <div
        onMouseEnter={handleThumbEnter}
        onMouseLeave={() => setThumbActive(false)}
        style={{ position: 'relative', overflow: 'hidden', border: '0.5px solid var(--thumb-border)', ...extraStyle }}
      >
        {thumbnailMedia}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '60%', background: 'linear-gradient(to top, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)', ...overlayStyle }} />
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '30%', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)', maskImage: 'linear-gradient(to top, black 0%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)', ...overlayStyle }} />
      </div>
    </Link>
  );

  const titleStyle: React.CSSProperties = {
    color: 'var(--text)',
    fontFamily: 'var(--font-dm-sans)',
    fontWeight: 700,
    fontStyle: 'normal',
    letterSpacing: '0',
    opacity: hovered ? 0.6 : 1,
    transition: 'opacity 500ms ease',
  };

  return (
    <div
      style={{ position: 'relative', cursor: hovered ? 'none' : 'auto' }}
      onMouseMove={handleCardMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setThumbActive(false); }}
    >
      {/* Cursor-following tooltip */}
      <div style={tooltipStyle}>
        <span style={{
          background: '#1A1A1A',
          color: '#FFFFFF',
          fontSize: '15px',
          fontStyle: 'normal',
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 400,
          padding: '8px 12px',
          borderRadius: '2px',
          border: '0.5px solid rgba(255,255,255,0.2)',
          letterSpacing: '0.02em',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          Read Case Study
        </span>
      </div>

      <div className="@container" style={{ overflow: 'hidden' }}>
        <div className="flex flex-col" style={{ paddingTop: '32px' }}>
          {thumbnailWrapper({ width: '100%', aspectRatio: project.thumbnailAspect ?? '4/3', background: 'var(--divider)' })}
          <div style={{ paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {/* Line 1: tag */}
            <p className="text-[16px] lg:text-[17.5px]" style={{ fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.2 }}>
              {project.tags.join(', ')}
            </p>
            {/* Line 2: title */}
            <Link href={href}>
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
              <p className="text-[16px] lg:text-[17.5px]" style={{ lineHeight: 1.2 }}>
                {(() => {
                  const parts = project.description.split(' \\ ');
                  return parts.map((part, i) => (
                    <span key={i} style={{ color: 'var(--text-muted)' }}>
                      {i === 0 ? part : ` \\ ${part}`}
                    </span>
                  ));
                })()}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
