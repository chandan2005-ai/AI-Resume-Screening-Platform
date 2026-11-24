import { useState } from 'react';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { JobCard } from '../../components/common/JobCard';
import { Loading } from '../../components/common/Loading';
import { EmptyState } from '../../components/common/EmptyState';
import { useJobs } from '../../hooks/useJobs';

export function JobsPage() {
  const [search, setSearch] = useState('');
  const [workplace, setWorkplace] = useState('All');
  const [type, setType] = useState('All');
  const { data: jobs = [], isLoading } = useJobs(search, workplace, type);
  return <><PageHeader eyebrow="EXPLORE OPPORTUNITIES" title="Find your next role." description="Discover opportunities that align with your skills, interests and ambitions." /><div className="job-search-panel"><div className="search-field"><Search size={18} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Job title, company or skill" /></div><div className="filter-field"><MapPin size={16} /><select defaultValue="All locations"><option>All locations</option><option>Bengaluru</option><option>Remote</option></select></div><button className="filter-trigger"><SlidersHorizontal size={16} /> Filters</button></div><div className="job-results-heading"><div><h2>Open opportunities</h2><p>{jobs.length} roles match your search</p></div><div className="select-filters"><select value={workplace} onChange={(e) => setWorkplace(e.target.value)}><option>All</option><option>Remote</option><option>Hybrid</option><option>On-site</option></select><select value={type} onChange={(e) => setType(e.target.value)}><option>All</option><option>Full-time</option><option>Part-time</option><option>Internship</option><option>Contract</option></select></div></div>{isLoading ? <Loading /> : jobs.length ? <div className="jobs-grid">{jobs.map((job) => <JobCard key={job.id} job={job} />)}</div> : <EmptyState title="No matching roles found" description="Try adjusting your search terms or filters to discover more opportunities." />}</>;
}
