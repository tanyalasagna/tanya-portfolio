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
      <p className="leading-normal text-[15px] sm:text-[16px]" style={{ color: 'var(--text-muted)', opacity: 0.8, marginBottom: '24px' }}>
        Hi! I&rsquo;m a product designer with a background in content. I&rsquo;ve worked with agency clients at{' '}
        <a href="https://www.tossthe.co.in/company/about-us/" data-cuelume-tap="" data-cuelume-emphasis="subtle" target="_blank" rel="noopener noreferrer" className="decoration-[1.5px] decoration-current underline-offset-[4px] text-inherit underline hover:no-underline px-[2px] -mx-[2px] rounded-[2px]">Toss the Coin{externalIcon}</a>,{' '}
        in-house teams at <a href="https://ankogcc.com/" data-cuelume-tap="" data-cuelume-emphasis="subtle" target="_blank" rel="noopener noreferrer" className="decoration-[1.5px] decoration-current underline-offset-[4px] text-inherit underline hover:no-underline px-[2px] -mx-[2px] rounded-[2px]">Anko{externalIcon}</a>, and <Link href="/resume" data-cuelume-navigate="" data-cuelume-emphasis="subtle" className="underline decoration-[1.5px] decoration-current underline-offset-[4px] text-inherit hover:no-underline px-[2px] -mx-[2px] rounded-[2px]">more</Link>.
      </p>
      <div className="flex items-center flex-wrap gap-2">
        <span className="text-[15px] sm:text-[16px]" style={{
          color: 'var(--text)',
          fontFamily: 'var(--font-dm-sans)',
          fontStyle: 'italic',
          fontWeight: 400,
          paddingLeft: '2px',
        }}>
          Say hi:
        </span>
        <ContactLinks sizeCls="text-[15px] sm:text-[16px]" />
      </div>
    </div>
  );
}
