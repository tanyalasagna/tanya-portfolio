// A number inside a pixel-stepped black circle (a 9x9 grid of squares, so 27px gives crisp 3px pixels), with the number cut out in light gray
const CIRCLE = [
  '001111100',
  '011111110',
  '111111111',
  '111111111',
  '111111111',
  '111111111',
  '111111111',
  '011111110',
  '001111100',
];

export const circleRuns = CIRCLE.flatMap((row, y) => {
  const out: { x: number; y: number; w: number }[] = [];
  let start: number | null = null;
  for (let x = 0; x <= row.length; x++) {
    const on = x < row.length && row[x] === '1';
    if (on && start === null) start = x;
    if (!on && start !== null) { out.push({ x: start, y, w: x - start }); start = null; }
  }
  return out;
});

// Symbols drawn cell by cell on the same 9x9 grid as the circle, instead of set in type
const GLYPHS: Record<string, [number, number][]> = {
  '!': [[4, 2], [4, 3], [4, 4], [4, 6]],
};

export default function PixelNumber({ n, size = 27, color = '#F0F0EE', fill = '#383636' }: { n: number | string; size?: number; color?: string; fill?: string }) {
  return (
    <span aria-hidden className="relative inline-flex flex-none items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 9 9" width={size} height={size} shapeRendering="crispEdges" style={{ position: 'absolute', inset: 0 }}>
        {circleRuns.map((r, i) => (
          // height 1.04 overlaps the next row slightly so no hairline seams show at fractional sizes
          <rect key={i} x={r.x} y={r.y} width={r.w} height={1.04} fill={fill} />
        ))}
        {typeof n === 'string' && GLYPHS[n]?.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={color} />)}
      </svg>
      {typeof n === 'string' && GLYPHS[n] ? null : (
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
      )}
    </span>
  );
}
