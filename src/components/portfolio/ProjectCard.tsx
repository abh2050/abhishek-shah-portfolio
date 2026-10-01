import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import type { Project } from '@/content/types';
import { getAsset } from '@/content/assets';
import { assetUrl } from '@/lib/urls';
export function ProjectCard({project, index}: {project: Project; index: number}) {
  const visual = getAsset(project.visuals[0]);
  const img = visual.outputs[0];
  return <article className="project-card">
    <div className="card-topline"><span>{String(index + 1).padStart(2, '0')} / {project.category}</span><ArrowUpRight size={19} aria-hidden="true"/></div>
    <Link to={`/projects/${project.slug}`} className="card-visual" tabIndex={-1} aria-hidden="true"><img src={assetUrl(img.path)} width={img.width} height={img.height} alt="" loading="lazy" decoding="async" /></Link>
    <div className="card-body"><p className="eyebrow">{project.status}</p><h3><Link to={`/projects/${project.slug}`}>{project.title}</Link></h3><p className="card-summary">{project.summary}</p><p className="card-finding">{project.cardFinding}</p>
      <div className="card-bottom"><span className="card-stack">{project.stack.slice(0,2).join(' / ')}</span><Link to={`/projects/${project.slug}`} aria-label={`Read case study: ${project.title}`} className="text-link">Read case study <ArrowRight size={16}/></Link></div>
    </div>
  </article>;
}
