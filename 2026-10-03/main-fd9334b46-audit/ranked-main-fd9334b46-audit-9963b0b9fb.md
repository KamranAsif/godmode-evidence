# Ranked visual backlog — main fd9334b46 (baked)

Fresh audit, 2026-10-03. These are **new ranks 1–25**, not the numbers from the ca646b09d backlog. Ranked by visible damage, then frequency and prominence. No game changes were made.

## Evidence and scope

Pinned checkout: `fd9334b46`. Exact fetched lightmap SHA-256: `298134ddfe00d01cf5fb7cb292bb3b4ceb7809c0cda5e602f8b84603b13b2847`. Captures used an owned rendered `godot-cli game run` instance, offscreen **1920×1080**, FOV 75, baked lighting, HUD hidden. The owned instance/session were stopped after capture.

Reviewed **51 fresh sweep images**: seven study cameras, five historical concept/context poses, and 39 eye-level views covering streets, parks, Pier 1, closures, under the bridge and nine additional shoreline positions. Also incorporated the five fresh baked car close-ups from the same commit (56 images total). Camera poses and a complete screenshot ledger follow the ranked list. Reproduce them with the [camera definitions](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/views-8b308170ee.json); the [ranked data](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/ranked-items-00a87acd50.json) is also available.

Approved references: `docs/art/environment-concepts/area-01..05-morning.png` and `waterfront/area-06/07-morning.png`. Only 06/07 are treated as exact current camera matches; inland comparisons concern visual quality/composition, not forced pixel alignment. The historical old02/03 poses include coarse surroundings beyond the playable area, which are not ranked as missing playable detail.

Flat per-facet tone variation, designed 1 m ground facets and whitecaps are approved. Textured concrete/grass exceptions are allowed. None is failed merely for being faceted or textured. Cause statements below are hypotheses unless explicitly supported by source inspection. Static captures do not establish temporal z-fighting; no such claim is made.

Previously reported facade overlap, the 07 grey shell, floating gate04 planter, raised grates, misplaced promenade and gate16 cliff are not carried forward as unfixed defects. This report does not substitute preview PR approval for inspecting this pinned baked main.

## Ranked defects

### 1. Parked cars have jagged panels and incorrect material islands — High

Sedan lamp borders and wheel spokes are ragged; the van has angular arch/sill damage and a blue sliding-door rail. Tail lamps lose their red regions, glass is opaque cobalt, and door features disappear. The five close-ups linked below isolate these defects. These are visible asset faults, beyond the intended flat-colour treatment.

- **Location:** e04-front: XZ (-566.00, -254.00); e04-street: XZ (-566.00, -254.00)
- **Screenshots:** [e04-front](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e04-front-7fbc50922e.png) · [e04-street](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e04-street-510f3f4b2f.png)
- **Likely owner:** Vehicle asset lane (%65): tools/assets/build-vehicle-models.py; tools/assets/reduce-vehicle-surfaces.mjs; scripts/environment_modules/module_meshes.ts.
- **Cause guess:** Texture-colour classification and label smoothing split painted/reflective pixels into incorrect physical materials; seam reduction and per-triangle normals exaggerate panel damage. Shared glass shading contributes the cobalt fill.
- **Map-wide acceptance:** Recheck both models from front, rear and side at 3–6 m, in sun and shade; preserve panel silhouettes, lamp regions and wheel circles.

- [sedan-front](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/cars-main-fd9334b46/sedan-front-4e76d2fe23.png): Dented triangular fender, ragged lamps/grille, irregular spokes and cobalt glass.
- [sedan-side](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/cars-main-fd9334b46/sedan-side-95e5db615c.png): Blue pillar/material islands, scalloped window/sill and flattened door features.
- [sedan-rear](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/cars-main-fd9334b46/sedan-rear-2ce11b57b3.png): White tail-lamp regions with tiny red remnants and jagged lower trim.
- [van-front](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/cars-main-fd9334b46/van-front-c28f725d24.png): Red island in the front lamp, crumpled panel transitions and angular wheel arches.
- [van-rear](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/cars-main-fd9334b46/van-rear-b6031227e0.png): Blue sliding rail/brake-light island, pointed black intrusion above wheel and ragged sill.

### 2. Furman closure barriers float above the paving — High

The long concrete/chain-link closure crosses above the lower pavement with daylight underneath and isolated dark triangular supports. At gate15 it also cuts through the existing park fence. The stepped grade is not resolved as a believable grounded closure.

- **Location:** gate15: XZ (-735.38, -132.27); gate16: XZ (-645.98, -133.81)
- **Screenshots:** [gate15](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/gate15-b822bb5351.png) · [gate16](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/gate16-e40206d2db.png)
- **Likely owner:** Closure placement lane: tools/maps/dumbo/fit-cordon-props.mjs; scripts/dumbo_cordon_visuals.ts; scripts/dumbo_cordon_prop_ground.generated.ts.
- **Cause guess:** A long rigid barrier span uses fitted floor/pitch/roll and local aprons without resolving the full stepped ground footprint or pre-existing fence.
- **Map-wide acceptance:** Fit every closure segment to actual ground and remove intersecting street furniture/fences along the entire closure, rather than hiding one camera gap.

