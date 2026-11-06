'use client';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const linkStyle = {
  fontFamily: 'var(--font-dm-sans)',
  fontWeight: 600,
};

const externalIcon = <ArrowUpRight size={12} strokeWidth={1.75} style={{ display: 'inline', verticalAlign: 'middle', position: 'relative', top: '-1px', marginLeft: '2px' }} aria-hidden />;

const sparkleIcon = (
  <img
    src="/images/Chunky Black Pixel Sparkle Icon (1).png"
    alt=""
    aria-hidden
    width="20"
    height="20"
    style={{ display: 'inline-block', verticalAlign: 'middle', position: 'relative', top: '-1px', marginRight: '5px' }}
  />
);

const baseCls = 'text-[var(--accent)] transition-colors duration-150';

export default function ContactLinks({ sizeCls = 'text-[18px]' }: { sizeCls?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('tanyabsingh25@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <>
      <span className="inline-flex items-center self-start">
        {sparkleIcon}
        <button
          onClick={handleCopy}
          className={`${sizeCls} underline-offset-[4px] cursor-pointer px-[2px] -mx-[2px] rounded-[2px] ${baseCls} ${copied ? '' : 'underline decoration-[1.5px] decoration-[var(--text)] hover:[background:linear-gradient(rgba(56,54,54,0.08),rgba(56,54,54,0.08))_0_0/100%_calc(100%_-_3px)_no-repeat]'}`}
          style={linkStyle}
          data-cuelume-tap=""
          data-cuelume-emphasis="subtle"
        >
          {copied ? <span style={{ color: '#383636' }}>Copied :)</span> : 'Copy email'}
        </button>
      </span>
      <a
        href="https://www.linkedin.com/in/tanya-singh2735/"
        target="_blank"
        rel="noopener noreferrer"
        className={`${sizeCls} decoration-[1.5px] decoration-[var(--text)] underline-offset-[4px] underline decoration-dashed hover:decoration-solid px-[2px] -mx-[2px] rounded-[2px] self-start ${baseCls}`}
        style={linkStyle}
        data-cuelume-tap=""
        data-cuelume-emphasis="subtle"
      >
        {sparkleIcon}LinkedIn{externalIcon}
      </a>
    </>
  );
}
