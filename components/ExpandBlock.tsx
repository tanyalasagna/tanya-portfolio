'use client';
import { useId, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';

// A gray box that shows only a bold heading and a + until clicked; the content then expands underneath and the + turns into an x.
// Same look and behaviour as the findings accordion, for blocks of arbitrary content.
export default function ExpandBlock({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const id = useId();
  // Inline on purpose: globals.css sets `* { transition: border-color }`, which beats Tailwind's transition utilities
  const tr = (props: string, ms: number, ease = 'ease') => (reduced ? 'none' : props.split(',').map(p => `${p.trim()} ${ms}ms ${ease}`).join(', '));

  return (
    <div style={{ background: '#F0F0EE' }}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center gap-3 p-5 sm:p-6 text-left hover:bg-[#E9E9E6]"
        style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-dm-sans)', color: 'var(--text)' }}
        data-cuelume-tap=""
        data-cuelume-emphasis="subtle"
      >
        <span className="flex-1 min-w-0 text-[16px] sm:text-[17px] lg:text-[18px] font-bold leading-snug">{title}</span>
        <Plus
          size={20}
          strokeWidth={1.75}
          aria-hidden
          className="flex-none"
          style={{ transform: open ? 'rotate(45deg)' : 'none', transition: tr('transform', 220, 'cubic-bezier(0.22, 1, 0.36, 1)') }}
        />
      </button>

      {/* Grows open smoothly; kept mounted so the height can animate */}
      <div
        id={id}
        role="region"
        aria-hidden={!open}
        inert={!open}
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          opacity: open ? 1 : 0,
          transition: tr('grid-template-rows, opacity', 300, 'cubic-bezier(0.22, 1, 0.36, 1)'),
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed" style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--text)' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
