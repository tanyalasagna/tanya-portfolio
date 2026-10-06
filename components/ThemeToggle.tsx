'use client';
import { useState } from 'react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 260);
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const icon  = theme === 'dark' ? '/images/sun.svg'  : '/images/moon.svg';
  const label = theme === 'dark' ? 'Switch to light'  : 'Switch to dark';

  return (
    <button
      type="button"
      aria-label={label}
      className="glow-btn"
      data-state={clicked ? 'clicked' : undefined}
      onClick={handleClick}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={icon}
        alt={label}
        width={26}
        height={26}
        style={{ filter: 'var(--icon-filter)', display: 'block' }}
      />
    </button>
  );
}
