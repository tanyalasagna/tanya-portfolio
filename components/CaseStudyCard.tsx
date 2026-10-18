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
    transform: hovered ? 'scale(1.025)' : 'scale(1)',
    opacity: hovered ? 0.75 : 1,
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
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '80%', background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)', ...overlayStyle }} />
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '40%', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', maskImage: 'linear-gradient(to top, black 0%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)', ...overlayStyle }} />
      </div>
    </Link>
  );

  const titleStyle: React.CSSProperties = {
    color: 'var(--text)',
    fontFamily: "'Dreamer TM', serif",
    fontFeatureSettings: '"ss01"',
    letterSpacing: '0.06em',
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
          <div style={{ paddingTop: '10px' }}>
            <Link href={href}>
              <h2 className="leading-tight text-[24px] lg:text-[26px]" style={{ ...titleStyle, marginBottom: '0.5px' }}>
                {project.title}
              </h2>
            </Link>
            <p className="leading-relaxed text-[14px] lg:text-[16px]" style={{}}>
              <span style={{ fontStyle: 'italic', color: 'var(--text)' }}>{project.tags.join(', ')}</span>
              {project.description ? (
                <span style={{ color: 'var(--text-muted)' }}>{` \\ ${project.description}`}</span>
              ) : null}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
