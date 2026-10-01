import fs from 'node:fs/promises';
import { profile } from '../src/content/profile';
const blockers:string[]=[];
if(!profile.resume)blockers.push('Current owner-supplied résumé PDF is missing. Existing source résumés list BMW as current and must not be published as current.');
else{try{const pdf=await fs.readFile('public/'+profile.resume);if(pdf.subarray(0,5).toString()!=='%PDF-')blockers.push('Résumé is not a PDF.');}catch{blockers.push('Résumé file cannot be read.');}}
for(const filename of ['audit.md','project-research.md','claims.md','assets.json','design.md','visual-review.md','completion.md'])try{await fs.access('docs/portfolio/'+filename);}catch{blockers.push(`Missing ${filename}`);}
for(const file of ['content-assets.json','playwright.json','lighthouse-home.json','lighthouse-case.json','manual-review.json']){
 try{
  const data=JSON.parse(await fs.readFile('docs/portfolio/verification/'+file,'utf8'));
  if(file==='playwright.json'&&(data.stats?.unexpected>0||data.stats?.expected<17))blockers.push('Behavioral verification is incomplete or failing.');
  if(file.startsWith('lighthouse'))for(const [key,target] of Object.entries({performance:.9,accessibility:.95,'best-practices':.95,seo:.95}))if(data.categories?.[key]?.score<target)blockers.push(`${file}: ${key} below target; inspect recorded audit.`);
  if(file==='manual-review.json'&&data.status!=='passed')blockers.push('Manual visual review is not passed.');
 }catch{blockers.push(`Missing verification report ${file}`);}
}
const result={checkedAt:new Date().toISOString(),status:blockers.length?'blocked':'passed',blockers};await fs.writeFile('docs/portfolio/verification/release.json',JSON.stringify(result,null,2)+'\n');console.log(result);if(blockers.length)process.exitCode=1;
