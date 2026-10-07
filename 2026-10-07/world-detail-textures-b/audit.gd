extends Node3D

var client: Node
var server: Node
var pinned: Dictionary = {}
var saved_fill: Dictionary = {}
var sun: DirectionalLight3D
var environment: Environment
var motion: Dictionary = {}
var stage: Node3D

func _ready() -> void:
    stage = Node3D.new()
    stage.set_script(load("res://artifacts/prop-review/stage.ts"))
    add_child(stage)
    process_priority = 1000
    if OS.get_environment("GODMODE_LIGHTING_SINGLE_PROCESS") == "1":
        var host_view := SubViewport.new()
        host_view.name = "ServerViewport"
        host_view.own_world_3d = true
        host_view.size = Vector2i(16,16)
        host_view.render_target_update_mode = SubViewport.UPDATE_DISABLED
        add_child(host_view)
        var server_root := Node3D.new()
        server_root.name = "Server"
        host_view.add_child(server_root)
        get_tree().set_multiplayer(SceneMultiplayer.new(),server_root.get_path())
        server = load("res://scenes/main.tscn").instantiate()
        server.set_meta("lightingAuditServer",true)
        server_root.add_child(server)
        var client_root := Node3D.new()
        client_root.name = "Client"
        add_child(client_root)
        get_tree().set_multiplayer(SceneMultiplayer.new(),client_root.get_path())
        client = load("res://scenes/main.tscn").instantiate()
        client_root.add_child(client)
    else:
        client = load("res://scenes/main.tscn").instantiate()
        add_child(client)
    DisplayServer.window_set_mode(DisplayServer.WINDOW_MODE_WINDOWED)
    DisplayServer.window_set_flag(DisplayServer.WINDOW_FLAG_BORDERLESS,true)
    DisplayServer.window_set_flag(DisplayServer.WINDOW_FLAG_NO_FOCUS,true)
    DisplayServer.window_set_size(Vector2i(1920,1080))
    DisplayServer.window_set_position(Vector2i(-10000,-10000))
    DisplayServer.window_set_vsync_mode(DisplayServer.VSYNC_DISABLED)
    Engine.max_fps = 0

func _process(_delta: float) -> void:
    if client != null and client.has_meta("godot_cli_state"):
        set_meta("godot_cli_state",client.get_meta("godot_cli_state"))
    if not motion.is_empty():
        var elapsed: float = (Time.get_ticks_usec() - motion.started_us) / 1000000.0
        pinned = motion.pose.duplicate(true)
        pinned.position[0] += sin(elapsed * 0.8) * motion.amplitude
        pinned.yaw += sin(elapsed * 0.8) * motion.yaw_swing
    if not pinned.is_empty():
        var camera := get_viewport().get_camera_3d()
        if camera != null:
            camera.global_position = Vector3(pinned.position[0],pinned.position[1],pinned.position[2])
            camera.rotation = Vector3(pinned.pitch,pinned.yaw,0)
            camera.fov = pinned.get("fov",75)

func json_value(value: Variant) -> Variant:
    if value is Color: return [value.r,value.g,value.b,value.a]
    if value is Vector3: return [value.x,value.y,value.z]
    if value is Vector2 or value is Vector2i: return [value.x,value.y]
    if value is Resource: return {"class":value.get_class(),"path":value.resource_path}
    return value

func properties(object: Object, names: Array) -> Dictionary:
    var result := {}
    for key in names: result[key] = json_value(object.get(key))
    return result

