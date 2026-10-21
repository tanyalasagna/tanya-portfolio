'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { play } from 'cuelume';
import SoundToggle from './SoundToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import LiveClock from './LiveClock';
import ContactLinks from './ContactLinks';
import HookSidebar from './HookSidebar';

const colophonLines = [
  { before: 'Type set in ', links: [{ label: 'Dreamer TM', href: 'https://typemania.eu/products/dreamer-tm' }, { label: 'Alegreya', href: 'https://fonts.google.com/specimen/Alegreya' }], join: ' and ' },
  { before: 'Sounds via ', links: [{ label: 'Cuelume', href: 'https://cuelume.dev/' }] },
  { before: 'Hosted on ', links: [{ label: 'Vercel', href: 'https://vercel.com/' }] },
  { before: 'Built with ', links: [{ label: 'Next.js', href: 'https://nextjs.org/' }, { label: 'React', href: 'https://react.dev/' }], join: ' and ' },
  { before: 'Coded with ', links: [{ label: 'Claude Code', href: 'https://claude.ai/code' }] },
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
        style={{ background: 'var(--bg)' }}
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
      {/* Divider under top bar */}
      <div className="lg:hidden fixed top-14 left-0 right-0 z-50" style={{ height: '0.5px', background: 'var(--divider, rgba(0,0,0,0.1))' }} />

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
            onClick={() => setColophonOpen(false)}
          >
            {/* Bio */}
            <div className="mb-8">
              <p className="leading-normal mb-3" style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
                Hi! I&rsquo;m a product designer with a background in content. I&rsquo;ve worked with agency clients at{' '}
                <a href="https://www.tossthe.co.in/company/about-us/" target="_blank" rel="noopener noreferrer" className="underline decoration-dashed underline-offset-2 hover:no-underline hover:opacity-[0.65]" style={{ color: 'inherit' }}>Toss the Coin</a>,{' '}
                in-house teams at <a href="https://ankogcc.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-dashed underline-offset-2 hover:no-underline hover:opacity-[0.65]" style={{ color: 'inherit' }}>Anko</a>, and <Link href="/resume" className="underline decoration-dashed underline-offset-2 hover:no-underline hover:opacity-[0.65]" style={{ color: 'inherit' }}>more</Link>.
              </p>
              <p className="leading-normal" style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
                This site is a record of my product design work + a few explorations.
              </p>
            </div>

            {/* Contact */}
            <div className="flex gap-6 mb-8">
              <ContactLinks />
            </div>

            {/* Nav */}
            <div className="mb-8">
              <HookSidebar />
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Colophon dialog — floats above bottom section, animated via GSAP */}
            <div
              ref={colophonRef}
              onClick={e => e.stopPropagation()}
              style={{ position: 'absolute', left: '16px', right: '16px', bottom: '40px', background: '#1A1A1A', borderRadius: '14px', padding: '20px 22px', zIndex: 20, opacity: 0, pointerEvents: 'none' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span style={{ fontFamily: "'Dreamer TM', serif", fontFeatureSettings: '"ss01"', fontSize: '24px', color: '#FFFFFF', letterSpacing: '0.045em', fontWeight: 700 }}>Colophon</span>
                <button onClick={() => { setColophonOpen(false); play('close', { theme: 'bubble', emphasis: 'subtle' }); }} aria-label="Close colophon" style={{ color: '#FFFFFF', background: 'none', border: 'none', cursor: 'pointer', fontSize: '28px', lineHeight: 1, padding: 0 }}>×</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {colophonLines.map((line, i) => (
                  <p key={i} style={{ margin: 0, fontFamily: 'var(--font-dm-sans)', fontSize: '16px', fontWeight: 300, fontStyle: 'normal', color: '#FFFFFF', lineHeight: 1.4 }}>
                    {line.before}
                    {line.links.map((lk, j) => (
                      <span key={j}>
                        {j > 0 && (line.join ?? ' and ')}
                        <a href={lk.href} target="_blank" rel="noopener noreferrer" className="underline decoration-dashed underline-offset-2 hover:no-underline hover:opacity-[0.65]" style={{ color: 'inherit' }}>{lk.label}</a>
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            </div>

            {/* Sound toggle + clock */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              {/* Clock + colophon */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25px' }}>
                <LiveClock />
                <div style={{ color: 'var(--text-muted)', fontSize: '16px', fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span>2027</span>
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden style={{ flexShrink: 0 }}>
                    <path d="M12 2l2.09 7.26L22 12l-7.91 2.74L12 22l-2.09-7.26L2 12l7.91-2.74z" />
                  </svg>
                  <button
                    onClick={e => { e.stopPropagation(); setColophonOpen(true); play('open', { theme: 'bubble', emphasis: 'subtle' }); }}
                    className="underline decoration-dashed underline-offset-[3px] hover:no-underline hover:opacity-[0.65]"
                    style={{ color: 'inherit', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}
                  >
                    Open Colophon
                  </button>
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
