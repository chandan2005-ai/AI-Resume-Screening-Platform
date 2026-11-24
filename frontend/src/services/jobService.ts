import { api, USE_MOCK_DATA } from './api';
import { demoJobs } from '../utils/mockData';
import type { Job } from '../types';

export type JobPayload = Omit<Job, 'id' | 'postedAt' | 'applicants' | 'matchScore'>;

export const jobService = {
  async list(params?: { search?: string; workplace?: string; type?: string }): Promise<Job[]> {
    if (USE_MOCK_DATA) {
      return demoJobs.filter((job) => {
        const text = `${job.title} ${job.company} ${job.skills.join(' ')}`.toLowerCase();
        return (!params?.search || text.includes(params.search.toLowerCase()))
          && (!params?.workplace || params.workplace === 'All' || job.workplace === params.workplace)
          && (!params?.type || params.type === 'All' || job.type === params.type);
      });
    }
    const { data } = await api.get<Job[]>('/jobs', { params });
    return data;
  },
  async listMine(company?: string): Promise<Job[]> {
    if (USE_MOCK_DATA) return demoJobs.filter((job) => !company || job.company.toLowerCase() === company.toLowerCase());
    const { data } = await api.get<Job[]>('/recruiter/jobs');
    return data;
  },
  async get(id: string | number): Promise<Job> {
    if (USE_MOCK_DATA) {
      const job = demoJobs.find((item) => String(item.id) === String(id));
      if (!job) throw new Error('Job not found.');
      return job;
    }
    const { data } = await api.get<Job>(`/jobs/${id}`);
    return data;
  },
  async create(payload: JobPayload): Promise<Job> {
    if (USE_MOCK_DATA) {
      const job: Job = { ...payload, id: Date.now(), postedAt: 'Just now', applicants: 0, status: 'Active' };
      demoJobs.unshift(job);
      return job;
    }
    const { data } = await api.post<Job>('/jobs', payload);
    return data;
  },
};
