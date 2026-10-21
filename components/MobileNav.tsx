'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { play } from 'cuelume';
import SoundToggle from './SoundToggle';
import { motion, AnimatePresence } from 'framer-motion';
import LiveClock from './LiveClock';
import ContactLinks from './ContactLinks';
import HookSidebar from './HookSidebar';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [nameHovered, setNameHovered] = useState(false);
  const pathname = usePathname();
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
        className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14"
        style={{ background: 'var(--bg)', borderBottom: '0.5px solid var(--divider)' }}
      >
        <Link
          href="/"
          style={{ color: 'var(--text)', fontFamily: "'Dreamer TM', serif", fontFeatureSettings: nameHovered ? '"ss02"' : '"ss01"', fontSize: '32px', letterSpacing: nameHovered ? '0.025em' : '0.045em', paddingTop: '4px' }}
          onMouseEnter={() => { setNameHovered(true); play('select', { theme: 'bubble', emphasis: 'subtle' }); }}
          onMouseLeave={() => setNameHovered(false)}
        >
          Tanya Singh
        </Link>
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="flex flex-col justify-center items-center gap-[5px]"
          style={{ color: 'var(--text)', width: '28px', height: '28px', cursor: 'pointer' }}
          aria-label="Toggle menu"
          {...(isOpen ? { 'data-cuelume-close': '', 'data-cuelume-emphasis': 'subtle' } : { 'data-cuelume-open': '', 'data-cuelume-emphasis': 'subtle' })}
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
            className="lg:hidden fixed inset-0 z-40 flex flex-col px-4 pt-20 pb-10"
            style={{ background: 'var(--bg)' }}
          >
            {/* Bio */}
            <div className="mb-8">
              <p className="leading-normal mb-3" style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
                Hi! I&rsquo;m a product designer with a background in content. I&rsquo;ve worked with agency clients at{' '}
                <a href="https://www.tossthe.co.in/company/about-us/" target="_blank" rel="noopener noreferrer" className="underline decoration-dashed underline-offset-2 hover:no-underline" style={{ color: 'inherit', fontStyle: 'italic' }}>Toss the Coin</a>,{' '}
                in-house teams at <a href="https://ankogcc.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-dashed underline-offset-2 hover:no-underline" style={{ color: 'inherit', fontStyle: 'italic' }}>Anko</a>, and <Link href="/resume" className="underline decoration-dashed underline-offset-2 hover:no-underline" style={{ color: 'inherit', fontStyle: 'italic' }}>more</Link>.
              </p>
              <p className="leading-normal" style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
                This site is a record of my product design work + a few explorations.
              </p>
            </div>

            {/* Contact */}
            <div className="flex gap-6 mb-8">
              <ContactLinks />
            </div>

            <div className="mb-8" style={{ height: '0.5px', background: 'var(--divider)' }} />

            {/* Nav */}
            <div className="mb-8">
              <HookSidebar />
            </div>

            <div className="mb-8" style={{ height: '0.5px', background: 'var(--divider)' }} />

            {/* Spacer */}
            <div className="flex-1" />

            {/* Sound toggle + clock */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              {/* Clock + colophon */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25px' }}>
                <LiveClock />
                <div style={{ color: 'var(--text)', fontSize: '16px', fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ opacity: 0.62 }}>2027</span>
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden style={{ flexShrink: 0 }}>
                    <path d="M12 2l2.09 7.26L22 12l-7.91 2.74L12 22l-2.09-7.26L2 12l7.91-2.74z" />
                  </svg>
                  <a href="/colophon" className="underline decoration-dashed underline-offset-[3px] hover:no-underline" style={{ color: 'inherit', opacity: 0.62 }}>Open Colophon</a>
                </div>
              </div>
              {/* Speaker with bg */}
              <div style={{ background: 'rgba(0,0,0,0.06)', borderRadius: '8px', padding: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <SoundToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
