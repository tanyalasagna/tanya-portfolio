'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useAnimationControls } from 'framer-motion';

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

function StarIndicator({ layoutId }: { layoutId: string }) {
  const controls = useAnimationControls();
  return (
    <motion.span
      layoutId={layoutId}
      transition={{ type: 'spring', stiffness: 280, damping: 16, mass: 0.7 }}
      onLayoutAnimationStart={() => {
        controls.start({
          x: [0, -20, 6, 0],
          rotate: [0, -18, 8, 0],
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        });
      }}
      style={{ display: 'inline-flex', alignItems: 'center' }}
    >
      <motion.img
        animate={controls}
        src="/images/star.svg"
        alt=""
        width={32}
        height={32}
        style={{ filter: 'var(--icon-filter)', display: 'block' }}
      />
    </motion.span>
  );
}

export default function NavLinks({ starLayoutId = 'nav-star' }: { starLayoutId?: string }) {
  const pathname = usePathname();
  const activeHref = getActiveHref(pathname);

  return (
    <>
      {navItems.map((item) => {
        const isActive = activeHref === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-1.5 transition-opacity"
            style={{
              color: 'var(--text)',
              opacity: isActive ? 1 : 0.8,
              fontSize: '18px',
              fontFamily: 'var(--font-dm-sans)',
              fontStyle: 'italic',
              fontWeight: 700,
            }}
          >
            {item.label}
            {isActive && <StarIndicator layoutId={starLayoutId} />}
          </Link>
        );
      })}
    </>
  );
}
