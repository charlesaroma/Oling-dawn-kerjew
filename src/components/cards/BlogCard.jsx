import { Link } from 'react-router-dom';
import MediaImage from '../media/MediaImage';
import { formatDate } from '../../utils/formatDate';

export default function BlogCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-900/8 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-ink-900/16 hover:shadow-elevated-lg"
    >
      <div className="aspect-16/9 overflow-hidden bg-forest-50">
        <MediaImage
          src={post.coverImage}
          alt={post.title}
          width={480}
          height={270}
          className="h-full w-full object-cover saturate-[0.75] transition-all duration-700 group-hover:scale-[1.04] group-hover:saturate-100"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-bronze-600">
          {formatDate(post.publishedAt)}{post.author ? ` · ${post.author}` : ''}
        </span>
        <h3 className="mt-3 font-display text-xl leading-[1.15] text-forest-900 transition-colors duration-200 group-hover:text-bronze-700">
          {post.title}
        </h3>
        {post.excerpt && <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-500">{post.excerpt}</p>}
        {post.tags?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5 border-t border-ink-900/8 pt-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full bg-forest-50 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-forest-700">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
