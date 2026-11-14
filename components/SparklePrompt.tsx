'use client';
import { motion, useReducedMotion } from 'framer-motion';

// The site's pixel sparkle, with a small hop to draw the eye (same mask technique as the contact links)
function PixelSparkle({ delay = 0, reduced }: { delay?: number; reduced: boolean | null }) {
  return (
    <motion.span
      aria-hidden
      className="flex-none"
      animate={reduced ? undefined : { y: [0, -3, 0] }}
      transition={{ duration: 0.5, ease: 'easeOut', repeat: Infinity, repeatDelay: 1.5, delay }}
      style={{
        display: 'inline-block', width: 20, height: 20,
        backgroundColor: 'var(--text)',
        WebkitMaskImage: 'url("/images/Chunky Black Pixel Sparkle Icon (1).png")',
        maskImage: 'url("/images/Chunky Black Pixel Sparkle Icon (1).png")',
        WebkitMaskSize: 'contain', maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center', maskPosition: 'center',
      }}
    />
  );
}

// A centred italic call-to-action line with a hopping sparkle on each side, so visitors don't miss it
export default function SparklePrompt({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <p
      className={`flex items-center justify-center gap-2.5 text-center text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed ${className}`}
      style={{ fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', color: 'var(--text)' }}
    >
      <PixelSparkle reduced={reduced} />
      <span>{children}</span>
      <PixelSparkle reduced={reduced} delay={0.15} />
    </p>
  );
}
