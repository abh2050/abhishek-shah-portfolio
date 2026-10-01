import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
const commands=['typecheck','lint','build','check:content','test:e2e','check:release'];const results=[];
fs.mkdirSync('docs/portfolio/verification',{recursive:true});
for(const command of commands){const r=spawnSync('npm',['run',command],{encoding:'utf8',env:process.env});process.stdout.write(r.stdout||'');process.stderr.write(r.stderr||'');fs.writeFileSync(`docs/portfolio/verification/${command.replace(':','-')}.log`,(r.stdout||'')+(r.stderr||''));results.push({command,status:r.status===0?'passed':command==='check:release'?'blocked':'failed',exitCode:r.status});}
fs.writeFileSync('docs/portfolio/verification/verify.json',JSON.stringify({checkedAt:new Date().toISOString(),node:process.version,results},null,2)+'\n');if(results.some(r=>r.status!=='passed'))process.exitCode=1;
