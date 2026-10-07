import assert from 'node:assert/strict';
import {execFile} from 'node:child_process';import {promisify} from 'node:util';import {access,readFile,writeFile,mkdir} from 'node:fs/promises';
const exec=promisify(execFile),project=process.cwd(),out=`${project}/artifacts/prop-review/output-batch2`,instance='street-prop-batch2-native',session='street-prop-batch-exclusive-20261007';
const delay=ms=>new Promise(r=>setTimeout(r,ms));
async function cli(...args){const {stdout}=await exec(process.execPath,['tools/godot-cli/dist/src/index.js',...args,'--json'],{cwd:project,windowsHide:true,timeout:600000,maxBuffer:30e6,env:{...process.env,GODMODE_SESSION_ID:session,GODMODE_PREBUILT_GENERATING:'1',GODMODE_PREBUILT_ARENA:'0'}});const value=JSON.parse(stdout);assert(value.ok,value.message);return value.data;}
const action=(name,payload={})=>cli('runtime','action','--project',project,'--instance',instance,'--name',name,'--payload',JSON.stringify(payload),...(name==='debug_kill_admins'?['--allow-refused']:[]));
const save=(name,v)=>writeFile(`${out}/${name}.json`,JSON.stringify(v,null,2)+'\n');
function look(id,center,offset){const position=center.map((v,i)=>v+offset[i]),[x,y,z]=center.map((v,i)=>v-position[i]);return{id,position,yaw:Math.atan2(-x,-z),pitch:Math.atan2(y,Math.hypot(x,z)),fov:75};}
async function capture(id,pose){await action('investigation_view',pose);await delay(180);const receipt=await action('investigation_capture',{output:`${out}/${id}.png`});await save(`${id}-capture`,{pose,receipt});const bytes=await readFile(`${out}/${id}.png`);assert(bytes.readUInt32BE(16)===1920&&bytes.readUInt32BE(20)===1080);}
const source=(await exec('git',['rev-parse','HEAD'],{cwd:project,windowsHide:true})).stdout.trim();await save('batch-source',{source,startedUtc:new Date().toISOString()});
await save('peers-before',await cli('game','ps','--all'));await save('launch',await cli('game','run','--project',project,'--instance',instance,'--session',session,'--scene','res://artifacts/prop-review/audit.tscn','--fixture','roguelite','--inspect','--allow-actions','--offscreen','--offscreen-size','1920x1080'));
try{
 let state;const deadline=Date.now()+240000;
 do{await delay(1000);try{state=(await cli('runtime','inspect','--project',project,'--instance',instance,'--store-only')).store;}catch{continue;}if(state?.loadoutPickOpen)await action('loadout_pick_confirm');if(Date.now()>deadline)throw Error('Native arena not ready');}while(!state?.snapshot?.players?.some(p=>p.id===state.localPeerId)||state.loadoutPickOpen);
 await action('pause',{open:false});await action('debug_console',{invincible:true,killEnemies:true,freeFly:true,hideMinimap:true,open:false});await action('photo_mode',{active:true});await action('debug_kill_admins');await delay(6500);await action('pause',{open:true});
 const locations=(await action('investigation_prop_locations')).result;await save('prop-locations',locations);
 const entries=locations.props.flatMap(p=>p.instances.map(i=>({...i,path:p.path})));const nearest=regex=>entries.filter(p=>regex.test(p.path)).sort((a,b)=>(a.center[0]+402)**2+(a.center[2]+390)**2-((b.center[0]+402)**2+(b.center[2]+390)**2))[0];
 const roof=nearest(/roof.*hvac|roof.*unit|roof.*condenser/i);
 const views=[{id:'street-01-outdoor',position:[-402,-15.582,-392],yaw:0,pitch:0,fov:75},{id:'street-02-cars-trees',position:[-405,-15.58,-363],yaw:0,pitch:0,fov:75},look('street-03-furniture',[-412.89,-16.7,-372.81],[2,1.2,3]),look('street-04-planter-contact',[-430.88,-16.8,-373.74],[2,1.2,3]),roof?look('street-05-roof-ac',roof.center,[4,2.5,5]):{id:'street-05-covered',position:[-542.946,-15.774,-361.28],yaw:-1.5708,pitch:0,fov:75},look('street-06-waterfront',[-499.9,-16.5,-489.4],[4,2,7])];
 await save('street-views',views);await action('batch_stage',{name:'hide',payload:{}});
 for(const view of views){await capture(view.id,view);await save(`${view.id}-inventory`,(await action('investigation_inventory')).result);console.log(view.id,'captured');}
 for(const view of views){await action('investigation_view',view);await delay(800);const folder=`${out}/tour-${view.id}`;await action('investigation_motion',{output:folder,seconds:2.5,amplitude:0.35,yaw_swing:0.012});const deadline=Date.now()+30000;while(true){try{await access(`${folder}/receipt.json`);break;}catch{if(Date.now()>deadline)throw Error('Motion recording timeout');await delay(300);}}console.log(view.id,'native tour recorded');}
 const catalog=JSON.parse(await readFile('artifacts/prop-review/catalog-batch2.json','utf8'));const sheets=[];
 for(let index=0;index<catalog.length;index++){
  const asset=catalog[index], stage=(await action('batch_stage',{name:'asset',payload:asset})).result;assert(stage.accepted,JSON.stringify(stage));await delay(350);
  const radius=Math.max(...stage.size,0.4);const poses=[];
  for(const [range,multiplier] of [['close',0.65],['mid',1.8],['far',5]]){const pose=look(`${asset.id}-${range}`,stage.center,[radius*0.5*multiplier,radius*0.35*multiplier,radius*0.9*multiplier]);await capture(`asset-${asset.id}-${range}`,pose);poses.push({range,pose});}
  await save(`asset-${asset.id}`,{asset,stage,poses});sheets.push(asset);
  if((index+1)%10===0)console.log(`${index+1}/${catalog.length} assets captured; no per-asset audit loop`);
 }
 await save('asset-manifest',sheets);await save('logs',await cli('game','logs','--project',project,'--instance',instance));console.log(`CAPTURE PASS COMPLETE: ${sheets.length} asset sheets, six street views, six native tour sections`);
}finally{await save('stop',await cli('game','stop','--project',project,'--instance',instance));}
