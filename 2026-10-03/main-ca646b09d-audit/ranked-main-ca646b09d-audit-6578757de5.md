# Baked main visual audit ? ca646b09d

**Verdict: FAIL the high-fidelity concept target.**

32 fresh, distinct captures: seven configured cameras, five original inland concept poses, and 20 eye-level views across streets, parks, Pier 1, closures and the bridge undercroft. Expected baked lighting bound: 1,647 static meshes, 290 probe-only meshes and 541 environment-only meshes. No game or art fixes made; owned engines stopped.

Only 06/07 are direct concept matches. The original inland poses are outside arena C and are contextual evidence. Flat per-facet tones and water whitecaps are approved. Causes below are hypotheses unless explicitly marked source-confirmed.

## Ranked overnight backlog

### 1. Facade layers collide ? High

Large black facade sheets and projecting white window/frame families overlap smaller blue windows. The exterior reads as detached layers, not a solid building.

**Location:** camera `gate10`, XZ `[-513.3761934378774, -303.6528273048024]`.

**Likely cause:** Conflicting source/module facade layers, or wrong wall basis/depth offsets.

**Likely owner:** Facade pipeline: scripts/environment_modules/placement_rules.ts; facade_modules.generated.ts; tools/maps/sands-pearl/rich-buildings.mjs

**Screenshot URL:** [gate10](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-ca646b09d-audit/gate10-15a9442fef.png)

### 2. Planters float above the slope ? High

The near garden exposes its flat underside and hangs above sloping grass; planted bases are not seated in the terrain.

**Location:** camera `gate04`, XZ `[-509.11696841706316, -318.34705330361976]`.

**Likely cause:** A rigid garden footprint is positioned from one ground sample without fitting its base to the full slope.

**Likely owner:** Landscaping fit: scripts/environment_modules/placement_rules.ts; garden_yard_modules.generated.ts

**Screenshot URL:** [gate04](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-ca646b09d-audit/gate04-9868fa532a.png)

### 3. Duplicate white bridge deck ? High

A broad white slab cuts across the detailed steel bridge and looks unsupported by that structure.

**Location:** camera `gate02`, XZ `[-229.38520285884542, -460.57775909034143]`.

**Likely cause:** Retained geographic transport top faces coexist with the horizon bridge.

**Likely owner:** Bridge presentation: scripts/client/horizon_transport.generated.ts; horizon_view_geometry.generated.ts; tools/maps/modules/build-horizon.mjs

**Screenshot URL:** [gate02](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-ca646b09d-audit/gate02-6aabfb8d66.png)

### 4. Car glass and body geometry look broken ? High

The sedan has a large black triangular wedge inside its blue side window, splintered glazing, jagged wheels and fragmented body/taillight planes. Also visible in area04.

**Location:** camera `gate12`, XZ `[-553.8492152808083, -215.298706497507]`.

**Likely cause:** Generated asset geometry/material segmentation fails to preserve clean pane and body shapes.

**Likely owner:** Vehicle assets: tools/assets/build-vehicle-models.py; scripts/environment_modules/vehicle_models.generated.ts; vehicle_models.ts

**Screenshot URL:** [gate12](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-ca646b09d-audit/gate12-722f024142.png)

### 5. Drain grates protrude and tilt ? High

The near sidewalk grate sits above the footway at an incompatible angle; gate10 shows another raised road plate.

**Location:** camera `gate12`, XZ `[-553.8492152808083, -215.298706497507]`.

**Likely cause:** Support fitting or lift disagrees with the final visible footway/road surface.

**Likely owner:** Ground detail: scripts/client/environment_ground_details.ts; environment_ground_layout.ts; pavement_layout.ts

**Screenshot URL:** [gate12](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-ca646b09d-audit/gate12-722f024142.png)

### 6. Tree intersects closure barrier ? High

A brown tree trunk passes through the Jersey barrier instead of occupying a clear planting footprint.

**Location:** camera `gate04`, XZ `[-509.11696841706316, -318.34705330361976]`.

**Likely cause:** Landscaping and cordon generators do not exclude each other.

**Likely owner:** Placement coordination: scripts/environment_modules/placement_rules.ts; scripts/dumbo_cordon_visuals.ts; dumbo_cordon_prop_ground.generated.ts

**Screenshot URL:** [gate04](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-ca646b09d-audit/gate04-9868fa532a.png)

