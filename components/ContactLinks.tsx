'use client';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const linkStyle = {
  fontFamily: 'var(--font-dm-sans)',
  fontWeight: 600,
};

const externalIcon = <ArrowUpRight size={12} strokeWidth={1.75} style={{ display: 'inline', verticalAlign: 'middle', position: 'relative', top: '-1px', marginLeft: '2px' }} aria-hidden />;

const sparkleIcon = (
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
);

const baseCls = 'text-[var(--accent)] transition-colors duration-150';

export default function ContactLinks({ sizeCls = 'text-[18px]', stacked = false }: { sizeCls?: string; stacked?: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('tanyabsingh25@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <span
      className={stacked ? 'inline-flex flex-col items-end self-start' : 'inline-flex items-center self-start'}
      style={{ gap: stacked ? '6px' : '5px' }}
    >
      <button
        onClick={handleCopy}
        className={`${sizeCls} underline-offset-[4px] cursor-pointer px-[2px] -mx-[2px] rounded-[2px] ${baseCls} ${copied ? '' : 'underline decoration-[1.5px] decoration-current hover:no-underline'}`}
        style={linkStyle}
        data-cuelume-tap=""
        data-cuelume-emphasis="subtle"
      >
        {copied ? <span style={{ color: '#383636' }}>Copied :)</span> : 'Copy email'}
      </button>
      {!stacked && sparkleIcon}
      <a
        href="https://www.linkedin.com/in/tanya-singh2735/"
        target="_blank"
        rel="noopener noreferrer"
        className={`${sizeCls} decoration-[1.5px] decoration-current underline-offset-[4px] underline hover:no-underline px-[2px] -mx-[2px] rounded-[2px] ${baseCls}`}
        style={linkStyle}
        data-cuelume-tap=""
        data-cuelume-emphasis="subtle"
      >
        LinkedIn{externalIcon}
      </a>
    </span>
  );
}
