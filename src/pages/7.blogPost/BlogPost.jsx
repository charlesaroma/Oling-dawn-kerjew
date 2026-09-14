import { Navigate, useParams } from 'react-router-dom';
import Container from '../../components/common/Container';
import PageHeader from '../../components/common/PageHeader';
import MediaImage from '../../components/media/MediaImage';
import Loader from '../../components/common/Loader';
import { useBlogPosts } from '../../services/blogQueries';
import { getPublishedPosts, getPostBySlug } from '../../services/blogService';
import { formatDate } from '../../utils/formatDate';
import { useSEO } from '../../hooks/useSEO';

export default function BlogPost() {
  const { slug } = useParams();
  const { data: blogPosts, isFetching } = useBlogPosts();
  const post = getPostBySlug(getPublishedPosts(blogPosts), slug);

  useSEO({
    title: post?.title,
    description: post?.excerpt,
    image: post?.coverImage,
  });

  // useBlogPosts() sets initialData: [] so isLoading is always false here —
  // isFetching is what actually reflects the in-flight first request. Wait
  // for it to settle before deciding the post genuinely doesn't exist,
  // otherwise a direct/hard-loaded link always bounces to /blog.
  if (!post) return isFetching ? <Loader /> : <Navigate to="/blog" replace />;

  return (
    <article>
      <PageHeader
        eyebrow={`${formatDate(post.publishedAt)}${post.author ? ` · ${post.author}` : ''}`}
        title={post.title}
        containerClassName="mx-auto max-w-3xl"
        titleClassName="font-display text-[clamp(2rem,4.6vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.02em] text-surface text-balance"
        image={post.coverImage}
        imageAlt={post.title}
      >
        {post.tags?.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-surface/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-surface/70">
                {tag}
              </span>
            ))}
          </div>
        )}
      </PageHeader>

      <div className="bg-surface py-16 sm:py-20">
        <Container className="mx-auto flex max-w-3xl flex-col gap-10">
          <div className="aspect-16/9 overflow-hidden rounded-2xl bg-forest-50">
            <MediaImage src={post.coverImage} alt={post.title} width={960} height={540} className="h-full w-full object-cover" />
          </div>

          <div className="flex flex-col gap-6 text-[17px] leading-[1.75] text-ink-700">
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </div>
    </article>
  );
}
