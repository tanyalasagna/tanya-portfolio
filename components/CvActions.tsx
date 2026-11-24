import { ArrowUpRight, Download } from 'lucide-react';

export const RESUME_PDF = '/Tanya_Singh_Resume.pdf';
const linkCls = 'inline-flex items-center gap-1.5 text-[15px] sm:text-[16px] lg:text-[18px] underline decoration-[1.5px] decoration-current underline-offset-[4px] hover:no-underline px-[2px] -mx-[2px] rounded-[2px]';
const linkStyle = { color: 'var(--text)', fontFamily: 'var(--font-dm-sans)' };

// The two options at the top of the CV: open the resume PDF in a new tab, or download it. The row is as wide as the page is at 100%, so they line up with its right edge.
export default function CvActions() {
  return (
    <div className="mx-auto flex max-w-[816px] flex-wrap items-center justify-end gap-x-6 gap-y-2">
      <a href={RESUME_PDF} target="_blank" rel="noopener noreferrer" className={linkCls} style={linkStyle} data-cuelume-tap="" data-cuelume-emphasis="subtle">
        Open PDF
        <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden />
      </a>
      <a href={RESUME_PDF} download="Tanya_Singh_Resume.pdf" className={linkCls} style={linkStyle} data-cuelume-tap="" data-cuelume-emphasis="subtle">
        Download
        <Download size={16} strokeWidth={1.75} aria-hidden />
      </a>
    </div>
  );
}
