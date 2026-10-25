'use client';
import { useState } from 'react';
import { setEnabled } from 'cuelume';
import { Volume2, VolumeX } from 'lucide-react';

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
        <Volume2 size={18} strokeWidth={1.5} aria-hidden />
      ) : (
        <VolumeX size={18} strokeWidth={1.5} aria-hidden />
      )}
    </button>
  );
}
