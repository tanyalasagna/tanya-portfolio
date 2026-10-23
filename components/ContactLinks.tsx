'use client';
import { useState } from 'react';

const linkStyle = {
  fontSize: '18px',
  fontFamily: 'var(--font-dm-sans)',
  fontWeight: 600,
};

const baseCls = 'text-[var(--accent)] transition-colors duration-150';

export default function ContactLinks() {
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
        className={`underline-offset-2 cursor-pointer px-[2px] -mx-[2px] rounded-[2px] ${baseCls} ${copied ? '' : 'underline decoration-[#AC39D4] hover:[background:linear-gradient(rgba(172,57,212,0.12),rgba(172,57,212,0.12))_0_0/100%_calc(100%_-_2px)_no-repeat]'}`}
        style={linkStyle}
        data-cuelume-tap=""
        data-cuelume-emphasis="subtle"
      >
        {copied ? <span style={{ color: '#AC39D4', fontStyle: 'italic' }}>Copied. Say hi!</span> : 'Copy email'}
      </button>
      <a
        href="https://www.linkedin.com/in/tanya-singh2735/"
        target="_blank"
        rel="noopener noreferrer"
        className={`underline decoration-[#AC39D4] underline-offset-2 hover:[background:linear-gradient(rgba(172,57,212,0.12),rgba(172,57,212,0.12))_0_0/100%_calc(100%_-_2px)_no-repeat] hover:text-[#47122e] px-[2px] -mx-[2px] rounded-[2px] ${baseCls}`}
        style={linkStyle}
        data-cuelume-tap=""
        data-cuelume-emphasis="subtle"
      >
        LinkedIn
      </a>
    </>
  );
}
