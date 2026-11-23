'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Send, X } from 'lucide-react';
import { PixelPill } from './PixelEdge';

type Status = 'idle' | 'sending' | 'sent' | 'error';

// Over the blurred page around the dialog the mouse pointer turns into a cross: that is the way out (a click there closes it)
const CROSS_CURSOR = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28'><path d='M7 7L21 21M21 7L7 21' stroke='white' stroke-width='5' stroke-linecap='square' fill='none'/><path d='M7 7L21 21M21 7L7 21' stroke='%23383636' stroke-width='2' stroke-linecap='square' fill='none'/></svg>") 14 14, pointer`;

// A link-styled button that opens a message dialog over a blurred page. The visitor writes a message (the subject is filled in for them),
// gives an email address to be answered at, and sends it; it is delivered by /api/contact. Closes with the Close pill, a click outside, or Escape.
export default function ReachOutLink({ topic, children }: { topic: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; message?: string }>({});
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectDefault = `More details about ${topic}`;

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) { setShown(false); return; }
    const trigger = triggerRef.current;
    const raf = requestAnimationFrame(() => { setShown(true); emailRef.current?.focus(); });
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      trigger?.focus(); // back to where they were
    };
  }, [open]);

  // Start fresh each time it is opened, unless a message has just been sent
  useEffect(() => { if (open && status !== 'sent') { setStatus('idle'); setError(''); setFieldErrors({}); } }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;
    const f = new FormData(e.currentTarget);
    // Both an email address and a message are needed: nothing is sent without them
    const email = String(f.get('email') ?? '').trim();
    const message = String(f.get('message') ?? '').trim();
    const problems: { email?: string; message?: string } = {};
    if (!email) problems.email = 'Please add your email so I can reply.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) problems.email = 'That email address doesn\u2019t look right.';
    if (!message) problems.message = 'Please write a message before sending.';
    if (problems.email || problems.message) {
      setFieldErrors(problems);
      (problems.email ? emailRef.current : messageRef.current)?.focus();
      return;
    }
    setFieldErrors({});
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: f.get('subject'), email: f.get('email'), message: f.get('message'), website: f.get('website') }),
      });
      if (res.ok) { setStatus('sent'); return; }
      const data = await res.json().catch(() => ({}));
      setError(
        data.error === 'bad-email' ? 'That email address doesn’t look right.'
        : data.error === 'missing-message' ? 'Please write a message first.'
        : data.error === 'not-configured' ? 'Messages can’t be sent from here just yet.'
        : 'Something went wrong sending that. Please try again in a moment.',
      );
      setStatus('error');
    } catch {
      setError('Couldn’t reach the server. Please check your connection and try again.');
      setStatus('error');
    }
  };

  const label = 'mb-1.5 block text-[15px] sm:text-[16px]';
  const labelStyle = { color: 'color-mix(in srgb, var(--bg) 62%, transparent)', fontStyle: 'italic' as const, fontFamily: 'var(--font-dm-sans)' };
  const field: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: 0,
    border: '1px solid color-mix(in srgb, var(--bg) 32%, transparent)', background: 'color-mix(in srgb, var(--bg) 7%, transparent)', color: 'var(--bg)',
    fontFamily: "'Alegreya Sans', sans-serif", fontSize: 17, lineHeight: 1.4, outline: 'none',
  };

  const fieldErrorStyle: React.CSSProperties = { margin: '6px 0 0', color: 'var(--bg)', fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic' };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="underline hover:no-underline decoration-[1.5px] underline-offset-[4px]"
        style={{ border: 0, background: 'none', padding: 0, margin: 0, font: 'inherit', fontWeight: 700, color: 'inherit', cursor: 'pointer' }}
        aria-haspopup="dialog"
        data-cuelume-open=""
        data-cuelume-emphasis="subtle"
      >
        {children}
      </button>

      {open && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={subjectDefault}
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{
            cursor: CROSS_CURSOR,
            background: 'color-mix(in srgb, var(--bg) 55%, transparent)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            opacity: shown ? 1 : 0,
            // Inline on purpose: globals.css sets `* { transition: border-color }`, which beats Tailwind's transition utilities
            transition: 'opacity 250ms ease',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="w-full overflow-auto"
            style={{
              cursor: 'default', maxWidth: 560, maxHeight: '92vh', background: 'var(--ink)', padding: '20px 22px 24px',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)',
              transform: shown ? 'none' : 'translateY(8px)', transition: 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {/* A touch screen has no pointer to turn into a cross, so there the cross button is shown; everywhere else the cursor does the job */}
            <div className="hidden pointer-coarse:flex justify-end mb-3">
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="relative inline-flex items-center justify-center border-0 bg-transparent"
                style={{ width: 40, height: 32, padding: 0, color: 'var(--ink)', fontFamily: 'var(--font-dm-sans)', cursor: 'pointer' }}
                data-cuelume-close=""
                data-cuelume-emphasis="subtle"
              >
                <PixelPill fill="var(--bg)" stroke="var(--ink)" strokeWidth={0.3} />
                <X size={16} strokeWidth={1.5} aria-hidden style={{ position: 'relative' }} />
              </button>
            </div>

            {status === 'sent' ? (
              <div style={{ padding: '8px 0 12px', fontFamily: "'Alegreya Sans', sans-serif", color: 'var(--bg)' }}>
                <p className="text-[20px] sm:text-[22px]" style={{ margin: '0 0 8px', fontWeight: 700 }}>Thanks, your message is on its way.</p>
                <p className="text-[15px] sm:text-[16px] lg:text-[18px]" style={{ margin: 0, lineHeight: 1.5 }}>I&rsquo;ll reply to the email address you gave.</p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <style>{`.contact-field::placeholder{color:color-mix(in srgb,var(--bg) 42%,transparent)}.contact-field:focus{border-color:var(--bg)}`}</style>
                <label className={label} style={labelStyle} htmlFor="contact-subject">Subject</label>
                <input id="contact-subject" className="contact-field" name="subject" type="text" defaultValue={subjectDefault} maxLength={200} style={{ ...field, fontWeight: 600 }} />

                <label className={`${label} mt-4`} style={labelStyle} htmlFor="contact-email">Your email</label>
                <input
                  ref={emailRef} id="contact-email" className="contact-field" name="email" type="email" required autoComplete="email" placeholder="So I can reply"
                  aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                  onChange={() => fieldErrors.email && setFieldErrors(f => ({ ...f, email: undefined }))}
                  style={fieldErrors.email ? { ...field, borderColor: 'var(--bg)' } : field}
                />
                {fieldErrors.email && <p id="contact-email-error" role="alert" className="text-[14px] sm:text-[15px]" style={fieldErrorStyle}>{fieldErrors.email}</p>}

                <label className={`${label} mt-4`} style={labelStyle} htmlFor="contact-message">Message</label>
                <textarea
                  ref={messageRef} id="contact-message" className="contact-field" name="message" required rows={6} maxLength={4000} placeholder="What would you like to know?"
                  aria-invalid={!!fieldErrors.message} aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
                  onChange={() => fieldErrors.message && setFieldErrors(f => ({ ...f, message: undefined }))}
                  style={{ ...field, resize: 'vertical', minHeight: 130, ...(fieldErrors.message ? { borderColor: 'var(--bg)' } : null) }}
                />
                {fieldErrors.message && <p id="contact-message-error" role="alert" className="text-[14px] sm:text-[15px]" style={fieldErrorStyle}>{fieldErrors.message}</p>}

                {/* Hidden from people; bots tend to fill it in */}
                <div aria-hidden style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}>
                  <label>Leave this empty<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="relative inline-flex items-center border-0 bg-transparent text-[15px] sm:text-[16px]"
                    style={{ padding: '9px 18px', color: 'var(--ink)', fontFamily: 'var(--font-dm-sans)', cursor: status === 'sending' ? 'default' : 'pointer', opacity: status === 'sending' ? 0.6 : 1 }}
                  >
                    <PixelPill fill="var(--bg)" stroke="var(--ink)" strokeWidth={0.3} />
                    <span style={{ position: 'relative' }}>{status === 'sending' ? 'Sending…' : 'Send'}</span>
                    <Send size={16} strokeWidth={1.5} aria-hidden style={{ position: 'relative', marginLeft: 8 }} />
                  </button>
                  {status === 'error' && (
                    <p role="alert" className="text-[14px] sm:text-[15px]" style={{ margin: 0, color: 'var(--bg)', fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic' }}>{error}</p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
