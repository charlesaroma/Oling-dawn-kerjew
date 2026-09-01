import { useMemo, useState } from 'react';
import Container from '../../components/common/Container';
import PageHeader from '../../components/common/PageHeader';
import EmptyState from '../../components/common/EmptyState';
import ProjectCard from '../../components/cards/ProjectCard';
import CategoryFilterBar from './sections/CategoryFilterBar';
import { useProjects } from '../../services/projectQueries';
import { getPublishedProjects, getProjectCategories, filterProjectsByCategory } from '../../services/projectsService';
import { useSEO } from '../../hooks/useSEO';

export default function Projects() {
  useSEO({
    title: 'Our Projects',
    description: 'Construction, education, healthcare, and community initiatives carried out alongside the people Oling Dawn Kerjew Projects serves.',
  });

  const { data: allProjects } = useProjects();
  const published = useMemo(() => getPublishedProjects(allProjects), [allProjects]);
  const [category, setCategory] = useState('All');
  const categories = useMemo(() => getProjectCategories(published), [published]);
  const projects = useMemo(() => filterProjectsByCategory(published, category), [published, category]);

  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="Every initiative, on the record."
        subtitle="Construction, education, healthcare and community initiatives carried out alongside the people we serve."
      />
      <section className="bg-surface-alt py-20 sm:py-28">
        <Container className="flex flex-col gap-12">
          <CategoryFilterBar categories={categories} active={category} onChange={setCategory} />

          {projects.length === 0 ? (
            <EmptyState title="No projects in this category yet" message="Check back soon, or explore another category." />
          ) : (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
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
