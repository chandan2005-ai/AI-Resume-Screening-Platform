import { useState } from 'react';
import { Bell, LockKeyhole, UserRound } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

export function SettingsPage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  return <><PageHeader eyebrow="PREFERENCES" title="Settings" description="Manage your profile and workspace preferences." /><div className="settings-layout"><Card className="settings-card"><div className="settings-section-heading"><div className="round-icon"><UserRound size={18} /></div><div><h3>Profile information</h3><p>Update the details associated with your account.</p></div></div><div className="settings-fields"><div className="form-field"><label>Full name</label><input value={name} onChange={(e) => setName(e.target.value)} /></div><div className="form-field"><label>Email address</label><input value={email} onChange={(e) => setEmail(e.target.value)} /></div><div className="form-field"><label>Account type</label><input value={user?.role || ''} disabled /></div></div><Button onClick={() => toast.info('Connect this action to your profile update API.')}>Save changes</Button></Card><Card className="settings-card"><div className="settings-section-heading"><div className="round-icon"><Bell size={18} /></div><div><h3>Notifications</h3><p>Choose what you want to hear about.</p></div></div>{['Application status updates', 'New job recommendations', 'Product and platform updates'].map((item, i) => <label className="toggle-row" key={item}><span>{item}</span><input type="checkbox" defaultChecked={i !== 2} /></label>)}</Card><Card className="settings-card"><div className="settings-section-heading"><div className="round-icon"><LockKeyhole size={18} /></div><div><h3>Security</h3><p>Keep your account protected.</p></div></div><Button variant="secondary" onClick={() => toast.info('Connect this action to your password reset API.')}>Change password</Button></Card></div></>;
}
