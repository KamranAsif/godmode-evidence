import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
export const project='artifacts/arm-fix/render-project';
export function cli(args) { const value=JSON.parse(execFileSync(process.execPath,['tools/godot-cli/dist/src/index.js',...args,'--json'],{encoding:'utf8',maxBuffer:40*1024*1024,env:{...process.env,GODMODE_SESSION_ID:'s-muudmv8b-5a466aa57ec1',GODOTJS_PATH:'C:/tools/GodotJS-4.6.1-v8-nopc/editor/godot.windows.editor.x86_64.exe',GODMODE_ASSAULT_HD_PREVIEW:'1'}})); if(!value.ok)throw new Error(value.message);return value.data; }
export function action(name,payload={}) {return cli(['runtime','action','--project',project,'--instance','assault-fix-1','--name',name,'--payload',JSON.stringify(payload)]).result;}
if(process.argv[2]==='restart') {
 if(cli(['game','ps','--project',project]).instances.some(i=>i.instance==='assault-fix-1'))cli(['game','stop','--project',project,'--instance','assault-fix-1']);
 for(const file of ['presentation','character_rig','hd_arm_fit','first_person_pose','weapon_pose','reload_props','reload_hand_motion','wrist_rotation','client/weapon_view','client/knife_view','fixtures/clay_review']) {
  for(const ext of ['js','js.map']) {const source=`.godot/GodotJS/scripts/${file}.${ext}`;if(fs.existsSync(source))fs.copyFileSync(source,`${project}/${source}`);}
 }
 fs.copyFileSync(fs.existsSync('scripts/fixtures/clay_review.ts')?'scripts/fixtures/clay_review.ts':'artifacts/arm-fix/clay_review.ts',`${project}/scripts/fixtures/clay_review.ts`);
 console.log(cli(['game','run','--project',project,'--instance','assault-fix-1','--offscreen','--offscreen-size','1920x1080','--inspect','--allow-actions']));
} else if(process.argv[2]==='info') { const info=action('clay_info'); fs.writeFileSync('artifacts/arm-fix/info.json',JSON.stringify(info,null,2));console.log(info); }
else if(process.argv[2]==='sequence')console.log(action('clay_sequence',{jobs:`res://${process.argv[3] ?? 'jobs.json'}`}));
