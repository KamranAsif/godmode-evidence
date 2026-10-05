// The same metre-scale, pixel-filtered wire for a hurt view, a landed round,
// and a dying body. The caller chooses only its mask and colour.
const float READBACK_LINES = 8.0;
const float READBACK_WIDTH = 1.6;

float readback_wire(vec3 metres) {
    vec3 coord = metres * READBACK_LINES;
    vec3 grid = abs(fract(coord - 0.5) - 0.5) / (max(fwidth(coord), vec3(1e-4)) * READBACK_WIDTH);
    return 1.0 - min(min(min(grid.x, grid.y), grid.z), 1.0);
}

vec3 readback_damage_tint(float heat) {
    return mix(vec3(1.0, 0.97, 0.93), vec3(1.0, 0.12, 0.06), clamp(heat, 0.0, 1.0));
}
