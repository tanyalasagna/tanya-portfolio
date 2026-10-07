import CaseStudyCard from '@/components/CaseStudyCard';
import { projects } from '@/data/projects';

export default function Home() {
  return (
    <div className="px-4 pt-8 pb-8 md:px-8 md:pt-0 md:pb-8 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-0">
      {projects.map((project) => (
        <CaseStudyCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
