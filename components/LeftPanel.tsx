'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import LiveClock from './LiveClock';
import { useTheme, type Theme } from './ThemeProvider';
import CaseStudyNav from './CaseStudyNav';
import { useState } from 'react';

const navItems = [
  { label: 'WORK', href: '/' },
  { label: 'ABOUT', href: '/about' },
  { label: 'RESUME', href: '/resume' },
] as const;

const themes: Theme[] = ['paper', 'light', 'dark'];

function getActiveHref(pathname: string) {
  if (pathname === '/' || pathname.startsWith('/work')) return '/';
  if (pathname.startsWith('/about')) return '/about';
  if (pathname.startsWith('/resume')) return '/resume';
  return '/';
}

export default function LeftPanel() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [copied, setCopied] = useState(false);
  const activeHref = getActiveHref(pathname);
  const isCaseStudy = pathname.startsWith('/work/');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('tanyabsingh25@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <aside
      className="fixed left-0 top-0 h-full w-[280px] flex flex-col px-8 py-9 border-r z-50"
      style={{ borderColor: 'var(--divider)', background: 'var(--bg)' }}
    >
      {/* Name */}
      <h1 className="text-2xl font-bold mb-5 leading-none" style={{ color: 'var(--text)' }}>
        Tanya Singh
      </h1>

      {/* Bio */}
      <p className="text-[13px] leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>
        Hello! I&rsquo;m a designer, rooted in content strategy. I consider myself a creative
        generalist, having moved between content and design roles, and translating across disciplines.
      </p>
      <p className="text-[13px] leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>
        Currently designing at daily journals, and previously in miscellaneous content and design
        roles at Toss the Coin, Purdue UX Studios and more.
      </p>

      {/* Contact */}
      <div className="flex gap-5 mb-6">
        <button
          onClick={handleCopyEmail}
          className="font-mono text-xs underline underline-offset-2 cursor-pointer transition-opacity hover:opacity-70"
          style={{ color: 'var(--accent)' }}
        >
          {copied ? 'Copied!' : 'Copy email'}
        </button>
        <a
          href="https://linkedin.com/in/tanyasingh-03"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs underline underline-offset-2 transition-opacity hover:opacity-70"
          style={{ color: 'var(--accent)' }}
        >
          LinkedIn
        </a>
      </div>

      <div className="h-px mb-6" style={{ background: 'var(--divider)' }} />

      {/* Main nav */}
      <nav className="flex flex-col gap-3 mb-2">
        {navItems.map((item) => {
          const isActive = activeHref === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-1.5 font-mono text-xs tracking-widest transition-opacity"
              style={{
                color: 'var(--text)',
                opacity: isActive ? 1 : 0.45,
              }}
            >
              {item.label}
              {isActive && (
                <motion.span
                  layoutId="nav-star"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  ☆
                </motion.span>
              )}
            </Link>
          );
        })}
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

      {/* Theme dots */}
      <div className="flex items-center gap-3 mb-5">
        {themes.map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            aria-label={`${t} theme`}
            className="w-3.5 h-3.5 rounded-full border-[1.5px] transition-all hover:scale-125"
            style={{
              borderColor: 'var(--text)',
              background: theme === t ? 'var(--text)' : 'transparent',
            }}
          />
        ))}
      </div>

      {/* Clock */}
      <LiveClock />
    </aside>
  );
}
