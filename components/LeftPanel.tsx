'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import LiveClock from './LiveClock';
import CaseStudyNav from './CaseStudyNav';
import ContactLinks from './ContactLinks';
import HookSidebar from './HookSidebar';
import { useState } from 'react';

export default function LeftPanel() {
  const pathname = usePathname();
  const [nameHovered, setNameHovered] = useState(false);
  const isCaseStudy = pathname.startsWith('/work/');

  return (
    <aside
      className="fixed left-0 top-0 h-full w-[280px] flex flex-col border-r z-50"
      style={{ padding: '32px', borderColor: 'var(--divider)', background: 'var(--bg)', containerType: 'inline-size' }}
    >
      {/* Name */}
      <Link href="/">
        <h1
          className="leading-none"
          style={{ color: 'var(--text)', fontFamily: "'Dreamer TM', serif", fontFeatureSettings: nameHovered ? '"ss02"' : '"ss01"', fontSize: '48px', marginBottom: '16px', letterSpacing: nameHovered ? '0.025em' : '0.045em' }}
          onMouseEnter={() => setNameHovered(true)}
          onMouseLeave={() => setNameHovered(false)}
        >
          Tanya Singh
        </h1>
      </Link>

      {/* Bio */}
      <p className="leading-normal mb-3" style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
        Hi! I&rsquo;m a product designer who started out in content strategy, and I&rsquo;ve since worked across content and design at{' '}
        <a href="https://polytechnic.purdue.edu/academics/ux-design" target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-2" style={{ color: 'inherit', fontStyle: 'italic' }}>Purdue UX Studios</a>,{' '}
        <a href="https://www.tossthe.co.in/company/about-us/" target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-2" style={{ color: 'inherit', fontStyle: 'italic' }}>Toss the Coin</a>, and{' '}
        <Link href="/resume" className="hover:underline underline-offset-2" style={{ color: 'inherit', fontStyle: 'italic' }}>more</Link>.
      </p>
      <p className="leading-normal" style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '24px' }}>
        This site is a record of my work, across domains like retail and hospitality tech + a few things I make in my own time :)
      </p>

      {/* Contact */}
      <div className="flex gap-5" style={{ marginBottom: '32px' }}>
        <ContactLinks />
      </div>

      <div className="h-px" style={{ background: 'var(--divider)', marginBottom: '32px' }} />

      {/* Main nav */}
      <div style={{ marginBottom: '32px' }}>
        <HookSidebar />
      </div>

      <div className="h-px" style={{ background: 'var(--divider)', marginBottom: '32px' }} />

      {/* Case study sub-nav */}
      <AnimatePresence>
        {isCaseStudy && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="h-px my-5" style={{ background: 'var(--divider)' }} />
            <CaseStudyNav />
            <div className="h-px mt-5" style={{ background: 'var(--divider)' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Clock */}
      <LiveClock />
    </aside>
  );
}
