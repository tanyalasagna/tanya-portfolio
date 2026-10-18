import CaseStudyCard from '@/components/CaseStudyCard';
import { projects } from '@/data/projects';

export default function Home() {
  const leftCol = projects.filter((_, i) => i % 2 === 0);
  const rightCol = projects.filter((_, i) => i % 2 === 1);

  return (
    <>
      {/* Mobile / tablet: single column */}
      <div className="lg:hidden px-4 pt-8 pb-8 md:px-8 md:pt-0 md:pb-8">
        {projects.map((project) => (
          <CaseStudyCard key={project.slug} project={project} />
        ))}
      </div>
      {/* Desktop: two independent columns — no row-height coupling */}
      <div className="hidden lg:flex px-8 pb-8 gap-x-8 items-start">
        <div className="flex-1 flex flex-col">
          {leftCol.map((project) => (
            <CaseStudyCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="flex-1 flex flex-col">
          {rightCol.map((project) => (
            <CaseStudyCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </>
  );
}
