import type { Metadata } from 'next';
import { DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import LeftPanel from '@/components/LeftPanel';
import PageTransition from '@/components/PageTransition';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
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
      className={`${dmSans.variable} ${dmMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="h-full antialiased">
        <ThemeProvider>
          {/* === Mobile header === */}
          <div
            className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b"
            style={{ background: 'var(--bg)', borderColor: 'var(--divider)' }}
          >
            <span className="font-bold text-base" style={{ color: 'var(--text)' }}>
              Tanya Singh
            </span>
            <nav className="flex gap-5">
              {[
                { label: 'WORK', href: '/' },
                { label: 'ABOUT', href: '/about' },
                { label: 'RESUME', href: '/resume' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="font-mono text-[10px] tracking-widest transition-opacity hover:opacity-60"
                  style={{ color: 'var(--text)' }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* === Desktop sidecar layout === */}
          <div className="flex h-full">
            {/* Left panel — hidden on mobile */}
            <div className="hidden md:block">
              <LeftPanel />
            </div>

            {/* Right / main content */}
            <main
              className="flex-1 h-full overflow-y-auto md:ml-[280px] pt-[60px] md:pt-0"
              id="main-scroll"
            >
              <PageTransition>{children}</PageTransition>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
