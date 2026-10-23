import type { Metadata } from 'next';
import Link from 'next/link';
import { Alegreya_Sans } from 'next/font/google';
import './globals.css';

const alegreya = Alegreya_Sans({
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
import CuelumeProvider from '@/components/CuelumeProvider';
import MobileBio from '@/components/MobileBio';
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
          <CuelumeProvider />
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
            <MobileBio />
            <PageTransition>{children}</PageTransition>
          </main>

        </ThemeProvider>
      </body>
    </html>
  );
}
