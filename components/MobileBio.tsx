'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ContactLinks from './ContactLinks';

export default function MobileBio() {
  const pathname = usePathname();
  if (pathname !== '/') return null;

  return (
    <div className="lg:hidden pt-8 pb-6 px-4">
      <p className="leading-normal mb-3" style={{ color: 'var(--text-muted)', fontSize: '18px' }}>
        Hi! I&rsquo;m a product designer with a background in content. I&rsquo;ve worked with agency clients at{' '}
        <a href="https://www.tossthe.co.in/company/about-us/" target="_blank" rel="noopener noreferrer" className="underline decoration-[#AC39D4] underline-offset-[4px] text-inherit transition-colors duration-150 hover:[background:linear-gradient(rgba(172,57,212,0.12),rgba(172,57,212,0.12))_0_0/100%_calc(100%_-_2px)_no-repeat] hover:text-[#47122e] px-[2px] -mx-[2px] rounded-[2px]">Toss the Coin</a>,{' '}
        in-house teams at <a href="https://ankogcc.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-[#AC39D4] underline-offset-[4px] text-inherit transition-colors duration-150 hover:[background:linear-gradient(rgba(172,57,212,0.12),rgba(172,57,212,0.12))_0_0/100%_calc(100%_-_2px)_no-repeat] hover:text-[#47122e] px-[2px] -mx-[2px] rounded-[2px]">Anko</a>, and <Link href="/resume" className="underline decoration-[#AC39D4] underline-offset-[4px] text-inherit transition-colors duration-150 hover:[background:linear-gradient(rgba(172,57,212,0.12),rgba(172,57,212,0.12))_0_0/100%_calc(100%_-_2px)_no-repeat] hover:text-[#47122e] px-[2px] -mx-[2px] rounded-[2px]">more</Link>.
      </p>
      <p className="leading-normal mb-4" style={{ color: 'var(--text-muted)', fontSize: '18px' }}>
        This site is a record of my product design work + a few explorations. If anything resonates with you, feel free to reach out ↴
      </p>
      <div className="flex gap-5">
        <ContactLinks />
      </div>
    </div>
  );
}
