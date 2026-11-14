'use client';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import SparklePrompt from './SparklePrompt';
import PixelNumber from './PixelNumber';
import { Pause, Play } from 'lucide-react';

type Feature = { label: string; lead?: string; body: string; src: string };

// A row of "(n/N)" boxes that switches the description and video shown beneath it.
// Every description and video stays mounted in a shared grid cell and crossfades, so the block never changes height or reloads.
export default function FeatureTabs({ items }: { items: Feature[] }) {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playing, setPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const reduced = useReducedMotion();
  // Inline on purpose: globals.css sets `* { transition: border-color }`, which beats Tailwind's transition utilities
  const tr = (props: string) => (reduced ? 'none' : props.split(',').map(p => `${p.trim()} 300ms ease-out`).join(', '));

  // Only the visible video plays; each one restarts from the top when it comes back
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        v.currentTime = 0;
        setTime(0);
        setDuration(v.duration || 0);
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active]);

  const toggle = () => {
    const v = videoRefs.current[active];
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const seek = (t: number) => {
    const v = videoRefs.current[active];
    if (!v) return;
    v.currentTime = t;
    setTime(t);
  };

  const fmt = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    let next = i;
    if (e.key === 'ArrowRight') next = (i + 1) % items.length;
    else if (e.key === 'ArrowLeft') next = (i - 1 + items.length) % items.length;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="mb-10">
      <SparklePrompt className="mb-3">View each feature by selecting a tab below.</SparklePrompt>
      <div
        role="tablist"
        aria-label="Sift features"
        className="relative grid grid-cols-4 gap-2 sm:gap-3 mb-[9px] [--g:8px] sm:[--g:12px]"
        style={{ ['--n' as string]: items.length, ['--i' as string]: active }}
      >
        {items.map((f, i) => {
          const isActive = i === active;
          return (
            <button
              key={f.label}
              ref={el => { tabRefs.current[i] = el; }}
              role="tab"
              id={`feature-tab-${i}`}
              aria-selected={isActive}
              aria-controls="feature-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={e => onKeyDown(e, i)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              data-cuelume-tap=""
              data-cuelume-emphasis="subtle"
              className="flex flex-col items-start justify-start text-left border-0 min-w-0 p-3 sm:p-4"
              style={{
                background: isActive ? '#383636' : '#F0F0EE',
                color: isActive ? '#FFFFFF' : hover === i ? 'var(--text)' : 'color-mix(in srgb, var(--text) 60%, transparent)',
                // Hovering an unselected tab outlines it on all four sides
                boxShadow: !isActive && hover === i ? 'inset 0 1px 0 #383636, inset 1px 0 0 #383636, inset -1px 0 0 #383636, inset 0 -1px 0 #383636' : 'none',
                cursor: 'pointer',
                transition: tr('background-color, color, box-shadow'),
              }}
            >
              <span className="block">
                <PixelNumber n={i + 1} fill={isActive ? '#F0F0EE' : '#383636'} color={isActive ? '#383636' : '#F0F0EE'} />
              </span>
              <span
                className="hidden sm:block mt-2 text-[16px] lg:text-[18px] leading-snug"
                style={{ fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', fontWeight: 400 }}
              >
                {f.label}
              </span>
            </button>
          );
        })}

        {/* Pixel pointer that slides from box to box and juts down into the gray block below (a 9px gap separates the tab row from the block; the 12px pointer crosses it and overlaps the block by 3px) (centre of column i: (100% - gaps) / n * (i + 0.5) + i * gap) */}
        <span
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            transition: tr('left'),
            top: '100%',
            left: 'calc((100% - (var(--n) - 1) * var(--g)) / var(--n) * (var(--i) + 0.5) + var(--i) * var(--g))',
            width: '24px',
            height: '12px',
            marginLeft: '-12px',
            background: '#383636',
            clipPath: 'polygon(0 0, 100% 0, 100% 33%, 83% 33%, 83% 66%, 67% 66%, 67% 100%, 33% 100%, 33% 66%, 17% 66%, 17% 33%, 0 33%)',
          }}
        />
      </div>

      {/* One gray block holds the description and the video, so it reads as the selected box's content */}
      <div id="feature-panel" role="tabpanel" aria-labelledby={`feature-tab-${active}`} className="p-5 sm:p-6 lg:p-8" style={{ background: '#F0F0EE' }}>
        <div className="grid mb-5 lg:mb-6">
          {items.map((f, i) => (
            <div
              key={f.label}
              aria-hidden={i !== active}
              className={`col-start-1 row-start-1 min-w-0 ${i === active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'}`}
              style={{ transition: tr('opacity, transform') }}
            >
              {/* The tab box only has room for the title from tablet width up */}
              <h4 className="sm:hidden mb-1 text-[16px]" style={{ fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', fontWeight: 400, color: 'var(--text)' }}>
                {f.label}
              </h4>
              {f.lead && (
                <p className="mb-2 text-[20px] sm:text-[22px] lg:text-[24px] leading-snug font-bold" style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--text)' }}>
                  {f.lead}
                </p>
              )}
              <p className="text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed" style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--text)' }}>
                {f.body}
              </p>
            </div>
          ))}
        </div>
        <div className="grid">
          {items.map((f, i) => (
            <video
              key={f.src}
              ref={el => { videoRefs.current[i] = el; }}
              src={f.src}
              autoPlay={i === 0}
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden={i !== active}
              onClick={i === active ? toggle : undefined}
              onPlay={() => { if (i === active) setPlaying(true); }}
              onPause={() => { if (i === active) setPlaying(false); }}
              onTimeUpdate={e => { if (i === active) setTime(e.currentTarget.currentTime); }}
              onLoadedMetadata={e => { if (i === active) setDuration(e.currentTarget.duration); }}
              className={`col-start-1 row-start-1 w-full ${i === active ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              style={{ display: 'block', borderRadius: '8px', cursor: i === active ? 'pointer' : 'default', transition: tr('opacity') }}
            />
          ))}
        </div>

        {/* Controls for the selected video: play / pause and a scrubber to jump to any point */}
        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? 'Pause video' : 'Play video'}
            className="flex-none flex items-center justify-center border-0 bg-transparent p-0"
            style={{ width: '28px', height: '28px', color: 'var(--text)', cursor: 'pointer' }}
          >
            {playing ? <Pause size={18} strokeWidth={1.75} aria-hidden /> : <Play size={18} strokeWidth={1.75} aria-hidden />}
          </button>
          <input
            type="range"
            aria-label="Seek video"
            min={0}
            max={duration || 0}
            step={0.01}
            value={Math.min(time, duration || 0)}
            onChange={e => seek(Number(e.target.value))}
            className="flex-1 min-w-0"
            style={{ accentColor: '#383636', cursor: 'pointer', height: '16px' }}
          />
          <span
            className="flex-none text-[14px] sm:text-[15px] lg:text-[16px]"
            style={{ fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.8, fontVariantNumeric: 'tabular-nums', minWidth: '5.2em', textAlign: 'right' }}
          >
            {fmt(time)} / {fmt(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}
