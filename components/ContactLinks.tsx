'use client';
import { useState } from 'react';

const linkStyle = {
  color: 'var(--accent)',
  fontSize: '16px',
  fontFamily: 'var(--font-dm-sans)',
  fontWeight: 600,
};

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
        className={`underline-offset-2 cursor-pointer ${copied ? '' : 'underline decoration-dashed hover:no-underline hover:italic'}`}
        style={linkStyle}
        data-cuelume-tap=""
        data-cuelume-emphasis="subtle"
      >
        {copied ? 'Copied. Say Hi!' : 'Copy Email'}
      </button>
      <a
        href="https://www.linkedin.com/in/tanya-singh2735/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-dashed underline-offset-2 hover:no-underline hover:italic"
        style={linkStyle}
        data-cuelume-tap=""
        data-cuelume-emphasis="subtle"
      >
        LinkedIn
      </a>
    </>
  );
}
