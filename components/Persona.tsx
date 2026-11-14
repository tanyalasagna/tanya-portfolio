import { PixelPill } from './PixelEdge';

// "Who is Sift for?" persona, redrawn in the portfolio's own style instead of the original pastel image:
// pixel-stepped pills, Alegreya italic, a Dreamer TM age label and a pixel-art person.
// The original's three colour groups become three treatments: dark (the headline trait), light gray
// (the conscious side) and outlined white (the impulsive side).

type Tone = 'dark' | 'gray' | 'outline';

const TONES: Record<Tone, { fill: string; stroke: string; strokeWidth: number; color: string }> = {
  dark: { fill: '#383636', stroke: 'none', strokeWidth: 0, color: '#FFFFFF' },
  gray: { fill: '#F0F0EE', stroke: 'none', strokeWidth: 0, color: 'var(--text)' },
  outline: { fill: '#FFFFFF', stroke: '#383636', strokeWidth: 0.5, color: 'var(--text)' },
};

function Tag({ children, tone }: { children: React.ReactNode; tone: Tone }) {
  const t = TONES[tone];
  return (
    <span
      className="relative inline-flex items-center text-[15px] lg:text-[16px] whitespace-nowrap"
      style={{ padding: '8px 14px', color: t.color, fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.2 }}
    >
      <PixelPill fill={t.fill} stroke={t.stroke} strokeWidth={t.strokeWidth} />
      <span style={{ position: 'relative' }}>{children}</span>
    </span>
  );
}

// Pixel-art person: a stepped circle for the head and a stepped half-ellipse for the shoulders, built from a grid of squares
const COLS = 27;
const ROWS = 26;
function personRuns() {
  const inEllipse = (x: number, y: number, cx: number, cy: number, rx: number, ry: number) =>
    ((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2 <= 1;
  const runs: { x: number; y: number; w: number }[] = [];
  for (let y = 0; y < ROWS; y++) {
    let start: number | null = null;
    for (let x = 0; x <= COLS; x++) {
      const on = x < COLS && (inEllipse(x, y, 13.5, 6.5, 6.5, 6.5) || (y >= 15 && inEllipse(x, y, 13.5, 26, 13.5, 11.5)));
      if (on && start === null) start = x;
      if (!on && start !== null) { runs.push({ x: start, y, w: x - start }); start = null; }
    }
  }
  return runs;
}

function Person() {
  return (
    <svg viewBox={`0 0 ${COLS} ${ROWS}`} width="100%" aria-hidden shapeRendering="crispEdges" style={{ display: 'block' }}>
      {personRuns().map((r, i) => (
        // height 1.04 overlaps the next row slightly so no hairline seams show at fractional sizes
        <rect key={i} x={r.x} y={r.y} width={r.w} height={1.04} fill="#383636" />
      ))}
    </svg>
  );
}

const TAGS: { label: string; tone: Tone }[] = [
  { label: 'Self-aware & identifies their patterns', tone: 'dark' },
  { label: 'Chronically online', tone: 'outline' },
  { label: 'Still figuring out their style', tone: 'gray' },
  { label: 'Wants to buy consciously', tone: 'gray' },
  { label: 'Shops on impulse', tone: 'outline' },
];

function AgeLabel() {
  return (
    <span className="whitespace-nowrap" style={{ color: 'var(--text)' }}>
      <span
        className="text-[20px] lg:text-[24px]"
        style={{ fontFamily: "'Dreamer TM', serif", fontFeatureSettings: '"ss01"', letterSpacing: '0.12em', lineHeight: 1.15 }}
      >
        18 &ndash; 29
      </span>
      <span className="text-[15px] lg:text-[16px]" style={{ fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', marginLeft: '8px' }}>
        years old
      </span>
    </span>
  );
}

export default function Persona() {
  return (
    <div className="mb-6" role="img" aria-label="Sift's audience: 18 to 29 years old, self-aware and identifies their patterns, chronically online, still figuring out their style, wants to buy consciously, shops on impulse.">
      {/* Tablet and up: tags scattered around the person, as in the original layout */}
      <div className="relative hidden sm:block w-full" style={{ aspectRatio: '2.32 / 1' }}>
        <div className="absolute" style={{ left: '51%', top: 0, transform: 'translateX(-50%)' }}><Tag tone={TAGS[0].tone}>{TAGS[0].label}</Tag></div>
        <div className="absolute" style={{ left: '24.3%', top: '29.5%', transform: 'translate(-50%, -50%)' }}><Tag tone={TAGS[1].tone}>{TAGS[1].label}</Tag></div>
        <div className="absolute" style={{ left: '81.6%', top: '29.5%', transform: 'translate(-50%, -50%)' }}><Tag tone={TAGS[2].tone}>{TAGS[2].label}</Tag></div>
        <div className="absolute" style={{ left: 0, top: '57.8%', transform: 'translateY(-50%)' }}><Tag tone={TAGS[3].tone}>{TAGS[3].label}</Tag></div>
        <div className="absolute" style={{ right: 0, top: '57.8%', transform: 'translateY(-50%)' }}><Tag tone={TAGS[4].tone}>{TAGS[4].label}</Tag></div>
        <div className="absolute" style={{ left: '51%', top: '40%', transform: 'translate(-50%, -50%)' }}><AgeLabel /></div>
        <div className="absolute" style={{ left: '51%', bottom: 0, width: '17%', transform: 'translateX(-50%)' }}><Person /></div>
      </div>

      {/* Phones: the person and age on top, the tags wrapped below */}
      <div className="sm:hidden flex flex-col items-center gap-4">
        <div style={{ width: '88px' }}><Person /></div>
        <AgeLabel />
        <div className="flex flex-wrap justify-center gap-2">
          {TAGS.map(t => <Tag key={t.label} tone={t.tone}>{t.label}</Tag>)}
        </div>
      </div>
    </div>
  );
}
