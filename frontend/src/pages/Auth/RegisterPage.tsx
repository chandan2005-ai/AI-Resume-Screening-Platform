import type { FormEvent } from 'react';
import { useState } from 'react';
import { ArrowLeft, BriefcaseBusiness, Building2, Mail, UserRound, LockKeyhole } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/Button';
import { roleHomePath } from '../../features/authentication/roleHome';

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'candidate' | 'recruiter'>('candidate');
  const [company, setCompany] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const user = await register({ name, email, password, role, company: role === 'recruiter' ? company : undefined });
      toast.success('Your account has been created.');
      navigate(roleHomePath(user.role));
    } catch (error) { toast.error(error instanceof Error ? error.message : 'Unable to create account.'); }
  };

  return <div className="auth-page"><div className="auth-side-panel"><Link to="/" className="brand auth-brand"><span className="brand-mark"><BriefcaseBusiness size={18} /></span>talent<span className="brand-accent">match</span></Link><div className="auth-side-content"><div className="hero-pill">✦ START WITH YOUR POTENTIAL</div><h2>A better career move begins with <span>one simple step.</span></h2><p>Create your profile and let better opportunities find their way to you.</p><div className="auth-benefits"><span>✓ Intelligent skill matching</span><span>✓ Clear application tracking</span><span>✓ One profile, better discovery</span></div></div><span className="auth-side-footer">TalentMatch · Intelligent hiring, human potential.</span></div><div className="auth-main"><div className="auth-form-wrap"><Link to="/" className="back-home"><ArrowLeft size={15} /> Back to home</Link><div className="auth-heading"><div className="eyebrow">CREATE YOUR PROFILE</div><h1>Join TalentMatch</h1><p>Choose how you want to use the platform.</p></div><div className="role-tabs"><button className={role === 'candidate' ? 'selected' : ''} onClick={() => setRole('candidate')}>Candidate</button><button className={role === 'recruiter' ? 'selected' : ''} onClick={() => setRole('recruiter')}>Recruiter</button></div><form className="auth-form" onSubmit={submit}><label>Full name</label><div className="input-wrap"><UserRound size={17} /><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" required /></div><label>Email address</label><div className="input-wrap"><Mail size={17} /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required /></div>{role === 'recruiter' && <><label>Company name</label><div className="input-wrap"><Building2 size={17} /><input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Your organization" required /></div></>}<label>Password</label><div className="input-wrap"><LockKeyhole size={17} /><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" minLength={8} required /></div><label className="remember-label terms-label"><input type="checkbox" required /> I agree to the Terms of Service and Privacy Policy.</label><Button type="submit" block loading={loading}>Create account <ArrowLeft className="rotate-180" size={16} /></Button></form><div className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></div><div className="demo-note"><strong>Demo mode</strong><span>Registration is simulated locally. Connect the Flask API to persist accounts and verify recruiter accounts.</span></div></div></div></div>;
}
