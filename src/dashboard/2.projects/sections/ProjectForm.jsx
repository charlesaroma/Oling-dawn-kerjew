import { useFormik } from 'formik';
import * as yup from 'yup';
import ImageUploadField from '../../components/ImageUploadField';
import MediaListField from '../../components/MediaListField';

import { FIELD, ERROR_FIELD, LABEL, GROUP_HEADING } from '../../components/formStyles';

const LIFECYCLE = ['Ongoing', 'Completed'];
const PUBLISH_STATES = ['draft', 'published'];

const slugify = (value) =>
  value.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');

const schema = yup.object({
  title: yup.string().trim().required('Title is required.'),
  category: yup.string().trim().required('Category is required.'),
  location: yup.string(),
  status: yup.string().required(),
  publishStatus: yup.string().required(),
  year: yup.number().typeError('Year must be a number.').integer().required('Year is required.'),
  summary: yup.string(),
  description: yup.string(),
  coverImage: yup.string(),
  video: yup.string(),
});

export default function ProjectForm({ initial, onSubmit }) {
  const initialDescription = Array.isArray(initial?.description) ? initial.description.join('\n') : initial?.description || '';
  const initialVideo = initial?.video ?? '';

  const formik = useFormik({
    initialValues: {
      title: '',
      slug: '',
      category: '',
      location: '',
      status: LIFECYCLE[0],
      publishStatus: PUBLISH_STATES[0],
      year: new Date().getFullYear(),
      summary: '',
      coverImage: '',
      gallery: [],
      ...initial,
      description: initialDescription,
      video: initialVideo,
    },
    validationSchema: schema,
    onSubmit: (values) => onSubmit({
      ...values,
      title: values.title.trim(),
      slug: values.slug.trim() || slugify(values.title),
      year: Number(values.year),
      description: values.description.split('\n').map((s) => s.trim()).filter(Boolean),
      video: values.video.trim() || null,
    }),
  });

  const err = (name) => (formik.touched[name] && formik.errors[name] ? formik.errors[name] : '');

  return (
    <form id="project-form" onSubmit={formik.handleSubmit} className="space-y-8">
      <div>
        <h3 className={GROUP_HEADING}>Details</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={LABEL}>Title *</label>
            <input
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${FIELD} ${err('title') ? ERROR_FIELD : ''}`}
              placeholder="e.g. Kamdini Community Grinding Mill"
            />
            {err('title') && <p className="mt-1 text-xs text-error">{err('title')}</p>}
          </div>
          <div>
            <label className={LABEL}>Category *</label>
            <input
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${FIELD} ${err('category') ? ERROR_FIELD : ''}`}
              placeholder="e.g. Education"
            />
            {err('category') && <p className="mt-1 text-xs text-error">{err('category')}</p>}
          </div>
          <div>
            <label className={LABEL}>Status</label>
            <select name="status" value={formik.values.status} onChange={formik.handleChange} className={FIELD}>
              {LIFECYCLE.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className={LABEL}>Year</label>
            <input
              type="number"
              name="year"
              value={formik.values.year}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${FIELD} ${err('year') ? ERROR_FIELD : ''}`}
            />
            {err('year') && <p className="mt-1 text-xs text-error">{err('year')}</p>}
          </div>
          <div>
            <label className={LABEL}>Publish state</label>
            <select name="publishStatus" value={formik.values.publishStatus} onChange={formik.handleChange} className={FIELD}>
              {PUBLISH_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={LABEL}>Location</label>
            <input name="location" value={formik.values.location} onChange={formik.handleChange} className={FIELD} />
          </div>
          <div className="sm:col-span-2">
            <label className={LABEL}>Summary</label>
            <textarea name="summary" rows={2} value={formik.values.summary} onChange={formik.handleChange} className={`${FIELD} resize-y`} />
          </div>
          <div className="sm:col-span-2">
            <label className={LABEL}>Description (one paragraph per line)</label>
            <textarea name="description" rows={5} value={formik.values.description} onChange={formik.handleChange} className={`${FIELD} resize-y`} />
          </div>
        </div>
      </div>

      <div>
        <h3 className={GROUP_HEADING}>Media</h3>
        <div className="grid gap-5">
          <ImageUploadField
            label="Cover image"
            name="coverImage"
            value={formik.values.coverImage}
            onChange={(value) => formik.setFieldValue('coverImage', value)}
            placeholder="Paste a URL, or choose a file to upload"
            tag="projects"
          />
          <MediaListField
            label="Gallery images"
            items={formik.values.gallery}
            onChange={(items) => formik.setFieldValue('gallery', items)}
            tag="projects"
          />
          <div>
            <label className={LABEL}>Video URL (optional)</label>
            <input name="video" value={formik.values.video} onChange={formik.handleChange} className={FIELD} placeholder="https://ik.imagekit.io/.../video.mp4" />
          </div>
        </div>
      </div>
    </form>
  );
}
