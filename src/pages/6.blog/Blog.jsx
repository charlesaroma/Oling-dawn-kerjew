import Container from '../../components/common/Container';
import PageHeader from '../../components/common/PageHeader';
import BlogCard from '../../components/cards/BlogCard';
import { useBlogPosts } from '../../services/blogQueries';
import { getPublishedPosts } from '../../services/blogService';

export default function Blog() {
  const { data: blogPosts } = useBlogPosts();
  const posts = getPublishedPosts(blogPosts);

  return (
    <>
      <PageHeader title="Blog & Articles" subtitle="Updates, stories, and lessons from the field." />
      <section className="py-16">
        <Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </Container>
      </section>
    </>
  );
}
