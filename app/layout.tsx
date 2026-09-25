import type { Metadata } from 'next';
import { Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import LeftPanel from '@/components/LeftPanel';
import MobileNav from '@/components/MobileNav';
import PageTransition from '@/components/PageTransition';

const cormorantSerif = Cormorant_Garamond({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const cormorantLight = Cormorant_Garamond({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: ['300', '400'],
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
      className={`${cormorantSerif.variable} ${cormorantLight.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="h-full antialiased">
        <ThemeProvider>
          {/* === Mobile nav (header + overlay menu) === */}
          <MobileNav />

          {/* === Desktop sidecar layout === */}
          <div className="flex h-full">
            {/* Left panel — hidden on mobile */}
            <div className="hidden md:block">
              <LeftPanel />
            </div>

            {/* Right / main content */}
            <main
              className="flex-1 h-full overflow-y-auto md:ml-[340px] pt-14 md:pt-0"
              id="main-scroll"
            >
              {/* Mobile-only bio — always visible above page content */}
              <div className="md:hidden pt-8 pb-2" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
                <p className="leading-relaxed mb-3" style={{ color: 'var(--text-muted)', fontSize: '18px' }}>
                  Hello! I&rsquo;m a designer, rooted in content strategy. I consider myself a creative
                  generalist, having moved between content and design roles, and translating across
                  disciplines.
                </p>
                <p className="leading-relaxed" style={{ color: 'var(--text-muted)', fontSize: '18px' }}>
                  Currently designing at daily journals, and previously in miscellaneous content and
                  design roles at Toss the Coin, Purdue UX Studios and more.
                </p>
              </div>

              <PageTransition>{children}</PageTransition>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
