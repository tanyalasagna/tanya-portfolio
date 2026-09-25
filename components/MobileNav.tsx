'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, type Theme } from './ThemeProvider';
import LiveClock from './LiveClock';
import ContactLinks from './ContactLinks';
import NavLinks from './NavLinks';

const themes: { value: Theme; icon: string; label: string }[] = [
  { value: 'light', icon: '/images/sun.svg', label: 'Light mode' },
  { value: 'dark',  icon: '/images/moon.svg', label: 'Dark mode' },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [nameHovered, setNameHovered] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  // Close menu on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Top bar */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-14 border-b"
        style={{ background: 'var(--bg)', borderColor: 'var(--divider)' }}
      >
        <Link
          href="/"
          style={{ color: 'var(--text)', fontFamily: "'Dreamer TM', serif", fontFeatureSettings: nameHovered ? '"ss01"' : '"ss02"', fontSize: '40px', }}
          onMouseEnter={() => setNameHovered(true)}
          onMouseLeave={() => setNameHovered(false)}
        >
          Tanya Singh
        </Link>
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="flex flex-col justify-center items-center gap-[5px]"
          style={{ color: 'var(--text)', width: '28px', height: '28px' }}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="17" y1="3" x2="3" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
              <line x1="0" y1="1" x2="22" y2="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="0" y1="8" x2="22" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="0" y1="15" x2="22" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </div>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-0 z-40 flex flex-col px-8 pt-20 pb-10"
            style={{ background: 'var(--bg)' }}
          >
            {/* Contact */}
            <div className="flex gap-6 mb-8">
              <ContactLinks />
            </div>

            <div className="h-px mb-8" style={{ background: 'var(--divider)' }} />

            {/* Nav */}
            <nav className="flex flex-col gap-5 mb-8">
              <NavLinks starLayoutId="mobile-nav-star" />
            </nav>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Theme icons */}
            <div className="flex items-center mb-6">
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

            {/* Clock */}
            <LiveClock />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
