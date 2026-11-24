import type { UserRole } from '../../types';

export function roleHomePath(role: UserRole) {
  switch (role) {
    case 'candidate': return '/candidate';
    case 'recruiter': return '/recruiter';
    case 'admin': return '/admin';
  }
}
