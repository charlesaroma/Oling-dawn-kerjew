import { ArrowRight } from 'lucide-react';
import Container from '../../../components/common/Container';
import SectionHeading from '../../../components/common/SectionHeading';
import Button from '../../../components/common/Button';
import ProjectCard from '../../../components/cards/ProjectCard';
import { useProjects } from '../../../services/projectQueries';
import { getFeaturedProjects } from '../../../services/projectsService';

export default function FeaturedProjects() {
  const { data: allProjects } = useProjects();
  const projects = getFeaturedProjects(allProjects, 3);

  return (
    <section className="bg-surface-alt py-20">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Our Work"
            title="Recent Initiatives"
            subtitle="A look at the communities your support has helped reach."
          />
          <Button to="/projects" variant="secondary">
            View All Projects <ArrowRight size={16} />
          </Button>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
