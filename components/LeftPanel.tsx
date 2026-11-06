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
import { ArrowLeft, ArrowUpRight, X } from 'lucide-react';
import { siftNavSections } from './SiftCaseStudyContent';

const externalIcon = <ArrowUpRight size={12} strokeWidth={1.75} style={{ display: 'inline', verticalAlign: 'middle', position: 'relative', top: '-1px', marginLeft: '2px' }} aria-hidden />;

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
  { before: 'Sound by ', links: [{ label: 'Cuelume', href: 'https://cuelume.dev/' }] },
  { before: 'Hosted on ', links: [{ label: 'Vercel', href: 'https://vercel.com/' }] },
  { before: 'Source on ', links: [{ label: 'Github', href: 'https://github.com/tanyalasagna/tanya-portfolio' }] },
  { before: 'Created with ', links: [{ label: 'Claude Code', href: 'https://claude.ai/code' }] },
];

export default function LeftPanel() {
  const pathname = usePathname();
  const isCaseStudy = pathname.startsWith('/work/');
  const slug = isCaseStudy ? pathname.split('/')[2] : null;
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
      className="fixed left-0 top-0 h-full w-[316px] flex flex-col z-50"
      style={{ padding: '32px', paddingTop: isCaseStudy ? '40px' : '32px', background: 'var(--bg)', containerType: 'inline-size' }}
      onClick={() => setColophonOpen(false)}
    >
      {/* Name — hidden on case study pages */}
      {!isCaseStudy && (
        <Link href="/">
          <h1
            className="leading-none"
            style={{ color: 'var(--text)', fontFamily: "'Dreamer TM', serif", fontFeatureSettings: '"ss01"', fontSize: '44px', marginBottom: '12px', letterSpacing: nameHovered ? '0.0385em' : '0.045em' }}
            onMouseEnter={() => { setNameHovered(true); play('select', { theme: 'bubble', emphasis: 'subtle' }); }}
            onMouseLeave={() => setNameHovered(false)}
          >
            {wordmarkLetters.map((l, i) => (
              <span key={i} style={{ fontFeatureSettings: nameHovered ? `"${l.set}"` : '"ss01"' }}>{l.ch}</span>
            ))}
          </h1>
        </Link>
      )}

      {isCaseStudy ? (
        <>
          {/* Back link */}
          <Link
            href="/"
            className="hover:opacity-70 transition-opacity duration-150"
            style={{
              fontSize: '28px',
              fontFamily: "'Dreamer TM', serif",
              fontWeight: 400,
              fontFeatureSettings: '"ss01"',
              letterSpacing: '0.045em',
              marginBottom: '32px',
              textDecoration: 'none',
              lineHeight: 1,
            }}
            onClick={() => play('close', { theme: 'bubble', emphasis: 'subtle' })}
          >
            <ArrowLeft size={20} strokeWidth={1.5} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', position: 'relative', top: '-1px' }} />Back to projects
          </Link>

          {/* Case study section nav */}
          <div style={{ marginBottom: '32px' }}>
            <CaseStudyNav sections={slug === 'sift' ? siftNavSections : undefined} />
          </div>
        </>
      ) : (
        <>
          {/* Bio */}
          <div style={{ opacity: 0.8 }}>
          <p className="leading-normal" style={{ color: 'var(--text-muted)', fontSize: '17px', marginBottom: '32px' }}>
            Hi! I&rsquo;m a product designer with a background in content. I&rsquo;ve worked with agency clients at{' '}
            <a href="https://www.tossthe.co.in/company/about-us/" target="_blank" rel="noopener noreferrer" className="decoration-[1.5px] decoration-[var(--text)] underline-offset-[4px] text-inherit transition-colors duration-150 underline decoration-dashed hover:decoration-solid px-[2px] -mx-[2px] rounded-[2px]">Toss the Coin{externalIcon}</a>,{' '}
            <span style={{ whiteSpace: 'nowrap' }}>in&#8209;house</span> teams at <a href="https://ankogcc.com/" target="_blank" rel="noopener noreferrer" className="decoration-[1.5px] decoration-[var(--text)] underline-offset-[4px] text-inherit transition-colors duration-150 underline decoration-dashed hover:decoration-solid px-[2px] -mx-[2px] rounded-[2px]">Anko{externalIcon}</a>, and <Link href="/resume" className="underline decoration-[1.5px] decoration-[var(--text)] underline-offset-[4px] text-inherit transition-colors duration-150 hover:[background:linear-gradient(rgba(56,54,54,0.08),rgba(56,54,54,0.08))_0_0/100%_calc(100%_-_2px)_no-repeat] px-[2px] -mx-[2px] rounded-[2px]">more</Link>.
          </p>
          </div>

          {/* Contact */}
          <div style={{ marginBottom: '64px' }}>
            <span className="text-[15px] sm:text-[16px] lg:text-[18px]" style={{
              display: 'block',
              color: 'var(--text)',
              fontFamily: 'var(--font-dm-sans)',
              fontStyle: 'italic',
              fontWeight: 400,
              letterSpacing: '0.08em',
              paddingBottom: '4px',
              paddingLeft: '2px',
            }}>
              Say hi!
            </span>
            <div className="flex gap-5">
              <ContactLinks sizeCls="text-[17px]" />
            </div>
          </div>

          {/* Main nav */}
          <div style={{ marginBottom: '32px' }}>
            <HookSidebar />
          </div>
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
            style={{ position: 'absolute', left: '20px', right: '20px', bottom: '28px', background: '#F0F0EE', borderRadius: '6px', padding: '20px 22px', zIndex: 20, opacity: 0, pointerEvents: 'none' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '17px', color: 'var(--text)', fontStyle: 'italic', fontWeight: 400, letterSpacing: '0.08em' }}>Colophon</span>
              <button onClick={() => { setColophonOpen(false); play('close', { theme: 'bubble', emphasis: 'subtle' }); }} aria-label="Close colophon" style={{ color: '#383636', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
                <X size={20} strokeWidth={1.5} aria-hidden />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {colophonLines.map((line, i) => (
                <p key={i} style={{ margin: 0, fontFamily: 'var(--font-dm-sans)', fontSize: '16px', fontWeight: 300, fontStyle: 'normal', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  {line.before}
                  {line.links.map((lk, j) => (
                    <span key={j}>
                      {j > 0 && (line.join ?? ' and ')}
                      <a href={lk.href} target="_blank" rel="noopener noreferrer" className="decoration-[1.5px] decoration-[var(--text)] underline-offset-[4px] text-inherit transition-colors duration-150 underline decoration-dashed hover:decoration-solid px-[2px] -mx-[2px] rounded-[2px]">{lk.label}{externalIcon}</a>
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </div>

          {/* Sound toggle + clock */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25px' }}>
              <div style={{ opacity: 0.8 }}><LiveClock fontSize="17px" /></div>
              <div style={{ color: 'var(--text-muted)', fontSize: '17px', fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ opacity: 0.8 }}>2027</span>
                <img src="/images/Chunky Black Pixel Sparkle Icon (1).png" alt="" aria-hidden width="20" height="20" style={{ flexShrink: 0 }} />
                <button
                  onClick={e => { e.stopPropagation(); setColophonOpen(true); play('open', { theme: 'bubble', emphasis: 'subtle' }); }}
                  className="underline decoration-[1.5px] decoration-[var(--text)] underline-offset-[4px] text-inherit opacity-80 transition-colors duration-150 hover:[background:linear-gradient(rgba(56,54,54,0.08),rgba(56,54,54,0.08))_0_0/100%_calc(100%_-_2px)_no-repeat] px-[2px] -mx-[2px] rounded-[2px]"
                  style={{ border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}
                >
                  Open colophon
                </button>
              </div>
            </div>
            <div onMouseEnter={() => setSpeakerHovered(true)} onMouseLeave={() => setSpeakerHovered(false)}
              style={{ background: '#ffffff', borderRadius: '50%', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1px solid ${speakerHovered ? '#383636' : '#888888'}`, opacity: speakerHovered ? 1 : 0.8 }}>
              <SoundToggle forceHovered={speakerHovered} />
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
