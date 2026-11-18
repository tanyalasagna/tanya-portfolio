'use client';
import { useEffect, useRef, useState } from 'react';
import MediaFrame from './MediaFrame';

type Props = Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'autoPlay' | 'ref'> & {
  rate?: number;
  fallbackAspect?: string;
};

// Looping muted video that only plays while it is on (or just about to be on) screen.
// Offscreen videos are paused and only fetch their metadata, so a page with many videos
// doesn't decode and download all of them at once. A faint skeleton shows until the first frame is ready.
export default function LazyVideo({ rate, fallbackAspect = '16 / 10', preload = 'metadata', onLoadedMetadata, onLoadedData, className, style, ...rest }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.readyState >= 2) setLoaded(true);
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
    <MediaFrame loaded={loaded} fallbackAspect={fallbackAspect} style={style}>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload={preload}
        className={className}
        style={style}
        onLoadedMetadata={e => {
          if (rate) e.currentTarget.playbackRate = rate;
          onLoadedMetadata?.(e);
        }}
        onLoadedData={e => { setLoaded(true); onLoadedData?.(e); }}
        onError={() => setLoaded(true)}
        {...rest}
      />
    </MediaFrame>
  );
}
