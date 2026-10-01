import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { projects } from '@/content/projects';
import { getClaim } from '@/content/evidence';
import { Figure } from '@/components/case-study/Figure';
import { ExternalLink, PageMeta } from '@/components/portfolio/Shared';
import NotFound from './NotFound';
export default function ProjectCaseStudy() {
  const {slug}=useParams(); const project=projects.find(p=>p.slug===slug);
  if (!project) return <NotFound/>;
  const next=projects[(projects.indexOf(project)+1)%projects.length];
  return <article className="case-study shell">
    <PageMeta title={project.title} description={project.summary}/>
    <Link to="/?section=work" className="back-link"><ArrowLeft size={16}/>Selected work</Link>
    <header className="case-header"><p className="eyebrow">{project.category} <span className="separator">/</span> Independent project</p><h1>{project.title}</h1><p className="case-kicker">{project.kicker}</p><p className="case-summary">{project.summary}</p><div className="case-meta"><span className="status-label">{project.status}</span><span>{project.stack.join(' · ')}</span></div><div className="case-actions"><ExternalLink href={project.evidenceUrl} className="button primary">View evidence</ExternalLink><ExternalLink href={project.repository} className="button secondary">Source code</ExternalLink>{project.viewer && <ExternalLink href={project.viewer}>{project.viewerLabel}</ExternalLink>}</div></header>
    <aside className="scope-note"><strong>Read this result in context</strong><p>{project.cardFinding}</p></aside>
    <Figure id={project.visuals[0]} priority/>
    <div className="case-body"><aside className="case-nav"><p className="eyebrow">In this case study</p><a href="#problem" onClick={e=>jump(e,'problem')}>Problem & contribution</a><a href="#architecture" onClick={e=>jump(e,'architecture')}>Architecture & decisions</a><a href="#results" onClick={e=>jump(e,'results')}>Recorded results</a><a href="#limitations" onClick={e=>jump(e,'limitations')}>Limits & next steps</a></aside>
    <div className="case-narrative"><section id="problem" tabIndex={-1}><p className="eyebrow">The operational problem</p><h2>What needed to change</h2><p>{project.problem}</p><h3>What I implemented</h3><p>{project.contribution}</p></section>
    <section id="architecture" tabIndex={-1}><p className="eyebrow">Architecture & control boundaries</p><h2>How the system holds together</h2><p>{project.architecture}</p>{project.decisions.map(d=><div className="decision" key={d.title}><h3>{d.title}</h3><p>{d.body}</p><ExternalLink href={d.source}>Inspect the decision in source</ExternalLink></div>)}</section>
    </div></div>
    <Figure id={project.visuals[1]}/>
    <div className="case-body"><div className="case-sidebar-note"><p className="eyebrow">Evidence, not a promise</p><p>Recorded results are scoped to the dataset, protocol, and environment that produced them.</p></div><div className="case-narrative">
    <section id="results" tabIndex={-1}><p className="eyebrow">Recorded evaluation</p><h2>What the evidence says</h2><p>{project.protocol}</p><div className="table-scroll" tabIndex={0} role="region" aria-label="Recorded results table"><table><caption>{project.title}: results and measurement boundaries</caption><thead><tr><th scope="col">Measure</th><th scope="col">Recorded result</th><th scope="col">Scope & limitation</th></tr></thead><tbody>{project.metrics.map(id=>{const c=getClaim(id);return <tr key={id} data-claim={id}><th scope="row"><ExternalLink href={c.source}>{c.label}</ExternalLink></th><td>{c.value}</td><td>{c.scope}<span className="result-limit">{c.limitation}</span></td></tr>;})}</tbody></table></div><h3>Tradeoffs and baselines</h3><ul className="prose-list">{project.tradeoffs.map(t=><li key={t}>{t}</li>)}</ul></section>
    <section id="limitations" tabIndex={-1} className="limitations"><p className="eyebrow">Limits & remaining work</p><h2>Where the evidence stops</h2><ul className="prose-list">{project.limitations.map(l=><li key={l}>{l}</li>)}</ul><h3>Before production use</h3><p>{project.production}</p></section>
    <section className="source-note"><h2>Inspect the work</h2><p>Sources reviewed {project.reviewed}. This portfolio summarizes recorded evidence; it does not rerun model evaluation.</p><p className="commit">Source revision: <a href={`${project.repository}/tree/${project.sha}`}>{project.sha.slice(0,12)}</a></p><div className="case-actions"><ExternalLink href={project.evidenceUrl}>Evaluation & limitations</ExternalLink><ExternalLink href={project.repository}>Repository</ExternalLink></div></section>
    </div></div>
    <Link className="next-project" to={`/projects/${next.slug}`}><div><span className="eyebrow">Next case study</span><h2>{next.title}</h2></div><ArrowRight size={30}/></Link>
  </article>;
}
function jump(event: React.MouseEvent<HTMLAnchorElement>, id: string) { event.preventDefault(); const el=document.getElementById(id); el?.scrollIntoView({block:'start'});el?.focus({preventScroll:true}); }
