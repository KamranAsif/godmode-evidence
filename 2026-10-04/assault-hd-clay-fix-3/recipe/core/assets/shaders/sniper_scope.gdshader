shader_type canvas_item;

uniform float aspect_ratio = 1.777778;
uniform vec4 reticle_color : source_color = vec4(0.03, 0.82, 0.94, 0.95);

void fragment() {
    vec2 point = UV - vec2(0.5);
    point.x *= aspect_ratio;
    float radius = length(point);
    float outside = smoothstep(0.34, 0.344, radius);
    float vertical = 1.0 - smoothstep(0.0012, 0.0024, abs(point.x));
    float horizontal = 1.0 - smoothstep(0.0012, 0.0024, abs(point.y));
    float center_gap = smoothstep(0.018, 0.028, radius);
    float reticle = max(vertical, horizontal) * center_gap * (1.0 - outside);
    float center_dot = 1.0 - smoothstep(0.005, 0.009, radius);
    vec3 color = mix(vec3(0.005, 0.008, 0.012), reticle_color.rgb, max(reticle, center_dot));
    float alpha = max(outside * 0.985, max(reticle * reticle_color.a, center_dot));
    COLOR = vec4(color, alpha);
}
