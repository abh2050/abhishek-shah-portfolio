import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import { writing } from '@/content/writing';
import { ExternalLink, PageMeta } from '@/components/portfolio/Shared';
function Podcast({url,title}:{url:string;title:string}) {
  const [loaded,setLoaded]=useState(false);
  return loaded ? <iframe className="podcast-player" title={`Podcast player: ${title}`} src={url.replace('/episode/','/embed/episode/')} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"/> : <button className="text-link" onClick={()=>setLoaded(true)}><Play size={15}/>Load podcast player<span className="sr-only">: {title}</span></button>;
}
export default function Writing() {return <div className="shell archive"><PageMeta title="Writing & podcasts" description="Technical articles and podcasts by Abhishek Shah."/><Link to="/" className="back-link"><ArrowLeft size={16}/>Home</Link><p className="eyebrow">Notes from the work</p><h1>Writing & podcasts.</h1><p className="section-intro">Exploring machine learning, systems, and the human side of technology. These are self-published articles and recordings, not peer-reviewed publications.</p>{['Article','Podcast'].map(type=><section key={type}><h2>{type==='Article'?'Technical writing':'Podcast archive'}</h2><div className="archive-list">{writing.filter(w=>w.type===type).map(item=><article key={item.url}><h3><ExternalLink href={item.url}>{item.title}</ExternalLink></h3><span className="eyebrow">{type==='Article'?'Medium · Self-published':'Spotify · Audio'}</span>{type==='Podcast'&&<Podcast url={item.url} title={item.title}/>}</article>)}</div></section>)}</div>;}
