import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import AuthSplitShell from './AuthSplitShell';
import FloatingInput from './FloatingInput';
import { setSession } from '../../services/authService';
import { useAuth } from '../../context/useAuth';
import { useToast } from '../../context/useToast';

export default function Login() {
  const navigate = useNavigate();
  const { login: apiLogin } = useAuth();
  const { addToast } = useToast();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      // The backend is the sole authority on credentials. Its response is
      // also what populates the local session the dashboard chrome reads.
      const user = await apiLogin({ email: form.email, password: form.password });
      setSession(user);
      addToast('Welcome back! Signed in successfully.', 'success');
      navigate('/dashboard');
    } catch (err) {
      // 401 is a genuine credential failure; anything else (network error,
      // backend not running, 429 from the rate limiter) needs a different
      // message, otherwise a down server looks like a wrong password.
      const status = err.response?.status;
      const message = status === 401
        ? 'Invalid email or password.'
        : err.response?.data?.message
          || (err.response
            ? 'Sign-in failed. Please try again.'
            : 'Could not reach the server. Check that the backend is running and try again.');
      setError(message);
      addToast(message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthSplitShell
      kicker="Staff portal"
      title="Serving with accountability."
      blurb="Every profile, project and photograph on the public site is registered and maintained from here."
    >
      <div className="mb-12">
        <h1 className="font-display text-[2.5rem] leading-none tracking-[-0.02em] text-forest-900">Sign in</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-500">
          Access the Oling Dawn Kerjew Projects admin console.
        </p>
      </div>

      <form onSubmit={submit} noValidate className="space-y-7">
        <FloatingInput
          id="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={(e) => { setForm({ ...form, email: e.target.value }); setError(''); }}
        />

        <FloatingInput
          id="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          required
          autoComplete="current-password"
          value={form.password}
          onChange={(e) => { setForm({ ...form, password: e.target.value }); setError(''); }}
          rightSlot={(
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="p-1.5 text-ink-400 transition-colors hover:text-forest-800"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        />

        {error && (
          <p className="rounded-xl border border-error/20 bg-error/5 px-4 py-3 text-[13px] leading-relaxed text-error" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-forest-800 px-7 py-4 text-sm font-semibold text-surface transition-all duration-200 hover:-translate-y-0.5 hover:bg-forest-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="mt-10 border-t border-ink-900/8 pt-6 text-xs leading-relaxed text-ink-500">
        This console is for Oling Dawn Kerjew Projects staff. If you need access, contact the
        administrator at{' '}
        <a href="mailto:info@olingdawnkerjew.org" className="text-bronze-700 underline underline-offset-2 hover:text-bronze-800">
          info@olingdawnkerjew.org
        </a>.
      </p>
    </AuthSplitShell>
  );
}
