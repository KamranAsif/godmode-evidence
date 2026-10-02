# Visual audit — main 5ae4aac2c

Audited from an isolated origin/main worktree with fetched and imported baked lighting. Rendered GodotJS/D3D12 offscreen at 1920×1080 using owned godot-cli sessions. No game/art code changed; owned engines stopped.

42 retained captures: 7 current configured cameras, 5 recovered original concept cameras, and 30 player-eye poses (1.7m above sampled ground). These were a free-fly sweep, not a collision/navigation certification. Gate05 and gate08 are obstructed; gate14 sampled a lower shoreline surface and does not certify a walkable closure view.

The current numbered cameras01–05 have moved to arena C and do not match the approved inland concept01–05. Their old poses are included separately as contextual evidence. Only06/07 are direct camera-matched concept comparisons. A discarded interior-building shot falsely suggested a missing wall; that claim is withdrawn and the shot replaced. Static images did not establish temporal z-fighting.

## Ranked defects

### 1. D01 — Critical

Promenade has the wrong orientation and footprint. Dark paving runs diagonally into the railing, with green joint lines and a narrow shore strip; the concept has a broad light promenade parallel to the bulkhead.

Location: c06, XZ [-790, -263]. [Screenshot](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/c06-da15b79252.png).

Cause guess: Source park-path polygons are being used without reconciling the approved waterfront layout.

Likely owner: `tools/maps/sands-pearl/build.mjs; source park/path meshes; scripts/client/waterfront.ts`.

### 2. D02 — High

Eastern facades contain overlapping window families: large near-black panels and projecting white frames cover smaller blue windows and trim. The building reads as a collage of detached parts. This is an exterior road camera, unlike the discarded interior park shot.

Location: gate10, XZ [-513.38, -303.65]. [Screenshot](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/gate10-f31b96d4dc.png).

Cause guess: Retained facade details and replacement modules may both be drawing, or facade placement is offset from the shell.

Likely owner: `scripts/environment_modules/arena_modules.ts; module_instancer.ts; placement_rules.ts`.

### 3. D03 — High

Shore railing hangs over water without a supporting land surface; posts and lower bars descend beside/into the water. Farther along the same edge, shore and closure pieces step and lean discontinuously.

Location: gate01, XZ [-222.04, -494.2]. [Screenshot](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/gate01-af969f11d0.png).

Cause guess: Shoreline, land-height samples and railing/cordon ground fits disagree.

Likely owner: `scripts/client/waterfront.ts; tools/maps/modules/build-waterfront.mjs; dumbo_cordon_prop_ground.generated.ts`.

### 4. D04 — High

An enormous white deck/blade runs beside/above the detailed steel bridge, looking disconnected from its structure.

Location: gate02, XZ [-229.39, -460.58]. [Screenshot](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/gate02-02c75b5be1.png).

Cause guess: Full source transport geometry is retained alongside the horizon bridge representation.

Likely owner: `scripts/client/horizon_transport.generated.ts; city_horizon.generated.ts; tools/maps/modules/build-horizon.mjs`.

### 5. D05 — High

Promenade sits behind a tall blank retaining face. Its elevation and shoreline composition differ substantially from the concept: no rock apron, timber piles, mooring bollard or left-side pier structure.

Location: c07, XZ [-577, -461]. [Screenshot](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/c07-74dc1a2651.png).

Cause guess: Bulkhead cap/land elevations and shoreline dressing are incomplete or inconsistent with the reference.

Likely owner: `scripts/client/waterfront.ts; tools/maps/modules/build-waterfront.mjs; waterfront assets`.

### 6. D06 — High

Pier 1 paving ends as a raised rectangular slab in grass; surrounding terrain forms a sharp angular ridge. Paths elsewhere have abrupt ends and incompatible dark/white networks.

Location: pier-path, XZ [-790, -220]. [Screenshot](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/pier-path-b253bb2a10.png).

Cause guess: Independently generated path and terrain surfaces lack joined endpoints and common grade.

