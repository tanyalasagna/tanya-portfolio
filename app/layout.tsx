import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

import { ThemeProvider } from '@/components/ThemeProvider';
import LeftPanel from '@/components/LeftPanel';
import MobileNav from '@/components/MobileNav';
import PageTransition from '@/components/PageTransition';
import ThemeTransition from '@/components/ThemeTransition';
import CuelumeProvider from '@/components/CuelumeProvider';
import MobileBio from '@/components/MobileBio';
import CaseStudyFooter from '@/components/CaseStudyFooter';
import CoverTransitionOverlay from '@/components/CoverTransition';

const TITLE = 'Tanya Singh, Product designer';

// The same title in the browser tab and in the preview card when the link is shared. The preview image is a screenshot of the landing page
// (app/opengraph-image.jpg and app/twitter-image.jpg, 1200x630); replace both files to update it.
export const metadata: Metadata = {
  title: TITLE,
  // No description on purpose: apps that show a link card would print it under the title
  openGraph: { type: 'website', title: TITLE },
  twitter: { card: 'summary_large_image', title: TITLE },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <CuelumeProvider />
          {/* Canvas background transition — sits at z-index 0, behind all content */}
          <ThemeTransition />

          {/* === Mobile nav (header + overlay menu) === */}
          <MobileNav />

          {/* Mobile/tablet fixed footer on case study pages — outside PageTransition so its transform can't move it */}
          <CaseStudyFooter />

          {/* The clicked thumbnail, carried across to the case study cover */}
          <CoverTransitionOverlay />

          {/* Left panel — fixed, hidden below lg */}
          <div className="hidden lg:block">
            <LeftPanel />
          </div>

          {/* Right / main content — document scrolls, left panel is fixed */}
          <main
            className="lg:ml-[316px] pt-14 lg:pt-0"
            id="main-scroll"
          >
              {/* Mobile/tablet-only bio — only on home page */}
              <MobileBio />

              <PageTransition>{children}</PageTransition>
            </main>

        </ThemeProvider>
      </body>
    </html>
  );
}
