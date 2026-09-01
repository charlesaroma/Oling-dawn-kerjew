import Container from '../../components/common/Container';
import PageHeader from '../../components/common/PageHeader';
import BlogCard from '../../components/cards/BlogCard';
import EmptyState from '../../components/common/EmptyState';
import { useBlogPosts } from '../../services/blogQueries';
import { getPublishedPosts } from '../../services/blogService';
import { useSEO } from '../../hooks/useSEO';

export default function Blog() {
  useSEO({
    title: 'Blog & Articles',
    description: 'Updates, stories, and lessons from the field — news from Oling Dawn Kerjew Projects.',
  });

  const { data: blogPosts } = useBlogPosts();
  const posts = getPublishedPosts(blogPosts);

  return (
    <>
      <PageHeader
        eyebrow="Journal"
        title="Notes from the field."
        subtitle="Updates, stories and lessons from the districts where we work."
      />
      <section className="bg-surface-alt py-20 sm:py-28">
        <Container>
          {posts.length === 0 ? (
            <EmptyState
              title="The first stories are being written"
              message="We're documenting the work as it happens. Field notes and project updates will appear here."
            />
          ) : (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
