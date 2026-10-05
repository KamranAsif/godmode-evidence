// Screen-space damage treatment: the only thing that tells a player how hurt
// they are, now that no health number is drawn (see scripts/health_feedback.ts).
//
// Everything is generated here rather than sampled from a splatter texture, so
// the effect is original, weighs nothing, and can be driven continuously from
// one intensity rather than cross-faded between painted stages.
//
// The composition is deliberately edge-weighted. GAME.md forbids a dominant red
// mass competing with the signal-red threats a player has to pick out, so the
// screen centre is kept nearly clear at every intensity and the blood crowds in
// from the corners: readable at a glance as "badly hurt" without hiding the
// enemy the player is shooting at.
//
// It multiplies rather than mixes. The arena is matte white and cool grey by
// design, and blood laid over that with an ordinary alpha blend comes out pink
// and washed however dark the source colour is — a mix can only pull a bright
// ground towards a mid grey-red. Multiplying darkens and saturates what is
// already on screen, which is what blood on a visor does to the light through
// it, and it is why every value below is a multiplier with white as its
// identity rather than a colour with an alpha.
shader_type canvas_item;
render_mode blend_mul;

// 0 at full health, 1 at death. Drives how far in the blood reaches, how much
// of the frame it covers, and how deeply it stains, all at once.
uniform float intensity : hint_range(0.0, 1.0) = 0.0;
// Heartbeat throb, 0..1, so the wash pulses with the sound rather than beside it.
uniform float pulse : hint_range(0.0, 1.0) = 0.0;
// Viewport width over height, so the splatter is not stretched on wide screens.
uniform float aspect_ratio = 1.777778;
// Multipliers, not colours to paint: 1.0 leaves the ground untouched. The thin
// value is what the tint does to white; the deep one is what a clot does.
uniform vec4 blood_color : source_color = vec4(0.42, 0.020, 0.030, 1.0);
uniform vec4 blood_tint_color : source_color = vec4(0.86, 0.34, 0.32, 1.0);

float hash(vec2 point) {
    return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453123);
}

float value_noise(vec2 point) {
    vec2 cell = floor(point);
    vec2 offset = fract(point);
    vec2 weight = offset * offset * (3.0 - 2.0 * offset);
    float corner00 = hash(cell);
    float corner10 = hash(cell + vec2(1.0, 0.0));
    float corner01 = hash(cell + vec2(0.0, 1.0));
    float corner11 = hash(cell + vec2(1.0, 1.0));
    return mix(mix(corner00, corner10, weight.x), mix(corner01, corner11, weight.x), weight.y);
}

// Three octaves is enough for a torn, clotted edge; more only costs fill rate.
float clot(vec2 point) {
    return value_noise(point) * 0.55 + value_noise(point * 2.17 + 13.0) * 0.30 + value_noise(point * 4.31 + 71.0) * 0.15;
}

void fragment() {
    vec2 centered = UV - vec2(0.5);
    centered.x *= aspect_ratio;
    float radius = length(centered) / max(aspect_ratio, 1.0);

    // Coverage grows from the frame edge inwards, and stops well short of the
    // middle even at death. The clear centre is not a stylistic choice: it is
    // the room the player needs to keep picking a signal-red threat out of the
    // arena while this is on screen. Note that `radius` runs from 0 at the
    // crosshair to about 0.57 in a 16:9 corner, so the reach is read against
    // that rather than against 1.
    float reach = mix(0.50, 0.20, intensity);
    float edge = smoothstep(reach, reach + 0.15, radius);

    // The splatter itself, at a fine enough scale to read as thrown blood
    // rather than as fog. It is static in screen space, because blood on a
    // visor does not drift; it creeps and dries, which is the slow warp below.
    vec2 field = UV * vec2(aspect_ratio, 1.0) * 13.0;
    float splatter = clot(field + vec2(0.0, TIME * 0.010));
    float bite = mix(0.70, 0.34, intensity);
    float mask = smoothstep(bite, bite + 0.17, splatter) * edge;

    // A continuous wash under the splatter, so low intensities read as a tint
    // rather than as isolated blobs appearing out of nothing. Deliberately
    // weaker than the splatter: the wash is what would grey the whole frame.
    float wash = edge * intensity * 0.35;

    // The two carry their own strength rather than sharing one: the tint is a
    // whole-edge haze that must stay faint at every intensity, while a clot is
    // nearly opaque wherever it lands.
    float throb = 1.0 + pulse * 0.18 * intensity;
    float coverage = clamp(mask * mix(0.70, 0.97, intensity) + wash * mix(0.20, 0.42, intensity), 0.0, 1.0) * throb;

    // Deeper where it is thickest, so the heavy stages read as congealed depth
    // rather than as one flat red filter.
    vec3 multiplier = mix(blood_tint_color.rgb, blood_color.rgb, clamp(mask, 0.0, 1.0));
    // Coverage is folded into the multiplier itself rather than left in alpha:
    // a multiply blend writes `destination * source` and ignores alpha
    // entirely, so anything short of white here stains the whole frame however
    // transparent the fragment claims to be. White is the identity, and this is
    // what keeps the clear centre actually clear.
    COLOR = vec4(mix(vec3(1.0), multiplier, clamp(coverage, 0.0, 1.0)), 1.0);
}
