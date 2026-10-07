import {execFileSync,spawnSync} from 'node:child_process';
import {readFileSync,writeFileSync} from 'node:fs';
const instance=process.argv[2];
if(!/^juice-(weapon|earned|surface)-final-smoke[0-9]+$/.test(instance??''))throw Error('Exact owned smoke instance required');
const env={...process.env};
env.GODMODE_PREBUILT_GENERATING='1'; // Explicit PR policy: prevent import:prepare from generating the arena.
delete env.GODMODE_STUDY_LIGHTING;
const slotDeadline=Date.parse(env.JUICE_SLOT_DEADLINE_ISO??'');
if(!Number.isFinite(slotDeadline)||slotDeadline<=Date.now()||slotDeadline>Date.now()+20*60*1000)throw Error('Future explicit <=20-minute JUICE_SLOT_DEADLINE_ISO required');
let cleanupMode=false;
const freshness=spawnSync(process.execPath,['tools/maps/prebuilt/build.mjs','--check'],{env,windowsHide:true,encoding:'utf8',timeout:60000});
const arenaFreshness={exitCode:freshness.status,stdout:freshness.stdout,stderr:freshness.stderr};
const cli=(args,project=true)=>{
 const timeout=cleanupMode?15000:Math.min(60000,slotDeadline-Date.now()-90000);
 if(!cleanupMode&&timeout<1000)throw Error('Slot cleanup reserve reached; ending owned engine now');
 const result=JSON.parse(execFileSync(process.execPath,['tools/godot-cli/dist/src/index.js',...args,...(project?['--project',process.cwd()]:[]),'--json'],{env,windowsHide:true,encoding:'utf8',maxBuffer:40e6,timeout}));
 if(!result.ok)throw Error(JSON.stringify(result));
 return result;
};
const head=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
const settingsOverrideText=readFileSync('artifacts/juice/settings.cfg','utf8');
const scope='Default-scene load with explicit Testing unlock-all/always-ready settings. Live player/enemy and script-error smoke; not stock-settings or natural earning certification. Arena freshness is reported and accepted under the explicit PR-only policy; import:prepare arena generation is disabled. Not a release-cache verification.';
const session=cli(['session','new'],false);
env.GODMODE_SESSION_ID=session.data.sessionId;
const beganAt=new Date().toISOString();
let started,store,stop,end,error,stopError,endError,inventory,inventoryError,ownedRemaining,cleanedUp=false,passed=false;
try{
 started=cli(['game','run','--headless','--fixture','roguelite','--inspect','--allow-actions','--instance',instance,'--settings-path',process.cwd()+'/artifacts/juice/settings.cfg']);
 const began=Date.now();
 while(Date.now()-began<45000){
  try{
   const r=cli(['runtime','inspect','--instance',instance,'--store-only']);
   store=r.data?.store;
   if(store?.roguelite?.survivalPlayer?.health>0&&store?.roguelite?.enemies?.some(e=>e.health>0))break;
  }catch{}
  await new Promise(r=>setTimeout(r,1000));
 }
 if(!(store?.roguelite?.survivalPlayer?.health>0&&store?.roguelite?.enemies?.some(e=>e.health>0)))throw Error('Default world not loaded');
 const earned=store.roguelite.run?.survival?.streaks?.earned;
 if(instance.includes('earned')&&typeof earned!=='number')throw Error('Authoritative earned field missing');
 const log=readFileSync(started.data.logPath,'utf8');
 const scriptErrors=log.split(/\r?\n/).filter(s=>/SCRIPT ERROR|Unhandled|TypeError|ReferenceError|FATAL:|Shader compilation failed/.test(s));
 if(scriptErrors.length)throw Error(scriptErrors.join('\n'));
 passed=true;
 writeFileSync(`artifacts/juice/${instance}-observed.json`,JSON.stringify({head,started,health:store.roguelite.survivalPlayer.health,enemies:store.roguelite.enemies.length,earned:earned??null,scriptErrors,otherErrors:log.split(/\r?\n/).filter(s=>s.includes('ERROR:')),defaultScene:true,cacheGenerationBypass:true,arenaFreshness,settingsOverrideText,scope,store},null,2));
}catch(caught){error=String(caught);process.exitCode=1;}
finally{
 cleanupMode=true;
 if(started?.ok){try{stop=cli(['game','stop','--instance',instance]);}catch(caught){stopError=String(caught);process.exitCode=1;}}
 try{end=cli(['session','end','--session',env.GODMODE_SESSION_ID],false);}catch(caught){endError=String(caught);process.exitCode=1;}
 try{
  inventory=cli(['game','ps']);
  const entries=inventory.data?.instances;
  if(!Array.isArray(entries))throw Error('Owned inventory was not returned');
  ownedRemaining=entries.filter(entry=>entry.alive&&(entry.instance===instance||entry.sessionId===env.GODMODE_SESSION_ID));
  cleanedUp=ownedRemaining.length===0;
  if(!cleanedUp)throw Error('Owned engine remains after cleanup');
 }catch(caught){inventoryError=String(caught);process.exitCode=1;}
 const slotOverrunMs=Math.max(0,Date.now()-slotDeadline);
 if(slotOverrunMs)process.exitCode=1;
 writeFileSync(`artifacts/juice/${instance}-proof.json`,JSON.stringify({head,passed,session,beganAt,endedAt:new Date().toISOString(),slotDeadlineISO:new Date(slotDeadline).toISOString(),cleanupReserveMs:90000,slotOverrunMs,started,stop,end,error,stopError,endError,inventory,inventoryError,ownedRemaining,cleanedUp,defaultScene:true,cacheGenerationBypass:true,arenaFreshness,settingsOverrideText,scope},null,2));
}
console.log(JSON.stringify({head,instance,passed,stop,end,error,stopError,endError,inventoryError,ownedRemaining,cleanedUp}));
