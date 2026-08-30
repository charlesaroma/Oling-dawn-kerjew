import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '../../components/common/Button';
import ImageUploadField from './ImageUploadField';

import { FIELD, ERROR_FIELD, LABEL } from './formStyles';

const schema = yup.object({
  name: yup.string().trim().required('Name is required.'),
  role: yup.string(),
  photo: yup.string(),
  bio: yup.string(),
});

export default function TeamMemberForm({ initial, onSubmit, onCancel }) {
  const formik = useFormik({
    initialValues: { name: '', role: '', photo: '', bio: '', ...initial },
    validationSchema: schema,
    onSubmit: (values) => onSubmit({ ...values, name: values.name.trim() }),
  });

  const err = (name) => (formik.touched[name] && formik.errors[name] ? formik.errors[name] : '');

  return (
    <form onSubmit={formik.handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <section className="space-y-4 rounded-2xl border border-navy-900/8 bg-white p-5 shadow-elevated">
        <div>
          <label className={LABEL}>Name *</label>
          <input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${FIELD} ${err('name') ? ERROR_FIELD : ''}`}
          />
          {err('name') && <p className="mt-1 text-xs text-error">{err('name')}</p>}
        </div>
        <div>
          <label className={LABEL}>Role</label>
          <input name="role" value={formik.values.role} onChange={formik.handleChange} className={FIELD} placeholder="e.g. Executive Director" />
        </div>
        <ImageUploadField
          label="Photo"
          name="photo"
          value={formik.values.photo}
          onChange={(value) => formik.setFieldValue('photo', value)}
          placeholder="/team/photo.jpg"
        />
        <div>
          <label className={LABEL}>Short bio (optional)</label>
          <textarea name="bio" rows={2} value={formik.values.bio} onChange={formik.handleChange} className={`${FIELD} resize-y`} />
        </div>
      </section>

      <aside className="space-y-4">
        <div className="space-y-3">
          <Button type="submit" variant="primary" className="w-full">Save member</Button>
          {onCancel && (
            <Button type="button" variant="outline" className="w-full" onClick={onCancel}>Cancel</Button>
          )}
        </div>
      </aside>
    </form>
  );
}
