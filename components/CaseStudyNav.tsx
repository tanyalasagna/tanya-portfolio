'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const CORNER = 6;
const DASH = 'linear-gradient(to top, currentColor, currentColor)';

const defaultSections = [
  { id: 'research',    label: 'Research' },
  { id: 'designs',     label: 'Designs' },
  { id: 'reflections', label: 'Reflections' },
];

let cancelScroll: (() => void) | null = null;

function smoothScrollTo(el: HTMLElement) {
  cancelScroll?.();
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  const start = window.scrollY;
  const end = el.getBoundingClientRect().top + start - margin;
  const distance = end - start;
  const duration = Math.min(1800, Math.max(900, Math.abs(distance) * 0.35));
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  let frame = 0;
  const t0 = performance.now();

  const stop = () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('wheel', stop);
    window.removeEventListener('touchstart', stop);
    window.removeEventListener('keydown', stop);
    cancelScroll = null;
  };
  // Let the visitor take over mid-animation
  window.addEventListener('wheel', stop, { passive: true });
  window.addEventListener('touchstart', stop, { passive: true });
  window.addEventListener('keydown', stop);
  cancelScroll = stop;

  const step = (now: number) => {
    const t = Math.min(1, (now - t0) / duration);
    window.scrollTo(0, start + distance * ease(t));
    if (t < 1) frame = requestAnimationFrame(step);
    else stop();
  };
  frame = requestAnimationFrame(step);
}

function Rail({ from = 0, y, visible, color }: { from?: number; y: number | null; visible: boolean; color: string }) {
  const reduced = useReducedMotion();
  const travel = reduced
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 420, damping: 34, mass: 0.7 };

  return (
    <motion.span
      aria-hidden
      initial={false}
      style={{ color }}
      animate={{ opacity: visible && y !== null ? 1 : 0 }}
      transition={reduced ? { duration: 0 } : { duration: 0.18 }}
      className="pointer-events-none absolute inset-0"
    >
      <motion.span
        initial={false}
        animate={{ top: from, height: Math.max(0, (y ?? 0) - CORNER - from) }}
        transition={travel}
        style={{ backgroundImage: DASH }}
        className="absolute left-0.5 w-px"
      />
      <motion.svg
        initial={false}
        animate={{ top: (y ?? 0) - CORNER }}
        transition={travel}
        width="12"
        height="7"
        viewBox="0 0 12 7"
        fill="none"
        className="absolute left-0.5"
      >
        <path d="M0.5 0a6 6 0 0 0 6 6H12" stroke="currentColor" strokeWidth="1" />
      </motion.svg>
    </motion.span>
  );
}

export default function CaseStudyNav({ sections = defaultSections }: { sections?: { id: string; label: string }[] }) {
  const [indexVisible, setIndexVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [pointerInside, setPointerInside] = useState(false);
  const [focusInside, setFocusInside] = useState(false);
  const [centers, setCenters] = useState<number[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Measure item centers for rail positioning
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () =>
      setCenters(itemRefs.current.map(el => el ? el.offsetTop + el.offsetHeight / 2 : 0));
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [sections, indexVisible]);

  // Elements are looked up on every check because this nav can mount before the page content does (client-side navigation)
  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight;
      const first = sections[0] && document.getElementById(sections[0].id);
      if (first && first.getBoundingClientRect().top < vh * 0.6) setIndexVisible(true);

      let current = -1;
      sections.forEach(({ id }, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < vh * 0.4) current = i;
      });
      if (current >= 0) setActiveIndex(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [sections]);

  const activeY = centers[activeIndex] ?? null;
  const hoverY  = hoverIndex === null ? null : (centers[hoverIndex] ?? null);

  const hoverFrom =
    activeY !== null && hoverY !== null && hoverY <= activeY
      ? Math.max(0, hoverY - CORNER)
      : (activeY ?? 0);

  if (!indexVisible) return null;

  return (
    <nav aria-label="Case study sections" className="flex flex-col">
      <span style={{
        color: 'var(--text-muted)',
        fontSize: '18px',
        fontFamily: 'var(--font-dm-sans)',
        fontStyle: 'italic',
        fontWeight: 400,
        paddingBottom: '8px',
        paddingLeft: '2px',
      }}>
        Index
      </span>

      <div
        ref={listRef}
        onMouseLeave={() => setPointerInside(false)}
        className="relative flex flex-col"
      >
        <Rail
          from={hoverFrom}
          y={hoverY}
          visible={(pointerInside || focusInside) && hoverIndex !== activeIndex}
          color="var(--text-muted)"
        />
        <Rail
          y={activeY}
          visible={activeY !== null}
          color="var(--text)"
        />

        {sections.map(({ id, label }, index) => {
          const isActive = index === activeIndex;
          return (
            <a
              key={id}
              href={`#${id}`}
              ref={el => { itemRefs.current[index] = el; }}
              onClick={(e) => {
                const target = document.getElementById(id);
                if (!target) return;
                e.preventDefault();
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) target.scrollIntoView({ block: 'start' });
                else smoothScrollTo(target);
                history.replaceState(null, '', `#${id}`);
              }}
              onFocus={() => { setHoverIndex(index); setFocusInside(true); }}
              onBlur={() => setFocusInside(false)}
              style={{
                color: isActive ? 'var(--text)' : 'var(--text-muted)',
                fontSize: '18px',
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: isActive ? 600 : 300,
                transition: 'color 180ms ease',
                paddingLeft: '20px',
                paddingTop: '5px',
                paddingBottom: '5px',
                display: 'block',
                textDecoration: 'none',
                pointerEvents: 'none',
              }}
            >
              <span
                onMouseEnter={() => { setHoverIndex(index); setPointerInside(true); }}
                onMouseLeave={() => setPointerInside(false)}
                style={{ display: 'inline-block', pointerEvents: 'auto', cursor: 'pointer' }}
              >
                {label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
