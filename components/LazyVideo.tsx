'use client';
import { useEffect, useRef } from 'react';

type Props = Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'autoPlay' | 'ref'> & {
  rate?: number;
};

// Looping muted video that only plays while it is on (or just about to be on) screen.
// Offscreen videos are paused and only fetch their metadata, so a page with many videos
// doesn't decode and download all of them at once.
export default function LazyVideo({ rate, preload = 'metadata', onLoadedMetadata, ...rest }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (rate) el.playbackRate = rate;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { rootMargin: '200px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rate]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload={preload}
      onLoadedMetadata={e => {
        if (rate) e.currentTarget.playbackRate = rate;
        onLoadedMetadata?.(e);
      }}
      {...rest}
    />
  );
}
