import { ArrowRight } from 'lucide-react';
import Container from '../../../components/common/Container';
import SectionHeading from '../../../components/common/SectionHeading';
import ProjectCard from '../../../components/cards/ProjectCard';
import EmptyState from '../../../components/common/EmptyState';
import { Link } from 'react-router-dom';
import { useProjects } from '../../../services/projectQueries';
import { getFeaturedProjects } from '../../../services/projectsService';

export default function FeaturedProjects() {
  const { data: allProjects } = useProjects();
  const projects = getFeaturedProjects(allProjects, 3);

  return (
    <section className="border-y border-ink-900/8 bg-surface-alt py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Our work"
            title="Recent initiatives"
            subtitle="A look at the communities your support has helped reach."
          />
          <Link
            to="/projects"
            className="group flex shrink-0 items-center gap-2 border-b border-forest-800/25 pb-1 text-sm font-semibold text-forest-800 transition-colors hover:border-forest-800"
          >
            View all projects
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {projects.length === 0 ? (
          <EmptyState
            title="Projects are being prepared"
            message="Our initiatives are being written up and photographed. Check back shortly."
          />
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
