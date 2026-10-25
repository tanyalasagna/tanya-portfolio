'use client';
import { useEffect } from 'react';

export default function CuelumeProvider() {
  useEffect(() => {
    let unbind: (() => void) | undefined;
    import('cuelume').then(({ bind, setTheme, setEnabled }) => {
      setTheme('bubble');
      unbind = bind();
      if (navigator.maxTouchPoints > 0) setEnabled(false);
    });
    return () => unbind?.();
  }, []);
  return null;
}
