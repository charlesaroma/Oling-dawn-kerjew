import { FIELD, LABEL } from '../../components/formStyles';

export default function SocialLinksSection({ formik }) {
  return (
    <section className="rounded-2xl border border-navy-900/8 bg-white p-5 shadow-elevated">
      <h3 className="mb-4 font-display text-lg text-forest-900">Social Links</h3>
      <div className="grid gap-4">
        {formik.values.socialLinks.map((social, i) => (
          <div key={social.label}>
            <label className={LABEL}>{social.label}</label>
            <input
              value={social.url}
              onChange={(e) => formik.setFieldValue(`socialLinks[${i}].url`, e.target.value)}
              className={FIELD}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
