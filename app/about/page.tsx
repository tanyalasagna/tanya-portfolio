import { Flower, GraduationCap, House } from 'lucide-react';
import BlurInStagger from '@/components/BlurInStagger';
import PolaroidStack from '@/components/PolaroidStack';
import AboutHoverLine from '@/components/AboutHoverLine';

const headlineCls = 'text-[26px] sm:text-[30px] lg:text-[36px]';
const headlineStyle = { fontFamily: "'Dreamer TM', serif", fontFeatureSettings: '"ss01"', letterSpacing: '0.045em', lineHeight: 1.15, color: 'var(--text)' };
const pCls = 'text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed mb-4 md:max-w-[70%]';
const pStyle = { fontFamily: 'var(--font-dm-sans)', color: 'var(--text)' };

// Small line icons in the site's style, in place of emojis, set in the line of text
const ICON = { size: 17, strokeWidth: 1.5, 'aria-hidden': true, style: { display: 'inline', verticalAlign: 'middle', position: 'relative', top: '-1px', margin: '0 1px' } } as const;

const PHOTOS = [
  { src: '/images/about/about-4.webp', alt: 'A film photo of a beach with colorful buildings on a hill', caption: <>Goa, India <House {...ICON} /></>, number: 3 },
  { src: '/images/about/about-2.webp', alt: 'A hand holding a bouquet of crocheted daisies, tulips, and lavender', caption: <>Forever Flowers <Flower {...ICON} /></>, number: 2 },
  { src: '/images/about/about-1.webp', alt: 'Smiling in a graduation gown with a clock tower and sunset sky behind', caption: <>Hi, it&rsquo;s me! <GraduationCap {...ICON} /></>, number: 1 },
];

export default function AboutPage() {
  return (
    // Centred in the right panel at the case-study width. The band beside the wordmark stays empty: the content starts level with the first line of the bio (88px down).
    <div className="px-4 lg:px-5 xl:px-8 lg:w-[max(75%,min(100%,760px))] lg:mx-auto pb-32 lg:pb-20 pt-6 lg:pt-[88px]">
      <BlurInStagger>
      {/* Three Polaroid-style photos in a loose stack that fans out on hover */}
      <PolaroidStack photos={PHOTOS} />

      {/* Headline: Dreamer TM in ss01, with the m and e of "me" switched to ss02. No hover states. */}
      <h1 className={`${headlineCls} mt-14 md:mt-10 mb-4`} style={{ ...headlineStyle, letterSpacing: '0.07em' }}>
        A little about <span style={{ fontFeatureSettings: '"ss02"' }}>me</span>...
      </h1>

      {/* Body text */}
      <p className={pCls} style={pStyle}>
        Growing up, I was always tinkering with clay, fabric, and scraps. I filled dozens of journals and designed little web blogs along the way.
      </p>
      <p className={pCls} style={pStyle}>
        I went on to study English literature, psychology, and communication before starting my career in content writing. Working alongside designers at a creative agency opened up a whole new area of interest. What began as curiosity gradually became part of my work, too.
      </p>
      <p className={pCls} style={pStyle}>
        I&rsquo;ve never liked being confined to one discipline, and I wanted to explore design beyond what I&rsquo;d learned on the job. That led me to pursue a master&rsquo;s in Human-Computer Interaction at Purdue, where I could dive deeper into design research, methods, and practice.
      </p>
      {/* The last line: two of its phrases are underlined and reveal pictures beside the text on hover */}
      <AboutHoverLine />
      </BlurInStagger>
    </div>
  );
}
