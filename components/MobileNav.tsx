'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, type Theme } from './ThemeProvider';
import LiveClock from './LiveClock';
import { useEffect } from 'react';

const navItems = [
  { label: 'Work', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Resume', href: '/resume' },
] as const;

const themes: Theme[] = ['paper', 'light', 'dark'];

function getActiveHref(pathname: string) {
  if (pathname === '/' || pathname.startsWith('/work')) return '/';
  if (pathname.startsWith('/about')) return '/about';
  if (pathname.startsWith('/resume')) return '/resume';
  return '/';
}

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [copied, setCopied] = useState(false);
  const activeHref = getActiveHref(pathname);

  // Close menu on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleCopy = () => {
    navigator.clipboard.writeText('tanyabsingh25@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <>
      {/* Top bar */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-14 border-b"
        style={{ background: 'var(--bg)', borderColor: 'var(--divider)' }}
      >
        <Link href="/" className="text-sm" style={{ color: 'var(--text)', fontFamily: "'Dreamer TM', serif", fontFeatureSettings: '"ss01"' }}>
          Tanya Singh
        </Link>
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="font-mono text-xl leading-none"
          style={{ color: 'var(--text)' }}
          aria-label="Toggle menu"
        >
          {isOpen ? '×' : '☰'}
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
              <button
                onClick={handleCopy}
                className="font-mono underline underline-offset-2"
                style={{ color: 'var(--accent)', fontSize: '16px' }}
              >
                {copied ? 'Copied!' : 'Copy email'}
              </button>
              <a
                href="https://linkedin.com/in/tanyasingh-03"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono underline underline-offset-2"
                style={{ color: 'var(--accent)', fontSize: '16px' }}
              >
                LinkedIn
              </a>
            </div>

            <div className="h-px mb-8" style={{ background: 'var(--divider)' }} />

            {/* Nav */}
            <nav className="flex flex-col gap-5 mb-8">
              {navItems.map((item) => {
                const isActive = activeHref === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 font-mono"
                    style={{ color: 'var(--text)', opacity: isActive ? 1 : 0.45, fontSize: '16px' }}
                  >
                    {item.label}
                    {isActive && <span>☆</span>}
                  </Link>
                );
              })}
            </nav>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Theme dots */}
            <div className="flex items-center gap-4 mb-6">
              {themes.map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  aria-label={`${t} theme`}
                  className="w-4 h-4 rounded-full border-[1.5px] transition-all"
                  style={{
                    borderColor: 'var(--text)',
                    background: theme === t ? 'var(--text)' : 'transparent',
                  }}
                />
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
