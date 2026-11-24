export function matchLabel(score: number): 'Excellent match' | 'Good match' | 'Potential match' {
  if (score >= 90) return 'Excellent match';
  if (score >= 75) return 'Good match';
  return 'Potential match';
}
