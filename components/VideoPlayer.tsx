'use client';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

const CONTROLS_H = 36;

// Looping muted video with the same controls as the Sift feature videos: play / pause (or click the video), a scrubber and a timer.
// Plays only while on screen. Fills the height of its parent (minus the controls) and takes its width from the video's aspect ratio,
// so the controls never make the parent any wider.
// With `fill` the video instead takes the full width of its parent, at its own aspect ratio, with the controls underneath.
export default function VideoPlayer({ src, aspectRatio, fill = false, radius = 0 }: { src: string; aspectRatio: string; fill?: boolean; radius?: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (v.duration) setDuration(v.duration); // metadata may already be in before hydration
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { rootMargin: '200px' });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const fmt = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;

  return (
    <div style={fill ? undefined : { height: '100%' }}>
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={e => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={e => setDuration(e.currentTarget.duration)}
        onDurationChange={e => setDuration(e.currentTarget.duration || 0)}
        style={fill ? { display: 'block', width: '100%', aspectRatio, objectFit: 'cover', cursor: 'pointer', borderRadius: radius } : { display: 'block', height: `calc(100% - ${CONTROLS_H}px)`, width: 'auto', aspectRatio, cursor: 'pointer' }}
      />
      {/* width:0 + min-width:100% keeps the controls as wide as the video without ever widening it */}
      <div className="flex items-center gap-2" style={{ height: `${CONTROLS_H}px`, ...(fill ? { marginTop: 8 } : { width: 0, minWidth: '100%' }) }}>
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause video' : 'Play video'}
          className="flex-none flex items-center justify-center border-0 bg-transparent p-0"
          style={{ width: '24px', height: '24px', color: 'var(--text)', cursor: 'pointer' }}
        >
          {playing ? <Pause size={16} strokeWidth={1.75} aria-hidden /> : <Play size={16} strokeWidth={1.75} aria-hidden />}
        </button>
        <input
          type="range"
          aria-label="Seek video"
          min={0}
          max={duration || 0}
          step={0.01}
          value={Math.min(time, duration || 0)}
          onChange={e => { const t = Number(e.target.value); if (ref.current) ref.current.currentTime = t; setTime(t); }}
          className="flex-1 min-w-0"
          style={{ accentColor: '#383636', cursor: 'pointer', height: '16px' }}
        />
        <span
          className="flex-none text-[13px] sm:text-[14px]"
          style={{ fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.8, fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}
        >
          {fmt(time)} / {fmt(duration)}
        </span>
      </div>
    </div>
  );
}
