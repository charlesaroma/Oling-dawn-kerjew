import { Navigate, useParams } from 'react-router-dom';
import Container from '../../components/common/Container';
import MediaImage from '../../components/media/MediaImage';
import { getPostBySlug } from '../../services/blogService';
import { formatDate } from '../../utils/formatDate';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <article className="py-16">
      <Container className="mx-auto flex max-w-3xl flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-neutral-500">
            {formatDate(post.publishedAt)} · {post.author}
          </span>
          <h1 className="text-3xl font-display font-extrabold text-neutral-900 sm:text-4xl">{post.title}</h1>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="aspect-16/9 overflow-hidden rounded-xl bg-neutral-100">
          <MediaImage src={post.coverImage} alt={post.title} width={960} height={540} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-col gap-4 text-neutral-700">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </article>
  );
}
