import json,struct
from pathlib import Path
root=Path('assets/characters/assault-hd');dest=Path('artifacts/arm-fix/render-project/assets/characters/assault-hd')
for name in ['character-assault-hd','character-assault-hd-arms','character-assault-hd-knife-arms']:
 data=(root/f'{name}.glb').read_bytes();n=struct.unpack_from('<I',data,12)[0];doc=json.loads(data[20:20+n]);binary=data[28+n:]
 doc['materials']=[{'name':'Diagnostic uniform grey','pbrMetallicRoughness':{'baseColorFactor':[.52,.52,.52,1],'metallicFactor':0,'roughnessFactor':.8}}]
 for mesh in doc['meshes']:
  for primitive in mesh['primitives']:primitive['material']=0
 j=json.dumps(doc,separators=(',',':')).encode();j+=b' '*(-len(j)%4);(dest/f'{name}.glb').write_bytes(struct.pack('<III',0x46546c67,2,28+len(j)+len(binary))+struct.pack('<II',len(j),0x4e4f534a)+j+struct.pack('<II',len(binary),0x004e4942)+binary)
