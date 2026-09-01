import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import AuthSplitShell from './AuthSplitShell';
import FloatingInput from './FloatingInput';
import { login } from '../../services/authService';
import api from '../../services/api';

export default function Login() {
  const navigate = useNavigate();
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
        const { data } = await api.post('/api/auth/login', { email: form.email, password: form.password });
        localStorage.setItem('accessToken', data.accessToken);
      } catch (apiErr) {
        console.error('Backend login failed — Gallery will be unavailable until this succeeds:', apiErr);
      }

      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
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

      <div className="mt-8 rounded border border-gold-200 bg-gold-50 px-4 py-3 text-[11px] leading-relaxed text-forest-800">
        Demo dashboard access. Email <span className="font-mono">admin@odkhc.local</span>, password{' '}
        <span className="font-mono">odkhc-admin-2026</span>. Replace with real authentication before launch.
      </div>
    </AuthSplitShell>
  );
}
