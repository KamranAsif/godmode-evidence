from pathlib import Path
import json, struct, re, shutil, hashlib, sys
phase, staging=sys.argv[1:3]
root=Path(staging)
out=Path('artifacts/evidence')/'bridge'/phase
out.mkdir(parents=True,exist_ok=True)
for name in ['prepare-complete.json','lightmap-complete.json','bake-environment-proof.json','source-report.json','export-logs.json']:
    if (root/name).exists(): shutil.copy2(root/name,out/name)
atlas=root/'assets/maps/sands_pearl/lighting/study_lightmap.exr'
b=atlas.open('rb').read(4096)
tag=b'dataWindow\0box2i\0'
i=b.index(tag)+len(tag)+4
x0,y0,x1,y1=struct.unpack('<4i',b[i:i+16])
width,height=x1-x0+1,y1-y0+1
metadata=Path(str(atlas)+'.import').read_text()
layers=int(re.search(r'slices/vertical=(\d+)',metadata).group(1))
info={'width':width,'heightPerLayer':height//layers,'layers':layers,'gpuBptcMiB':width*height/1024**2,'exrBytes':atlas.stat().st_size,'sha256':hashlib.sha256(atlas.read_bytes()).hexdigest()}
(out/'atlas.json').write_text(json.dumps(info,indent=2)+'\n')
if Path('assets/maps/sands_pearl/lighting/bake.json').exists(): shutil.copy2('assets/maps/sands_pearl/lighting/bake.json',out/'bake.json')
print(info)
