import { useQuery } from '@tanstack/react-query';
import { ArrowRight, BriefcaseBusiness, FileCheck2, Plus, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { applicationService } from '../../services/applicationService';
import { jobService } from '../../services/jobService';
import { rankCandidates } from '../../features/recruitment/candidateSort';
import { useAuth } from '../../hooks/useAuth';

export function RecruiterDashboard() {
  const { user } = useAuth();
  const { data: candidates = [] } = useQuery({ queryKey: ['recruiter-candidates'], queryFn: applicationService.candidates });
  const { data: jobs = [] } = useQuery({ queryKey: ['recruiter-jobs', user?.company], queryFn: () => jobService.listMine(user?.company) });
  return <><PageHeader eyebrow="RECRUITER WORKSPACE" title="Hiring, at a glance." description="Manage your roles and discover candidates who bring the right skills." action={<Link to="/recruiter/jobs"><Button><Plus size={16} /> Manage job posts</Button></Link>} /><div className="stats-grid"><StatCard label="Active job posts" value={String(jobs.length).padStart(2, '0')} change="Across your workspace" icon={BriefcaseBusiness} tone="blue" /><StatCard label="Total applicants" value="124" change="18 this week" icon={Users} tone="purple" /><StatCard label="Shortlisted" value="16" change="Strong matches" icon={FileCheck2} tone="green" /><StatCard label="Avg. match score" value="87%" change="+5% this month" icon={TrendingUp} tone="orange" /></div><div className="dashboard-grid recruiter-grid"><Card className="table-card"><div className="table-heading"><div><div className="eyebrow">TALENT DISCOVERY</div><h2>Top matched candidates</h2><p>Ranked by skills and experience alignment</p></div><Link to="/recruiter/candidates" className="text-link">View all <ArrowRight size={15} /></Link></div><div className="candidate-list">{rankCandidates(candidates).slice(0, 4).map((candidate) => <div className="candidate-row" key={candidate.id}><div className="avatar candidate-avatar">{candidate.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</div><div className="candidate-info"><strong>{candidate.name}</strong><span>{candidate.jobTitle} · {candidate.appliedAt}</span><div className="candidate-skill-row">{candidate.skills.slice(0, 3).map((skill) => <span key={skill}>{skill}</span>)}</div></div><div className="candidate-score"><strong>{candidate.matchScore}%</strong><span>match</span></div><Badge tone={candidate.status === 'Shortlisted' ? 'green' : 'blue'}>{candidate.status}</Badge></div>)}</div></Card><div className="dashboard-column"><Card className="recruiter-action-card"><div className="round-icon"><Plus size={18} /></div><h3>Find your next great hire.</h3><p>Create a clear job post and let intelligent matching bring relevant candidates into focus.</p><Link to="/recruiter/jobs"><Button block>Post a new job <ArrowRight size={15} /></Button></Link></Card><Card className="mini-job-card"><div className="eyebrow">YOUR OPEN ROLES</div><h3>Recently posted</h3>{jobs.slice(0, 3).map((job) => <div className="mini-job-row" key={job.id}><div><strong>{job.title}</strong><span>{job.company}</span></div><Badge tone="green">Active</Badge></div>)}<Link to="/recruiter/jobs" className="activity-link">Manage jobs <ArrowRight size={14} /></Link></Card></div></div></>;
}
