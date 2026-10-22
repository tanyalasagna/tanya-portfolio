'use client';
import Link from 'next/link';
import LiveClock from './LiveClock';
import ContactLinks from './ContactLinks';
import HookSidebar from './HookSidebar';
import CaseStudyNav from './CaseStudyNav';
import { useState, useRef, useEffect } from 'react';
import { play } from 'cuelume';
import SoundToggle from './SoundToggle';
import { gsap } from 'gsap';
import { usePathname } from 'next/navigation';

const colophonLines = [
  { before: 'Type set in ', links: [{ label: 'Dreamer TM', href: 'https://typemania.eu/products/dreamer-tm' }, { label: 'Alegreya', href: 'https://fonts.google.com/specimen/Alegreya' }], join: ' and ' },
  { before: 'Sound by ', links: [{ label: 'Cuelume', href: 'https://cuelume.dev/' }] },
  { before: 'Hosted on ', links: [{ label: 'Vercel', href: 'https://vercel.com/' }] },
  { before: 'Source on ', links: [{ label: 'Github', href: 'https://github.com/tanyalasagna/tanya-portfolio' }] },
  { before: 'Created with ', links: [{ label: 'Claude Code', href: 'https://claude.ai/code' }] },
];

export default function LeftPanel() {
  const pathname = usePathname();
  const isCaseStudy = pathname.startsWith('/work/');
  const [nameHovered, setNameHovered] = useState(false);
  const [colophonOpen, setColophonOpen] = useState(false);
  const [speakerHovered, setSpeakerHovered] = useState(false);
  const colophonRef = useRef<HTMLDivElement>(null);

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
    <aside
      className="fixed left-0 top-0 h-full w-[300px] flex flex-col z-50"
      style={{ padding: '32px', borderRight: '0.5px solid var(--divider)', background: 'var(--bg)', containerType: 'inline-size' }}
      onClick={() => setColophonOpen(false)}
    >
      {/* Name — hidden on case study pages */}
      {!isCaseStudy && (
        <Link href="/">
          <h1
            className="leading-none"
            style={{ color: 'var(--text)', fontFamily: "'Dreamer TM', serif", fontFeatureSettings: nameHovered ? '"ss02"' : '"ss01"', fontSize: '44px', marginBottom: '12px', letterSpacing: nameHovered ? '0.025em' : '0.045em' }}
            onMouseEnter={() => { setNameHovered(true); play('select', { theme: 'bubble', emphasis: 'subtle' }); }}
            onMouseLeave={() => setNameHovered(false)}
          >
            Tanya Singh
          </h1>
        </Link>
      )}

      {isCaseStudy ? (
        <>
          {/* Back link */}
          <Link
            href="/"
            className="hover:opacity-[0.4] transition-opacity duration-200"
            style={{
              color: 'var(--text)',
              fontSize: '24px',
              fontFamily: "'Dreamer TM', serif",
              fontFeatureSettings: '"ss01"',
              fontWeight: 900,
              letterSpacing: '0.045em',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '32px',
              textDecoration: 'none',
              lineHeight: 1,
            }}
            onClick={() => play('select', { theme: 'bubble', emphasis: 'subtle' })}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden style={{ flexShrink: 0 }}>
              <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Projects
          </Link>

          <div style={{ height: '0.5px', background: 'var(--divider)', marginBottom: '32px' }} />

          {/* Case study section nav */}
          <div style={{ marginBottom: '32px' }}>
            <CaseStudyNav />
          </div>

          <div style={{ height: '0.5px', background: 'var(--divider)', marginBottom: '32px' }} />
        </>
      ) : (
        <>
          {/* Bio */}
          <p className="leading-normal mb-3" style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
            Hi! I&rsquo;m a product designer with a background in content. I&rsquo;ve worked with agency clients at{' '}
            <a href="https://www.tossthe.co.in/company/about-us/" target="_blank" rel="noopener noreferrer" className="underline decoration-[#8B31CC] underline-offset-2 hover:no-underline hover:text-[#8B31CC] text-inherit transition-colors duration-150">Toss the Coin</a>,{' '}
            in-house teams at <a href="https://ankogcc.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-[#8B31CC] underline-offset-2 hover:no-underline hover:text-[#8B31CC] text-inherit transition-colors duration-150">Anko</a>, and <Link href="/resume" className="underline decoration-[#8B31CC] underline-offset-2 hover:no-underline hover:text-[#8B31CC] text-inherit transition-colors duration-150">more</Link>.
          </p>
          <p className="leading-normal" style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '16px' }}>
            This site is a record of my product design work + a few explorations.
          </p>

          {/* Contact */}
          <div className="flex gap-5" style={{ marginBottom: '32px' }}>
            <ContactLinks />
          </div>

          <div style={{ height: '0.5px', background: 'var(--divider)', marginBottom: '32px' }} />

          {/* Main nav */}
          <div style={{ marginBottom: '32px' }}>
            <HookSidebar />
          </div>

          <div style={{ height: '0.5px', background: 'var(--divider)', marginBottom: '32px' }} />
        </>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {!isCaseStudy && (
        <>
          {/* Colophon dialog — floats above bottom section, animated via GSAP */}
          <div
            ref={colophonRef}
            onClick={e => e.stopPropagation()}
            style={{ position: 'absolute', left: '20px', right: '20px', bottom: '28px', background: '#FFFFFF', borderRadius: '14px', padding: '20px 22px', zIndex: 20, opacity: 0, pointerEvents: 'none', border: '0.5px solid #888888' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <span style={{ fontFamily: "'Dreamer TM', serif", fontFeatureSettings: '"ss01"', fontSize: '24px', color: '#1A1A1A', letterSpacing: '0.045em', fontWeight: 700 }}>Colophon</span>
              <button onClick={() => { setColophonOpen(false); play('close', { theme: 'bubble', emphasis: 'subtle' }); }} aria-label="Close colophon" style={{ color: '#1A1A1A', background: 'none', border: 'none', cursor: 'pointer', fontSize: '28px', lineHeight: 1, padding: 0 }}>×</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {colophonLines.map((line, i) => (
                <p key={i} style={{ margin: 0, fontFamily: 'var(--font-dm-sans)', fontSize: '16px', fontWeight: 300, fontStyle: 'normal', color: '#1A1A1A', lineHeight: 1.4 }}>
                  {line.before}
                  {line.links.map((lk, j) => (
                    <span key={j}>
                      {j > 0 && (line.join ?? ' and ')}
                      <a href={lk.href} target="_blank" rel="noopener noreferrer" className="underline decoration-[#8B31CC] underline-offset-2 hover:no-underline hover:text-[#8B31CC] text-inherit transition-colors duration-150">{lk.label}</a>
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </div>

          {/* Sound toggle + clock */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25px' }}>
              <div style={{ opacity: 0.7 }}><LiveClock /></div>
              <div style={{ color: 'var(--text-muted)', fontSize: '16px', fontFamily: 'var(--font-dm-sans)', fontStyle: 'normal', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ opacity: 0.7 }}>2027</span>
                <img src="/images/Chunky Black Pixel Sparkle Icon (1).png" alt="" aria-hidden width="18" height="18" style={{ flexShrink: 0, opacity: 0.7 }} />
                <button
                  onClick={e => { e.stopPropagation(); setColophonOpen(true); play('open', { theme: 'bubble', emphasis: 'subtle' }); }}
                  className="underline decoration-[#8B31CC] underline-offset-[3px] hover:no-underline hover:text-[#8B31CC] text-inherit transition-colors duration-150"
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit', opacity: 0.7 }}
                >
                  Open Colophon
                </button>
              </div>
            </div>
            <div onMouseEnter={() => setSpeakerHovered(true)} onMouseLeave={() => setSpeakerHovered(false)}
              style={{ background: 'transparent', borderRadius: '50%', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `0.5px solid ${speakerHovered ? '#1A1A1A' : '#888888'}` }}>
              <SoundToggle />
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
