'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';

const navItems = [
  { label: 'Work', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Resume', href: '/resume' },
] as const;

function getActiveHref(pathname: string) {
  if (pathname === '/' || pathname.startsWith('/work')) return '/';
  if (pathname.startsWith('/about')) return '/about';
  if (pathname.startsWith('/resume')) return '/resume';
  return '/';
}


export default function NavLinks() {
  const pathname = usePathname();
  const activeHref = getActiveHref(pathname);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  return (
    <>
      {navItems.map((item) => {
        const isActive = activeHref === item.href;
        const isHovered = hoveredHref === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-1.5"
            style={{
              color: 'var(--text)',
              opacity: isActive || isHovered ? 1 : 0.9,
              fontSize: '17px',
              fontFamily: 'var(--font-dm-sans)',
              fontStyle: 'italic',
              fontWeight: isActive || isHovered ? 600 : 300,
              transition: 'opacity 200ms ease',
            }}
            onMouseEnter={() => !isActive && setHoveredHref(item.href)}
            onMouseLeave={() => setHoveredHref(null)}
          >
            <span style={{ position: 'relative', display: 'inline-block' }}>
              {item.label}
              <motion.span
                style={{
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'currentColor',
                  originX: 0,
                  display: 'block',
                }}
                initial={false}
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            </span>
          </Link>
        );
      })}
    </>
  );
}
