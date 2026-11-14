import { ArrowDown, ArrowRight, ArrowUp, Repeat } from 'lucide-react';
import { PixelPill } from './PixelEdge';

// The workflow as a loop, read clockwise (layout from the supplied sketch):
//   Figma --designs--> Figma MCP --reads & passes on designs--> Claude Code
//   Claude Code --Builds--> Browser --View changes, refine and repeat--> back up into Figma
// Drawn in the site's style: a light-gray block (2.3 : 1, square corners), white pixel-stepped pills and dotted connector lines.
const ASPECT = 3002 / 1308;
const PILL_W = 17; // % of the block, so the connector end points below are exact
const LABEL =
  'Workflow, as a loop: Figma designs, Figma MCP reads and passes on the designs to Claude Code, Claude Code builds, you view the changes in the browser, then refine and repeat, which goes back to Figma.';
const DOT = { stroke: '#383636', strokeWidth: 1, strokeDasharray: '2 3', fill: 'none', vectorEffect: 'non-scaling-stroke' } as const;
const arrow = { color: 'var(--text)', opacity: 0.75 } as const;
const edgeLabel = 'leading-tight';
const edgeScaled = { fontSize: 'clamp(9px, 2cqw, 15px)' } as const;
const arrowScaled = { width: 'clamp(11px, 2.4cqw, 18px)', height: 'clamp(11px, 2.4cqw, 18px)' } as const;
const edgeStyle = { fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.9 } as const;

function Pill({ children, style, dark = false, scaled = false }: { children: React.ReactNode; style?: React.CSSProperties; dark?: boolean; scaled?: boolean }) {
  return (
    <span
      className={`relative inline-flex items-center justify-center whitespace-nowrap ${scaled ? '' : 'text-[15px] sm:text-[16px]'}`}
      style={{ ...(scaled ? { fontSize: 'clamp(10px, 2.7cqw, 16px)', padding: 'clamp(5px, 1.3cqw, 9px) clamp(7px, 1.6cqw, 12px)' } : { padding: '9px 12px' }), fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', color: dark ? '#FFFFFF' : 'var(--text)', lineHeight: 1.2, ...style }}
    >
      <PixelPill fill={dark ? '#383636' : '#FFFFFF'} stroke="none" strokeWidth={0} />
      <span style={{ position: 'relative' }}>{children}</span>
    </span>
  );
}

// Something centred at x% / y% of the block
const at = (x: number, y: number, extra: React.CSSProperties = {}): React.CSSProperties => ({
  position: 'absolute', left: x + '%', top: y + '%', transform: 'translate(-50%, -50%)', ...extra,
});

export default function WorkflowDiagram() {
  const half = PILL_W / 2;
  const xFigma = 11, xMcp = 47, xRight = 87;   // pill centres
  const yTop = 15, yBottom = 85;               // pill rows
  return (
    <div role="img" aria-label={LABEL}>
      {/* Tablet and up: one picture in percentages, so it scales as a whole */}
      <div className="relative hidden sm:block w-full" style={{ background: '#F0F0EE', aspectRatio: String(ASPECT), containerType: 'inline-size' }}>
        <svg aria-hidden className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
          <path d={`M ${xFigma + half + 1.5} ${yTop} H ${xMcp - half - 2}`} {...DOT} />
          <path d={`M ${xMcp + half + 1.5} ${yTop} H ${xRight - half - 2}`} {...DOT} />
          <path d={`M ${xRight} ${yTop + 7} V ${yBottom - 8}`} {...DOT} />
          <path d={`M ${xRight - half - 1.5} ${yBottom} H ${xFigma} V ${yTop + 9}`} {...DOT} />
        </svg>

        <ArrowRight aria-hidden size={18} strokeWidth={1.5} style={{ ...(at(xMcp - half - 1.2, yTop, arrow)), ...arrowScaled }} />
        <ArrowRight aria-hidden size={18} strokeWidth={1.5} style={{ ...(at(xRight - half - 1.2, yTop, arrow)), ...arrowScaled }} />
        <ArrowDown aria-hidden size={18} strokeWidth={1.5} style={{ ...(at(xRight, yBottom - 8, arrow)), ...arrowScaled }} />
        <ArrowUp aria-hidden size={18} strokeWidth={1.5} style={{ ...(at(xFigma, yTop + 8.2, arrow)), ...arrowScaled }} />

        <Pill scaled style={at(xFigma, yTop, { minWidth: PILL_W + '%' })}>Figma</Pill>
        <Pill scaled style={at(xMcp, yTop, { minWidth: PILL_W + '%' })}>Figma MCP</Pill>
        <Pill dark scaled style={at(xRight, yTop, { minWidth: PILL_W + '%' })}>Claude Code</Pill>
        <Pill scaled style={at(xRight, yBottom, { minWidth: PILL_W + '%' })}>Browser</Pill>

        {/* What travels along each arrow */}
        <span className={edgeLabel} style={{ ...at((xFigma + xMcp) / 2, yTop - 7.5), ...edgeStyle, ...edgeScaled }}>designs</span>
        <span className={`${edgeLabel} text-center`} style={{ ...at((xMcp + xRight) / 2, yTop - 7.5), ...edgeStyle, ...edgeScaled }}>reads &amp; passes</span>
        <span className={`${edgeLabel} text-center`} style={{ ...at((xMcp + xRight) / 2, yTop + 8), ...edgeStyle, ...edgeScaled }}>on designs</span>
        <span className={edgeLabel} style={{ ...at(xRight + 2.2, 50), transform: 'translate(0, -50%)', ...edgeStyle, ...edgeScaled }}>Builds</span>
        <span className={`${edgeLabel} text-center`} style={{ ...at((xFigma + xRight) / 2 - 8, yBottom - 7), ...edgeStyle, ...edgeScaled }}>View changes,</span>
        <span className={`${edgeLabel} text-center`} style={{ ...at((xFigma + xRight) / 2 - 8, yBottom + 7), ...edgeStyle, ...edgeScaled }}>refine and repeat</span>
      </div>

      {/* Phones: the same loop as a column, with what travels between steps */}
      <div className="sm:hidden flex flex-col items-center gap-1 p-5" style={{ background: '#F0F0EE' }}>
        {[
          ['Figma', 'designs'],
          ['Figma MCP', 'reads & passes on designs'],
          ['Claude Code', 'Builds'],
        ].map(([step, edge]) => (
          <span key={step} className="contents">
            <Pill dark={step === 'Claude Code'}>{step}</Pill>
            <span className="flex items-center gap-2 py-1">
              <ArrowDown aria-hidden size={18} strokeWidth={1.5} style={arrow} />
              <span className={`${edgeLabel} text-[13px]`} style={edgeStyle}>{edge}</span>
            </span>
          </span>
        ))}
        <Pill>Browser</Pill>
        <span className="flex items-center gap-2 py-1">
          <Repeat aria-hidden size={16} strokeWidth={1.5} style={arrow} />
          <span className={`${edgeLabel} text-[13px]`} style={edgeStyle}>View changes, refine and repeat (back to Figma)</span>
        </span>
      </div>
    </div>
  );
}
