'use client';
import PixelNumber from './PixelNumber';

// Journey maps for the Frogslayer kiosk, drawn in the site's own style (pixel faces and badges, grey and white blocks, Alegreya).
// Both maps share one grid of ten stages, so a stage lines up exactly between the original and the final prototype.
// Steps the original didn't have are left as dashed gaps, which is what makes the two easy to compare.

export const MAP_W = 1120;
export const MAP_H = 624;

type Mood = 'happy' | 'pleasant' | 'neutral' | 'confused' | 'unhappy';
const LANES: { mood: Mood; label: string }[] = [
  { mood: 'happy', label: 'Happy' },
  { mood: 'pleasant', label: 'Pleasant' },
  { mood: 'neutral', label: 'Neutral' },
  { mood: 'confused', label: 'Confusion' },
  { mood: 'unhappy', label: 'Unhappy' },
];

type Stage = { label: string; mood: Mood; note: string; tag?: string } | null; // null = this stage doesn't exist in this version

const BEFORE: Stage[] = [
  { label: 'Approaching the kiosk', mood: 'happy', note: 'Stood 1–2 feet from the display; basic visuals on screen' },
  { label: 'Tap screen to open menu', mood: 'neutral', note: 'Generic buttons depicting menu actions' },
  { label: 'Select new card option', mood: 'confused', note: 'Confused entering a zip code; asked for help' },
  { label: 'Select amount to load', mood: 'neutral', note: 'Looked over the options and picked the cheapest' },
  null,
  null,
  { label: 'Kiosk asks payment type', mood: 'pleasant', note: '' },
  { label: 'Kiosk requests payment', mood: 'unhappy', note: 'Unsure which card reader to use; asked for help', tag: 'Pain point' },
  { label: 'Kiosk dispenses card', mood: 'pleasant', note: 'Subtle awe as the card was dispensed' },
  null,
];

const AFTER: Stage[] = [
  { label: 'Start page', mood: 'neutral', note: 'Presses the screen as the start page instructs' },
  { label: 'Menu page', mood: 'neutral', note: 'First visit to the venue, so picks “Buy a new card”' },
  { label: 'Card selection', mood: 'pleasant', note: 'Amount already right, so taps next straight away' },
  { label: 'Card load amount', mood: 'neutral', note: 'Sees every price at once and picks $25' },
  { label: 'Upsell pop-up', mood: 'pleasant', note: 'As a saver, a free upsell offer intrigues him', tag: 'New' },
  { label: 'Member amount selection', mood: 'happy', note: 'Pleased he gains more arcade points per dollar', tag: 'New' },
  { label: 'Payment method', mood: 'pleasant', note: 'Chooses card as the payment option' },
  { label: 'Payment instructions', mood: 'pleasant', note: 'Clear visuals show how to pay with his card', tag: 'Improved' },
  { label: 'Card dispensed', mood: 'happy', note: 'Waits as instructed, then takes his card' },
  { label: 'Ending options', mood: 'happy', note: 'Receives his card and taps “I’m finished”', tag: 'New' },
];

// Layout (design pixels)
const PAD = 28;
const LABEL_W = 96;
const COL_W = (MAP_W - PAD * 2 - LABEL_W) / 10; // 96
const HEADER_Y = PAD;
const CHIP_Y = HEADER_Y + 36;
const CHIP_H = 92;
const GRAPH_Y = CHIP_Y + CHIP_H + 20;
const LANE_PITCH = 48;
const GRAPH_H = LANE_PITCH * 5 + 24;
const NOTE_Y = GRAPH_Y + GRAPH_H + 16;
const NOTE_H = 140;
const colX = (i: number) => PAD + LABEL_W + i * COL_W;
const laneY = (mood: Mood) => GRAPH_Y + 12 + LANES.findIndex(l => l.mood === mood) * LANE_PITCH + LANE_PITCH / 2;

const INK = '#383636';
const PAPER = '#F0F0EE';
const FACE = 36;

const CIRCLE = ['001111100', '011111110', '111111111', '111111111', '111111111', '111111111', '111111111', '011111110', '001111100'];
const circleRuns = CIRCLE.flatMap((row, y) => {
  const out: { x: number; y: number; w: number }[] = [];
  let start: number | null = null;
  for (let x = 0; x <= row.length; x++) {
    const on = x < row.length && row[x] === '1';
    if (on && start === null) start = x;
    if (!on && start !== null) { out.push({ x: start, y, w: x - start }); start = null; }
  }
  return out;
});
// Features cut out of the pixel circle, as [x, y] cells of the 9x9 grid
const FEATURES: Record<Mood, [number, number][]> = {
  happy: [[2, 3], [6, 3], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [3, 6], [4, 6], [5, 6]],
  pleasant: [[2, 3], [6, 3], [2, 5], [6, 5], [3, 6], [4, 6], [5, 6]],
  neutral: [[2, 3], [6, 3], [3, 6], [4, 6], [5, 6]],
  confused: [[2, 3], [6, 3], [2, 6], [3, 5], [4, 6], [5, 5], [6, 6]],
  unhappy: [[2, 3], [6, 3], [3, 5], [4, 5], [5, 5], [2, 6], [6, 6]],
};

