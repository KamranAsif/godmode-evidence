// Shared numeric eight-slot fracture envelope. No extra texture samples or
// impact objects; idle world surfaces exit at one uniform comparison.
const float LATTICE_TRAIL = 0.55;
const float LATTICE_FRONT = 0.3;

// The client's own clock in seconds, and 0 when no ripple is showing.
global uniform float lattice_now;
global uniform float lattice_live;
// Per slot: xyz the origin in metres, w the second it started.
global uniform vec4 lattice_origin_0;
global uniform vec4 lattice_origin_1;
global uniform vec4 lattice_origin_2;
global uniform vec4 lattice_origin_3;
global uniform vec4 lattice_origin_4;
global uniform vec4 lattice_origin_5;
global uniform vec4 lattice_origin_6;
global uniform vec4 lattice_origin_7;
// Per slot: x heat, y radius, z life in seconds, w last hit time (extends the hold).
global uniform vec4 lattice_shape_0;
global uniform vec4 lattice_shape_1;
global uniform vec4 lattice_shape_2;
global uniform vec4 lattice_shape_3;
global uniform vec4 lattice_shape_4;
global uniform vec4 lattice_shape_5;
global uniform vec4 lattice_shape_6;
global uniform vec4 lattice_shape_7;

/** White for a graze, red for a hard hit. */
vec3 lattice_tint(float heat) {
    return mix(vec3(1.0, 0.97, 0.93), vec3(1.0, 0.12, 0.06), clamp(heat, 0.0, 1.0));
}

// A repeated hit keeps the original triangulation and outward progress. Only
// the hold is renewed; resetting origin.w used to black out the patch every shot.
float lattice_phase(vec4 origin, vec4 shape, float hold_phase) {
    float life = max(shape.z,0.001);
    float age = (lattice_now-origin.w)/life;
    float since_hit = (lattice_now-shape.w)/life;
    return min(age,max(hold_phase,since_hit));
}

// Box-filtered subpixel line coverage: a half-pixel translation redistributes
// energy between neighbouring pixels instead of making the line flash brighter.
float lattice_wire(float pixel_distance, float width) {
    return clamp(0.5+width*0.5-pixel_distance,0.0,width);
}

// Spatial and temporal envelope, independent of colour and line density.
float lattice_coverage(vec3 p, vec4 origin, vec4 shape) {
    float t = lattice_phase(origin,shape,0.32);
    if (t<0.0 || t>1.0) return 0.0;
    float radius = max(shape.y,0.001);
    float d = distance(p,origin.xyz);
    if (d>radius) return 0.0;
    float front = radius*t;
    float edge = 1.0-smoothstep(0.0,radius*LATTICE_FRONT,abs(d-front));
    float trail = (1.0-smoothstep(front,front+radius*LATTICE_TRAIL,d))*(1.0-d/radius);
    return clamp((trail*0.45+edge)*(1.0-t)*(1.0-t)*6.0,0.0,1.0);
}

