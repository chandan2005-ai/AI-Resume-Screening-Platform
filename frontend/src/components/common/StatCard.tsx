import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card } from '../ui/Card';

export function StatCard({ label, value, change, icon: Icon, tone = 'blue' }: { label: string; value: string; change?: string; icon: LucideIcon; tone?: 'blue' | 'green' | 'purple' | 'orange' }) {
  return <Card className="stat-card">
    <div className={`stat-icon stat-${tone}`}><Icon size={19} /></div>
    <div className="stat-content"><span className="muted small">{label}</span><strong>{value}</strong>{change && <span className="stat-change"><ArrowUpRight size={13} /> {change}</span>}</div>
  </Card>;
}
