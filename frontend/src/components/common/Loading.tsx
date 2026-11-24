import { LoaderCircle } from 'lucide-react';
export function Loading({ label = 'Loading your workspace…' }: { label?: string }) {
  return <div className="loading-state"><LoaderCircle className="spin" size={22} /><span>{label}</span></div>;
}
