import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Button from '../../components/common/Button';
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
      kicker="Staff Portal"
      title={<>Serving with <br /> accountability.</>}
      blurb="Sign in to register and manage the community profiles behind every Oling Dawn Kerjew Projects initiative."
    >
      <div className="mb-10 text-center lg:text-left">
        <h1 className="mb-3 font-display text-3xl italic font-semibold text-forest-900 lg:text-4xl">Sign in</h1>
        <p className="text-sm text-navy-900/60">Access the Oling Dawn Kerjew Projects admin dashboard.</p>
      </div>

      <form onSubmit={submit} noValidate className="space-y-6">
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
              className="p-1 text-navy-900/40 transition-colors hover:text-forest-800"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        />

        {error && (
          <p className="rounded border border-error/30 bg-error/5 px-4 py-3 text-xs text-error" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" variant="primary" className="w-full">Sign In</Button>
      </form>
    </AuthSplitShell>
  );
}
