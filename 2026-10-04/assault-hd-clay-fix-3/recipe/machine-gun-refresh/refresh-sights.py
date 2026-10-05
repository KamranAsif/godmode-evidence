from pathlib import Path
import struct,json,shutil
work=Path.cwd();project=work/'artifacts/arm-fix/render-project'
for source in (work/'assets/weapons/generated').glob('*.glb'):
    data=source.read_bytes();count,kind=struct.unpack_from('<II',data,12);doc=json.loads(data[20:20+count]);tail=data[20+count:]
    doc['materials']=[{'name':'Diagnostic clay','pbrMetallicRoughness':{'baseColorFactor':[.52,.52,.52,1],'metallicFactor':0,'roughnessFactor':.8}}]
    for mesh in doc.get('meshes',[]):
        for primitive in mesh['primitives']:primitive['material']=0
    for name in ['textures','images','samplers']:doc.pop(name,None)
    payload=json.dumps(doc,separators=(',',':')).encode();payload+=b' '*(-len(payload)%4)
    destination=project/source.relative_to(work)
    destination.write_bytes(struct.pack('<III',0x46546c67,2,20+len(payload)+len(tail))+struct.pack('<II',len(payload),0x4e4f534a)+payload+tail)
    shutil.copy2(str(source)+'.import',str(destination)+'.import')
    print(source.name)
