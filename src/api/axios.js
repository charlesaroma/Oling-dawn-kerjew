import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5002',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// A 401 on an authenticated request means the stored token is missing,
// expired, or was revoked (e.g. after a "log out everywhere") — clear it
// so it isn't retried. Excludes the login/register endpoints themselves,
// where a 401 just means "wrong password" and is already handled inline
// by the login form, not a dead-session recovery case.
const AUTH_ENDPOINTS = ['/api/auth/login', '/api/auth/register'];

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthEndpoint = AUTH_ENDPOINTS.some((path) => error.config?.url?.includes(path));
    if (error.response?.status === 401 && !isAuthEndpoint) {
      localStorage.removeItem('accessToken');
      // Only force a redirect from inside the dashboard — AuthContext's
      // boot-time check also hits this on public pages, where a stale
      // token shouldn't interrupt a casual site visit.
      if (window.location.pathname.startsWith('/dashboard') && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

export default api;
