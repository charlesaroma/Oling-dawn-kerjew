import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

function ResultGroup({ title, items, renderRow }) {
  if (!items.length) return null;
  return (
    <section>
      <h2 className="mb-3 font-display text-lg text-forest-900">{title} ({items.length})</h2>
      <ul className="divide-y divide-navy-900/6 rounded-2xl border border-navy-900/8 bg-white shadow-elevated">
        {items.map((item) => (
          <li key={item.id} className="px-4 py-3 text-sm">
            {renderRow(item)}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const q = (searchParams.get('q') || '').trim().toLowerCase();
  const { profiles, projects, blogPosts } = useAdmin();

  const matchedProfiles = q ? profiles.filter((p) => p.fullName.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) : [];
  const matchedProjects = q ? projects.filter((p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) : [];
  const matchedPosts = q ? blogPosts.filter((p) => p.title.toLowerCase().includes(q)) : [];
  const total = matchedProfiles.length + matchedProjects.length + matchedPosts.length;

  const goToEdit = (path, id) => navigate(path, { state: { editId: id } });

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-display text-3xl text-forest-900">Search</h1>
        <p className="mt-1 text-sm text-navy-900/60">
          {q ? `${total} result${total === 1 ? '' : 's'} for "${q}"` : 'Type a search term in the header above.'}
        </p>
      </header>

      {q && total === 0 && (
        <div className="rounded-2xl border border-navy-900/8 bg-white px-6 py-16 text-center text-sm text-navy-900/50 shadow-elevated">
          No matches found.
        </div>
      )}

      <div className="flex flex-col gap-8">
        <ResultGroup
          title="Profiles"
          items={matchedProfiles}
          renderRow={(p) => (
            <button type="button" onClick={() => goToEdit('/dashboard/profiles', p.id)} className="text-forest-900 hover:text-gold-700">
              {p.fullName} <span className="text-navy-900/40">· {p.category}</span>
            </button>
          )}
        />
        <ResultGroup
          title="Projects"
          items={matchedProjects}
          renderRow={(p) => (
            <button type="button" onClick={() => goToEdit('/dashboard/projects', p.id)} className="text-forest-900 hover:text-gold-700">
              {p.title} <span className="text-navy-900/40">· {p.category}</span>
            </button>
          )}
        />
        <ResultGroup
          title="Blog Posts"
          items={matchedPosts}
          renderRow={(p) => (
            <button type="button" onClick={() => goToEdit('/dashboard/blog', p.id)} className="text-forest-900 hover:text-gold-700">
              {p.title}
            </button>
          )}
        />
      </div>
    </div>
  );
}
