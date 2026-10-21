'use client';
import { useState } from 'react';
import { setEnabled } from 'cuelume';

export default function SoundToggle() {
  const [on, setOn] = useState(true);
  const [hovered, setHovered] = useState(false);

  const toggle = () => {
    const next = !on;
    setOn(next);
    setEnabled(next);
  };

  return (
    <button
      onClick={toggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={on ? 'Mute sounds' : 'Unmute sounds'}
      title={on ? 'Mute sounds' : 'Unmute sounds'}
      style={{
        color: hovered ? '#1A1A1A' : '#888888',
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        width: 'fit-content',
        transition: 'color 150ms ease',
      }}
    >
      {on ? (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
          <path d="M3 8H7L12 4v14L7 14H3z" fill="currentColor" />
          <path d="M15 7.5a5 5 0 0 1 0 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
          <path d="M3 8H7L12 4v14L7 14H3z" fill="currentColor" />
          <line x1="15" y1="7.5" x2="20" y2="14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="20" y1="7.5" x2="15" y2="14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}
