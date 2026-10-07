import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { access, readFile, writeFile } from 'node:fs/promises';
const exec = promisify(execFile);
const project = process.cwd();
const out = `${project}/artifacts/prop-review/output`;
const pass = process.argv[2] ?? 'main';
const instance = `prop-review-${pass}`;
const session = process.env.GODMODE_SESSION_ID ?? 'street-prop-textures-20261007';
const delay = ms => new Promise(r => setTimeout(r, ms));
async function cli(...args) {
    const {stdout} = await exec(process.execPath, ['tools/godot-cli/dist/src/index.js', ...args, '--json'], {cwd:project,windowsHide:true,timeout:600000,maxBuffer:30e6,env:{...process.env,GODMODE_SESSION_ID:session,GODMODE_PREBUILT_GENERATING:'1',GODMODE_PREBUILT_ARENA:'0'}});
    const r = JSON.parse(stdout); if (!r.ok) throw Error(JSON.stringify(r)); return r.data;
}
const action = (name,payload={}) => cli('runtime','action','--project',project,'--instance',instance,'--name',name,'--payload',JSON.stringify(payload),...(name==='debug_kill_admins'?['--allow-refused']:[]));
const store = async () => (await cli('runtime','inspect','--project',project,'--instance',instance,'--store-only')).store;
const save = (name,data) => writeFile(`${out}/${pass}-${name}.json`,JSON.stringify(data,null,2));
let views = [];
const viewsFile = `${out}/views.json`;
function looking(id, target, offset) {
 const position=target.map((v,i)=>v+offset[i]); const [x,y,z]=target.map((v,i)=>v-position[i]);
 return {id,position,yaw:Math.atan2(-x,-z),pitch:Math.atan2(y,Math.hypot(x,z)),fov:75};
}

