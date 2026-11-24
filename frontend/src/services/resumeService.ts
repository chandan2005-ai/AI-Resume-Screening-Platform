import { api, USE_MOCK_DATA } from './api';
import type { ResumeAnalysis } from '../types';

export const resumeService = {
  async upload(file: File): Promise<ResumeAnalysis> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        fileName: file.name,
        uploadedAt: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        skills: ['Python', 'SQL', 'Data Analysis', 'React', 'Machine Learning', 'Power BI', 'Pandas'],
        experience: 'Fresher / Entry-level',
        summary: 'Your resume has been processed successfully. These skills were identified from the uploaded document. Matching recommendations are based on this sample analysis.',
      };
    }
    const body = new FormData();
    body.append('resume', file);
    const { data } = await api.post<ResumeAnalysis>('/resumes/upload', body, { headers: { 'Content-Type': 'multipart/form-data' } });
    return data;
  },
  async getLatest(): Promise<ResumeAnalysis | null> {
    if (USE_MOCK_DATA) return null;
    const { data } = await api.get<ResumeAnalysis | null>('/resumes/latest');
    return data;
  },
};
