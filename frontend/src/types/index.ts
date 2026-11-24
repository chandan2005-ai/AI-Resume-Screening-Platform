export type UserRole = 'candidate' | 'recruiter' | 'admin';

export interface User {
  id: number | string;
  name: string;
  email: string;
  role: UserRole;
  company?: string;
  avatar?: string;
  status?: 'active' | 'pending' | 'blocked';
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface Job {
  id: number | string;
  title: string;
  company: string;
  location: string;
  workplace: 'Remote' | 'Hybrid' | 'On-site';
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  salary: string;
  experience: string;
  description: string;
  skills: string[];
  postedAt: string;
  applicants: number;
  matchScore?: number;
  status?: 'Active' | 'Closed' | 'Draft';
}

export interface Application {
  id: number | string;
  jobId: number | string;
  jobTitle: string;
  company: string;
  appliedAt: string;
  status: 'Applied' | 'Under Review' | 'Shortlisted' | 'Interview' | 'Rejected' | 'Hired';
  matchScore: number;
}

export interface ResumeAnalysis {
  fileName: string;
  uploadedAt: string;
  skills: string[];
  experience: string;
  summary: string;
}

export interface Candidate {
  id: number | string;
  applicationId?: number | string;
  name: string;
  email: string;
  jobTitle: string;
  matchScore: number;
  skills: string[];
  appliedAt: string;
  status: Application['status'];
}

export interface DashboardStats {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}
