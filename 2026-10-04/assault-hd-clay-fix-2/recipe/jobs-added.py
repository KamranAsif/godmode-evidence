import json, math, struct
from pathlib import Path
base=Path('artifacts/arm-fix'); output=(Path.cwd()/base/'frames-fix-2')
jobs=[j for j in json.loads((base/'render-project/jobs-fix-2.json').read_text()) if j['clip']=='ads']
sampling=json.loads((base/'sampling-fix-2.json').read_text())
data=Path('assets/characters/assault-hd/character-assault-hd-arms.glb').read_bytes();length=struct.unpack_from('<I',data,12)[0];doc=json.loads(data[20:20+length]);binary=data[28+length:]
def native_keys(name):
    a=next(a for a in doc['animations'] if a['name']==name);values=set()
    for sampler in a['samplers']:
        acc=doc['accessors'][sampler['input']];view=doc['bufferViews'][acc['bufferView']];offset=view.get('byteOffset',0)+acc.get('byteOffset',0)
        values.update(struct.unpack_from('<'+'f'*acc['count'],binary,offset))
    return sorted(values)
def add(weapon,clip,start,end,bounds):
    points={round(start+i/60,5):start+i/60 for i in range(math.floor((end-start)*60)+1)}
    for t in [start,end]+bounds:
        if start<=t<=end:points[round(t,5)]=t
    native=[]
    if clip=='rappel':
        name={'machineGun':'MachineGun','pistol':'Pistol','shotgun':'Shotgun','sniperRifle':'SniperRifle'}[weapon]+'FirstPersonShoot'
        native=native_keys(name);interval={'machineGun':.1,'pistol':.18,'shotgun':.7,'sniperRifle':.9}[weapon]
        for cycle in range(math.ceil(end/interval)):
            for key in native+[0]:
                shot_time=key/native[-1]*.633;t=cycle*interval+shot_time
                if shot_time<=min(.633,interval) and start<=t<=end:points[round(t,5)]=t
    times=sorted(points.values())
    sampling[f'{weapon}/{clip}']={'animation':'TPose' if weapon=='tablet' else 'FirstPersonShoot + insertion hand contact',
        'duration':end-start,'times':times,'boundaries':bounds,'nativeKeys':native, 'start':start,
        'scope':'production tablet' if weapon=='tablet' else 'isolated rope-hand contact; complete descent audited in Lane D scene'}
    for i,t in enumerate(times):
        for camera in ['first-person','side','side-close']:
            path=output/weapon/clip/camera/f'frame-{i:04}.png';path.parent.mkdir(parents=True,exist_ok=True)
            jobs.append(dict(weapon=weapon,clip=clip,camera=camera,frame=i,time=t,sourceTime=t,bobPhase=0,output=path.as_posix()))
add('tablet','tablet-raise',0,.75,[0,.75])
add('tablet','tablet-hold',.75,.9,[.75,.9])
add('tablet','tablet-tap',.9,1.7,[.9,1.15,1.27,1.37,1.5,1.57,1.7])
add('tablet','tablet-lower',0,.38,[0,.15,.3,.38])
for weapon in ['machineGun','pistol','shotgun','sniperRifle']:add(weapon,'rappel',0,3,[0,3])
(base/'render-project/jobs-added.json').write_text(json.dumps(jobs))
(base/'sampling-fix-2-complete.json').write_text(json.dumps(sampling,indent=2))
print(len(jobs))
