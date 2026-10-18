'use client';
import Link from 'next/link';
import LiveClock from './LiveClock';
import ContactLinks from './ContactLinks';
import HookSidebar from './HookSidebar';
import { useState } from 'react';

export default function LeftPanel() {
  const [nameHovered, setNameHovered] = useState(false);

  return (
    <aside
      className="fixed left-0 top-0 h-full w-[300px] flex flex-col border-r z-50"
      style={{ padding: '32px', borderColor: 'var(--divider)', background: 'var(--bg)', containerType: 'inline-size' }}
    >
      {/* Name */}
      <Link href="/">
        <h1
          className="leading-none"
          style={{ color: 'var(--text)', fontFamily: "'Dreamer TM', serif", fontFeatureSettings: nameHovered ? '"ss02"' : '"ss01"', fontSize: '44px', marginBottom: '16px', letterSpacing: nameHovered ? '0.025em' : '0.045em' }}
          onMouseEnter={() => setNameHovered(true)}
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
      <p className="leading-normal" style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '24px' }}>
        This site is a record of my product design work + a few explorations and side quests. Look around, and feel free to reach out!
      </p>

      {/* Contact */}
      <div className="flex gap-5" style={{ marginBottom: '32px' }}>
        <ContactLinks />
      </div>

      <div className="h-px" style={{ background: 'var(--divider)', marginBottom: '32px' }} />

      {/* Main nav */}
      <div style={{ marginBottom: '32px' }}>
        <HookSidebar />
      </div>

      <div className="h-px" style={{ background: 'var(--divider)', marginBottom: '32px' }} />

      {/* Spacer */}
      <div className="flex-1" />

      {/* Clock */}
      <LiveClock />
    </aside>
  );
}
