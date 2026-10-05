from pathlib import Path
import json, math, shutil, hashlib, gzip, csv
import numpy as np
from scipy.spatial.transform import Rotation, Slerp
from PIL import Image,ImageDraw,ImageFont
base=Path('artifacts/arm-fix'); target=base/'evidence/2026-10-04/assault-hd-clay-fix-2'
sampling=json.loads((base/'sampling-fix-2-complete.json').read_text())
core=json.loads((base/'core-fix-2-receipts.json').read_text())
added=json.loads((base/'added-fix-2-receipts.json').read_text())
rows=[r for r in core if r['clip']!='ads']+added
expected=sum(len(s['times'])*3 for s in sampling.values());assert len(rows)==expected,(len(rows),expected)
target.mkdir(parents=True,exist_ok=True)
def mat(t):return np.array(t[:9]).reshape(3,3).T
def wrist(j,s):return mat(j[s+'LowerArm']).T@mat(j[s+'Hand'])
def delta(a,b):return float(np.degrees(np.arccos(np.clip((np.trace(a.T@b)-1)/2,-1,1))))
idle={r['weapon']:r['raw'] for r in core if r['clip']=='hip-idle' and r['frame']==0 and r['camera']=='side'}
metrics={}; summary={};manifest=[];previous={}
for r in rows:
    if r['camera']!='side':continue
    key=(r['weapon'],r['clip'],r['frame']);m={'weapon':r['weapon'],'clip':r['clip'],'frame':r['frame'],'seconds':r['time'],'sourceSeconds':r.get('sourceTime',r['time'])};flags=[]
    if r['clip']=='ads' and r['time']*7>=.999:m['sourceSeconds']=0
    if 'raw' in r:
        for side in ['Right'] if r['clip']=='knife' else ['Left','Right']:
            native=wrist(r['raw'],side);corrected=wrist(r['corrected'],side)
            m[side+'OriginalClipWristDelta']=delta(native,corrected)
            if r['clip']=='reload':
                p=r['time']/sampling[r['weapon']+'/reload']['duration'];t=max(0,min(1,(p-.88)/.12));t=t*t*(3-2*t)
                if t: native=Slerp([0,1],Rotation.from_matrix(np.stack([native,wrist(idle[r['weapon']],side)])))([t]).as_matrix()[0]
            correction=delta(native,corrected);m[side+'WristCorrection']=correction
            if correction>20.1:flags.append(side+' native-relative wrist clamp review')
    contact=r.get('contact') or {};m['SupportResidual']=contact.get('residual',0);m['FiringResidual']=contact.get('firingResidual',0) or 0
    stage=json.loads(r.get('prop') or '{}');m['reloadBelow']=stage.get('below','');m['reloadProp']=stage.get('prop','')
    if r['clip'] not in ['knife','swap','rappel'] and m['SupportResidual']>.01 and (r['clip']!='reload' or stage.get('below',1)<.1):flags.append('support contact residual >10mm')
    if m['FiringResidual']>.01:flags.append('firing contact residual >10mm')
    if r['weapon']=='tablet':
        for field in ['leftContact','rightContact','tapResidual']:m[field]=r.get(field,-1)
        if r['clip']=='tablet-tap' and 1.15<=r['time']<=1.2 and m['tapResidual']>.006:flags.append('tablet tap residual >6mm')
    if r['weapon']=='pistol' and r['clip']=='sprint' and r['frame']==31:flags.append('VISUAL: upright thumb lacks receiver-side contact; procedural thumb target')
    prior=previous.get((r['weapon'],r['clip']))
    if prior and r['time']-prior['time']<=.035:
        for side in ['Right'] if r['clip']=='knife' else ['Left','Right']:
            for bone in ['UpperArm','LowerArm','Hand','HandThumb1']:
                name=side+bone;step=delta(mat(prior['corrected'][name]),mat(r['corrected'][name]));m[name+'StepDegrees']=step
                raw_step=delta(mat(prior['raw'][name]),mat(r['raw'][name])) if 'raw' in prior and 'raw' in r else 0
                if step>25 and step>raw_step+15:flags.append(name+' consecutive rotation jump review')
    previous[(r['weapon'],r['clip'])]=r
    m['flag']='; '.join(flags);metrics[key]=m
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',18)
for group,sample in sampling.items():
    weapon,clip=group.split('/');ms=[metrics[(weapon,clip,i)] for i in range(len(sample['times']))]
    summary[group]={'framesPerCamera':len(ms),'sourceAnimation':sample['animation'],'flagged':[{'frame':m['frame'],'seconds':m['seconds'],'reason':m['flag']} for m in ms if m['flag']]}
    for camera in ['first-person','side','side-close']:
        folder=target/weapon/clip/camera;folder.mkdir(parents=True,exist_ok=True)
        sheet=Image.new('RGB',(1920,math.ceil(len(ms)/4)*308),(24,24,24));draw=ImageDraw.Draw(sheet)
        for i,t in enumerate(sample['times']):
            source=base/'frames-fix-2'/weapon/clip/camera/f'frame-{i:04}.png';dest=folder/source.name
            with Image.open(source) as im:
                assert im.size==(1920,1080);thumbnail=im.convert('RGB');thumbnail.thumbnail((480,270))
            shutil.copy2(source,dest);m=metrics[(weapon,clip,i)];x=i%4*480;y=i//4*308;sheet.paste(thumbnail,(x,y));bad=bool(m['flag'])
            draw.rectangle((x,y,x+478,y+306),outline=(230,65,65) if bad else (70,70,70),width=3)
            draw.text((x+7,y+277),f'{i:04} {t:.4f}s'+(' FLAG' if bad else ''),fill=(255,100,100) if bad else 'white',font=font)
            manifest.append({'path':dest.relative_to(target).as_posix(),'frame':i,'seconds':t,'sourceSeconds':m['sourceSeconds'],'flag':m['flag'],'sha256':hashlib.sha256(dest.read_bytes()).hexdigest()})
        sheet.save(target/weapon/clip/f'{camera}-contact-sheet.png')
    print(group,len(ms),flush=True)
fields=sorted({k for m in metrics.values() for k in m})
with (target/'joint-metrics.csv').open('w',newline='') as f:
    writer=csv.DictWriter(f,fieldnames=fields);writer.writeheader();writer.writerows(metrics.values())
(target/'problem-frames.json').write_text(json.dumps(summary,indent=2));(target/'frames-manifest.json').write_text(json.dumps(manifest,indent=2));shutil.copy2(base/'sampling-fix-2-complete.json',target/'sampling.json')
with gzip.open(target/'receipts.json.gz','wb') as f:f.write(json.dumps(rows).encode())
shutil.copytree(base/'core-fix-2-recipe',target/'recipe/core',dirs_exist_ok=True)
shutil.copytree(base/'added-fix-2-recipe',target/'recipe/added',dirs_exist_ok=True)
for file in ['package-fix-2.py','jobs-added.py']:shutil.copy2(base/file,target/'recipe'/file)
print('PACKAGED',expected,'originals',flush=True)
