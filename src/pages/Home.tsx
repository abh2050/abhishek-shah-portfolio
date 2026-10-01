import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, ArrowUpRight } from 'lucide-react';
import { profile } from '@/content/profile';
import { experience } from '@/content/experience';
import { education } from '@/content/education';
import { projects } from '@/content/projects';
import { writing } from '@/content/writing';
import { getAsset } from '@/content/assets';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ExternalLink, PageMeta, ResumeLink } from '@/components/portfolio/Shared';
import { assetUrl, sectionUrl } from '@/lib/urls';
const selectedWriting = ['autoencoders','fusion-energy','recommender-system'].map(term => writing.find(w=>w.url.includes(term))).filter(Boolean);
export default function Home() {
  const portrait=getAsset('portrait').outputs[0];
  return <>
    <PageMeta title={profile.name} description={profile.description}/>
    <section className="hero shell" id="home" tabIndex={-1}>
      <div className="hero-copy"><p className="eyebrow hero-eyebrow"><span className="status-dot"/> {profile.location} <span className="separator">/</span> Enterprise AI · Industrial ML</p>
        <h1>AI Architect &amp; <br/><span>Technical Program Manager</span></h1>
        <p className="hero-description">{profile.description}</p>
        <div className="hero-actions"><Link className="button primary" to={sectionUrl('work')}>Explore selected work <ArrowDown size={17}/></Link><ResumeLink className="button secondary"/></div>
        <a className="hero-contact" href={`mailto:${profile.email}`}>Let’s talk about your next AI system <ArrowUpRight size={16}/></a>
      </div>
      <aside className="profile-note" aria-label="About Abhishek"><img className="portrait" src={assetUrl(portrait.path)} width={portrait.width} height={portrait.height} alt="Portrait of Abhishek Shah" fetchPriority="high"/><div className="profile-note-body"><p className="eyebrow">Engineer → AI architect</p><p>From the physical process <br/>to the intelligent system.</p><span>Currently leading AI programs <br/>at {profile.employer}.</span></div></aside>
    </section>
    <div className="discipline-strip"><div className="shell"><span>Systems thinking, end to end</span><p>Enterprise architecture <i/> Industrial machine learning <i/> Agent reliability <i/> Technical delivery</p></div></div>
    <section className="section shell work-section" id="work" tabIndex={-1}><div className="section-heading"><div><p className="eyebrow">01 / Selected work</p><h2>Built. Measured.<br/><span className="serif">Open to inspection.</span></h2></div><p>Independent engineering projects.<br/>Real artifacts, explicit boundaries,<br/>and the results—including the misses.</p></div>
      <div className="projects-grid">{projects.map((project,index)=><ProjectCard key={project.slug} project={project} index={index}/>)}</div>
    </section>
    <section className="delivery-section" id="delivery" tabIndex={-1}><div className="shell delivery-grid"><div><p className="eyebrow">02 / Enterprise delivery</p><h2>Architecture is only useful<br/>when teams can use it.</h2><p className="section-intro">My organizational work connects technical design, governance, and the people responsible for delivery.</p><p className="delivery-note">Employment work is separate from the independent projects above. Internal systems and customer material remain confidential; public code is not presented as an employer deployment.</p></div><div className="delivery-list">
      <article><span>01</span><div><h3>AI platforms & governance</h3><p>At SSOE Group, AI program delivery includes enterprise platform governance, vendor oversight, and RAG and agent workstreams.</p></div></article>
      <article><span>02</span><div><h3>Programs that connect teams</h3><p>Technical roadmaps, cross-functional adoption, and AI enablement—including the AI Champions program during my time at BMW.</p></div></article>
      <article><span>03</span><div><h3>An engineering foundation</h3><p>Process engineering and Intel experience shape how I define measurement boundaries, evaluate constraints, and explain tradeoffs.</p></div></article>
    </div></div></section>
    <section className="section shell career-section" id="career" tabIndex={-1}><div className="section-heading"><div><p className="eyebrow">03 / Career</p><h2>A progression into AI.</h2></div><p>From chemical and process engineering<br/>to enterprise AI program leadership.</p></div>
      <div className="career-list">{experience.map(role=><article key={role.company}><p className="career-period">{role.period}</p><div><h3>{role.company}</h3><p className="role-title">{role.title}</p><p>{role.description}</p></div></article>)}</div>
      <div className="education" id="education" tabIndex={-1}><div><p className="eyebrow">Education & certification</p><h3>Learning across disciplines.</h3><p>Project Management Professional (PMP)</p></div><ul>{education.map(item=><li key={item.institution}><strong>{item.qualification}</strong><span>{item.institution} · {item.period}</span></li>)}</ul></div>
    </section>
    <section className="section shell writing-section" id="writing" tabIndex={-1}><div className="section-heading"><div><p className="eyebrow">04 / Selected writing</p><h2>Thinking in public.</h2></div><Link className="text-link" to="/writing">Writing & podcast archive <ArrowRight size={16}/></Link></div>
      <div className="writing-grid">{selectedWriting.map((article,index)=><article key={article!.url}><span className="eyebrow">Essay / {String(index+1).padStart(2,'0')}</span><h3><ExternalLink href={article!.url}>{article!.title}</ExternalLink></h3><p>Self-published technical writing on Medium.</p></article>)}</div>
    </section>
    <section className="contact-section" id="contact" tabIndex={-1}><div className="shell contact-grid"><div><p className="eyebrow">05 / Let’s connect</p><h2>Bring a hard problem.<br/><span className="serif">Let’s make it tractable.</span></h2><p>Enterprise AI architecture, industrial ML,<br/>and the programs that bring them to life.</p><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={23}/></a><div className="contact-links"><ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink><ExternalLink href={profile.github}>GitHub</ExternalLink><ResumeLink/></div></div>
      <div className="faq"><p className="eyebrow">Portfolio FAQ</p><details><summary>What is your current role?</summary><p>I’m {profile.title} at {profile.employer}, since {profile.since}. BMW is a previous role.</p></details><details><summary>Where should I start?</summary><p>For enterprise architecture, start with Enterprise RAG. For industrial ML, explore YieldLoop and Edge AI Inspection Gates. Fault Triage shows why comparing agents with a simpler baseline matters.</p></details><details><summary>Are these production systems?</summary><p>The selected work consists of independent research, prototypes, and demonstrators. Each case study states its deployment status, evaluation scope, and remaining production requirements.</p></details><details><summary>How can I get your résumé?</summary><p><a href={`mailto:${profile.email}?subject=Current%20r%C3%A9sum%C3%A9%20request`}>Email me for a current copy.</a> A verified download will be added when the updated PDF is available.</p></details></div>
    </div></section>
  </>;
}
