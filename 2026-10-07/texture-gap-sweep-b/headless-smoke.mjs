import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { writeFile } from 'node:fs/promises';
const exec=promisify(execFile), cwd=process.cwd(), instance='texture-gap-smoke', session=process.env.GODMODE_SESSION_ID??'texture-gap-sweep-a-20261007';
async function cli(...args){const {stdout}=await exec(process.execPath,['tools/godot-cli/dist/src/index.js',...args,'--json'],{cwd,windowsHide:true,timeout:600000,maxBuffer:20e6,env:{...process.env,GODMODE_SESSION_ID:session}});const r=JSON.parse(stdout);assert(r.ok,r.message);return r.data;}
const save=(name,value)=>writeFile(`artifacts/prop-review/recovery-smoke-${name}.json`,JSON.stringify(value,null,2)+'\n');
await exec(process.execPath,['tools/maps/prebuilt/build.mjs','--check'],{cwd:process.cwd(),windowsHide:true,timeout:120000});
await save('peers',await cli('game','ps','--all'));
await save('launch',await cli('game','run','--project',cwd,'--instance',instance,'--session',session,'--fixture','roguelite','--headless','--inspect','--allow-actions'));
try{
 const deadline=Date.now()+600000;
 let state;
 while(Date.now()<deadline){
  await new Promise(r=>setTimeout(r,1000));
  try{state=(await cli('runtime','inspect','--project',cwd,'--instance',instance,'--store-only')).store;}catch{continue;}
  if(state?.loadoutPickOpen)await cli('runtime','action','--project',cwd,'--instance',instance,'--name','loadout_pick_confirm','--payload','{}');
  if(state?.snapshot?.players?.some(p=>p.id===state.localPeerId)&&!state.loadoutPickOpen)break;
 }
 assert(state?.snapshot?.players?.some(p=>p.id===state.localPeerId)&&!state.loadoutPickOpen,'Headless client did not enter survival');
 await save('store',state);
 const logs=await cli('game','logs','--project',cwd,'--instance',instance);
 await save('logs',logs);
 assert(!/SCRIPT ERROR|\[JS\].*(?:TypeError|ReferenceError|SyntaxError)|Parse Error|Error loading script/i.test(logs.output??''),'Script errors in headless smoke');
 console.log('Headless survival loaded with a live player and no script errors');
}finally{await save('stop',await cli('game','stop','--project',cwd,'--instance',instance));}
