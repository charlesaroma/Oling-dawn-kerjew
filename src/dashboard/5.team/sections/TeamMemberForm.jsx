import { useFormik } from 'formik';
import * as yup from 'yup';
import ImageUploadField from '../../components/ImageUploadField';

import { FIELD, ERROR_FIELD, LABEL } from '../../components/formStyles';

const schema = yup.object({
  name: yup.string().trim().required('Name is required.'),
  role: yup.string(),
  photo: yup.string(),
  bio: yup.string(),
});

export default function TeamMemberForm({ initial, onSubmit }) {
  const formik = useFormik({
    initialValues: { name: '', role: '', photo: '', bio: '', ...initial },
    validationSchema: schema,
    onSubmit: (values) => onSubmit({ ...values, name: values.name.trim() }),
  });

  const err = (name) => (formik.touched[name] && formik.errors[name] ? formik.errors[name] : '');

  return (
    <form id="team-member-form" onSubmit={formik.handleSubmit} className="space-y-4">
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
    </form>
  );
}
