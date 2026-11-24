import type { Application, Candidate, Job, User } from '../types';

export const demoUsers: User[] = [
  { id: 1, name: 'Aarav Sharma', email: 'candidate@demo.com', role: 'candidate', status: 'active' },
  { id: 2, name: 'Priya Nair', email: 'recruiter@demo.com', role: 'recruiter', company: 'Northstar Labs', status: 'active' },
  { id: 3, name: 'Platform Admin', email: 'admin@demo.com', role: 'admin', status: 'active' },
];

export const demoJobs: Job[] = [
  { id: 101, title: 'Junior Data Analyst', company: 'Northstar Labs', location: 'Bengaluru, India', workplace: 'Hybrid', type: 'Full-time', salary: '₹5–7 LPA', experience: '0–1 years', description: 'Help our product and business teams turn data into clear, actionable insights. You will clean datasets, build dashboards and communicate findings to stakeholders.', skills: ['Python', 'SQL', 'Excel', 'Power BI', 'Pandas'], postedAt: '2 days ago', applicants: 38, matchScore: 96, status: 'Active' },
  { id: 102, title: 'Python Developer Intern', company: 'PixelForge', location: 'Remote, India', workplace: 'Remote', type: 'Internship', salary: '₹15,000–20,000 / month', experience: 'Fresher', description: 'Work with our engineering team to build and test Python services, integrate APIs and write clean, maintainable code.', skills: ['Python', 'Flask', 'REST APIs', 'Git', 'MySQL'], postedAt: '1 day ago', applicants: 64, matchScore: 92, status: 'Active' },
  { id: 103, title: 'Machine Learning Associate', company: 'Aster AI', location: 'Hyderabad, India', workplace: 'On-site', type: 'Full-time', salary: '₹6–9 LPA', experience: '0–2 years', description: 'Support experimentation and deployment of machine learning solutions. Collaborate with data engineers and product teams.', skills: ['Python', 'Scikit-learn', 'Machine Learning', 'NumPy', 'SQL'], postedAt: '4 days ago', applicants: 51, matchScore: 88, status: 'Active' },
  { id: 104, title: 'Frontend Developer Intern', company: 'BrightStack', location: 'Bengaluru, India', workplace: 'Hybrid', type: 'Internship', salary: '₹12,000–18,000 / month', experience: 'Fresher', description: 'Build thoughtful user interfaces with React and TypeScript. Work closely with design and backend teams.', skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'REST APIs'], postedAt: '5 days ago', applicants: 29, matchScore: 74, status: 'Active' },
  { id: 105, title: 'Business Intelligence Intern', company: 'MetricWorks', location: 'Pune, India', workplace: 'Remote', type: 'Internship', salary: '₹10,000–15,000 / month', experience: 'Fresher', description: 'Help maintain reports, investigate trends and create concise data stories for internal teams.', skills: ['Power BI', 'SQL', 'Excel', 'Data Analysis'], postedAt: '1 week ago', applicants: 22, matchScore: 83, status: 'Active' },
  { id: 106, title: 'Backend Engineer', company: 'CloudNine', location: 'Chennai, India', workplace: 'On-site', type: 'Full-time', salary: '₹7–10 LPA', experience: '1–2 years', description: 'Develop reliable backend services and APIs with Python. Improve application performance and data reliability.', skills: ['Python', 'Flask', 'MySQL', 'Docker', 'REST APIs'], postedAt: '1 week ago', applicants: 47, matchScore: 81, status: 'Active' },
];

export const demoApplications: Application[] = [
  { id: 501, jobId: 101, jobTitle: 'Junior Data Analyst', company: 'Northstar Labs', appliedAt: 'Nov 21, 2026', status: 'Shortlisted', matchScore: 96 },
  { id: 502, jobId: 102, jobTitle: 'Python Developer Intern', company: 'PixelForge', appliedAt: 'Nov 19, 2026', status: 'Under Review', matchScore: 92 },
  { id: 503, jobId: 105, jobTitle: 'Business Intelligence Intern', company: 'MetricWorks', appliedAt: 'Nov 15, 2026', status: 'Applied', matchScore: 83 },
];

export const demoCandidates: Candidate[] = [
  { id: 1, name: 'Aarav Sharma', email: 'aarav@example.com', jobTitle: 'Junior Data Analyst', matchScore: 96, skills: ['Python', 'SQL', 'Power BI', 'Pandas'], appliedAt: 'Nov 21, 2026', status: 'Shortlisted' },
  { id: 2, name: 'Meera Iyer', email: 'meera@example.com', jobTitle: 'Junior Data Analyst', matchScore: 91, skills: ['SQL', 'Excel', 'Tableau', 'Python'], appliedAt: 'Nov 20, 2026', status: 'Under Review' },
  { id: 3, name: 'Kabir Das', email: 'kabir@example.com', jobTitle: 'Python Developer Intern', matchScore: 89, skills: ['Python', 'Flask', 'MySQL', 'Git'], appliedAt: 'Nov 19, 2026', status: 'Applied' },
  { id: 4, name: 'Ananya Rao', email: 'ananya@example.com', jobTitle: 'Junior Data Analyst', matchScore: 84, skills: ['Power BI', 'SQL', 'Data Analysis'], appliedAt: 'Nov 18, 2026', status: 'Interview' },
];
