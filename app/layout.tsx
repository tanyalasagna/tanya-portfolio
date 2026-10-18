import type { Metadata } from 'next';
import Link from 'next/link';
import { Alegreya } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import LeftPanel from '@/components/LeftPanel';
import MobileNav from '@/components/MobileNav';
import PageTransition from '@/components/PageTransition';
import ThemeTransition from '@/components/ThemeTransition';

const cormorantSerif = Alegreya({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const cormorantLight = Alegreya({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['italic'],
});

export const metadata: Metadata = {
  title: 'Tanya Singh — Product Designer',
  description:
    'Portfolio of Tanya Singh, product designer rooted in content strategy.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorantSerif.variable} ${cormorantLight.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          {/* Canvas background transition — sits at z-index 0, behind all content */}
          <ThemeTransition />

          {/* === Mobile nav (header + overlay menu) === */}
          <MobileNav />

          {/* Left panel — fixed, hidden on mobile */}
          <div className="hidden md:block">
            <LeftPanel />
          </div>

          {/* Right / main content — document scrolls, left panel is fixed */}
          <main
            className="md:ml-[300px] pt-14 md:pt-0"
            id="main-scroll"
          >
              {/* Mobile-only bio — always visible above page content */}
              <div className="md:hidden pt-8 pb-2" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                <p className="leading-normal mb-3" style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
                  Hi! I&rsquo;m a product designer with a background in content. I&rsquo;ve worked with agency clients at{' '}
                  <a href="https://www.tossthe.co.in/company/about-us/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:no-underline" style={{ color: 'inherit', fontStyle: 'italic' }}>Toss the Coin</a>,{' '}
                  in-house teams at <a href="https://ankogcc.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:no-underline" style={{ color: 'inherit', fontStyle: 'italic' }}>Anko</a>, and <Link href="/resume" className="underline underline-offset-2 hover:no-underline" style={{ color: 'inherit', fontStyle: 'italic' }}>more</Link>.
                </p>
                <p className="leading-normal" style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
                  This site is a record of my product design work + a few explorations and side quests. Look around, and feel free to reach out!
                </p>
              </div>

              <PageTransition>{children}</PageTransition>
            </main>

        </ThemeProvider>
      </body>
    </html>
  );
}
