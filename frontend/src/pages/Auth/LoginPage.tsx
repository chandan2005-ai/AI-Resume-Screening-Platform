import type { FormEvent } from 'react';
import { useState } from 'react';
import { ArrowLeft, BriefcaseBusiness, Eye, EyeOff, LockKeyhole, Mail, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/Button';
import type { UserRole } from '../../types';
import { roleHomePath } from '../../features/authentication/roleHome';

export function LoginPage() {
  const [email, setEmail] = useState('candidate@demo.com');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState<UserRole>('candidate');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const user = await login({ email, password, role });
      toast.success(`Welcome back, ${user.name.split(' ')[0]}!`);
      navigate(roleHomePath(user.role));
    } catch (error) { toast.error(error instanceof Error ? error.message : 'Unable to sign in.'); }
  };

  return <div className="auth-page"><div className="auth-side-panel"><Link to="/" className="brand auth-brand"><span className="brand-mark"><BriefcaseBusiness size={18} /></span>talent<span className="brand-accent">match</span></Link><div className="auth-side-content"><div className="hero-pill"><Sparkles size={14} /> YOUR CAREER, IN FOCUS</div><h2>Good things happen when the <span>right people connect.</span></h2><p>Find opportunities that value what you bring to the table.</p><div className="auth-side-stat"><strong>96%</strong><span>sample profile-to-role match</span></div></div><span className="auth-side-footer">TalentMatch · Intelligent hiring, human potential.</span></div><div className="auth-main"><div className="auth-form-wrap"><Link to="/" className="back-home"><ArrowLeft size={15} /> Back to home</Link><div className="auth-heading"><div className="eyebrow">WELCOME BACK</div><h1>Sign in to your account</h1><p>Pick up right where you left off.</p></div><div className="role-tabs">{(['candidate', 'recruiter', 'admin'] as UserRole[]).map((item) => <button key={item} className={role === item ? 'selected' : ''} onClick={() => { setRole(item); setEmail(item === 'candidate' ? 'candidate@demo.com' : item === 'recruiter' ? 'recruiter@demo.com' : 'admin@demo.com'); }}>{item}</button>)}</div><form onSubmit={submit} className="auth-form"><label>Email address</label><div className="input-wrap"><Mail size={17} /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required /></div><label>Password</label><div className="input-wrap"><LockKeyhole size={17} /><input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required minLength={6} /><button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div><div className="form-extra"><label className="remember-label"><input type="checkbox" defaultChecked /> Remember me</label><a href="#help" onClick={(e) => { e.preventDefault(); toast.info('Password reset can be connected to your backend.'); }}>Forgot password?</a></div><Button type="submit" block loading={loading}>Sign in <ArrowLeft className="rotate-180" size={16} /></Button></form><div className="auth-switch">New to TalentMatch? <Link to="/register">Create an account</Link></div><div className="demo-note"><strong>Demo access</strong><span>Use the prefilled email and any password (6+ characters). Switch role above to preview each workspace.</span></div></div></div></div>;
}
