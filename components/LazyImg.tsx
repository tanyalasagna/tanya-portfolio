'use client';

// Lazy-loaded image: the browser only fetches it as it nears the screen
export default function LazyImg({
  src,
  alt = '',
  className = 'w-full',
  style,
}: {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src={src} alt={alt} loading="lazy" decoding="async" className={className} style={{ display: 'block', ...style }} />
  );
}
