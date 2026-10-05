// Neutral reflected sky on glancing body edges. No expanded geometry or through-cover silhouette.
shader_type spatial;
render_mode unshaded, blend_mix, depth_draw_never, cull_back, shadows_disabled;
uniform float edge_strength = 0.38;
void fragment() {
    float edge = pow(1.0 - clamp(dot(normalize(NORMAL), normalize(VIEW)), 0.0, 1.0), 3.0);
    ALBEDO = vec3(0.65, 0.69, 0.73);
    ALPHA = edge * edge_strength;
}
