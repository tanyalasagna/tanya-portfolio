'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import LiveClock from './LiveClock';
import { useTheme, type Theme } from './ThemeProvider';
import CaseStudyNav from './CaseStudyNav';
import ContactLinks from './ContactLinks';
import NavLinks from './NavLinks';
import { useState } from 'react';

const themes: { value: Theme; icon: string; label: string }[] = [
  { value: 'light', icon: '/images/sun.svg', label: 'Light mode' },
  { value: 'dark',  icon: '/images/moon.svg', label: 'Dark mode' },
];

export default function LeftPanel() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [nameHovered, setNameHovered] = useState(false);
  const isCaseStudy = pathname.startsWith('/work/');

  return (
    <aside
      className="fixed left-0 top-0 h-full w-[340px] flex flex-col border-r z-50"
      style={{ padding: '48px', borderColor: 'var(--divider)', background: 'var(--bg)', containerType: 'inline-size' }}
    >
      {/* Name */}
      <Link href="/">
        <h1
          className="leading-none"
          style={{ color: 'var(--text)', fontFamily: "'Dreamer TM', serif", fontFeatureSettings: nameHovered ? '"ss02"' : '"ss01"', fontSize: '48px', marginBottom: '20px' }}
          onMouseEnter={() => setNameHovered(true)}
          onMouseLeave={() => setNameHovered(false)}
        >
          Tanya Singh
        </h1>
      </Link>

      {/* Bio */}
      <p className="leading-relaxed mb-3" style={{ color: 'var(--text-muted)', fontSize: '18px' }}>
        Hello! I&rsquo;m a designer, rooted in content strategy. I consider myself a creative
        generalist, having moved between content and design roles, and translating across disciplines.
      </p>
      <p className="leading-relaxed" style={{ color: 'var(--text-muted)', fontSize: '18px', marginBottom: '16px' }}>
        Currently designing at daily journals, and previously in miscellaneous content and design
        roles at Toss the Coin, Purdue UX Studios and more.
      </p>

      {/* Contact */}
      <div className="flex gap-5" style={{ marginBottom: '32px' }}>
        <ContactLinks />
      </div>

      <div className="h-px" style={{ background: 'var(--divider)', marginBottom: '32px' }} />

      {/* Main nav */}
      <nav className="flex flex-col gap-3 mb-2">
        <NavLinks starLayoutId="nav-star" />
      </nav>

      {/* Case study sub-nav */}
      <AnimatePresence>
        {isCaseStudy && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="h-px my-5" style={{ background: 'var(--divider)' }} />
            <CaseStudyNav />
            <div className="h-px mt-5" style={{ background: 'var(--divider)' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Theme icons + clock */}
      <div className="flex items-center mb-5" style={{ gap: '32px' }}>
        <LiveClock />
        <div className="flex items-center">
          {themes.map((t) => (
            <button
              key={t.value}
              onClick={() => setTheme(t.value)}
              aria-label={t.label}
              className="transition-opacity hover:opacity-70 border cursor-pointer"
              style={{ opacity: theme === t.value ? 1 : 0.35, borderColor: 'var(--divider)', padding: '4px' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.icon}
                alt={t.label}
                width={28}
                height={28}
                style={{ filter: 'var(--icon-filter)' }}
              />
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
