import { Navigate, useParams } from 'react-router-dom';
import Container from '../../components/common/Container';
import MediaImage from '../../components/media/MediaImage';
import { useBlogPosts } from '../../services/blogQueries';
import { getPublishedPosts, getPostBySlug } from '../../services/blogService';
import { formatDate } from '../../utils/formatDate';
import { useSEO } from '../../hooks/useSEO';

export default function BlogPost() {
  const { slug } = useParams();
  const { data: blogPosts } = useBlogPosts();
  const post = getPostBySlug(getPublishedPosts(blogPosts), slug);

  useSEO({
    title: post?.title,
    description: post?.excerpt,
    image: post?.coverImage,
  });

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <article>
      <header className="relative overflow-hidden bg-ink-900">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[8%] -top-[60%] h-[min(60vw,520px)] w-[min(60vw,520px)] rounded-full opacity-70"
          style={{ background: 'radial-gradient(circle, rgba(223,161,38,0.14) 0%, transparent 66%)' }}
        />
        <Container className="relative mx-auto max-w-3xl pb-16 pt-32 sm:pb-20 sm:pt-40">
          <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-bronze-400">
            {formatDate(post.publishedAt)}{post.author ? ` · ${post.author}` : ''}
          </p>
          <h1 className="font-display text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.02] tracking-[-0.02em] text-surface text-balance">
            {post.title}
          </h1>
          {post.tags?.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-surface/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-surface/70">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </Container>
        <div
          aria-hidden="true"
          className="h-1.5"
          style={{
            background:
              'repeating-linear-gradient(90deg, var(--color-gold-500) 0 28px, var(--color-bronze-600) 28px 56px, var(--color-forest-700) 56px 84px)',
          }}
        />
      </header>

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
