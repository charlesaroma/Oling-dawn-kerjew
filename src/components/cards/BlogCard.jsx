import { Link } from 'react-router-dom';
import MediaImage from '../media/MediaImage';
import { formatDate } from '../../utils/formatDate';

export default function BlogCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-navy-900/10 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="aspect-16/9 overflow-hidden bg-forest-50">
        <MediaImage
          src={post.coverImage}
          alt={post.title}
          width={480}
          height={270}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="font-mono text-xs text-bronze-700">{formatDate(post.publishedAt)} · {post.author}</span>
        <h3 className="text-lg font-semibold text-forest-900">{post.title}</h3>
        <p className="line-clamp-2 text-sm text-navy-900/70">{post.excerpt}</p>
      </div>
    </Link>
  );
}
