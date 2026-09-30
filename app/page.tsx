import CaseStudyCard from '@/components/CaseStudyCard';
import { projects } from '@/data/projects';

export default function Home() {
  return (
    <div className="px-6 md:px-12 pt-8 md:pt-12" style={{ paddingBottom: '60vh' }}>
      <div className="flex flex-col gap-11">
        {projects.map((project) => (
          <CaseStudyCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
