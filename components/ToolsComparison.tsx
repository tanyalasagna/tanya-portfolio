// "Why current tools aren't enough": the section's content condensed into one comparison table,
// with a screenshot of each tool underneath. Square corners, hairline borders and dashed dividers, like the rest of the site.

const RULE = '0.5px dashed rgba(56, 54, 54, 0.3)';
const FRAME = '0.5px solid #383636';

const tools = [
  { name: 'The Impulse Judge', kind: 'Web extension', logo: '/images/sift/logo-impulse-judge.png' },
  { name: 'Think Twice, Buy Once', kind: 'Mobile app', logo: '/images/sift/logo-think-twice.png' },
];

const rows: { label: string; cells: [string, string] }[] = [
  {
    label: 'How it works',
    cells: [
      'Makes you type out a roast before checkout.',
      'Asks you to wait and tracks the money you save.',
    ],
  },
  {
    label: 'When it shows up',
    cells: [
      'Appears only at checkout, not when you open your cart.',
      'No pop-up, so nothing appears in context.',
    ],
  },
  {
    label: 'What works',
    cells: [
      'A creative, effective way to make people reckon with their choices before checkout.',
      'Tracks the money you save, an incentive to “keep your money”.',
    ],
  },
  {
    label: 'Where it falls short',
    cells: [
      'Overwhelming layout. In testing, the humor wore thin fast: a novelty, not a habit.',
      'Every item is entered by hand, typed in or added by link.',
    ],
  },
];

const cellText = 'text-[15px] sm:text-[16px] leading-relaxed';
const font = { fontFamily: 'var(--font-dm-sans)' };

export default function ToolsComparison() {
  return (
    <div>
      <div style={{ border: FRAME }}>
        <table className="block md:table w-full" style={{ borderCollapse: 'collapse', ...font, color: 'var(--text)' }}>
          <caption className="sr-only">Comparison of The Impulse Judge and Think Twice, Buy Once</caption>
          <thead className="hidden md:table-header-group">
            <tr>
              <th scope="col" className="text-left align-top p-4 w-[20%]" style={{ background: '#F0F0EE' }} />
              {tools.map((t, i) => (
                <th key={t.name} scope="col" className="text-left align-top p-4 w-[40%]" style={{ background: '#F0F0EE', borderLeft: i === 0 ? undefined : RULE }}>
                  {/* The tool's own logo lockup (cut from its screenshot) stands in for its name; the label is centred under it */}
                  <div style={{ maxWidth: 220 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.logo} alt={t.name} className="block w-full" style={{ borderRadius: 8 }} />
                    <div className="mt-2 text-center text-[15px] sm:text-[16px]" style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--text-muted)', opacity: 0.8 }}>({t.kind})</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {rows.map(row => (
              <tr key={row.label} className="block md:table-row">
                <th
                  scope="row"
                  className={`block md:table-cell text-left align-top px-4 pt-4 pb-1 md:p-4 ${cellText}`}
                  style={{ borderTop: RULE, fontStyle: 'italic', fontWeight: 400, color: 'var(--text-muted)' }}
                >
                  {row.label}
                </th>
                {row.cells.map((text, i) => (
                  <td key={i} className={`block md:table-cell align-top px-4 pb-4 pt-1 md:p-4 ${cellText}`} style={{ borderTop: RULE }}>
                    {/* Without columns on phones, each answer says whose it is */}
                    <span className="md:hidden block text-[14px] sm:text-[15px] font-bold mb-0.5" style={{ opacity: 0.7 }}>{tools[i].name}</span>
                    {text}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
