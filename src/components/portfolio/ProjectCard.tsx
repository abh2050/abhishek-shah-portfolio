import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Project } from '@/content/types';
import { getClaim } from '@/content/evidence';
import { icons } from '@/content/icons';
import { assetUrl } from '@/lib/urls';
import { repoUrl, type MoreProject } from '@/content/more-projects';

// The one recorded result each card leads with; full scope and limits are in the case study.
const headline: Record<string, string> = {
  'enterprise-rag-aws': 'rag-scenarios',
  'yieldloop-wafer-triage-with-HIL': 'yield-accuracy',
  'edge-ai-inspection-gates': 'edge-latency',
  'sentinel-ai': 'sentinel-latency',
  'fault-triage-ai': 'fault-ranker',
  'mlx-sft-pubmedqa': 'mlx-lora',
};

export function ProjectIcon({ slug, size, eager = false }: { slug: string; size: number; eager?: boolean }) {
  const icon = icons[slug];
  return <span className="icon-tile" aria-hidden="true"><img src={assetUrl(icon.path)} width={size} height={size} alt="" loading={eager ? 'eager' : 'lazy'} decoding="async" /></span>;
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const claim = getClaim(headline[project.slug] ?? project.metrics[0]);
  return <article className="project-card">
    <Link to={`/projects/${project.slug}`} className="card-visual" tabIndex={-1} aria-hidden="true"><ProjectIcon slug={project.slug} size={280} /></Link>
    <div className="card-body">
      <p className="card-meta"><span>{String(index + 1).padStart(2, '0')}</span>{project.category}</p>
      <h3><Link to={`/projects/${project.slug}`}>{project.title}</Link></h3>
      <p className="card-summary">{project.summary}</p>
      <p className="card-metric"><strong>{claim.value}</strong><span>{claim.label}</span></p>
      <div className="card-bottom"><span className="card-stack">{project.stack.slice(0, 2).join(' · ')}</span><Link to={`/projects/${project.slug}`} aria-label={`Read case study: ${project.title}`} className="text-link">Case study <ArrowRight size={16} /></Link></div>
    </div>
  </article>;
}

export function MoreProjectTile({ project }: { project: MoreProject }) {
  return <article className="more-tile">
    <ProjectIcon slug={project.slug} size={112} />
    <div>
      <h4><a href={repoUrl(project.slug)} target="_blank" rel="noopener noreferrer">{project.title}<ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> on GitHub (opens in a new tab)</span></a></h4>
      <p>{project.summary}</p>
      <span className="more-stack">{project.stack.join(' · ')}</span>
    </div>
  </article>;
}