### 3. Empire park paths break into disconnected white islands — High

The park path consists of separate white slabs interrupted by lawn; the foreground slab ends, a narrow green stripe separates the next piece, and the continuation disappears across the lawn. It reads as a missing or buried path, not a designed junction. This is separate from the previously repaired gate02 path.

- **Location:** e02-street: XZ (-460.00, -455.00); e02-front: XZ (-460.00, -455.00); park-west: XZ (-460.00, -455.00); c02: XZ (-485.00, -405.00)
- **Screenshots:** [e02-street](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e02-street-fa66a03624.png) · [e02-front](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e02-front-329c2ea7b1.png) · [park-west](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/park-west-48d4347872.png) · [c02](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c02-4acdc21e14.png)
- **Likely owner:** Ground/park geometry lane: tools/maps/sands-pearl/build.mjs; scripts/client/ground_facets.ts; surveyed path/grass surface outlines.
- **Cause guess:** Path and lawn planes or clipping ownership disagree, allowing grass to cover sections or leaving incomplete joins.
- **Map-wide acceptance:** Walk the full path from both ends and across every junction; retain continuous paving through the surveyed park route.

### 4. Tree branches have open-looking cuts at their joints — High

Several forks show bright wedges of sky between successive brown branch segments. The nearest gate15 right-hand tree and both foreground trees at e01-street show abrupt broken-looking joints and exposed cut ends.

- **Location:** e01-street: XZ (-402.00, -392.00); gate15: XZ (-735.38, -132.27)
- **Screenshots:** [e01-street](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e01-street-304f3676e8.png) · [gate15](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/gate15-b822bb5351.png)
- **Likely owner:** Vegetation geometry lane (%65): scripts/environment_modules/vegetation_family.ts, branch() and familyTree().
- **Cause guess:** Independent tapered seven-sided tubes meet with different ring orientations/radii without a continuous joint; the visible gaps are consistent with insufficient overlap.
- **Map-wide acceptance:** Inspect every branch silhouette at eye level against bright sky; joints must remain connected for all generated sizes and leans.

### 5. Bridge towers and underside still read as coarse scaffolding — High

The near bridge support is an enormous blank faceted prism with little masonry articulation; deck and cable structure read as thin lines and sparse horizontal beams. The dominant waterfront landmark has a much lower level of structural detail than nearby buildings.

- **Location:** underbridge: XZ (-614.00, -330.00); e02-front: XZ (-460.00, -455.00); c03: XZ (-611.00, -294.00); shore-06: XZ (-640.11, -334.70)
- **Screenshots:** [underbridge](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/underbridge-465f33cef9.png) · [e02-front](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e02-front-329c2ea7b1.png) · [c03](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c03-c1d83ff10f.png) · [shore-06](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/shore-06-2f2cea370c.png)
- **Likely owner:** Bridge/horizon geometry lane: tools/maps/modules/build-horizon.mjs; scripts/client/horizon_transport.generated.ts and horizon_view_geometry.generated.ts.
- **Cause guess:** Simplified surveyed tower extrusion and lightweight transport line geometry provide the outline but omit substantial tower openings, base structure and deck/underside members.
- **Map-wide acceptance:** Review the near support from both sides and directly underneath; improve structure without introducing giant blocking slabs.

### 6. Shaded streets lose cars, wheels and road readability — High

In the deeply shaded street, asphalt is nearly black navy and dark sedans merge into it; lower panels, tyres and inset details become hard to separate. The pale pavement remains legible, making the loss of road detail especially conspicuous.

- **Location:** e04-front: XZ (-566.00, -254.00); gate12: XZ (-553.85, -215.30); e04-street: XZ (-566.00, -254.00)
- **Screenshots:** [e04-front](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e04-front-7fbc50922e.png) · [gate12](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/gate12-ac7fc5e2fa.png) · [e04-street](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e04-street-510f3f4b2f.png)
- **Likely owner:** Lighting/surface lane (%64 and bake lane C): scripts/client/daylight.ts, scripts/presentation.ts, asphalt palette, ambient/SSAO and baked indirect light.
- **Cause guess:** Dark asphalt and dark vehicle materials combine with cool weak indirect illumination/contact darkening. The image alone cannot assign the loss exclusively to the bake or shader.
- **Map-wide acceptance:** Maintain shade direction and contrast while recovering visible separation of tyres, bodies and asphalt across all shaded streets.

### 7. Tree crowns repeat the same lime-green pompon silhouette — High

