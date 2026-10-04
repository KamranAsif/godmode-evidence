from pathlib import Path
import json,math,shutil,hashlib,gzip,csv,subprocess
import numpy as np
from PIL import Image,ImageDraw,ImageFont
base=Path('artifacts/arm-fix'); target=base/'evidence/2026-10-04/assault-hd-clay-fix-1'
sampling=json.loads((base/'sampling.json').read_text()); rows=json.loads((base/'render-project/receipts.json').read_text())
expected=sum(len(v['times'])*3 for v in sampling.values());assert len(rows)==expected==7110,(len(rows),expected)
target.mkdir(parents=True,exist_ok=True)
def mat(t): return np.array(t[:9]).reshape(3,3).T
def point(j,n):return np.array(j[n][9:])
def angle(a,b): return float(np.degrees(np.arccos(np.clip(a@b/np.linalg.norm(a)/np.linalg.norm(b),-1,1))))
def wrist(j,s):return mat(j[s+'LowerArm']).T@mat(j[s+'Hand'])
def delta(a,b):return float(np.degrees(np.arccos(np.clip((np.trace(a.T@b)-1)/2,-1,1))))
metrics={};summary={};manifest=[]
for r in rows:
 key=(r['weapon'],r['clip'],r['frame'])
 if r['camera']!='side':continue
 m={'weapon':r['weapon'],'clip':r['clip'],'frame':r['frame'],'seconds':r['time'],'sourceSeconds':r['sourceTime']};flags=[]
 for s in ['Right'] if r['clip']=='knife' else ['Left','Right']:
  values=[]
  for name in ['raw','corrected']:
   j=r[name];bend=angle(point(j,s+'Hand')-point(j,s+'LowerArm'),point(j,s+'HandMiddle1')-point(j,s+'Hand'))
   m[s+name.title()+'Bend']=bend;values.append(bend)
  correction=delta(wrist(r['raw'],s),wrist(r['corrected'],s));m[s+'WristCorrection']=correction
  if correction>20.02:flags.append(s+' wrist clamp exceeded')
  if values[1]>=60 and values[1]-values[0]>=15:flags.append(s+' wrist bend amplified by IK')
  elif values[0]>=65:flags.append(s+' native wrist bend')
 contact=r.get('contact') or {};m['SupportResidual']=contact.get('residual',0);m['FiringResidual']=contact.get('firingResidual',0) or 0
 stage=json.loads(r.get('prop') or '{}');m['reloadBelow']=stage.get('below','');m['reloadProp']=stage.get('prop','');m['reloadCycle']=stage.get('cycle','')
 # Out-of-frame reach is recorded, but only a seated contact should be judged as a gap.
 if r['clip'] not in ['swap','knife'] and m['SupportResidual']>.01 and (r['clip']!='reload' or stage.get('below',1)<.1):flags.append('support contact >10mm')
 if r['clip'] not in ['swap','knife'] and m['FiringResidual']>.01:flags.append('firing contact >10mm')
 m['flag']='; '.join(flags);metrics[key]=m
