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
        color: hovered ? '#383636' : '#888888',
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
        <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden>
          <path d="M3 8H7L12 4v14L7 14H3z" fill="currentColor" />
          <path d="M15 7.5a5 5 0 0 1 0 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden>
          <path d="M3 8H7L12 4v14L7 14H3z" fill="currentColor" />
          <line x1="15.5" y1="8.5" x2="19.5" y2="13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="19.5" y1="8.5" x2="15.5" y2="13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}
