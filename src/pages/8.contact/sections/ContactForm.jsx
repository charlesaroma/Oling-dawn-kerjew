import { useFormik } from 'formik';
import * as yup from 'yup';
import { CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { submitContactMessage } from '../../../services/contactService';

const SUBJECTS = ['General enquiry', 'Partnership', 'Volunteering', 'Donation', 'Media'];

const LABEL = 'mb-2 block font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-ink-500';
const FIELD =
  'w-full rounded-xl border border-ink-900/10 bg-surface/60 px-4 py-3.5 text-[15px] text-ink-800 outline-none transition-all duration-200 placeholder:text-ink-300 focus:border-gold-500 focus:bg-surface-card focus:ring-4 focus:ring-gold-500/10';
const ERROR_FIELD = 'border-error focus:border-error focus:ring-error/10';

const schema = yup.object({
  name: yup.string().trim().min(2, 'Enter your full name').required('Your name is required'),
  email: yup.string().trim().email('Enter a valid email address').required('Email is required'),
  organisation: yup.string().trim(),
  subject: yup.string().oneOf(SUBJECTS).required(),
  message: yup.string().trim().min(10, 'A few more words helps us route this properly').required('Tell us what you have in mind'),
  botcheck: yup.string(),
});

export default function ContactForm() {
  const formik = useFormik({
    initialValues: { name: '', email: '', organisation: '', subject: 'General enquiry', message: '', botcheck: '' },
    validationSchema: schema,
    onSubmit: async (values, { resetForm, setStatus }) => {
      if (values.botcheck) return; // honeypot tripped — a real visitor never fills this in
      try {
        await submitContactMessage(values);
        setStatus('success');
        resetForm();
      } catch {
        setStatus('error');
      }
    },
  });

  const err = (name) => (formik.touched[name] && formik.errors[name] ? formik.errors[name] : '');

  if (formik.status === 'success') {
    return (
      <div className="flex flex-col items-start rounded-2xl border border-ink-900/8 bg-surface-card p-7 shadow-elevated sm:p-9">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
          <CheckCircle2 size={22} strokeWidth={1.75} />
        </span>
        <h3 className="mt-6 font-display text-3xl leading-tight text-forest-900">Message received.</h3>
        <p className="mt-3 max-w-[40ch] leading-relaxed text-ink-500">
          Thank you for reaching out. Someone from the team will reply to you directly, usually within two working days.
        </p>
        <button
          type="button"
          onClick={() => formik.setStatus(undefined)}
          className="mt-8 border-b border-forest-800/25 pb-1 text-sm font-semibold text-forest-800 transition-colors hover:border-forest-800"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit} noValidate className="relative rounded-2xl border border-ink-900/8 bg-surface-card p-7 shadow-elevated sm:p-9">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-bronze-600">Send a message</p>
      <h3 className="mt-3 font-display text-3xl leading-[1.05] text-forest-900">
        Tell us what you have in mind.
      </h3>

      {/* Honeypot — invisible to real visitors, bots tend to fill in every field they find */}
      <input
        type="text"
        name="botcheck"
        value={formik.values.botcheck}
        onChange={formik.handleChange}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px opacity-0"
      />

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={LABEL}>Your name</label>
          <input
            id="name" name="name" type="text"
            value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
            className={`${FIELD} ${err('name') ? ERROR_FIELD : ''}`} placeholder="Grace Aciro"
          />
          {err('name') && <p className="mt-1.5 text-xs text-error">{err('name')}</p>}
        </div>
        <div>
          <label htmlFor="email" className={LABEL}>Email</label>
          <input
            id="email" name="email" type="email"
            value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
            className={`${FIELD} ${err('email') ? ERROR_FIELD : ''}`} placeholder="you@example.com"
          />
          {err('email') && <p className="mt-1.5 text-xs text-error">{err('email')}</p>}
        </div>
        <div>
          <label htmlFor="organisation" className={LABEL}>Organisation <span className="normal-case tracking-normal text-ink-300">(optional)</span></label>
          <input
            id="organisation" name="organisation" type="text"
            value={formik.values.organisation} onChange={formik.handleChange}
            className={FIELD} placeholder="Where you're writing from"
          />
        </div>
        <div>
          <label htmlFor="subject" className={LABEL}>What's this about</label>
          <select id="subject" name="subject" value={formik.values.subject} onChange={formik.handleChange} className={FIELD}>
            {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={LABEL}>Message</label>
        <textarea
          id="message" name="message" rows={6}
          value={formik.values.message} onChange={formik.handleChange} onBlur={formik.handleBlur}
          className={`${FIELD} resize-none ${err('message') ? ERROR_FIELD : ''}`}
          placeholder="A little context helps us route your message to the right person."
        />
        {err('message') && <p className="mt-1.5 text-xs text-error">{err('message')}</p>}
      </div>

      {formik.status === 'error' && (
        <p className="mt-5 rounded-xl border border-error/20 bg-error/5 px-4 py-3 text-sm text-error" role="alert">
          That didn't send. Check your connection and try again, or email us directly at info@olingdawnkerjew.org.
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-ink-900/8 pt-7">
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="group inline-flex items-center gap-2.5 rounded-full bg-gold-500 px-8 py-4 text-sm font-semibold text-ink-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-400 disabled:pointer-events-none disabled:opacity-50"
        >
          {formik.isSubmitting
            ? (<><Loader2 size={16} className="animate-spin" /> Sending…</>)
            : (<>Send message <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" /></>)}
        </button>
        <p className="text-xs leading-relaxed text-ink-500">We reply to every message,<br className="hidden sm:block" /> usually within two working days.</p>
      </div>
    </form>
  );
}
