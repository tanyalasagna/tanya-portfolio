'use client';
import { useRef } from 'react';
import type { Project } from '@/data/projects';

export default function CaseStudyCover({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = /\.(mp4|webm|mov)$/i.test(project.thumbnail ?? '');

  const handleEnter = () => {
    if (project.videoPlayOnce && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <div
      className="w-full overflow-hidden mb-10"
      style={{ aspectRatio: project.thumbnailAspect ?? '16/9', background: 'var(--bg-hover)', border: '0.5px solid var(--divider)', position: 'relative' }}
      onMouseEnter={handleEnter}
    >
      {project.thumbnail ? (
        isVideo ? (
          <video
            ref={videoRef}
            src={project.thumbnail}
            autoPlay
            muted
            loop={!project.videoPlayOnce}
            playsInline
            className="w-full h-full object-cover"
            style={{ display: 'block' }}
            onEnded={project.videoEndOnFirstFrame ? () => { if (videoRef.current) videoRef.current.currentTime = 0; } : undefined}
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" style={{ display: 'block' }} />
        )
      ) : null}
    </div>
  );
}