Likely owner: `tools/maps/sands-pearl/build.mjs; source terrain/path meshes`.

### 7. D07 — High

Drain grate is tilted and lifted above the sidewalk; another grate is visibly proud of the road at gate10.

Location: gate12, XZ [-553.85, -215.3]. [Screenshot](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/gate12-ab4ac99413.png).

Cause guess: Ground-detail height/normal fitting uses the wrong surface or leaves excessive offset.

Likely owner: `scripts/client/environment_ground_details.ts; environment_ground_layout.ts`.

### 8. D08 — High

Tree trunk intersects a closure barrier; planter modules show exposed slab undersides on uneven ground. Gate13 has another tree/closure intersection.

Location: gate04, XZ [-509.12, -318.35]. [Screenshot](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/gate04-544ce63b0b.png).

Cause guess: Closure and landscaping placement do not exclude each other or share ground fitting.

Likely owner: `scripts/dumbo_cordon_visuals.ts; dumbo_cordon_prop_ground.generated.ts; scripts/environment_modules/placement_rules.ts`.

### 9. D09 — High

Elevated closure tarp is pitched strongly down the hill; grass terrain rises steeply into adjacent built surfaces, making the closure look tipped over.

Location: gate16, XZ [-645.98, -133.81]. [Screenshot](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/gate16-735585d517.png).

Cause guess: Whole closure modules inherit a steep terrain fit instead of a coherent apron.

Likely owner: `scripts/dumbo_cordon_visuals.ts; dumbo_cordon_prop_ground.generated.ts; source terrain`.

### 10. D10 — High

World surfaces have conspicuous fake triangular colour variation, rectangular drawn paving joints and bright green seams; rooftops and bridge towers also wear triangle-pattern camouflage. These conflict with the flat-colour world rule.

Location: c06, XZ [-790, -263]. [Screenshot](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/c06-da15b79252.png).

Cause guess: Shared world shaders add tone noise, simulated normals, wear and paving lines.

Likely owner: `scripts/client/faceted_surface.ts; assets/maps/western_block/faceted-surface.gdshaderinc; assets/maps/waterfront/bulkhead.gdshader`.

### 11. D11 — Medium-high

Two incompatible tree families coexist in dense rows: dark branching trees and oversized simple brown-trunk trees. Crowns crowd paths, building faces and fire escapes.

Location: park-west, XZ [-460, -455]. [Screenshot](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/park-west-951f95fadc.png).

Cause guess: Retained authored foliage and procedural module planting both survive; spacing/setback ignores crown extent.

Likely owner: `scripts/environment_modules/arena_modules.ts; placement_rules.ts; retained source foliage`.

### 12. D12 — Medium-high

Water reads as pale cyan ribbons/checker facets, with little visible relief or shore foam; the concepts show deep blue/teal, substantial wave facets and white breaking water.

Location: c06, XZ [-790, -263]. [Screenshot](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/c06-da15b79252.png).

Cause guess: Wave amplitude, colour, foam and distance treatment are too subdued/smooth.

Likely owner: `assets/maps/waterfront/faceted-river.gdshader; tools/maps/modules/build-waterfront.mjs`.

### 13. D13 — Medium

Repeated small olive pyramids/diamonds look like stray triangles. Benches, bins and shrub groups sit on dark rectangular pads pasted onto grass, with overlapping pad corners.

Location: park-west, XZ [-460, -455]. [Screenshot](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/park-west-951f95fadc.png).

Cause guess: Repeated dressing prefabs preserve arbitrary base plates and overly angular low planting.

Likely owner: `scripts/client/western_block_dressing.ts; scripts/environment_modules/garden_yard_modules.generated.ts; retained park assets`.

### 14. D14 — Medium

Closure/vehicle assets contain visible grime, concrete pitting and fabric-like surface detail, inconsistent with the flat-colour world rule.

Location: gate13, XZ [-601.76, -135.01]. [Screenshot](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/gate13-b4b869f3e1.png).

