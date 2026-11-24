import { Bell, Menu, Search } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { initials } from '../../utils/format';

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { user } = useAuth();
  return <header className="topbar"><button className="icon-button mobile-menu" onClick={onMenuClick}><Menu size={20} /></button><div className="topbar-search"><Search size={16} /><span>Search anything...</span><kbd>⌘ K</kbd></div><div className="topbar-right"><button className="icon-button notification-button" aria-label="Notifications"><Bell size={18} /><i /></button><div className="topbar-user"><div className="avatar">{initials(user?.name || 'User')}</div><div><strong>{user?.name}</strong><span>{user?.role}</span></div></div></div></header>;
}
