'use client';

// Wraps an image/video and shows a faint shimmering placeholder until it has loaded,
// reserving some height meanwhile so the viewer can see something is on its way.
export default function MediaFrame({
  loaded,
  fallbackAspect = '4 / 3',
  className,
  style,
  children,
}: {
  loaded: boolean;
  fallbackAspect?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div
      className={className}
      style={{ position: 'relative', overflow: 'hidden', borderRadius: style?.borderRadius, aspectRatio: loaded ? undefined : fallbackAspect }}
    >
      {children}
      <div aria-hidden className="media-skeleton" style={{ opacity: loaded ? 0 : 1 }} />
    </div>
  );
}
