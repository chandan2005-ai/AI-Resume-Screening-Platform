import { api, USE_MOCK_DATA } from './api';
import { demoUsers } from '../utils/mockData';
import type { User } from '../types';

export const adminService = {
  async users(): Promise<User[]> {
    if (USE_MOCK_DATA) return demoUsers.map((item) => ({ ...item }));
    const { data } = await api.get<User[]>('/admin/users');
    return data;
  },
  async updateUserStatus(id: number | string, status: 'active' | 'blocked'): Promise<void> {
    if (USE_MOCK_DATA) {
      const user = demoUsers.find((item) => String(item.id) === String(id));
      if (user) user.status = status;
      return;
    }
    await api.patch(`/admin/users/${id}/status`, { status });
  },
};
