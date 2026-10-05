// A Brooklyn building's walls and roof, coloured building by building.
//
// A wall cannot tell which building it belongs to -- the map's meshes carry
// positions and normals only -- so the shader looks it up: the building
// attribute map (tools/maps/sands-pearl/building-map.mjs) is a metre-a-texel
// top-down grid naming the building on every square metre, and a wall samples
// it a little way inside itself. That gives each building its own facade
// family and tone, where its base is and how tall it stands, its floor height,
// whether its ground floor is a storefront and whether the generator already
// cut real windows into it.
//
// On top of the building's own colour: a darker plinth or a painted storefront
// with a sign band at street level, a thin line at every floor slab, a cornice
// at the roofline, brick or stone coursing up close, vertical weathering
// streaks, and -- only on the walls with no real windows, which is 396 of the
// 1,021 buildings -- a grid of painted windows at the building's own floor
// height, so a blank shell stops standing out beside a detailed neighbour.
// Roofs roll tar, silver coating, gravel or a green roof.
//
// Walls are projected along their own horizontal tangent, not a world axis,
// so a street at any angle gets level floors and upright windows.
shader_type spatial;
render_mode diffuse_burley, specular_schlick_ggx;


uniform sampler2D building_map : filter_nearest, repeat_disable;
uniform vec2 map_origin = vec2(0.0);
uniform vec2 map_size = vec2(1.0);
/** Paint windows on a building the generator left without any. */
uniform bool paint_windows = true;
/** How far inside a wall its building is looked up, in metres. */
uniform float inset = 0.7;
uniform float storefront_height = 4.3;
uniform float plinth_height = 0.9;
uniform float streak_strength = 0.14;
/**
 * Which part of a building this material draws: 0 walls and roofs, 1 window
 * trim and sills, 2 floor bands, 3 doors, 4 stoops. The facade pieces stand
 * proud of the wall, so they look further in for their building, and take a
 * colour that belongs to it rather than one for the whole city.
 */
uniform int part = 0;

varying vec3 world_position;
varying vec3 world_normal;

// Three tones a family, in the families' order: red brick, brown brick,
// brownstone, limestone, concrete, curtain wall, stucco, yellow brick.
const vec3 PALETTE[24] = vec3[24](
    vec3(0.55, 0.27, 0.2), vec3(0.47, 0.22, 0.17), vec3(0.6, 0.34, 0.25),
    vec3(0.42, 0.3, 0.24), vec3(0.35, 0.25, 0.21), vec3(0.49, 0.36, 0.28),
    vec3(0.45, 0.32, 0.26), vec3(0.39, 0.28, 0.24), vec3(0.52, 0.38, 0.3),
    vec3(0.76, 0.71, 0.6), vec3(0.69, 0.64, 0.54), vec3(0.8, 0.76, 0.66),
    vec3(0.63, 0.63, 0.61), vec3(0.55, 0.56, 0.55), vec3(0.7, 0.69, 0.66),
    vec3(0.3, 0.37, 0.43), vec3(0.24, 0.3, 0.36), vec3(0.4, 0.46, 0.5),
    vec3(0.8, 0.74, 0.6), vec3(0.64, 0.68, 0.6), vec3(0.74, 0.54, 0.44),
    vec3(0.73, 0.63, 0.46), vec3(0.66, 0.56, 0.4), vec3(0.77, 0.69, 0.53)
);

// Storefront paint and sign colours.
const vec3 SHOPFRONT[6] = vec3[6](
    vec3(0.09, 0.09, 0.1), vec3(0.11, 0.21, 0.16), vec3(0.33, 0.1, 0.09),
    vec3(0.11, 0.14, 0.24), vec3(0.3, 0.2, 0.13), vec3(0.55, 0.55, 0.53)
);
const vec3 SIGN[5] = vec3[5](
    vec3(0.86, 0.84, 0.78), vec3(0.72, 0.16, 0.12), vec3(0.9, 0.72, 0.2),
    vec3(0.16, 0.36, 0.55), vec3(0.12, 0.12, 0.13)
);