Repeated overlapping round lobes, thick similar forks and light yellow-green foliage dominate streets and parks. They read as a repeated toy-tree family rather than the concepts' varied, more designed angular crowns and deeper olive foliage.

- **Location:** e01-street: XZ (-402.00, -392.00); e02-street: XZ (-460.00, -455.00); pier-path: XZ (-790.00, -220.00); shore-07: XZ (-734.86, -184.99)
- **Screenshots:** [e01-street](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e01-street-304f3676e8.png) · [e02-street](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e02-street-fa66a03624.png) · [pier-path](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/pier-path-c2a077ddb5.png) · [shore-07](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/shore-07-04c192918f.png)
- **Likely owner:** Vegetation family/placement lane (%65): scripts/environment_modules/vegetation_family.ts and vegetation_instances.ts.
- **Cause guess:** The same lobe arrangement and bark proportions recur with limited silhouette and colour variation. The later tree-variety preview is not evidence that this pinned main already contains it.
- **Map-wide acceptance:** Check mixed species, silhouette, size and lean along entire streets and park edges, with enough coherent planting structure to avoid random clutter.

### 8. River waves are too shallow and foam reads as surface marks — High

The approved 06/07 have strong angular crests, dark troughs and layered cyan/navy planes. Main is a comparatively level teal surface with small cream streaks; overhead, long aligned bands remain apparent. At rocks, thin closed foam outlines read as drawn loops instead of broken turbulent patches. Whitecaps themselves are approved.

