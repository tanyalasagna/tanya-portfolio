import Reveal from './Reveal';
import PixelNumber from './PixelNumber';
import VideoPlayer from './VideoPlayer';
import LazyImg from './LazyImg';
import ClickToExpand from './ClickToExpand';
import JourneyCompare from './JourneyCompare';

const labelCls = 'text-[15px] sm:text-[16px] lg:text-[18px] mb-[2px]';
const labelStyle = { fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic' as const, fontWeight: 400, color: 'var(--text-muted)', opacity: 0.8 };
const headlineCls = 'text-[26px] sm:text-[30px] lg:text-[36px] mb-4';
const headlineStyle = { fontFamily: "'Dreamer TM', serif", fontFeatureSettings: '"ss01"', letterSpacing: '0.045em', lineHeight: 1.15, color: 'var(--text)' };
const pColCls = 'text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed mb-4';
const pStyle = { fontFamily: 'var(--font-dm-sans)', color: 'var(--text)' };
const SCREEN_RADIUS = 8; // the slight rounding on every screen recording and screenshot

export const loopyloopNavSections = [
  { id: 'features', label: 'Features' },
  { id: 'context', label: 'Context' },
  { id: 'research', label: 'Research' },
  { id: 'workshop', label: 'Workshop' },
  { id: 'iterations', label: 'Iterations' },
  { id: 'reflections', label: 'Reflections' },
];

// The platforms crafters use today, redrawn in the site's style: round logos beside a plain label saying what each is used for
const PLATFORM_ROWS: { logos: { src: string; name: string }[]; label: string }[] = [
  { logos: [{ src: 'ribblr', name: 'Ribblr' }, { src: 'youtube', name: 'YouTube' }], label: 'Patterns, tutorials & general guidance' },
  { logos: [{ src: 'joann', name: 'Joann' }, { src: 'michaels', name: 'Michaels' }], label: 'Materials, pre-mades' },
  { logos: [{ src: 'etsy', name: 'Etsy' }], label: 'Pre-mades, patterns' },
];

function PlatformLandscape({ caption }: { caption: string }) {
  return (
    <div className="w-full max-w-[420px] lg:relative">
      <div className="p-4 sm:p-5" style={{ background: '#F0F0EE' }}>
        <div className="flex flex-col gap-4">
          {PLATFORM_ROWS.map(row => (
            <div key={row.label} className="flex items-center gap-3">
              {/* Two logo slots in every row, so the labels line up; a short line stands in for a missing second logo */}
              <div className="flex items-center gap-2 flex-none">
                {[0, 1].map(i => {
                  const logo = row.logos[i];
                  return logo ? (
                    <LazyImg key={logo.src} src={`/images/loopyloop/logo-${logo.src}.webp`} alt={logo.name} className="w-[44px] h-[44px]" style={{ display: 'block', borderRadius: '50%' }} />
                  ) : (
                    <div key={i} aria-hidden className="w-[44px] flex items-center justify-center">
                      <div style={{ width: '45%', height: 1.5, background: 'var(--text)', opacity: 0.5 }} />
                    </div>
                  );
                })}
              </div>
              <p className="text-[15px] sm:text-[16px]" style={{ margin: 0, fontFamily: 'var(--font-dm-sans)', color: 'var(--text)', lineHeight: 1.25 }}>{row.label}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="lg:absolute lg:left-0 lg:top-full lg:w-full text-[14px] sm:text-[15px] lg:text-[16px]" style={{ margin: '8px 0 0', fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.6 }}>{caption}</p>
    </div>
  );
}

// A looping 16:9 demo video inside a light-gray block with even padding all round, with play / pause, a scrubber and a timer under it, and its caption underneath. It only plays while it is on screen.
function DemoVideo({ src, label }: { src: string; label: string }) {
  return (
    <div className="my-8">
      <div className="p-4 sm:p-6 lg:p-8" style={{ background: '#F0F0EE' }}>
        <VideoPlayer src={src} aspectRatio="16 / 9" fill radius={SCREEN_RADIUS} />
      </div>
      <p className="mt-2 text-[14px] sm:text-[15px] lg:text-[16px]" style={{ margin: '8px 0 0', fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.6 }}>{label}</p>
    </div>
  );
}

// Invisible stand-in for the old divider line. With the section's own 64px bottom margin it gives 148px between sections.
function SectionGap() {
  return <div aria-hidden className="h-px mb-[83px]" />;
}

// A pixel number badge (the same as the 1, 2, 3 bullets elsewhere) beside the feature's name in bold dark type
function FeatureHeading({ number, name }: { number: number; name: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <PixelNumber n={number} />
      <p className="text-[19px] sm:text-[20px] lg:text-[22px]" style={{ margin: 0, fontFamily: 'var(--font-dm-sans)', fontWeight: 700, fontStyle: 'normal', color: 'var(--text)' }}>{name}</p>
    </div>
  );
}

// An iteration's bold 22px title; the whole item (title and text) sits in one indented block with a thin dark line down its left side
function IterationTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[19px] sm:text-[20px] lg:text-[22px] font-bold" style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--text)', margin: '0 0 12px', lineHeight: 1.25 }}>
      {children}
    </h3>
  );
}

export default function LoopyloopCaseStudyContent() {
  return (
    <>
      {/* Features */}
      <div>
        <SectionGap />
        <Reveal>
          <section id="features" className="scroll-mt-8 mb-16">
            <h2 className={labelCls} style={labelStyle}>Features</h2>
            <h3 className={headlineCls} style={headlineStyle}>
              Two tools designed to make crafting a little easier.
            </h3>

            <div className="mt-10">
              <FeatureHeading number={1} name="Material Identifier" />
              <div className="md:w-[85%]">
                <p className={pColCls} style={pStyle}>
                  Finding an exciting project is easy. Knowing exactly what to buy to make it? Not so much.
                </p>
                <p className={pColCls} style={pStyle}>
                  The Material Identifier lets crafters upload an inspiration image, specify their project details, and generate a materials list with direct purchase links.
                </p>
                <p className={pColCls} style={pStyle}>
                  Available both within LoopyLoop and as a browser extension, it connects inspiration to the first steps of making.
                </p>
              </div>
              <DemoVideo src="/images/loopyloop/mi.mp4" label="Material Identifier flow: upload inspiration → enter specifications → generate materials list" />
            </div>

            <div className="mt-16">
              <FeatureHeading number={2} name="Pattern Writing Tool" />
              <div className="md:w-[85%]">
                <p className={pColCls} style={pStyle}>
                  Writing crochet and knitting patterns involves repetitive terminology and specialized stitch instructions.
                </p>
                <p className={pColCls} style={pStyle}>
                  The Pattern Writing Tool simplifies this with a slash-command menu, allowing makers to insert stitch terms and instructions in a single click.
                </p>
              </div>
              <DemoVideo src="/images/loopyloop/pw.mp4" label="Pattern Writing Tool demonstrating slash commands and pattern editing" />
            </div>
          </section>
        </Reveal>
      </div>

      {/* Context */}
      <div>
        <SectionGap />
        <Reveal>
          <section id="context" className="scroll-mt-8 mb-16">
            <h2 className={labelCls} style={labelStyle}>Context</h2>
            <h3 className={headlineCls} style={headlineStyle}>
              I watched friends give up on crafting before they even started.
            </h3>
            {/* The platform comparison sits beside the text, its bottom edge level with the last line of the last paragraph */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-start gap-8 lg:gap-12">
              <div className="lg:w-[52%] min-w-0">
                <p className={pColCls} style={pStyle}>
                  As an avid crocheter, I&rsquo;d seen friends struggle to turn inspiration into actual projects. Finding ideas was easy; sourcing materials, learning techniques, and navigating multiple platforms wasn&rsquo;t.
                </p>
                <p className={`${pColCls} pl-4`} style={{ ...pStyle, borderLeft: '2px solid var(--text)' }}>
                  Pinterest offered inspiration, retailers sold supplies, and Etsy connected buyers and sellers. But the journey from inspiration to making remains fragmented.
                </p>
                <p className={pColCls} style={{ ...pStyle, marginBottom: 0 }}>
                  This inspired me to pitch LoopyLoop to my classmates.
                </p>
              </div>
              <div className="lg:w-[40%] lg:flex-none min-w-0">
                <PlatformLandscape caption="Existing platform landscape" />
              </div>
            </div>
          </section>
        </Reveal>
      </div>

      <div>
        <SectionGap />
        <Reveal>
          <section id="research" className="scroll-mt-8 mb-16">
            <h2 className={labelCls} style={labelStyle}>Research</h2>
            <h3 className={headlineCls} style={headlineStyle}>
              Craft<span style={{ fontFamily: 'var(--font-dm-sans)' }}>-</span>store visits revealed the gap between inspiration and materials.
            </h3>
            {/* The paragraphs beside a photo from the visits (softly rounded, with a soft shadow), its bottom edge level with the last line */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-start gap-8 lg:gap-12">
              <div className="lg:w-[52%] min-w-0">
                <p className={pColCls} style={pStyle}>
                  The team visited JOANN and Michaels to observe shoppers and interview employees about how people sourced materials.
                </p>
                <p className={pColCls} style={pStyle}>
                  Shoppers relied on reference photos to find supplies, often turning to employees who couldn&rsquo;t always identify or locate what they needed.
                </p>
                <p className={pColCls} style={{ ...pStyle, marginBottom: 0 }}>
                  <span style={{ fontWeight: 700 }}>These findings reinforced the need to bridge inspiration and material sourcing.</span> But what about the rest of the crafting journey?
                </p>
              </div>
              <div className="w-full max-w-[200px] sm:max-w-[320px] lg:w-[30%] lg:max-w-none lg:flex-none min-w-0 lg:relative">
                <LazyImg src="/images/loopyloop/joann.webp" alt="The team smiling for a group selfie in the aisles of a JOANN craft store" style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 10, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.16)' }} />
                <p className="lg:absolute lg:left-0 lg:top-full lg:w-full text-[14px] sm:text-[15px] lg:text-[16px]" style={{ margin: '8px 0 0', fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.6 }}>A visit to Joann Fabrics</p>
              </div>
            </div>
          </section>
        </Reveal>
      </div>
      {/* Participatory Workshop */}
      <div>
        <SectionGap />
        <Reveal>
          <section id="workshop" className="scroll-mt-8 mb-16">
            <h2 className={labelCls} style={labelStyle}>Participatory Workshop</h2>
            <h3 className={headlineCls} style={headlineStyle}>
              Two approaches to making the same sweater revealed different needs.
            </h3>
            <div className="lg:w-[58%]">
              <p className={pColCls} style={pStyle}>
                To explore what happened beyond purchasing supplies, the team ran a participatory workshop with a simple prompt:
              </p>
              <p className={`${pColCls} pl-4`} style={{ ...pStyle, borderLeft: '2px solid var(--text)' }}>
                Here&rsquo;s a sweater. Show us how you&rsquo;d make it.
              </p>
            </div>

            <div className="my-8">
              <div className="p-4 sm:p-6 lg:p-8" style={{ background: '#F0F0EE' }}>
                <ClickToExpand label="Expand the participant's flowchart" hint="(Click to expand)" expandedSize={100}>
                  <LazyImg src="/images/loopyloop/participatory.webp" alt="A participant's flowchart answering How would I make this sweater?, from identifying stitches and choosing yarn through to making the sweater and adjusting it" style={{ display: 'block', width: '100%', height: 'auto' }} />
                </ClickToExpand>
              </div>
              <p className="text-[14px] sm:text-[15px] lg:text-[16px]" style={{ margin: '8px 0 0', fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.6 }}>A participant&rsquo;s process for recreating the sweater, mapped during the workshop.</p>
            </div>

            <div className="lg:w-[58%]">
              <p className={pColCls} style={pStyle}>Two responses stood out:</p>
            </div>

            {/* The two responses, side by side in grey blocks that are always open: bold title, then what it showed */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch">
              {[
                {
                  title: 'Getting started',
                  text: 'One participant struggled at the first step, describing how specific her material searches needed to be.',
                  bold: 'This reinforced the need for the Material Identifier.',
                },
                {
                  title: 'Documenting the process',
                  text: 'Another mapped the entire making process but lacked an easy way to document and eventually sell her work.',
                  bold: 'This informed the Pattern Writing Tool.',
                },
              ].map(r => (
                <div key={r.title} className="p-5 sm:p-6" style={{ background: '#F0F0EE' }}>
                  <p className="text-[15px] sm:text-[16px] lg:text-[18px]" style={{ margin: 0, fontFamily: 'var(--font-dm-sans)', fontWeight: 700, color: 'var(--text)' }}>{r.title}</p>
                  <p className="text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed" style={{ margin: '12px 0 0', fontFamily: 'var(--font-dm-sans)', color: 'var(--text)' }}>
                    {r.text} <span style={{ fontWeight: 600 }}>{r.bold}</span>
                  </p>
                </div>
              ))}
            </div>

            <div className="lg:w-[58%] mt-8">
              <p className={pColCls} style={pStyle}>
                The workshop helped identify where both features could fit into a larger crafting experience.
              </p>
            </div>
          </section>
        </Reveal>
      </div>

      {/* Iterations */}
      <div>
        <SectionGap />
        <Reveal>
          <section id="iterations" className="scroll-mt-8 mb-16">
            <h2 className={labelCls} style={labelStyle}>Iterations</h2>
            <h3 className={headlineCls} style={headlineStyle}>
              Think<span style={{ fontFamily: 'var(--font-dm-sans)' }}>-</span>aloud testing revealed what both tools were missing.
            </h3>
            <div className="md:w-[85%]">
              <p className={pColCls} style={pStyle}>
                Several rounds of usability testing helped refine the features shown earlier.
              </p>
            </div>

            <div className="mt-10">
              <div className="md:w-[85%] pl-4" style={{ borderLeft: '2px solid var(--text)' }}>
                <IterationTitle>Nowhere to save the results</IterationTitle>
                <p className={pColCls} style={pStyle}>
                  Testers liked the Material Identifier but had no way to keep the lists it generated.
                </p>
                <p className={pColCls} style={pStyle}>
                  <span style={{ fontWeight: 700 }}>What changed:</span> A Download CSV option was added, allowing users to save their materials lists.
                </p>
              </div>
              {/* Before / after slider, the same as the journey maps on the Frogslayer page: the handle picks which screen to see. */}
              <div className="my-8">
                <JourneyCompare
                  padded
                  radius={SCREEN_RADIUS}
                  noun="screen"
                  width={1000}
                  height={650}
                  before={<LazyImg src="/images/loopyloop/mi-before.webp" alt="The Material Identifier extension before the change: a selected image, size and craft type, and a Run AIdentifier button" className="" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />}
                  after={<LazyImg src="/images/loopyloop/mi-after.webp" alt="The Material Identifier extension after the change: a list of materials with links, and a Download CSV File button" className="" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />}
                />
              </div>
            </div>

            <div className="mt-16">
              <div className="md:w-[85%] pl-4" style={{ borderLeft: '2px solid var(--text)' }}>
                <IterationTitle>The blank-page problem</IterationTitle>
                <p className={pColCls} style={pStyle}>
                  The Pattern Writing Tool initially left testers unsure where to begin or how to use its shortcuts.
                </p>
                <p className={pColCls} style={pStyle}>
                  <span style={{ fontWeight: 700 }}>What changed:</span> A Help toggle and clearer onboarding made the editor easier to navigate.
                </p>
              </div>
              {/* Before / after slider, the same as the Material Identifier one above */}
              <div className="my-8">
                <JourneyCompare
                  padded
                  radius={SCREEN_RADIUS}
                  noun="screen"
                  width={1000}
                  height={569}
                  before={<LazyImg src="/images/loopyloop/pw-before.webp" alt="The Pattern Writing Tool before the change: an empty editor under a short line of instructions" className="" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />}
                  after={<LazyImg src="/images/loopyloop/pw-after.webp" alt="The Pattern Writing Tool after the change: a help pop-up over the editor explaining how to start with the slash key, with a Get Started button" className="" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />}
                />
              </div>
            </div>
          </section>
        </Reveal>
      </div>

      {/* Reflections, styled like the Sift and Frogslayer ones: expandable blocks (number, bold title, +) */}
      <div>
        <SectionGap />
        <Reveal>
          <section id="reflections" className="scroll-mt-8 mb-16">
            <h2 className={labelCls} style={labelStyle}>Reflections</h2>
            <div className="mt-4 md:max-w-[85%]">
              <div className="mb-1 flex items-center gap-3"><PixelNumber n={1} /><h3 className="text-[17px] sm:text-[18px] lg:text-[20px] font-bold" style={{ ...pStyle, margin: 0, lineHeight: 1.25 }}>On designing from personal experience</h3></div>
              <p className="text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed pl-[39px] mb-8" style={pStyle}>Being a crocheter helped me articulate the problem, but it also came with assumptions. Research and participatory workshops helped validate the frustrations I&rsquo;d observed and learn about experiences beyond my own.</p>
              <div className="mb-1 flex items-center gap-3"><PixelNumber n={2} /><h3 className="text-[17px] sm:text-[18px] lg:text-[20px] font-bold" style={{ ...pStyle, margin: 0, lineHeight: 1.25 }}>On balancing utility and delight</h3></div>
              <p className="text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed pl-[39px] mb-8" style={pStyle}>It&rsquo;s tempting to keep adding tools and automating every step. But the messy parts of making are often part of the joy; it&rsquo;s the logistics that get in the way. LoopyLoop taught me to focus on easing those frustrations without taking away from the craft itself. I&rsquo;d love to keep working on projects that explore this balance.</p>
              <div className="mb-1 flex items-center gap-3"><PixelNumber n={3} /><h3 className="text-[17px] sm:text-[18px] lg:text-[20px] font-bold" style={{ ...pStyle, margin: 0, lineHeight: 1.25 }}>If I revisited LoopyLoop today...</h3></div>
              <p className="text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed pl-[39px]" style={{ ...pStyle, margin: 0 }}>I&rsquo;d consider modernizing an existing platform like Ravelry instead of building from scratch. Its patterns, data, and established community offer a valuable foundation worth preserving.</p>
            </div>
          </section>
        </Reveal>
      </div>
    </>
  );
}
