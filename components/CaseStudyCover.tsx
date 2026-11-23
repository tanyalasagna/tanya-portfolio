'use client';
import { useEffect, useRef, useState } from 'react';
import { getCoverHandoffTime, getCoverTransition, landCoverTransition, useCoverPending } from './CoverTransition';
import type { Project } from '@/data/projects';

export default function CaseStudyCover({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // Arrived by clicking this project's thumbnail: stay hidden until the thumbnail has grown into this spot
  const [arriving] = useState(() => getCoverTransition(project.slug) !== null);
  const pending = useCoverPending(project.slug);
  const isVideo = /\.(mp4|webm|mov)$/i.test(project.thumbnail ?? '');

  useEffect(() => {
    if (!arriving) return;
    const el = boxRef.current;
    if (!el) return;
    // Measure where this cover will sit once the page is scrolled back to the top (the scroll reset happens right after this effect)
    const r = el.getBoundingClientRect();
    landCoverTransition({ left: r.left, top: r.top + window.scrollY, width: r.width, height: r.height });
  }, [arriving]);

  // When the thumbnail lands, pick the video up from the same frame it had reached
  useEffect(() => {
    if (pending || !arriving) return;
    const v = videoRef.current;
    const t = getCoverHandoffTime();
    if (v && t) { try { v.currentTime = t; } catch {} }
  }, [pending, arriving]);

  const handleEnter = () => {
    if (project.videoPlayOnce && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <div
      ref={boxRef}
      className="w-full overflow-hidden mb-10"
      style={{ aspectRatio: project.thumbnailAspect ?? '16/9', background: 'var(--bg-hover)', position: 'relative', visibility: pending ? 'hidden' : 'visible' }}
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
