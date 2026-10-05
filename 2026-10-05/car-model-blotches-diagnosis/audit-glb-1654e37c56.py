import json, struct, math, hashlib
from pathlib import Path
OUT = Path(__file__).resolve().parent
report = {}
for name in ['sedan-runtime', 'van-runtime', 'sedan-meshy-source', 'van-hunyuan-source']:
    raw = (OUT / (name+'.glb')).read_bytes()
    size = struct.unpack_from('<I', raw, 12)[0]
    doc = json.loads(raw[20:20+size])
    binary = raw[28+size:]
    entry = {'sha256': hashlib.sha256(raw).hexdigest(), 'textures': len(doc.get('textures',[])), 'images': len(doc.get('images',[])), 'materials': doc.get('materials'), 'attributes': [p['attributes'] for m in doc['meshes'] for p in m['primitives']]}
    if 'runtime' in name:
        def attribute(n):
            a = doc['accessors'][n]
            view = doc['bufferViews'][a['bufferView']]
            width = {'VEC3':3, 'VEC4':4}[a['type']]
            return list(struct.iter_unpack('<'+'f'*width, binary[view.get('byteOffset',0)+a.get('byteOffset',0):view.get('byteOffset',0)+a.get('byteOffset',0)+a['count']*width*4]))
        attrs = doc['meshes'][0]['primitives'][0]['attributes']
        pos, normals, colors = [attribute(attrs[key]) for key in ['POSITION','NORMAL','COLOR_0']]
        totals, bad_normals, degenerate, bad_colors, reversed_normals, dots = {}, 0, 0, 0, 0, []
        for i in range(0,len(pos),3):
            a,b,c = pos[i:i+3]
            u,v = [b[k]-a[k] for k in range(3)], [c[k]-a[k] for k in range(3)]
            cross = [u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]]
            length = math.sqrt(sum(x*x for x in cross))
            if length < 1e-10: degenerate += 1
            else:
                dot = sum(cross[k]*normals[i][k] for k in range(3))/length
                dots.append(dot)
                if dot < 0.99: bad_normals += 1
                if dot < 0: reversed_normals += 1
            if any(colors[i] != colors[i+j] for j in [1,2]): bad_colors += 1
            key = ','.join(str(round(x,6)) for x in colors[i])
            totals[key] = totals.get(key,0)+1
        entry.update(triangles=len(pos)//3, inconsistentTriangleColors=bad_colors, facetNormalDotBelow099=bad_normals, reversedNormals=reversed_normals, minimumNormalDot=min(dots), degenerateTriangles=degenerate, trianglesByRGBA=totals)
    report[name] = entry
(OUT/'glb-audit.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report,indent=2))