Cause guess: Imported world asset materials retain detailed textures or weathering.

Likely owner: `scripts/dumbo_cordon_visuals.ts; closure/vehicle asset materials; environment module weathering`.

### 15. D15 — Medium

Car glazing/body panels have sharp mismatched triangle patches; the side window includes a black triangular wedge and fragmented blue/brown edges.

Location: gate12, XZ [-553.85, -215.3]. [Screenshot](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/gate12-ab4ac99413.png).

Cause guess: Vehicle mesh/material boundaries or retained facet treatment are malformed.

Likely owner: `scripts/dumbo_survival_arena.ts; legacyStreetVehicle source assets; world material overrides`.

### 16. D16 — Medium

Distant skyline has repetitive box silhouettes and noisy triangle/window patterns; the left horizon includes a long flat gray strip and abruptly cut land/building edges.

Location: c06, XZ [-790, -263]. [Screenshot](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/c06-da15b79252.png).

Cause guess: Horizon simplification, palette and terrain edge treatment are too coarse.

Likely owner: `scripts/client/city_horizon.generated.ts; horizon_view_geometry.generated.ts; tools/maps/modules/build-horizon.mjs`.

### 17. D17 — Medium

Roof presentation is dominated by large empty planes, strong triangle patterns and stretched thin white duct runs rather than the concepts’ quieter roofs with compact equipment groupings.

Location: c01, XZ [-427, -342]. [Screenshot](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/c01-43b3ab1178.png).

Cause guess: Roof module distribution and material treatment are mismatched.

Likely owner: `scripts/environment_modules/arena_modules.ts; placement_rules.ts; roof module generation`.

### 18. D18 — Medium

Waterfront uses decorative iron pickets instead of the approved simple square posts and horizontal rails; the fence makes the edge visually busy and blocks the open water read.

Location: c07, XZ [-577, -461]. [Screenshot](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/c07-74dc1a2651.png).

Cause guess: A reused areaway iron-collar module is standing in for a waterfront railing.

Likely owner: `scripts/client/waterfront.ts; waterfront railing module`.

## Every-image ledger

