'use client';
import { useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import PixelNumber from './PixelNumber';

type Finding = { title: string; body: string };

// Gray boxes that show only "number, bold heading, +" until clicked. The + turns into an x as the box opens.
// Boxes open and close independently of each other.
export default function FindingAccordion({ items, className = '' }: { items: Finding[]; className?: string }) {
  const [open, setOpen] = useState<boolean[]>(() => items.map(() => false));
  const reduced = useReducedMotion();
  // Inline on purpose: globals.css sets `* { transition: border-color }`, which beats Tailwind's transition utilities
  const tr = (props: string, ms: number, ease = 'ease') => (reduced ? 'none' : props.split(',').map(p => `${p.trim()} ${ms}ms ${ease}`).join(', '));

  const toggle = (i: number) => setOpen(o => o.map((v, j) => (j === i ? !v : v)));

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {items.map((f, i) => {
        const isOpen = open[i];
        return (
          <div key={i} style={{ background: '#F0F0EE' }}>
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              aria-controls={`finding-${i}`}
              className="flex w-full items-center gap-3 p-5 sm:p-6 text-left hover:bg-[#E9E9E6]"
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-dm-sans)', color: 'var(--text)' }}
              data-cuelume-tap=""
              data-cuelume-emphasis="subtle"
            >
              <PixelNumber n={i + 1} />
              <span className="flex-1 min-w-0 text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed" style={{ fontWeight: 700 }}>{f.title}</span>
              <Plus
                size={20}
                strokeWidth={1.75}
                aria-hidden
                className="flex-none"
                style={{ transform: isOpen ? 'rotate(45deg)' : 'none', transition: tr('transform', 220, 'cubic-bezier(0.22, 1, 0.36, 1)') }}
              />
            </button>

            {/* Grows open smoothly; kept mounted so the height can animate */}
            <div
              id={`finding-${i}`}
              role="region"
              aria-hidden={!isOpen}
              inert={!isOpen}
              style={{
                display: 'grid',
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                opacity: isOpen ? 1 : 0,
                transition: tr('grid-template-rows, opacity', 300, 'cubic-bezier(0.22, 1, 0.36, 1)'),
              }}
            >
              <div style={{ overflow: 'hidden' }}>
                {/* Indented by the pill (22px) plus its gap (12px), so the sentence starts under the first word of the heading */}
                <p
                  className="pr-5 sm:pr-6 pb-5 sm:pb-6 pl-[calc(1.25rem+34px)] sm:pl-[calc(1.5rem+34px)] text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed"
                  style={{ margin: 0, fontFamily: 'var(--font-dm-sans)', color: 'var(--text)' }}
                >
                  {f.body}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
