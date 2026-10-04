import json,numpy as np,csv,hashlib,shutil,math
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
root=Path('artifacts/assault-hd-clay'); data=json.loads((root/'receipts.json').read_text()); samples=json.loads((root/'sampling.json').read_text()); font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',24); small=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',16)
def p(j,n):return np.array(j[n][9:])
def mat(t):return np.array(t[:9]).reshape(3,3).T
def angle(a,b):return float(np.degrees(np.arccos(np.clip(a@b/np.linalg.norm(a)/np.linalg.norm(b),-1,1))))
def bend(j,s):return angle(p(j,s+'Hand')-p(j,s+'LowerArm'),p(j,s+'HandMiddle1')-p(j,s+'Hand'))
def rotation(j,s):return mat(j[s+'LowerArm']).T@mat(j[s+'Hand'])
def difference(a,b):return float(np.degrees(np.arccos(np.clip((np.trace(a.T@b)-1)/2,-1,1))))
def ranges(values):
 out=[]
 for i in values:
  if out and i==out[-1][-1]+1:out[-1].append(i)
  else:out.append([i])
 return ', '.join(f'{v[0]:04d}'+(f'-{v[-1]:04d}' if len(v)>1 else '') for v in out) or 'none'
metrics={};flagged={};summary={}
for clip in samples:
 rs=[r for r in data if r['clip']==clip and r['camera']=='side' and not r.get('stage')];flags=[]
 for r in rs:
  m={'clip':clip,'frame':r['frame'],'time':r['time']}; problems=[]
  for s in ['Left','Right'] if clip!='knife' else ['Right']:
   native=bend(r['raw'],s); corrected=bend(r['corrected'],s); delta=difference(rotation(r['raw'],s),rotation(r['corrected'],s));m.update({s+'RawBend':native,s+'CorrectedBend':corrected,s+'RotationDelta':delta})
   if (corrected>=60 and corrected-native>=20) or delta>=110:problems.append(s+' wrist')
  m['flag']='; '.join(problems);metrics[(clip,r['frame'])]=m
  if problems:flags.append(r['frame'])
 flagged[clip]=flags;summary[clip]={'samplesPerCamera':len(rs),'flaggedFrames':flags,'flaggedRanges':ranges(flags),'maxWristCorrectionDegrees':max(m[k] for key,m in metrics.items() if key[0]==clip for k in m if k.endswith('RotationDelta'))}
 print(clip,summary[clip]['flaggedRanges'])
(root/'problem-frames.json').write_text(json.dumps(summary,indent=2))
fields=sorted({key for m in metrics.values() for key in m})
with (root/'joint-metrics.csv').open('w',newline='') as f:
 w=csv.DictWriter(f,fieldnames=fields);w.writeheader();w.writerows(metrics.values())
# Keep original draw data private, label full-resolution evidence copies.
evidence=Path('artifacts/evidence-clay/2026-10-04/assault-hd-clay'); evidence.mkdir(parents=True,exist_ok=True)
manifest=[]
for clip,times in samples.items():
 for camera in ['first-person','side']:
  folder=evidence/clip/camera;folder.mkdir(parents=True,exist_ok=True); cols=4;cellw=480;cellh=300 if camera=='first-person' else 420
  sheet=Image.new('RGB',(1920,math.ceil(len(times)/cols)*cellh),(28,28,28));sd=ImageDraw.Draw(sheet)
  for i,t in enumerate(times):
   src=root/clip/camera/f'frame-{i:04d}.png';im=Image.open(src).convert('RGB');assert im.size==(1920,1080)
   m=metrics[(clip,i)];bad=bool(m['flag']); label=f'{clip} | {camera} | frame {i:04d} | {t:.4f}s'
   draw=ImageDraw.Draw(im);draw.rectangle((0,0,1000,42),fill=(20,20,20));draw.text((12,7),label,fill='white',font=font)
   if bad:draw.rectangle((0,1036,1920,1080),fill=(130,18,18));draw.text((12,1045),'FLAG: '+m['flag']+' | procedural wrist bend / roll',fill='white',font=font)
   dest=folder/src.name;im.save(dest,optimize=True);manifest.append({'path':dest.relative_to(evidence).as_posix(),'clip':clip,'camera':camera,'frame':i,'seconds':t,'flag':m['flag'],'sha256':hashlib.sha256(dest.read_bytes()).hexdigest()})
   thumb=im.crop((450,0,1450,950)) if camera=='side' else im
   thumb.thumbnail((480,cellh-30));x=i%cols*480;y=i//cols*cellh;sheet.paste(thumb,(x,y));sd.rectangle((x,y,x+478,y+cellh-2),outline=(220,45,45) if bad else (75,75,75),width=3);sd.text((x+8,y+cellh-26),f'{i:04d} | {t:.3f}s'+(' | FLAG' if bad else ''),fill=(255,90,90) if bad else 'white',font=small)
  sheet.save(evidence/clip/f'{camera}-contact-sheet.png',optimize=True)
# Matched ablation images: uniform materials, all poses from the same skin and clip.
shutil.copytree(root/'ablations',evidence/'ablations',dirs_exist_ok=True)
for f in ['receipts.json','sampling.json','joint-metrics.csv','problem-frames.json']:shutil.copy2(root/f,evidence/f)
(evidence/'frames-manifest.json').write_text(json.dumps(manifest,indent=2))
recipe=evidence/'recipe';recipe.mkdir(exist_ok=True);shutil.copy2('scripts/fixtures/clay_review.ts',recipe/'clay_review.ts');shutil.copy2(root/'driver.mjs',recipe/'driver.mjs');shutil.copy2('artifacts/clay-project/project.godot',recipe/'project.godot');shutil.copy2('artifacts/clay-project/clay.tscn',recipe/'clay.tscn')
# A single close-up montage compares the critical reload poses.
for frame in [35,49,50]:
 files=[root/'ablations/reload/raw-first-person'/f'frame-{frame:04d}.png',root/'reload/first-person'/f'frame-{frame:04d}.png']
 sheet=Image.new('RGB',(1920,1080),(25,25,25));d=ImageDraw.Draw(sheet)
 for idx,f in enumerate(files):
  im=Image.open(f).convert('RGB').resize((960,540));sheet.paste(im,(idx*960,200));d.text((idx*960+20,150),['RAW NATIVE CLIP','GAME IK + GRIP'][idx]+f' | reload {frame:04d}',fill='white',font=font)
 sheet.save(evidence/'ablations'/f'reload-{frame:04d}-comparison.png')
print('Evidence frames',len(manifest),'total PNGs',len(list(evidence.rglob('*.png'))))
