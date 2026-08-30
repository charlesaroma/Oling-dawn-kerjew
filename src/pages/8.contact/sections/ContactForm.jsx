import { useState } from 'react';
import { CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import Button from '../../../components/common/Button';
import { submitContactMessage } from '../../../services/contactService';

const initialState = { name: '', email: '', message: '' };
const FIELD = 'rounded-xl border border-navy-900/12 px-4 py-2.5 outline-none transition-all duration-150 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10';

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
      <div className="flex items-start gap-3 rounded-2xl border border-success/20 bg-success/5 p-6 text-success shadow-elevated">
        <CheckCircle2 size={22} className="mt-0.5 shrink-0" />
        <p>Thanks for reaching out. We'll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium text-forest-800">Name</label>
        <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} className={FIELD} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-forest-800">Email</label>
        <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className={FIELD} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm font-medium text-forest-800">Message</label>
        <textarea id="message" name="message" rows={5} required value={form.message} onChange={handleChange} className={`${FIELD} resize-none`} />
      </div>

      {status === 'error' && (
        <p className="text-sm text-error">Something went wrong. Please try again.</p>
      )}

      <Button type="submit" variant="primary" disabled={status === 'submitting'} className="self-start">
        {status === 'submitting' ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            Send Message <ArrowRight size={16} />
          </>
        )}
      </Button>
    </form>
  );
}
