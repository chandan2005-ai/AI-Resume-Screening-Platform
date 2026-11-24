import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Search, UserCheck, UserX } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { adminService } from '../../services/adminService';

export function UsersPage() {
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();
  const { data: users = [] } = useQuery({ queryKey: ['admin-users'], queryFn: adminService.users });
  const mutation = useMutation({ mutationFn: ({ id, status }: { id: number | string; status: 'active' | 'blocked' }) => adminService.updateUserStatus(id, status), onSuccess: () => { toast.success('User status updated.'); queryClient.invalidateQueries({ queryKey: ['admin-users'] }); } });
  const filtered = users.filter((user) => `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(search.toLowerCase()));
  return <><PageHeader eyebrow="ADMINISTRATION" title="User management" description="Review accounts and manage access across the platform." /><div className="users-summary"><Card><span>All users</span><strong>{users.length.toString().padStart(2, '0')}</strong></Card><Card><span>Active</span><strong>{users.filter((u) => u.status === 'active').length.toString().padStart(2, '0')}</strong></Card><Card><span>Pending review</span><strong>{users.filter((u) => u.status === 'pending').length.toString().padStart(2, '0')}</strong></Card></div><Card className="table-card"><div className="table-heading"><div><h2>Platform accounts</h2><p>Search, review and update user access</p></div><div className="search-field table-search"><Search size={15} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users" /></div></div><div className="responsive-table"><table><thead><tr><th>USER</th><th>ROLE</th><th>ORGANIZATION</th><th>STATUS</th><th>ACCESS</th></tr></thead><tbody>{filtered.map((user) => <tr key={user.id}><td><div className="table-primary"><div className="avatar">{user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</div><div><strong>{user.name}</strong><span>{user.email}</span></div></div></td><td><Badge tone={user.role === 'admin' ? 'purple' : user.role === 'recruiter' ? 'blue' : 'neutral'}>{user.role}</Badge></td><td>{user.company || '—'}</td><td><Badge tone={user.status === 'active' ? 'green' : user.status === 'pending' ? 'amber' : 'red'}>{user.status || 'active'}</Badge></td><td><div className="access-actions"><Button size="sm" variant="outline" onClick={() => mutation.mutate({ id: user.id, status: 'active' })} disabled={user.status === 'active'}><UserCheck size={13} /> Activate</Button><Button size="sm" variant="ghost" onClick={() => mutation.mutate({ id: user.id, status: 'blocked' })} disabled={user.status === 'blocked' || user.role === 'admin'}><UserX size={13} /> Block</Button></div></td></tr>)}</tbody></table></div></Card></>;
}
