import { createBrowserRouter, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/Home/HomePage';
import { LoginPage } from '../pages/Auth/LoginPage';
import { RegisterPage } from '../pages/Auth/RegisterPage';
import { CandidateDashboard } from '../pages/Candidate/CandidateDashboard';
import { ResumePage } from '../pages/Candidate/ResumePage';
import { ApplicationsPage } from '../pages/Candidate/ApplicationsPage';
import { RecruiterDashboard } from '../pages/Recruiter/RecruiterDashboard';
import { RecruiterJobsPage } from '../pages/Recruiter/RecruiterJobsPage';
import { CandidatesPage } from '../pages/Recruiter/CandidatesPage';
import { AdminDashboard } from '../pages/Admin/AdminDashboard';
import { UsersPage } from '../pages/Admin/UsersPage';
import { JobsPage } from '../pages/Jobs/JobsPage';
import { JobDetailPage } from '../pages/Jobs/JobDetailPage';
import { SettingsPage } from '../pages/SettingsPage';
import { ProtectedRoute } from './ProtectedRoute';
import { NotFoundPage } from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/jobs', element: <JobsPage /> },
  { path: '/jobs/:id', element: <JobDetailPage /> },
  { element: <ProtectedRoute roles={['candidate']} />, children: [
    { path: '/candidate', element: <CandidateDashboard /> },
    { path: '/candidate/resume', element: <ResumePage /> },
    { path: '/candidate/applications', element: <ApplicationsPage /> },
  ] },
  { element: <ProtectedRoute roles={['recruiter']} />, children: [
    { path: '/recruiter', element: <RecruiterDashboard /> },
    { path: '/recruiter/jobs', element: <RecruiterJobsPage /> },
    { path: '/recruiter/candidates', element: <CandidatesPage /> },
  ] },
  { element: <ProtectedRoute roles={['admin']} />, children: [
    { path: '/admin', element: <AdminDashboard /> },
    { path: '/admin/users', element: <UsersPage /> },
  ] },
  { element: <ProtectedRoute />, children: [{ path: '/settings', element: <SettingsPage /> }] },
  { path: '/dashboard', element: <Navigate to="/candidate" replace /> },
  { path: '*', element: <NotFoundPage /> },
]);
