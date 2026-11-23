'use client';
import { useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';
import PixelNumber from './PixelNumber';

// `body` is a sentence, or a list of short points shown with arrow bullets
type Finding = { title: string; body: string | string[] };

// Gray boxes that show only "number, bold heading, +" until clicked. The + turns into an x as the box opens.
// Boxes open and close independently of each other.
// With `numberedPoints` the headings carry no number; instead each point inside is marked with a pixel number, counting on from one box to the next (1, 2, 3 then 4, 5 and so on)
export default function FindingAccordion({ items, className = '', columns = 1, numberedPoints = false }: { items: Finding[]; className?: string; columns?: 1 | 2; numberedPoints?: boolean }) {
  const [open, setOpen] = useState<boolean[]>(() => items.map(() => false));
  const reduced = useReducedMotion();
  // Inline on purpose: globals.css sets `* { transition: border-color }`, which beats Tailwind's transition utilities
  const tr = (props: string, ms: number, ease = 'ease') => (reduced ? 'none' : props.split(',').map(p => `${p.trim()} ${ms}ms ${ease}`).join(', '));

  // The number each point starts from, so the count carries on across boxes
  const startAt = items.reduce<number[]>((acc, f, i) => [...acc, i === 0 ? 1 : acc[i - 1] + (Array.isArray(items[i - 1].body) ? (items[i - 1].body as string[]).length : 0)], []);

  const toggle = (i: number) => setOpen(o => o.map((v, j) => (j === i ? !v : v)));

  return (
    // With two columns the blocks sit side by side (stacked on a phone) and each one opens to its own height
    <div className={`${columns === 2 ? 'grid grid-cols-1 md:grid-cols-2 items-start' : 'flex flex-col'} gap-3 ${className}`}>
      {items.map((f, i) => {
        const isOpen = open[i];
        // Indented under the heading text when the heading has a number; flush with the heading otherwise
        const pad = numberedPoints ? 'pl-5 sm:pl-6' : 'pl-[calc(1.25rem+39px)] sm:pl-[calc(1.5rem+39px)]';
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
              {!numberedPoints && <PixelNumber n={i + 1} />}
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
                {/* Indented by the pill (27px) plus its gap (12px), so the sentence starts under the first word of the heading */}
                {typeof f.body === 'string' ? (
                  <p
                    className={`pr-5 sm:pr-6 pb-5 sm:pb-6 ${pad} text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed`}
                    style={{ margin: 0, fontFamily: 'var(--font-dm-sans)', color: 'var(--text)' }}
                  >
                    {f.body}
                  </p>
                ) : (
                  <div
                    className={`pr-5 sm:pr-6 pb-5 sm:pb-6 ${pad} text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed flex flex-col gap-3`}
                    style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--text)' }}
                  >
                    {f.body.map((point, j) => (
                      <p key={point} className="flex items-start gap-3" style={{ margin: 0 }}>
                        {numberedPoints ? (
                          <PixelNumber n={startAt[i] + j} />
                        ) : (
                          <ArrowRight size={18} strokeWidth={1.5} aria-hidden className="flex-none" style={{ marginTop: '0.32em' }} />
                        )}
                        <span>{point}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