try { await access(`${out}/${pass}-manifest.json`); throw Error(`Capture pass already exists: ${pass}`); }
catch(error) { if(error.code !== 'ENOENT') throw error; }
const source = process.env.LIT_SOURCE_COMMIT ?? (await exec('git',['rev-parse','HEAD'],{cwd:project,windowsHide:true})).stdout.trim();
await writeFile(`${out}/${pass}-source.txt`,source+'\n');
await save('peers',await cli('game','ps','--all'));
await save('launch',await cli('game','run','--project',project,'--instance',instance,'--session',session,'--scene','res://artifacts/prop-review/audit.tscn','--fixture','roguelite','--inspect','--allow-actions','--offscreen','--offscreen-size','1920x1080'));
try {
    let state;
    const deadline=Date.now()+600000;
    do {
        await delay(1000); try { state=await store(); } catch { if(Date.now()>deadline)throw Error('Bridge not ready'); continue; }
        if(state?.loadoutPickOpen) await action('loadout_pick_confirm');
        if(Date.now()>deadline) throw Error('Run not ready');
    } while(!state?.snapshot?.players?.some(p=>p.id===state.localPeerId) || state.loadoutPickOpen);
    await action('pause',{open:false});
    await action('debug_console',{invincible:true,killEnemies:true,freeFly:true,hideMinimap:true,open:false});
    await action('photo_mode',{active:true});
    await action('debug_kill_admins'); await delay(8000);
    const initialDeadline=Date.now()+15000;
    while(true) {
        const transients=await action('investigation_transients');
        if(!transients.result.visibleLatticeViews.length){await save('initial-architecture-transients',transients);break;}
        if(Date.now()>initialDeadline)throw Error('Initial combat lattice did not expire before architectural pause');
        await delay(250);
    }
    await action('pause',{open:true});
    const locations=(await action('investigation_prop_locations')).result;
    await save('prop-locations', locations);
    try {views=JSON.parse(await readFile(viewsFile,'utf8'));} catch(error) {
     if(error.code!=='ENOENT')throw error;
     const entries=locations.props.flatMap(p=>p.instances.map(instance=>({...instance,path:p.path})));
     const nearest=pattern=>entries.filter(p=>pattern.test(p.path)).sort((a,b)=>(a.center[0]+402)**2+(a.center[2]+390)**2-((b.center[0]+402)**2+(b.center[2]+390)**2))[0];
     views=[{id:'outdoor',position:[-402,-15.5820005417,-392],yaw:0,pitch:0,fov:75},{id:'street-cars-trees',position:[-405,-15.58,-363],yaw:0,pitch:0,fov:75}];
     for(const [id,pattern,offset] of [
       ['bench',/bench/i,[1.6,1,2.8]], ['planter',/planter/i,[1.4,1,2.6]],
       ['kiosk',/kiosk|newspaper|locker/i,[1.5,0.5,2.5]], ['bin',/wheelie|bin/i,[1.2,0.6,2]],
       ['bollard',/bollard/i,[1,0.6,1.8]], ['fence',/fence/i,[2.2,1,3]],
       ['roof-ac',/roof.*hvac|roof.*unit|roof.*condenser/i,[3,2,4]],
       ['waterfront-pile',/WaterfrontBatch_wooden.piling/i,[1.4,1.3,3]],
       ['landing',/landing.*cabinet|landing.*bollard|landing.*ring/i,[2.5,1.5,4]]
     ]) {
      const entry=nearest(pattern); if(!entry)continue;
      views.push(looking(id,entry.center,offset));
      if(['bench','kiosk','roof-ac','waterfront-pile'].includes(id))
       for(const [range,multiplier] of [['close',0.55],['mid',1.8],['far',5]])views.push(looking(`${id}-${range}`,entry.center,offset.map(x=>x*multiplier)));
     }
     views.push(looking('waterfront-rail',[-499.9,-16.5,-489.4],[4,2,7]));
     await writeFile(viewsFile,JSON.stringify(views,null,2)+'\n');
    }
    const captures=[];
    let gameplay=false;
    async function setView(view) {
        if(view.id==='gameplay') {
            await action('investigation_view',{pinned:false});
            // Leaving free-fly restores its saved invincibility. Reassert protection
            // afterward so live gameplay evidence cannot catch a transient damage tint.
            await action('debug_console',{freeFly:false,invincible:true,run:'health 100',open:false});
            await action('photo_mode',{active:false});
            await action('pause',{open:false});
            await action('debug_set_player_position',{playerId:state.localPeerId,x:view.position[0],y:view.position[1]-0.65,z:view.position[2]});
            await action('input',{yaw:view.yaw,pitch:view.pitch,moveX:0,moveZ:0,hold:true});
            gameplay=true;
        } else {
            if(gameplay) {
                await action('debug_console',{freeFly:true,open:false});
                await action('photo_mode',{active:true});
                // Let the genuine hit/impact presentation expire before pausing.
                // A paused simulation otherwise freezes a transient lattice on paint.
                await action('debug_console',{invincible:true,killEnemies:true,run:'health 100',open:false});
                await delay(3000);
                const transientDeadline=Date.now()+15000;
                let transients;
                do {
                    transients=await action('investigation_transients');
                    if(!transients.result.visibleLatticeViews.length)break;
                    if(Date.now()>transientDeadline)throw Error('Combat lattice still visible before architectural pause');
                    await delay(250);
                }while(true);
                await save('architecture-transients',transients);
                await action('pause',{open:true});
            }
            await action('investigation_view',view);
            gameplay=false;
        }
    }
    for(const view of views) {
        if(process.env.LIT_VIEWS && !process.env.LIT_VIEWS.split(',').includes(view.id))continue;
        await setView(view);
        await delay(1600);
        if(view.id==='gameplay') {
            const deadline=Date.now()+45000;
            while(true) {
                const current=await store();
                const player=current.snapshot?.players?.find(p=>p.id===current.localPeerId);
                if(player?.invincible && player.health===100 && !current.firstRunHints?.current && current.presentation?.healthDistress?.overlayVisible===false)break;
                if(Date.now()>deadline)throw Error('Gameplay overlay did not clear');
                await action('debug_console',{invincible:true,run:'health 100',open:false});
                await delay(500);
            }
        }
        const file=`${out}/${pass}-${view.id}.png`;
        const receipt=await action('investigation_capture',{output:file});
        const bytes=await readFile(file); if(bytes.readUInt32BE(16)!==1920||bytes.readUInt32BE(20)!==1080)throw Error('Wrong capture size');
        await save(`${view.id}-capture`,receipt);
        await save(`${view.id}-inventory`,(await action('investigation_inventory')).result);
        captures.push({view,file,frames:null}); console.log(`${pass}-${view.id} captured`);
    }
    // Sample after the complete visual sweep, once actor/texture first-use work has settled.
    for(const capture of captures.filter(c=>process.env.LIT_FRAMES !== '0' && ['outdoor','covered','contact','gameplay'].includes(c.view.id))) {
        await setView(capture.view);
        capture.peers=await cli('game','ps','--all');
        await save(`${capture.view.id}-peers`,capture.peers);
        capture.frames=await cli('runtime','frames','--project',project,'--instance',instance,'--window-ms','10000','--warmup-ms','10000');
        await save(`${capture.view.id}-frames`,capture.frames);
        console.log(`${pass}-${capture.view.id} measured after warmup`);
    }
    // Sequential native frames at small moving-camera offsets: inspect leaf/paint/normal stability.
    for(let i=0;i<(process.env.PROP_SHIMMER === '1' ? 8 : 0);i++) {
        const pose={...views[4],position:[views[4].position[0]+i*0.025,...views[4].position.slice(1)]};
        await setView(pose);
        const receipt=await action('investigation_capture',{output:`${out}/${pass}-shimmer-${String(i).padStart(2,'0')}.png`});
        await save(`shimmer-${i}`,{pose,capturedAt:new Date().toISOString(),receipt});
    }
    await save('manifest',captures);
    if(process.env.LIT_MOTION === '1') {
        for(const id of ['tree-close','tree-mid','tree-far','car-close','car-mid','car-far']) {
            if(process.env.LIT_MOTION_VIEWS && !process.env.LIT_MOTION_VIEWS.split(',').includes(id))continue;
            const original=views.find(v=>v.id===id);
            // The original close-tree sweep crossed the right storefront support.
            // Keep a continuous left-offset path, wholly outside that near occluder.
            const pose=id==='tree-close'?{...original,position:[-401.6,...original.position.slice(1)]}:original;
            await setView(pose); await delay(2000);
            if(id==='car-far' && process.env.LIT_PREFLIGHT==='1') {
                const preflight=[];
                for(const [label,sine] of [['start',0],['right',1],['left',-1],['end',Math.sin(4)]]) {
                    const test={...pose,position:[pose.position[0]+sine*.2,...pose.position.slice(1)],yaw:pose.yaw+sine*.004};
                    await setView(test);await delay(1000);
                    const receipt=await action('investigation_capture',{output:`${out}/${pass}-preflight-${label}.png`});
                    preflight.push({label,pose:test,receipt});
                }
                await save('preflight',preflight);
                console.log(`${pass}: preflight ready; waiting for native-image inspection`);
                const deadline=Date.now()+600000;
                while(true) {
                    try {await access(`${out}/${pass}-preflight-approved.json`);break;}catch{}
                    if(Date.now()>deadline)throw Error('Preflight inspection timed out');
                    await delay(1000);
                }
                await setView(pose);await delay(2000);
            }
            const folder=`${out}/${pass}-motion-${id}`;
            try { await access(`${folder}/receipt.json`); throw Error(`Motion receipt already exists: ${folder}`); }
            catch(error) { if(error.code !== 'ENOENT') throw error; }
            await action('investigation_motion',{output:folder,amplitude:id==='tree-close'?.35:id==='car-far'?.2:id.endsWith('close')?.6:id.endsWith('mid')?1.2:2.4,yaw_swing:id==='car-far'?.004:.015});
            let completed=false;
            for(let attempt=0;attempt<90;attempt++) {
                await delay(1000);
                try { await readFile(`${folder}/receipt.json`);completed=true;break; } catch {}
            }
            if(!completed)throw Error(`Recording timed out: ${id}`);
            if(process.env.LIT_ENCODE_MOTION !== '0') {
                const {stdout}=await exec('python',['artifacts/prop-review/encode-motion.py',folder],{cwd:project,windowsHide:true,timeout:600000,maxBuffer:2e6});
                console.log(`${pass} ${id} motion: ${stdout.trim()}`);
            } else console.log(`${pass} ${id}: native frames retained; encode after GPU release`);
        }
    }
    await save('logs',await cli('game','logs','--project',project,'--instance',instance));
} finally {await save('stop',await cli('game','stop','--project',project,'--instance',instance));}