| Image / XZ | Concrete defects and coverage limits |
|---|---|
| [c01](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/c01-43b3ab1178.png) / (-427, -342) | D10/D11/D16/D17: busy artificial roof triangles, sparse elongated roof equipment, dense repeated trees and noisy skyline. |
| [c02](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/c02-0d244157f7.png) / (-485, -405) | D10/D11/D13/D16: crowded mixed trees, repetitive shrub triangles/pads, path surface noise and skyline repetition. |
| [c03](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/c03-9496a8aae9.png) / (-611, -294) | D04/D10/D11: massive patterned bridge deck/tower dominates undercroft; overlapping tree families and noisy roof/path surfaces. |
| [c04](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/c04-4cac41af54.png) / (-591, -204) | D02/D10/D11/D17: layered facade details, dense planting, conspicuous roof triangles and stretched roof fixtures. |
| [c05](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/c05-489d0766e0.png) / (-785, -200) | D01/D06/D10/D13/D16: incompatible park path networks, abrupt endpoints, stray-looking shrubs, noisy facets and horizon cutoff. |
| [c06](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/c06-da15b79252.png) / (-790, -263) | D01/D03/D05/D10/D12/D13/D16/D18: wrong diagonal promenade; green seams/pyramids; wrong fence; absent rock/pile/bollard dressing; pale water and cutoff horizon. |
| [c07](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/c07-74dc1a2651.png) / (-577, -461) | D05/D10/D12/D13/D16/D18: retaining face raises rail above the path; wrong shoreline/pier dressing, surface noise, pale water, stray shrub triangles and wrong fence. |
| [old01](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/old01-982f8e988a.png) / (-585.0, 5.86) | Context only: washed-out legacy trees/roofs and gray streets; original camera is outside playable arena C. Current numbered camera01 does not match this approved composition. |
| [old02](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/old02-b95752a8c8.png) / (-426.93, 53.93) | Context only: washed-out and sparse legacy blocks/trees, gray street; original camera is outside arena C. Cannot certify the original concept against current camera02. |
| [old03](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/old03-b93a6e28e4.png) / (-526.55, 89.8) | Context only: sparse/washed-out legacy buildings and vegetation, missing original scene density; outside arena C. Cannot treat as playable-room regression. |
| [old04](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/old04-14789468f5.png) / (-542.58, -107.53) | Context only: pale facades/trees and flat gray ground outside arena C; original concept and current camera04 cover different places. |
| [old05](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/old05-8d75d1d37e.png) / (-465.81, -44.29) | Context only: original courtyard composition is outside arena C; washed-out contextual dressing and sparse roof detail. Current camera05 is Pier1. |
| [e01-street](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/e01-street-2cfe03ce9e.png) / (-402, -392) | D10/D11: slab joints/fake facets dominate pavement; huge brown trunks coexist with dark branching trees and occupy sidewalk space. |
| [e01-front](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/e01-front-877e720315.png) / (-402, -392) | D10/D11: inconsistent tree families, crowded frontage and noisy pavement/facade planes. |
| [e02-street](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/e02-street-ba50e51c9c.png) / (-460, -455) | D04/D10/D11/D13: patterned bridge/tower, incompatible tree silhouettes, geometric shrubs and repeated dark furniture pads. |
| [e02-front](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/e02-front-0afc78ea18.png) / (-460, -455) | D10/D11/D13: artificial grass triangles, dense mixed trees and black pads/pyramids in the park. |
| [e03-street](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/e03-street-7617f8edc9.png) / (-586, -344) | D02/D10/D11: facade/window layers read detached; excessive pavement/facade pattern and tree crowding. |
| [e03-front](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/e03-front-b91168d181.png) / (-586, -344) | D02/D10/D11: dark facade patches with projecting frames; noisy surfaces and tree/architecture crowding. |
| [e04-street](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/e04-street-87ef2e1c22.png) / (-566, -254) | D02/D10/D11: busy mismatched facade elements and dense tree rows; surface patterns overpower the street. |
| [e04-front](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/e04-front-496b9494b4.png) / (-566, -254) | D10/D11: oversized planting near architecture and repeated drawn sidewalk joints. |
| [e05-street](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/e05-street-d226ba60f4.png) / (-760, -250) | D06/D10/D13/D16: sharply faceted park grade, repeating triangles/pads, path discontinuity and gray horizon edge. |
| [e05-front](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/e05-front-845e8dd329.png) / (-760, -250) | D06/D10/D11/D13: abrupt/path grade transitions, mixed trees, dark prefab bases and shrub pyramids. |
| [gate01](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/gate01-af969f11d0.png) / (-222.04, -494.2) | D03/D04/D10/D12/D14: rail suspended beside water, tilted closure line, huge white bridge blade, pale ribbon water and detailed barrier materials. |
| [gate02](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/gate02-02c75b5be1.png) / (-229.39, -460.58) | D04/D10/D11/D14: disconnected white bridge bands and dense trees; tarp/concrete surface detail. Booth placement otherwise has no confirmed float in this image. |
| [gate03](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/gate03-b91ed61cf8.png) / (-230.0, -358.49) | D10/D11/D14: textured/tonal closure assets, crowded canopy and noisy road. No definite hole or floating car confirmed. |
| [gate04](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/gate04-544ce63b0b.png) / (-509.12, -318.35) | D08/D10/D11/D14: tree/barrier intersection, exposed planter undersides and crowded planting; noisy closure/ground materials. |
| [gate05](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/gate05-472b89640b.png) / (-411.67, -314.72) | COVERAGE LIMIT: camera looks into a nearby facade and shrub bed; closure itself is occluded. Visible drawn facets and tightly packed modules (D10/D11); no closure verdict. |
| [gate06](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/gate06-02f54b29ac.png) / (-411.95, -317.84) | D10/D11/D14: closure disappears into very dark shadow, dense procedural crowns and detailed sandbag/ground surfaces. No confirmed placement failure. |
| [gate07](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/gate07-f0935f4483.png) / (-327.49, -317.02) | D10/D11/D14: cluttered layered closure/trees and dark faces, textured tarp/concrete; no definite floating object. |
| [gate08](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/gate08-966654e292.png) / (-280.26, -316.77) | COVERAGE LIMIT: fence/wall occludes most of the closure. D02/D10/D11: dark wall/frame layer, tree crowding and surface noise; cannot certify hidden closure joins. |
| [gate09](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/gate09-d0d9ca635e.png) / (-254.7, -315.08) | D02/D08/D10/D11: black facade patch, exposed planter underside and dense module planting; closure partly hidden. |
| [gate10](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/gate10-f31b96d4dc.png) / (-513.38, -303.65) | D02/D07/D10/D11/D14/D15: overlapping facade/window systems, raised road grate, crowded planting, textured concrete/tarp and fragmented car surfaces. |
| [gate11](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/gate11-2129cb0bdc.png) / (-520.0, -233.43) | D02/D10/D11/D14: layered black/blue window and trim systems, out-of-scale projecting facade fixtures, crowded crowns and detailed closure material. Chain-link gate itself reads assembled. |
| [gate12](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/gate12-ab4ac99413.png) / (-553.85, -215.3) | D07/D10/D11/D14/D15: raised tilted grate, black triangular car-window wedge, fragmented body/glass planes, tree/fire-escape crowding and detailed sandbags. |
| [gate13](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/gate13-b4b869f3e1.png) / (-601.76, -135.01) | D08/D10/D11/D14: tree trunk crosses closure base; burned-car grime violates flat-colour styling; shrubs/crowns crowd closure. |
| [gate14](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/gate14-b44c982029.png) / (-800.66, -129.51) | COVERAGE LIMIT: ground sampler selected a low shoreline surface below the promenade. Large blank retaining wall and square grass protrusions are visible, but the park-path closure is not. This is not a verified player-walkable camera. |
| [gate15](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/gate15-f944380251.png) / (-735.38, -132.27) | D03/D10/D11/D13: distant shore fence forms jagged leaning/overlapping sections; densely repeated trees and shrub pads. Near closure gate reads coherent. |
| [gate16](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/gate16-735585d517.png) / (-645.98, -133.81) | D09/D10/D11/D14: steep terrain rises into built surfaces; pitched tarp closure, crowded trees and detailed materials. |
| [park-east](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/park-east-30705376f1.png) / (-402, -392) | D10/D11: giant procedural trunk close to camera, mixed authored/procedural trees and drawn paving joints. Replaces an invalid interior-building shot; missing-wall claim withdrawn. |
| [park-west](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/park-west-951f95fadc.png) / (-460, -455) | D04/D10/D11/D13: patterned bridge tower, repeated mixed tree rows, dark overlapping bench/bin pads and tiny geometric shrubs; dark path has green seams. |
| [pier-path](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/pier-path-b253bb2a10.png) / (-790, -220) | D06/D10/D13/D16: light path slab terminates abruptly in grass, angular raised terrain, shrub triangles and hard gray horizon strip. |
| [underbridge](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-02/visual-audit-main-5ae4aac2/final/underbridge-d3baa044f5.png) / (-620, -330) | D04/D05/D10/D11/D13/D15: giant patterned bridge support/deck, sharply folded lawn beside retaining wall, mixed tree sizes, pyramid planting and noisy vehicle planes. |

## Camera and rendering evidence

Exact poses and source-ground triangles: `views.json`. Per-shot runtime inspection: `<id>-inspection.json`. Capture driver: `capture.mjs`. Captures loaded the full baked study lighting; log reported `static:2588;probeOnly:291;environmentOnly:585`. Approved concepts are authoritative for composition; ART_STYLE.md remains authoritative where painted concept texture conflicts with flat-colour material rules.
