'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import ContactLinks from './ContactLinks';

const externalIcon = <ArrowUpRight size={12} strokeWidth={1.75} style={{ display: 'inline', verticalAlign: 'middle', position: 'relative', top: '-1px', marginLeft: '2px' }} aria-hidden />;

export default function MobileBio() {
  const pathname = usePathname();
  if (pathname !== '/') return null;

  return (
    <div className="lg:hidden pt-12 pb-0 px-4">
      <p className="leading-normal text-[15px] sm:text-[16px]" style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>
        Hi! I&rsquo;m a product designer with a background in content. I&rsquo;ve worked with agency clients at{' '}
        <a href="https://www.tossthe.co.in/company/about-us/" target="_blank" rel="noopener noreferrer" className="decoration-[1.5px] decoration-[var(--text)] underline-offset-[4px] text-inherit transition-colors duration-150 underline decoration-dashed hover:decoration-solid px-[2px] -mx-[2px] rounded-[2px]">Toss the Coin{externalIcon}</a>,{' '}
        in-house teams at <a href="https://ankogcc.com/" target="_blank" rel="noopener noreferrer" className="decoration-[1.5px] decoration-[var(--text)] underline-offset-[4px] text-inherit transition-colors duration-150 underline decoration-dashed hover:decoration-solid px-[2px] -mx-[2px] rounded-[2px]">Anko{externalIcon}</a>, and <Link href="/resume" className="underline decoration-[1.5px] decoration-[var(--text)] underline-offset-[4px] text-inherit transition-colors duration-150 hover:[background:linear-gradient(rgba(56,54,54,0.08),rgba(56,54,54,0.08))_0_0/100%_calc(100%_-_2px)_no-repeat] px-[2px] -mx-[2px] rounded-[2px]">more</Link>.
      </p>
      <span className="text-[15px] sm:text-[16px]" style={{
        display: 'block',
        color: 'var(--text)',
        fontFamily: 'var(--font-dm-sans)',
        fontStyle: 'italic',
        fontWeight: 400,
        letterSpacing: '0.08em',
        paddingBottom: '4px',
        paddingLeft: '2px',
      }}>
        Say hi!
      </span>
      <div className="flex gap-5">
        <ContactLinks sizeCls="text-[15px] sm:text-[16px]" />
      </div>
    </div>
  );
}
