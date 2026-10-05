shader_type spatial;
render_mode diffuse_burley, specular_schlick_ggx;

uniform vec4 base_color : source_color = vec4(0.965, 0.97, 0.975, 1.0);
uniform vec4 edge_color : source_color = vec4(0.58, 0.66, 0.72, 1.0);

varying vec3 world_position;

void vertex() {
    world_position = (MODEL_MATRIX * vec4(VERTEX, 1.0)).xyz;
}

void fragment() {
    vec3 normal = normalize(NORMAL);
    float facing = 1.0 - clamp(dot(normal, normalize(VIEW)), 0.0, 1.0);
    float edge = pow(facing, 2.8);
    float plane = floor((normal.y * 0.45 + normal.x * 0.25 + normal.z * 0.3 + 1.0) * 5.0) / 5.0;
    float cool_recess = mix(0.91, 1.02, plane);
    ALBEDO = mix(base_color.rgb * cool_recess, edge_color.rgb, edge * 0.18);
    ROUGHNESS = 0.92;
    METALLIC = 0.0;
}
