// A killed enemy as player.exe reads it back (scripts/client/kill_stream.ts):
// the body flips to a glowing wire lattice, emissive and unlit, and comes
// apart a cell at a time as its pieces float away from the player. One material
// is shared by every body; each mesh carries its own progress and colour as
// instance uniforms, so a death allocates nothing.
//
// The lattice is drawn in the body's own metres rather than with the wireframe
// render mode: a rig's triangles are dense enough that their wireframe fills
// in solid at fighting range, and not every backend draws that mode at all.
shader_type spatial;
render_mode unshaded, cull_disabled, blend_add, depth_draw_never, shadows_disabled;
#include "res://assets/shaders/lattice_readback.gdshaderinc"

// 0 whole, 1 gone.
instance uniform float dissolve = 0.0;
// TEMP cyan, or PERM gold when the kill paid the father.
instance uniform vec4 wire_color : source_color = vec4(0.35, 0.9, 1.0, 1.0);

// Lines a metre.

varying vec3 body_metres;

void vertex() {
    body_metres = VERTEX * vec3(length(MODEL_MATRIX[0].xyz), length(MODEL_MATRIX[1].xyz), length(MODEL_MATRIX[2].xyz));
}

float cell_hash(vec3 p) {
    p = fract(p * 0.3183099 + vec3(0.11, 0.17, 0.23));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

void fragment() {
    // The body goes in cells, the feet a little last, so it drains up into the stream.
    float cell = cell_hash(floor(body_metres * 3.0));
    float threshold = dissolve * 1.15 - clamp(body_metres.y + 1.0, 0.0, 2.0) * 0.05;
    if (cell < threshold) {
        discard;
    }
    // Contour lines of the body's own axes: one pixel wide at any distance.
    float wire = readback_wire(body_metres);
    // And its outline, so the silhouette reads before the lattice does.
    float rim = pow(1.0 - abs(dot(normalize(NORMAL), normalize(VIEW))), 3.0);
    // A cell about to go flares first.
    float edge = 1.0 - smoothstep(threshold, threshold + 0.14, cell);
    float glow = wire * 2.2 + rim * 1.1 + 0.05 + edge * 1.5 * max(wire, rim);
    ALBEDO = wire_color.rgb * glow;
    ALPHA = wire_color.a * (1.0 - dissolve * 0.35);
}
