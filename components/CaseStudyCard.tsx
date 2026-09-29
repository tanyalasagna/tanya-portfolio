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
      <div style={{ position: 'relative', overflow: 'hidden', ...extraStyle }}>
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
    letterSpacing: '0.05em',
    opacity: hovered ? 0.6 : 1,
    transition: 'opacity 500ms ease',
  };

  return (
    <div className="@container">
      {/* Horizontal layout */}
      <div className="hidden @[700px]:flex items-stretch">
        <div className="flex flex-col justify-start pr-8" style={{ width: '45%', paddingLeft: '37px' }}>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mb-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="font-mono" style={{ color: 'var(--accent)', fontSize: '18px' }}>
                {tag}
              </span>
            ))}
          </div>
          <Link href={href} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <h2 className="leading-tight" style={{ ...titleStyle, fontSize: '32px', marginBottom: '12px' }}>
              {project.title}
            </h2>
          </Link>
          <p className="leading-relaxed" style={{ color: 'var(--text-muted)', fontSize: '18px', whiteSpace: 'pre-line' }}>
            {project.description}
          </p>
        </div>

        <div className="flex-shrink-0 @[900px]:p-0 py-5 pr-5" style={{ width: '55%', alignSelf: 'flex-start' }}>
          {thumbnailWrapper({ width: '100%', aspectRatio: '4/3', background: 'var(--divider)', border: '0.05px solid color-mix(in srgb, var(--text) 18%, transparent)' })}
        </div>
      </div>

      {/* Vertical layout */}
      <div className="flex flex-col @[700px]:hidden">
        {thumbnailWrapper({ width: 'calc(100% + 48px)', aspectRatio: '4/3', background: 'var(--divider)', marginLeft: '-24px', marginRight: '-24px' })}
        <div className="py-7" style={{ marginLeft: '-24px' }}>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mb-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="font-mono" style={{ color: 'var(--accent)', fontSize: '16px' }}>
                {tag}
              </span>
            ))}
          </div>
          <Link href={href} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <h2 className="leading-tight" style={{ ...titleStyle, fontSize: '24px', marginBottom: '12px' }}>
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
