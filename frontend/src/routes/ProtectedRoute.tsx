import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { UserRole } from '../types';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';

export function ProtectedRoute({ roles }: { roles?: UserRole[] }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to={`/${user.role}`} replace />;
  return <DashboardLayout><Outlet /></DashboardLayout>;
}
