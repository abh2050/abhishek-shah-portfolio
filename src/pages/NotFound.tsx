import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageMeta } from '@/components/portfolio/Shared';
export default function NotFound() { return <div className="shell not-found"><PageMeta title="Page not found" description="This portfolio page could not be found."/><p className="eyebrow">404 / A wrong turn</p><h1>There’s good work<br/>back this way.</h1><p>This page doesn’t exist. Explore the selected projects or return to the homepage.</p><Link to="/?section=work" className="button primary">Explore selected work<ArrowRight size={17}/></Link></div>; }
