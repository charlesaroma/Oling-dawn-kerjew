import { useMemo, useState } from 'react';
import Container from '../../components/common/Container';
import PageHeader from '../../components/common/PageHeader';
import EmptyState from '../../components/common/EmptyState';
import ProjectCard from '../../components/cards/ProjectCard';
import CategoryFilterBar from './sections/CategoryFilterBar';
import { useProjects } from '../../services/projectQueries';
import { getPublishedProjects, getProjectCategories, filterProjectsByCategory } from '../../services/projectsService';

export default function Projects() {
  const { data: allProjects } = useProjects();
  const published = useMemo(() => getPublishedProjects(allProjects), [allProjects]);
  const [category, setCategory] = useState('All');
  const categories = useMemo(() => getProjectCategories(published), [published]);
  const projects = useMemo(() => filterProjectsByCategory(published, category), [published, category]);

  return (
    <>
      <PageHeader title="Our Projects" subtitle="Construction, education, healthcare, and community initiatives carried out alongside the people we serve." />
      <section className="py-16">
        <Container className="flex flex-col gap-10">
          <CategoryFilterBar categories={categories} active={category} onChange={setCategory} />

          {projects.length === 0 ? (
            <EmptyState title="No projects in this category yet" message="Check back soon, or explore another category." />
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
