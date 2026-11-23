import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import LazyImg from './LazyImg';
import VideoPlayer from './VideoPlayer';
import LazyVideo from './LazyVideo';
import PixelNumber from './PixelNumber';
import FindingAccordion from './FindingAccordion';
import FlipBook from './FlipBook';
import JourneyCompare from './JourneyCompare';
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
  { id: 'approach', label: 'Approach' },
  { id: 'testing', label: 'Testing' },
  { id: 'guidelines', label: 'Guidelines' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'reflections', label: 'Reflections' },
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

// Light-gray stand-in for a photo that hasn't been added yet; swap it for the real image when it is ready
function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="my-8 flex items-center justify-center" style={{ background: '#F0F0EE', aspectRatio: '16 / 9' }}>
      <span className="text-[14px] sm:text-[15px] lg:text-[16px]" style={{ fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.6 }}>
        {label}
      </span>
    </div>
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
                  <span style={{ fontWeight: 600 }}>Expected final deliverable:</span> Reusable, research-backed UX guidelines for arcade kiosks, intended to inform Frogslayer&rsquo;s future projects.
                </p>
              </div>
              {/* Right-aligned: a two-photo collage from Frogslayer's site with their logo pill overlapping it, credited underneath */}
              <div className="lg:w-[40%] lg:flex-none min-w-0 flex flex-col items-center lg:items-end">
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
                Unlike personal devices, kiosks operate in busy, shared spaces. People navigate them while managing queues, distractions, unfamiliar hardware, and sometimes a group of friends or family.
              </p>
              <p className={pColCls} style={pStyle}>
                The challenge was to understand how these factors shaped the experience and identify opportunities for better design.
              </p>
            </div>
            <div className="mt-8">
              <KioskIssuesDiagram />
              <p className="mt-2 text-[14px] sm:text-[15px] lg:text-[16px]" style={{ fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.6 }}>
                A visual summary I created of kiosk issues discussed during discovery calls.
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
            <div className="lg:w-[52%]">
              <p className={pColCls} style={pStyle}>
                Initial research involved desk research and visits to local arcades to observe how people interacted with existing kiosks.
              </p>
              <p className={pColCls} style={pStyle}>Three issues stood out:</p>
            </div>
            {/* The collage fills exactly the height of the list and closing lines beside it (top edge level with the first bullet,
                bottom edge with the last line) on desktop; below that it flows under the text */}
            <div className="flex flex-col lg:flex-row lg:items-stretch lg:justify-between gap-8 lg:gap-10 lg:pb-[60px]">
              <div className="lg:w-[52%] lg:flex-initial min-w-0">
                <div className={pColCls} style={pStyle}>
                  <ArrowBullet><span style={{ fontWeight: 600 }}>Missed cues:</span> Users focused on on-screen instructions while card reader signals went unnoticed.</ArrowBullet>
                  <ArrowBullet><span style={{ fontWeight: 600 }}>Added urgency:</span> Countdown timers heightened pressure, particularly when queues formed.</ArrowBullet>
                  <ArrowBullet last><span style={{ fontWeight: 600 }}>Interrupted flows:</span> Loyalty pop-ups repeatedly caused confusion and hesitation.</ArrowBullet>
                </div>
                <div className={pColCls} style={{ ...pStyle, marginBottom: 0 }}>
                  <p style={{ margin: 0 }}>These observations shaped three research priorities:</p>
                  {['Interface design', 'Marketing and loyalty integration', 'Behavioral and environmental factors'].map((area, i) => (
                    <div key={area} className="mt-2 flex items-start gap-3">
                      <PixelNumber n={i + 1} />
                      <p style={{ margin: 0 }}>{area}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Two clips from the arcade visits, the second overlapping the first's lower right. On desktop both are sized by the
                  height of the row (84% each): the first is pinned to its top-left (top edge level with the first bullet), the second
                  hangs from 36% down at the right, so it ends a little below the text. The whole collage is lifted 45px (the height of the
                  "Three issues stood out" line plus its gap) so its top edge is level with that line */}
              <div className="lg:w-[40%] lg:flex-none min-w-0 relative">
                <div className="w-[64%] sm:w-[46%] relative mx-auto lg:mx-0 mt-2 lg:mt-0 lg:absolute lg:inset-0 lg:w-auto lg:translate-x-5 lg:-translate-y-[45px]">
                  <LazyVideo src="/images/frogslayer/field-1.mp4" className="block w-[62%] lg:absolute lg:top-0 lg:left-0 lg:h-[84%] lg:w-auto" style={{ aspectRatio: '728 / 974', borderRadius: 10, filter: 'grayscale(1)', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.16)' }} />
                  <LazyVideo src="/images/frogslayer/field-2.mp4" className="block relative w-[66%] ml-[26%] -mt-[38%] lg:absolute lg:ml-0 lg:mt-0 lg:top-[36%] lg:right-0 lg:h-[84%] lg:w-auto" style={{ aspectRatio: '728 / 912', borderRadius: 10, border: '3px solid #F0F0EE', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.16)' }} />
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      </div>

      {/* Approach */}
      <div>
        <SectionGap />
        <Reveal>
          <section id="approach" className="scroll-mt-8 mb-16">
            <h2 className={labelCls} style={labelStyle}>Approach</h2>
            <h3 className={headlineCls} style={headlineStyle}>
              Building prototypes turned design questions into testable hypotheses.
            </h3>
            <div className="lg:w-[58%]">
              <p className={pColCls} style={pStyle}>
                The brief called for research-backed kiosk UX guidelines.
              </p>
              <p className={pColCls} style={pStyle}>
                However, observations alone could only take the research so far. The team and I decided to go beyond the brief and build a functional kiosk experience, allowing for rigorous testing before developing the final recommendations.
              </p>
            </div>

            <div className="my-8">
              <div className="p-4 sm:p-6 lg:p-8" style={{ background: '#F0F0EE' }}>
                <LazyImg src="/images/frogslayer/ideation.webp" alt="Team ideation sketches and early interface explorations" style={{ display: 'block', width: '100%', height: 'auto' }} />
              </div>
              <p className="mt-2 text-[14px] sm:text-[15px] lg:text-[16px]" style={{ fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.6 }}>
                Early ideation sketches exploring kiosk layouts, navigation, and interaction patterns.
              </p>
            </div>

            <div className="lg:w-[58%]">
              <p className={pColCls} style={pStyle}>
                The card purchase flow became our starting point, bringing together card selection, credit loading, loyalty prompts, and payment.
              </p>
              <p className={pColCls} style={pStyle}>
                I led rapid prototyping, turning research insights into interface changes refined through multiple testing rounds.
              </p>
            </div>

            <div className="mt-8 mb-6">
              <div className="flex gap-1.5 sm:gap-2 lg:gap-3" style={{ aspectRatio: '16 / 9' }}>
                <div className="flex-none relative p-3 sm:p-4 lg:p-6" style={{ background: '#F0F0EE' }}>
                  <p className="absolute left-0 top-full w-full mt-2 text-[14px] sm:text-[15px] lg:text-[16px]" style={{ fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.6 }}>
                    Interactive prototype of the card purchase flow.
                  </p>
                  <VideoPlayer src="/images/frogslayer/card-purchase-flow.mp4" aspectRatio="1354 / 1530" />
                </div>
                <div className="flex-none relative p-3 sm:p-4 lg:p-6" style={{ background: '#F0F0EE' }}>
                  <p className="absolute left-0 top-full w-full mt-2 text-[14px] sm:text-[15px] lg:text-[16px]" style={{ fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.6 }}>
                    Exploring purchase flows and UI variations.
                  </p>
                  <LazyImg src="/images/frogslayer/early-exploration.webp" alt="Early explorations" className="" style={{ display: 'block', height: '100%', width: 'auto', aspectRatio: '1230 / 1528' }} />
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      </div>

      {/* Testing */}
      <div>
        <SectionGap />
        <Reveal>
          <section id="testing" className="scroll-mt-8 mb-16">
            <h2 className={labelCls} style={labelStyle}>Testing</h2>
            <h3 className={headlineCls} style={headlineStyle}>
              I led three rounds of usability testing with 20+ participants...
            </h3>
            <div className="flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-10 lg:pb-[110px]">
              <div className="lg:w-[52%] min-w-0 relative">
                <p className={pColCls} style={pStyle}>
                  Testing took place on a full-size kiosk at Purdue&rsquo;s busy student center, simulating distractions found in entertainment venues.
                </p>
                <p className={`${pColCls} pl-4`} style={{ ...pStyle, borderLeft: '2px solid var(--text)' }}>
                  I led think-aloud sessions where participants purchased and loaded game cards, observing friction points and making rapid prototype iterations between rounds.
                </p>
                {/* On desktop this headline sits in the left column, beside the photos, with its bottom edge level with the bottom of the testing photo (46% + 72% = 118% of the row's height) */}
                <h3 className={`${headlineCls} hidden lg:block lg:absolute lg:left-0 lg:w-full lg:mb-0 lg:bottom-[-18%]`} style={headlineStyle}>
                  ...and found that immediate rewards &gt; long<span style={{ fontFamily: 'var(--font-dm-sans)' }}>-</span>term perks.
                </h3>
              </div>
              {/* Two photos from the testing sessions, laid out like the Field Research collage: equal sizes (72% of the row's height each),
                  the kiosk pinned top-left (behind), the testing photo hanging lower right (in front) and overlapping it, both with a light-grey border */}
              <div className="lg:w-[40%] lg:flex-none min-w-0 relative lg:min-h-[440px]">
                <div className="w-[64%] sm:w-[46%] relative mx-auto lg:mx-0 mt-2 lg:mt-0 lg:absolute lg:inset-0 lg:w-auto lg:translate-x-5">
                  <LazyImg src="/images/frogslayer/pmu-kiosk.webp" alt="The oneUP kiosk in Purdue Memorial Union showing its welcome screen, with a handwritten sign offering candy for testing it" className="block w-[62%] lg:absolute lg:top-0 lg:left-0 lg:h-[72%] lg:w-auto" style={{ aspectRatio: '3 / 4', objectFit: 'cover', objectPosition: '50% 62%', borderRadius: 10, border: '3px solid #F0F0EE', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.16)' }} />
                  <LazyImg src="/images/frogslayer/pmu-testing.webp" alt="A participant tapping the kiosk screen during a usability session while a teammate takes notes on a laptop" className="block relative w-[62%] ml-[34%] -mt-[38%] lg:absolute lg:ml-0 lg:mt-0 lg:top-[46%] lg:right-0 lg:h-[72%] lg:w-auto" style={{ aspectRatio: '3 / 4', objectFit: 'cover', borderRadius: 10, border: '3px solid #F0F0EE', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.16)' }} />
                </div>
              </div>
            </div>

            <h3 className={`${headlineCls} lg:hidden mt-12`} style={headlineStyle}>
              ...and found that immediate rewards &gt; long<span style={{ fontFamily: 'var(--font-dm-sans)' }}>-</span>term perks.
            </h3>
            <div className="lg:w-[58%]">
              <p className={pColCls} style={pStyle}>
                Field research had flagged loyalty pop-ups as a recurring issue. The initial prototype offered short-term credits, but Frogslayer suggested exploring long-term rewards too.
              </p>
              <p className={`${pColCls} pl-4`} style={{ ...pStyle, borderLeft: '2px solid var(--text)' }}>
                I helped prototype both models, which were A/B tested in rounds two and three with randomly assigned participants.
              </p>
            </div>

            <div className="my-8 grid grid-cols-2 sm:grid-cols-3 gap-x-1.5 sm:gap-x-2 lg:gap-x-3 gap-y-3">
              {[
                { k: 'A', label: 'Long-term tiers', text: 'Perks unlocked through continued spending.' },
                { k: 'B', label: 'Short-term credits', text: 'Immediate rewards tied to purchases.' },
              ].map(({ k, label, text }) => (
                <div key={k} className={`${pColCls} min-w-0 flex items-start gap-3`} style={{ ...pStyle, marginBottom: 0 }}>
                  <PixelNumber n={k} />
                  <div className="min-w-0">
                    <p style={{ margin: 0, fontWeight: 600 }}>{label}</p>
                    <p className="text-[14px] sm:text-[15px] lg:text-[16px]" style={{ margin: 0, fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.6, lineHeight: 1.5 }}>{text}</p>
                  </div>
                </div>
              ))}
              <div aria-hidden className="hidden sm:block" />
              <figure className="m-0 min-w-0 p-3 sm:p-4 lg:p-6" style={{ background: '#F0F0EE' }}>
                <LazyImg src="/images/frogslayer/loyalty-tiers.webp" alt="Kiosk loyalty prototype showing a Bronze tier screen with unlocked and locked perks" style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 10 }} />
              </figure>
              <figure className="m-0 min-w-0 p-3 sm:p-4 lg:p-6" style={{ background: '#F0F0EE' }}>
                <LazyImg src="/images/frogslayer/loyalty-credits.webp" alt="Kiosk prototype showing member pricing with free bonus credit on each credit amount" style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 10 }} />
              </figure>
              <p className={`${pColCls} col-span-2 sm:col-span-1 sm:col-start-3 sm:row-start-2 sm:self-end mt-4 sm:mt-0 sm:pl-3 lg:pl-5 min-w-0`} style={{ ...pStyle, marginBottom: 0 }}>
                Across both rounds, most participants preferred immediate credits, supporting a recommendation to prioritize instant rewards over long-term tiers and keep loyalty interactions contextual to the purchase flow.
              </p>
            </div>
          </section>
        </Reveal>
      </div>

      {/* Guidelines */}
      <div>
        <SectionGap />
        <Reveal>
          <section id="guidelines" className="scroll-mt-8 mb-16">
            <h2 className={labelCls} style={labelStyle}>Guidelines</h2>
            <h3 className={headlineCls} style={headlineStyle}>
              Research findings became seven reusable design guidelines.
            </h3>
            <div className="lg:w-[58%]">
              <p className={pColCls} style={pStyle}>
                The final two weeks were dedicated to reviewing field observations, usability findings, and prototype iterations.
              </p>
              <p className={pColCls} style={pStyle}>
                Drawing inspiration from Nielsen Norman Group&rsquo;s guideline documents, I organized recurring insights into seven actionable recommendations across three areas:
              </p>
            </div>

            <FindingAccordion numberedPoints
              className="mb-6 lg:w-[58%]"
              items={[
                { title: 'Interface design', body: ['Information hierarchy designed for quick scanning', 'Clear payment demonstrations', 'Visible system status and intuitive navigation'] },
                { title: 'Marketing and loyalty', body: ['Immediate rewards over long-term tiers', 'Context-preserving overlays'] },
                { title: 'Behavioral and environmental factors', body: ['Kiosk placement and visibility', 'Managing social pressure and crowding'] },
              ]}
            />

            <div className="lg:w-[58%]">
              <p className={pColCls} style={pStyle}>
                Together, these guidelines gave Frogslayer a research-backed reference for future arcade kiosk projects:
              </p>
            </div>

            <div className="my-8 p-4 sm:p-6 lg:p-8" style={{ background: '#F0F0EE' }}>
              <FlipBook
                pages={[
                  { src: '/images/frogslayer/guidelines/p1.webp', alt: 'Cover of the Kiosk Design Guidelines, with the abstract summary' },
                  { src: '/images/frogslayer/guidelines/p2.webp', alt: 'Table of contents listing the seven guidelines across three areas' },
                  { src: '/images/frogslayer/guidelines/p3.webp', alt: 'Guideline 1: optimize information hierarchy for scan-ability' },
                  { src: '/images/frogslayer/guidelines/p4.webp', alt: 'Guideline 2: payment demonstration' },
                  { src: '/images/frogslayer/guidelines/p5.webp', alt: 'Guideline 3: system status and navigation' },
                  { src: '/images/frogslayer/guidelines/p6.webp', alt: 'Guideline 4: instant gratification over long-term rewards' },
                  { src: '/images/frogslayer/guidelines/p7.webp', alt: 'Guideline 5: context-preserving pop-ups or overlays' },
                  { src: '/images/frogslayer/guidelines/p8.webp', alt: 'Guideline 6: environmental placement and visibility' },
                  { src: '/images/frogslayer/guidelines/p9.webp', alt: 'Guideline 7: managing social pressure and crowding' },
                  { src: '/images/frogslayer/guidelines/p10.webp', alt: 'Supporting research and sources for each guideline' },
                ]}
              />
            </div>
          </section>
        </Reveal>
      </div>

      {/* Outcome */}
      <div>
        <SectionGap />
        <Reveal>
          <section id="outcome" className="scroll-mt-8 mb-16">
            <h2 className={labelCls} style={labelStyle}>Outcome</h2>
            <h3 className={headlineCls} style={headlineStyle}>
              Frogslayer estimated a 28% reduction in queue times with the final prototype.
            </h3>
            <div className="lg:w-[58%]">
              <p className={pColCls} style={pStyle}>
                The final handoff included seven design guidelines, an interactive Figma prototype, and supporting research artifacts.
              </p>
            </div>

            <div className="mt-16 lg:flex lg:items-start lg:gap-10">
              <h3 className="mb-4 lg:mb-0 lg:w-[300px] lg:flex-none pl-4 text-[19px] sm:text-[20px] lg:text-[22px] font-bold" style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--text)', borderLeft: '2px solid var(--text)' }}>
                Comparing the experience, before and after
              </h3>
              <div className="lg:flex-1 lg:min-w-0">
                <p className={pColCls} style={pStyle}>
                  Journey maps documented the original and redesigned kiosk experiences, illustrating how people moved through each flow and where design changes addressed points of friction.
                </p>
              </div>
            </div>

            <div className="my-8">
              <JourneyCompare />
            </div>

            <div className="mt-16 lg:flex lg:items-start lg:gap-10">
              <h3 className="mb-4 lg:mb-0 lg:w-[300px] lg:flex-none pl-4 text-[19px] sm:text-[20px] lg:text-[22px] font-bold" style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--text)', borderLeft: '2px solid var(--text)' }}>
                The estimated impact
              </h3>
              <div className="lg:flex-1 lg:min-w-0">
                <p className={pColCls} style={pStyle}>
                  Following the stakeholder presentation, Frogslayer&rsquo;s R&amp;D team tested the final prototype against archived flows and estimated a 28% reduction in queue times.
                </p>
                <p className={pColCls} style={pStyle}>
                  Although this was an internal prototype-based estimate rather than a measured result from live deployment, it provided an encouraging indication of the potential operational value of the work.
                </p>
              </div>
            </div>
          </section>
        </Reveal>
      </div>

      {/* Reflections */}
      <div>
        <SectionGap />
        <Reveal>
          <section id="reflections" className="scroll-mt-8 mb-16">
            <h2 className={labelCls} style={labelStyle}>Reflections</h2>
            <h3 className={headlineCls} style={headlineStyle}>
              Some of the best research questions emerged from building.
            </h3>

            {/* Styled like the Sift reflections: expandable blocks (number, bold title, +) beside the team's photo-booth strip, whose bottom edge sits level with the last block */}
            <div className="mt-6 flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-6">
              <div className="lg:w-[46%] min-w-0">
                <FindingAccordion
                  items={[
                    { title: 'Prototypes as research tools', body: 'Building helped point to questions that observations didn\u2019t surface. Working on the loyalty flows, in particular, reinforced the value of testing competing ideas.' },
                    { title: 'What I\u2019d do differently', body: 'The student center provided a busy, distracting testing environment, but it also skewed the participant pool younger. Given another opportunity, I\u2019d recruit older participants directly to better represent the kiosk\u2019s intended audience.' },
                    { title: 'On working with a team', body: 'Leading usability testing taught me when to step in, what to ask, and when to let a session meander. I was fortunate to work with a wonderful team, learning from their perspectives while finding opportunities to offer mentorship myself.' },
                  ]}
                />
              </div>
              <figure className="m-0 w-full sm:w-[85%] lg:w-[calc(54%-1.5rem)] lg:flex-none lg:self-end lg:relative">
                <LazyImg src="/images/frogslayer/team-film-strip.webp" alt="A strip of four photo-booth pictures of the team grinning, huddled together and holding up desserts" style={{ display: 'block', width: '100%', height: 'auto' }} />
                {/* On desktop the caption hangs below the strip, so the strip's own bottom edge stays level with the last block */}
                <figcaption className="mt-2 lg:absolute lg:left-0 lg:top-full lg:w-full text-[14px] sm:text-[15px] lg:text-[16px]" style={{ fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.6 }}>
                  the team @ one of the many arcades we visited :)
                </figcaption>
              </figure>
            </div>
          </section>
        </Reveal>
      </div>
    </>
  );
}
