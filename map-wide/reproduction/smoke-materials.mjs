import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const exec=promisify(execFile);
const project=process.cwd();
const output=resolve('evidence/map-wide/validation');
async function cli(...args){
 const {stdout}=await exec(process.execPath,['tools/godot-cli/dist/src/index.js',...args,'--json'],{cwd:project,timeout:900000,maxBuffer:40e6,windowsHide:true});
 const result=JSON.parse(stdout);if(!result.ok)throw Error(JSON.stringify(result));return result.data;
}
await mkdir(output,{recursive:true});
console.log(JSON.stringify(await cli('game','ps','--all')));
const {sessionId}=await cli('session','new');
await writeFile(resolve('artifacts/session-smoke.json'),JSON.stringify({sessionId}));
try{
 for(const mode of ['headless','rendered']){
  const instance=`material-depth-smoke-${mode}`;
  const display=mode==='headless'?['--headless']:['--offscreen','--offscreen-size','1920x1080'];
  console.log('Starting '+instance);
  const run=await cli('game','run','--project',project,'--instance',instance,'--session',sessionId,'--fixture','roguelite','--inspect','--allow-actions',...display);
  await writeFile(resolve(output,`${mode}-run.json`),JSON.stringify(run,null,2));
  const deadline=Date.now()+900000;
  let state;
  while(true){
   try{
    state=await cli('runtime','inspect','--project',project,'--instance',instance,'--store-only');
    const p=state.store?.snapshot?.players?.find(p=>p.id===state.store.localPeerId);
    if(p?.alive&&p.grounded){console.log(JSON.stringify({mode,player:p}));break;}
   }catch(e){if(Date.now()>deadline)throw e;}
   if(Date.now()>deadline)throw Error('Smoke readiness timeout');
   await new Promise(r=>setTimeout(r,2000));
  }
  if(mode==='rendered'){
   const frames=await cli('runtime','frames','--project',project,'--instance',instance,'--window-ms','3000','--warmup-ms','2000');
   await writeFile(resolve(output,'rendered-frames.json'),JSON.stringify(frames,null,2));
   await cli('game','capture','--project',project,'--instance',instance,'--output',resolve(output,'rendered-gameplay.png'));
  }
  const logs=await cli('game','logs','--project',project,'--instance',instance);
  await writeFile(resolve(output,`${mode}-smoke.json`),JSON.stringify({state,logs},null,2));
  if(/GODMODE_FRAME_ERROR|Uncaught (?:TypeError|Error|SyntaxError)|Shader compilation failed/.test(JSON.stringify(logs)))throw Error('Runtime error');
  await cli('game','stop','--project',project,'--instance',instance);
  console.log('Passed '+mode);
 }
}finally{await cli('session','end','--session',sessionId);}
