'use client';
import LazyVideo from './LazyVideo';

// Looping muted video played at a reduced speed, only while on screen
export default function SlowVideo({ src, rate = 0.75, style }: { src: string; rate?: number; style?: React.CSSProperties }) {
  return <LazyVideo src={src} rate={rate} style={style} />;
}
