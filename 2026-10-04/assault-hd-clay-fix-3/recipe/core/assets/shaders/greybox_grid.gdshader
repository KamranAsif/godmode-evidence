// The roguelite's greybox surface: a world-space 1 m grid with a brighter
// major line every few metres and a faint checker, projected on whichever axis
// a face points along (every box is axis-aligned), so any box of any size
// reads its scale without UVs. Vertical faces darken toward the floor as a
// cheap contact shadow, since the ceiling lights mostly cast none.
shader_type spatial;
render_mode diffuse_burley, specular_schlick_ggx;


uniform vec4 base_color : source_color = vec4(0.3, 0.32, 0.35, 1.0);
uniform vec4 line_color : source_color = vec4(0.45, 0.48, 0.52, 1.0);
uniform vec4 accent_color : source_color = vec4(0.1, 0.8, 1.0, 1.0);
uniform float cell = 1.0;
uniform float major_every = 4.0;
uniform float checker_strength = 0.06;
uniform float accent_strength = 0.35;
uniform float accent_emission = 0.0;
uniform float floor_occlusion = 0.45;
uniform float roughness = 0.85;

varying vec3 world_position;
varying vec3 world_normal;

void vertex() {
    world_position = (MODEL_MATRIX * vec4(VERTEX, 1.0)).xyz;
    world_normal = normalize((MODEL_MATRIX * vec4(NORMAL, 0.0)).xyz);
}

float grid_line(vec2 p, float size, float width) {
    vec2 cellular = p / size;
    vec2 derivative = fwidth(cellular);
    vec2 distance_to_line = abs(fract(cellular - 0.5) - 0.5) / max(derivative, vec2(1e-5));
    float line = 1.0 - min(min(distance_to_line.x, distance_to_line.y) / (width + 1.0), 1.0);
    // Fade out once a cell is only a few pixels wide, so distant walls don't shimmer.
    float fade = 1.0 - smoothstep(0.15, 0.45, max(derivative.x, derivative.y));
    return line * fade;
}

void fragment() {
    vec3 n = abs(world_normal);
    vec2 p = n.y > max(n.x, n.z) ? world_position.xz : (n.x > n.z ? world_position.zy : world_position.xy);
    float minor = grid_line(p, cell, 0.6);
    float major = grid_line(p, cell * major_every, 1.4);
    vec2 check_cell = floor(p / (cell * 2.0));
    float checker = mod(check_cell.x + check_cell.y, 2.0);
    vec3 albedo = base_color.rgb * (1.0 - checker_strength * checker);
    albedo = mix(albedo, line_color.rgb, minor * 0.55);
    albedo = mix(albedo, mix(line_color.rgb, accent_color.rgb, accent_strength), major * 0.85);
    float vertical = 1.0 - n.y;
    float contact = mix(1.0 - floor_occlusion, 1.0, smoothstep(0.0, 1.2, world_position.y));
    albedo *= mix(1.0, contact, vertical);
    ALBEDO = albedo;
    EMISSION = accent_color.rgb * major * accent_emission;
    ROUGHNESS = roughness;
    METALLIC = 0.0;
}
