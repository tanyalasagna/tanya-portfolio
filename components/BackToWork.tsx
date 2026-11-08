'use client';
import Link from 'next/link';
import { play } from 'cuelume';
import { ArrowLeft } from 'lucide-react';

export default function BackToWork({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`text-[15px] sm:text-[16px] lg:text-[17px] underline decoration-[1.5px] decoration-current underline-offset-[4px] hover:no-underline px-[2px] -mx-[2px] rounded-[2px] ${className}`}
      style={{
        fontFamily: 'var(--font-dm-sans)',
        fontWeight: 400,
        color: 'var(--text-muted)',
        opacity: 0.6,
        lineHeight: 1,
        display: 'inline-block',
        width: 'fit-content',
      }}
      onClick={() => play('close', { theme: 'bubble', emphasis: 'subtle' })}
    >
      <ArrowLeft size={16} strokeWidth={1.5} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', position: 'relative', top: '-1px' }} />Back
    </Link>
  );
}
