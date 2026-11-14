import { ArrowRight, ArrowUpRight } from 'lucide-react';
import FeatureTabs from './FeatureTabs';
import ArtifactGallery from './ArtifactGallery';
import Persona from './Persona';
import FindingAccordion from './FindingAccordion';
import PixelNumber from './PixelNumber';
import ExpandBlock from './ExpandBlock';
import ToolsComparison from './ToolsComparison';
import WorkflowDiagram from './WorkflowDiagram';
import ImpactDiagram from './ImpactDiagram';
import Reveal from './Reveal';
import SlowVideo from './SlowVideo';

const h2Cls ='text-[22px] lg:text-[28px] font-bold mb-4';
const h3Cls = 'text-[18px] lg:text-[22px] font-semibold mb-4 leading-snug';
const pCls = 'text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed mb-4';
const h2Style = { color: 'var(--text)' };
const h3Style = { color: 'var(--text)' };
const pStyle = { color: 'var(--text-muted)' };
const pDark = { fontFamily: 'var(--font-dm-sans)', color: 'var(--text)' };

export const siftNavSections = [
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'process', label: 'Process' },
  { id: 'testing', label: 'Testing' },
  { id: 'design-details', label: 'Building with AI' },
  { id: 'impact', label: 'Potential Impact' },
  { id: 'reflection', label: 'Reflection' },
];

function Video({ src }: { src: string }) {
  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      className="w-full mb-6"
      style={{ display: 'block' }}
    />
  );
}

function Img({ src, alt = '' }: { src: string; alt?: string }) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src={src} alt={alt} className="w-full mb-6" style={{ display: 'block' }} />
  );
}

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

