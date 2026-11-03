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
    <div className="lg:hidden pt-8 pb-6 px-4">
      <p className="leading-normal text-[15px] sm:text-[16px]" style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>
        Hi! I&rsquo;m a product designer with a background in content. I&rsquo;ve worked with agency clients at{' '}
        <a href="https://www.tossthe.co.in/company/about-us/" target="_blank" rel="noopener noreferrer" className="decoration-[1.5px] decoration-[#AC39D4] underline-offset-[4px] text-inherit transition-colors duration-150 underline decoration-dashed hover:decoration-solid px-[2px] -mx-[2px] rounded-[2px]">Toss the Coin{externalIcon}</a>,{' '}
        in-house teams at <a href="https://ankogcc.com/" target="_blank" rel="noopener noreferrer" className="decoration-[1.5px] decoration-[#AC39D4] underline-offset-[4px] text-inherit transition-colors duration-150 underline decoration-dashed hover:decoration-solid px-[2px] -mx-[2px] rounded-[2px]">Anko{externalIcon}</a>, and <Link href="/resume" className="underline decoration-[1.5px] decoration-[#AC39D4] underline-offset-[4px] text-inherit transition-colors duration-150 hover:[background:linear-gradient(rgba(172,57,212,0.12),rgba(172,57,212,0.12))_0_0/100%_calc(100%_-_2px)_no-repeat] hover:text-[#47122e] px-[2px] -mx-[2px] rounded-[2px]">more</Link>.
      </p>
      <p className="leading-normal mb-3 text-[15px] sm:text-[16px]" style={{ color: 'var(--text-muted)' }}>
        This site is a record of my product design work + a few explorations. If anything resonates with you, feel free to reach out.
      </p>
      <div className="flex gap-5">
        <ContactLinks sizeCls="text-[15px] sm:text-[16px]" />
      </div>
    </div>
  );
}
