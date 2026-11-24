import type { Candidate } from '../../types';

export function rankCandidates(candidates: Candidate[]) {
  return [...candidates].sort((a, b) => b.matchScore - a.matchScore);
}
