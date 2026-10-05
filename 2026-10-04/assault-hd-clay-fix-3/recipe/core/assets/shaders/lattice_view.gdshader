// The shared depth readback for being hit and for rounds hitting the world.
//
// Kamran's description: "like if you get punched in the face you kind of have a
// black circle, but instead this shader". So the world itself goes to lattice
// for a moment rather than a dark ring being drawn over it -- and it goes in
// world metres, on the real geometry, so what the player sees is the street
// they were looking at read back as wire, not a grid pasted on the inside of a
// visor.
//
// It is one full-screen pass, drawn only while a hit or impact is fading, on a quad
// parented to the camera and cut to the size of the frustum a little in front
// of it (client/lattice_view.ts measures it). The world position of every pixel is reconstructed
// from the depth buffer, which is the one way to get the world behind the HUD
// without a second render of it. That reconstruction is why this is a spatial
// shader over the scene rather than a canvas_item over the HUD: a depth
// texture can only be sampled here.
//
// The middle of the view is left nearly clear, the same rule blood_overlay.gdshader
// follows and for the same reason: GAME.md will not have a red mass in the
// centre competing with the signal-red threats the player has to pick out, and
// a player being shot at needs to keep shooting.
shader_type spatial;
render_mode unshaded, cull_disabled, blend_add, depth_draw_never, depth_test_disabled, shadows_disabled, fog_disabled;
#include "res://assets/shaders/lattice_readback.gdshaderinc"

// Lines a metre and pixels wide, matching every other surface's lattice.
// How far out the middle stays clear, and where the lattice has fully closed in.
const float CLEAR_RADIUS = 0.28;
const float FULL_RADIUS = 0.95;

// 0 before the hit and 1 when it is over; the client drives it.
uniform float progress = 1.0;
// 0 for a graze and 1 for a hit worth half a health bar, the same ramp as the world's.
uniform float heat = 0.0;
uniform float aspect_ratio = 1.777;
// The latest live impact is tested against the reconstructed surface in world
// metres, so its boundary bends with geometry and respects depth.
uniform vec3 impact_origin = vec3(0.0);
uniform float impact_radius = 0.0;
uniform float impact_heat = 0.0;
uniform float impact_strength = 0.0;
// The depth buffer of the pass this quad is drawn into. Godot 4 stopped
// providing DEPTH_TEXTURE as a builtin; it is asked for by name and hint.
uniform sampler2D depth_buffer : hint_depth_texture, filter_linear_mipmap;

void fragment() {
    float depth = texture(depth_buffer, SCREEN_UV).r;
    // The sky has no geometry to read back, so it stays sky.
    if (depth <= 0.00001) {
        discard;
    }
    vec4 ndc = vec4(SCREEN_UV * 2.0 - 1.0, depth, 1.0);
    vec4 view = INV_PROJECTION_MATRIX * ndc;
    vec3 world = (INV_VIEW_MATRIX * vec4(view.xyz / view.w, 1.0)).xyz;

    // The same grid every other surface draws: in the plane the geometry
    // faces, from the world position's own derivatives.
    vec3 across = cross(dFdx(world), dFdy(world));
    vec3 n = length(across) > 1e-12 ? abs(normalize(across)) : vec3(0.0, 1.0, 0.0);
    vec2 plane = n.y > max(n.x, n.z) ? world.xz : (n.x > n.z ? world.zy : world.xy);
    float wire = readback_wire(vec3(plane, plane.x + plane.y));

    // The punch: it closes in from the edges and opens back out, hardest at the
    // start, and the middle of the view never fills.
    vec2 off = (SCREEN_UV - 0.5) * vec2(aspect_ratio, 1.0);
    float edge = clamp(length(off) / 0.5, 0.0, 1.0);
    float closed = mix(FULL_RADIUS, CLEAR_RADIUS, 1.0 - progress);
    float mask = smoothstep(closed - 0.35, closed + 0.15, edge);
    float fade = (1.0 - progress) * (1.0 - progress);
    vec3 tint = readback_damage_tint(heat);
    vec3 hit_readback = tint * (wire * 1.9 + 0.04) * mask * fade * (1.0 + heat);
    // Read the *same* depth-reconstructed world for a bullet. This reaches
    // imported and StandardMaterial3D surfaces too, which the material hooks
    // in the city shaders could never reach.
    float distance_from_hit = length(world - impact_origin);
    float edge_width = max(fwidth(distance_from_hit), 0.001);
    float impact_mask = 1.0 - smoothstep(impact_radius - edge_width, impact_radius + edge_width, distance_from_hit);
    vec3 impact_tint = readback_damage_tint(impact_heat);
    vec3 impact = impact_tint * (wire * 1.9 + 0.04) * impact_mask * impact_strength;
    ALBEDO = hit_readback + impact;
    ALPHA = 1.0;
}
