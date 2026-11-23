// Receives the message from the "feel free to reach out" dialog and emails it to the site owner through Resend (https://resend.com).
//
// Set these in .env.local (and in the Vercel project's environment variables when deployed). They are secrets and are never committed:
//   RESEND_API_KEY      an API key from your Resend account
//   CONTACT_TO_EMAIL    the address the messages should arrive at
//   CONTACT_FROM_EMAIL  optional; defaults to Resend's shared test sender, which can only deliver to the email address your Resend account uses
//
// Without the first two, the dialog still opens but sending reports that it isn't set up yet.

const MAX_MESSAGE = 4000;

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.replace(/[\r\n]+/g, ' ').trim().slice(0, max) : '');

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'bad-request' }, { status: 400 });
  }

  // A hidden field that people never see, so only bots fill it in. Pretend it worked.
  if (typeof body.website === 'string' && body.website.length > 0) return Response.json({ ok: true });

  const email = clean(body.email, 254);
  const subject = clean(body.subject, 200) || 'A message from your portfolio';
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, MAX_MESSAGE) : '';

  if (!message) return Response.json({ error: 'missing-message' }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ error: 'bad-email' }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) return Response.json({ error: 'not-configured' }, { status: 503 });

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
      to: [to],
      reply_to: email, // so replying to the email goes to the visitor
      subject: `[Portfolio] ${subject}`,
      text: `From: ${email}\n\n${message}`,
    }),
  });

  if (!res.ok) return Response.json({ error: 'send-failed' }, { status: 502 });
  return Response.json({ ok: true });
}