func inventory() -> Dictionary:
    var worlds := client.find_children("*","WorldEnvironment",true,false)
    var suns := client.find_children("*","DirectionalLight3D",true,false)
    if worlds.is_empty() or suns.is_empty(): return {"accepted":false,"error":"lighting not ready"}
    environment = worlds[0].environment
    sun = suns[0]
    var env_keys := ["tonemap_mode","tonemap_exposure","tonemap_white","background_energy_multiplier","ambient_light_source","ambient_light_energy","ambient_light_color","ambient_light_sky_contribution","reflected_light_source","glow_enabled","glow_intensity","glow_strength","glow_normalized","glow_bloom","glow_hdr_threshold","ssao_enabled","ssao_radius","ssao_intensity","ssao_power","ssao_detail","ssao_light_affect","ssao_ao_channel_affect","ssao_sharpness","ssil_enabled","ssil_radius","ssil_intensity","ssr_enabled","ssr_max_steps","sdfgi_enabled","fog_enabled","fog_density","fog_sky_affect","fog_aerial_perspective","volumetric_fog_enabled","volumetric_fog_density","volumetric_fog_length","adjustment_enabled","adjustment_brightness","adjustment_contrast","adjustment_saturation"]
    var sun_keys := ["light_bake_mode","shadow_enabled","directional_shadow_mode","directional_shadow_max_distance","directional_shadow_split_1","directional_shadow_split_2","directional_shadow_split_3","directional_shadow_blend_splits","directional_shadow_fade_start","light_energy","light_indirect_energy","light_color","light_specular","light_angular_distance","shadow_opacity","shadow_bias","shadow_normal_bias","shadow_blur","rotation_degrees"]
    var maps := []
    for lm in client.find_children("*","LightmapGI",true,false):
        var data := properties(lm,["quality","bounces","bounce_indirect_energy","texel_scale","use_denoiser","denoiser_strength","denoiser_range","directional","use_texture_for_bounces","environment_mode","environment_custom_energy","max_texture_size","generate_probes_subdiv"])
        data.path = str(lm.get_path())
        data.users = lm.light_data.get_user_count() if lm.light_data != null else 0
        data.bound = lm.light_data != null
        if lm.light_data != null and lm.light_data.has_method("get_light_texture"):
            var atlas_texture = lm.light_data.call("get_light_texture")
            data.loadedAtlas = json_value(atlas_texture)
            if atlas_texture != null and atlas_texture.has_method("get_layers"):
                data.loadedAtlasLayers = atlas_texture.call("get_layers")
        maps.append(data)
    var meshes := []
    for mesh in client.find_children("*","MeshInstance3D",true,false):
        if mesh.mesh == null or mesh.name == "ViewmodelShadow": continue
        var aabb: AABB = mesh.get_aabb()
        var size: Vector3 = aabb.size * mesh.global_basis.get_scale().abs()
        if mesh.gi_mode == GeometryInstance3D.GI_MODE_STATIC or meshes.size() < 100:
            var materials := []
            for s in mesh.mesh.get_surface_count():
                var mat = mesh.get_active_material(s)
                if mat is StandardMaterial3D:
                    materials.append(properties(mat,["resource_name","albedo_color","roughness","metallic","metallic_specular","emission_enabled","emission_energy_multiplier"]))
                elif mat is ShaderMaterial:
                    var fields := {"name":mat.resource_name,"shader":mat.shader.resource_path}
                    for entry in mat.shader.get_shader_uniform_list():
                        if str(entry.name) in ["base_color","shade_fill","shade_fill_color","surface_roughness","surface_metallic","surface_specular","foliage_sky_fill","ground_specular","wall_roughness_low","structure_ambient_strength","material_texture_enabled","material_albedo","material_normal","material_detail_normal","material_roughness","material_albedo_strength","material_normal_strength","material_detail_strength","material_roughness_variation","material_tile","material_detail_tile","tint","vertex_colours","mixed_timber","soil_inserts"]:
                            fields[entry.name] = json_value(mat.get_shader_parameter(entry.name))
                    materials.append(fields)
            meshes.append({"path":str(mesh.get_path()),"gi":mesh.gi_mode,"hint":json_value(mesh.mesh.lightmap_size_hint),"sizeMeters":json_value(size),"centerMeters":json_value(mesh.global_transform * aabb.get_center()),"texelSizeMetadata":mesh.get_meta("lightmapTexelSizeMeters") if mesh.has_meta("lightmapTexelSizeMeters") else null,"materials":materials})
    var sky := environment.sky.sky_material if environment.sky != null else null
    var sky_values := {"class":sky.get_class() if sky != null else null}
    if sky is ShaderMaterial:
        for entry in sky.shader.get_shader_uniform_list(): sky_values[entry.name] = json_value(sky.get_shader_parameter(entry.name))
    elif sky is ProceduralSkyMaterial: sky_values.merge(properties(sky,["sky_energy_multiplier","ground_energy_multiplier","sky_top_color","sky_horizon_color"]))
    var camera := get_viewport().get_camera_3d()
    return {"accepted":true,"environment":properties(environment,env_keys),"sun":properties(sun,sun_keys),"lightmaps":maps,"voxels":client.find_children("*","VoxelGI",true,false).map(func(v): return {"path":str(v.get_path()),"bound":v.data != null,"energy":v.data.energy if v.data != null else null}),"voxelCount":client.find_children("*","VoxelGI",true,false).size(),"reflectionProbeCount":client.find_children("*","ReflectionProbe",true,false).size(),"sky":sky_values,"meshes":meshes,"camera":properties(camera,["global_position","rotation","fov"]) if camera != null else null,"physicalViewportPixels":json_value(get_viewport().get_texture().get_size()),"physicalWindowPixels":json_value(DisplayServer.window_get_size()),"logicalCanvasSize":json_value(get_viewport().get_visible_rect().size),"viewport":properties(get_viewport(),["msaa_3d","screen_space_aa","use_taa","scaling_3d_scale"])}

