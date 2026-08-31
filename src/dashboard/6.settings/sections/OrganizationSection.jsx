import { FIELD, ERROR_FIELD, LABEL } from '../../components/formStyles';

export default function OrganizationSection({ formik, err }) {
  return (
    <section className="rounded-2xl border border-navy-900/8 bg-white p-5 shadow-elevated">
      <h3 className="mb-4 font-display text-lg text-forest-900">Organization</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={LABEL}>Organization name *</label>
          <input
            name="orgName"
            value={formik.values.orgName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${FIELD} ${err('orgName') ? ERROR_FIELD : ''}`}
          />
          {err('orgName') && <p className="mt-1 text-xs text-error">{err('orgName')}</p>}
        </div>
        <div>
          <label className={LABEL}>Short name</label>
          <input name="shortName" value={formik.values.shortName} onChange={formik.handleChange} className={FIELD} />
        </div>
        <div className="sm:col-span-2">
          <label className={LABEL}>Tagline *</label>
          <input
            name="tagline"
            value={formik.values.tagline}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${FIELD} ${err('tagline') ? ERROR_FIELD : ''}`}
          />
          {err('tagline') && <p className="mt-1 text-xs text-error">{err('tagline')}</p>}
        </div>
        <div className="sm:col-span-2">
          <label className={LABEL}>About / Description</label>
          <textarea name="description" rows={4} value={formik.values.description} onChange={formik.handleChange} className={`${FIELD} resize-y`} />
        </div>
        <div>
          <label className={LABEL}>Registered year</label>
          <input name="registeredYear" value={formik.values.registeredYear} onChange={formik.handleChange} className={FIELD} />
        </div>
      </div>
    </section>
  );
}
