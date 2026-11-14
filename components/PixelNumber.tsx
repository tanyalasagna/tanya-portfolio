// A number inside a pixel-stepped black circle (an 11x11 grid of squares, so 22px gives crisp 2px pixels), with the number cut out in light gray
const CIRCLE = [
  '00011111000',
  '00111111100',
  '01111111110',
  '11111111111',
  '11111111111',
  '11111111111',
  '11111111111',
  '11111111111',
  '01111111110',
  '00111111100',
  '00011111000',
];

const runs = CIRCLE.flatMap((row, y) => {
  const out: { x: number; y: number; w: number }[] = [];
  let start: number | null = null;
  for (let x = 0; x <= row.length; x++) {
    const on = x < row.length && row[x] === '1';
    if (on && start === null) start = x;
    if (!on && start !== null) { out.push({ x: start, y, w: x - start }); start = null; }
  }
  return out;
});

export default function PixelNumber({ n, size = 22, color = '#F0F0EE' }: { n: number; size?: number; color?: string }) {
  return (
    <span aria-hidden className="relative inline-flex flex-none items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 11 11" width={size} height={size} shapeRendering="crispEdges" style={{ position: 'absolute', inset: 0 }}>
        {runs.map((r, i) => (
          // height 1.04 overlaps the next row slightly so no hairline seams show at fractional sizes
          <rect key={i} x={r.x} y={r.y} width={r.w} height={1.04} fill="#383636" />
        ))}
      </svg>
      <span
        style={{
          position: 'relative', color, fontFamily: "'Dreamer TM', serif", fontFeatureSettings: '"ss01"',
          fontSize: Math.round(size * 0.58), lineHeight: 1, paddingTop: Math.round(size * 0.07),
          // Dreamer TM ships as one file, so a heavier weight can't be drawn; a thin same-colour outline thickens the strokes instead
          fontWeight: 700, WebkitTextStroke: '0.7px currentColor',
        }}
      >
        {n}
      </span>
    </span>
  );
}
