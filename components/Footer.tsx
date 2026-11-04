'use client';
import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PunchCircle {
  id: number;
  startX: number;
  startY: number;
  landX: number;
  landY: number;
  size: number;
}

const BAND_PCT = 0.45;

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [circles, setCircles] = useState<PunchCircle[]>([]);
  const nextId = useRef(0);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = footerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  // Use native click listener to avoid synthetic event issues
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const bandBottom = rect.height * BAND_PCT;
      const landY = bandBottom + 24 + Math.random() * (rect.height - bandBottom - 48);
      const landX = Math.max(20, Math.min(rect.width - 20, x + (Math.random() - 0.5) * 100));
      const size = 18 + Math.random() * 22;
      setCircles(prev => [...prev, { id: nextId.current++, startX: x, startY: y, landX, landY, size }]);
    };
    el.addEventListener('click', handler);
    return () => el.removeEventListener('click', handler);
  }, []);

  return (
    <footer
      ref={footerRef}
      className="hidden lg:block fixed bottom-0 z-[1]"
      style={{ left: '300px', right: 0, height: '440px', overflow: 'hidden', cursor: 'none' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setCursor(null)}
    >
      {/* Photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/footer-bg.jpg"
        alt=""
        draggable={false}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%', filter: 'grayscale(30%)', pointerEvents: 'none' }}
      />

      {/* Tint on image portion only */}
      <div style={{ position: 'absolute', top: '45%', left: 0, right: 0, bottom: 0, background: 'rgba(80, 20, 140, 0.50)', mixBlendMode: 'multiply', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '45%', left: 0, right: 0, bottom: 0, background: 'rgba(140, 80, 220, 0.15)', mixBlendMode: 'screen', pointerEvents: 'none' }} />

      {/* Purple paper band */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '45%', background: '#611FB8', overflow: 'hidden', boxShadow: '0 4px 32px rgba(0,0,0,0.18)', pointerEvents: 'none' }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }} xmlns="http://www.w3.org/2000/svg">
          <filter id="paper">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#paper)" />
        </svg>
      </div>

      {/* Fallen circles */}
      {circles.map(c => (
        <motion.div
          key={c.id}
          initial={{ x: c.startX - c.size / 2, y: c.startY - c.size / 2, scale: 1.1, opacity: 1, rotate: 0 }}
          animate={{ x: c.landX - c.size / 2, y: c.landY - c.size / 2, scale: 1, opacity: 0.95, rotate: (Math.random() - 0.5) * 30 }}
          transition={{ type: 'spring', stiffness: 55, damping: 16, mass: 1.3 }}
          style={{
            position: 'absolute',
            width: c.size,
            height: c.size,
            borderRadius: '50%',
            background: '#611FB8',
            pointerEvents: 'none',
            boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
          }}
        />
      ))}

      {/* Circle cursor */}
      {cursor && (
        <div
          style={{
            position: 'absolute',
            left: cursor.x - 18,
            top: cursor.y - 18,
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '1.5px solid rgba(255,255,255,0.75)',
            pointerEvents: 'none',
          }}
        />
      )}
    </footer>
  );
}
