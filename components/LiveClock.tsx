'use client';
import { useState, useEffect } from 'react';

export default function LiveClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes().toString().padStart(2, '0');
      const s = now.getSeconds().toString().padStart(2, '0');
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = (h % 12 || 12).toString().padStart(2, '0');
      setTime(`${h12}:${m}:${s} ${ampm}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="leading-tight" style={{ color: 'var(--text)', fontSize: '18px', opacity: 1, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', fontWeight: 600 }}>
      <div>Chicago, IL</div>
      <div suppressHydrationWarning>{time}</div>
    </div>
  );
}
