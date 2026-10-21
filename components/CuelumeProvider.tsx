'use client';
import { useEffect } from 'react';

export default function CuelumeProvider() {
  useEffect(() => {
    let unbind: (() => void) | undefined;
    import('cuelume').then(({ bind, setTheme }) => {
      setTheme('bubble');
      unbind = bind();
    });
    return () => unbind?.();
  }, []);
  return null;
}
