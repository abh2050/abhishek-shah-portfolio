import fs from 'node:fs/promises';
import {projects} from '../src/content/projects';
import {evidence} from '../src/content/evidence';
import {profile} from '../src/content/profile';
import {writing} from '../src/content/writing';
const urls=[...new Set([profile.linkedin,profile.github,...writing.map(w=>w.url),...projects.flatMap(p=>[p.repository,p.evidenceUrl,...p.decisions.map(d=>d.source),...(p.viewer?[p.viewer]:[])]),...evidence.map(e=>e.source)])];
const results=[];let next=0;
async function worker(){while(next<urls.length){const url=urls[next++];try{const r=await fetch(url,{signal:AbortSignal.timeout(15000),headers:{'User-Agent':'Portfolio-Link-Verification/1.0'}});const status=r.ok?'passed':[401,403,429,999].includes(r.status)?'access-blocked':[404,410].includes(r.status)?'failed':'unchecked';results.push({url,httpStatus:r.status,status,finalUrl:r.url,checkedAt:new Date().toISOString()});await r.body?.cancel();}catch(e){results.push({url,status:'unchecked',reason:String(e),checkedAt:new Date().toISOString()});}}}
await Promise.all(Array.from({length:4},worker));await fs.writeFile('docs/portfolio/verification/external-links.json',JSON.stringify(results,null,2)+'\n');
console.log(results.reduce((a,r)=>(a[r.status]=(a[r.status]||0)+1,a),{} as Record<string,number>));if(results.some(r=>r.status==='failed'))process.exitCode=1;
