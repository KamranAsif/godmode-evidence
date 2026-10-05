@tool
extends "res://assets/characters/mixamo/prune_clips.gd"

# Preserve the existing clip-pruning policy; the other rigs keep all clips.
const PRUNED := ["character-assault", "character-breach", "character-marksman", "character-daemon", "character-assault-arms", "character-breach-arms", "character-marksman-arms"]

func _post_import(scene: Node) -> Object:
	if get_source_file().get_file().get_basename() in PRUNED:
		super._post_import(scene)
	for node in scene.find_children("*", "MeshInstance3D", true, false):
		if node.skin != null and node.mesh is ArrayMesh:
			prepare(node.mesh)
	return scene

# This is asset preparation, never an impact-time operation. Keep a compact
# real mesh LOD and unweld it so vertex id modulo three is a barycentric corner.
# The original indexed mesh remains the ordinary render mesh.
static func prepare(source: ArrayMesh) -> void:
	if source.has_meta("triangle_fracture_mesh"):
		return
	assert(source.get_blend_shape_count() == 0, "Fracture import needs explicit blend-shape support")
	var result := ArrayMesh.new()
	var metrics := {"sourceVertices": 0, "expandedVertices": 0, "samples": 0, "maxPositionError": 0.0, "maxWeightError": 0.0}
	for surface in source.get_surface_count():
		var arrays := source.surface_get_arrays(surface)
		var flags := source.surface_get_format(surface) & Mesh.ARRAY_FLAG_USE_8_BONE_WEIGHTS
		var influences := 8 if flags != 0 else 4
		var tool := SurfaceTool.new()
		tool.create_from(source, surface)
		# Bound positional error to half a percent of the model's bounds. This
		# public engine simplifier retains original vertices/UVs/skin influences.
		var indices := tool.generate_lod(0.005, mini(18000, source.surface_get_array_index_len(surface)))
		assert(not indices.is_empty(), "Fracture simplification failed")
		arrays[Mesh.ARRAY_INDEX] = indices
		tool.create_from_arrays(arrays, Mesh.PRIMITIVE_TRIANGLES)
		tool.set_skin_weight_count(SurfaceTool.SKIN_8_WEIGHTS if influences == 8 else SurfaceTool.SKIN_4_WEIGHTS)
		tool.deindex()
		tool.commit(result, flags)
		var expanded := result.surface_get_arrays(surface)
		assert(expanded[Mesh.ARRAY_VERTEX].size() == indices.size())
		assert(expanded[Mesh.ARRAY_BONES].size() == indices.size() * influences)
		assert(expanded[Mesh.ARRAY_WEIGHTS].size() == indices.size() * influences)
		# Samples span the whole index stream, including every corner and all
		# eight influences; catches accidental truncation to four on import.
		for i in range(0, indices.size(), 97):
			metrics.samples += 1
			metrics.maxPositionError = maxf(metrics.maxPositionError, arrays[Mesh.ARRAY_VERTEX][indices[i]].distance_to(expanded[Mesh.ARRAY_VERTEX][i]))
			for bone in influences:
				assert(arrays[Mesh.ARRAY_BONES][indices[i] * influences + bone] == expanded[Mesh.ARRAY_BONES][i * influences + bone])
				metrics.maxWeightError = maxf(metrics.maxWeightError, absf(arrays[Mesh.ARRAY_WEIGHTS][indices[i] * influences + bone] - expanded[Mesh.ARRAY_WEIGHTS][i * influences + bone]))
		metrics.sourceVertices += source.surface_get_array_len(surface)
		metrics.expandedVertices += result.surface_get_array_len(surface)
	assert(metrics.maxPositionError < 0.001 and metrics.maxWeightError < 0.001)
	source.set_meta("triangle_fracture_mesh", result)
	source.set_meta("triangle_fracture_metrics", metrics)
	print("GODMODE_FRACTURE_IMPORT=" + JSON.stringify(metrics))
