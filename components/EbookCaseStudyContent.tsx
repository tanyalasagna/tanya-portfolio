import Reveal from './Reveal';
import PixelNumber from './PixelNumber';
import LazyImg from './LazyImg';
import FlipBook from './FlipBook';

const labelCls = 'text-[15px] sm:text-[16px] lg:text-[18px] mb-[2px]';
const labelStyle = { fontFamily: 'var(--font-dm-sans)', fontStyle: 'italic' as const, fontWeight: 400, color: 'var(--text-muted)', opacity: 0.8 };
const headlineCls = 'text-[26px] sm:text-[30px] lg:text-[36px] mb-4';
const headlineStyle = { fontFamily: "'Dreamer TM', serif", fontFeatureSettings: '"ss01"', letterSpacing: '0.045em', lineHeight: 1.15, color: 'var(--text)' };
const pCls = 'text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed mb-4 md:max-w-[85%]'; // body text runs at 85% width from tablet up
const pColCls = 'text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed mb-4'; // paragraphs inside a half-width column
const pStyle = { fontFamily: 'var(--font-dm-sans)', color: 'var(--text)' };

export const ebookNavSections = [
  { id: 'brief', label: 'Brief' },
  { id: 'concept', label: 'Concept' },
  { id: 'work', label: 'Work' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'reflections', label: 'Reflections' },
];

// Invisible stand-in for the divider line, so sections sit 148px apart like the other case studies
function SectionGap() {
  return <div aria-hidden className="h-px mb-[83px]" />;
}

// Grey block waiting for its image, with the caption underneath
function ImageSlot({ caption, aspect = '16 / 9', src, alt = '' }: { caption?: string; aspect?: string; src?: string; alt?: string }) {
  return (
    <div className="my-8">
      {/* A real image sits bare, with no grey block or padding; the empty placeholder keeps its block */}
      <div className={src ? '' : 'p-4 sm:p-6 lg:p-8'} style={src ? undefined : { background: '#F0F0EE' }}>
        {src ? (
          <LazyImg src={src} alt={alt} style={{ width: '100%', height: 'auto' }} />
        ) : (
          <div style={{ aspectRatio: aspect, background: 'var(--bg)', borderRadius: 8 }} />
        )}
      </div>
      {caption && <p className="mt-2 text-[14px] sm:text-[15px] lg:text-[16px]" style={{ margin: '8px 0 0', fontStyle: 'italic', color: 'var(--text-muted)', opacity: 0.6 }}>{caption}</p>}
    </div>
  );
}

