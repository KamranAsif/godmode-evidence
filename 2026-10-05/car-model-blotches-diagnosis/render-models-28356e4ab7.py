import bpy, json, math, shutil, hashlib, sys
from pathlib import Path
from mathutils import Vector, Matrix

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parent
PRIVATE = Path('D:/work/Godmode.exe-art-source')
SOURCES = {
    'sedan-runtime': ROOT / 'assets/props/street/sedan.glb.bin',
    'van-runtime': ROOT / 'assets/props/street/van.glb.bin',
    'sedan-meshy-source': PRIVATE / '3d-source/meshy/burn-20261004/lowpoly-sedan/model.glb',
    'van-hunyuan-source': PRIVATE / '3d-source/hunyuan/batch01-van-20261004/model.glb',
}
report = json.loads((OUT / 'model-inspection.json').read_text()) if '--sources-only' in sys.argv else {}
for name, source in SOURCES.items():
    if '--sources-only' in sys.argv and 'runtime' in name: continue
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.render.engine = 'CYCLES'
    scene.cycles.device = 'CPU'
    scene.cycles.samples = 1
    scene.render.resolution_x = 1920
    scene.render.resolution_y = 1080
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = 'PNG'
    scene.view_settings.view_transform = 'Standard'
    scene.view_settings.look = 'None'
    scene.world = bpy.data.worlds.new('Neutral')
    scene.world.use_nodes = True
    scene.world.node_tree.nodes['Background'].inputs[0].default_value = (0.12, 0.12, 0.12, 1)
    file = OUT / (name + '.glb')
    shutil.copyfile(source, file)
    bpy.ops.import_scene.gltf(filepath=str(file))
    objects = [o for o in scene.objects if o.type == 'MESH']
    # Align original sources to the exact +X-forward frame used by the runtime builder.
    if 'source' in name:
        for o in objects:
            o.matrix_world = Matrix.Rotation(math.pi, 4, 'Z') @ o.matrix_world
        bpy.context.view_layer.update()
    points = [o.matrix_world @ Vector(v) for o in objects for v in o.bound_box]
    low = Vector(tuple(min(p[i] for p in points) for i in range(3)))
    high = Vector(tuple(max(p[i] for p in points) for i in range(3)))
    centre = (low + high) / 2
    radius = (high - low).length / 2
    original = {o.name: list(o.data.materials) for o in objects}
    masks = {}
    for o in objects:
        if o.data.color_attributes:
            attr = o.data.color_attributes[0]
            masks[o.name] = {'name': attr.name, 'domain': attr.domain, 'values': sorted(set(tuple(round(x, 5) for x in d.color) for d in attr.data))}
    report[name] = {'source': str(source), 'sha256': hashlib.sha256(source.read_bytes()).hexdigest(), 'images': [i.name for i in bpy.data.images], 'vertexColors': masks, 'triangles': sum(len(p.vertices)-2 for o in objects for p in o.data.polygons)}
    for mode in (['native-colour', 'white-paint', 'plain-white'] if 'runtime' in name else ['own-texture-unlit']):
        for o in objects:
            o.data.materials.clear()
            if mode == 'own-texture-unlit':
                for mat in original[o.name]:
                    mat.use_nodes = True
                    nodes, links = mat.node_tree.nodes, mat.node_tree.links
                    bsdf = next(n for n in nodes if n.type == 'BSDF_PRINCIPLED')
                    emission = nodes.new('ShaderNodeEmission')
                    color = bsdf.inputs['Base Color']
                    if color.is_linked: links.new(color.links[0].from_socket, emission.inputs['Color'])
                    else: emission.inputs['Color'].default_value = color.default_value
                    links.new(emission.outputs[0], next(n for n in nodes if n.type == 'OUTPUT_MATERIAL').inputs['Surface'])
                    o.data.materials.append(mat)
            else:
                mat = bpy.data.materials.new(mode)
                mat.use_nodes = True
                nodes, links = mat.node_tree.nodes, mat.node_tree.links
                nodes.clear()
                output = nodes.new('ShaderNodeOutputMaterial')
                emission = nodes.new('ShaderNodeEmission')
                links.new(emission.outputs[0], output.inputs['Surface'])
                if mode == 'plain-white': emission.inputs['Color'].default_value = (0.638, 0.656, 0.604, 1)
                else:
                    attr = nodes.new('ShaderNodeVertexColor')
                    attr.layer_name = o.data.color_attributes[0].name
                    if mode == 'native-colour': links.new(attr.outputs['Color'], emission.inputs['Color'])
                    else:
                        mix = nodes.new('ShaderNodeMixRGB')
                        links.new(attr.outputs['Alpha'], mix.inputs[0])
                        links.new(attr.outputs['Color'], mix.inputs[1])
                        mix.inputs[2].default_value = (0.638, 0.656, 0.604, 1)
                        links.new(mix.outputs[0], emission.inputs['Color'])
                o.data.materials.append(mat)
                for p in o.data.polygons: p.material_index = 0
        for angle, direction in [('front-right', (1.2,-1,0.55)), ('rear-right', (-1.2,-1,0.55)), ('front-left', (1.2,1,0.55)), ('rear-left', (-1.2,1,0.55))]:
            camera_data = bpy.data.cameras.new('Camera')
            camera = bpy.data.objects.new('Camera', camera_data)
            scene.collection.objects.link(camera)
            camera.location = centre + Vector(direction).normalized() * radius * 3.3
            camera.rotation_euler = (centre - camera.location).to_track_quat('-Z','Y').to_euler()
            camera_data.type = 'ORTHO'
            camera_data.ortho_scale = radius * 2.25
            scene.camera = camera
            scene.render.filepath = str(OUT / f'{name}-{mode}-{angle}.png')
            bpy.ops.render.render(write_still=True)
            bpy.data.objects.remove(camera, do_unlink=True)
    (OUT / 'model-inspection.json').write_text(json.dumps(report, indent=2))
print('MODEL_DIAGNOSIS_DONE', flush=True)