function PixelFace({ mood, size = FACE }: { mood: Mood; size?: number }) {
  return (
    <svg viewBox="0 0 9 9" width={size} height={size} shapeRendering="crispEdges" aria-hidden>
      {circleRuns.map((r, i) => <rect key={i} x={r.x} y={r.y} width={r.w} height={1.04} fill={INK} />)}
      {FEATURES[mood].map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={PAPER} />)}
    </svg>
  );
}

const sans = 'var(--font-dm-sans)';

export default function JourneyMap({ variant }: { variant: 'before' | 'after' }) {
  const stages = variant === 'before' ? BEFORE : AFTER;
    const points = stages.map((s, i) => (s ? { i, x: colX(i) + COL_W / 2, y: laneY(s.mood) } : null));

  // Line between faces: solid between neighbouring stages, dashed where it jumps over a missing step
  const segments: { a: NonNullable<(typeof points)[number]>; b: NonNullable<(typeof points)[number]> }[] = [];
  let prev: (typeof points)[number] = null;
  for (const p of points) {
    if (!p) continue;
    if (prev) segments.push({ a: prev, b: p });
    prev = p;
  }

  return (
    <div style={{ position: 'relative', width: MAP_W, height: MAP_H, background: PAPER, color: INK, fontFamily: sans, overflow: 'hidden' }}>
      {/* Lanes */}
      {LANES.map((l, i) => {
        const y = GRAPH_Y + 12 + i * LANE_PITCH + LANE_PITCH / 2;
        return (
          <div key={l.mood}>
            <div style={{ position: 'absolute', left: PAD, width: LABEL_W - 14, top: y - 10, textAlign: 'right', fontStyle: 'italic', fontSize: 15, lineHeight: '20px', opacity: 0.7 }}>{l.label}</div>
            <div style={{ position: 'absolute', left: PAD + LABEL_W, width: MAP_W - PAD * 2 - LABEL_W, top: y, height: 1, background: 'rgba(56, 54, 54, 0.16)' }} />
          </div>
        );
      })}

      {/* Highlight behind a column that's called out */}
      {stages.map((s, i) => s?.tag ? (
        <div key={`hl-${i}`} style={{ position: 'absolute', left: colX(i) + 2, width: COL_W - 4, top: CHIP_Y - 8, height: NOTE_Y + NOTE_H - CHIP_Y + 16, background: 'rgba(56, 54, 54, 0.07)' }} />
      ) : null)}

      {/* Tags above the stage chips */}
      {stages.map((s, i) => s?.tag ? (
        <div key={`tag-${i}`} style={{ position: 'absolute', left: colX(i) + 2, width: COL_W - 4, top: CHIP_Y - 30, display: 'flex', justifyContent: 'center' }}>
          <span style={{ background: INK, color: '#fff', fontSize: 13, fontWeight: 600, lineHeight: 1, padding: '4px 8px', whiteSpace: 'nowrap' }}>{s.tag}</span>
        </div>
      ) : null)}

      {/* Stage chips */}
      {stages.map((s, i) => (
        <div
          key={`chip-${i}`}
          style={{
            position: 'absolute', left: colX(i) + 4, width: COL_W - 8, top: CHIP_Y, height: CHIP_H,
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6, padding: '8px 8px',
            background: s ? '#fff' : 'transparent', border: s ? 'none' : '1px dashed rgba(56, 54, 54, 0.35)',
            boxSizing: 'border-box',
          }}
        >
          {s ? (
            <>
              <PixelNumber n={i + 1} size={18} />
              <span style={{ fontWeight: 600, fontSize: 15, lineHeight: 1.1 }}>{s.label}</span>
            </>
          ) : null}
        </div>
      ))}

      {/* Line through the moods, then the faces on top of it */}
      <svg width={MAP_W} height={MAP_H} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden>
        {segments.map((sg, k) => (
          <line key={k} x1={sg.a.x} y1={sg.a.y} x2={sg.b.x} y2={sg.b.y} stroke={INK} strokeOpacity={0.55} strokeWidth={1.5} strokeDasharray={sg.b.i - sg.a.i > 1 ? '5 5' : undefined} />
        ))}
      </svg>
      {points.map(p => p && (
        <div key={`face-${p.i}`} style={{ position: 'absolute', left: p.x - FACE / 2, top: p.y - FACE / 2, width: FACE, height: FACE }}>
          <PixelFace mood={stages[p.i]!.mood} />
        </div>
      ))}

      {/* Notes */}
      {stages.map((s, i) => (
        <div
          key={`note-${i}`}
          style={{
            position: 'absolute', left: colX(i) + 4, width: COL_W - 8, top: NOTE_Y, height: NOTE_H, boxSizing: 'border-box', padding: 9,
            background: s ? '#fff' : 'transparent', border: s ? 'none' : '1px dashed rgba(56, 54, 54, 0.35)',
            fontSize: 15, lineHeight: 1.2, overflow: 'hidden',
          }}
        >
          {s ? (s.note || <span style={{ opacity: 0.4 }}>{'—'}</span>) : null}
        </div>
      ))}
    </div>
  );
}
