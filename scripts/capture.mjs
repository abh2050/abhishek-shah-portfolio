import { chromium } from 'playwright';
import fs from 'node:fs/promises';
const base='http://127.0.0.1:4173/abhishek-shah-portfolio/';
const dir='docs/portfolio/verification/screenshots';await fs.mkdir(dir,{recursive:true});
const slugs=['enterprise-rag-aws','yieldloop-wafer-triage-with-HIL','edge-ai-inspection-gates','sentinel-ai','fault-triage-ai','mlx-sft-pubmedqa'];
const browser=await chromium.launch({channel:'chrome'});const page=await browser.newPage({deviceScaleFactor:1});
const records=[];
async function capture(route,name,width){
 await page.setViewportSize({width,height:width<768?844:1000});await page.goto(base+route);await page.locator('h1').waitFor();
 await page.evaluate(async()=>{for(const img of document.images){img.loading='eager';}await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 await page.screenshot({path:`${dir}/${name}-${width}.png`,fullPage:true});records.push({route,width,path:`${dir}/${name}-${width}.png`,overflow});
}
for(const width of [360,390,768,1024,1440]){await capture('','home',width);await capture('#/projects/enterprise-rag-aws','enterprise-rag-aws',width);}
for(const slug of slugs.slice(1))for(const width of [390,1440])await capture('#/projects/'+slug,slug,width);
await capture('#/writing','archive',390);await capture('#/missing','not-found',390);
await page.goto(base);await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Menu',exact:true}).click();await page.screenshot({path:`dir/menu-390.png`.replace('dir',dir)});await page.keyboard.press('Escape');
await page.emulateMedia({reducedMotion:'reduce'});await page.screenshot({path:`${dir}/reduced-motion-390.png`,fullPage:true});
await fs.writeFile('docs/portfolio/verification/captures.json',JSON.stringify({capturedAt:new Date().toISOString(),records},null,2));await browser.close();console.log(`Captured ${records.length+2} screenshots; overflow: ${records.filter(r=>r.overflow).length}`);
