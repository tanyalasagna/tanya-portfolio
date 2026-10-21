export default function ColophonPage() {
  const linkStyle: React.CSSProperties = {
    color: 'var(--text-muted)',
    textDecoration: 'underline',
    textDecorationStyle: 'dotted',
    textUnderlineOffset: '3px',
  };

  const items = [
    {
      text: (
        <>
          Type is set in{' '}
          <a href="https://houseoftype.co/products/dreamer" target="_blank" rel="noopener noreferrer" style={linkStyle}>Dreamer TM</a>
          {' '}and{' '}
          <a href="https://fonts.google.com/specimen/Alegreya" target="_blank" rel="noopener noreferrer" style={linkStyle}>Alegreya</a>
        </>
      ),
    },
    {
      text: (
        <>
          Built with{' '}
          <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" style={linkStyle}>Next.js</a>
          {' '}and{' '}
          <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>Tailwind CSS</a>
        </>
      ),
    },
    {
      text: (
        <>
          Animations run on{' '}
          <a href="https://gsap.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>GSAP</a>
          {' '}and{' '}
          <a href="https://motion.dev" target="_blank" rel="noopener noreferrer" style={linkStyle}>Framer Motion</a>
        </>
      ),
    },
    {
      text: (
        <>
          Sounds by{' '}
          <a href="https://cuelume.dev" target="_blank" rel="noopener noreferrer" style={linkStyle}>Cuelume</a>
        </>
      ),
    },
    {
      text: (
        <>
          Hosting and deployment on{' '}
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>Vercel</a>
        </>
      ),
    },
    {
      text: (
        <>
          Coded with{' '}
          <a href="https://claude.ai/code" target="_blank" rel="noopener noreferrer" style={linkStyle}>Claude Code</a>
        </>
      ),
    },
  ];

  return (
    <div className="px-8 md:px-14 py-10 md:py-14 max-w-2xl">
      <h1
        className="leading-tight mb-10"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 700,
          fontSize: '2rem',
          color: 'var(--text)',
        }}
      >
        Colophon
      </h1>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '12px', color: 'var(--text)', fontSize: '17px', fontFamily: 'var(--font-dm-sans)', lineHeight: 1.5 }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text)', flexShrink: 0, marginTop: '9px' }} aria-hidden />
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
