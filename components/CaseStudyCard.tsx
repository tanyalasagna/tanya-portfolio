import Link from 'next/link';
import type { Project } from '@/data/projects';

export default function CaseStudyCard({ project }: { project: Project }) {
  const thumbnail = project.thumbnail ? (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
  ) : (
    <div
      className="w-full h-full flex items-center justify-center font-mono text-xs"
      style={{ color: 'var(--text-muted)' }}
    >
      project thumbnail
    </div>
  );

  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div
        className="overflow-hidden border transition-opacity group-hover:opacity-80"
        style={{ borderColor: 'var(--divider)', background: 'var(--bg-hover)' }}
      >
        {/* Desktop: 60% text | 40% thumbnail */}
        <div className="hidden md:flex">
          <div className="flex flex-col justify-center px-10 py-10" style={{ width: '60%' }}>
            <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
              {project.tags.map((tag) => (
                <span key={tag} className="font-mono" style={{ color: 'var(--accent)', fontSize: '18px' }}>
                  {tag}
                </span>
              ))}
            </div>
            <h2
              className="mb-3 leading-tight"
              style={{ color: 'var(--text)', fontFamily: 'var(--font-dm-sans)', fontWeight: 600, fontSize: '34px' }}
            >
              {project.title}
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--text-muted)', fontSize: '18px' }}>
              {project.description}
            </p>
          </div>
          <div
            className="flex-shrink-0"
            style={{ width: '40%', aspectRatio: '4/3', background: 'var(--divider)' }}
          >
            {thumbnail}
          </div>
        </div>

        {/* Tablet / Mobile: stacked — content 70%, thumbnail strip 30% */}
        <div className="md:hidden flex flex-col" style={{ minHeight: '340px' }}>
          <div className="px-6 py-7" style={{ flex: 7 }}>
            <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
              {project.tags.map((tag) => (
                <span key={tag} className="font-mono" style={{ color: 'var(--accent)', fontSize: '18px' }}>
                  {tag}
                </span>
              ))}
            </div>
            <h2
              className="mb-3 leading-tight"
              style={{ color: 'var(--text)', fontFamily: 'var(--font-dm-sans)', fontWeight: 600, fontSize: '34px' }}
            >
              {project.title}
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--text-muted)', fontSize: '18px' }}>
              {project.description}
            </p>
          </div>
          <div
            className="w-full flex-shrink-0"
            style={{ flex: 3, minHeight: '120px', background: 'var(--divider)' }}
          >
            {thumbnail}
          </div>
        </div>
      </div>
    </Link>
  );
}
