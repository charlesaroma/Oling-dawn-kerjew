import { FIELD, LABEL } from '../../components/formStyles';

export default function ContactSection({ formik }) {
  return (
    <section className="rounded-2xl border border-navy-900/8 bg-white p-5 shadow-elevated">
      <h3 className="mb-4 font-display text-lg text-forest-900">Contact</h3>
      <div className="grid gap-4">
        <div>
          <label className={LABEL}>Emails (comma separated)</label>
          <input name="emails" value={formik.values.emails} onChange={formik.handleChange} className={FIELD} />
        </div>
        <div>
          <label className={LABEL}>Phones (comma separated)</label>
          <input name="phones" value={formik.values.phones} onChange={formik.handleChange} className={FIELD} />
        </div>
        <div>
          <label className={LABEL}>Registered Address</label>
          <input name="registeredAddress" value={formik.values.registeredAddress} onChange={formik.handleChange} className={FIELD} />
        </div>
        <div>
          <label className={LABEL}>Postal Address</label>
          <input name="postalAddress" value={formik.values.postalAddress} onChange={formik.handleChange} className={FIELD} />
        </div>
      </div>
    </section>
  );
}
