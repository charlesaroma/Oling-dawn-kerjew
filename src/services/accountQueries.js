import { useMutation } from '@tanstack/react-query';
import api from './api';

export function useUpdateAccount() {
  return useMutation({
    mutationFn: async (patch) => {
      const { data } = await api.patch('/api/users/me', patch);
      return data;
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post('/api/auth/change-password', payload);
      return data;
    },
  });
}
