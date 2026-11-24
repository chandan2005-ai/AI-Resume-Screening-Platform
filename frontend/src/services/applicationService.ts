import { api, USE_MOCK_DATA } from './api';
import { demoApplications, demoCandidates, demoJobs } from '../utils/mockData';
import type { Application, Candidate } from '../types';

export const applicationService = {
  async listMine(): Promise<Application[]> {
    if (USE_MOCK_DATA) return demoApplications.map((item) => ({ ...item }));
    const { data } = await api.get<Application[]>('/applications/me');
    return data;
  },
  async apply(jobId: string | number): Promise<Application> {
    if (USE_MOCK_DATA) {
      const job = demoJobs.find((item) => String(item.id) === String(jobId));
      if (!job) throw new Error('Job not found.');
      if (demoApplications.some((item) => String(item.jobId) === String(jobId))) throw new Error('You have already applied for this role.');
      const application: Application = { id: Date.now(), jobId, jobTitle: job.title, company: job.company, appliedAt: new Date().toLocaleDateString('en-IN'), status: 'Applied', matchScore: job.matchScore ?? 80 };
      demoApplications.unshift(application);
      return application;
    }
    const { data } = await api.post<Application>('/applications', { job_id: jobId });
    return data;
  },
  async candidates(): Promise<Candidate[]> {
    if (USE_MOCK_DATA) return demoCandidates.map((item) => ({ ...item, skills: [...item.skills] }));
    const { data } = await api.get<Candidate[]>('/recruiter/candidates');
    return data;
  },
  async updateStatus(id: number | string, status: Application['status']): Promise<void> {
    if (USE_MOCK_DATA) {
      const candidate = demoCandidates.find((item) => String(item.id) === String(id));
      if (candidate) candidate.status = status;
      return;
    }
    await api.patch(`/recruiter/applications/${id}/status`, { status });
  },
};
