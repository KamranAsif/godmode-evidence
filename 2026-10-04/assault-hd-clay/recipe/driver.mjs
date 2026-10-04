import {execFileSync} from 'node:child_process';
export function cli(args){const r=JSON.parse(execFileSync(process.execPath,['tools/godot-cli/dist/src/index.js',...args,'--json'],{encoding:'utf8',maxBuffer:20*1024*1024,env:{...process.env,GODMODE_SESSION_ID:'s-muub3lgs-cca726df547a'}}));if(!r.ok)throw Error(r.message);return r.data;}
export function action(name,payload){const r=cli(['runtime','action','--project','artifacts/clay-project','--instance','clay-assault','--name',name,'--payload',JSON.stringify(payload)]); console.log(JSON.stringify(r.result));return r;}
