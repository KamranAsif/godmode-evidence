shader_type spatial;
render_mode cull_disabled, diffuse_burley, specular_schlick_ggx;

uniform sampler2D albedo_map : source_color, filter_linear_mipmap, repeat_enable;
uniform sampler2D normal_map : hint_normal, filter_linear_mipmap, repeat_enable;
uniform sampler2D pbr_map : filter_linear_mipmap, repeat_enable;
uniform float normal_strength = 0.35;
uniform float paint_luminance = 0.12;
uniform vec4 protected_plate = vec4(0.0);
// Dark bodies, bumpers and tyres kept their form in sun but went black in baked shade and merged with the road (#917).
// A paint value floor, the cool-neutral shade fill faceted surfaces use, and a faint rim keep their silhouette.
uniform float paint_floor = 0.05;
uniform float shade_fill = 0.5;
// Tyres and bumpers are near-black in the atlas, so the fill lifts at least this albedo.
uniform float fill_floor = 0.12;
uniform vec4 shade_fill_color : source_color = vec4(0.82, 0.86, 0.92, 1.0);
uniform float rim_fill = 0.1;
instance uniform vec4 body_paint : source_color = vec4(0.3, 0.42, 0.55, 1.0);
varying vec3 paint;

void vertex() {
    paint = INSTANCE_CUSTOM.a > 0.5 ? INSTANCE_CUSTOM.rgb : body_paint.rgb;
    float value = dot(paint, vec3(0.2126, 0.7152, 0.0722));
    paint *= max(1.0, paint_floor / max(value, 0.0001));
}

void fragment() {
    vec3 source = texture(albedo_map, UV).rgb;
    // Approved atlases put blue body paint and neutral glass/rubber/metal in one surface.
    // Select its blue chroma in linear space; neutral trim and warm lamps never qualify.
    float blue = source.b - source.r;
    float mask = smoothstep(0.003, 0.008, blue)
        * smoothstep(2.05, 2.25, source.b / max(source.r, 0.001))
        * smoothstep(1.15, 1.35, source.g / max(source.r, 0.001));
    // The sedan's rear plate backing shares blue chroma with its paint; preserve the complete plate island.
    if (UV.x >= protected_plate.x && UV.y >= protected_plate.y
            && UV.x <= protected_plate.z && UV.y <= protected_plate.w) mask = 0.0;
    // Preserve the authored grain and tonal variation, only replacing paint hue/value.
    float detail = dot(source, vec3(0.2126, 0.7152, 0.0722)) / paint_luminance;
    ALBEDO = mix(source, paint * detail, mask);
    float rim = pow(1.0 - clamp(dot(NORMAL, VIEW), 0.0, 1.0), 3.0);
    EMISSION = max(ALBEDO, vec3(fill_floor)) * shade_fill_color.rgb * shade_fill + shade_fill_color.rgb * rim * rim_fill;
    vec3 pbr = texture(pbr_map, UV).rgb;
    METALLIC = pbr.b;
    ROUGHNESS = pbr.g;
    SPECULAR = 0.5;
    NORMAL_MAP = texture(normal_map, UV).rgb;
    NORMAL_MAP_DEPTH = normal_strength;
}
