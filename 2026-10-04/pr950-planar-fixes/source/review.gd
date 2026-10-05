extends Node3D
@export var model_name: String
@export var angle: int = 1

func _ready() -> void:
    var doc := GLTFDocument.new()
    var state := GLTFState.new()
    var err := doc.append_from_buffer(FileAccess.get_file_as_bytes("res://artifacts/pr950/models/" + model_name + ".glb.bin"), "", state)
    assert(err == OK)
    var model := doc.generate_scene(state)
    add_child(model)
    var meshes := model.find_children("*", "MeshInstance3D", true, false)
    var box: AABB = meshes[0].get_aabb()
    for mesh in meshes:
        box = box.merge(mesh.get_aabb())
        if model_name in ["van", "sedan"]:
            var mat := ShaderMaterial.new()
            mat.shader = load("res://assets/shaders/vehicle_paint.gdshader")
            mesh.material_override = mat
            mesh.set_instance_shader_parameter("body_paint", Color("6f8eb5"))
    var world := WorldEnvironment.new()
    var env := Environment.new()
    env.background_mode = Environment.BG_COLOR
    env.background_color = Color("dce4ed")
    env.ambient_light_source = Environment.AMBIENT_SOURCE_COLOR
    env.ambient_light_color = Color.WHITE
    env.ambient_light_energy = 0.6
    env.tonemap_mode = Environment.TONE_MAPPER_FILMIC
    world.environment = env
    add_child(world)
    var light := DirectionalLight3D.new()
    light.rotation_degrees = Vector3(-45, -30, 0)
    light.light_energy = 1.5
    add_child(light)
    var camera := Camera3D.new()
    camera.projection = Camera3D.PROJECTION_ORTHOGONAL
    var centre := box.get_center()
    var direction := Vector3(1.2, 0.7, 1.5) if angle == 1 else Vector3(-1.2, 0.55, -1.5)
    # Long upright fenders are framed horizontally, so the rubber occupies the tile.
    if model_name == "landing-rubber-fender":
        model.rotation_degrees.z = 90
        centre = model.transform * centre
        camera.size = box.size.y * 0.8
        direction = Vector3(0.2, 0.3, 2)
    else:
        camera.size = max(box.size.y * 1.5, max(box.size.x, box.size.z) * 0.95)
    add_child(camera)
    camera.position = centre + direction.normalized() * box.size.length() * 2.5
    camera.look_at(centre)
    camera.current = true
    print("PR950_REVIEW ", model_name, " bounds=", box, " camera_size=", camera.size)
