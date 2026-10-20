import type { Metadata } from 'next';
import Link from 'next/link';
import { Alegreya } from 'next/font/google';
import './globals.css';

const alegreya = Alegreya({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
});
import { ThemeProvider } from '@/components/ThemeProvider';
import LeftPanel from '@/components/LeftPanel';
import MobileNav from '@/components/MobileNav';
import PageTransition from '@/components/PageTransition';
import ThemeTransition from '@/components/ThemeTransition';

export const metadata: Metadata = {
  title: 'Tanya Singh — Product Designer',
  description:
    'Portfolio of Tanya Singh, product designer rooted in content strategy.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={alegreya.variable}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          {/* Canvas background transition — sits at z-index 0, behind all content */}
          <ThemeTransition />

          {/* === Mobile nav (header + overlay menu) === */}
          <MobileNav />

          {/* Left panel — fixed, hidden below lg */}
          <div className="hidden lg:block">
            <LeftPanel />
          </div>

          {/* Right / main content — document scrolls, left panel is fixed */}
          <main
            className="lg:ml-[300px] pt-14 lg:pt-0"
            id="main-scroll"
          >
              {/* Mobile/tablet-only bio — visible below lg */}
              <div className="lg:hidden pt-8 pb-0 px-4">
                <p className="leading-normal mb-3" style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
                  Hi! I&rsquo;m a product designer with a background in content. I&rsquo;ve worked with agency clients at{' '}
                  <a href="https://www.tossthe.co.in/company/about-us/" target="_blank" rel="noopener noreferrer" className="underline decoration-dashed underline-offset-2 hover:no-underline" style={{ color: 'inherit', fontStyle: 'italic' }}>Toss the Coin</a>,{' '}
                  in-house teams at <a href="https://ankogcc.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-dashed underline-offset-2 hover:no-underline" style={{ color: 'inherit', fontStyle: 'italic' }}>Anko</a>, and <Link href="/resume" className="underline decoration-dashed underline-offset-2 hover:no-underline" style={{ color: 'inherit', fontStyle: 'italic' }}>more</Link>.
                </p>
                <p className="leading-normal" style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
                  This site is a record of my product design work + a few explorations.
                </p>
              </div>

              <PageTransition>{children}</PageTransition>
            </main>

        </ThemeProvider>
      </body>
    </html>
  );
}
