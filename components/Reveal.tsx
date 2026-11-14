'use client';
import { useEffect, useRef, useState } from 'react';

// Fades and lifts its content into view as it scrolls into the viewport and stays shown while you read on.
// Scrolling back to the top of the page resets it, so the whole sequence plays again.
// Only opacity and transform change, so the layout (and the section ids the Index tracks) never moves.
export default function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    // Shown once its top edge is inside the lower 88% of the viewport. Anything already scrolled past
    // (a reload mid-page, an anchor jump) has its top above the viewport, so it counts as seen too.
    // Back at the very top of the page, everything below the fold is reset, so the sections
    // appear one by one again on the next scroll down (no refresh needed).
    const check = () => {
      const trigger = window.innerHeight * 0.88;
      const top = el.getBoundingClientRect().top;
      if (window.scrollY < 40 && top >= trigger) setShown(false);
      else if (top < trigger) setShown(true);
    };
    // Re-check shortly after mount too, because the browser restores the scroll position after hydration
    const timers = [100, 400, 1000].map(ms => setTimeout(check, ms));
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    check();
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(12px)',
        // Inline on purpose: globals.css sets `* { transition: border-color }`, which beats Tailwind's transition utilities
        transition: `opacity 320ms cubic-bezier(0.25, 1, 0.5, 1) ${delay}ms, transform 320ms cubic-bezier(0.25, 1, 0.5, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
