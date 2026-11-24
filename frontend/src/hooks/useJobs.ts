import { useQuery } from '@tanstack/react-query';
import { jobService } from '../services/jobService';

export function useJobs(search = '', workplace = 'All', type = 'All') {
  return useQuery({ queryKey: ['jobs', search, workplace, type], queryFn: () => jobService.list({ search, workplace, type }) });
}
