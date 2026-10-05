// The cloud a bullet raises out of a surface.
//
// One camera-facing quad per puff, faded to nothing at its rim: an untextured
// plane reads as the rectangle it is, and a bullet hole surrounded by grey
// squares is worse than no dust at all. The falloff is generated rather than
// sampled so the effect needs no texture of its own, and so a puff can be any
// size without a source image deciding how soft its edge looks.
shader_type spatial;
render_mode blend_mix, cull_disabled, unshaded, depth_draw_never, shadows_disabled;

uniform vec4 dust_color : source_color = vec4(0.76, 0.74, 0.69, 1.0);
uniform float opacity : hint_range(0.0, 1.0, 0.01) = 0.65;
// How much of the radius is spent fading out. At 1.0 the puff is soft all the
// way to its centre; below about 0.3 the rim starts to read as an edge again.
uniform float softness : hint_range(0.05, 1.0, 0.01) = 0.75;

void vertex() {
    // Camera-facing, but keeping the node's own scale: the puff grows by being
    // scaled up over its life, so the usual billboard rebuild -- which throws
    // the model matrix's scale away with its rotation -- would freeze it.
    MODELVIEW_MATRIX = VIEW_MATRIX * mat4(
        INV_VIEW_MATRIX[0],
        INV_VIEW_MATRIX[1],
        INV_VIEW_MATRIX[2],
        MODEL_MATRIX[3]
    );
    MODELVIEW_MATRIX = MODELVIEW_MATRIX * mat4(
        vec4(length(MODEL_MATRIX[0].xyz), 0.0, 0.0, 0.0),
        vec4(0.0, length(MODEL_MATRIX[1].xyz), 0.0, 0.0),
        vec4(0.0, 0.0, length(MODEL_MATRIX[2].xyz), 0.0),
        vec4(0.0, 0.0, 0.0, 1.0)
    );
    MODELVIEW_NORMAL_MATRIX = mat3(MODELVIEW_MATRIX);
}

void fragment() {
    float radius = length(UV * 2.0 - 1.0);
    float mask = 1.0 - smoothstep(1.0 - softness, 1.0, radius);
    float alpha = mask * opacity;
    if (alpha < 0.002) {
        discard;
    }
    ALBEDO = dust_color.rgb;
    ALPHA = alpha;
}
