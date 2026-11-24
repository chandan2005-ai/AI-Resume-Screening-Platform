import { BriefcaseBusiness, CalendarDays, ExternalLink, Search } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import { Loading } from '../../components/common/Loading';
import { applicationStatusTone } from '../../features/applications/statusTone';
import { useApplications } from '../../hooks/useApplications';

export function ApplicationsPage() {
  const { data: applications = [], isLoading } = useApplications();
  return <><PageHeader eyebrow="YOUR JOB JOURNEY" title="My applications" description="Keep track of every opportunity you’ve applied for." /><div className="application-summary"><Card><span>Total applications</span><strong>{applications.length.toString().padStart(2, '0')}</strong></Card><Card><span>In progress</span><strong>{applications.filter((a) => ['Applied', 'Under Review', 'Shortlisted', 'Interview'].includes(a.status)).length.toString().padStart(2, '0')}</strong></Card><Card><span>Shortlisted</span><strong>{applications.filter((a) => a.status === 'Shortlisted').length.toString().padStart(2, '0')}</strong></Card></div><Card className="table-card"><div className="table-heading"><div><h2>Application history</h2><p>Your latest application activity</p></div><div className="table-filter"><Search size={15} /><span>All applications</span></div></div>{isLoading ? <Loading /> : applications.length === 0 ? <EmptyState title="No applications yet" description="Explore open jobs and apply to opportunities that match your skills." /> : <div className="responsive-table"><table><thead><tr><th>POSITION</th><th>DATE APPLIED</th><th>MATCH SCORE</th><th>STATUS</th><th /></tr></thead><tbody>{applications.map((app) => <tr key={app.id}><td><div className="table-primary"><div className="company-logo logo-blue">{app.company[0]}</div><div><strong>{app.jobTitle}</strong><span>{app.company}</span></div></div></td><td><span className="table-date"><CalendarDays size={14} />{app.appliedAt}</span></td><td><strong className="match-number">{app.matchScore}%</strong></td><td><Badge tone={applicationStatusTone(app.status)}>{app.status}</Badge></td><td><button className="icon-button" aria-label="View application"><ExternalLink size={16} /></button></td></tr>)}</tbody></table></div>}</Card></>;
}
