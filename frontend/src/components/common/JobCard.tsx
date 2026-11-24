import { ArrowUpRight, Bookmark, BriefcaseBusiness, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Job } from '../../types';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { matchLabel } from '../../features/job-matching/matchLabel';

export function JobCard({ job }: { job: Job }) {
  return <Card className="job-card"><div className="job-card-top"><div className="company-logo logo-blue">{job.company[0]}</div><button className="icon-button save-button" aria-label="Save job"><Bookmark size={17} /></button></div><div className="job-title-row"><div><h3>{job.title}</h3><p>{job.company}</p></div>{typeof job.matchScore === 'number' && <div className="job-match"><strong>{job.matchScore}%</strong><span>{matchLabel(job.matchScore || 0)}</span></div>}</div><div className="job-quick-meta"><span><MapPin size={14} />{job.location}</span><span><BriefcaseBusiness size={14} />{job.type}</span></div><div className="job-skills">{job.skills.slice(0, 3).map((skill) => <Badge key={skill}>{skill}</Badge>)}{job.skills.length > 3 && <Badge>+{job.skills.length - 3}</Badge>}</div><div className="job-card-footer"><div><strong>{job.salary}</strong><small>{job.postedAt}</small></div><Link to={`/jobs/${job.id}`} className="arrow-link" aria-label={`View ${job.title}`}><ArrowUpRight size={18} /></Link></div></Card>;
}