export default function SiftCaseStudyContent() {
  return (
    <>
      {/* Problem */}
      <div>
        <SectionGap />
        <Reveal>
        <section id="problem" className="scroll-mt-8 mb-16">
          <h2
            className="text-[15px] sm:text-[16px] lg:text-[18px] mb-[2px]"
            style={{ fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', fontWeight: 400, color: 'var(--text-muted)', opacity: 0.8 }}
          >
            Problem
          </h2>
          <h3
            className="text-[26px] sm:text-[30px] lg:text-[36px] mb-4"
            style={{ fontFamily: "'Dreamer TM', serif", fontFeatureSettings: '"ss01"', letterSpacing: '0.045em', lineHeight: 1.15, color: 'var(--text)' }}
          >
            We know we buy too much.<br />Yet we keep buying.
          </h3>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-6">
            <div className="lg:w-[52%] lg:flex-initial min-w-0">
              <p
                className="text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed"
                style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--text)' }}
              >
                Every year, the world produces 92 million tonnes of textile waste, and 85% of it ends up in landfills.{' '}
                <a
                  href="https://www.unep.org/en/news-and-stories/press-release/unsustainable-fashion-and-textiles-focus-international-day-zero"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] sm:text-[15px] lg:text-[16px] hover:underline underline-offset-[3px]"
                  style={{ fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.6 }}
                >
                  (UNEP, 2025<ArrowUpRight size={13} strokeWidth={1.75} aria-hidden style={{ display: 'inline', verticalAlign: 'middle', position: 'relative', top: '-1px', marginLeft: '1px' }} />)
                </a>
                <br /><br />Most shoppers already see their own patterns. But, checkout flows are built to remove every second of doubt.
              </p>
            </div>
            <div className="lg:w-fit lg:flex-none min-w-0 flex flex-row lg:flex-col items-end lg:items-stretch gap-4 lg:gap-0">
              {/* Cropped: 1/8 off each side and 1/5 off the bottom, leaving the middle 75% x top 80% (5:3) */}
              <div className="relative w-[55%] sm:w-[45%] lg:w-0 lg:min-w-full flex-none">
                <div style={{ aspectRatio: '5 / 3', overflow: 'hidden' }}>
                  <SlowVideo src="/images/sift/vid-loop.mp4" rate={0.75} style={{ display: 'block', width: '133.333%', maxWidth: 'none', marginLeft: '-16.667%', filter: 'grayscale(0.8)' }} />
                </div>
              </div>
              <p
                className="flex-1 min-w-0 lg:whitespace-nowrap lg:mt-2 text-[14px] sm:text-[15px] lg:text-[16px]"
                style={{ fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.6 }}
              >
                The all-too-familiar loop of buying, trying &amp; discarding.
              </p>
            </div>
          </div>
        </section>
        </Reveal>
      </div>

      {/* Solution */}
      <div>
        <SectionGap />
        <section id="solution" className="scroll-mt-8 mb-16">
          <Reveal>
          <h2
            className="text-[15px] sm:text-[16px] lg:text-[18px] mb-[2px]"
            style={{ fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', fontWeight: 400, color: 'var(--text-muted)', opacity: 0.8 }}
          >
            Solution
          </h2>
          <h3
            className="text-[26px] sm:text-[30px] lg:text-[36px] mb-4"
            style={{ fontFamily: "'Dreamer TM', serif", fontFeatureSettings: '"ss01"', letterSpacing: '0.045em', lineHeight: 1.15, color: 'var(--text)' }}
          >
            A deck of reflection cards<span style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 700, letterSpacing: 0 }}>,</span> right at checkout.
          </h3>
          <p className="text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed mb-4" style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--text)' }}>
            Sift is a Chrome extension that fans out a deck of reflection cards at checkout. It gives shoppers a moment to reconnect with their intentions, without judging what they decide next.
          </p>
          </Reveal>
          <Reveal>
          <div className="mb-[72px] p-5 sm:p-6 lg:p-8" style={{ background: '#F0F0EE' }}>
            <video src="/images/sift/sift-demo-14s.mp4" autoPlay muted loop playsInline className="w-full" style={{ display: 'block', borderRadius: '8px' }} />
          </div>
          </Reveal>

          <Reveal>
          <FeatureTabs items={[
            { label: 'Pick your pillars', lead: 'There\u2019s more than one reason to pause. (Money, Space, Need, etc.)', body: 'Choose which prompts are active, change them mid-session, or skip at any time. Sift puts shoppers in control of their own reflection.', src: 'https://framerusercontent.com/assets/uVch2PINgNRRJrOdtnbdX2Bfjo.mp4' },
            { label: 'Reflect your way', lead: 'And more than one way to think it through.', body: 'Flip through the deck one card at a time, or spread it flat to see every reflection at once.', src: 'https://framerusercontent.com/assets/JqoAgmBYimcINsPYNIYlaMvGCV4.mp4' },
            { label: 'Look back', lead: 'Some thoughts are worth returning to.', body: 'Saved reflections land in a history page, showing which pillars you considered and what you told yourself.', src: 'https://framerusercontent.com/assets/znTwja23tExHZBxyATiqzMZZw.mp4' },
            { label: 'Buy or walk away', lead: 'But the decision is always yours.', body: 'Whether you buy or walk away, Sift leaves that decision to you, without judgment.', src: 'https://framerusercontent.com/assets/tI21140KVmikva8TfieN0kEpo.mp4' },
          ]} />
          </Reveal>
        </section>
      </div>

      {/* Process */}
      <div>
        <SectionGap />
        <Reveal>
        <section id="process" className="scroll-mt-8 mb-16">
          <h2
            className="text-[15px] sm:text-[16px] lg:text-[18px] mb-[2px]"
            style={{ fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', fontWeight: 400, color: 'var(--text-muted)', opacity: 0.8 }}
          >
            Process
          </h2>
          <h3
            className="text-[26px] sm:text-[30px] lg:text-[36px] mb-6"
            style={{ fontFamily: "'Dreamer TM', serif", fontFeatureSettings: '"ss01"', letterSpacing: '0.045em', lineHeight: 1.15, color: 'var(--text)' }}
          >
            What happens between wanting something and buying it?
          </h3>

          <p className={`${pCls} lg:w-[42%]`} style={pDark}>
            I reviewed research on purchase habits and the behavior behind them. Then I ran a netnography: I posted probes on online forums, collected responses, and interviewed a few participants.
          </p>
          <ArtifactGallery images={[
            'https://framerusercontent.com/images/O8oBAC07tPsqjf60p8N9SOqw.png',
            // The long sticky-note strip, cut in half so each half is readable when expanded
            '/images/sift/process-notes-1.png',
            '/images/sift/process-notes-2.png',
          ]} />
          <div className="lg:flex lg:items-start lg:gap-8 mt-[72px] mb-6">
            <p className="mb-4 lg:mb-0 lg:w-[288px] lg:flex-none pl-4 text-[20px] sm:text-[22px] lg:text-[24px] leading-snug font-bold" style={{ ...pDark, borderLeft: '2px solid var(--text)' }}>Four findings shaped how I<br className="hidden lg:block" /> approached Sift:</p>
            <FindingAccordion
              className="lg:flex-1 lg:min-w-0"
              items={[
                { title: 'The cost is space, not just money.', body: 'This informed Sift’s three reflection pillars: money, space, and need, giving shoppers different ways to consider a purchase.' },
                { title: 'The urge to buy is engineered.', body: 'Rather than add another layer of pressure, I made the prompts optional and kept the experience free of scores, warnings, or prescribed outcomes.' },
                { title: 'Regret is part of the loop.', body: 'Sift focuses on reflection before the decision, with an exit that doesn’t judge whether someone buys or walks away.' },
                { title: 'People already pause.', body: 'I placed Sift directly at checkout, turning an existing moment of hesitation into an opportunity to reflect.' },
              ]}
            />
          </div>

          <p className="mb-4 mt-[72px] pl-4 text-[19px] sm:text-[20px] lg:text-[22px] font-bold" style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--text)', borderLeft: '2px solid var(--text)' }}>Who is Sift for?</p>
          <div className="lg:w-[88%] xl:w-[75%] lg:ml-auto">
            <Persona />
          </div>

          {/* Composed like the findings above: the heading block (288px) on the left and the table beside it.
              The takeaway sits in the same left column, bottom-aligned with the table's bottom edge.
              Source order (heading, table, takeaway) is also the phone order. */}
          <div className="mt-[72px] lg:grid lg:grid-cols-[288px_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-8">
            <div className="mb-4 lg:mb-0 pl-4 lg:col-start-1 lg:row-start-1" style={{ borderLeft: '2px solid var(--text)' }}>
              <p className="text-[19px] sm:text-[20px] lg:text-[22px] font-bold" style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--text)' }}>Why current tools aren&rsquo;t enough:</p>
            </div>
            <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:min-w-0">
              <ToolsComparison />
            </div>
            <div className="mt-6 lg:mt-6 lg:col-start-1 lg:row-start-2 lg:self-end text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed" style={pDark}>
              <p style={{ margin: 0, fontWeight: 700 }}>These tools helped me identify two priorities:</p>
              <div className="mt-2 flex items-start gap-3">
                <PixelNumber n={1} />
                <p style={{ margin: 0 }}>Meet shoppers where the decision happens</p>
              </div>
              <div className="mt-2 flex items-start gap-3">
                <PixelNumber n={2} />
                <p style={{ margin: 0 }}>Make reflection something they can return to without dreading it.</p>
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
          <h2
            className="text-[15px] sm:text-[16px] lg:text-[18px] mb-[2px]"
            style={{ fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', fontWeight: 400, color: 'var(--text-muted)', opacity: 0.8 }}
          >
            Testing
          </h2>
          {/* The paragraphs are exactly as wide as the subline above them: they add no width of their own (w-0), so the wrapper is sized by the subline */}
          <div className="w-fit max-w-full">
          <h3
            className="text-[26px] sm:text-[30px] lg:text-[36px] mb-6"
            style={{ fontFamily: "'Dreamer TM', serif", fontFeatureSettings: '"ss01"', letterSpacing: '0.045em', lineHeight: 1.15, color: 'var(--text)' }}
          >
            What would it take to make a pause meaningful?
          </h3>

          <p className={`${pCls} w-0 min-w-full`} style={pDark}>
            I started with a question: what could help someone think through an impulse purchase without telling them what to do?
          </p>
          <p className={`${pCls} w-0 min-w-full`} style={pDark}>
            I turned that into three lenses, <span style={{ fontStyle: 'italic' }}>money &middot; space &middot; need</span>, printed them as card packets, and distributed them to about 70 people to use during their shopping session, in real-time.
          </p>
          </div>
          <Img src="https://framerusercontent.com/images/FFAYYAT4tDW7dR2hFUNvsjA85Uw.png" />

          {/* Two collapsible blocks side by side (stacked on phones), styled like the findings: heading + "+" until opened. items-start so each opens to its own height. */}
          <div className="mt-8 flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:items-start">
            <ExpandBlock title="What I learned">
              <ArrowBullet>22 of approximately 70 people responded. Their feedback formed the basis of my findings.</ArrowBullet>
              <ArrowBullet>About half of the respondents still bought the item. However, all 22 reported making more intentional purchasing decisions during the exercise.</ArrowBullet>
              <ArrowBullet>All 22 said they would reflect more on future purchases after using the cards.</ArrowBullet>
              <p className="text-[14px] sm:text-[15px] lg:text-[16px]" style={{ margin: 0, fontStyle: 'italic' }}>Note: These findings reflect participants&rsquo; self-reported experiences, rather than independently measured changes in purchasing behavior.</p>
            </ExpandBlock>
            <ExpandBlock title="How it shaped Sift">
              <ArrowBullet>The feedback reinforced an important distinction: a successful pause didn&rsquo;t have to end in an abandoned purchase.</ArrowBullet>
              <ArrowBullet>I carried that principle into the extension, keeping both purchasing and walking away equally valid outcomes. Participants&rsquo; responses also helped me refine the wording and tone of the prompts.</ArrowBullet>
              <ArrowBullet last>The physical card metaphor worked well enough to carry into the digital experience, becoming the foundation for Sift&rsquo;s interface and interactions.</ArrowBullet>
            </ExpandBlock>
          </div>

          {/* The deck view and the laid-out view, side by side (frames taken from the "Reflect your way" video) */}
          <p className={`mt-[72px] mb-8 ${pCls} lg:w-[556px] lg:max-w-full`} style={pDark}>
            When I began designing the digital version of Sift, I started with a stacked deck of reflection cards that shoppers could flip through one at a time.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
            {[
              { src: '/images/sift/reflect-deck.png', alt: 'The deck view: cards stacked on top of each other', caption: 'Deck view' },
              { src: '/images/sift/reflect-flat.png', alt: 'The laid-out view: all the cards spread flat in a row', caption: 'Laid-out view' },
            ].map(img => (
              <figure key={img.src} className="m-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.alt} className="w-full" style={{ display: 'block', border: '0.5px solid var(--text)' }} />
                <figcaption className="mt-2 text-[14px] sm:text-[15px] lg:text-[16px]" style={{ fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.6 }}>
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          {/* "What I learned" and "What changed" side by side in gray boxes (same heading style as the expandable blocks above, but always open) */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: 'What I learned', body: 'During testing, feedback on the digital deck revealed a limitation: people couldn\u2019t easily review their reflections across different cards.' },
              { title: 'What changed', body: 'I added a laid-out view that spreads the cards flat, allowing shoppers to see their reflections together without flipping back and forth.' },
            ].map(b => (
              <div key={b.title} className="p-5 sm:p-6" style={{ background: '#F0F0EE', fontFamily: 'var(--font-dm-sans)', color: 'var(--text)' }}>
                <p className="mb-4 text-[16px] sm:text-[17px] lg:text-[18px] font-bold leading-snug" style={{ margin: 0, marginBottom: 16 }}>{b.title}</p>
                <p className="text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed" style={{ margin: 0 }}>{b.body}</p>
              </div>
            ))}
          </div>
        </section>
        </Reveal>
      </div>

      {/* Building with AI */}
      <div>
        <SectionGap />
        <Reveal>
        <section id="design-details" className="scroll-mt-8 mb-16">
          <h2
            className="text-[15px] sm:text-[16px] lg:text-[18px] mb-[2px]"
            style={{ fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', fontWeight: 400, color: 'var(--text-muted)', opacity: 0.8 }}
          >
            Building with AI
          </h2>
          <h3
            className="text-[26px] sm:text-[30px] lg:text-[36px] mb-6"
            style={{ fontFamily: "'Dreamer TM', serif", fontFeatureSettings: '"ss01"', letterSpacing: '0.045em', lineHeight: 1.15, color: 'var(--text)' }}
          >
            Making friction feel like an invitation<span style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 700, letterSpacing: 0 }}>,</span> not an obstacle.
          </h3>

          {/* The first paragraph and the Figma design-system image side by side on desktop (stacked on phones and tablets) */}
          <div className="lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-8 lg:items-start mb-4">
            <p className="text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed mb-4 lg:mb-0" style={pDark}>
              I started in Figma, experimenting with warm colours, soft accents, and card interactions. I also used Claude with Figma MCP during this stage to help develop and refine the designs.
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/sift/figma-design-system.png" alt="The Sift design system in Figma: tooltip, card and modal components, colour swatches and text styles" className="w-full" style={{ display: 'block' }} />
          </div>
          {/* The second paragraph and the workflow diagram side by side on desktop, in the same columns as the row above */}
          <div className="lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-8 lg:items-start mb-6">
            <p className="text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed mb-4 lg:mb-0" style={pDark}>
              From there, I moved to Claude Code to bring Sift into the browser. This became an iterative process of designing, building, reviewing, and refining, with AI assisting throughout.
            </p>
            <WorkflowDiagram />
          </div>

          {/* The third paragraph and the three motion studies side by side on desktop, in the same columns as the rows above.
              Phones and tablets stack everything. */}
          <div className="lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-8 lg:items-start">
            <p className="text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed mb-6 lg:mb-0" style={pDark}>
              Seeing the designs in motion helped me catch awkward transitions, adjust timings, and fine-tune the interactions. AI made these iterations much faster, but deciding what felt right for Sift remained my responsibility.
            </p>
            {/* One gray box: two columns. Left: the first tall video with the wide one under it (same width as the first). Right: the second tall video, in a column 0.954x as wide so it comes out exactly as tall as the first (their heights differ by that ratio). */}
            <div className="p-4 sm:p-5 lg:p-6" style={{ background: '#F0F0EE' }}>
              <div className="grid grid-cols-[1fr_0.954fr] gap-3 items-start">
                <div className="flex flex-col gap-3">
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                  <video src="https://framerusercontent.com/assets/X3Sv70gLQhJMUKTx0eT1vd2d2vw.mp4" autoPlay muted loop playsInline className="w-full" style={{ display: 'block' }} />
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                  <video src="https://framerusercontent.com/assets/kON8tynrgW1RYeXQjVdhFtmYdo.mp4" autoPlay muted loop playsInline className="w-full" style={{ display: 'block' }} />
                </div>
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video src="https://framerusercontent.com/assets/tONZdXFJWttXDsyKuBuCaOSsw.mp4" autoPlay muted loop playsInline className="w-full" style={{ display: 'block' }} />
              </div>
            </div>
          </div>
        </section>
        </Reveal>
      </div>

      {/* Potential Impact */}
      <div>
        <SectionGap />
        <Reveal>
        <section id="impact" className="scroll-mt-8 mb-16">
          <h2
            className="text-[15px] sm:text-[16px] lg:text-[18px] mb-[2px]"
            style={{ fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', fontWeight: 400, color: 'var(--text-muted)', opacity: 0.8 }}
          >
            Potential Impact
          </h2>
          <h3
            className="text-[26px] sm:text-[30px] lg:text-[36px] mb-6"
            style={{ fontFamily: "'Dreamer TM', serif", fontFeatureSettings: '"ss01"', letterSpacing: '0.045em', lineHeight: 1.15, color: 'var(--text)' }}
          >
            What if sifting became part of shopping?
          </h3>

          <ImpactDiagram />

          <p className={`${pCls} lg:w-[58%]`} style={pDark}>
            A pause can become a deliberate choice. Over time, those choices could become a habit, and that habit could mean a wardrobe you actually wear. Across enough people, small changes like these could help chip away at the cycle that fills landfills.
          </p>
        </section>
        </Reveal>
      </div>

      {/* Reflection */}
      <div>
        <SectionGap />
        <Reveal>
        <section id="reflection" className="scroll-mt-8 mb-16">
          <h2
            className="text-[15px] sm:text-[16px] lg:text-[18px] mb-[2px]"
            style={{ fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic', fontWeight: 400, color: 'var(--text-muted)', opacity: 0.8 }}
          >
            Reflection
          </h2>
          <h3
            className="text-[26px] sm:text-[30px] lg:text-[36px] mb-6"
            style={{ fontFamily: "'Dreamer TM', serif", fontFeatureSettings: '"ss01"', letterSpacing: '0.045em', lineHeight: 1.15, color: 'var(--text)' }}
          >
            What speed made possible<span style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 700, letterSpacing: 0 }}>,</span> and what still needed time.
          </h3>

          {/* The four reflections, styled like the findings (number, bold title, +) but across the full width */}
          <FindingAccordion
            items={[
              { title: 'Adding friction with purpose', body: 'Everything I knew about checkout was about removing friction. Sift challenged me to add it deliberately. The hardest part was finding a tone that encouraged reflection without making shoppers feel responsible for systems designed to encourage overconsumption.' },
              { title: 'My first big project with AI', body: 'This was my first time using AI so extensively across design and development. I could build and refine interactions in minutes, but deciding what felt right still rested with me. Sift became a turning point in how I approach design and prototyping.' },
              { title: 'What I\u2019d do differently', body: 'For future projects, I\u2019d give the early creative process more room: sketching on paper, experimenting with visual directions, and developing a distinct brand identity before moving into development. Working at this pace reminded me that some parts of design benefit from slowing down.' },
              { title: 'Where Sift goes next', body: 'First, making Sift a public Chrome extension that works reliably across retailers and keeps reflections private. Eventually, I\u2019d like to rethink the experience for mobile, where the same idea of a pause might need an entirely different form.' },
            ]}
          />
        </section>
        </Reveal>
      </div>
    </>
  );
}
