/*
  Submits the contact form to Web3Forms — no backend endpoint of our own
  needed. The access key is meant to be public/client-side (that's how
  Web3Forms works; spam/abuse controls live on their side, keyed to the
  access key + origin), so it's fine to ship in the bundle via this env var.
*/
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

export async function submitContactMessage(values) {
  // FormData, no custom headers — a JSON body with Content-Type/Accept headers
  // triggers a CORS preflight that Web3Forms doesn't answer for every origin;
  // this is their own documented pattern and avoids the preflight entirely.
  const formData = new FormData();
  formData.append('access_key', WEB3FORMS_ACCESS_KEY);
  formData.append('subject', `Website enquiry: ${values.subject}`);
  formData.append('from_name', 'Oling Dawn Kerjew Projects: Contact form');
  formData.append('name', values.name);
  formData.append('email', values.email);
  if (values.organisation) formData.append('organisation', values.organisation);
  formData.append('message', values.message);

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Message could not be sent');
  }
  return data;
}
