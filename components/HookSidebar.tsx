'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';

const CORNER = 6;
const DASH = 'repeating-linear-gradient(to top, transparent 0 2px, currentColor 2px 4px)';

const navItems = [
  { label: 'Work',   href: '/',        matches: (p: string) => p === '/' || p.startsWith('/work') },
  { label: 'About',  href: '/about',   matches: (p: string) => p.startsWith('/about') },
  { label: 'Resume', href: '/resume',  matches: (p: string) => p.startsWith('/resume') },
];

function Rail({
  from = 0,
  y,
  visible,
  color,
}: {
  from?: number;
  y: number | null;
  visible: boolean;
  color: string;
}) {
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
        <path d="M0.5 0a6 6 0 0 0 6 6H12" stroke="currentColor" strokeDasharray="2 2" />
      </motion.svg>
    </motion.span>
  );
}

export default function HookSidebar() {
  const pathname = usePathname();
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [centers, setCenters] = useState<number[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [pointerInside, setPointerInside] = useState(false);
  const [focusInside, setFocusInside] = useState(false);

  const activeIndex = navItems.findIndex((item) => item.matches(pathname));

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () =>
      setCenters(itemRefs.current.map((el) => (el ? el.offsetTop + el.offsetHeight / 2 : 0)));
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  const activeY = activeIndex < 0 ? null : (centers[activeIndex] ?? null);
  const hoverY  = hoverIndex === null ? null : (centers[hoverIndex] ?? null);

  const hoverFrom =
    activeY !== null && hoverY !== null && hoverY <= activeY
      ? Math.max(0, hoverY - CORNER)
      : (activeY ?? 0);

  return (
    <nav aria-label="Navigation" className="flex flex-col">
      <span style={{
        color: 'var(--text-muted)',
        fontSize: '15px',
        fontFamily: 'var(--font-dm-sans)',
        fontStyle: 'italic',
        fontWeight: 400,
        letterSpacing: '0.08em',
        paddingBottom: '8px',
        paddingLeft: '2px',
      }}>
        Navigation
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

        {navItems.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <Link
              key={item.href}
              href={item.href}
              ref={(el) => { itemRefs.current[index] = el; }}
              aria-current={isActive ? 'page' : undefined}
              onMouseEnter={() => { setHoverIndex(index); setPointerInside(true); }}
              onFocus={() => { setHoverIndex(index); setFocusInside(true); }}
              onBlur={() => setFocusInside(false)}
              style={{
                color: isActive ? 'var(--text)' : 'var(--text-muted)',
                fontSize: '16px',
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: isActive ? 600 : 300,
                transition: 'color 180ms ease',
                paddingLeft: '20px',
                paddingTop: '5px',
                paddingBottom: '5px',
                display: 'block',
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
