// The shadow a distant body takes instead of its own: one unshaded ellipse on
// the ground, darkest under the feet and fading to nothing at its edge. It is
// two triangles and it never casts anything itself. Its job is only to say
// that a figure a hundred metres off is standing on the street.
shader_type spatial;
render_mode unshaded, blend_mix, depth_draw_never, cull_disabled, shadows_disabled;

uniform float alpha : hint_range(0.0, 1.0) = 0.38;
uniform vec4 shade : source_color = vec4(0.03, 0.03, 0.04, 1.0);

void fragment() {
    float r = length(UV - vec2(0.5)) * 2.0;
    ALBEDO = shade.rgb;
    ALPHA = alpha * (1.0 - smoothstep(0.45, 1.0, r));
}
