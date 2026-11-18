// "What one pause can add up to": concentric quarter-arcs radiating from a single point (the pause) down onto a vertical line,
// each arc landing on one outcome. Solid arcs are what testing showed; dashed arcs are where it's headed.
// Redrawn in the site's style: a light-gray block, the site's dark ink, smooth curves and Alegreya text.

const INK = '#383636';
const OX = 330;   // the origin point (top of the vertical line), in viewBox units
const OY = 56;
const DASH = '8 7';

const outcomes: { label: string; r: number; shown: boolean }[] = [
  { label: 'A pause that takes a couple of minutes', r: 60, shown: true },
  { label: 'Reflection that leads to a choice: to buy, or not', r: 118, shown: true },
  { label: 'Habit formation over time, with a reflective pause', r: 180, shown: false },
  { label: 'A wardrobe of items loved, worn, and kept for years', r: 240, shown: false },
  { label: 'Less clothing waste in landfills', r: 296, shown: false },
];

// A quarter circle around the origin: from straight left of it, round to straight below it
const arc = (r: number) => `M ${OX - r} ${OY} A ${r} ${r} 0 0 0 ${OX} ${OY + r}`;

export default function ImpactDiagram() {
  const lastY = OY + outcomes[outcomes.length - 1].r;
  return (
    <div role="img" aria-label="Five outcomes in order, from a pause that takes a couple of minutes, to reflection that leads to a choice, habit formation over time, a wardrobe of items loved and kept for years, and less clothing waste in landfills. The first two are what testing showed; the last three are where it's headed." className="mb-6">
      {/* One picture at every size, so it scales as a whole and looks the same on phones as on tablet and desktop */}
      <div className="p-3 sm:p-6" style={{ background: '#F0F0EE' }}>
        <svg aria-hidden viewBox="0 0 1000 440" className="block w-full" style={{ fontFamily: 'var(--font-dm-sans)' }}>
          {/* the vertical line the outcomes sit on */}
          <line x1={OX} y1={OY} x2={OX} y2={lastY} stroke={INK} strokeWidth={2} opacity={0.3} />
          {outcomes.map(o => {
            const y = OY + o.r;
            return (
              <g key={o.label}>
                <path d={arc(o.r)} fill="none" stroke={INK} strokeWidth={2.5} strokeDasharray={o.shown ? undefined : DASH} opacity={o.shown ? 1 : 0.4} />
                <circle cx={OX} cy={y} r={6} fill={INK} opacity={o.shown ? 1 : 0.4} />
                <text x={OX + 34} y={y + 8} fontSize={25} fill={INK} opacity={o.shown ? 1 : 0.7}>{o.label}</text>
              </g>
            );
          })}
          {/* the origin: the pause itself */}
          <circle cx={OX} cy={OY} r={10} fill={INK} />

          {/* legend */}
          <line x1={OX + 34} y1={410} x2={OX + 70} y2={410} stroke={INK} strokeWidth={2.5} />
          <text x={OX + 82} y={417} fontSize={20} fontStyle="italic" fill={INK} opacity={0.75}>what testing showed</text>
          <line x1={OX + 330} y1={410} x2={OX + 366} y2={410} stroke={INK} strokeWidth={2.5} strokeDasharray={DASH} opacity={0.4} />
          <text x={OX + 378} y={417} fontSize={20} fontStyle="italic" fill={INK} opacity={0.75}>where it&rsquo;s headed</text>
        </svg>
      </div>
    </div>
  );
}
