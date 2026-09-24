import CaseStudyCard from '@/components/CaseStudyCard';
import { projects } from '@/data/projects';

export default function Home() {
  return (
    <div className="px-10 md:px-14 py-10">
      {projects.map((project) => (
        <CaseStudyCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
