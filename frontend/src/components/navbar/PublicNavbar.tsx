import { Link, NavLink } from 'react-router-dom';
import { ArrowUpRight, BriefcaseBusiness } from 'lucide-react';
import { Button } from '../ui/Button';

export function PublicNavbar() {
  return <header className="public-nav"><Link to="/" className="brand"><span className="brand-mark"><BriefcaseBusiness size={19} /></span><span>talent<span className="brand-accent">match</span></span></Link><nav><NavLink to="/jobs">Find jobs</NavLink><a href="/#how-it-works">How it works</a></nav><div className="nav-actions"><Link to="/login" className="nav-login">Log in</Link><Link to="/register"><Button size="sm">Get started <ArrowUpRight size={15} /></Button></Link></div></header>;
}
