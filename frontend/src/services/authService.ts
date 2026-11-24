import { api, USE_MOCK_DATA } from './api';
import { demoUsers } from '../utils/mockData';
import type { AuthResponse, User, UserRole } from '../types';

export interface LoginPayload { email: string; password: string; role?: UserRole }
export interface RegisterPayload { name: string; email: string; password: string; role: 'candidate' | 'recruiter'; company?: string }

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    if (USE_MOCK_DATA) {
      const user = demoUsers.find((item) => item.email.toLowerCase() === payload.email.toLowerCase())
        || { id: Date.now(), name: payload.email.split('@')[0], email: payload.email, role: payload.role || 'candidate' } as User;
      if (payload.role && user.role !== payload.role) throw new Error(`This account is registered as ${user.role}.`);
      return { access_token: 'demo-token-' + user.id, user };
    }
    const { data } = await api.post<AuthResponse>('/auth/login', payload);
    return data;
  },
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    if (USE_MOCK_DATA) {
      const user: User = { id: Date.now(), name: payload.name, email: payload.email, role: payload.role, company: payload.company, status: 'pending' };
      return { access_token: 'demo-token-' + user.id, user };
    }
    const { data } = await api.post<AuthResponse>('/auth/register', payload);
    return data;
  },
  async me(): Promise<User> {
    const { data } = await api.get<User>('/auth/me');
    return data;
  },
};
