import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, CalendarDays, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { jobService } from '../../services/jobService';
import { applicationService } from '../../services/applicationService';
import { Loading } from '../../components/common/Loading';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { PageHeader } from '../../components/common/PageHeader';
import { useAuth } from '../../hooks/useAuth';

export function JobDetailPage() {
  const { id = '' } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: job, isLoading, error } = useQuery({ queryKey: ['job', id], queryFn: () => jobService.get(id) });
  const applyMutation = useMutation({ mutationFn: () => applicationService.apply(id), onSuccess: () => { toast.success('Application submitted successfully.'); queryClient.invalidateQueries({ queryKey: ['applications'] }); }, onError: (e) => toast.error(e instanceof Error ? e.message : 'Could not apply.') });
  if (isLoading) return <Loading />;
  if (!job || error) return <Card><h2>Job not found</h2><Link to="/jobs">Back to jobs</Link></Card>;
  return <><Link to="/jobs" className="back-home"><ArrowLeft size={15} /> Back to opportunities</Link><div className="job-detail-layout"><div><div className="job-detail-heading"><div className="company-logo logo-blue big-logo">{job.company[0]}</div><div><div className="eyebrow">{job.company.toUpperCase()}</div><h1>{job.title}</h1><p>{job.company} · {job.location}</p></div></div><div className="job-detail-meta"><span><MapPin size={15} />{job.location}</span><span><BriefcaseBusiness size={15} />{job.type}</span><span><CalendarDays size={15} />Posted {job.postedAt}</span></div><Card className="job-description-card"><div className="eyebrow">ABOUT THE ROLE</div><h2>What you’ll do</h2><p>{job.description}</p><h2>What we’re looking for</h2><p>We’re looking for a curious, collaborative person who enjoys solving problems and learning new things. You should be comfortable working with a team and communicating your ideas clearly.</p><h2>Skills and experience</h2><div className="detected-skills">{job.skills.map((skill) => <Badge key={skill} tone="blue">{skill}</Badge>)}</div></Card></div><div className="job-detail-aside"><Card className="apply-card"><div className="eyebrow">JOB OVERVIEW</div><div className="salary-block"><span>Compensation</span><strong>{job.salary}</strong></div><div className="overview-row"><span>Experience</span><strong>{job.experience}</strong></div><div className="overview-row"><span>Work arrangement</span><strong>{job.workplace}</strong></div><div className="overview-row"><span>Applicants</span><strong>{job.applicants}</strong></div>{typeof job.matchScore === 'number' && <div className="match-insight"><div><Sparkles size={16} /> Your profile match</div><strong>{job.matchScore}%</strong><div className="progress-track"><div style={{ width: `${job.matchScore}%` }} /></div><small>Your skills align with several requirements for this role.</small></div>}{user?.role === 'candidate' ? <Button block loading={applyMutation.isPending} onClick={() => applyMutation.mutate()}>Apply for this role <ArrowUpRight size={16} /></Button> : <Link to="/login"><Button block>Sign in to apply</Button></Link>}<span className="secure-note"><CheckCircle2 size={13} /> Your application is private and secure</span></Card></div></div><PageHeader title="Similar opportunities" description="Explore other roles that may be a good fit." /><div className="similar-jobs"><Link to="/jobs">Explore all open roles <ArrowUpRight size={16} /></Link></div></>;
}
