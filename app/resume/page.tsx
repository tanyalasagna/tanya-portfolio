export default function ResumePage() {
  return (
    <div className="px-10 md:px-14 py-10 max-w-2xl">
      {/* Sticky download button */}
      <div
        className="sticky top-0 z-10 pb-6 -mx-10 md:-mx-14 px-10 md:px-14"
        style={{ background: 'var(--bg)' }}
      >
        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-xs tracking-widest transition-opacity hover:opacity-60"
          style={{ border: '1px solid var(--text)', color: 'var(--text)' }}
        >
          DOWNLOAD PORTFOLIO ↓
        </a>
      </div>

      {/* CV content */}
      <div className="space-y-12">
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--text)' }}>
            Tanya Singh
          </h1>
          <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
            Product Designer · Chicago, IL · tanyabsingh25@gmail.com
          </p>
        </div>

        {/* Experience */}
        <div>
          <h2
            className="font-mono text-[10px] tracking-widest mb-5"
            style={{ color: 'var(--accent)' }}
          >
            EXPERIENCE
          </h2>
          <div className="space-y-7">
            {[
              {
                title: 'Product Designer',
                company: 'Daily Journals',
                period: '2024–Present',
                desc: 'Designing end-to-end product experiences rooted in content strategy.',
              },
              {
                title: 'UX Designer',
                company: 'Toss the Coin',
                period: '2023–2024',
                desc: 'Led UX for consumer-facing features across web and mobile.',
              },
              {
                title: 'Design Lead',
                company: 'Purdue UX Studios',
                period: '2022–2023',
                desc: 'Managed a team of 8 designers on client projects across industries.',
              },
            ].map((exp) => (
              <div key={exp.company}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                      {exp.title}
                    </div>
                    <div className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                      {exp.company}
                    </div>
                  </div>
                  <div className="font-mono text-[10px]" style={{ color: 'var(--text-muted)' }}>
                    {exp.period}
                  </div>
                </div>
                <p className="text-sm leading-relaxed mt-1.5" style={{ color: 'var(--text-muted)' }}>
                  {exp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px" style={{ background: 'var(--divider)' }} />

        {/* Education */}
        <div>
          <h2
            className="font-mono text-[10px] tracking-widest mb-5"
            style={{ color: 'var(--accent)' }}
          >
            EDUCATION
          </h2>
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                B.S. Industrial Design
              </div>
              <div className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                Purdue University
              </div>
            </div>
            <div className="font-mono text-[10px]" style={{ color: 'var(--text-muted)' }}>
              2020–2024
            </div>
          </div>
        </div>

        <div className="h-px" style={{ background: 'var(--divider)' }} />

        {/* Skills */}
        <div>
          <h2
            className="font-mono text-[10px] tracking-widest mb-5"
            style={{ color: 'var(--accent)' }}
          >
            SKILLS
          </h2>
          <div className="space-y-2">
            {[
              'Figma · Figma Make · Framer · Webflow',
              'UX Research · Content Strategy · Design Systems',
              'Claude · Cursor · Notebook LM',
            ].map((line) => (
              <div key={line} className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
