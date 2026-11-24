import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Download, Search, SlidersHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { applicationService } from '../../services/applicationService';
import type { Application } from '../../types';
import { rankCandidates } from '../../features/recruitment/candidateSort';

export function CandidatesPage() {
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();
  const { data: candidates = [] } = useQuery({ queryKey: ['recruiter-candidates'], queryFn: applicationService.candidates });
  const mutation = useMutation({ mutationFn: ({ id, status }: { id: number | string; status: Application['status'] }) => applicationService.updateStatus(id, status), onSuccess: () => { toast.success('Candidate status updated.'); queryClient.invalidateQueries({ queryKey: ['recruiter-candidates'] }); } });
  const filtered = rankCandidates(candidates.filter((candidate) => `${candidate.name} ${candidate.email} ${candidate.skills.join(' ')}`.toLowerCase().includes(search.toLowerCase())));
  return <><PageHeader eyebrow="TALENT DISCOVERY" title="Candidate pipeline" description="Review applicants ranked by their skill alignment with your opportunities." action={<Button variant="secondary"><Download size={16} /> Export list</Button>} /><div className="job-search-panel"><div className="search-field"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search candidates or skills" /></div><button className="filter-trigger"><SlidersHorizontal size={16} /> Filters</button></div><Card className="table-card"><div className="table-heading"><div><h2>Matched candidates</h2><p>{filtered.length} candidates found · sorted by match score</p></div><Badge tone="green">AI ranked</Badge></div><div className="responsive-table"><table><thead><tr><th>CANDIDATE</th><th>SKILLS</th><th>MATCH</th><th>APPLIED</th><th>STATUS</th><th>UPDATE</th></tr></thead><tbody>{filtered.map((candidate) => <tr key={candidate.id}><td><div className="table-primary"><div className="avatar candidate-avatar">{candidate.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</div><div><strong>{candidate.name}</strong><span>{candidate.email}</span></div></div></td><td><div className="table-skills">{candidate.skills.slice(0, 3).map((skill) => <span key={skill}>{skill}</span>)}</div></td><td><strong className="match-number">{candidate.matchScore}%</strong></td><td>{candidate.appliedAt}</td><td><Badge tone={candidate.status === 'Shortlisted' ? 'green' : candidate.status === 'Interview' ? 'purple' : 'blue'}>{candidate.status}</Badge></td><td><select className="status-select" value={candidate.status} onChange={(e) => mutation.mutate({ id: candidate.applicationId ?? candidate.id, status: e.target.value as Application['status'] })}><option>Applied</option><option>Under Review</option><option>Shortlisted</option><option>Interview</option><option>Rejected</option><option>Hired</option></select></td></tr>)}</tbody></table></div></Card></>;
}
