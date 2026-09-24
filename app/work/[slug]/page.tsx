import { projects } from '@/data/projects';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="px-10 md:px-14 py-10 max-w-4xl">
      {/* Thumbnail */}
      <div
        className="w-full h-64 rounded-lg overflow-hidden mb-10 flex items-center justify-center font-mono text-sm"
        style={{
          background: 'var(--bg-hover)',
          border: '1px solid var(--divider)',
          color: 'var(--text-muted)',
        }}
      >
        {project.thumbnail ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          'project thumbnail'
        )}
      </div>

      {/* Title */}
      <h1 className="text-5xl font-bold mb-10 leading-tight" style={{ color: 'var(--text)' }}>
        {project.title}
      </h1>

      {/* Metadata grid */}
      <div className="grid grid-cols-2 gap-x-12 gap-y-6 mb-14">
        <div>
          <div className="font-mono text-[10px] tracking-widest mb-1.5" style={{ color: 'var(--accent)' }}>
            Role
          </div>
          <div className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
            {project.role.join('\n')}
          </div>
        </div>
        <div>
          <div className="font-mono text-[10px] tracking-widest mb-1.5" style={{ color: 'var(--accent)' }}>
            Tools
          </div>
          <div className="text-sm leading-relaxed font-mono" style={{ color: 'var(--text)' }}>
            {project.tools.join(' \\ ')}
          </div>
        </div>
        <div>
          <div className="font-mono text-[10px] tracking-widest mb-1.5" style={{ color: 'var(--accent)' }}>
            Duration
          </div>
          <div className="text-sm" style={{ color: 'var(--text)' }}>
            {project.duration}
          </div>
        </div>
        <div>
          <div className="font-mono text-[10px] tracking-widest mb-1.5" style={{ color: 'var(--accent)' }}>
            Impact
          </div>
          <ul className="text-sm leading-relaxed space-y-1" style={{ color: 'var(--text)' }}>
            {project.impact.map((item, i) => (
              <li key={i}>— {item}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-mono text-[10px] tracking-widest mb-1.5" style={{ color: 'var(--accent)' }}>
            Team
          </div>
          <div className="text-sm" style={{ color: 'var(--text)' }}>
            {project.team}
          </div>
        </div>
      </div>

      {/* Case study body sections */}
      <section id="problem" className="mb-16 scroll-mt-6">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>Problem</h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {project.description}
        </p>
      </section>

      <div className="h-px mb-16" style={{ background: 'var(--divider)' }} />

      <section id="research" className="mb-16 scroll-mt-6">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>Research</h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Research findings and process coming soon.
        </p>
      </section>

      <div className="h-px mb-16" style={{ background: 'var(--divider)' }} />

      <section id="solution" className="mb-20 scroll-mt-6">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>Solution</h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Final designs and outcomes coming soon.
        </p>
      </section>
    </div>
  );
}
