export default function AboutPage() {
  return (
    <div className="px-10 md:px-14 py-10 max-w-4xl">
      {/* Headline */}
      <h1
        className="font-mono text-4xl md:text-5xl leading-tight mb-12"
        style={{ color: 'var(--accent)' }}
      >
        Hi! Here&rsquo;s a little more<br />about me :)
      </h1>

      {/* Photo + description */}
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Photo placeholder */}
        <div
          className="w-56 h-72 flex-shrink-0 rounded flex items-center justify-center font-mono text-xs"
          style={{
            border: '1px solid var(--divider)',
            background: 'var(--bg-hover)',
            color: 'var(--text-muted)',
          }}
        >
          my photo
        </div>

        {/* Description */}
        <div className="flex-1 space-y-4">
          <p className="text-sm leading-relaxed font-mono" style={{ color: 'var(--accent)' }}>
            description — this is a description of who I am and what I do, wooho
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Hello! I&rsquo;m a designer, rooted in content strategy. I consider myself a creative
            generalist, having moved between content and design roles, and translating across
            disciplines.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Currently designing at daily journals, and previously in miscellaneous content and design
            roles at Toss the Coin, Purdue UX Studios and more.
          </p>
        </div>
      </div>
    </div>
  );
}