for group,sample in sampling.items():
 weapon,clip=group.split('/');ms=[metrics[(weapon,clip,i)] for i in range(len(sample['times']))]
 summary[group]={'framesPerCamera':len(ms),'sourceAnimation':sample['animation'],'maxWristCorrectionDegrees':max(m[k] for m in ms for k in m if k.endswith('WristCorrection')),'maxSupportResidualMm':max(m['SupportResidual'] for m in ms)*1000,'flagged':[{'frame':m['frame'],'reason':m['flag']} for m in ms if m['flag']]}
 for camera in ['first-person','side','side-close']:
  folder=target/weapon/clip/camera;folder.mkdir(parents=True,exist_ok=True)
  cellw,cellh=480,308;sheet=Image.new('RGB',(1920,math.ceil(len(ms)/4)*cellh),(24,24,24));draw=ImageDraw.Draw(sheet)
  for i,t in enumerate(sample['times']):
   source=base/'frames'/weapon/clip/camera/f'frame-{i:04}.png';dest=folder/source.name
   with Image.open(source) as im:
    assert im.size==(1920,1080),(source,im.size)
    thumbnail=im.convert('RGB');thumbnail.thumbnail((480,270))
   shutil.copy2(source,dest);m=metrics[(weapon,clip,i)];bad=bool(m['flag']);x=i%4*cellw;y=i//4*cellh;sheet.paste(thumbnail,(x,y))
   draw.rectangle((x,y,x+478,y+306),outline=(230,65,65) if bad else (70,70,70),width=3)
   draw.text((x+7,y+277),f'{i:04}  {t:.4f}s'+('  FLAG' if bad else ''),fill=(255,100,100) if bad else 'white',font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',18))
   manifest.append({'path':dest.relative_to(target).as_posix(),'frame':i,'seconds':t,'sourceSeconds':m['sourceSeconds'],'flag':m['flag'],'sha256':hashlib.sha256(dest.read_bytes()).hexdigest()})
  sheet.save(target/weapon/clip/f'{camera}-contact-sheet.png',optimize=True)
 print(group,len(ms),'frames per camera',len(summary[group]['flagged']),'flags',flush=True)
fields=sorted({k for m in metrics.values() for k in m})
with (target/'joint-metrics.csv').open('w',newline='') as file:
 writer=csv.DictWriter(file,fieldnames=fields);writer.writeheader();writer.writerows(metrics.values())
(target/'problem-frames.json').write_text(json.dumps(summary,indent=2));(target/'frames-manifest.json').write_text(json.dumps(manifest,indent=2));shutil.copy2(base/'sampling.json',target/'sampling.json')
with gzip.open(target/'receipts.json.gz','wb') as f:f.write((base/'render-project/receipts.json').read_bytes())
recipe=target/'recipe';recipe.mkdir(exist_ok=True)
for source in ['clay_review.ts','jobs.py','package.py','control.mjs'] : shutil.copy2(base/source,recipe/source)
for source in ['project.godot','clay.tscn']:shutil.copy2(base/'render-project'/source,recipe/source)
for source in ['character_rig.ts','hd_arm_fit.ts','first_person_pose.ts','wrist_rotation.ts','finger_rotation.ts','reload_hand_motion.ts','reload_props.ts','presentation.ts','weapon_pose.ts','weapon_catalog.ts','client/weapon_view.ts','client/knife_view.ts']:
 dest=recipe/'production'/source;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(Path('scripts')/source,dest)
commit=subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip();(recipe/'game-commit.txt').write_text(commit+'\n')
links=['| Weapon / clip | Frames per camera | FP | Side | Close side | Flags |','| --- | ---: | --- | --- | --- | ---: |']
for group,v in summary.items():links.append(f"| {group} | {v['framesPerCamera']} | [sheet]({group}/first-person-contact-sheet.png) | [sheet]({group}/side-contact-sheet.png) | [sheet]({group}/side-close-contact-sheet.png) | {len(v['flagged'])} |")
notes=f'''# Assault HD clay fix 1 — awaiting independent vision audit

Game source: `{commit}` on `fix/assault-hd-arm-poses`, rebased on merged #943 and #945. Exact production sources are saved under [recipe/production](recipe/production). No game PR has been opened or updated for these fixes.

{expected} individual, uncropped, unannotated 1920×1080 PNG originals; 108 contact sheets. Frame numbers are in filenames and sheet labels. Red sheet borders mean a measurement flagged that frame; [problem-frames.json](problem-frames.json) gives the exact frames and reasons. Flags are review leads, not a substitute for the vision auditor. [frames-manifest.json](frames-manifest.json) records every frame's SHA-256, time and flag.

## Presentation and timing

Uniform grey roughness 0.8, no textures or normal maps, simple directional key (−35°, −35°, energy 1.3), ambient 0.28. Native GPU render at 1920×1080, windowed and off-screen. FP FOV 50° matches the production viewmodel camera; near plane 0.005 m. Original side camera: (−1.9, 0.12, −0.45), target (0, −0.25, −0.45), FOV 45°. Added close side: (−1.05, −0.08, −0.4), target (0, −0.28, −0.4), FOV 45°. Both side originals remain uncropped.

Every animation input key is included, plus procedural transition boundaries. ADS, running, sprint and knife also sample 60 Hz. Reload source keys map to the actual roguelite reload durations: MG 2.7 s, pistol 2.5 s, shotgun 2.5 s, sniper 3.3 s. Firing source keys map to 0.633 s and use production recoil recovery. ADS transition uses production 7/s blend, then held native idle. Running and sprint use FirstPersonWalk, which current selectFirstPersonAnimation selects for both; locomotion inspection uses the authored source clock, with sprint entry and production carry/sway applied. Swap uses native idle plus the actual 0.6 s draw transform. Knife uses production KnifeView timing, its gun dip, and the held gun/arms alongside the knife.

These are poses through production first_person_pose, WeaponView hand/reload methods, and KnifeView. The diagnostic copies the production camera composition formulas; it omits HUD, world scenery, scope overlay, blur and muzzle flash to expose joints. Sniper ADS shows the underlying geometry rather than covering it with the scope overlay. Per-frame raw native and corrected bone matrices and prop stages are saved in receipts.json.gz; metrics are in joint-metrics.csv.

## What changed and diagnosis

- Both grip targets, palm spacing, hand axes and elbow poles are measured from the new 65-bone native rig. Camera shoulder depth is derived from this rig's forearm length; it no longer uses the old forward shoulder anchor. Sprint pivot follows the measured firing grip.
- Wrist correction is clamped to 20° from the native wrist in its forearm frame, with unit coverage; measured deltas include normal float error. Forearm seating roll has a 60° correction budget. Reload fades palm orientation seating; IK remains for the firing grip and actual reload-prop contact. Native fingers remain blended rather than replaced (75% native on ordinary holds; 25% native while actively grasping a reload prop).
- MG, pistol and sniper use #943's real Magazine node: detach to the animated palm carrier, release/drop below frame, create a fresh magazine below frame, bring it up, interpolate seating and reparent to MagazineSocket. Shotgun uses three separately visible shells retrieved below frame and seated at the tube socket.
- The baseline's extreme wrist collapse came from procedural placement (up to about 149° local correction), not a weight-transfer pass: this mesh was rigged directly on Mixamo and has no transferred weights. This iteration preserves the original mesh, skin, native clips and finger tracks. Any remaining change between raw and corrected matrices is procedural; an abnormal shape already present in raw is a native clip/skinning issue. The original extracted open shoulder edges are visible in side diagnostics.
- Wrist-bend flags use the same knuckle/forearm proxy as the baseline: corrected ≥60° and at least 15° above native, or native ≥65°. Contact flags identify >10 mm residual at visible/seated contacts. Off-screen swap travel and off-screen reload retrieval residuals are recorded but not treated as contact defects. The auditor must judge actual glove, finger and shell/magazine contact from individual frames.

Build passed, pnpm format ran, lint passed (existing warnings), and all seven wrist/finger/reload-clock unit tests passed. This set is an iteration for audit, not a declaration that every clip passes.

## Frame index

'''+'\n'.join(links)+'\n'
(target/'README.md').write_text(notes,encoding='utf-8');(target/'ENGINE-NOTES.md').write_text(notes,encoding='utf-8')
print('READY TO PUSH',expected,'original frames',flush=True)
