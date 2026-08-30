import { useState } from 'react';
import Button from '../../../components/common/Button';
import { submitContactMessage } from '../../../services/contactService';

const initialState = { name: '', email: '', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitContactMessage(form);
      setStatus('success');
      setForm(initialState);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-success/30 bg-success/10 p-6 text-success">
        Thanks for reaching out — we'll get back to you shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium text-neutral-700">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          className="rounded-md border border-neutral-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-neutral-700">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className="rounded-md border border-neutral-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm font-medium text-neutral-700">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={form.message}
          onChange={handleChange}
          className="resize-none rounded-md border border-neutral-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-error">Something went wrong. Please try again.</p>
      )}

      <Button type="submit" variant="primary" disabled={status === 'submitting'} className="self-start">
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </Button>
    </form>
  );
}
