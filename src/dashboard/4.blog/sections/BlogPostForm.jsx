import { useFormik } from 'formik';
import * as yup from 'yup';
import ImageUploadField from '../../components/ImageUploadField';

import { FIELD, ERROR_FIELD, LABEL, GROUP_HEADING } from '../../components/formStyles';

const PUBLISH_STATES = ['draft', 'published'];

const slugify = (value) =>
  value.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');

const schema = yup.object({
  title: yup.string().trim().required('Title is required.'),
  author: yup.string(),
  publishedAt: yup.string().required('Published date is required.'),
  publishStatus: yup.string().required(),
  tags: yup.string(),
  excerpt: yup.string(),
  content: yup.string(),
  coverImage: yup.string(),
});

export default function BlogPostForm({ initial, onSubmit }) {
  const initialTags = Array.isArray(initial?.tags) ? initial.tags.join(', ') : initial?.tags || '';
  const initialContent = Array.isArray(initial?.content) ? initial.content.join('\n') : initial?.content || '';

  const formik = useFormik({
    initialValues: {
      title: '',
      slug: '',
      excerpt: '',
      coverImage: '',
      author: '',
      publishedAt: new Date().toISOString().slice(0, 10),
      publishStatus: PUBLISH_STATES[0],
      ...initial,
      tags: initialTags,
      content: initialContent,
    },
    validationSchema: schema,
    onSubmit: (values) => onSubmit({
      ...values,
      title: values.title.trim(),
      slug: values.slug.trim() || slugify(values.title),
      tags: values.tags.split(',').map((s) => s.trim()).filter(Boolean),
      content: values.content.split('\n').map((s) => s.trim()).filter(Boolean),
    }),
  });

  const err = (name) => (formik.touched[name] && formik.errors[name] ? formik.errors[name] : '');

  return (
    <form id="blog-post-form" onSubmit={formik.handleSubmit} className="space-y-8">
      <div>
        <h3 className={GROUP_HEADING}>Post</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={LABEL}>Title *</label>
            <input
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${FIELD} ${err('title') ? ERROR_FIELD : ''}`}
            />
            {err('title') && <p className="mt-1 text-xs text-error">{err('title')}</p>}
          </div>
          <div>
            <label className={LABEL}>Author</label>
            <input name="author" value={formik.values.author} onChange={formik.handleChange} className={FIELD} />
          </div>
          <div>
            <label className={LABEL}>Published date</label>
            <input
              type="date"
              name="publishedAt"
              value={formik.values.publishedAt}
              onChange={formik.handleChange}
              className={FIELD}
            />
          </div>
          <div>
            <label className={LABEL}>Publish state</label>
            <select name="publishStatus" value={formik.values.publishStatus} onChange={formik.handleChange} className={FIELD}>
              {PUBLISH_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className={LABEL}>Tags (comma separated)</label>
            <input name="tags" value={formik.values.tags} onChange={formik.handleChange} className={FIELD} placeholder="Impact, Update" />
          </div>
          <div className="sm:col-span-2">
            <label className={LABEL}>Excerpt</label>
            <textarea name="excerpt" rows={2} value={formik.values.excerpt} onChange={formik.handleChange} className={`${FIELD} resize-y`} />
          </div>
          <div className="sm:col-span-2">
            <label className={LABEL}>Content (one paragraph per line)</label>
            <textarea name="content" rows={6} value={formik.values.content} onChange={formik.handleChange} className={`${FIELD} resize-y`} />
          </div>
        </div>
      </div>

      <div>
        <h3 className={GROUP_HEADING}>Media</h3>
        <ImageUploadField
          label="Cover image"
          name="coverImage"
          value={formik.values.coverImage}
          onChange={(value) => formik.setFieldValue('coverImage', value)}
          placeholder="Paste a URL, or choose a file to upload"
          tag="blog"
        />
      </div>
    </form>
  );
}
