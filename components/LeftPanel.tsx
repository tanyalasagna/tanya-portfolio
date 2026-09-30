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
          style={{ color: 'var(--text)', fontFamily: "'Dreamer TM', serif", fontFeatureSettings: nameHovered ? '"ss02"' : '"ss01"', fontSize: '56px', marginBottom: '8px', letterSpacing: '0.025em' }}
          onMouseEnter={() => setNameHovered(true)}
          onMouseLeave={() => setNameHovered(false)}
        >
          Tanya Singh
        </h1>
      </Link>

      {/* Bio */}
      <p className="leading-normal mb-3" style={{ color: 'var(--text-muted)', fontSize: '18px' }}>
        I&rsquo;m a product designer with a background in content strategy, and I&rsquo;ve worked in content and design roles at{' '}
        <a href="https://polytechnic.purdue.edu/academics/ux-design" target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-2" style={{ color: 'inherit' }}>Purdue UX Studios</a>,{' '}
        <a href="https://www.tossthe.co.in/company/about-us/" target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-2" style={{ color: 'inherit' }}>Toss the Coin</a>, and{' '}
        <Link href="/resume" className="hover:underline underline-offset-2" style={{ color: 'inherit' }}>more</Link>.
      </p>
      <p className="leading-normal" style={{ color: 'var(--text-muted)', fontSize: '18px', marginBottom: '24px' }}>
        This site is a record of my work so far, across domains like retail and hospitality tech + a few things I make in my own time. If anything here resonates with you, I&rsquo;d love to chat :)
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
            <motion.button
              key={t.value}
              onClick={() => setTheme(t.value)}
              aria-label={t.label}
              className="border cursor-pointer"
              style={{ opacity: theme === t.value ? 1 : 0.35, borderColor: 'var(--divider)', padding: '4px', transition: 'opacity 200ms' }}
              whileHover={{ y: -2, boxShadow: '0 4px 10px rgba(0,0,0,0.18), 0 1px 3px rgba(0,0,0,0.1)' }}
              whileTap={{ y: 1, boxShadow: 'none' }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.icon}
                alt={t.label}
                width={28}
                height={28}
                style={{ filter: 'var(--icon-filter)' }}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </aside>
  );
}
