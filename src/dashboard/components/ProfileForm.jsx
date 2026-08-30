import { useState } from 'react';
import Button from '../../components/common/Button';
import { getAllProjects } from '../../services/projectsService';

const FIELD = 'w-full rounded-md border border-navy-900/15 bg-white px-3 py-2.5 text-sm outline-none transition-colors focus:border-gold-500';
const LABEL = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy-900/60';

const CATEGORIES = ['Farmer', 'Refugee', 'Student', 'Widow/Vulnerable Woman', 'Other'];
const GENDERS = ['Female', 'Male', 'Other'];

export default function ProfileForm({ initial, onSubmit, onCancel }) {
  const projects = getAllProjects();
  const [form, setForm] = useState(() => ({
    fullName: '',
    category: CATEGORIES[0],
    gender: GENDERS[0],
    age: '',
    phone: '',
    location: '',
    associatedProject: '',
    photo: '',
    notes: '',
    ...initial,
  }));
  const [error, setError] = useState('');

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.fullName.trim()) {
      setError('Full name is required.');
      return;
    }
    onSubmit({ ...form, fullName: form.fullName.trim(), age: form.age ? Number(form.age) : '' });
  };

  return (
    <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <section className="rounded-lg border border-navy-900/10 bg-white p-5">
          <h3 className="mb-4 font-display text-lg text-forest-900">Personal Details</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={LABEL}>Full name *</label>
              <input value={form.fullName} onChange={set('fullName')} className={FIELD} placeholder="e.g. Grace Aciro" />
            </div>
            <div>
              <label className={LABEL}>Category</label>
              <select value={form.category} onChange={set('category')} className={FIELD}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={LABEL}>Gender</label>
              <select value={form.gender} onChange={set('gender')} className={FIELD}>
                {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className={LABEL}>Age</label>
              <input type="number" min="0" value={form.age} onChange={set('age')} className={FIELD} />
            </div>
            <div>
              <label className={LABEL}>Phone</label>
              <input value={form.phone} onChange={set('phone')} className={FIELD} placeholder="+256 …" />
            </div>
            <div className="sm:col-span-2">
              <label className={LABEL}>Location / Village</label>
              <input value={form.location} onChange={set('location')} className={FIELD} />
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-navy-900/10 bg-white p-5">
          <h3 className="mb-4 font-display text-lg text-forest-900">Program</h3>
          <div className="grid gap-4">
            <div>
              <label className={LABEL}>Associated Initiative</label>
              <select value={form.associatedProject} onChange={set('associatedProject')} className={FIELD}>
                <option value="">— None —</option>
                {projects.map((p) => <option key={p.slug} value={p.slug}>{p.title}</option>)}
              </select>
            </div>
            <div>
              <label className={LABEL}>Photo path (ImageKit)</label>
              <input value={form.photo} onChange={set('photo')} className={FIELD} placeholder="/profiles/photo.jpg" />
            </div>
            <div>
              <label className={LABEL}>Notes</label>
              <textarea rows={4} value={form.notes} onChange={set('notes')} className={`${FIELD} resize-y`} />
            </div>
          </div>
        </section>
      </div>

      <aside className="space-y-4">
        {error && <p className="text-xs text-error">{error}</p>}
        <div className="space-y-3">
          <Button type="submit" variant="primary" className="w-full">Save profile</Button>
          {onCancel && (
            <Button type="button" variant="outline" className="w-full" onClick={onCancel}>Cancel</Button>
          )}
        </div>
      </aside>
    </form>
  );
}
