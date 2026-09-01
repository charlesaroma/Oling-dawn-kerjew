import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import AuthSplitShell from './AuthSplitShell';
import FloatingInput from './FloatingInput';
import { login } from '../../services/authService';
import { useAuth } from '../../context/useAuth';
import { useToast } from '../../context/useToast';

export default function Login() {
  const navigate = useNavigate();
  const { login: apiLogin } = useAuth();
  const { addToast } = useToast();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      login(form);

      // Also sign in against the real backend — nearly every dashboard
      // domain (Profiles/Projects/Blog/Team/Gallery/Account) now depends on
      // this token for writes. Read-only pages still work without it, so a
      // failure here doesn't block dashboard access entirely, but the user
      // needs to know saves won't work until they retry.
      try {
        await apiLogin({ email: form.email, password: form.password });
        addToast('Welcome back! Signed in successfully.', 'success');
      } catch (apiErr) {
        console.error('Backend login failed — saving/uploading will be unavailable until this succeeds:', apiErr);
        addToast('Signed in, but the server login failed — saving changes may not work. Try signing out and back in.', 'warning');
      }

      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      addToast(err.message, 'error');
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
          className="w-full rounded-full bg-forest-800 px-7 py-4 text-sm font-semibold text-surface transition-all duration-200 hover:-translate-y-0.5 hover:bg-forest-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          Sign in
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
