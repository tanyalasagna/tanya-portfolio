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
import { ArrowUpRight, X } from 'lucide-react';
import { siftNavSections } from './SiftCaseStudyContent';
import CaseStudyCarousel from './CaseStudyCarousel';
import BackToWork from './BackToWork';

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
        <Link href="/" className="inline-block w-fit">
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
          <BackToWork className="mb-8" />

          <div className="flex-1" />

          {/* Case study section nav */}
          <div style={{ marginBottom: '32px' }}>
            <CaseStudyNav key={slug} sections={slug === 'sift' ? siftNavSections : undefined} />
          </div>
        </>
      ) : (
        <>
          {/* Bio */}
          <div style={{ opacity: 0.8 }}>
          <p className="leading-normal" style={{ color: 'var(--text-muted)', fontSize: '17px', marginBottom: '48px' }}>
            Hi! I&rsquo;m a product designer with a background in content. I&rsquo;ve worked with agency clients at{' '}
            <a href="https://www.tossthe.co.in/company/about-us/" target="_blank" rel="noopener noreferrer" className="decoration-[1.5px] decoration-current underline-offset-[4px] text-inherit underline hover:no-underline px-[2px] -mx-[2px] rounded-[2px]">Toss the Coin{externalIcon}</a>,{' '}
            <span style={{ whiteSpace: 'nowrap' }}>in&#8209;house</span> teams at <a href="https://ankogcc.com/" target="_blank" rel="noopener noreferrer" className="decoration-[1.5px] decoration-current underline-offset-[4px] text-inherit underline hover:no-underline px-[2px] -mx-[2px] rounded-[2px]">Anko{externalIcon}</a>, and <Link href="/resume" className="underline decoration-[1.5px] decoration-current underline-offset-[4px] text-inherit hover:no-underline px-[2px] -mx-[2px] rounded-[2px]">more</Link>.
          </p>
          </div>

          {/* Main nav */}
          <div style={{ marginBottom: '48px' }}>
            <HookSidebar />
          </div>

          {/* Contact */}
          <div className="flex items-center flex-wrap gap-2" style={{ marginBottom: '32px' }}>
            <span className="text-[15px] sm:text-[16px] lg:text-[18px]" style={{
              color: 'var(--text)',
              fontFamily: 'var(--font-dm-sans)',
              fontStyle: 'italic',
              fontWeight: 400,
              paddingLeft: '2px',
            }}>
              Say hi:
            </span>
            <ContactLinks sizeCls="text-[17px]" />
          </div>
        </>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {isCaseStudy && <CaseStudyCarousel currentSlug={slug!} />}

      {!isCaseStudy && (
        <>
          {/* Colophon dialog — floats above bottom section, animated via GSAP */}
          <div
            ref={colophonRef}
            onClick={e => e.stopPropagation()}
            style={{ position: 'absolute', left: '20px', right: '20px', bottom: '28px', background: '#F0F0EE', borderRadius: '6px', padding: '20px 22px', zIndex: 20, opacity: 0, pointerEvents: 'none' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="text-[15px] sm:text-[16px] lg:text-[18px]" style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--text)', fontStyle: 'italic', fontWeight: 400 }}>Colophon</span>
              <button onClick={() => { setColophonOpen(false); play('close', { theme: 'bubble', emphasis: 'subtle' }); }} aria-label="Close colophon" style={{ color: '#383636', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
                <X size={18} strokeWidth={1.5} aria-hidden />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {colophonLines.map((line, i) => (
                <p key={i} style={{ margin: 0, fontFamily: 'var(--font-dm-sans)', fontSize: '16px', fontWeight: 300, fontStyle: 'normal', color: 'var(--text-muted)', opacity: 0.8, lineHeight: 1.4 }}>
                  {line.before}
                  {line.links.map((lk, j) => (
                    <span key={j}>
                      {j > 0 && (line.join ?? ' and ')}
                      <a href={lk.href} target="_blank" rel="noopener noreferrer" className="decoration-[1.5px] decoration-current underline-offset-[4px] text-inherit underline hover:no-underline px-[2px] -mx-[2px] rounded-[2px]">{lk.label}{externalIcon}</a>
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </div>

          {/* Sound toggle + clock */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25px' }}>
              <div style={{ opacity: 0.6 }}><LiveClock fontSize="17px" /></div>
              <div style={{ color: 'var(--text-muted)', fontSize: '17px', fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ opacity: 0.6 }}>2027</span>
                <span
                  aria-hidden
                  style={{
                    display: 'inline-block', width: 20, height: 20, flexShrink: 0,
                    backgroundColor: 'var(--text)',
                    WebkitMaskImage: 'url("/images/Chunky Black Pixel Sparkle Icon (1).png")',
                    maskImage: 'url("/images/Chunky Black Pixel Sparkle Icon (1).png")',
                    WebkitMaskSize: 'contain', maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center', maskPosition: 'center',
                  }}
                />
                <button
                  onClick={e => { e.stopPropagation(); setColophonOpen(true); play('open', { theme: 'bubble', emphasis: 'subtle' }); }}
                  className="underline decoration-[1.5px] decoration-current underline-offset-[4px] text-inherit hover:no-underline px-[2px] -mx-[2px] rounded-[2px]"
                  style={{ border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit', opacity: 0.6 }}
                >
                  View colophon
                </button>
              </div>
            </div>
            <div onMouseEnter={() => setSpeakerHovered(true)} onMouseLeave={() => setSpeakerHovered(false)}
              style={{ background: '#ffffff', borderRadius: '50%', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1px solid ${speakerHovered ? '#383636' : 'var(--text-muted)'}`, opacity: 0.6, transition: 'border-color 150ms ease' }}>
              <SoundToggle hovered={speakerHovered} />
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
