import { createContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { User, UserRole } from '../types';
import { authService, type LoginPayload, type RegisterPayload } from '../services/authService';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (payload: LoginPayload) => Promise<User>;
  register: (payload: RegisterPayload) => Promise<User>;
  logout: () => void;
  hasRole: (...roles: UserRole[]) => boolean;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('tm_user');
    return saved ? JSON.parse(saved) as User : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('tm_access_token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) localStorage.setItem('tm_user', JSON.stringify(user));
    else localStorage.removeItem('tm_user');
  }, [user]);

  const login = async (payload: LoginPayload) => {
    setLoading(true);
    try {
      const result = await authService.login(payload);
      setToken(result.access_token);
      setUser(result.user);
      localStorage.setItem('tm_access_token', result.access_token);
      return result.user;
    } finally { setLoading(false); }
  };

  const register = async (payload: RegisterPayload) => {
    setLoading(true);
    try {
      const result = await authService.register(payload);
      setToken(result.access_token);
      setUser(result.user);
      localStorage.setItem('tm_access_token', result.access_token);
      return result.user;
    } finally { setLoading(false); }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('tm_access_token');
    localStorage.removeItem('tm_user');
  };

  const value = useMemo<AuthContextValue>(() => ({
    user, token, loading, login, register, logout,
    hasRole: (...roles) => Boolean(user && roles.includes(user.role)),
  }), [user, token, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
