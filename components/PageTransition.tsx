'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useCoverTransitionActive } from './CoverTransition';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // When a thumbnail is flying to the cover, the new page just fades in (a slide would shift the cover away from where the thumbnail is headed)
  const carrying = useCoverTransitionActive();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: carrying ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: carrying ? 0 : -6, transition: { duration: carrying ? 0.12 : 0.32, ease: [0.22, 1, 0.36, 1] } }}
        transition={{ duration: carrying ? 0.3 : 0.32, ease: [0.22, 1, 0.36, 1] }}
        style={{ minHeight: '100vh' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
