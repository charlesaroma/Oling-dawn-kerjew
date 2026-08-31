import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '../../components/common/Button';
import { useAdmin } from '../../context/AdminContext';
import OrganizationSection from './sections/OrganizationSection';
import ContactSection from './sections/ContactSection';
import SocialLinksSection from './sections/SocialLinksSection';
import DataSection from './sections/DataSection';

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

export default function SiteSettings() {
  const { siteConfig, updateSiteConfig } = useAdmin();

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
        <OrganizationSection formik={formik} err={err} />
        <ContactSection formik={formik} />
        <SocialLinksSection formik={formik} />
        <Button type="submit" variant="primary">Save Settings</Button>
      </form>

      <DataSection />
    </div>
  );
}
