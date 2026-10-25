import { projects } from '@/data/projects';
import { notFound } from 'next/navigation';
import CaseStudyCover from '@/components/CaseStudyCover';
import CaseStudyContent from '@/components/CaseStudyContent';

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
    <div className="px-4 lg:px-8 lg:w-3/4 lg:mx-auto" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <CaseStudyContent>
        {/* Cover */}
        <div><CaseStudyCover project={project} /></div>

        {/* Title + subtitle */}
        <div>
          <h1 className="leading-none mb-2 text-[18px] lg:text-[20px]" style={{ color: 'var(--text)', fontFamily: 'var(--font-dm-sans)', fontWeight: 500, fontStyle: 'normal' }}>
            {project.displayTitle ?? project.title}
            {project.tags.length > 0 && (
              <span style={{ opacity: 0.8, fontWeight: 400, fontStyle: 'italic' }}>{' '}({project.tags.join(', ')})</span>
            )}
          </h1>
          {project.subtitle && (
            <p className="mb-6 lg:mb-8 text-[32px] lg:text-[44px]" style={{ color: 'var(--text-muted)', fontFamily: "'Dreamer TM', serif", fontFeatureSettings: '"ss01"', fontWeight: 900, letterSpacing: '0.045em', lineHeight: 1.1 }}>
              {project.subtitle.split('-').map((part, i, arr) => (
                <span key={i}>{part}{i < arr.length - 1 && <span style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 400, letterSpacing: 0 }}>-</span>}</span>
              ))}
            </p>
          )}
        </div>

        {/* Metadata */}
        <section id="intro" className="scroll-mt-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Role', value: project.role.join('\n') },
              { label: 'Timeline', value: project.duration },
              { label: project.teamLabel ?? 'Team', value: project.team },
              { label: project.toolsLabel ?? 'Tools', value: project.tools.join('\n') },
            ].map(({ label, value }) => (
              <div key={label} style={{ padding: '20px 18px', background: '#F0F0EE' }}>
                <div className="mb-3 text-[15px] sm:text-[16px] lg:text-[18px]" style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>{label}</div>
                <div className="text-[15px] sm:text-[16px] lg:text-[18px]" style={{ color: 'var(--text)', fontFamily: "'Alegreya Sans', sans-serif", lineHeight: 1.5, whiteSpace: 'pre-line' }}>{value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Research */}
        <div>
          <div className="h-px mb-16" style={{ background: 'var(--divider)' }} />
          <section id="research" className="scroll-mt-8 mb-16">
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>Research</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>Research findings and process coming soon.</p>
          </section>
        </div>

        {/* Designs */}
        <div>
          <div className="h-px mb-16" style={{ background: 'var(--divider)' }} />
          <section id="designs" className="scroll-mt-8 mb-16">
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>Designs</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>Final designs coming soon.</p>
          </section>
        </div>

        {/* Reflections */}
        <div>
          <div className="h-px mb-16" style={{ background: 'var(--divider)' }} />
          <section id="reflections" className="scroll-mt-8 mb-16">
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>Reflections</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>Reflections coming soon.</p>
          </section>
        </div>
      </CaseStudyContent>
    </div>
  );
}
