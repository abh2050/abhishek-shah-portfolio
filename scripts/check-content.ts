import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
import {projects} from '../src/content/projects';
import {evidence} from '../src/content/evidence';
import {profile} from '../src/content/profile';
import {experience} from '../src/content/experience';
import {assets} from '../src/content/assets';
import {writing} from '../src/content/writing';
import {icons} from '../src/content/icons';
import {moreProjects} from '../src/content/more-projects';
const manifest=JSON.parse(await fs.readFile('docs/portfolio/assets.json','utf8'));
const lock=JSON.parse(await fs.readFile('docs/portfolio/research-lock.json','utf8'));
assert.equal(projects.length,6);assert.equal(new Set(projects.map(p=>p.slug)).size,6);
assert.equal(new Set(evidence.map(c=>c.id)).size,evidence.length);
assert.equal(profile.employer,'SSOE Group');assert.equal(experience[0].company,profile.employer);assert.equal(experience[0].title,profile.title);
assert(!experience.slice(1).some(e=>e.period.includes('present')));
for(const project of projects){
 assert.match(project.sha,/^[0-9a-f]{40}$/);assert.equal(lock.find(r=>r.repo===project.slug)?.sha,project.sha);
 assert(project.limitations.length>=3 && project.decisions.length>=1 && project.visuals.length>=2);
 assert(project.evidenceUrl.includes(project.sha));assert(project.problem&&project.contribution&&project.production&&project.protocol);
 for(const id of project.metrics){const claim=evidence.find(c=>c.id===id);assert(claim,`Missing claim ${id}`);assert.equal(claim.repository,project.slug);assert.equal(claim.sha,project.sha);assert(claim.scope&&claim.limitation&&claim.evaluationDate);assert(claim.source.includes(claim.sha));}
 for(const id of project.visuals){assert(assets.find(a=>a.id===id),`Missing UI asset ${id}`);assert(manifest.find(a=>a.id===id),`Missing provenance ${id}`);}
 for(const decision of project.decisions)assert(decision.source.includes(project.sha));
}
let decoded=0;
const manifestPaths=new Set<string>();
for(const record of manifest){
 assert(record.rights&&record.alt&&record.caption&&record.sourceHash,`Incomplete metadata ${record.id}`);assert(record.outputs.length>0);
 if(record.sourceRepository!=='abhishek-shah-portfolio')assert.match(record.sourceSha,/^[0-9a-f]{40}$/);
 for(const output of record.outputs){
  manifestPaths.add(output.path);
  const bytes=await fs.readFile(path.join('public',output.path));
  assert.equal(bytes.length,output.bytes);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),output.sha256);
  const metadata=await sharp(bytes).metadata();assert.equal(metadata.width,output.width);assert.equal(metadata.height,output.height);
  await sharp(bytes).raw().toBuffer();decoded++;
  if(output.format==='svg')assert(!/<script|on\w+=|javascript:|<foreignObject/i.test(bytes.toString()));
 }
}
const generatedIcons=JSON.parse(await fs.readFile('docs/portfolio/generated-icons.json','utf8'));
for(const slug of [...projects.map(p=>p.slug),...moreProjects.map(p=>p.slug)])assert(icons[slug],`Missing icon ${slug}`);
assert.equal(new Set(moreProjects.map(p=>p.slug)).size,moreProjects.length);
for(const record of generatedIcons){
 assert(record.rights&&record.prompt&&record.requestId&&record.sourceHash,`Incomplete icon metadata ${record.slug}`);
 const output=record.output;manifestPaths.add(output.path);
 const bytes=await fs.readFile(path.join('public',output.path));
 assert.equal(bytes.length,output.bytes);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),output.sha256);
 const metadata=await sharp(bytes).metadata();assert.equal(metadata.width,output.width);assert.equal(metadata.height,output.height);decoded++;
}
async function walk(dir:string):Promise<string[]>{const entries=await fs.readdir(dir,{withFileTypes:true});return(await Promise.all(entries.map(e=>e.isDirectory()?walk(path.join(dir,e.name)):path.join(dir,e.name)))).flat();}
for(const file of await walk('public'))if(/\.(png|jpg|jpeg|webp|avif|svg|ico)$/i.test(file))assert(manifestPaths.has(file.replace(/^public\//,'')),`Untracked shipped image ${file}`);
for(const file of await walk('src/content'))assert(!/YOUR_SPOTIFY_USERNAME|<your-repo>|lorem ipsum|trained AI assistant/i.test(await fs.readFile(file,'utf8')));
assert.equal(writing.filter(w=>w.type==='Article').length,15);assert.equal(writing.filter(w=>w.type==='Podcast').length,10);
const result={status:'passed',checkedAt:new Date().toISOString(),projects:projects.length,claims:evidence.length,decodedImages:decoded,resume:profile.resume?'provided':'blocked: current PDF not supplied'};
await fs.writeFile('docs/portfolio/verification/content-assets.json',JSON.stringify(result,null,2)+'\n');console.log(result);
