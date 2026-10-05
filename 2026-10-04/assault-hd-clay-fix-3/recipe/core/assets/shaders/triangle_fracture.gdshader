// Real triangles of an import-prepared mesh LOD replace the body for a hit.
// Unindexed corners supply barycentrics without wireframe render mode.
shader_type spatial;
render_mode diffuse_burley, specular_schlick_ggx, cull_back;
#include "res://assets/shaders/lattice_ripple.gdshaderinc"
uniform vec4 base_color : source_color = vec4(1.0);
uniform sampler2D albedo_map : source_color, hint_default_white, filter_linear_mipmap_anisotropic;
uniform sampler2D normal_map : hint_normal, filter_linear_mipmap_anisotropic;
uniform sampler2D orm_map : hint_default_white, filter_linear_mipmap_anisotropic;
uniform float base_roughness = 1.0;
uniform float base_metallic = 1.0;
uniform float base_specular = 0.5;
uniform float normal_strength = 1.0;
uniform vec4 roughness_channel = vec4(0.0,1.0,0.0,0.0);
uniform vec4 metallic_channel = vec4(0.0,0.0,1.0,0.0);
uniform vec3 uv_scale = vec3(1.0);
uniform vec3 uv_offset = vec3(0.0);
varying vec3 world_position;
varying vec3 barycentric;
varying flat float face_random;
void vertex() {
    world_position = (MODEL_MATRIX * vec4(VERTEX, 1.0)).xyz;
    int corner = VERTEX_ID % 3;
    barycentric = vec3(corner == 0 ? 1.0 : 0.0, corner == 1 ? 1.0 : 0.0, corner == 2 ? 1.0 : 0.0);
    face_random = fract(sin(dot(floor(UV * 32.0), vec2(12.9898,78.233))) * 43758.5453);
    UV = UV * uv_scale.xy + uv_offset.xy;
}
void fragment() {
    vec3 patch = vec3(0.0,1.0,0.0);
    if (lattice_live > 0.5) patch = lattice_patch(world_position);
    // Four children follow the parent mesh's shape without adding geometry.
    // Differentiate before fract: derivatives across a child seam must not
    // mistake the wrap for a subpixel facet and erase its shared edge.
    vec3 derivative = max(fwidth(barycentric) * 2.0,vec3(1e-5));
    vec3 child = fract(barycentric * 2.0);
    if (child.x + child.y + child.z > 1.5) child = vec3(1.0) - child;
    float child_id = barycentric.x > 0.5 ? 0.0 : (barycentric.y > 0.5 ? 1.0 : (barycentric.z > 0.5 ? 2.0 : 3.0));
    float fragment_random = fract(sin(face_random * 127.1 + child_id * 31.7) * 43758.5453);
    vec3 edge_distance = child / derivative;
    float edge = min(min(edge_distance.x,edge_distance.y),edge_distance.z);
    float wire = lattice_wire(edge,0.45);
    patch.z *= smoothstep(1.5,5.0,1.0/max(max(derivative.x,derivative.y),derivative.z));
    // Removing the face itself also removes depth. Some faces survive as a
    // fine triangular skeleton; no hidden copy of textured cloth remains.
    if (fragment_random < patch.z * 0.15) discard;
    if (fragment_random < patch.z * 0.7 && wire < 0.04) discard;
    float stripped = smoothstep(0.0,0.65,patch.z);
    ALBEDO = base_color.rgb * texture(albedo_map,UV).rgb;
    vec4 orm = texture(orm_map,UV);
    ROUGHNESS = base_roughness * dot(orm,roughness_channel);
    METALLIC = base_metallic * dot(orm,metallic_channel);
    SPECULAR = base_specular;
    NORMAL_MAP = texture(normal_map,UV).rgb;
    NORMAL_MAP_DEPTH = normal_strength;
    ALBEDO = mix(ALBEDO,vec3(dot(ALBEDO,vec3(0.2126,0.7152,0.0722))),stripped);
    ROUGHNESS = mix(ROUGHNESS,0.95,stripped);
    METALLIC *= 1.0-stripped;
    SPECULAR *= 1.0-stripped;
    float rim = pow(1.0-abs(dot(normalize(NORMAL),normalize(VIEW))),3.0);
    vec3 ink = lattice_tint(patch.x*0.3);
    ALBEDO = mix(ALBEDO,ink*0.3,wire*stripped);
    EMISSION = ink * (wire*1.2+rim*0.5) * stripped;
}
