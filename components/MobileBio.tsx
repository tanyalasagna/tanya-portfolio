'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileBio() {
  const pathname = usePathname();
  if (pathname !== '/') return null;

  return (
    <div className="lg:hidden pt-8 pb-6 px-4">
      <p className="leading-normal mb-3" style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
        Hi! I&rsquo;m a product designer with a background in content. I&rsquo;ve worked with agency clients at{' '}
        <a href="https://www.tossthe.co.in/company/about-us/" target="_blank" rel="noopener noreferrer" className="underline decoration-[#8B31CC] underline-offset-2 hover:no-underline hover:text-[#8B31CC] text-inherit transition-colors duration-150">Toss the Coin</a>,{' '}
        in-house teams at <a href="https://ankogcc.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-[#8B31CC] underline-offset-2 hover:no-underline hover:text-[#8B31CC] text-inherit transition-colors duration-150">Anko</a>, and <Link href="/resume" className="underline decoration-[#8B31CC] underline-offset-2 hover:no-underline hover:text-[#8B31CC] text-inherit transition-colors duration-150">more</Link>.
      </p>
      <p className="leading-normal" style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
        This site is a record of my product design work + a few explorations.
      </p>
    </div>
  );
}
