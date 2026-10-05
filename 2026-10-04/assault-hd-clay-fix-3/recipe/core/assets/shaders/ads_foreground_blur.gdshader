shader_type canvas_item;

// A two-plane depth-of-field treatment: the transparent weapon pass is the
// foreground, while the world behind it stays in focus. Native camera DOF
// cannot run on a transparent SubViewport.
uniform float aim_blend : hint_range(0.0, 1.0) = 0.0;

vec4 premultiplied_sample(sampler2D source, vec2 point) {
    vec4 sample_color = texture(source, clamp(point, vec2(0.0), vec2(1.0)));
    return vec4(sample_color.rgb * sample_color.a, sample_color.a);
}

void fragment() {
    vec2 sight_offset = UV - vec2(0.5);
    sight_offset.x *= TEXTURE_PIXEL_SIZE.y / TEXTURE_PIXEL_SIZE.x;
    // Keep the actual sight picture crisp; soften the receiver and arms
    // progressively outside it. Distances are fractions of viewport height.
    float blur = aim_blend * smoothstep(0.055, 0.14, length(sight_offset));
    if (blur <= 0.001) {
        COLOR = texture(TEXTURE, UV);
    } else {
        // 2.5 pixels at 720p, scaled with the viewport rather than resolution.
        vec2 step_size = vec2(TEXTURE_PIXEL_SIZE.x / TEXTURE_PIXEL_SIZE.y, 1.0) * (2.5 / 720.0) * blur;
        vec4 sum = premultiplied_sample(TEXTURE, UV) * 4.0;
        sum += premultiplied_sample(TEXTURE, UV + vec2(step_size.x, 0.0)) * 2.0;
        sum += premultiplied_sample(TEXTURE, UV - vec2(step_size.x, 0.0)) * 2.0;
        sum += premultiplied_sample(TEXTURE, UV + vec2(0.0, step_size.y)) * 2.0;
        sum += premultiplied_sample(TEXTURE, UV - vec2(0.0, step_size.y)) * 2.0;
        sum += premultiplied_sample(TEXTURE, UV + step_size);
        sum += premultiplied_sample(TEXTURE, UV - step_size);
        sum += premultiplied_sample(TEXTURE, UV + vec2(step_size.x, -step_size.y));
        sum += premultiplied_sample(TEXTURE, UV + vec2(-step_size.x, step_size.y));
        // Filter premultiplied colour to keep transparent edges from bleeding
        // black, then return straight alpha for the ordinary canvas blend.
        COLOR = vec4(sum.rgb / max(sum.a, 0.00001), sum.a / 16.0);
    }
}
