'use client';
import { useState, useEffect } from 'react';

export default function LiveClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Chicago',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).formatToParts(now);
      const get = (type: string) => parts.find(p => p.type === type)?.value ?? '';
      setTime(`${get('hour')}:${get('minute')}:${get('second')} ${get('dayPeriod')}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="leading-tight" style={{ color: 'var(--text)', fontSize: '16px', opacity: 1, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', fontWeight: 400 }}>
      <div>Chicago, IL</div>
      <div suppressHydrationWarning>{time}</div>
    </div>
  );
}
