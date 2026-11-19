// Three kiosks with the factors outside the screen that shaped the experience: UI inconsistencies, card reader placement,
// help desk distance, queue management, glare & lighting. The kiosk renders are the original images (annotations removed);
// the annotations are redrawn on top in the site's style: the site's dark ink and italic text, on a light-gray block.
// Positions are in the image's own 2172 x 724 space, so the overlay scales together with the picture.

import LazyImg from './LazyImg';

const INK = '#383636';
const STROKE = { fill: 'none', stroke: INK, strokeWidth: 4.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
const LABEL = { fontSize: 40, fontStyle: 'italic' as const, fill: INK };

export default function KioskIssuesDiagram() {
  return (
    <div
      role="img"
      aria-label="Three different kiosks annotated with what shaped their use beyond the screen: UI inconsistencies from kiosk to kiosk, where the card reader is placed, how far the help desk is from the kiosks, queue management between them, and glare and lighting on the screen."
      className="p-3 sm:p-6"
      style={{ background: '#F0F0EE' }}
    >
      <div className="relative w-full" style={{ aspectRatio: '2172 / 724' }}>
        {/* multiply drops the render's white backdrop into the gray block, leaving the kiosks and their soft shadows */}
        <LazyImg src="/images/frogslayer/kiosks.webp" alt="" className="absolute inset-0 w-full h-full" style={{ mixBlendMode: 'multiply' }} />
        <svg aria-hidden viewBox="0 0 2172 724" className="absolute inset-0 w-full h-full" style={{ fontFamily: 'var(--font-dm-sans)' }}>
          {/* UI inconsistencies: a bracket on each screen, the label between the first two kiosks */}
          <path d="M 286 145 H 260 V 455 H 286" {...STROKE} />
          <path d="M 930 170 H 908 V 605 H 930" {...STROKE} />
          <path d="M 1680 190 H 1658 V 520 H 1680" {...STROKE} />
          <text x={567} y={358} {...LABEL}>UI inconsistencies</text>

          {/* card reader placement: a bracket by the first kiosk's reader, a brace and label by the second's */}
          <path d="M 520 447 Q 544 450 544 476 V 520 Q 544 546 520 549" {...STROKE} />
          <path d="M 1294 314 Q 1312 314 1312 332 V 374 Q 1312 389 1322 389 Q 1312 389 1312 404 V 446 Q 1312 464 1294 464" {...STROKE} />
          <text x={1342} y={362} {...LABEL}>card reader</text>
          <text x={1342} y={406} {...LABEL}>placement</text>

          {/* queue management: double-headed arrows between the kiosks, labelled under the second */}
          <path d="M 582 536 H 868 M 598 524 L 582 536 L 598 548 M 852 524 L 868 536 L 852 548" {...STROKE} />
          <path d="M 1284 536 H 1584 M 1300 524 L 1284 536 L 1300 548 M 1568 524 L 1584 536 L 1568 548" {...STROKE} />
          <text x={1284} y={592} {...LABEL}>queue management</text>

          {/* glare & lighting: a label with a curved arrow down to the screen's top edge */}
          <text x={1987} y={106} textAnchor="middle" {...LABEL}>glare &amp; lighting</text>
          <path d="M 1844 112 Q 1800 118 1795 192" {...STROKE} />
          <path d="M 1781 178 L 1795 203 L 1809 178" {...STROKE} />

          {/* help desk: a question mark in a circle with a dashed line down to the first kiosk's base */}
          <circle cx={107} cy={303} r={37} fill="none" stroke={INK} strokeWidth={4.5} />
          <text x={107} y={319} textAnchor="middle" style={{ fontSize: 46, fontWeight: 600, fill: INK }}>?</text>
          <path d="M 124 352 Q 262 440 322 578" {...STROKE} strokeDasharray="13 13" />
          <circle cx={324} cy={586} r={8} fill={INK} />
          <text x={46} y={508} {...LABEL}>help desk</text>
          <text x={46} y={553} {...LABEL}>distance from</text>
          <text x={46} y={598} {...LABEL}>the kiosks</text>
        </svg>
      </div>
    </div>
  );
}
