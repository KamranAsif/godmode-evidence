import json,struct,math
from pathlib import Path
base=Path.cwd()/'artifacts/arm-fix'; output=base/'frames';output.mkdir(exist_ok=True)
data=Path('assets/characters/assault-hd/character-assault-hd-arms.glb').read_bytes();length=struct.unpack_from('<I',data,12)[0];doc=json.loads(data[20:20+length]);binary=data[28+length:]
def keys(name):
 a=next(a for a in doc['animations'] if a['name']==name);values=set()
 for sampler in a['samplers']:
  accessor=doc['accessors'][sampler['input']];view=doc['bufferViews'][accessor['bufferView']]; offset=view.get('byteOffset',0)+accessor.get('byteOffset',0)
  values.update(struct.unpack_from('<'+'f'*accessor['count'],binary,offset))
 return sorted(values)
reloads={'machineGun':2.7,'pistol':2.5,'shotgun':2.5,'sniperRifle':3.3}
prefixes={'machineGun':'MachineGun','pistol':'Pistol','shotgun':'Shotgun','sniperRifle':'SniperRifle'}
jobs=[];sampling={}
for weapon,prefix in prefixes.items():
 for clip in ['reload','ads','hip-idle','running','sprint','knife','swap','firing','firing-ads']:
  suffix='FirstPersonReload' if clip=='reload' else 'FirstPersonWalk' if clip in ['running','sprint'] else 'FirstPersonShoot' if clip.startswith('firing') else 'FirstPersonIdle'
  name='KnifeSlash' if clip=='knife' else prefix+suffix
  native=keys(name);length=native[-1]
  duration=reloads[weapon] if clip=='reload' else .6 if clip=='knife' else .633 if clip.startswith('firing') else length*2 if clip=='sprint' else length
  # Native keys get priority over nearby floating point versions of 60 Hz samples.
  procedural_duration = duration if clip in ['ads','running','sprint','knife'] else min(duration,.6) if clip=='swap' else 0
  points={round(i/60,5):i/60 for i in range(math.floor(procedural_duration*60)+1)};points[round(duration,5)]=duration
  def screen_time(t):
   if clip=='knife':return t/.4*.15 if t<=.4 else .15+(t-.4)/.6*.45
   return t*duration/length if clip=='reload' or clip.startswith('firing') else t
  for t in native:points[round(screen_time(t),5)]=screen_time(t)
  if clip=='sprint':
   for t in native:points[round(t+length,5)]=t+length
  boundaries=[0,duration]
  if clip=='reload':boundaries += [p*duration for p in [.04,.06,.12,.14,.34,.46,.8,.84,.94]]
  if clip=='ads':boundaries += [1/7]
  if clip=='swap':boundaries += [.6]
  if clip=='sprint':boundaries += [1/6.5]
  if clip=='knife':boundaries += [.1,.15,.4]
  for t in boundaries:
   if t<=duration:points[round(t,5)]=t
  times=sorted(points.values()); key=f'{weapon}/{clip}'
  sampling[key]={'animation':name,'duration':duration,'sourceDuration':length,'nativeKeys':native,'times':times,'boundaries':boundaries}
  for i,t in enumerate(times):
   source=t*length/duration if clip=='reload' or clip.startswith('firing') else t%length if clip=='sprint' and t>length else t
   for camera in ['first-person','side','side-close']:
    file=output/weapon/clip/camera/f'frame-{i:04}.png';file.parent.mkdir(parents=True,exist_ok=True)
    jobs.append(dict(weapon=weapon,clip=clip,camera=camera,frame=i,time=t,phase=t/duration,sourceTime=source,bobPhase=t*math.pi*4,output=file.as_posix()))
(base/'render-project/jobs.json').write_text(json.dumps(jobs));(base/'sampling.json').write_text(json.dumps(sampling,indent=2));print(len(jobs),'frames')
