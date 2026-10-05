shader_type spatial;
render_mode diffuse_burley, specular_schlick_ggx;

uniform vec4 base_color : source_color = vec4(0.94, 0.025, 0.05, 1.0);
uniform vec4 shimmer_color : source_color = vec4(1.0, 0.3, 0.14, 1.0);
uniform float shimmer_speed = 0.72;
uniform float shimmer_scale = 6.0;
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
    // First-person arms share the weapon's camera-depth slice so their
    // authored hand contacts and self-occlusion remain intact at walls.
    first_person_position.z = mix(clip_position.z, near_depth, 0.99);
    POSITION = first_person ? first_person_position : clip_position;
}

void fragment() {
    vec3 normal = normalize(NORMAL);
    float fresnel = pow(1.0 - clamp(dot(normal, normalize(VIEW)), 0.0, 1.0), 2.5);
    float sweep = sin((world_position.y + world_position.x * 0.32) * shimmer_scale - TIME * shimmer_speed * 6.28318);
    float band = smoothstep(0.86, 1.0, sweep);
    float raw_facet = dot(normal, normalize(vec3(0.32, 0.78, 0.5))) * 0.5 + 0.5;
    float facet = floor(raw_facet * 6.0) / 6.0;
    float signal = mix(0.62, 1.08, facet);
    ALBEDO = base_color.rgb * signal;
    METALLIC = 0.08;
    ROUGHNESS = 0.58;
    EMISSION = base_color.rgb * 0.12 + shimmer_color.rgb * (band * 0.16 + fresnel * 0.08);
}
