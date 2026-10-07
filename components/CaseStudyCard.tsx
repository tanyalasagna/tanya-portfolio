'use client';
import Link from 'next/link';
import { useState } from 'react';
import type { Project } from '@/data/projects';

export default function CaseStudyCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const isVideo = /\.(mp4|webm|mov)$/i.test(project.thumbnail ?? '');
  const href = `/work/${project.slug}`;

  const mediaStyle: React.CSSProperties = {
    transition: 'transform 3000ms cubic-bezier(0.19, 1, 0.22, 1), opacity 600ms ease',
    transform: hovered ? 'scale(1.025)' : 'scale(1)',
    opacity: hovered ? 0.75 : 1,
  };

  const thumbnailMedia = project.thumbnail ? (
    isVideo ? (
      <video src={project.thumbnail} autoPlay muted loop playsInline className="w-full h-full object-cover origin-center" style={mediaStyle} />
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
    opacity: hovered ? 1 : 0,
  };

  const thumbnailWrapper = (extraStyle: React.CSSProperties) => (
    <Link href={href} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ color: 'inherit' }}>
      <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid var(--thumb-border)', ...extraStyle }}>
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
    <div className="@container" style={{ overflow: 'hidden' }}>
      {/* Vertical layout — thumbnail top, text below, always */}
      <div className="flex flex-col" style={{ paddingTop: '32px' }}>
        {thumbnailWrapper({ width: '100%', aspectRatio: '4/3', background: 'var(--divider)' })}
        <div style={{ paddingTop: '12px' }}>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mb-1">
            {project.tags.map((tag) => (
              <span key={tag} className="font-mono" style={{ color: 'var(--accent)', fontSize: '15px' }}>
                {tag}
              </span>
            ))}
          </div>
          <Link href={href} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <h2 className="leading-tight" style={{ ...titleStyle, fontSize: '24px', marginBottom: '6px' }}>
              {project.title}
            </h2>
          </Link>
          <p className="leading-relaxed" style={{ color: 'var(--text-muted)', fontSize: '16px', whiteSpace: 'pre-line' }}>
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
}
