import { useCallback, useEffect, useState } from 'react';
import api from '../services/api';
import { AuthContext } from './useAuth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setIsLoading(false);
      return;
    }
    api
      .get('/api/users/me')
      .then(({ data }) => setUser(data))
      .catch(() => localStorage.removeItem('accessToken'))
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async ({ email, password, rememberMe }) => {
    const { data } = await api.post('/api/auth/login', { email, password, rememberMe });
    localStorage.setItem('accessToken', data.accessToken);
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post('/api/auth/logout');
    } finally {
      localStorage.removeItem('accessToken');
      setUser(null);
    }
  }, []);

  // Called with the fresh user row returned by PATCH /api/users/me, so the
  // sidebar/header initials update immediately without a full refetch.
  const updateUser = useCallback((patch) => {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));
  }, []);

  const value = { user, isAuthenticated: !!user, isLoading, login, logout, updateUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