func godot_cli_action(request: String) -> String:
    var action: Dictionary = JSON.parse_string(request)
    var payload: Dictionary = action.get("payload",{})
    match action.name:
        # Use the game's exact native capture action without serializing the entire 30 MB node tree.
        # Pinned camera inventory is saved separately. No postprocessing or window resampling.
        "batch_stage": return stage.call("godot_cli_action",JSON.stringify(payload))
        "investigation_capture": return client.godot_cli_action(JSON.stringify({"name":"capture","payload":payload}))
        "investigation_motion":
            if not motion.is_empty(): return JSON.stringify({"accepted":false,"error":"Recording already active"})
            record_motion.call_deferred(payload)
            return JSON.stringify({"accepted":true,"output":payload.output})
        "investigation_transients":
            var showing := []
            for node in client.find_children("LatticeView","MeshInstance3D",true,false):
                if node.is_visible_in_tree(): showing.append(str(node.get_path()))
            return JSON.stringify({"accepted":true,"visibleLatticeViews":showing})
        "investigation_inventory": return JSON.stringify(inventory())
        "investigation_prop_locations":
            var props := []
            for node in client.find_children("*", "MultiMeshInstance3D", true, false):
                var label := str(node.name).to_lower()
                if not ["roof", "kiosk", "locker", "bin", "bench", "bollard", "fence", "landing", "cabinet", "pallet", "planter", "pile", "piling", "newspaper"].any(func(word): return label.contains(word)): continue
                var mm: MultiMesh = node.multimesh
                if mm == null or mm.mesh == null or mm.instance_count == 0: continue
                var instances := []
                for i in min(mm.instance_count, 5):
                    var pose: Transform3D = node.global_transform * mm.get_instance_transform(i)
                    instances.append({"origin":json_value(pose.origin),"center":json_value(pose * mm.mesh.get_aabb().get_center()),"size":json_value(mm.mesh.get_aabb().size * pose.basis.get_scale().abs())})
                props.append({"path":str(node.get_path()),"count":mm.instance_count,"instances":instances})
            return JSON.stringify({"accepted":true,"props":props})
        "investigation_view":
            pinned = payload if payload.get("pinned",true) else {}
            return JSON.stringify({"accepted":true,"pose":pinned})
        "investigation_server":
            return server.godot_cli_action(JSON.stringify(payload)) if server != null else JSON.stringify({"accepted":false})
        "investigation_toggle":
            if environment == null: inventory()
            for key in payload.get("environment",{}):
                if key in ["ssao_enabled","ssil_enabled","ssil_intensity","ssil_radius","tonemap_mode","tonemap_exposure","ambient_light_energy","adjustment_enabled","ssr_enabled"]:
                    environment.set(key,payload.environment[key])
            for key in payload.get("sun",{}):
                if key in ["light_bake_mode","shadow_enabled","shadow_normal_bias","shadow_bias","shadow_opacity"]: sun.set(key,payload.sun[key])
            if payload.has("shade_fill"):
                for mesh in client.find_children("*","MeshInstance3D",true,false):
                    if mesh.mesh == null: continue
                    for s in mesh.mesh.get_surface_count():
                        var mat = mesh.get_active_material(s)
                        if not mat is ShaderMaterial or not ("faceted-surface" in mat.shader.resource_path or (mat.resource_name.begins_with("FacetedSurface_") and not "Foliage" in mat.resource_name and not ":foliage" in mat.resource_name)): continue
                        if not saved_fill.has(mat): saved_fill[mat] = mat.get_shader_parameter("shade_fill")
                        mat.set_shader_parameter("shade_fill",saved_fill[mat] if str(payload.shade_fill) == "restore" else float(payload.shade_fill))
            return JSON.stringify({"accepted":true,"changed":payload})
    return client.godot_cli_action(request)

func record_motion(payload: Dictionary) -> void:
    var output: String = payload.output
    DirAccess.make_dir_recursive_absolute(output)
    motion = {"pose":pinned.duplicate(true),"started_us":Time.get_ticks_usec(),"amplitude":payload.get("amplitude",0.6),"yaw_swing":payload.get("yaw_swing",0.015)}
    var records: Array = []
    var target_period_us := 33333
    var next_sample_us: int = motion.started_us
    while Time.get_ticks_usec() - motion.started_us < int(payload.get("seconds",5.0) * 1000000.0):
        await RenderingServer.frame_post_draw
        var sampled_us := Time.get_ticks_usec()
        if sampled_us < next_sample_us: continue
        next_sample_us += target_period_us
        if next_sample_us < sampled_us: next_sample_us = sampled_us + target_period_us
        var image := get_viewport().get_texture().get_image()
        image.convert(Image.FORMAT_RGBA8)
        var file := FileAccess.open(output + "/frame-%04d.rgba" % records.size(), FileAccess.WRITE)
        file.store_buffer(image.get_data())
        file.close()
        records.append({"index":records.size(),"seconds":(sampled_us-motion.started_us)/1000000.0,"renderFrame":Engine.get_frames_drawn(),"width":image.get_width(),"height":image.get_height(),"position":pinned.position.duplicate(),"yaw":pinned.yaw,"readbackAndWriteMs":(Time.get_ticks_usec()-sampled_us)/1000.0})
    var report := {"kind":"Native real-time viewport frames; no interpolation or fixed simulation stepping","targetCaptureHz":30,"elapsedSeconds":(Time.get_ticks_usec()-motion.started_us)/1000000.0,"format":"RGBA8","frames":records,"pose":motion.pose,"amplitude":motion.amplitude,"yawSwing":motion.yaw_swing}
    motion = {}
    FileAccess.open(output + "/receipt.json",FileAccess.WRITE).store_string(JSON.stringify(report,"  "))
