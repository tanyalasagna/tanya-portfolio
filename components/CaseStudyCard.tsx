import Link from 'next/link';
import type { Project } from '@/data/projects';

export default function CaseStudyCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div
        className="flex gap-8 py-10 border-b"
        style={{ borderColor: 'var(--divider)' }}
      >
        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] tracking-wide"
                style={{ color: 'var(--accent)' }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h2
            className="text-4xl font-bold mb-3 transition-opacity group-hover:opacity-60 leading-tight"
            style={{ color: 'var(--text)' }}
          >
            {project.title}
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {project.description}
          </p>
        </div>

        {/* Thumbnail */}
        <div
          className="w-52 h-36 flex-shrink-0 rounded overflow-hidden relative flex items-center justify-center font-mono text-xs transition-opacity group-hover:opacity-80"
          style={{
            border: '1px solid var(--divider)',
            background: 'var(--bg-hover)',
            color: 'var(--text-muted)',
          }}
        >
          {project.thumbnail ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>project thumbnail</span>
          )}
        </div>
      </div>
    </Link>
  );
}