// The dominant local fracture determines heat/extent. No new ring state.
vec3 lattice_patch_slot(vec3 p, vec4 origin, vec4 shape, vec3 previous) {
    float coverage = lattice_coverage(p, origin, shape);
    return mix(previous,vec3(shape.x,max(shape.y,0.001),coverage),step(previous.z,coverage));
}
vec3 lattice_patch(vec3 p) {
    vec3 patch = vec3(0.0,1.0,0.0);
    patch = lattice_patch_slot(p,lattice_origin_0,lattice_shape_0,patch);
    patch = lattice_patch_slot(p,lattice_origin_1,lattice_shape_1,patch);
    patch = lattice_patch_slot(p,lattice_origin_2,lattice_shape_2,patch);
    patch = lattice_patch_slot(p,lattice_origin_3,lattice_shape_3,patch);
    patch = lattice_patch_slot(p,lattice_origin_4,lattice_shape_4,patch);
    patch = lattice_patch_slot(p,lattice_origin_5,lattice_shape_5,patch);
    patch = lattice_patch_slot(p,lattice_origin_6,lattice_shape_6,patch);
    patch = lattice_patch_slot(p,lattice_origin_7,lattice_shape_7,patch);
    return patch;
}
// Select a live impact before doing fragment geometry. Most of the street is
// outside every impact and exits here, even during sustained fire.
void lattice_world_slot(vec3 p, vec4 origin, vec4 shape,
        inout vec4 selected_origin, inout vec4 selected_shape, inout float score) {
    float t = (lattice_now-shape.w)/max(shape.z,0.001);
    if (t<0.0 || t>=1.0) return;
    vec3 delta = p-origin.xyz;
    float proximity = 1.0-dot(delta,delta)/max(shape.y*shape.y,0.000001);
    float candidate = proximity*(1.0-t*0.1);
    if (candidate>score && proximity>0.0) {
        selected_origin = origin;
        selected_shape = shape;
        score = candidate;
    }
}
vec2 lattice_hash2(vec2 p) {
    vec3 h = fract(vec3(p.xyx)*vec3(0.1031,0.1030,0.0973));
    h += dot(h,h.yzx+33.33);
    return fract((h.xx+h.yz)*h.zy);
}
float lattice_cross(vec2 a, vec2 b) { return a.x*b.y-a.y*b.x; }
// All cells share their corner positions. Bounded jitter keeps every quad
// convex; neighbouring triangles meet exactly instead of opening grid seams.
vec2 lattice_corner(vec2 cell, vec2 seed) {
    return cell+vec2(0.5)+(lattice_hash2(cell+seed)-0.5)*0.48;
}
// Return wire, coverage, flare and face seed for the containing triangle.
vec4 lattice_triangle(vec2 q, vec2 dx, vec2 dy, vec2 a, vec2 b, vec2 c,
        float radius_cells, float perpendicular_cells, float phase, vec2 seed) {
    vec2 e1 = b-a;
    vec2 e2 = c-a;
    float determinant = lattice_cross(e1,e2);
    vec2 uv = vec2(lattice_cross(q-a,e2),lattice_cross(e1,q-a))/determinant;
    vec3 bary = vec3(1.0-uv.x-uv.y,uv);
    if (min(min(bary.x,bary.y),bary.z)<-0.00001) return vec4(-1.0);
    // Keep whole faces inside the impact's reach, including their vertices.
    float off_plane_squared = perpendicular_cells*perpendicular_cells;
    float extent = sqrt(max(max(dot(a,a),dot(b,b)),dot(c,c))+off_plane_squared)/radius_cells;
    if (extent>1.0) return vec4(0.0);
    vec2 centre = (a+b+c)/3.0;
    float radial = sqrt(dot(centre,centre)+off_plane_squared)/radius_cells;
    vec2 random = lattice_hash2(centre+seed);
    // Distance orders only the outward break. Fade clocks are independent of
    // distance and arrival, so recovery cannot trace a second travelling front.
    float arrival = radial*0.49+random.x*0.12;
    float fade_start = 0.66+random.y*0.12;
    float fade_duration = 0.14+fract(random.y*17.17)*0.07;
    float coverage = smoothstep(arrival,arrival+0.045,phase)
        *(1.0-smoothstep(fade_start,fade_start+fade_duration,phase));
    float flare = (1.0-smoothstep(arrival+0.025,arrival+0.12,phase));
    // Analytic derivatives remain valid across face boundaries and after the
    // spatial early-out. Never differentiate floor/hash/triangle selection.
    vec2 g1 = vec2(e2.y,-e2.x)/determinant;
    vec2 g2 = vec2(-e1.y,e1.x)/determinant;
    vec2 g0 = -g1-g2;
    vec3 derivative = max(vec3(abs(dot(g0,dx))+abs(dot(g0,dy)),
        abs(dot(g1,dx))+abs(dot(g1,dy)),abs(dot(g2,dx))+abs(dot(g2,dy))),vec3(1e-5));
    vec3 pixel = bary/derivative;
    float wire = lattice_wire(min(min(pixel.x,pixel.y),pixel.z),0.6);
    // Fade the whole fragment, including the substrate, before thin slivers
    // become a crawling field of one-pixel lines at range or grazing angles.
    // The finer field reaches full contrast at five pixels; eight washed out
    // resolvable small-arm facets beside the three-times-larger cheat lenses.
    float detail = smoothstep(2.0,5.0,1.0/max(max(derivative.x,derivative.y),derivative.z));
    return vec4(wire,coverage*detail,flare,random.y);
}
void apply_lattice(vec3 p, inout vec3 lattice_base, inout vec3 lattice_emission,
        inout float lattice_roughness, inout float lattice_metallic, inout float lattice_specular) {
    if (lattice_live < 0.5) return;
    // Derivatives must be evaluated before the nonuniform spatial branch.
    vec3 px = dFdx(p);
    vec3 py = dFdy(p);
    vec4 origin = vec4(0.0);
    vec4 shape = vec4(0.0);
    float score = 0.0;
    lattice_world_slot(p,lattice_origin_0,lattice_shape_0,origin,shape,score);
    lattice_world_slot(p,lattice_origin_1,lattice_shape_1,origin,shape,score);
    lattice_world_slot(p,lattice_origin_2,lattice_shape_2,origin,shape,score);
    lattice_world_slot(p,lattice_origin_3,lattice_shape_3,origin,shape,score);
    lattice_world_slot(p,lattice_origin_4,lattice_shape_4,origin,shape,score);
    lattice_world_slot(p,lattice_origin_5,lattice_shape_5,origin,shape,score);
    lattice_world_slot(p,lattice_origin_6,lattice_shape_6,origin,shape,score);
    lattice_world_slot(p,lattice_origin_7,lattice_shape_7,origin,shape,score);
    if (score<=0.0) return;
    vec3 across = cross(px,py);
    vec3 n = length(across)>1e-12 ? abs(normalize(across)) : vec3(0.0,1.0,0.0);
    vec3 local = p-origin.xyz;
    vec2 plane = n.y>max(n.x,n.z) ? local.xz : (n.x>n.z ? local.zy : local.xy);
    vec2 dx = n.y>max(n.x,n.z) ? px.xz : (n.x>n.z ? px.zy : px.xy);
    vec2 dy = n.y>max(n.x,n.z) ? py.xz : (n.x>n.z ? py.zy : py.xy);
    vec2 seed = lattice_hash2(origin.xz+origin.yy)*73.0;
    float angle = seed.x*6.283185;
    mat2 rotation = mat2(vec2(cos(angle),sin(angle)),vec2(-sin(angle),cos(angle)));
    // Fixed metre-scale cells: a larger hit breaks more triangles, not different ones.
    // The search still visits only the containing cell and its neighbours.
    float density = 10.8;
    float radius_cells = shape.y*density;
    float perpendicular = (n.y>max(n.x,n.z) ? local.y : (n.x>n.z ? local.x : local.z))*density;
    vec2 q = rotation*plane*density;
    dx = rotation*dx*density;
    dy = rotation*dy*density;
    vec2 base = floor(q)-1.0;
    float phase = lattice_phase(origin,shape,0.66);
    vec4 facet = vec4(0.0);
    for (int y=0; y<2; y++) {
        for (int x=0; x<2; x++) {
            vec2 cell = base+vec2(float(x),float(y));
            vec2 a = lattice_corner(cell,seed);
            vec2 b = lattice_corner(cell+vec2(1.0,0.0),seed);
            vec2 c = lattice_corner(cell+vec2(1.0),seed);
            vec2 d = lattice_corner(cell+vec2(0.0,1.0),seed);
            bool flip = lattice_hash2(cell+seed).x>0.5;
            vec4 first = lattice_triangle(q,dx,dy,a,b,flip ? d : c,radius_cells,perpendicular,phase,seed);
            vec4 second = lattice_triangle(q,dx,dy,flip ? b : a,c,d,radius_cells,perpendicular,phase,seed);
            if (first.x>=0.0) facet = first;
            if (second.x>=0.0) facet = second;
        }
    }
    float wire = facet.x;
    float stripped = facet.y;
    float flare = facet.z;
    float face = facet.w;
    float removed = (1.0-step(0.28,face))*(1.0-flare);
    vec3 ink = mix(vec3(0.72),vec3(0.8,0.28,0.12),shape.x*0.35);
    // ALBEDO already includes the surface texture. No new texture read.
    float luminance = dot(lattice_base,vec3(0.2126,0.7152,0.0722));
    vec3 substrate = vec3(luminance);
    lattice_base = mix(lattice_base,mix(substrate,ink,wire*(1.0-removed*0.7)),stripped);
    lattice_roughness = mix(lattice_roughness,0.95,stripped);
    lattice_metallic *= 1.0-stripped;
    lattice_specular *= 1.0-stripped;
    lattice_emission = lattice_emission*(1.0-stripped)+ink*wire*stripped*(0.2+flare*0.7);
}
