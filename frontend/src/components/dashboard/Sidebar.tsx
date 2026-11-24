import { NavLink, useNavigate } from 'react-router-dom';
import { Activity, BriefcaseBusiness, FileUser, LayoutDashboard, LogOut, Search, Settings, Users, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const navByRole = {
  candidate: [
    { label: 'Overview', to: '/candidate', icon: LayoutDashboard },
    { label: 'Find jobs', to: '/jobs', icon: Search },
    { label: 'My resume', to: '/candidate/resume', icon: FileUser },
    { label: 'Applications', to: '/candidate/applications', icon: BriefcaseBusiness },
  ],
  recruiter: [
    { label: 'Overview', to: '/recruiter', icon: LayoutDashboard },
    { label: 'My job posts', to: '/recruiter/jobs', icon: BriefcaseBusiness },
    { label: 'Candidates', to: '/recruiter/candidates', icon: Users },
  ],
  admin: [
    { label: 'Overview', to: '/admin', icon: LayoutDashboard },
    { label: 'Users', to: '/admin/users', icon: Users },
    { label: 'Jobs', to: '/jobs', icon: BriefcaseBusiness },
  ],
};

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  if (!user) return null;
  const items = navByRole[user.role];
  return <>
    {open && <button className="sidebar-scrim" onClick={onClose} aria-label="Close menu" />}
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="sidebar-brand"><span className="brand-mark"><BriefcaseBusiness size={18} /></span><span>talent<span className="brand-accent">match</span></span><button className="icon-button sidebar-close" onClick={onClose}><X size={18} /></button></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="sidebar-nav">{items.map(({ label, to, icon: Icon }) => <NavLink key={to} to={to} end={to === `/${user.role}`} onClick={onClose} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}><Icon size={18} /><span>{label}</span></NavLink>)}</nav>
      <div className="sidebar-bottom"><div className="sidebar-tip"><div className="tip-icon"><Activity size={17} /></div><strong>Make your next move</strong><p>Keep your profile updated to get more relevant matches.</p></div><button className="sidebar-link" onClick={() => navigate('/settings')}><Settings size={18} /><span>Settings</span></button><button className="sidebar-link logout-link" onClick={() => { logout(); navigate('/'); }}><LogOut size={18} /><span>Log out</span></button></div>
    </aside>
  </>;
}
