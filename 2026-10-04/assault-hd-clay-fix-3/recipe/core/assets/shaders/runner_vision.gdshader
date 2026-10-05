shader_type spatial;
render_mode unshaded, cull_back;

uniform vec4 line_color : source_color = vec4(0.08, 0.88, 1.0, 1.0);
uniform float energy : hint_range(0.0, 8.0) = 2.4;

void fragment() {
    ALBEDO = line_color.rgb;
    EMISSION = line_color.rgb * energy;
    ALPHA = line_color.a;
}