void vertex() {
    world_position = (MODEL_MATRIX * vec4(VERTEX, 1.0)).xyz;
    world_normal = normalize((MODEL_MATRIX * vec4(NORMAL, 0.0)).xyz);
}

float hash1(float n) {
    return fract(sin(n * 12.9898) * 43758.5453);
}

float hash2(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float value_noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash2(i), hash2(i + vec2(1.0, 0.0)), u.x), mix(hash2(i + vec2(0.0, 1.0)), hash2(i + vec2(1.0, 1.0)), u.x), u.y);
}

/** The attribute texel at a world point, as 0-255 integers. */
ivec4 building_at(vec2 world_xz) {
    vec2 grid = world_xz - map_origin;
    if (grid.x < 0.0 || grid.y < 0.0 || grid.x >= map_size.x || grid.y >= map_size.y) return ivec4(0);
    vec4 texel = texelFetch(building_map, ivec2(grid), 0);
    return ivec4(round(texel * 255.0));
}

/** 1 on a line of `width` metres every `spacing` metres along `x`, faded once it is under a pixel. */
float lines(float x, float spacing, float width) {
    float cell = x / spacing;
    float d = abs(fract(cell - 0.5) - 0.5) * spacing;
    float w = fwidth(x);
    float fade = 1.0 - smoothstep(width * 0.6, width * 2.5, w);
    return (1.0 - smoothstep(width * 0.5, width * 0.5 + w, d)) * fade;
}

