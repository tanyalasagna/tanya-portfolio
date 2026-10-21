'use client';
import Link from 'next/link';
import LiveClock from './LiveClock';
import ContactLinks from './ContactLinks';
import HookSidebar from './HookSidebar';
import { useState } from 'react';
import { play } from 'cuelume';
import SoundToggle from './SoundToggle';

export default function LeftPanel() {
  const [nameHovered, setNameHovered] = useState(false);

  return (
    <aside
      className="fixed left-0 top-0 h-full w-[300px] flex flex-col z-50"
      style={{ padding: '32px', borderRight: '0.5px solid var(--divider)', background: 'var(--bg)', containerType: 'inline-size' }}
    >
      {/* Name */}
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

      {/* Bio */}
      <p className="leading-normal mb-3" style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
        Hi! I&rsquo;m a product designer with a background in content. I&rsquo;ve worked with agency clients at{' '}
        <a href="https://www.tossthe.co.in/company/about-us/" target="_blank" rel="noopener noreferrer" className="underline decoration-dashed underline-offset-2 hover:no-underline" style={{ color: 'inherit', fontStyle: 'italic' }}>Toss the Coin</a>,{' '}
        in-house teams at <a href="https://ankogcc.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-dashed underline-offset-2 hover:no-underline" style={{ color: 'inherit', fontStyle: 'italic' }}>Anko</a>, and <Link href="/resume" className="underline decoration-dashed underline-offset-2 hover:no-underline" style={{ color: 'inherit', fontStyle: 'italic' }}>more</Link>.
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
    </aside>
  );
}
