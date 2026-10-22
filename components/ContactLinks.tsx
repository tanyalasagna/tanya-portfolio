'use client';
import { useState } from 'react';

const linkStyle = {
  fontSize: '16px',
  fontFamily: 'var(--font-dm-sans)',
  fontWeight: 600,
};

const baseCls = 'text-[var(--accent)] hover:text-[#8B31CC] transition-colors duration-150';

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
        className={`underline-offset-2 cursor-pointer ${baseCls} ${copied ? '' : 'underline decoration-[#8B31CC] hover:no-underline'}`}
        style={linkStyle}
        data-cuelume-tap=""
        data-cuelume-emphasis="subtle"
      >
        {copied ? <span style={{ color: '#8B31CC', fontStyle: 'italic' }}>Copied. Say Hi!</span> : 'Copy Email'}
      </button>
      <a
        href="https://www.linkedin.com/in/tanya-singh2735/"
        target="_blank"
        rel="noopener noreferrer"
        className={`underline decoration-[#8B31CC] underline-offset-2 hover:no-underline ${baseCls}`}
        style={linkStyle}
        data-cuelume-tap=""
        data-cuelume-emphasis="subtle"
      >
        LinkedIn
      </a>
    </>
  );
}
