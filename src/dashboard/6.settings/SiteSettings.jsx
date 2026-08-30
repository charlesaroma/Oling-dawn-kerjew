import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '../../components/common/Button';
import { useAdmin } from '../../context/AdminContext';

import { FIELD, ERROR_FIELD, LABEL } from '../components/formStyles';

const schema = yup.object({
  orgName: yup.string().trim().required('Organization name is required.'),
  shortName: yup.string(),
  tagline: yup.string().trim().required('Tagline is required.'),
  description: yup.string(),
  emails: yup.string(),
  phones: yup.string(),
  registeredAddress: yup.string(),
  postalAddress: yup.string(),
  registeredYear: yup.string(),
});

function downloadJSON(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function SiteSettings() {
  const { siteConfig, updateSiteConfig, exportAllData, resetToDefaults } = useAdmin();

  const formik = useFormik({
    initialValues: {
      ...siteConfig,
      emails: (siteConfig.emails || []).join(', '),
      phones: (siteConfig.phones || []).join(', '),
      socialLinks: siteConfig.socialLinks || [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      updateSiteConfig({
        ...values,
        orgName: values.orgName.trim(),
        tagline: values.tagline.trim(),
        emails: values.emails.split(',').map((s) => s.trim()).filter(Boolean),
        phones: values.phones.split(',').map((s) => s.trim()).filter(Boolean),
      });
    },
  });

  const err = (name) => (formik.touched[name] && formik.errors[name] ? formik.errors[name] : '');

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-display text-3xl text-forest-900">Settings</h1>
        <p className="mt-1 text-sm text-navy-900/60">Edits here appear on the public site immediately.</p>
      </header>

      <form onSubmit={formik.handleSubmit} className="max-w-2xl space-y-6">
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

        <Button type="submit" variant="primary">Save Settings</Button>
      </form>

      <section className="mt-10 max-w-2xl rounded-2xl border border-error/25 bg-white p-5 shadow-elevated">
        <h3 className="mb-1 font-display text-lg text-forest-900">Data</h3>
        <p className="mb-4 text-sm text-navy-900/60">Back up everything, or reset the dashboard back to its seeded starting state.</p>
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => downloadJSON(exportAllData(), `odkhc-data-${new Date().toISOString().slice(0, 10)}.json`)}
          >
            Export All Data
          </Button>
          <Button
            type="button"
            variant="dark"
            onClick={() => window.confirm('Reset all dashboard data back to the seeded defaults? This cannot be undone.') && resetToDefaults()}
          >
            Reset to Defaults
          </Button>
        </div>
      </section>
    </div>
  );
}
