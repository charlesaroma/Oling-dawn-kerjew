import { useQuery } from '@tanstack/react-query';
import api from './api';

const EMPTY = [];

export function useAuditLogs() {
  return useQuery({
    queryKey: ['auditLogs'],
    queryFn: async () => {
      const { data } = await api.get('/api/audit-logs');
      return data;
    },
    initialData: EMPTY,
  });
}
