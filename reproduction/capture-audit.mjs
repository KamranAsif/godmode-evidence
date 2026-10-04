import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const exec = promisify(execFile);
const project = process.cwd();
const output = resolve(process.argv[2]);
const phase = process.argv[3];
const instance = `bridge-audit-${phase}-${process.pid}`;
const views = [
    {id:'tower-shade',position:[-515,12,-507],target:[-556,15,-456]},
    {id:'tower-player',position:[-507,-15,-442],target:[-556,6,-456]},
    {id:'tower-relief',position:[-535,8,-477],target:[-556,9,-456]},
    {id:'deck-shade',position:[-552,-10,-379],target:[-540,5,-437]},
    {id:'roofs',position:[-490,33,-334],target:[-482,12,-303]},
    {id:'trim',position:[-490,0,-334],target:[-481,3,-321]},
    {id:'kerb',position:[-586,-15.68,-344],target:[-595,-17.6,-344]},
    {id:'pier',position:[-760,-11.53,-250],target:[-780,-13,-284]},
];
async function cli(...args) {
    const {stdout} = await exec(process.execPath, ['tools/godot-cli/dist/src/index.js',...args,'--json'], {cwd:project,timeout:600000,maxBuffer:30e6,windowsHide:true});
    const reply=JSON.parse(stdout); if(!reply.ok) throw Error(reply.message+' '+stdout); return reply.data;
}
const action=(name,payload)=>cli('runtime','action','--project',project,'--instance',instance,'--name',name,'--payload',JSON.stringify(payload));
await mkdir(output,{recursive:true});
await cli('game','ps','--all');
const {sessionId}=await cli('session','new');
const records=[];
try {
    await cli('game','run','--project',project,'--instance',instance,'--session',sessionId,'--scene','res://tools/maps/preview_study_lighting.tscn','--offscreen','--offscreen-size','1920x1080','--inspect','--allow-actions');
    const deadline=Date.now()+900000;
    while(true) {
        try { const camera=await action('audit_camera',views[0]); if(camera.result?.accepted) break; }
        catch(error) { if(Date.now()>deadline) throw error; }
        if(Date.now()>deadline) throw Error('Audit scene did not become ready');
        await new Promise(r=>setTimeout(r,1500));
    }
    for(const view of views) {
        const camera=await action('audit_camera',view);
        if(!camera.result?.accepted) throw Error(JSON.stringify(camera));
        await new Promise(r=>setTimeout(r,1200));
        await cli('game','capture','--project',project,'--instance',instance,'--output',resolve(output,`${view.id}-${phase}.png`));
        records.push({view,camera});
    }
    if(phase==='after') {
        const trial=await action('audit_textures',{enabled:true});
        await writeFile(resolve(output,'texture-trials.json'),JSON.stringify(trial,null,2));
        if(!trial.result?.accepted) throw Error(JSON.stringify(trial));
        for(const view of views.filter(v=>['roofs','trim','kerb'].includes(v.id))) {
            await action('audit_camera',view);
            await new Promise(r=>setTimeout(r,1200));
            await cli('game','capture','--project',project,'--instance',instance,'--output',resolve(output,`${view.id}-trial.png`));
        }
    }
    await writeFile(resolve(output,`logs-${phase}.json`),JSON.stringify(await cli('game','logs','--project',project,'--instance',instance),null,2));
    await writeFile(resolve(output,`capture-${phase}.json`),JSON.stringify(records,null,2));
} finally {await cli('session','end','--session',sessionId);}
