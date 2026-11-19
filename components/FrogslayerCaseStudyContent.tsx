import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import LazyImg from './LazyImg';
import KioskIssuesDiagram from './KioskIssuesDiagram';

const labelCls = 'text-[15px] sm:text-[16px] lg:text-[18px] mb-[2px]';
const labelStyle = { fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic' as const, fontWeight: 400, color: 'var(--text-muted)', opacity: 0.8 };
const headlineCls = 'text-[26px] sm:text-[30px] lg:text-[36px] mb-4';
const headlineStyle = { fontFamily: "'Dreamer TM', serif", fontFeatureSettings: '"ss01"', letterSpacing: '0.045em', lineHeight: 1.15, color: 'var(--text)' };
const pColCls = 'text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed mb-4'; // body text inside a column, which sets its own width
const pStyle = { fontFamily: 'var(--font-dm-sans)', color: 'var(--text)' };

export const frogslayerNavSections = [
  { id: 'context', label: 'Context' },
  { id: 'problem', label: 'Problem' },
  { id: 'field-research', label: 'Field Research' },
];

// A paragraph with an arrow bullet that hangs in the margin, so wrapped lines line up under the first word
function ArrowBullet({ children, last = false }: { children: React.ReactNode; last?: boolean }) {
  return (
    <p className="flex items-start gap-3" style={{ margin: last ? 0 : '0 0 16px' }}>
      <ArrowRight size={18} strokeWidth={1.5} aria-hidden className="flex-none" style={{ marginTop: '0.32em' }} />
      <span>{children}</span>
    </p>
  );
}

// Invisible stand-in for the old divider line. With the section's own 64px bottom margin it gives 148px between sections.
function SectionGap() {
  return <div aria-hidden className="h-px mb-[83px]" />;
}

// Credit under a photo: just a link reading "Source", with the arrow-then-underline behaviour
function ImageSource() {
  return (
    <p className="mt-2 text-[14px] sm:text-[15px] lg:text-[16px] lg:text-right" style={{ fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.6 }}>
      <a
        href="https://frogslayer.com/case-studies/ma-untangle-24m/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline underline-offset-[3px]"
      >
        Source<ArrowUpRight size={13} strokeWidth={1.75} aria-hidden style={{ display: 'inline', verticalAlign: 'middle', position: 'relative', top: '-1px', marginLeft: '1px' }} />
      </a>
    </p>
  );
}

export default function FrogslayerCaseStudyContent() {
  return (
    <>
      {/* Context */}
      <div>
        <SectionGap />
        <Reveal>
          <section id="context" className="scroll-mt-8 mb-16">
            <h2 className={labelCls} style={labelStyle}>Context</h2>
            <h3 className={headlineCls} style={headlineStyle}>
              Kiosks promise convenience.<br />But the experience doesn&rsquo;t always deliver.
            </h3>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-10">
              <div className="lg:w-[52%] lg:flex-initial min-w-0">
                <p className={pColCls} style={pStyle}>
                  <a
                    href="https://frogslayer.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline underline-offset-[3px]"
                  >
                    Frogslayer<ArrowUpRight size={15} strokeWidth={1.75} aria-hidden style={{ display: 'inline', verticalAlign: 'middle', position: 'relative', top: '-1px', marginLeft: '1px' }} />
                  </a>{' '}
                  builds custom kiosk software for food and entertainment venues, including large arcade chains.
                </p>
                <p className={`${pColCls} pl-4`} style={{ ...pStyle, borderLeft: '2px solid var(--text)' }}>
                  Frogslayer&rsquo;s research found that <span style={{ fontWeight: 600 }}>66% of users in their client base preferred self-service.</span> Yet their team was also hearing about difficulties from patrons who had chosen kiosks over staff-assisted service.
                </p>
                <p className={pColCls} style={pStyle}>
                  Our team of six was brought in to investigate what makes a good kiosk experience and develop reusable UX guidelines grounded in research.
                </p>
              </div>
              {/* Right-aligned: a two-photo collage from Frogslayer's site with their logo pill overlapping it, credited underneath */}
              <div className="lg:w-[40%] lg:flex-none min-w-0 flex flex-col items-start lg:items-end">
                {/* Collage: the kiosks photo at the top left, the second photo overlapping its lower right; rounded corners and a soft shadow */}
                <div className="w-[64%] sm:w-[46%] lg:w-full relative mt-9 lg:mt-24 lg:translate-x-5">
                  {/* Logo on a rounded light-grey pill, sitting just above the top right corner of the first photo, overlapping it slightly */}
                  <div className="absolute z-10" style={{ right: 'calc(18% - 40px)', top: -34 }}>
                    <div className="px-3 py-1.5 lg:px-4 lg:py-2" style={{ borderRadius: 999, background: '#F0F0EE', transform: 'rotate(2deg)' }}>
                      <LazyImg src="/images/frogslayer/logo.png" alt="Frogslayer" className="w-[68px] sm:w-[84px] lg:w-[120px]" style={{ height: 'auto' }} />
                    </div>
                  </div>
                  <LazyImg src="/images/frogslayer/problem.webp" alt="Two people at curved touchscreen kiosks in a dim arcade restaurant, one tapping the screen" style={{ width: '82%', height: 'auto', borderRadius: 10, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.16)' }} />
                  <LazyImg src="/images/frogslayer/context.webp" alt="A smiling young woman using a kiosk in a brightly lit arcade, in a halftone-textured photo" style={{ width: '68%', height: 'auto', marginLeft: 'auto', marginTop: '-17%', position: 'relative', borderRadius: 10, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.16)' }} />
                </div>
                <ImageSource />
              </div>
            </div>
          </section>
        </Reveal>
      </div>

      {/* Problem */}
      <div>
        <SectionGap />
        <Reveal>
          <section id="problem" className="scroll-mt-8 mb-16">
            <h2 className={labelCls} style={labelStyle}>Problem</h2>
            <h3 className={headlineCls} style={headlineStyle}>
              There&rsquo;s more to a good kiosk experience than what&rsquo;s on the screen.
            </h3>
            <div className="lg:w-[58%]">
              <p className={pColCls} style={pStyle}>
                Unlike personal devices, kiosks are used in busy, shared spaces. People navigate them while managing queues, distractions, unfamiliar hardware, and sometimes a group of friends or family.
              </p>
              <p className={pColCls} style={pStyle}>
                We wanted to understand how these factors shaped the experience, and what designers could do about them.
              </p>
            </div>
            <div className="mt-8">
              <KioskIssuesDiagram />
              <p className="mt-2 text-[14px] sm:text-[15px] lg:text-[16px]" style={{ fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.6 }}>
                A visual summary I created of kiosk issues discussed during our discovery calls.
              </p>
            </div>
          </section>
        </Reveal>
      </div>

      {/* Field Research */}
      <div>
        <SectionGap />
        <Reveal>
          <section id="field-research" className="scroll-mt-8 mb-16">
            <h2 className={labelCls} style={labelStyle}>Field Research</h2>
            <h3 className={headlineCls} style={headlineStyle}>
              We observed three recurring moments of hesitation.
            </h3>
            <div className="lg:w-[58%]">
              <p className={pColCls} style={pStyle}>
                We began with desk research and visits to local arcades, observing how people interacted with existing kiosks.
              </p>
            </div>

            {/* Placeholder until the arcade field-visit photographs are added (slide 26) */}
            <div className="my-8 flex items-center justify-center" style={{ background: '#F0F0EE', aspectRatio: '16 / 9' }}>
              <span className="text-[14px] sm:text-[15px] lg:text-[16px]" style={{ fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.6 }}>
                Photographs from arcade field visits
              </span>
            </div>

            <div className="lg:w-[58%]">
              <p className={pColCls} style={pStyle}>Across our visits, we noticed:</p>
              <div className={pColCls} style={pStyle}>
                <ArrowBullet><span style={{ fontWeight: 600 }}>Missed cues:</span> People concentrated on on-screen instructions while the card reader flashed unnoticed below.</ArrowBullet>
                <ArrowBullet><span style={{ fontWeight: 600 }}>Unnecessary pressure:</span> Countdown timers appeared to create anxiety, especially in crowded settings.</ArrowBullet>
                <ArrowBullet last><span style={{ fontWeight: 600 }}>Interrupted flows:</span> Loyalty pop-ups repeatedly caused confusion and hesitation.</ArrowBullet>
              </div>
              <p className={pColCls} style={pStyle}>
                These observations helped us narrow our research into three areas: interface design, marketing and loyalty integration, and behavioral and environmental factors.
              </p>
            </div>
          </section>
        </Reveal>
      </div>
    </>
  );
}
