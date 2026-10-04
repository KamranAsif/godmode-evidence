import bpy, math, json, sys, hashlib
from pathlib import Path
from mathutils import Vector

args=sys.argv[sys.argv.index('--')+1:]
raw=Path(args[0]); out=Path(args[1]); name=args[2]
out.mkdir(parents=True,exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=str(raw))
meshes=[o for o in bpy.context.scene.objects if o.type=='MESH']
points=[o.matrix_world @ Vector(c) for o in meshes for c in o.bound_box]
lower=Vector(tuple(min(p[i] for p in points) for i in range(3)))
upper=Vector(tuple(max(p[i] for p in points) for i in range(3)))
center=(lower+upper)/2;size=max(upper-lower)
scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=24
scene.render.resolution_x=1920;scene.render.resolution_y=1080;scene.render.resolution_percentage=100
scene.world=bpy.data.worlds.new('Neutral review studio');scene.world.use_nodes=True
scene.world.node_tree.nodes['Background'].inputs[0].default_value=(.35,.38,.42,1)
scene.world.node_tree.nodes['Background'].inputs[1].default_value=.5
for offset,power in [((-3,-4,5),900),((4,1,3),600),((0,4,5),800)]:
    bpy.ops.object.light_add(type='AREA',location=center+Vector(offset)*size)
    light=bpy.context.object;light.data.energy=power*size*size;light.data.shape='DISK';light.data.size=size*3
    light.rotation_euler=(center-light.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.object.camera_add();camera=bpy.context.object;camera.data.type='ORTHO';camera.data.ortho_scale=size*2.4;scene.camera=camera
scene.view_settings.view_transform='AgX';scene.render.image_settings.file_format='PNG'
renders=[]
for i,angle in enumerate([-45,45,135,225],1):
    a=math.radians(angle);camera.location=center+Vector((math.cos(a)*4,math.sin(a)*4,2))*size
    camera.rotation_euler=(center-camera.location).to_track_quat('-Z','Y').to_euler()
    path=out/f'{name}-{i:02d}.png';scene.render.filepath=str(path)
    bpy.ops.render.render(write_still=True)
    renders.append({'file':path.name,'azimuthDegrees':angle,'elevationDegrees':math.degrees(math.atan(.5)),'resolution':[1920,1080],'sha256':hashlib.sha256(path.read_bytes()).hexdigest()})
triangles=sum(sum(len(p.vertices)-2 for p in o.data.polygons) for o in meshes)
report={'rawModelSha256':hashlib.sha256(raw.read_bytes()).hexdigest(),'meshObjects':len(meshes),'triangles':triangles,'materials':len([m for m in bpy.data.materials if m.users]),'blenderBounds':{'min':list(lower),'max':list(upper),'size':list(upper-lower)},'renderer':'Blender Cycles, 24 samples, AgX, neutral studio, orthographic; raw geometry/materials unmodified.','renders':renders}
(out/f'{name}-render-manifest.json').write_text(json.dumps(report,indent=2)+'\n')
print('REVIEW_DONE',name,triangles,flush=True)
