'use client';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const linkStyle = {
  fontFamily: 'var(--font-dm-sans)',
  fontWeight: 600,
};

const externalIcon = <ArrowUpRight size={12} strokeWidth={1.75} style={{ display: 'inline', verticalAlign: 'middle', position: 'relative', top: '-1px', marginLeft: '2px' }} aria-hidden />;

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
      <button
        onClick={handleCopy}
        className={`${sizeCls} underline-offset-[4px] cursor-pointer px-[2px] -mx-[2px] rounded-[2px] self-start ${baseCls} ${copied ? '' : 'underline decoration-[1.5px] decoration-[#AC39D4] hover:[background:linear-gradient(rgba(172,57,212,0.12),rgba(172,57,212,0.12))_0_0/100%_calc(100%_-_3px)_no-repeat]'}`}
        style={linkStyle}
        data-cuelume-tap=""
        data-cuelume-emphasis="subtle"
      >
        {copied ? <span style={{ color: '#383636', fontStyle: 'italic' }}>Copied. Say hi!</span> : 'Copy email'}
      </button>
      <a
        href="https://www.linkedin.com/in/tanya-singh2735/"
        target="_blank"
        rel="noopener noreferrer"
        className={`${sizeCls} decoration-[1.5px] decoration-[#AC39D4] underline-offset-[4px] underline decoration-dashed hover:decoration-solid px-[2px] -mx-[2px] rounded-[2px] self-start ${baseCls}`}
        style={linkStyle}
        data-cuelume-tap=""
        data-cuelume-emphasis="subtle"
      >
        LinkedIn{externalIcon}
      </a>
    </>
  );
}
