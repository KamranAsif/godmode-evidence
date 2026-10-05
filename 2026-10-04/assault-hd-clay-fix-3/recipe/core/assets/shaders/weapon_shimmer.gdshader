shader_type spatial;
render_mode diffuse_burley, specular_schlick_ggx;

uniform vec4 base_color : source_color = vec4(0.018, 0.025, 0.035, 1.0);
uniform vec4 shimmer_color : source_color = vec4(0.06, 0.9, 1.0, 1.0);
uniform float shimmer_speed = 0.9;
uniform bool first_person = false;

varying vec3 world_position;

void vertex() {
    world_position = (MODEL_MATRIX * vec4(VERTEX, 1.0)).xyz;
    // Godot requires POSITION to be written on every path once any path
    // writes it; a branch that skips it leaves the vertex undefined and the
    // mesh invisible. So always assign, and only remap the depth first-person.
    vec4 clip_position = PROJECTION_MATRIX * MODELVIEW_MATRIX * vec4(VERTEX, 1.0);
    vec4 first_person_position = clip_position;
#if CURRENT_RENDERER == RENDERER_COMPATIBILITY
    float near_depth = -clip_position.w;
#else
    // Forward+/Mobile use Godot's reversed-Z depth buffer: 1 is near.
    float near_depth = clip_position.w;
#endif
    // Keep the viewmodel's own depth ordering, but compress it into the
    // slice immediately beyond the camera near plane. World geometry can
    // no longer cut the held weapon away when the player reaches a wall.
    first_person_position.z = mix(clip_position.z, near_depth, 0.99);
    POSITION = first_person ? first_person_position : clip_position;
}

void fragment() {
    vec3 normal = normalize(NORMAL);
    float fresnel = pow(1.0 - clamp(dot(normal, normalize(VIEW)), 0.0, 1.0), 3.4);
    float raw_facet = dot(normal, normalize(vec3(0.3, 0.72, 0.62))) * 0.5 + 0.5;
    float facet = floor(raw_facet * 5.0) / 5.0;
    float scan = smoothstep(0.9, 1.0, sin((world_position.x + world_position.y * 0.45 - world_position.z * 0.2) * 10.0 - TIME * shimmer_speed * 6.28318));
    ALBEDO = base_color.rgb * mix(0.64, 1.45, facet);
    METALLIC = 0.18;
    ROUGHNESS = 0.46;
    EMISSION = shimmer_color.rgb * (scan * 0.16 + fresnel * 0.12);
}
