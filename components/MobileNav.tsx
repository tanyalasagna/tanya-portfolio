'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { play } from 'cuelume';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import LiveClock from './LiveClock';
import ContactLinks from './ContactLinks';
import HookSidebar from './HookSidebar';

const colophonLines = [
  { before: 'Type set in ', links: [{ label: 'Dreamer TM', href: 'https://typemania.eu/products/dreamer-tm' }, { label: 'Alegreya Sans', href: 'https://fonts.google.com/specimen/Alegreya+Sans' }], join: ' and ' },
  { before: 'Sound by ', links: [{ label: 'Cuelume', href: 'https://cuelume.dev/' }] },
  { before: 'Hosted on ', links: [{ label: 'Vercel', href: 'https://vercel.com/' }] },
  { before: 'Source on ', links: [{ label: 'Github', href: 'https://github.com/tanyalasagna/tanya-portfolio' }] },
  { before: 'Created with ', links: [{ label: 'Claude Code', href: 'https://claude.ai/code' }] },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [colophonOpen, setColophonOpen] = useState(false);
  const [nameHovered, setNameHovered] = useState(false);
  const colophonRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  // Close menu on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!colophonRef.current) return;
    if (colophonOpen) {
      gsap.fromTo(colophonRef.current,
        { opacity: 0, filter: 'blur(8px)', y: 8, pointerEvents: 'none' },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.4, ease: 'power2.out', pointerEvents: 'auto' }
      );
    } else {
      gsap.to(colophonRef.current,
        { opacity: 0, filter: 'blur(8px)', y: 8, duration: 0.2, ease: 'power2.in', pointerEvents: 'none' }
      );
    }
  }, [colophonOpen]);

  return (
    <>
      {/* Top bar */}
      <div
        className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14"
        style={{ background: 'var(--bg)', borderBottom: '0.5px solid var(--divider)' }}
      >
        <Link
          href="/"
          className="text-[28px] sm:text-[32px]"
          style={{ color: 'var(--text)', fontFamily: "'Dreamer TM', serif", fontFeatureSettings: nameHovered ? '"ss02"' : '"ss01"', letterSpacing: nameHovered ? '0.025em' : '0.045em', paddingTop: '4px' }}
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

      {/* Blur backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-[39]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed top-0 left-0 right-0 z-40 flex flex-col px-4 pt-20 pb-10"
            style={{ background: 'var(--bg)', height: 'fit-content', borderBottom: '0.5px solid var(--divider)', borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px' }}
            onClick={() => setColophonOpen(false)}
          >
            {/* Nav */}
            <div className="mb-8">
              <HookSidebar />
            </div>

            <div className="mb-8" style={{ height: '0.5px', background: 'var(--divider)' }} />

            {/* Bottom row: two aligned columns */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              {/* Left column: row1=clock+speaker, row2=colophon */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {/* Row 1: clock */}
                <LiveClock sizeCls="text-[15px] sm:text-[16px]" />
                {/* Row 2: year + colophon */}
                <div className="text-[15px] sm:text-[16px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span>2027</span>
                  <img src="/images/Chunky Black Pixel Sparkle Icon (1).png" alt="" aria-hidden width="18" height="18" style={{ flexShrink: 0, opacity: 0.8 }} />
                  <button
                    onClick={e => { e.stopPropagation(); setColophonOpen(true); play('open', { theme: 'bubble', emphasis: 'subtle' }); }}
                    className="underline decoration-[#AC39D4] underline-offset-[4px] text-inherit transition-colors duration-150 hover:[background:linear-gradient(rgba(172,57,212,0.12),rgba(172,57,212,0.12))_0_0/100%_calc(100%_-_2px)_no-repeat] hover:text-[#47122e] px-[2px] -mx-[2px] rounded-[2px]"
                    style={{ border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}
                  >
                    Open colophon
                  </button>
                </div>
              </div>
              {/* Right column: Copy email (row 1) + LinkedIn (row 2), right-aligned */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
                <ContactLinks sizeCls="text-[15px] sm:text-[16px]" />
              </div>
            </div>

            {/* Colophon dialog */}
            <div
              ref={colophonRef}
              onClick={e => e.stopPropagation()}
              style={{ position: 'absolute', left: '16px', right: '16px', bottom: '40px', background: '#FFFFFF', borderRadius: '6px', padding: '20px 22px', zIndex: 20, opacity: 0, pointerEvents: 'none', border: '0.5px solid #888888' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontFamily: "'Alegreya Sans', sans-serif", fontSize: '16px', color: '#383636', fontWeight: 600 }}>Colophon</span>
                <button onClick={() => { setColophonOpen(false); play('close', { theme: 'bubble', emphasis: 'subtle' }); }} aria-label="Close colophon" style={{ color: '#383636', background: 'none', border: 'none', cursor: 'pointer', fontSize: '34px', lineHeight: 1, padding: 0, position: 'relative', top: '-4px' }}>×</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {colophonLines.map((line, i) => (
                  <p key={i} className="text-[15px] sm:text-[16px]" style={{ margin: 0, fontFamily: 'var(--font-dm-sans)', fontWeight: 300, fontStyle: 'normal', color: '#383636', lineHeight: 1.4 }}>
                    {line.before}
                    {line.links.map((lk, j) => (
                      <span key={j}>
                        {j > 0 && (line.join ?? ' and ')}
                        <a href={lk.href} target="_blank" rel="noopener noreferrer" className="underline decoration-[#AC39D4] underline-offset-[4px] text-inherit transition-colors duration-150 hover:[background:linear-gradient(rgba(172,57,212,0.12),rgba(172,57,212,0.12))_0_0/100%_calc(100%_-_2px)_no-repeat] hover:text-[#47122e] px-[2px] -mx-[2px] rounded-[2px]">{lk.label}</a>
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
