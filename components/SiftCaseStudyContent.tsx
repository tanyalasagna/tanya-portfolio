const h2Cls = 'text-[22px] lg:text-[28px] font-bold mb-4';
const h3Cls = 'text-[18px] lg:text-[22px] font-semibold mb-4 leading-snug';
const pCls = 'text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed mb-4';
const h2Style = { color: 'var(--text)' };
const h3Style = { color: 'var(--text)' };
const pStyle = { color: 'var(--text-muted)' };

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

function Divider() {
  return <div className="h-px mb-16" style={{ background: 'var(--divider)' }} />;
}

export default function SiftCaseStudyContent() {
  return (
    <>
      {/* Hero video */}
      <div className="mb-16">
        <Video src="https://framerusercontent.com/assets/myRy2uVlBrOcEPAgy5NpPZPKoo.mp4" />
      </div>

      {/* Problem */}
      <div>
        <Divider />
        <section id="problem" className="scroll-mt-8 mb-16">
          <h2 className={h2Cls} style={h2Style}>Problem</h2>
          <h3 className={h3Cls} style={h3Style}>We know we buy too much. We buy it anyway.</h3>
          <p className={pCls} style={pStyle}>
            I stared at a closet full of clothes I no longer liked. I upcycled what I could, donated the rest, and felt immense relief.
          </p>
          <p className={pCls} style={pStyle}>
            That closet is a small piece of a big problem. Every year, the world produces 92 million tonnes of textile waste, and 85% of it ends up in landfills.
          </p>
          <p className={pCls} style={pStyle}>
            The irony? Most shoppers already see their own patterns. They aren&rsquo;t unaware, they&rsquo;re outwilled. Checkout flows are built to remove every second of doubt, and in that moment, the urge wins over the regret.
          </p>
        </section>
      </div>

      {/* Solution */}
      <div>
        <Divider />
        <section id="solution" className="scroll-mt-8 mb-16">
          <h2 className={h2Cls} style={h2Style}>Solution</h2>
          <h3 className={h3Cls} style={h3Style}>A deck of reflection cards, right before you buy.</h3>
          <p className={pCls} style={pStyle}>
            Sift is a Chrome extension that steps in at the checkout button and fans out a deck of playing-card prompts. It&rsquo;s a short, warm pause that never makes you feel guilty.
          </p>
          <Video src="https://framerusercontent.com/assets/RoWLHNbYZ6v3omvqgrQs45ht4.mp4" />

          {[
            { label: 'Pick your pillars', sub: 'Your pause, your rules', body: 'Choose which prompts are active, change them mid-session, or skip at any time. Sift hands agency back to the shopper instead of taking it away.', src: 'https://framerusercontent.com/assets/uVch2PINgNRRJrOdtnbdX2Bfjo.mp4' },
            { label: 'Reflect your way', sub: 'As much or as little as you want', body: 'Flip through the deck one card at a time, or spread it flat to see every reflection at once.', src: 'https://framerusercontent.com/assets/JqoAgmBYimcINsPYNIYlaMvGCV4.mp4' },
            { label: 'Look back', sub: 'Your reflections don’t disappear', body: 'Saved reflections land in a history page, showing which pillars you weighed and what you told yourself.', src: 'https://framerusercontent.com/assets/znTwja23tExHZBxyATiqzMZZw.mp4' },
            { label: 'Leave kindly', sub: 'Every exit assumes the best of you', body: 'Whether you buy or walk away, Sift trusts that you mean to cherish what you choose.', src: 'https://framerusercontent.com/assets/tI21140KVmikva8TfieN0kEpo.mp4' },
          ].map((f) => (
            <div key={f.label} className="mb-8">
              <p className="mb-1" style={{ color: 'var(--text)', fontWeight: 600, fontSize: '16px' }}>{f.label}</p>
              <p className="mb-3" style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '15px' }}>{f.sub}</p>
              <p className={pCls} style={pStyle}>{f.body}</p>
              <Video src={f.src} />
            </div>
          ))}
        </section>
      </div>

      {/* Process */}
      <div>
        <Divider />
        <section id="process" className="scroll-mt-8 mb-16">
          <h2 className={h2Cls} style={h2Style}>Process</h2>
          <h3 className={h3Cls} style={h3Style}>Understanding why we keep buying things we don&rsquo;t need&hellip;</h3>

          <p className="mb-2" style={{ color: 'var(--text)', fontWeight: 600, fontSize: '17px' }}>1. What drives impulse buying?</p>
          <p className={pCls} style={pStyle}>
            I reviewed research on purchase habits and the behavior behind them. Then I ran a netnography: I posted probes on online forums, collected responses, and interviewed a few participants.
          </p>
          <Video src="https://framerusercontent.com/assets/GKLkSSLKV7QUSYl0k7NQMfzLA5Q.mp4" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <Img src="https://framerusercontent.com/images/ltj7JiZ6kJ6ckBUvuSNGx7ufkpE.png" />
            <Img src="https://framerusercontent.com/images/mzJanlr2F1fk0jMm7cFrdsaYE.png" />
            <Img src="https://framerusercontent.com/images/O8oBAC07tPsqjf60p8N9SOqw.png" />
          </div>
          {[
            ['The cost is space, not just money.', 'Closets overflow, and half of what’s in them goes unworn.'],
            ['It’s designed, not a personal flaw.', 'Shoppers are up against very good design.'],
            ['Regret is part of the loop.', 'Feeling bad afterward doesn’t break the cycle; it’s one of its steps.'],
            ['People already pause.', 'Online shoppers hesitate before buying. That moment just has nothing in it.'],
          ].map(([bold, rest], i) => (
            <p key={i} className={pCls} style={pStyle}><span style={{ color: 'var(--text)', fontWeight: 600 }}>{bold}</span> {rest}</p>
          ))}

          <p className="mb-2 mt-8" style={{ color: 'var(--text)', fontWeight: 600, fontSize: '17px' }}>2. Who is Sift for?</p>
          <Img src="https://framerusercontent.com/images/lNYfUPIjTn1RfS4JthqRr97dE38.png" />

          <p className="mb-2 mt-8" style={{ color: 'var(--text)', fontWeight: 600, fontSize: '17px' }}>3. Why current tools aren&rsquo;t enough</p>
          <p className={pCls} style={pStyle}>Two tools had taken on the same problem, and each solved part of it.</p>
          <Img src="https://framerusercontent.com/images/nnSvvLtgnequ6dBc0csZL7Xc1o.png" />
          <p className={pCls} style={pStyle}>
            <span style={{ color: 'var(--text)', fontWeight: 600 }}>The Impulse Judge</span> makes you type out a roast before checkout. When I tested it with past interviewees, the humor wore thin fast. It felt like a novelty, not a habit.
          </p>
          <p className={pCls} style={pStyle}>
            <span style={{ color: 'var(--text)', fontWeight: 600 }}>Think Twice, Buy Once</span> is a mobile app that asks you to wait and tracks the money you save. With no pop-up in context, you have to enter every item by hand.
          </p>
          <p className={pCls} style={pStyle}>
            Neither one owned the moment (checkout, in context) or the feeling (warm, non-judgmental, designed with care). That gap became Sift.
          </p>
        </section>
      </div>

      {/* Testing */}
      <div>
        <Divider />
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

          <p className="mb-2 mt-8" style={{ color: 'var(--text)', fontWeight: 600, fontSize: '17px' }}>2. Reflections were hard to see all at once</p>
          <Finding
            finding={['In the deck view, people couldn’t see all their notes together.']}
            impact={['I added a laid-out view that spreads the deck flat, so every reflection is visible in one place.']}
          />
        </section>
      </div>

      {/* Design Details */}
      <div>
        <Divider />
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
      </div>

      {/* Potential Impact */}
      <div>
        <Divider />
        <section id="impact" className="scroll-mt-8 mb-16">
          <h2 className={h2Cls} style={h2Style}>Potential Impact</h2>
          <h3 className={h3Cls} style={h3Style}>What one pause can add up to</h3>
          <Img src="https://framerusercontent.com/images/PLpMMm7YSH3ppRd5reAuPi0k.png" />
          <p className={pCls} style={pStyle}>
            A pause becomes a deliberate choice. Choices become a habit. The habit becomes a wardrobe you actually wear. Across enough people, that chips away at the cycle that fills landfills.
          </p>
        </section>
      </div>

      {/* Reflection */}
      <div>
        <Divider />
        <section id="reflection" className="scroll-mt-8 mb-16">
          <h2 className={h2Cls} style={h2Style}>Reflection</h2>

          <p className="mb-2" style={{ color: 'var(--text)', fontWeight: 600, fontSize: '17px' }}>1. Adding friction, kindly</p>
          <p className={pCls} style={pStyle}>
            Everything I knew about checkout flows was about removing friction. This project asked me to add it meaningfully. Getting the tone right was the hardest part. It felt like a real service to people who already see their patterns and just need help moving past them. It&rsquo;s a small push back against a very large machine, but small push backs add up at scale.
          </p>

          <p className="mb-2 mt-8" style={{ color: 'var(--text)', fontWeight: 600, fontSize: '17px' }}>2. Building with AI moved my job toward judgment</p>
          <p className={pCls} style={pStyle}>
            With Claude Code and Figma MCP, I could fix a motion that felt too abrupt in minutes. Deciding what felt calm, and what felt like Sift, stayed with me. I want to keep exploring creative prototyping with tools like these.
          </p>
        </section>
      </div>

      {/* What's Next */}
      <div>
        <Divider />
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
      </div>
    </>
  );
}
