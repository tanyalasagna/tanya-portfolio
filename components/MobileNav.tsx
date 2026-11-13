'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { play } from 'cuelume';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowUpRight, ChevronUp, Menu, X } from 'lucide-react';

const externalIcon = <ArrowUpRight size={12} strokeWidth={1.75} style={{ display: 'inline', verticalAlign: 'middle', position: 'relative', top: '-1px', marginLeft: '2px' }} aria-hidden />;
import LiveClock from './LiveClock';
import ContactLinks from './ContactLinks';
import HookSidebar from './HookSidebar';
import { pixelNotchClip, PixelEdgeLine, PixelPill } from './PixelEdge';

const wordmarkLetters: { ch: string; set: 'ss01' | 'ss02' }[] = [
  { ch: 'T', set: 'ss02' },
  { ch: 'a', set: 'ss01' },
  { ch: 'n', set: 'ss02' },
  { ch: 'y', set: 'ss01' },
  { ch: 'a', set: 'ss02' },
  { ch: ' ', set: 'ss01' },
  { ch: 'S', set: 'ss02' },
  { ch: 'i', set: 'ss01' },
  { ch: 'n', set: 'ss02' },
  { ch: 'g', set: 'ss01' },
  { ch: 'h', set: 'ss02' },
];

const colophonLines = [
  { before: 'Type set in ', links: [{ label: 'Dreamer TM', href: 'https://typemania.eu/products/dreamer-tm' }, { label: 'Alegreya Sans', href: 'https://fonts.google.com/specimen/Alegreya+Sans' }], join: ' and ' },
  { before: 'Sounds via ', links: [{ label: 'Cuelume', href: 'https://cuelume.dev/' }] },
  { before: 'Hosted on ', links: [{ label: 'Vercel', href: 'https://vercel.com/' }] },
  { before: 'Source on ', links: [{ label: 'Github', href: 'https://github.com/tanyalasagna/tanya-portfolio' }] },
  { before: 'Coded with ', links: [{ label: 'Claude', href: 'https://claude.ai/code' }] },
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
        style={{ background: 'var(--bg)', clipPath: pixelNotchClip('bottom') }}
      >
        <PixelEdgeLine edge="bottom" />
        <Link
          href="/"
          className="text-[28px] sm:text-[32px]"
          style={{ color: 'var(--text)', fontFamily: "'Dreamer TM', serif", fontFeatureSettings: '"ss01"', letterSpacing: nameHovered ? '0.0385em' : '0.045em', paddingTop: '4px' }}
          onMouseEnter={() => { setNameHovered(true); play('select', { theme: 'bubble', emphasis: 'subtle' }); }}
          onMouseLeave={() => setNameHovered(false)}
        >
          {wordmarkLetters.map((l, i) => (
            <span key={i} style={{ fontFeatureSettings: nameHovered ? `"${l.set}"` : '"ss01"' }}>{l.ch}</span>
          ))}
        </Link>
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="flex items-center justify-center"
          style={{ color: 'var(--text)', width: '28px', height: '28px', cursor: 'pointer' }}
          aria-label="Toggle menu"
          {...(isOpen ? { 'data-cuelume-close': '', 'data-cuelume-emphasis': 'subtle' } : { 'data-cuelume-open': '', 'data-cuelume-emphasis': 'subtle' })}
        >
          {isOpen ? (
            <X size={20} strokeWidth={1.5} aria-hidden />
          ) : (
            <Menu size={22} strokeWidth={1.5} aria-hidden />
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
            style={{ background: 'var(--bg)', height: 'fit-content', clipPath: pixelNotchClip('bottom') }}
            onClick={() => setColophonOpen(false)}
          >
            <PixelEdgeLine edge="bottom" />

            {/* Nav */}
            <div className="mb-8" style={{ opacity: colophonOpen ? 0 : 1, transition: 'opacity 200ms ease' }}>
              <HookSidebar />
            </div>

            <div className="mb-8" style={{ borderTop: '1px dashed rgba(56, 54, 54, 0.22)' }} />

            {/* Bottom row: two aligned columns */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              {/* Left column: row1=clock+speaker, row2=colophon */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {/* Row 1: clock */}
                {/* The colophon pop-up covers this row; fade it so nothing peeks out around the pop-up */}
                <div style={{ opacity: colophonOpen ? 0 : 1, transition: 'opacity 200ms ease' }}>
                  <LiveClock sizeCls="text-[15px] sm:text-[16px]" />
                </div>
                {/* Row 2: year + colophon */}
                <div className="text-[15px] sm:text-[16px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span>2027</span>
                  <img src="/images/Chunky Black Pixel Sparkle Icon (1).png" alt="" aria-hidden width="20" height="20" style={{ flexShrink: 0 }} />
                  <button
                    onClick={e => { e.stopPropagation(); play(colophonOpen ? 'close' : 'open', { theme: 'bubble', emphasis: 'subtle' }); setColophonOpen(v => !v); }}
                    aria-expanded={colophonOpen}
                    className="underline decoration-[1.5px] decoration-current underline-offset-[4px] text-inherit hover:no-underline px-[2px] -mx-[2px] rounded-[2px]"
                    style={{ border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}
                  >
                    View colophon
                    <ChevronUp size={15} strokeWidth={1.5} aria-hidden style={{ display: 'inline', verticalAlign: 'middle', position: 'relative', top: '-1px', marginLeft: '3px', transform: colophonOpen ? 'rotate(180deg)' : 'none', transition: 'transform 200ms ease' }} />
                  </button>
                </div>
              </div>
              {/* Right column: Copy email (row 1) + LinkedIn (row 2), right-aligned */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
                <ContactLinks sizeCls="text-[15px] sm:text-[16px]" stacked />
              </div>
            </div>

            {/* Colophon dialog */}
            <div
              ref={colophonRef}
              onClick={e => e.stopPropagation()}
              style={{ position: 'absolute', left: '16px', bottom: '70px', width: 'fit-content', maxWidth: 'calc(100% - 32px)', background: '#F0F0EE', padding: '16px 20px', zIndex: 20, opacity: 0, pointerEvents: 'none' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="text-[15px] sm:text-[16px] lg:text-[18px]" style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--text)', fontStyle: 'italic', fontWeight: 400 }}>Colophon</span>
                {/* Close: ✕ on a pixel pill in a slightly darker gray than the block */}
                <button
                  onClick={e => { e.stopPropagation(); play('close', { theme: 'bubble', emphasis: 'subtle' }); setColophonOpen(false); }}
                  aria-label="Close colophon"
                  style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '4px 9px', margin: '-6px -10px 0 0', color: 'var(--text)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <PixelPill fill="#E3E2DD" stroke="none" strokeWidth={0} />
                  <X size={14} strokeWidth={1.5} aria-hidden style={{ position: 'relative' }} />
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {colophonLines.map((line, i) => (
                  <p key={i} className="text-[15px] sm:text-[16px]" style={{ margin: 0, fontFamily: 'var(--font-dm-sans)', fontWeight: 300, fontStyle: 'normal', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {line.before}
                    {line.links.map((lk, j) => (
                      <span key={j}>
                        {j > 0 && <><br />{(line.join ?? ' and ').trimStart()}</>}
                        <a href={lk.href} target="_blank" rel="noopener noreferrer" className="decoration-[1.5px] decoration-current underline-offset-[4px] text-inherit no-underline hover:underline px-[2px] -mx-[2px] rounded-[2px]">{lk.label}{externalIcon}</a>
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