### 7. Closure pieces tip and fail to form a coherent line ? High

An isolated tarp section is strongly tilted at the hill crest; adjacent booth/fence/barrier pieces do not share a convincing apron or continuous assembly.

**Location:** camera `gate16`, XZ `[-645.9824830591533, -133.8119568527091]`.

**Likely cause:** Whole modules inherit incompatible local terrain fits.

**Likely owner:** Cordon ground fit: scripts/dumbo_cordon_visuals.ts; dumbo_cordon_prop_ground.generated.ts

**Screenshot URL:** [gate16](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-ca646b09d-audit/gate16-2b4a016204.png)

### 8. Terrain forms an abrupt wedge beside streets ? High

The lawn ends in a steep geometric face above the road and runs into built surfaces; it reads as an unjoined terrain export.

**Location:** camera `gate16`, XZ `[-645.9824830591533, -133.8119568527091]`.

**Likely cause:** Coarse terrain and independent street/building grades are not reconciled at their shared boundaries.

**Likely owner:** Surveyed surface joins: tools/maps/sands-pearl/terrain.mjs; build.mjs; scripts/client/pavement_layout.ts

**Screenshot URL:** [gate16](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-ca646b09d-audit/gate16-2b4a016204.png)

### 9. Mixed tree families and excessive crowding ? High

Huge simple brown-trunk crowns alternate with dark branching trees; rows crowd the pedestrian route, windows and fire escapes. The same mismatch recurs in both parks and Pier1.

**Location:** camera `e01-street`, XZ `[-402, -392]`.

**Likely cause:** Authored detail trees and module trees both populate the same streets with inconsistent silhouette, crown width and spacing.

**Likely owner:** Foliage placement/style: scripts/environment_detail.ts; scripts/environment_modules/placement_rules.ts; concept_variants_modules.generated.ts; foliage_shades.generated.ts

**Screenshot URL:** [e01-street](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-ca646b09d-audit/e01-street-eb8ded65dd.png)

### 10. Street shade loses material and contact readability ? High

Road, parked cars and closure silhouettes merge into near-black/navy areas. The concepts retain grey asphalt and readable shadowed objects.

**Location:** camera `e04-front`, XZ `[-566, -254]`.

**Likely cause:** Asphalt palette, exposure and shade/bounce balance combine to crush shadow detail; exact contribution needs a controlled lighting comparison.

**Likely owner:** Lighting/materials: scripts/client/western_block_lighting.ts; western_block_materials.ts; scripts/study_lightmaps.ts

**Screenshot URL:** [e04-front](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-ca646b09d-audit/e04-front-27c0498b75.png)

### 11. Water forms regular corrugated rows ? Medium-high

Parallel ridges repeat across nearly the entire river at overview distance; eye-level white highlights also collect into repeated bands. Whitecaps themselves are approved.

**Location:** camera `c02`, XZ `[-485, -405]`.

**Likely cause:** Directional wave terms over a regular faceted mesh create a conspicuous repeating pattern.

**Likely owner:** Water: assets/maps/waterfront/faceted-river.gdshader; scripts/client/waterfront.ts

**Screenshot URL:** [c02](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-ca646b09d-audit/c02-a2eb10d2fa.png)

### 12. Facet scale and contrast overpower architecture ? Medium-high

Large high-contrast triangles dominate roofs and wall planes; the bridge tower has the same camouflage-like finish. Architectural shapes become secondary. Flat per-facet tone is allowed; this is scale/contrast.

**Location:** camera `c01`, XZ `[-427, -342]`.

**Likely cause:** The shared 7m wall lattice and strong wall tone/normal tilt do not reflect each surface hierarchy.

**Likely owner:** Surface finish: assets/maps/western_block/faceted-surface.gdshaderinc; scripts/client/faceted_surface.ts

**Screenshot URL:** [c01](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-ca646b09d-audit/c01-7600237128.png)

### 13. Shrubs read as pyramids and miniature trees ? Medium

Park edging consists of isolated pointed green solids; front gardens use tiny tree trunks under broad simple crowns. They read as placeholder shapes rather than designed shrubs.

**Location:** camera `e05-front`, XZ `[-760, -250]`.

**Likely cause:** Over-simple low-poly shrub silhouettes and repeated garden variants.

**Likely owner:** Planting kit: scripts/environment_modules/garden_yard_modules.generated.ts; concept_variants_modules.generated.ts; scripts/client/western_block_dressing.ts

