import { useCallback, useEffect, useState } from 'react';
import { AuthContext } from './useAuth';

// api.js (axios) is dynamically imported below instead of statically —
// AuthProvider is mounted un-lazily at the app root, so a static import
// would pull axios into the public marketing site's bundle for every
// visitor, even though only the admin dashboard ever needs it.

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setIsLoading(false);
      return;
    }
    import('../services/api').then(({ default: api }) =>
      api
        .get('/api/users/me')
        .then(({ data }) => setUser(data))
        .catch(() => localStorage.removeItem('accessToken'))
        .finally(() => setIsLoading(false)),
    );
  }, []);

  const login = useCallback(async ({ email, password, rememberMe }) => {
    const { default: api } = await import('../services/api');
    const { data } = await api.post('/api/auth/login', { email, password, rememberMe });
    localStorage.setItem('accessToken', data.accessToken);
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      const { default: api } = await import('../services/api');
      await api.post('/api/auth/logout');
    } finally {
      localStorage.removeItem('accessToken');
      setUser(null);
    }
  }, []);

  const value = { user, isAuthenticated: !!user, isLoading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
