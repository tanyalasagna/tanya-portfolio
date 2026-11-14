import { ArrowUpRight } from 'lucide-react';
import FeatureTabs from './FeatureTabs';
import ArtifactGallery from './ArtifactGallery';
import Persona from './Persona';
import FindingAccordion from './FindingAccordion';
import ToolsComparison from './ToolsComparison';
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
  { id: 'design-details', label: 'Design Details' },
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

function Finding({ finding, impact }: { finding: string[]; impact: string[] }) {
  return (
    <div className="mb-4" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div>
        <div className={`${pCls} mb-1`} style={{ ...pStyle, fontStyle: 'italic', fontWeight: 600, marginBottom: '4px' }}>FINDING</div>
        {finding.map((line, i) => (
          <p key={i} className={pCls} style={{ ...pStyle, marginBottom: '2px' }}>→ {line}</p>
        ))}
      </div>
      <div>
        <div className={`${pCls} mb-1`} style={{ ...pStyle, fontStyle: 'italic', fontWeight: 600, marginBottom: '4px' }}>IMPACT</div>
        {impact.map((line, i) => (
          <p key={i} className={pCls} style={{ ...pStyle, marginBottom: '2px' }}>→ {line}</p>
        ))}
      </div>
    </div>
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

          <p className={`${pCls} lg:w-[288px]`} style={pDark}>
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
              <p style={{ margin: '0 0 4px' }}><span style={{ fontWeight: 700 }}>1)</span> Meet shoppers where the decision happens</p>
              <p style={{ margin: 0 }}><span style={{ fontWeight: 700 }}>2)</span> Make reflection something they can return to without dreading it.</p>
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
          <h2 className={h2Cls} style={h2Style}>Testing</h2>
          <h3 className={h3Cls} style={h3Style}>Would a pause actually change anything?</h3>

          <p className="mb-2" style={{ color: 'var(--text)', fontWeight: 600, fontSize: '17px' }}>1. Going analog: a card kit in real shopping sessions</p>
          <p className={pCls} style={pStyle}>
            I started from one question: what would a good friend say to someone about to impulse buy? A friend who cares enough to ask, but never guilts you about the answer.
          </p>
          <p className={pCls} style={pStyle}>
            I turned that into three lenses, <span style={{ fontStyle: 'italic' }}>money &middot; space &middot; need</span>, printed them as card packets, and gave them to about 70 people to use whenever they shopped. I wanted real stakes in real shopping sessions, not a simulation.
          </p>
          <Img src="https://framerusercontent.com/images/FFAYYAT4tDW7dR2hFUNvsjA85Uw.png" />
          <Finding
            finding={['22 people wrote back.', 'About 45% still bought the item, but every one of them paused, and all said they’d cherish it more because of that.']}
            impact={['The responses sharpened the copy and tuned the tone.', 'The card metaphor and visuals moved straight from the physical kit into the extension.']}
          />

          <p className="mb-2 mt-[72px]" style={{ color: 'var(--text)', fontWeight: 600, fontSize: '17px' }}>2. Reflections were hard to see all at once</p>
          <Finding
            finding={['In the deck view, people couldn’t see all their notes together.']}
            impact={['I added a laid-out view that spreads the deck flat, so every reflection is visible in one place.']}
          />
        </section>
        </Reveal>
      </div>

      {/* Design Details */}
      <div>
        <SectionGap />
        <Reveal>
        <section id="design-details" className="scroll-mt-8 mb-16">
          <h2 className={h2Cls} style={h2Style}>Design Details</h2>
          <h3 className={h3Cls} style={h3Style}>Making a pause feel calm and grounded</h3>
          <p className={pCls} style={pStyle}>
            I designed everything in Figma first. I kept it simple, with warm colours and soft accents.
          </p>
          <Img src="https://framerusercontent.com/images/umwedXpF8GhKsMPhI46mciBl03E.png" />
          <p className={pCls} style={pStyle}>
            Then I moved to Claude Code to prototype the designs end to end.
          </p>
          <Video src="https://framerusercontent.com/assets/X3Sv70gLQhJMUKTx0eT1vd2d2vw.mp4" />
          <Video src="https://framerusercontent.com/assets/tONZdXFJWttXDsyKuBuCaOSsw.mp4" />
          <Video src="https://framerusercontent.com/assets/kON8tynrgW1RYeXQjVdhFtmYdo.mp4" />
        </section>
        </Reveal>
      </div>

      {/* Potential Impact */}
      <div>
        <SectionGap />
        <Reveal>
        <section id="impact" className="scroll-mt-8 mb-16">
          <h2 className={h2Cls} style={h2Style}>Potential Impact</h2>
          <h3 className={h3Cls} style={h3Style}>What one pause can add up to</h3>
          <Img src="https://framerusercontent.com/images/PLpMMm7YSH3ppRd5reAuPi0k.png" />
          <p className={pCls} style={pStyle}>
            A pause becomes a deliberate choice. Choices become a habit. The habit becomes a wardrobe you actually wear. Across enough people, that chips away at the cycle that fills landfills.
          </p>
        </section>
        </Reveal>
      </div>

      {/* Reflection */}
      <div>
        <SectionGap />
        <Reveal>
        <section id="reflection" className="scroll-mt-8 mb-16">
          <h2 className={h2Cls} style={h2Style}>Reflection</h2>

          <p className="mb-2" style={{ color: 'var(--text)', fontWeight: 600, fontSize: '17px' }}>1. Adding friction, kindly</p>
          <p className={pCls} style={pStyle}>
            Everything I knew about checkout flows was about removing friction. This project asked me to add it meaningfully. Getting the tone right was the hardest part. It felt like a real service to people who already see their patterns and just need help moving past them. It&rsquo;s a small push back against a very large machine, but small push backs add up at scale.
          </p>

          <p className="mb-2 mt-[72px]" style={{ color: 'var(--text)', fontWeight: 600, fontSize: '17px' }}>2. Building with AI moved my job toward judgment</p>
          <p className={pCls} style={pStyle}>
            With Claude Code and Figma MCP, I could fix a motion that felt too abrupt in minutes. Deciding what felt calm, and what felt like Sift, stayed with me. I want to keep exploring creative prototyping with tools like these.
          </p>
        </section>
        </Reveal>
      </div>

      {/* What's Next */}
      <div>
        <SectionGap />
        <Reveal>
        <section id="whats-next" className="scroll-mt-8 mb-16">
          <h2 className={h2Cls} style={h2Style}>What&rsquo;s Next</h2>
          <h3 className={h3Cls} style={h3Style}>From prototype to production</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li className={pCls} style={{ ...pStyle, display: 'flex', gap: '10px', marginBottom: 0 }}>
              <span aria-hidden>&bull;</span>
              <span>The concept is tested and the prototype works end to end. Next is shipping Sift as a public extension. I&rsquo;m not a coder, so I&rsquo;m working through how to run it cleanly on real retailer sites and how to keep people&rsquo;s reflections safe.</span>
            </li>
            <li className={pCls} style={{ ...pStyle, display: 'flex', gap: '10px', marginBottom: 0 }}>
              <span aria-hidden>&bull;</span>
              <span>Further out, I want to bring Sift to mobile, where targeted ads do their real work. Apps can&rsquo;t overlay each other the way an extension sits on a webpage, so I&rsquo;ll keep the heart of Sift and rethink the form.</span>
            </li>
          </ul>
        </section>
        </Reveal>
      </div>
    </>
  );
}
