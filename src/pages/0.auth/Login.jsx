import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const submit = async (e) => {
    e.preventDefault();
    try {
      login(form);

      // Best-effort: also sign in against the real backend so Gallery's media
      // library (the only feature wired to it so far) has a token to work with.
      // A failure here shouldn't block access to the rest of the dashboard,
      // which still runs entirely on localStorage.
      try {
        await apiLogin({ email: form.email, password: form.password });
      } catch (apiErr) {
        console.error('Backend login failed — Gallery will be unavailable until this succeeds:', apiErr);
      }

      addToast('Welcome back! Signed in successfully.', 'success');
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
          type="password"
          required
          autoComplete="current-password"
          value={form.password}
          onChange={(e) => { setForm({ ...form, password: e.target.value }); setError(''); }}
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