**Screenshot URL:** [e05-front](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-ca646b09d-audit/e05-front-e18b639739.png)

### 14. Paths terminate as raised slabs and have poor joins ? Medium

The white path stops as a blunt rectangular end in grass. Narrow dark gaps/edges and incompatible path grades remain visible at Pier1.

**Location:** camera `pier-path`, XZ `[-790, -220]`.

**Likely cause:** Independent path/terrain outlines and surface lifts leave exposed edges instead of joined endpoints.

**Likely owner:** Paths/footways: tools/maps/sands-pearl/build.mjs; scripts/client/western_block_pavement.ts; pavement_layout.ts

**Screenshot URL:** [pier-path](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-ca646b09d-audit/pier-path-d59ce8c22e.png)

### 15. Windows look like blue painted panels ? Medium

Large uniform bright-blue rectangles dominate nearby buildings, with little recess/depth or pane hierarchy compared with the dark glazing in the concepts.

**Location:** camera `e01-street`, XZ `[-402, -392]`.

**Likely cause:** Glass palette/sky tint and shallow window geometry combine to flatten the openings.

**Likely owner:** Glazing/facades: assets/maps/western_block/morning-glass.gdshader; scripts/client/faceted_surface.ts; scripts/environment_modules/facade_modules.generated.ts

**Screenshot URL:** [e01-street](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-ca646b09d-audit/e01-street-eb8ded65dd.png)

### 16. Facades lack architectural hierarchy ? Medium

Even intact facades repeat the same framed rectangles and fire-escape stacks across broad slabs; base, middle and roofline lack the coherent hierarchy of the concepts.

**Location:** camera `c01`, XZ `[-427, -342]`.

**Likely cause:** Generic facade variants are tiled across surveyed shells without enough frontage/storey/cornice differentiation.

**Likely owner:** Architecture kit: tools/maps/modules/facade.mjs; scripts/environment_modules/facade_styles_modules.generated.ts; window_dressings.generated.ts; trim_tones.generated.ts

**Screenshot URL:** [c01](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-ca646b09d-audit/c01-7600237128.png)

### 17. Large roofs are empty or carry awkward placeholder hardware ? Medium

Several enormous roof planes have only a few small fittings or long thin white pipe/stilt assemblies, unlike the concepts coherent HVAC boxes, vents and connected rooftop infrastructure.

**Location:** camera `c01`, XZ `[-427, -342]`.

**Likely cause:** Roof-pattern coverage or kit retirement leaves sparse equipment; some retained source fittings remain crude.

**Likely owner:** Roof dressing: scripts/client/reference_block_patterns.ts; western_block_dressing.ts; tools/maps/modules/roof.mjs; tools/maps/sands-pearl/building-detail.mjs

**Screenshot URL:** [c01](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-ca646b09d-audit/c01-7600237128.png)

### 18. Rock apron is too sparse at the visible shore ? Medium

Only scattered small exposed rock crowns appear behind the rail; the concept has a broad interlocking belt with varied rock sizes.

**Location:** camera `c06`, XZ `[-794.4651340080532, -266.5485437797311]`.

**Likely cause:** Rock placement/submergence and clearance rules expose too little of the intended apron.

**Likely owner:** Shore props: tools/maps/modules/build-waterfront-props.mjs; assets/maps/waterfront/props.json

**Screenshot URL:** [c06](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-ca646b09d-audit/c06-9d8304ec40.png)

### 19. Timber pilings are coarse rectangular blocks ? Medium

Pilings have long nearly planar rectangular sides and simple caps, missing the designed taper, shoulder and irregular silhouette of the concept.

**Location:** camera `c06`, XZ `[-794.4651340080532, -266.5485437797311]`.

**Likely cause:** Low-detail piling geometry/finish.

**Likely owner:** Timber props: assets/props/waterfront; tools/maps/modules/build-waterfront-props.mjs; waterfront shaders

**Screenshot URL:** [c06](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-ca646b09d-audit/c06-9d8304ec40.png)

### 20. Area07 pier-side composition remains incomplete ? Medium

The concept articulated left pier/bulkhead face, upper platform/rail and grouped timber supports are visually replaced by two ordinary low-rise facade boxes.

**Location:** camera `c07`, XZ `[-579.4482268862174, -463.590037959206]`.

**Likely cause:** The surveyed scene and dressing do not yet reproduce the approved pier-side architectural composition.

