import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '../../components/common/Button';
import ImageUploadField from './ImageUploadField';
import { useAdmin } from '../../context/AdminContext';

import { FIELD, LABEL } from './formStyles';

const TYPES = ['image', 'video'];

const schema = yup.object({
  type: yup.string().required(),
  src: yup.string().trim().required('Media path is required.'),
  caption: yup.string(),
  projectSlug: yup.string(),
});

export default function GalleryItemForm({ initial, onSubmit, onCancel }) {
  const { projects } = useAdmin();

  const formik = useFormik({
    initialValues: { type: TYPES[0], src: '', caption: '', projectSlug: '', ...initial },
    validationSchema: schema,
    onSubmit: (values) => onSubmit({ ...values, src: values.src.trim(), caption: values.caption.trim() }),
  });

  const err = (name) => (formik.touched[name] && formik.errors[name] ? formik.errors[name] : '');

  return (
    <form onSubmit={formik.handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <section className="space-y-4 rounded-2xl border border-navy-900/8 bg-white p-5 shadow-elevated">
        <div>
          <label className={LABEL}>Type</label>
          <select name="type" value={formik.values.type} onChange={formik.handleChange} className={FIELD}>
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        {formik.values.type === 'image' ? (
          <ImageUploadField
            label="Media path *"
            name="src"
            value={formik.values.src}
            onChange={(value) => formik.setFieldValue('src', value)}
            onBlur={formik.handleBlur}
            error={err('src')}
            placeholder="/gallery/photo.jpg"
          />
        ) : (
          <div>
            <label className={LABEL}>Media path *</label>
            <input
              name="src"
              value={formik.values.src}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={FIELD}
              placeholder="/gallery/video.mp4"
            />
            {err('src') && <p className="mt-1 text-xs text-error">{err('src')}</p>}
          </div>
        )}
        <div>
          <label className={LABEL}>Caption</label>
          <input name="caption" value={formik.values.caption} onChange={formik.handleChange} className={FIELD} />
        </div>
        <div>
          <label className={LABEL}>Linked Project</label>
          <select name="projectSlug" value={formik.values.projectSlug} onChange={formik.handleChange} className={FIELD}>
            <option value="">None</option>
            {projects.map((p) => <option key={p.slug} value={p.slug}>{p.title}</option>)}
          </select>
        </div>
      </section>

      <aside className="space-y-4">
        <div className="space-y-3">
          <Button type="submit" variant="primary" className="w-full">Save item</Button>
          {onCancel && (
            <Button type="button" variant="outline" className="w-full" onClick={onCancel}>Cancel</Button>
          )}
        </div>
      </aside>
    </form>
  );
}
