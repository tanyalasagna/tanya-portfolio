'use client';
import { useState } from 'react';
import { setEnabled } from 'cuelume';
import { Volume2, VolumeX } from 'lucide-react';

export default function SoundToggle({ forceHovered = false }: { forceHovered?: boolean }) {
  const [on, setOn] = useState(true);
  const [hovered, setHovered] = useState(false);
  const isHot = hovered || forceHovered;

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
        color: '#383636',
        opacity: isHot ? 1 : 0.8,
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        width: 'fit-content',
        transition: 'opacity 150ms ease',
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