void fragment() {
    vec3 n = world_normal;
    vec2 horizontal = n.xz;
    float flat_length = length(horizontal);
    bool is_roof = n.y > 0.5;
    vec2 inward = flat_length > 0.01 ? -horizontal / flat_length : vec2(0.0);
    // A texel with no height is a parked car's, not a building's.
    float reach = part == 0 ? inset : inset + 0.6;
    ivec4 record = building_at(world_position.xz + inward * (is_roof && part == 0 ? 0.0 : reach));
    if (record.a == 0 && (!is_roof || part != 0)) record = building_at(world_position.xz + inward * (reach * 2.4));
    if (record.a == 0) record = ivec4(0);
    bool known = record.r != 0;
    float id = known ? float(record.r) : floor(hash2(floor(world_position.xz / 23.0)) * 255.0) + 1.0;
    int family = known ? (record.g & 7) : int(mod(id, 8.0));
    bool has_windows = (record.g & 8) != 0;
    bool storefront = known && (record.g & 16) != 0;
    float floor_height = 2.9 + 0.25 * float((record.g >> 5) & 7);
    float base = float(record.b) / 4.0 - 32.0;
    float top = base + float(record.a);
    float h = world_position.y - base;
    float roll = hash1(id);
    float roll2 = hash1(id + 17.0);
    float roll3 = hash1(id + 43.0);

    vec3 albedo;
    float rough = 0.88;
    float metal = 0.0;
    float spec = 0.45;

    if (part != 0) {
        vec3 wall = PALETTE[family * 3 + int(roll * 2.999)];
        // Brick takes white or dark-green trim, stone and stucco a shade of
        // themselves, concrete and glass dark metal.
        vec3 trim;
        if (family == 0 || family == 1 || family == 7) trim = roll2 < 0.6 ? vec3(0.84, 0.82, 0.76) : roll2 < 0.8 ? vec3(0.12, 0.2, 0.16) : vec3(0.1, 0.1, 0.11);
        else if (family == 2) trim = wall * 0.7;
        else if (family == 3 || family == 6) trim = mix(wall, vec3(0.9, 0.88, 0.82), 0.5);
        else trim = vec3(0.2, 0.21, 0.22);
        if (part == 1) {
            albedo = trim;
            rough = 0.6;
        } else if (part == 2) {
            albedo = family == 3 || family == 6 ? wall * 0.82 : mix(wall, vec3(0.78, 0.75, 0.68), 0.55);
        } else if (part == 3) {
            albedo = SHOPFRONT[int(roll3 * 5.999)];
            rough = 0.4;
        } else {
            albedo = family == 2 ? wall * 0.95 : vec3(0.56, 0.54, 0.5);
        }
        ALBEDO = pow(albedo, vec3(2.2));
        ROUGHNESS = rough;
        METALLIC = 0.0;
        SPECULAR = spec;
    } else if (is_roof) {
        vec2 p = world_position.xz;
        float patches = value_noise(p / 6.0) * 0.6 + value_noise(p / 1.7) * 0.4;
        float grain = mix(0.5, value_noise(p / 0.25), 1.0 - smoothstep(0.1, 0.4, fwidth(p.x / 0.25)));
        if (n.y < 0.93) {
            albedo = vec3(0.25, 0.24, 0.26) * (0.9 + 0.2 * roll2);
            rough = 0.8;
        } else if (roll < 0.48) {
            albedo = mix(vec3(0.2, 0.2, 0.21), vec3(0.3, 0.29, 0.28), patches);
            rough = 0.96;
        } else if (roll < 0.8) {
            albedo = mix(vec3(0.66, 0.67, 0.68), vec3(0.5, 0.5, 0.49), smoothstep(0.35, 0.7, patches));
            rough = 0.55;
            metal = 0.25;
        } else if (roll < 0.97) {
            albedo = mix(vec3(0.44, 0.41, 0.37), vec3(0.36, 0.34, 0.31), patches);
            rough = 1.0;
        } else {
            albedo = mix(vec3(0.22, 0.29, 0.17), vec3(0.3, 0.33, 0.22), patches);
            rough = 0.95;
        }
        albedo *= 0.9 + 0.2 * grain;
    } else {
        vec2 tangent = flat_length > 0.01 ? vec2(-horizontal.y, horizontal.x) / flat_length : vec2(1.0, 0.0);
        float along = dot(world_position.xz, tangent);
        float y = world_position.y;
        int tone_index = family * 3 + int(roll * 2.999);
        vec3 wall = mix(PALETTE[tone_index], PALETTE[family * 3 + int(roll2 * 2.999)], 0.35);
        wall *= 0.94 + 0.12 * roll3;

        // Coursing up close: brick for the brick families, ashlar for stone,
        // panel joints for concrete, mullions for a curtain wall.
        float mortar = 0.0;
        if (family == 0 || family == 1 || family == 7) {
            float course = lines(y, 0.077, 0.012);
            float row = floor(y / 0.077);
            float head = lines(along + mod(row, 2.0) * 0.1, 0.2, 0.012);
            mortar = max(course, head) * 0.55;
            float brick = hash2(vec2(floor((along + mod(row, 2.0) * 0.1) / 0.2), row));
            float brick_fade = 1.0 - smoothstep(0.02, 0.06, fwidth(y));
            wall *= 1.0 + (brick - 0.5) * 0.16 * brick_fade;
        } else if (family == 2 || family == 3) {
            mortar = max(lines(y, 0.6, 0.015), lines(along + mod(floor(y / 0.6), 2.0) * 0.6, 1.2, 0.015)) * 0.35;
        } else if (family == 4) {
            mortar = max(lines(y - base, floor_height, 0.03), lines(along, 1.5, 0.02)) * 0.3;
        } else if (family == 5) {
            float mullion = max(lines(along, 1.5, 0.08), lines(y - base, floor_height, 0.25));
            wall = mix(wall, vec3(0.34, 0.35, 0.37), mullion * 0.8);
            rough = mix(0.12, 0.5, mullion);
            spec = 0.7;
            metal = 0.1;
        }
        vec3 mortar_colour = family == 0 || family == 1 || family == 7 ? vec3(0.66, 0.63, 0.57) : wall * 0.72;
        albedo = mix(wall, mortar_colour, mortar);

        // Weathering: soot and rain streaks run down a wall, and splash grime
        // darkens its foot.
        float streak = value_noise(vec2(along / 0.9, y / 9.0)) * 0.7 + value_noise(vec2(along / 0.3, y / 3.0)) * 0.3;
        albedo *= 1.0 - streak_strength * smoothstep(0.45, 0.9, streak);
        if (known) albedo *= mix(0.86, 1.0, smoothstep(0.0, 2.5, h));

        // A thin slab line at every floor, and a cornice along the roofline.
        if (known && family != 5) {
            float slab = lines(h, floor_height, 0.14) * step(storefront_height, h);
            albedo = mix(albedo, albedo * 0.8, slab * 0.6);
            float cornice = smoothstep(top - 0.75, top - 0.7, y);
            vec3 cornice_colour = family == 3 || family == 6 ? wall * 0.78 : mix(wall, vec3(0.78, 0.75, 0.68), 0.6);
            albedo = mix(albedo, cornice_colour, cornice);
        }

        // Painted windows, on a building the generator gave none.
        float fade_scale = max(fwidth(along), fwidth(y));
        if (paint_windows && known && !has_windows && family != 5) {
            float bay = 2.4 + roll2 * 1.1;
            vec2 cell = vec2(along / bay, (h - (storefront ? storefront_height : 0.0)) / floor_height);
            vec2 index = floor(cell);
            vec2 local = fract(cell);
            float lowest = storefront ? 0.0 : 1.0;
            float in_rows = step(lowest, index.y) * step(y, top - 1.1);
            float frame = step(0.2, local.x) * step(local.x, 0.8) * step(0.24, local.y) * step(local.y, 0.84);
            float pane = step(0.24, local.x) * step(local.x, 0.76) * step(0.28, local.y) * step(local.y, 0.8);
            // Once a window is only a few pixels across the pattern is
            // replaced by its average, so a far tower is a tone, not moire.
            float detail = 1.0 - smoothstep(0.1, 0.25, fade_scale / min(bay, floor_height));
            float pane_roll = hash2(index + vec2(id, id * 0.37));
            vec3 glass = pane_roll > 0.94 ? vec3(0.5, 0.49, 0.46) : pane_roll > 0.86 ? vec3(0.28, 0.23, 0.18) : mix(vec3(0.09, 0.12, 0.15), vec3(0.22, 0.29, 0.36), pane_roll / 0.86);
            // A shadowed reveal along the pane's top and one side stands in for depth.
            float reveal = max(step(0.72, local.y) * 0.45, step(local.x, 0.3) * 0.25);
            glass = mix(vec3(0.17, 0.19, 0.22), glass * (1.0 - reveal), detail);
            vec3 frame_colour = family == 0 || family == 1 || family == 2 ? vec3(0.78, 0.76, 0.7) : vec3(0.16, 0.17, 0.18);
            float frame_weight = mix(0.09, frame * (1.0 - pane), detail) * in_rows;
            float pane_weight = mix(0.27, pane, detail) * in_rows;
            albedo = mix(albedo, frame_colour, frame_weight);
            albedo = mix(albedo, glass, pane_weight);
            rough = mix(rough, 0.08, pane_weight);
            spec = mix(spec, 0.75, pane_weight);
        }

        // Street level: a painted storefront with a sign band, or a darker plinth.
        if (known && storefront && h < storefront_height) {
            vec3 paint = SHOPFRONT[int(roll3 * 5.999)];
            float sign_band = step(storefront_height - 1.0, h) * step(h, storefront_height - 0.25);
            vec3 sign_colour = SIGN[int(roll2 * 4.999)];
            albedo = paint;
            rough = 0.5;
            if (!has_windows && paint_windows) {
                float bay = 3.6;
                float local = fract(along / bay);
                float glass = step(0.1, local) * step(local, 0.9) * step(0.45, h) * step(h, storefront_height - 1.25);
                albedo = mix(albedo, mix(vec3(0.08, 0.1, 0.12), vec3(0.3, 0.25, 0.18), step(0.6, hash2(vec2(floor(along / bay), id)))), glass);
                rough = mix(rough, 0.06, glass);
                spec = mix(spec, 0.8, glass);
            }
            albedo = mix(albedo, sign_colour, sign_band * step(0.35, roll));
        } else if (known && h < plinth_height) {
            albedo *= 0.7;
        }
    }
    // Every colour above is written as sRGB, as a paint chip would be.
    if (part == 0) {
        ALBEDO = pow(max(albedo, vec3(0.0)), vec3(2.2));
        ROUGHNESS = rough;
        METALLIC = metal;
        SPECULAR = spec;
    }
}
