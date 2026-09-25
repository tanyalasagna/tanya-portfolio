'use client';
import { useState } from 'react';

const linkStyle = {
  color: 'var(--accent)',
  fontSize: '18px',
  fontFamily: 'var(--font-dm-sans)',
  fontStyle: 'italic' as const,
  fontWeight: 700,
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
        className="underline underline-offset-2 cursor-pointer hover:no-underline"
        style={linkStyle}
      >
        {copied ? 'Copied!' : 'Copy email'}
      </button>
      <a
        href="https://linkedin.com/in/tanyasingh-03"
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:no-underline"
        style={linkStyle}
      >
        LinkedIn
      </a>
    </>
  );
}
