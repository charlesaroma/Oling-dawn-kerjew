import { useFormik } from 'formik';
import * as yup from 'yup';
import ImageUploadField from '../../components/ImageUploadField';
import { useProjects } from '../../../services/projectQueries';

import { FIELD, ERROR_FIELD, LABEL, GROUP_HEADING, CALLOUT } from '../../components/formStyles';

const CATEGORIES = ['Farmer', 'Refugee', 'Student', 'Widow/Vulnerable Woman', 'Formal Worker', 'Migrant Worker', 'Other'];
const GENDERS = ['Male', 'Female'];

const schema = yup
  .object({
    fullName: yup.string().trim().required('Full name is required.'),
    category: yup.string().required(),
    gender: yup.string().required(),
    age: yup
      .number()
      .typeError('Age must be a number.')
      .positive()
      .integer()
      .nullable()
      .transform((value, original) => (original === '' ? null : value)),
    phone: yup.string(),
    location: yup.string(),
    nin: yup.string(),
    passportNumber: yup.string(),
    associatedProject: yup.string(),
    photo: yup.string(),
    notes: yup.string(),
  })
  .test('id-required', 'Provide either a NIN or a passport number.', function test(values) {
    if (values.nin?.trim() || values.passportNumber?.trim()) return true;
    return this.createError({ path: 'nin', message: 'Provide either a NIN or a passport number.' });
  });

export default function ProfileForm({ initial, onSubmit }) {
  const { data: projects } = useProjects();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      category: CATEGORIES[0],
      gender: GENDERS[0],
      age: '',
      phone: '',
      location: '',
      nin: '',
      passportNumber: '',
      associatedProject: '',
      photo: '',
      notes: '',
      ...initial,
    },
    validationSchema: schema,
    onSubmit: (values) => onSubmit({
      ...values,
      fullName: values.fullName.trim(),
      age: values.age === '' ? '' : Number(values.age),
      registeredDate: values.registeredDate || new Date().toISOString().slice(0, 10),
    }),
  });

  const err = (name) => (formik.touched[name] && formik.errors[name] ? formik.errors[name] : '');

  return (
    <form id="profile-form" onSubmit={formik.handleSubmit} className="space-y-8">
      <div>
        <h3 className={GROUP_HEADING}>Personal Details</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={LABEL}>Full name *</label>
            <input
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${FIELD} ${err('fullName') ? ERROR_FIELD : ''}`}
              placeholder="e.g. Grace Aciro"
            />
            {err('fullName') && <p className="mt-1 text-xs text-error">{err('fullName')}</p>}
          </div>
          <div>
            <label className={LABEL}>Category</label>
            <select name="category" value={formik.values.category} onChange={formik.handleChange} className={FIELD}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={LABEL}>Gender</label>
            <select name="gender" value={formik.values.gender} onChange={formik.handleChange} className={FIELD}>
              {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className={LABEL}>Age</label>
            <input
              type="number"
              min="0"
              name="age"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${FIELD} ${err('age') ? ERROR_FIELD : ''}`}
            />
            {err('age') && <p className="mt-1 text-xs text-error">{err('age')}</p>}
          </div>
          <div>
            <label className={LABEL}>Phone</label>
            <input name="phone" value={formik.values.phone} onChange={formik.handleChange} className={FIELD} placeholder="+256 …" />
          </div>
          <div className="sm:col-span-2">
            <label className={LABEL}>Location / Address</label>
            <input name="location" value={formik.values.location} onChange={formik.handleChange} className={FIELD} />
          </div>
        </div>
      </div>

      <div>
        <h3 className={GROUP_HEADING}>Identification</h3>
        <p className={`mb-4 ${CALLOUT}`}>
          Provide a National ID (NIN) for Ugandan nationals, or a passport number for non-Ugandans.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={LABEL}>NIN (Uganda National ID)</label>
            <input
              name="nin"
              value={formik.values.nin}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${FIELD} ${err('nin') ? ERROR_FIELD : ''}`}
            />
            {err('nin') && <p className="mt-1 text-xs text-error">{err('nin')}</p>}
          </div>
          <div>
            <label className={LABEL}>Passport Number</label>
            <input name="passportNumber" value={formik.values.passportNumber} onChange={formik.handleChange} className={FIELD} />
          </div>
        </div>
      </div>

      <div>
        <h3 className={GROUP_HEADING}>Program</h3>
        <div className="grid gap-4">
          <div>
            <label className={LABEL}>Associated Initiative</label>
            <select name="associatedProject" value={formik.values.associatedProject} onChange={formik.handleChange} className={FIELD}>
              <option value="">None</option>
              {projects.map((p) => <option key={p.slug} value={p.slug}>{p.title}</option>)}
            </select>
          </div>
          <ImageUploadField
            label="Photo"
            name="photo"
            value={formik.values.photo}
            onChange={(value) => formik.setFieldValue('photo', value)}
            onBlur={formik.handleBlur}
            placeholder="Paste a URL, or choose a file to upload"
            tag="profiles"
          />
          <div>
            <label className={LABEL}>Notes</label>
            <textarea name="notes" rows={4} value={formik.values.notes} onChange={formik.handleChange} className={`${FIELD} resize-y`} />
          </div>
        </div>
      </div>
  </form>
  );
}