- **Location:** c06: XZ (-794.47, -266.55); c07: XZ (-579.45, -463.59); shore-03: XZ (-406.34, -510.24); c03: XZ (-611.00, -294.00)
- **Screenshots:** [c06](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c06-cb2d6444b1.png) · [c07](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c07-b230af7c15.png) · [shore-03](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/shore-03-f1f610bec7.png) · [c03](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c03-c1d83ff10f.png)
- **Likely owner:** Water lane (#887 owner): scripts/client/waterfront.ts and the water material/mesh generation in tools/maps/modules/build-waterfront.mjs.
- **Cause guess:** Low visible wave relief and a directionally coherent wave field flatten the river; crest/shore foam masks produce streaks and closed contours.
- **Map-wide acceptance:** Check 06/07, both bridge directions, shoreline corners and overhead distance views; preserve readable relief without regular ribbons or excessive white foreground.

### 9. Ferry piers remain giant unfinished concrete slabs — High

The large projecting platform and T-shaped pier are blank pale extrusions with abrupt notch corners and almost no visible edge fascia, supporting structure, guard treatment or landing details. From eye level their thick white walls dominate the waterfront.

- **Location:** c03: XZ (-611.00, -294.00); shore-06: XZ (-640.11, -334.70)
- **Screenshots:** [c03](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c03-c1d83ff10f.png) · [shore-06](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/shore-06-2f2cea370c.png)
- **Likely owner:** Waterfront/pier geometry lane: tools/maps/modules/build-waterfront.mjs and build-waterfront-props.mjs; scripts/client/waterfront.ts.
- **Cause guess:** Survey footprints are extruded into coarse slabs without a completed pier construction/dressing layer.
- **Map-wide acceptance:** Review every projecting platform at eye height, including its underside and shore connection; use a coherent support, edge and access treatment.

### 10. A long dark strip protrudes through the river — High

Left of the skyline, a long dark brown-purple flat strip runs across the water toward the middle distance. It has a hard land-like silhouette and no surrounding wave relief. This is visibly distinct from the small low horizon sliver and from approved whitecaps.

- **Location:** shore-09: XZ (-847.05, -198.30)
- **Screenshots:** [shore-09](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/shore-09-9cbfa20de8.png)
- **Likely owner:** Ground/water boundary lane: tools/maps/modules/build-waterfront.mjs and build-horizon.mjs; surveyed terrain/shore clipping and water height.
- **Cause guess:** Likely a terrain/shore surface above the river or an uncovered boundary strip. Source attribution needs an inspector hide-group check; it is not proven from the screenshot.
- **Map-wide acceptance:** Inspect and remove the unintended exposed strip, then sweep the river edge from both directions; do not replace it with a larger shelf or pale wall.

### 11. Ground-floor glazing reads as opaque blue wall panels — Medium

Large storefront-sized openings are filled with identical dark navy/cobalt rectangles and thick black mullions. They lack visible entrance/threshold differentiation and convincing glass depth; the street frontage reads as sealed blue panels.

- **Location:** e01-street: XZ (-402.00, -392.00); e02-street: XZ (-460.00, -455.00); underbridge: XZ (-614.00, -330.00)
- **Screenshots:** [e01-street](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e01-street-304f3676e8.png) · [e02-street](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e02-street-fa66a03624.png) · [underbridge](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/underbridge-465f33cef9.png)
- **Likely owner:** Facade/glass lane: tools/maps/modules/facade.mjs; scripts/client/dumbo_facades.ts; scripts/environment_modules/module_meshes.ts and shared morning glass material.
- **Cause guess:** One opaque sky-coloured glass treatment is reused across ground-floor and upper-window roles, with limited entry-specific geometry.
- **Map-wide acceptance:** Compare shaded and sunny frontages; distinguish doors, display windows and upper windows while keeping the approved material style.

### 12. Buildings repeat one window-frame grammar and lack distinct bases — Medium

Whole blocks repeat the same bright picture-frame windows, colour bands and fire-escape rhythm. Large blind walls and ground floors have little architectural purpose or service detail. Different footprints still read as variants of the same building kit.

- **Location:** c01: XZ (-427.00, -342.00); e01-front: XZ (-402.00, -392.00); e04-front: XZ (-566.00, -254.00); e05-front: XZ (-760.00, -250.00)
- **Screenshots:** [c01](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c01-3f035fb3e3.png) · [e01-front](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e01-front-6d5c05c9fd.png) · [e04-front](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e04-front-7fbc50922e.png) · [e05-front](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e05-front-67ca0898c7.png)
- **Likely owner:** Building architecture lane (#892 owner): tools/maps/modules/build-masonry.mjs, facade.mjs and facade style modules.
- **Cause guess:** Facade generation varies colour and dimensions more than building-specific bay rhythm, base, entrance, cornice and blind-wall treatment.
- **Map-wide acceptance:** Give coherent identities to representative buildings and carry each treatment around corners; avoid dressing only the concept-facing elevation.

### 13. Skyline facades form a uniform punched-window grid — Medium

Window detail is present again, so the old blank-box failure is not repeated. However, most skyline buildings share a cool blue-grey finish and evenly punched rectangular grid, with limited facade hierarchy and crown variation. The concepts have more varied warm/cool masses and irregular architectural detail.

- **Location:** c06: XZ (-794.47, -266.55); c07: XZ (-579.45, -463.59); shore-03: XZ (-406.34, -510.24); shore-09: XZ (-847.05, -198.30)
- **Screenshots:** [c06](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c06-cb2d6444b1.png) · [c07](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c07-b230af7c15.png) · [shore-03](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/shore-03-f1f610bec7.png) · [shore-09](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/shore-09-9cbfa20de8.png)
- **Likely owner:** Skyline lane (%64): tools/maps/modules/build-horizon.mjs; scripts/client/city_horizon.generated.ts and assets/shaders/city_building.gdshader.
- **Cause guess:** A small facade palette and repeated window rule dominate surveyed massing; fog further equalizes colour.
- **Map-wide acceptance:** Retain clean distant detail while varying building materials, bay/storey rhythm and silhouettes; do not reintroduce distant grain.

### 14. Timber pilings look like pale faceted obelisks — Medium

Pilings have large angled pale tops, uniform beige bodies and very little wet-line darkening, collar or end-cap definition. The 06 arrangement is also much sparser than the approved cluster of shorter and taller timber piles.

- **Location:** c06: XZ (-794.47, -266.55); c07: XZ (-579.45, -463.59); shore-03: XZ (-406.34, -510.24); shore-08: XZ (-810.89, -146.04)
- **Screenshots:** [c06](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c06-cb2d6444b1.png) · [c07](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c07-b230af7c15.png) · [shore-03](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/shore-03-f1f610bec7.png) · [shore-08](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/shore-08-972b637023.png)
- **Likely owner:** Waterfront prop lane (#887 owner): tools/maps/modules/build-waterfront-props.mjs; scripts/client/waterfront.ts.
- **Cause guess:** Coarse solid post geometry and a uniform material omit timber construction cues and submerged/wet zones; placement uses sparse isolated posts.
- **Map-wide acceptance:** Check individual piles and bundles along the entire edge, including height variation, caps, bindings and water contact.

### 15. 07 landing still lacks the concept gangway and dock hardware — Medium

The large retaining face and timber clusters are present, but the short cross-braced metal gangway, hanging fender and compact landing equipment shown in the concept are missing or not readable. The upper edge remains a long mostly blank railing run.

- **Location:** c07: XZ (-579.45, -463.59)
- **Screenshots:** [c07](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c07-b230af7c15.png)
- **Likely owner:** Landing/dock dressing lane: tools/maps/modules/build-waterfront-props.mjs; scripts/client/waterfront.ts.
- **Cause guess:** The platform/retaining wall was completed ahead of its access bridge and hardware kit.
- **Map-wide acceptance:** Compare the whole landing silhouette and access sequence, then inspect it from the adjacent shoreline rather than only 07.

### 16. Riprap has too little stone-size and material hierarchy — Medium

The shore is now covered, but much of it is a dense carpet of similarly blue-grey rounded faceted stones. Compared with the approved concepts it lacks a convincing mixture of large angular boulders, smaller infill, strong dark gaps and warm/cool stone faces.

- **Location:** c06: XZ (-794.47, -266.55); c07: XZ (-579.45, -463.59); shore-08: XZ (-810.89, -146.04); c03: XZ (-611.00, -294.00)
- **Screenshots:** [c06](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c06-cb2d6444b1.png) · [c07](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c07-b230af7c15.png) · [shore-08](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/shore-08-972b637023.png) · [c03](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c03-c1d83ff10f.png)
- **Likely owner:** Shore rock lane (#887 owner): tools/maps/modules/build-waterfront-props.mjs and rock instances/materials in scripts/client/waterfront.ts.
- **Cause guess:** Repeated rock families, narrow size distribution and a uniform cool material flatten the stone belt.
- **Map-wide acceptance:** Review long stretches and inner corners; introduce controlled size/shape hierarchy without recreating a rock wall or covering walkable paving.

### 17. Waterfront railing is too dark and visually heavy — Medium

Posts, rails and footplates are almost black navy, with thick closely repeated vertical masses and large dark bases. The concepts show a lighter grey metal edge that lets the stone and water remain dominant. Coverage is improved; this item is about proportions and finish.

- **Location:** c06: XZ (-794.47, -266.55); c07: XZ (-579.45, -463.59); shore-02: XZ (-325.37, -445.16); shore-04: XZ (-487.16, -507.24)
- **Screenshots:** [c06](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c06-cb2d6444b1.png) · [c07](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c07-b230af7c15.png) · [shore-02](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/shore-02-cd7402ee6c.png) · [shore-04](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/shore-04-8f89fc944f.png)
- **Likely owner:** Railing lane (%65): scripts/environment_modules/waterfront_railing.ts; scripts/client/waterfront_railing.ts.
- **Cause guess:** Dark shared metal palette and heavy post/rail profiles exaggerate the edge. Apparent off-axis leaning alone is not a confirmed geometry fault.
- **Map-wide acceptance:** Check long straights, corners and slope transitions at eye level; keep continuous coverage while matching the concept's visual weight.

### 18. Concrete has no convincing panel joints or construction edges — Medium

Promenade and footways are broad lavender-white faceted sheets. The concept 06 has clear large panel joints, bevelled edge/contact detail and restrained concrete character. Current random facet boundaries do not supply that construction layout.

- **Location:** c06: XZ (-794.47, -266.55); c07: XZ (-579.45, -463.59); e02-street: XZ (-460.00, -455.00); shore-01: XZ (-251.49, -470.79)
- **Screenshots:** [c06](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c06-cb2d6444b1.png) · [c07](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c07-b230af7c15.png) · [e02-street](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e02-street-fa66a03624.png) · [shore-01](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/shore-01-995b0c8f7d.png)
- **Likely owner:** Ground/concrete lane (%64): scripts/client/ground_facets.ts; ground surface generation in tools/maps/sands-pearl/build.mjs; shared environment material.
- **Cause guess:** The world facet lattice controls tone, but concrete slab segmentation and edge detail are absent. The approved textured-concrete exception may help finish, but does not alone author panel joints.
- **Map-wide acceptance:** Keep flat per-facet variation; add coherent panel/edge treatment that survives along all footways and promenade lengths without texture seams.

### 19. Lawns read as pale green sheets with hard geometric edges — Medium

Large lawns have almost no small-scale grass or soil cues; straight paving boundaries and uniformly light green fill dominate. Sparse trees cast isolated round shadows without a convincing planted ground layer. The approved 1 m facet tones themselves are not the defect.

- **Location:** e02-street: XZ (-460.00, -455.00); pier-path: XZ (-790.00, -220.00); underbridge: XZ (-614.00, -330.00); shore-07: XZ (-734.86, -184.99)
- **Screenshots:** [e02-street](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e02-street-fa66a03624.png) · [pier-path](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/pier-path-c2a077ddb5.png) · [underbridge](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/underbridge-465f33cef9.png) · [shore-07](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/shore-07-04c192918f.png)
- **Likely owner:** Lawn/ground lane (%64): grass material, scripts/client/ground_facets.ts and surveyed lawn outlines.
- **Cause guess:** Flat lawn fill and missing boundary/ground-cover detail provide little grass-specific visual information. The later grass previews need their own quality gate and should not be assumed merged.
- **Map-wide acceptance:** Check close lawn edges and wide Pier 1 views; retain readable grass without lime carpet, dominant bands or dark shard tufts.

### 20. Shrubs repeat bright green bead rows — Medium

Planters and fence strips use rows of similarly round yellow-green clumps with uniform height and weak branching/leaf silhouette. Long kerb-side runs resemble decorative beads rather than varied, coherent planting.

- **Location:** e01-street: XZ (-402.00, -392.00); e04-front: XZ (-566.00, -254.00); gate15: XZ (-735.38, -132.27); shore-07: XZ (-734.86, -184.99)
- **Screenshots:** [e01-street](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e01-street-304f3676e8.png) · [e04-front](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e04-front-7fbc50922e.png) · [gate15](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/gate15-b822bb5351.png) · [shore-07](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/shore-07-04c192918f.png)
- **Likely owner:** Shrub/planting lane (%65): scripts/environment_modules/vegetation_family.ts and vegetation_instances.ts; planting placement layout.
- **Cause guess:** The same leaf-lobe family and palette are scaled and repeated without enough hedge/clump structure or colour depth.
- **Map-wide acceptance:** Review entire planter and kerb runs; keep planting contained and grounded while varying coherent masses rather than scattering isolated blobs.

### 21. Roof hardware is sparse, repetitive and weakly connected — Medium

Large roofs have a few repeated white fan boxes, long straight segmented ducts and isolated vents over otherwise empty surfaces. Duct runs terminate without a clear installation story; access, service pads and varied equipment clusters are limited.

- **Location:** c01: XZ (-427.00, -342.00); c04: XZ (-591.00, -204.00); old04: XZ (-542.58, -107.53)
- **Screenshots:** [c01](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c01-3f035fb3e3.png) · [c04](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c04-f69bafd786.png) · [old04](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/old04-ab8f77ab16.png)
- **Likely owner:** Roof detail lane: tools/maps/modules/roof.mjs; generated roof/environment modules.
- **Cause guess:** A small repeated hardware kit and sparse placement rules leave oversized empty roofs and weak connections between equipment.
- **Map-wide acceptance:** Check several roofs from different directions; improve believable clusters and connections without random clutter or renewed busy facet noise.

### 22. Street furnishings feel scattered rather than integrated — Medium

Racks, bins, hydrants and small planters appear as isolated objects in broad paving, while seating/planting sequences are weak. In e01-street a rack sits prominently near the centre of the pedestrian corridor. The concepts arrange detail into coherent edge and seating zones.

- **Location:** e01-street: XZ (-402.00, -392.00); e02-street: XZ (-460.00, -455.00); shore-07: XZ (-734.86, -184.99)
- **Screenshots:** [e01-street](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e01-street-304f3676e8.png) · [e02-street](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e02-street-fa66a03624.png) · [shore-07](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/shore-07-04c192918f.png)
- **Likely owner:** Street dressing lane (%65, #896): tools/maps/modules/street.mjs; scripts/client/environment_detail_layout.ts and environment_detail.ts.
- **Cause guess:** Independent object placement rules do not consistently compose an unobstructed pedestrian route and a furnished edge.
- **Map-wide acceptance:** Walk each corridor both ways and verify clear routes plus coherent seating/service zones. Later #896 fixes must be checked on the baked integration, not presumed present here.

### 23. Small street props have crude silhouettes and material blocks — Medium

The foreground hydrant is a chunky dark plug with stark white bands; bike-rack bends are visibly segmented and utility objects have little rim, cap or fixture definition. These nearby props look much rougher than their surrounding facade trim.

- **Location:** e01-street: XZ (-402.00, -392.00); gate15: XZ (-735.38, -132.27)
- **Screenshots:** [e01-street](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e01-street-304f3676e8.png) · [gate15](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/gate15-b822bb5351.png)
- **Likely owner:** Street prop asset/module lane: tools/maps/modules/street.mjs; scripts/environment_modules/module_meshes.ts; source prop reduction/material palette.
- **Cause guess:** Low silhouette resolution and coarse material grouping remove recognisable small construction details. Exact asset ownership should be confirmed before changing shared materials.
- **Map-wide acceptance:** Review at ordinary 1–4 m eye-level distances; improve silhouette and fittings while keeping the approved simplified colour language.

### 24. Road surfaces and markings lack material and design hierarchy — Medium

Asphalt is a largely uniform dark sheet; fresh bright paint and repeated zebra crossings dominate it. The multi-arm waterfront intersection becomes a conspicuous field of stripes, while road repair, drain and edge transitions contribute little street character.

- **Location:** e04-street: XZ (-566.00, -254.00); e03-front: XZ (-586.00, -344.00); c03: XZ (-611.00, -294.00); e05-street: XZ (-760.00, -250.00)
- **Screenshots:** [e04-street](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e04-street-510f3f4b2f.png) · [e03-front](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e03-front-472d9313fd.png) · [c03](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c03-c1d83ff10f.png) · [e05-street](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e05-street-b1cb03d464.png)
- **Likely owner:** Street-fidelity lane (%69, #895): scripts/client/street_fidelity.ts, street_fidelity_layout.ts and street_kerb_layout.ts; asphalt surface palette.
- **Cause guess:** Uniform road material and globally consistent paint treatment give crossings similar emphasis regardless of context. This is a fidelity/composition issue, not a claim that every crossing is incorrectly surveyed.
- **Map-wide acceptance:** Check intersections and shaded/sunny straights map-wide; tune paint scale/brightness and surface/kerb transitions without obstructing vehicle or pedestrian routes.

### 25. Sky is a nearly featureless gradient — Low

The large sky area is a smooth pale blue gradient with very little atmospheric structure. The approved views have subtle cloud/haze variation and a more layered blue field, making the current sky feel like an unfinished backdrop.

- **Location:** c06: XZ (-794.47, -266.55); c07: XZ (-579.45, -463.59); e02-street: XZ (-460.00, -455.00)
- **Screenshots:** [c06](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c06-cb2d6444b1.png) · [c07](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c07-b230af7c15.png) · [e02-street](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e02-street-fa66a03624.png)
- **Likely owner:** Sky/environment lane (%64): scripts/client/daylight.ts, procedural sky material and environment lighting configuration.
- **Cause guess:** The current procedural gradient supplies colour but little cloud or atmospheric variation.
- **Map-wide acceptance:** Keep the approved morning light and horizon readability; add restrained structure without changing weather or hiding geometry in stronger fog.

## Complete capture ledger

XZ is the camera position, not a claimed exact defective vertex. Gate05/08/09 are obstructed by nearby geometry; gate13 intersects a vehicle and is not used to diagnose a vehicle hole. Additional shoreline/park/street views provide usable coverage. The ledger keeps those limitations explicit.

| Camera | XZ | Screenshot | Review note / related new ranks |
| --- | --- | --- | --- |
| c01 — Water / Washington waterfront blocks | -427.00, -342.00 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c01-3f035fb3e3.png) | Ranks 12, 21 |
| c02 — Empire Fulton Ferry park | -485.00, -405.00 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c02-4acdc21e14.png) | Ranks 3 |
| c03 — Dock / Old Fulton undercroft seam | -611.00, -294.00 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c03-c1d83ff10f.png) | Ranks 5, 8, 9, 16, 24 |
| c04 — Old Fulton inland spur | -591.00, -204.00 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c04-f69bafd786.png) | Ranks 21 |
| c05 — Pier 1 waterfront | -785.00, -200.00 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c05-a8e430c2a3.png) | Reviewed; no additional independently ranked defect. |
| c06 — Pier 1 edge toward Lower Manhattan | -794.47, -266.55 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c06-cb2d6444b1.png) | Ranks 8, 13, 14, 16, 17, 18, 25 |
| c07 — Empire Fulton Ferry along the bulkhead | -579.45, -463.59 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/c07-b230af7c15.png) | Ranks 8, 13, 14, 15, 16, 17, 18, 25 |
| old01 —  | -585.00, 5.86 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/old01-e79fcf5fba.png) | Reviewed; no additional independently ranked defect. |
| old02 —  | -426.93, 53.93 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/old02-77a7f799d1.png) | Outside-area context includes coarse surroundings; not ranked as missing playable geometry. |
| old03 —  | -526.55, 89.80 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/old03-203e007cee.png) | Outside-area context includes coarse surroundings; not ranked as missing playable geometry. |
| old04 —  | -542.58, -107.53 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/old04-ab8f77ab16.png) | Ranks 21 |
| old05 —  | -465.81, -44.29 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/old05-7c9993d562.png) | Reviewed; no additional independently ranked defect. |
| e01-street — Water / Washington waterfront blocks | -402.00, -392.00 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e01-street-304f3676e8.png) | Ranks 4, 7, 11, 20, 22, 23 |
| e01-front — Water / Washington waterfront blocks | -402.00, -392.00 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e01-front-6d5c05c9fd.png) | Ranks 12 |
| e02-street — Empire Fulton Ferry park | -460.00, -455.00 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e02-street-fa66a03624.png) | Ranks 3, 7, 11, 18, 19, 22, 25 |
| e02-front — Empire Fulton Ferry park | -460.00, -455.00 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e02-front-329c2ea7b1.png) | Ranks 3, 5 |
| e03-street — Dock / Old Fulton undercroft seam | -586.00, -344.00 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e03-street-681724066f.png) | Reviewed; no additional independently ranked defect. |
| e03-front — Dock / Old Fulton undercroft seam | -586.00, -344.00 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e03-front-472d9313fd.png) | Ranks 24 |
| e04-street — Old Fulton inland spur | -566.00, -254.00 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e04-street-510f3f4b2f.png) | Ranks 1, 6, 24 |
| e04-front — Old Fulton inland spur | -566.00, -254.00 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e04-front-7fbc50922e.png) | Ranks 1, 6, 12, 20 |
| e05-street — Pier 1 waterfront | -760.00, -250.00 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e05-street-b1cb03d464.png) | Ranks 24 |
| e05-front — Pier 1 waterfront | -760.00, -250.00 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/e05-front-67ca0898c7.png) | Ranks 12 |
| gate01 — Riverwalk east gate | -223.06, -484.26 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/gate01-d874b341d3.png) | Reviewed; no additional independently ranked defect. |
| gate02 — Park / Plymouth approach | -229.39, -460.58 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/gate02-1a887141e5.png) | Reviewed; no additional independently ranked defect. |
| gate03 — Water east mouth | -230.00, -358.49 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/gate03-f6409b2b07.png) | Reviewed; no additional independently ranked defect. |
| gate04 — Bridge plaza east remnant | -509.12, -318.35 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/gate04-4be9a2ee40.png) | Reviewed; no additional independently ranked defect. |
| gate05 — Main-side south exit | -411.67, -314.72 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/gate05-b426c27191.png) | Obstructed close camera; not used as defect evidence. |
| gate06 — Washington south exit | -411.95, -317.84 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/gate06-0857147ab6.png) | Reviewed; no additional independently ranked defect. |
| gate07 — Warehouse south exit | -327.49, -317.02 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/gate07-6d65d7ca57.png) | Reviewed; no additional independently ranked defect. |
| gate08 — Service south gap | -280.26, -316.77 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/gate08-9ca4e6cc87.png) | Obstructed close camera; not used as defect evidence. |
| gate09 — East inland exit | -254.70, -315.08 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/gate09-bcb7346f28.png) | Obstructed close camera; not used as defect evidence. |
| gate10 — Front-side east gate | -513.38, -303.65 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/gate10-528976bde0.png) | Reviewed; no additional independently ranked defect. |
| gate11 — East spur service gate | -520.00, -233.43 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/gate11-d18ef2f3a7.png) | Reviewed; no additional independently ranked defect. |
| gate12 — Old Fulton south gate | -553.85, -215.30 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/gate12-ac7fc5e2fa.png) | Ranks 6 |
| gate13 — South apron + service corner | -601.76, -135.01 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/gate13-7e37575478.png) | Camera intersects vehicle; not evidence of a mesh hole. |
| gate14 — Pier 1 park-path gate | -806.48, -151.13 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/gate14-1d107a324d.png) | Reviewed; no additional independently ranked defect. |
| gate15 — Furman approach | -735.38, -132.27 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/gate15-b822bb5351.png) | Ranks 2, 4, 20, 23 |
| gate16 — Elevated approach apron | -645.98, -133.81 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/gate16-e40206d2db.png) | Ranks 2 |
| park-east — East park / bridge foot | -402.00, -392.00 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/park-east-8441dd035a.png) | Reviewed; no additional independently ranked defect. |
| park-west — Empire park towards river | -460.00, -455.00 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/park-west-48d4347872.png) | Ranks 3 |
| pier-path — Pier 1 hill / path | -790.00, -220.00 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/pier-path-c2a077ddb5.png) | Ranks 7, 19 |
| underbridge — Brooklyn undercroft interior | -614.00, -330.00 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/underbridge-465f33cef9.png) | Ranks 5, 11, 19 |
| shore-01 — shoreline sweep near X -250 | -251.49, -470.79 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/shore-01-995b0c8f7d.png) | Ranks 18 |
| shore-02 — shoreline sweep near X -330 | -325.37, -445.16 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/shore-02-cd7402ee6c.png) | Ranks 17 |
| shore-03 — shoreline sweep near X -410 | -406.34, -510.24 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/shore-03-f1f610bec7.png) | Ranks 8, 13, 14 |
| shore-04 — shoreline sweep near X -490 | -487.16, -507.24 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/shore-04-8f89fc944f.png) | Ranks 17 |
| shore-05 — shoreline sweep near X -570 | -566.89, -474.22 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/shore-05-3d42a569a3.png) | Reviewed; no additional independently ranked defect. |
| shore-06 — shoreline sweep near X -650 | -640.11, -334.70 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/shore-06-2f2cea370c.png) | Ranks 5, 9 |
| shore-07 — shoreline sweep near X -730 | -734.86, -184.99 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/shore-07-04c192918f.png) | Ranks 7, 19, 20, 22 |
| shore-08 — shoreline sweep near X -810 | -810.89, -146.04 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/shore-08-972b637023.png) | Ranks 14, 16 |
| shore-09 — shoreline sweep near X -850 | -847.05, -198.30 | [Full resolution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-fd9334b46-audit/shore-09-9cbfa20de8.png) | Ranks 10, 13 |

## Routing notes

Items 1–4 and 10 are concrete broken-looking geometry/material boundaries. Items 5–9 are dominant scene-quality gaps. The remaining items cover facade, skyline, shoreline, ground, planting, roof, street and sky fidelity. Owners are file/system suggestions for routing, not permission to edit generated outputs directly. Rebuild from the owning generator and rebake geometry changes. Validate beyond 06/07 and compare neighbouring surfaces after integration.