**Likely owner:** Waterfront architecture: scripts/client/waterfront.ts; tools/maps/modules/build-waterfront.mjs; tools/maps/sands-pearl/build.mjs

**Screenshot URL:** [c07](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-ca646b09d-audit/c07-a57f913a66.png)

### 21. Skyline uses facet noise in place of facade structure ? Medium

Towers have dense triangular speckle but very sparse window rows; their silhouettes are recognizable boxes rather than finished buildings. Chain25 flattening is not present in this main.

**Location:** camera `c06`, XZ `[-794.4651340080532, -266.5485437797311]`.

**Likely cause:** Source-confirmed: horizon windows are capped at five rows/columns per face; shared facet retention keeps projected triangles strong at river distance.

**Likely owner:** Skyline: scripts/environment_modules/city_horizon_modules.generated.ts; scripts/client/city_horizon.generated.ts; assets/maps/western_block/faceted-surface.gdshaderinc

**Screenshot URL:** [c06](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-ca646b09d-audit/c06-9d8304ec40.png)

### 22. Far land is a hard pale horizontal wall ? Medium

The left river horizon ends in a long pale strip with abrupt vertical/block faces rather than a convincing receding shoreline.

**Location:** camera `c06`, XZ `[-794.4651340080532, -266.5485437797311]`.

**Likely cause:** Low-detail horizon land geometry and haze flatten its edge into a hard band.

**Likely owner:** Horizon land: scripts/environment_modules/horizon_survey.generated.ts; city_horizon_modules.generated.ts; tools/maps/modules/build-horizon.mjs

**Screenshot URL:** [c06](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-ca646b09d-audit/c06-9d8304ec40.png)

### 23. Furniture islands look like prefabs pasted onto grass ? Medium

Benches, bins, trees and pointed shrubs sit on conspicuous dark rectangular/polygon pads with repeated arrangements. Some pads expose edges on the grade.

**Location:** camera `park-west`, XZ `[-460, -455]`.

**Likely cause:** Individual prop bases/planting slabs are placed without a coherent landscape paving and planting design.

**Likely owner:** Park dressing: scripts/environment_detail.ts; environment_detail_layout.ts; scripts/environment_modules/placement_rules.ts

**Screenshot URL:** [park-west](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-ca646b09d-audit/park-west-ad58a56168.png)

### 24. Parked vehicles conflict with crosswalks ? Medium

The white sedan occupies the zebra crossing; parked vehicles crowd crossing approaches elsewhere in the overview.

**Location:** camera `gate10`, XZ `[-513.3761934378774, -303.6528273048024]`.

**Likely cause:** Vehicle placement and road-paint generation lack shared crossing clearance.

**Likely owner:** Street coordination: tools/maps/sands-pearl/vehicles.mjs; scripts/client/street_vehicle_ground.ts; western_block_road_layout.ts

**Screenshot URL:** [gate10](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-ca646b09d-audit/gate10-15a9442fef.png)

### 25. Ground finish alternates huge grass polygons and blank paving ? Medium

At eye height grass is divided into very large flat tonal regions while promenade/path concrete is largely featureless. The concept ground has smaller designed facets.

**Location:** camera `e05-front`, XZ `[-760, -250]`.

**Likely cause:** Surface scale is inherited from coarse source triangulation/shared large lattice; pavement has no equivalent designed near-field finish.

**Likely owner:** Ground finish: scripts/client/western_block_pavement.ts; western_block_architecture.ts; assets/maps/western_block/faceted-surface.gdshaderinc

**Screenshot URL:** [e05-front](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-03/main-ca646b09d-audit/e05-front-e18b639739.png)

## Accepted repairs and limits

Promenade orientation/breadth, checked eastern shoreline rail continuity, filled inland-channel cleanup and removal of the white foreground blowout hold.

The sky gradient has no concrete defect identified. No definite ground holes or in-facet texture-grain/drawn-joint violations were confirmed. Static images cannot establish temporal z-fighting or certify watertight geometry. This was a free-fly eye-height visual sweep, not a collision/navigation certification.

Chain 25/#886 and PR #887 are not part of this main snapshot. Initial failed/stale launches and duplicate paused frames were excluded; all retained images have distinct SHA-256 hashes.

Every correction must generalize across the map and be verified beyond cameras 06/07. Preserve readable distant architecture without restoring skyline grain.