export default function EbookCaseStudyContent() {
  return (
    <>
      {/* The Brief and The Concept sit side by side on larger screens */}
      <div>
        <SectionGap />
        <Reveal>
          <section id="brief" className="scroll-mt-8 mb-16">
            <h2 className={labelCls} style={labelStyle}>The Brief</h2>
            <h3 className={headlineCls} style={headlineStyle}>An ideathon needed a story that could live beyond the event.</h3>
            <p className={pCls} style={pStyle}>A hospitality-tech client partnered with a leading US university&rsquo;s hospitality school to host a design ideathon exploring the industry&rsquo;s future.</p>
            <p className={pCls} style={pStyle}>I was responsible for conceptualizing the eBook, shaping its narrative structure, and voice.</p>
          </section>
        </Reveal>

        {/* The eBook cover on the left, the Concept text on the right (bottom-aligned with the last paragraph). On a phone the cover and the text sit side by side under the headline. */}
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-[240px_calc(100%-304px)] md:gap-8 lg:grid-cols-[240px_calc(100%-368px)] lg:gap-16 items-end mb-16">
            {/* Beside the text on larger screens (a phone gets its own copy, under the first sentence, below) */}
            <div className="hidden md:flex justify-start">
              <LazyImg src="/images/ebook/cover.webp" alt="The Return on Imagination eBook cover" className="w-full max-w-[200px] sm:max-w-[240px]" style={{ height: 'auto' }} />
            </div>
            <section id="concept" className="scroll-mt-8">
              <h2 className={labelCls} style={labelStyle}>The Concept</h2>
              <h3 className={headlineCls} style={headlineStyle}>From Return on Investment to Return on Imagination.</h3>
              {/* On a phone the cover and the body text sit side by side (the cover on the left, level with the bottom of the text); from tablet up the cover is in its own column beside the whole section */}
              <div className="grid grid-cols-[38%_minmax(0,1fr)] gap-4 items-end md:block">
                <div className="md:hidden">
                  <LazyImg src="/images/ebook/cover.webp" alt="The Return on Imagination eBook cover" className="w-full" style={{ height: 'auto' }} />
                </div>
                <div>
                  <p className={pColCls} style={pStyle}>I built the eBook around a reinterpretation of ROI: Return on Imagination.</p>
                  <p className={`${pColCls} !mb-0`} style={pStyle}>The idea was to shift the focus from commercial returns to the possibilities that emerge when students are given room to experiment.</p>
                </div>
              </div>
            </section>
          </div>
        </Reveal>
      </div>

      <div>
        <SectionGap />
        <Reveal>
          <section id="work" className="scroll-mt-8 mb-16">
            <h2 className={labelCls} style={labelStyle}>The Work</h2>
            <h3 className={headlineCls} style={headlineStyle}>Finding the story connecting four student innovations.</h3>
            <p className={pCls} style={pStyle}>The eBook brought together four student-led concepts spanning sustainability, metaverse experiences, check-in technology, and AI-powered housekeeping.</p>
            <p className={pCls} style={pStyle}>My challenge was to tell each story in a way that preserved the students&rsquo; original ideas while making them engaging and accessible to a wider hospitality audience.</p>
            <ImageSlot src="/images/ebook/innovations.webp" alt="Spreads from the eBook showing the four student innovations" />
            <p className={pCls} style={pStyle}>Working alongside a graphic designer and editor, I helped shape a visual and editorial direction that balanced the client&rsquo;s futuristic brand language with the imaginative spirit of the ideathon.</p>
          </section>
        </Reveal>
      </div>

      <div>
        <SectionGap />
        <Reveal>
          <section id="outcome" className="scroll-mt-8 mb-16">
            <h2 className={labelCls} style={labelStyle}>The Outcome</h2>
            <h3 className={headlineCls} style={headlineStyle}>An event retrospective became a piece about what hospitality could become.</h3>
            <p className={pCls} style={pStyle}>The final eBook gave the client a way to extend the ideathon&rsquo;s ideas beyond the event, celebrating student innovation while reinforcing its interest in the future of hospitality.</p>
            <div className="my-8 p-4 sm:p-6 lg:p-8" style={{ background: '#F0F0EE' }}>
              <FlipBook
                ratio="1000 / 1293"
                pages={[
                { src: '/images/ebook/pages/p1.webp', alt: 'Cover: Return on Imagination' },
                { src: '/images/ebook/pages/p2.webp', alt: 'Introduction to the design thinking ideathon' },
                { src: '/images/ebook/pages/p3.webp', alt: 'Return on Imagination welcome page' },
                { src: '/images/ebook/pages/p4.webp', alt: 'Idea 1: Recompost, trash to treasure' },
                { src: '/images/ebook/pages/p5.webp', alt: 'Idea 1: Enter Recompost' },
                { src: '/images/ebook/pages/p6.webp', alt: 'Idea 2: Golden Glasses, the meta-hospitality verse' },
                { src: '/images/ebook/pages/p7.webp', alt: 'Idea 2: Steps 3 and 4' },
                { src: '/images/ebook/pages/p8.webp', alt: 'Idea 3: the future of hospitality, check-in innovation' },
                { src: '/images/ebook/pages/p9.webp', alt: 'Idea 3: the check-in service' },
                { src: '/images/ebook/pages/p10.webp', alt: 'Idea 4: Revolutionizing housekeeping with the AI room attendant' },
                { src: '/images/ebook/pages/p11.webp', alt: 'Inside back cover' },
                { src: '/images/ebook/pages/p12.webp', alt: 'Back cover' },
                ]}
              />
            </div>
          </section>
        </Reveal>
      </div>

      <div>
        <SectionGap />
        <Reveal>
          <section id="reflections" className="scroll-mt-8 mb-16">
            <h2 className={labelCls} style={labelStyle}>Reflections</h2>
            <div className="mt-4 md:max-w-[85%]">
              <div className="mb-1 flex items-center gap-3"><PixelNumber n={1} /><h3 className="text-[17px] sm:text-[18px] lg:text-[20px] font-bold" style={{ ...pStyle, margin: 0, lineHeight: 1.25 }}>Knowing when to step back.</h3></div>
              <p className="text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed pl-[39px] mb-8" style={pStyle}>As a writer, it&rsquo;s tempting to put your own spin on everything. But telling the stories behind the students&rsquo; innovations reminded me that good storytelling sometimes means stepping back. My role was to bring their ideas together without losing what made each one unique.</p>
              <div className="mb-1 flex items-center gap-3"><PixelNumber n={2} /><h3 className="text-[17px] sm:text-[18px] lg:text-[20px] font-bold" style={{ ...pStyle, margin: 0, lineHeight: 1.25 }}>Making room for experimentation.</h3></div>
              <p className="text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed pl-[39px]" style={{ ...pStyle, margin: 0 }}>I enjoyed finding room to play within the client&rsquo;s brand guidelines. Of the creative directions presented, the client chose the most experimental one! It reminded me not to hold back an idea just because it feels a little unexpected.</p>
            </div>
          </section>
        </Reveal>
      </div>
    </>
  );
}
