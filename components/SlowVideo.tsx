'use client';

// Looping muted video played at a reduced speed (playbackRate can only be set from script)
export default function SlowVideo({ src, rate = 0.75, style }: { src: string; rate?: number; style?: React.CSSProperties }) {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      ref={el => { if (el) el.playbackRate = rate; }}
      onLoadedMetadata={e => { e.currentTarget.playbackRate = rate; }}
      style={style}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
