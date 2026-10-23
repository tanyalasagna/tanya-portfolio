'use client';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Track */}
      <span style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        width: '52px',
        height: '28px',
        borderRadius: '6px',
        background: isDark ? '#383636' : '#F0EFED',
        border: '0.5px solid var(--divider)',
        transition: 'background 300ms ease',
        flexShrink: 0,
      }}>
        {/* Knob */}
        <span style={{
          position: 'absolute',
          left: isDark ? '3px' : 'calc(100% - 25px - 3px)',
          width: '22px',
          height: '22px',
          borderRadius: '4px',
          background: isDark ? '#F0EFED' : '#383636',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'left 300ms cubic-bezier(0.22, 1, 0.36, 1), background 300ms ease',
        }}>
          {isDark ? (
            /* Sun — shown in dark mode */
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
              <circle cx="6.5" cy="6.5" r="2.5" fill="currentColor" style={{ color: '#383636' }} />
              <line x1="6.5" y1="0.5" x2="6.5" y2="2" stroke="#383636" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="6.5" y1="11" x2="6.5" y2="12.5" stroke="#383636" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="0.5" y1="6.5" x2="2" y2="6.5" stroke="#383636" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="11" y1="6.5" x2="12.5" y2="6.5" stroke="#383636" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="2" y1="2" x2="3" y2="3" stroke="#383636" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="10" y1="10" x2="11" y2="11" stroke="#383636" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="11" y1="2" x2="10" y2="3" stroke="#383636" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="3" y1="10" x2="2" y2="11" stroke="#383636" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          ) : (
            /* Moon — shown in light mode */
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
              <path d="M11 8.5A6 6 0 0 1 4.5 2a5.5 5.5 0 1 0 6.5 6.5z" fill="#F0EFED" />
            </svg>
          )}
        </span>
      </span>
    </button>
  );
}
