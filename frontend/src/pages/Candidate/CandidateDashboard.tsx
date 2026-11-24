import { useQuery } from '@tanstack/react-query';
import { ArrowRight, BriefcaseBusiness, FileCheck2, FileUp, Sparkles, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { JobCard } from '../../components/common/JobCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../hooks/useAuth';
import { jobService } from '../../services/jobService';
import { applicationService } from '../../services/applicationService';
import { greeting } from '../../utils/format';

export function CandidateDashboard() {
  const { user } = useAuth();
  const { data: jobs = [] } = useQuery({ queryKey: ['jobs'], queryFn: () => jobService.list() });
  const { data: applications = [] } = useQuery({ queryKey: ['applications'], queryFn: applicationService.listMine });
  const recommended = [...jobs].sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0)).slice(0, 3);
  const firstName = user?.name.split(' ')[0] || 'there';

  return <><PageHeader eyebrow="CANDIDATE WORKSPACE" title={`${greeting()}, ${firstName}.`} description="Here’s what’s happening with your career journey today." action={<Link to="/candidate/resume"><Button><FileUp size={16} /> Update resume</Button></Link>} />
    <div className="stats-grid"><StatCard label="Recommended jobs" value="18" change="4 new this week" icon={Target} tone="blue" /><StatCard label="Applications sent" value={String(applications.length).padStart(2, '0')} change="Keep the momentum" icon={BriefcaseBusiness} tone="purple" /><StatCard label="Profile strength" value="88%" change="Up 12% this month" icon={TrendingUp} tone="green" /><StatCard label="Shortlisted" value="02" change="Great progress" icon={FileCheck2} tone="orange" /></div>
    <div className="dashboard-grid dashboard-grid-main"><div className="dashboard-column"><div className="section-title-row"><div><div className="eyebrow">CURATED FOR YOU</div><h2>Top job matches</h2></div><Link to="/jobs" className="text-link">Explore all <ArrowRight size={15} /></Link></div><div className="recommended-jobs">{recommended.map((job) => <JobCard key={job.id} job={job} />)}</div></div>
      <div className="dashboard-column side-column"><Card className="resume-status-card"><div className="card-heading"><div><div className="eyebrow">YOUR PROFILE</div><h3>Resume readiness</h3></div><div className="round-icon"><Sparkles size={18} /></div></div><div className="readiness-score"><strong>88<span>%</span></strong><Badge tone="green">Strong profile</Badge></div><div className="progress-track"><div style={{ width: '88%' }} /></div><p>Your profile is looking good. Add a project or certification to make it even stronger.</p><Link to="/candidate/resume" className="text-link">Improve profile <ArrowRight size={15} /></Link></Card>
      <Card className="activity-card"><div className="card-heading"><div><div className="eyebrow">RECENT ACTIVITY</div><h3>Application updates</h3></div><span className="live-dot" /></div>{applications.slice(0, 3).map((app) => <div className="activity-item" key={app.id}><div className="activity-logo">{app.company[0]}</div><div className="activity-text"><strong>{app.jobTitle}</strong><span>{app.company} · {app.appliedAt}</span></div><Badge tone={app.status === 'Shortlisted' ? 'green' : app.status === 'Under Review' ? 'blue' : 'neutral'}>{app.status}</Badge></div>)}<Link to="/candidate/applications" className="activity-link">View applications <ArrowRight size={14} /></Link></Card>
      <Card className="quick-tip"><div className="tip-icon"><Sparkles size={17} /></div><div><strong>A little tip</strong><p>Tailor the top skills in your resume to the role you’re applying for.</p></div></Card></div></div>
  </>;
}
