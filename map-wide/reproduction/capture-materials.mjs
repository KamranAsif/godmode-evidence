import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const exec = promisify(execFile);
const project = process.cwd();
const phase = process.argv[2];
const output = resolve('evidence/map-wide/captures');
const instance = `material-depth-${phase}`;
const views = [
 {id:'tower-shade',position:[-515,12,-507],target:[-556,15,-456]},
 {id:'tower-player',position:[-507,-15,-442],target:[-556,6,-456]},
 {id:'tower-relief',position:[-535,8,-477],target:[-556,9,-456]},
 {id:'deck-shade',position:[-552,-10,-379],target:[-540,5,-437]},
 {id:'roofs',position:[-490,33,-334],target:[-482,12,-303]},
 {id:'trim',position:[-490,0,-334],target:[-481,3,-321]},
 {id:'kerb',position:[-586,-15.68,-344],target:[-595,-17.6,-344]},
 {id:'pier',position:[-760,-11.53,-250],target:[-780,-13,-284]},
 {id:'street',position:[-590,-15.68,-332],target:[-573,-14.5,-316]},
];
async function cli(...args) {
 const {stdout} = await exec(process.execPath,['tools/godot-cli/dist/src/index.js',...args,'--json'],{cwd:project,timeout:600000,maxBuffer:40e6,windowsHide:true});
 const reply=JSON.parse(stdout);if(!reply.ok)throw Error(JSON.stringify(reply));return reply.data;
}
const action=(name,payload)=>cli('runtime','action','--project',project,'--instance',instance,'--name',name,'--payload',JSON.stringify(payload));
await mkdir(output,{recursive:true});
console.log(JSON.stringify(await cli('game','ps','--all')));
const {sessionId}=await cli('session','new');
await writeFile(resolve('artifacts',`session-${phase}.json`),JSON.stringify({sessionId,instance}));
const records=[];
try {
 console.log('Starting '+instance);
 await cli('game','run','--project',project,'--instance',instance,'--session',sessionId,'--scene','res://tools/maps/preview_study_lighting.tscn','--offscreen','--offscreen-size','1920x1080','--inspect','--allow-actions');
 const deadline=Date.now()+900000;
 while(true){
  try{const camera=await action('audit_camera',views[0]);if(camera.result?.accepted)break;}catch(e){if(Date.now()>deadline)throw e;}
  if(Date.now()>deadline)throw Error('Scene readiness timeout');
  await new Promise(r=>setTimeout(r,1500));
 }
 if(phase==='after') {
  const materials=await action('audit_materials',{});
  await writeFile(resolve(output,'materials-after.json'),JSON.stringify(materials,null,2));
  if(!materials.result?.families?.roof||!materials.result?.families?.stoneTrim||!materials.result?.families?.concrete)throw Error('Missing texture family');
 }
 for(const view of views){
  const camera=await action('audit_camera',view);if(!camera.result?.accepted)throw Error(JSON.stringify(camera));
  await new Promise(r=>setTimeout(r,1500));
  const file=resolve(output,`${view.id}-${phase}.png`);
  await cli('game','capture','--project',project,'--instance',instance,'--output',file);
  const bytes=await readFile(file);if(bytes.readUInt32BE(16)!==1920||bytes.readUInt32BE(20)!==1080)throw Error('Wrong capture size');
  records.push({view,camera});console.log('Captured '+view.id);
 }
 const logs=await cli('game','logs','--project',project,'--instance',instance);
 await writeFile(resolve(output,`logs-${phase}.json`),JSON.stringify(logs,null,2));
 await writeFile(resolve(output,`capture-${phase}.json`),JSON.stringify(records,null,2));
 if(JSON.stringify(logs).includes('GODMODE_FRAME_ERROR'))throw Error('Frame error');
} finally {await cli('session','end','--session',sessionId);}
