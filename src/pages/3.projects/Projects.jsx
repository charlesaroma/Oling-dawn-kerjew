import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Container from '../../components/common/Container';
import PageHeader from '../../components/common/PageHeader';
import EmptyState from '../../components/common/EmptyState';
import ProjectCard from '../../components/cards/ProjectCard';
import CategoryFilterBar from './sections/CategoryFilterBar';
import { useProjects } from '../../services/projectQueries';
import {
  getPublishedProjects,
  getProjectCategories,
  filterProjectsByCategory,
  sortProjectsByDate,
} from '../../services/projectsService';
import { useSEO } from '../../hooks/useSEO';

const SELECT_CLASSES =
  'w-full appearance-none rounded-full border border-ink-900/10 bg-surface-card py-2.5 pl-5 pr-10 text-sm font-medium text-forest-800 shadow-elevated outline-none transition-colors focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10';

const CONSTRUCTION_CATEGORY = 'Low-Cost Construction';

export default function Projects() {
  useSEO({
    title: 'Our Projects',
    description: 'Construction, education, healthcare, and community initiatives carried out alongside the people Oling Dawn Kerjew Projects serves.',
  });

  const { data: allProjects } = useProjects();
  const published = useMemo(() => getPublishedProjects(allProjects), [allProjects]);
  const [category, setCategory] = useState('All');
  const [order, setOrder] = useState('newest');
  const categories = useMemo(() => getProjectCategories(published), [published]);
  const projects = useMemo(
    () => sortProjectsByDate(filterProjectsByCategory(published, category), order),
    [published, category, order],
  );

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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CategoryFilterBar categories={categories} active={category} onChange={setCategory} />
            <div className="relative w-full sm:w-48">
              <select
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className={SELECT_CLASSES}
                aria-label="Sort projects"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
              <ChevronDown size={16} strokeWidth={2} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-forest-600" />
            </div>
          </div>

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
