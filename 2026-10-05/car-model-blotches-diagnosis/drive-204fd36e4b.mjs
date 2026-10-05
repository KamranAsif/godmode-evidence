import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
const [mode, name, file] = process.argv.slice(2);
const common = ['--project', '.', '--instance', 'car-blotches-diag', '--json'];
const command = mode === 'action' ? ['runtime','action',...common,'--name',name,'--payload',readFileSync(file,'utf8')]
    : mode === 'capture' ? ['game','capture',...common,'--output',name]
    : ['runtime','inspect',...common,...(mode === 'tree' ? [] : ['--store-only'])];
const result = spawnSync(process.execPath,['tools/godot-cli/dist/src/index.js',...command],{encoding:'utf8',maxBuffer:30e6});
if (result.stderr) writeFileSync('artifacts/car-diagnosis/last-cli-stderr.log',result.stderr);
let parsed;
try { parsed=JSON.parse(result.stdout); } catch { console.log(result.stdout); process.exit(1); }
writeFileSync(`artifacts/car-diagnosis/${mode}-${(name || 'store').replaceAll('/','-')}.json`,JSON.stringify(parsed,null,2));
if(mode === 'capture') console.log(JSON.stringify({ok:parsed.ok,message:parsed.message,outputPath:parsed.data?.outputPath}));
else if (parsed.data) console.log(JSON.stringify({ok:parsed.ok,message:parsed.message,...(mode==='action'?{result:parsed.data.result}:{keys:Object.keys(parsed.data),store:parsed.data.store})}));
else console.log(JSON.stringify(parsed));
process.exit(result.status || 0);
