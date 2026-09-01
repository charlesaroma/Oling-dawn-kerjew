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
    <article className="py-16">
      <Container className="mx-auto flex max-w-3xl flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-sm text-bronze-700">
            {formatDate(post.publishedAt)} · {post.author}
          </span>
          <h1 className="text-3xl italic sm:text-4xl">{post.title}</h1>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-forest-50 px-3 py-1 font-mono text-xs font-medium text-forest-700">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="aspect-16/9 overflow-hidden rounded-3xl bg-forest-50 shadow-elevated-lg">
          <MediaImage src={post.coverImage} alt={post.title} width={960} height={540} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-col gap-4 text-ink-900/80">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </article>
  );
}
