import { useMemo, useState } from 'react';
import Container from '../../components/common/Container';
import PageHeader from '../../components/common/PageHeader';
import EmptyState from '../../components/common/EmptyState';
import ProjectCard from '../../components/cards/ProjectCard';
import CategoryFilterBar from './sections/CategoryFilterBar';
import { useProjects } from '../../services/projectQueries';
import { getPublishedProjects, getProjectCategories, filterProjectsByCategory } from '../../services/projectsService';
import { useSEO } from '../../hooks/useSEO';

const CONSTRUCTION_CATEGORY = 'Low-Cost Construction';

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

  /* The standalone case-study page at /construction isn't its own backend
     record — instead of a top-level nav link (or a fabricated card), the
     first real, dynamically-fetched construction project links there
     instead of its own detail page. Card content (image, title, summary,
     status) stays 100% real DB data; only the destination changes. */
  const constructionFlagshipId = useMemo(
    () => published.find((p) => p.category === CONSTRUCTION_CATEGORY)?.id,
    [published],
  );

  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="Every initiative, on the record."
        subtitle="Construction, education, healthcare and community initiatives carried out alongside the people we serve."
        image="/construction/namanve-bridges.jpg"
        imageAlt="A completed bridge and drainage project in Namanve"
      />
      <section className="bg-surface-alt py-20 sm:py-28">
        <Container className="flex flex-col gap-12">
          <CategoryFilterBar categories={categories} active={category} onChange={setCategory} />

          {projects.length === 0 ? (
            <EmptyState title="No projects in this category yet" message="Check back soon, or explore another category." />
          ) : (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  to={project.id === constructionFlagshipId ? '/construction' : undefined}
                  badgeLabel={project.id === constructionFlagshipId ? 'Full case study' : undefined}
                />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
