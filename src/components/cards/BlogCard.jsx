import { Link } from 'react-router-dom';
import MediaImage from '../media/MediaImage';
import { formatDate } from '../../utils/formatDate';

export default function BlogCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-neutral-200 transition-shadow hover:shadow-lg"
    >
      <div className="aspect-16/9 overflow-hidden bg-neutral-100">
        <MediaImage
          src={post.coverImage}
          alt={post.title}
          width={480}
          height={270}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-xs font-medium text-neutral-500">{formatDate(post.publishedAt)} · {post.author}</span>
        <h3 className="text-lg font-semibold text-neutral-900">{post.title}</h3>
        <p className="line-clamp-2 text-sm text-neutral-600">{post.excerpt}</p>
      </div>
    </Link>
  );
}
