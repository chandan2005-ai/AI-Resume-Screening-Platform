import type { Application } from '../../types';

export function applicationStatusTone(status: Application['status']): 'neutral' | 'green' | 'blue' | 'amber' | 'red' | 'purple' {
  if (status === 'Shortlisted' || status === 'Hired') return 'green';
  if (status === 'Interview') return 'purple';
  if (status === 'Under Review') return 'blue';
  if (status === 'Rejected') return 'red';
  return 'neutral';
}
