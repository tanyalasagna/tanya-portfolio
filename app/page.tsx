import CaseStudyCard from '@/components/CaseStudyCard';
import { projects } from '@/data/projects';

export default function Home() {
  return (
    <div className="flex flex-col" style={{ gap: '44px', padding: '48px' }}>
      {projects.map((project) => (
        <CaseStudyCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
