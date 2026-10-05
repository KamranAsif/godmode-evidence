"""Add an inner glove/cuff gusset to the native HD mesh; preserve source surfaces and clips."""
import argparse, json, struct, hashlib, sys
from pathlib import Path
import numpy as np

parser=argparse.ArgumentParser()
parser.add_argument('input',type=Path)
parser.add_argument('output',type=Path)
parser.add_argument("--model")
args=parser.parse_args(sys.argv[sys.argv.index("--")+1:] if "--" in sys.argv else None)
data=args.input.read_bytes()
length=struct.unpack_from('<I',data,12)[0]
doc=json.loads(data[20:20+length])
if doc.get('extras',{}).get('wristGusset'): raise ValueError('Already repaired: use the pristine rigged body')
bin_length=struct.unpack_from('<I',data,20+length)[0]
binary=bytearray(data[28+length:28+length+bin_length])
dtypes={5126:'<f4',5125:'<u4',5123:'<u2',5121:'u1'}
widths={'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4,'MAT4':16}
def rows(id):
 a=doc['accessors'][id]; v=doc['bufferViews'][a['bufferView']];dtype=np.dtype(dtypes[a['componentType']]);width=widths[a['type']]
 return np.ndarray((a['count'],width),dtype=dtype,buffer=binary,offset=v.get('byteOffset',0)+a.get('byteOffset',0),strides=(v.get('byteStride',width*dtype.itemsize),dtype.itemsize)).copy()
def append(values,kind,component=5126,target=34962):
 arr=np.asarray(values,dtype=dtypes[component]);pad=(-len(binary))%4;binary.extend(bytes(pad));offset=len(binary);binary.extend(arr.tobytes())
 v=len(doc['bufferViews']);doc['bufferViews'].append({'buffer':0,'byteOffset':offset,'byteLength':arr.nbytes,'target':target})
 a={'bufferView':v,'componentType':component,'count':len(arr),'type':kind}
 if kind=='VEC3':a.update(min=arr.min(axis=0).tolist(),max=arr.max(axis=0).tolist())
 id=len(doc['accessors']);doc['accessors'].append(a);return id
node=next(n for n in doc['nodes'] if 'skin'in n and 'mesh'in n)
skin=doc['skins'][node['skin']];names=[doc['nodes'][i]['name'] for i in skin['joints']]
bind=rows(skin['inverseBindMatrices']);rest=[np.linalg.inv(x.reshape(4,4,order='F')) for x in bind]
positions=[];weights=[];joints=[]
for primitive in doc['meshes'][node['mesh']]['primitives']:
 positions.append(rows(primitive['attributes']['POSITION']))
 w=rows(primitive['attributes']['WEIGHTS_0']);j=rows(primitive['attributes']['JOINTS_0'])
 if 'WEIGHTS_1'in primitive['attributes']:
  w=np.concatenate([w,rows(primitive['attributes']['WEIGHTS_1'])],axis=1);j=np.concatenate([j,rows(primitive['attributes']['JOINTS_1'])],axis=1)
 weights.append(w);joints.append(j)
positions=np.concatenate(positions);weights=np.concatenate(weights);joints=np.concatenate(joints)
new_positions=[];normals=[];new_weights=[];new_joints=[];indices=[];report=[]
for side in ['Left','Right']:
 hand=names.index('mixamorig:'+side+'Hand');fore=names.index('mixamorig:'+side+'ForeArm')
 origin=rest[hand][:3,3];axis=origin-rest[fore][:3,3];axis/=np.linalg.norm(axis)
 index=rest[names.index('mixamorig:'+side+'HandIndex1')][:3,3]
 pinky=rest[names.index('mixamorig:'+side+'HandPinky1')][:3,3]
 u=index-pinky;u-=axis*np.dot(u,axis);u/=np.linalg.norm(u);v=np.cross(axis,u)
 delta=positions-origin;t=delta@axis
 influence=np.sum(weights*np.isin(joints,[hand,fore]),axis=1)
 section=delta[(np.abs(t)<0.02)&(influence>0.5)]
 if len(section)<30:raise ValueError('Missing native wrist cross section')
 major=max(.018,min(.045,float(np.quantile(np.abs(section@u),.95))*.98))
 minor=max(.015,min(.038,float(np.quantile(np.abs(section@v),.95))*.98))
 base=len(new_positions);rings=9;sides=32
 for ring in range(rings):
  distance=-.055+ring*.105/(rings-1)
  blend=float(np.clip((distance+.04)/.065,0,1));blend=blend*blend*(3-2*blend)
  for i in range(sides):
   theta=2*np.pi*i/sides
   radial=u*np.cos(theta)*major+v*np.sin(theta)*minor
   normal=u*np.cos(theta)/major+v*np.sin(theta)/minor;normal/=np.linalg.norm(normal)
   new_positions.append(origin+axis*distance+radial);normals.append(normal)
   new_weights.append([1-blend,blend,0,0]);new_joints.append([fore,hand,0,0])
 for ring in range(rings-1):
  for i in range(sides):
   a=base+ring*sides+i;b=base+ring*sides+(i+1)%sides;c=a+sides;d=b+sides
   indices.extend([[a,b,c],[b,d,c]])
 for end,distance in [(0,-.055),(rings-1,.05)]:
  center=len(new_positions);new_positions.append(origin+axis*distance);normals.append(axis*(-1 if end==0 else 1))
  new_weights.append([1,0,0,0] if end==0 else [0,1,0,0]);new_joints.append([fore,hand,0,0])
  for i in range(sides):
   a=base+end*sides+i;b=base+end*sides+(i+1)%sides
   indices.append([center,b,a] if end==0 else [center,a,b])
 report.append({'side':side,'majorRadius':major,'minorRadius':minor,'sampleVertices':len(section),'rings':rings,'radialSegments':sides})
material=len(doc.setdefault('materials',[]));doc['materials'].append({'name':'Inner tactical glove cuff','pbrMetallicRoughness':{'baseColorFactor':[.07,.08,.055,1],'metallicFactor':0,'roughnessFactor':.88},'doubleSided':False})
primitive={'attributes':{'POSITION':append(new_positions,'VEC3'),'NORMAL':append(normals,'VEC3'),'WEIGHTS_0':append(new_weights,'VEC4'),'JOINTS_0':append(new_joints,'VEC4',5123)},'indices':append(indices,'SCALAR',5125,34963),'material':material,'mode':4}
# SCALAR indices are flattened, unlike the triangle list used while constructing.
id=primitive['indices'];doc['accessors'][id]['count']=len(indices)*3
record={'method':'Closed skinned inner wrist gusset fitted to native mesh cross sections; source vertices, weights, UVs, textures and animation tracks unchanged','inputSha256':hashlib.sha256(data).hexdigest(),'addedVertices':len(new_positions),'addedTriangles':len(indices),'wrists':report}
doc['meshes'][node['mesh']]['primitives'].append(primitive);doc.setdefault('extras',{})['wristGusset']=record
doc['buffers'][0]['byteLength']=len(binary)
j=json.dumps(doc,separators=(',',':')).encode();j+=b' '*(-len(j)%4);binary.extend(bytes(-len(binary)%4))
out=struct.pack('<III',0x46546c67,2,28+len(j)+len(binary))+struct.pack('<II',len(j),0x4e4f534a)+j+struct.pack('<II',len(binary),0x004e4942)+binary
args.output.parent.mkdir(parents=True,exist_ok=True);args.output.write_bytes(out)
print(json.dumps(record,indent=2))

if args.model:
 manifest_path=args.output.parent/'provenance.json'
 manifest=json.loads(manifest_path.read_text())
 entry=manifest[args.model]
 entry['outputTriangles']+=record['addedTriangles']
 entry['vertices']+=record['addedVertices']
 entry['wristRepair']={**record,'outputSha256':hashlib.sha256(out).hexdigest()}
 manifest_path.write_text(json.dumps(manifest,indent=2)+'\n')
