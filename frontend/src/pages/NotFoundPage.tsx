import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
export function NotFoundPage() { return <div className="not-found"><div className="eyebrow">404 · PAGE NOT FOUND</div><h1>Looks like this path took a detour.</h1><p>The page you’re looking for may have moved or no longer exists.</p><Link to="/"><Button>Back to home</Button></Link></div>; }
