'use client';
import { useEffect, useRef, useState } from 'react';
import MediaFrame from './MediaFrame';

// Lazy-loaded image with a subtle skeleton while it loads
export default function LazyImg({
  src,
  alt = '',
  className = 'w-full',
  style,
  fallbackAspect,
}: {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  fallbackAspect?: string;
}) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { if (ref.current?.complete && ref.current.naturalWidth) setLoaded(true); }, []);
  return (
    <MediaFrame loaded={loaded} fallbackAspect={fallbackAspect} style={style}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={className}
        style={{ display: 'block', ...style }}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </MediaFrame>
  );
}
