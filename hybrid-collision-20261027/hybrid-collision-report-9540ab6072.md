# Hybrid offline collision candidate - CPU report

Status: candidate code prepared; no Godot, export, capture, native proof, or load measurement run in this GPU hold. All after counts below are CPU projections, not packed-scene measurements.

## Collision source breakdown (before)

| Builder/source | StaticBody3D | CollisionShape3D | Box | Concave | Convex | Cylinder |
|---|---:|---:|---:|---:|---:|---:|
| prop_collision.ts / placed props | 85 | 351,866 | 351,866 | 0 | 0 | 0 |
| module_collision.ts / retained module envelopes | 3,188 | 3,328 | 1,306 | 2,022 | 0 | 0 |
| module_collision.ts + vehicle_collision.ts | 299 | 1,495 | 0 | 0 | 1,495 | 0 |
| dumbo_survival_arena.ts / containment boxes | 554 | 554 | 554 | 0 | 0 | 0 |
| environment_detail.ts / model hulls | 432 | 432 | 18 | 9 | 0 | 405 |
| dumbo_survival_arena.ts / survey terrain | 398 | 398 | 0 | 398 | 0 | 0 |
| barrier_prop.ts / waterfront barrier props | 381 | 381 | 381 | 0 | 0 | 0 |
| environment_detail.ts / planting bases | 17 | 17 | 0 | 17 | 0 | 0 |
| native_glass_collision.ts | 1 | 2 | 0 | 2 | 0 | 0 |
| surface_intersections.ts + waterfront ledges | 1 | 1 | 0 | 1 | 0 | 0 |
| natural_impact_surfaces.ts / water | 0 | 1 | 0 | 1 | 0 | 0 |

Counts include the two Area3D impact shapes in the native-glass/natural-impact rows. The client has 5,356 StaticBody3D and two Area3D nodes. Server: 5,359 bodies, 358,478 shape nodes. All 351,866 placed-prop boxes match exactly between client and authority by shape, transform, surface, layer and mask. The baseline server additionally has two pier guards and one anonymous concrete concave; its native glazing also differs. Each variant must be compared to itself.

## Prop boxes by policy.asset (before)

Instances are distinct propCollisionKey values, not geometry nodes or box resources. The 351,866 boxes represent 13,062 placed prop instances across 95 asset policies. Facade attachments account for 270,542 boxes (76.9%) and 10,553 instances. Native glazing is separately packed and has no entry among these boxes. Sills, frames and attached trim are combined in the window/shopfront policies; they cannot honestly be assigned separate asset counts.

| policy.asset | Box nodes | Prop instances | Candidate representation |
|---|---:|---:|---|
| window-frames-and-juliet-rails | 146,611 | 2,456 | facade surface |
| shopfront-family | 28,830 | 908 | facade surface |
| parapet-rail-open | 20,032 | 1,252 | facade surface |
| parapet-railed | 15,296 | 956 | facade surface |
| parapet-rail-coping | 12,988 | 764 | facade surface |
| florist-display | 9,798 | 45 | compound solids |
| door-surround-style-family | 9,137 | 140 | facade surface |
| frontage-services | 8,410 | 979 | facade surface |
| blade-sign | 7,310 | 731 | facade surface |
| areaway-iron-collar | 6,630 | 170 | compound solids |
| shop-frontage-a-frame-chalkboard | 6,077 | 59 | compound solids |
| frontage-use | 6,074 | 908 | facade surface |
| half-open-shutter | 5,550 | 222 | facade surface |
| florist-bucket-ladder | 5,391 | 38 | compound solids |
| scalloped-awning | 4,570 | 457 | facade surface |
| parapet-strip | 3,948 | 564 | facade surface |
| tarp-fence | 3,937 | 127 | compound solids |
| clothing-rack | 3,756 | 40 | compound solids |
| street-bin | 3,717 | 59 | one convex hull |
| surveyed-street-lamp | 3,454 | 146 | compound solids |
| areaway-iron-spear | 2,772 | 84 | compound solids |
| coffee-counter | 2,376 | 44 | compound solids |
| street-dressing-bench | 2,193 | 129 | compound solids |
| hardware-pegboard | 2,136 | 48 | compound solids |
| bar-bottle-shelf | 2,063 | 39 | compound solids |
| tencent-a-frame-chalkboard | 1,980 | 20 | compound solids |
| bookshop-shelf | 1,868 | 47 | compound solids |
| deli-chilled-case | 1,697 | 50 | compound solids |
| ceramic-shelf | 1,681 | 49 | compound solids |
| striped-awning | 1,632 | 204 | facade surface |
| bicycle-display | 1,629 | 52 | compound solids |
| bakery-bread-rack | 1,434 | 33 | compound solids |
| shop-frontage-street-litter-bin | 1,288 | 28 | one convex hull |
| bookshop-book-cart | 1,171 | 50 | compound solids |
| FittedStructures | 1,006 | 31 | compound solids |
| produce-stand | 956 | 58 | compound solids |
| yard-fence-board | 912 | 152 | compound solids |
| hydrant | 798 | 82 | one convex hull |
| window-display-plinth | 737 | 43 | compound solids |
| tencent-bus-shelter | 690 | 3 | compound solids |
| bakery-counter | 633 | 55 | compound solids |
| tencent-cafe-table-chairs | 540 | 20 | compound solids |
| tencent-cargo-hand-truck | 494 | 26 | compound solids |
| planter | 492 | 41 | one convex hull |
| newspaper-box-slate | 480 | 40 | one convex hull |
| bike-rack-2-hoop | 451 | 41 | compound solids |
| tencent-cafe-umbrella | 392 | 14 | compound solids |
| tencent-park-information-board | 390 | 30 | compound solids |
| outdoor-slat-seat | 360 | 15 | compound solids |
| bench | 315 | 35 | compound solids |
| outdoor-mooring-pile | 312 | 8 | compound solids |
| outdoor-kayak-rack | 304 | 8 | compound solids |
| tencent-food-cart | 300 | 6 | compound solids |
| bike-rack-3-hoop | 297 | 11 | compound solids |
| cafe-pastry-case | 277 | 36 | compound solids |
| street-use-board | 238 | 17 | compound solids |
| tencent-loaded-bike-rack | 200 | 10 | compound solids |
| hydrant-cast-red | 169 | 13 | one convex hull |
| tencent-parcel-locker | 160 | 20 | one convex hull |
| tencent-phone-kiosk | 160 | 10 | compound solids |
| hydrant-iron-tall | 160 | 10 | one convex hull |
| tencent-drinking-fountain | 138 | 23 | compound solids |
| outdoor-rope-coil | 132 | 11 | compound solids |
| newspaper-box-muted-red | 132 | 11 | one convex hull |
| railing | 130 | 2 | compound solids |
| street-bollard | 129 | 43 | one convex hull |
| tencent-parked-scooter | 125 | 5 | compound solids |
| hydrant-stone-short | 112 | 8 | one convex hull |
| door-canopy-folded-metal | 105 | 7 | facade surface |
| tencent-pallet-stack | 102 | 17 | compound solids |
| shop-frontage-simple-park-bench | 99 | 9 | compound solids |
| landing-life-ring | 85 | 5 | compound solids |
| utility-box | 80 | 10 | compound solids |
| shop-frontage-newspaper-vending-box-slate | 78 | 13 | compound solids |
| shop-frontage-stoop-planter | 77 | 11 | compound solids |
| street-dressing-lamp-head | 76 | 19 | one convex hull |
| shop-frontage-cargo-hand-truck | 57 | 3 | compound solids |
| tencent-front-load-dumpster | 56 | 4 | compound solids |
| shop-frontage-flowering-trough | 53 | 53 | compound solids |
| door-canopy-glazed | 49 | 5 | facade surface |
| street-name-pole-single | 42 | 3 | compound solids |
| street-use-pot | 42 | 21 | compound solids |
| yard-shed-board-gable | 39 | 3 | compound solids |
| tencent-parking-meter | 36 | 9 | compound solids |
| street-use-crates | 32 | 4 | compound solids |
| tencent-fishing-gear-rack | 32 | 2 | compound solids |
| planter-full-shrubs | 30 | 10 | compound solids |
| outdoor-platform-seat | 28 | 7 | compound solids |
| shop-frontage-loaded-bike-rack | 26 | 2 | compound solids |
| street-use-bistro | 22 | 1 | compound solids |
| street-lamp-curved-arm | 18 | 1 | compound solids |
| street-name-pole-crossed | 16 | 1 | compound solids |
| street-bin-yard | 12 | 2 | one convex hull |
| traffic-light-corner-pole | 11 | 1 | compound solids |
| landing-mooring-bollard | 6 | 3 | one convex hull |

Native glazing: 0 prop_collision boxes; already one separate concave shape before this change. Fire escapes: 0 prop_collision boxes; 1,742 separate module bodies/shapes, also folded into the facade cells. Cornices have no separate module solid in this baseline.

## Candidate implementation

ARENA_FINALIZATION_VERSION is 10. finalizePrebuiltArena still runs before scene.pack for both client and server. There is no new merge, geometry build, hull generation, batching, or repair in either loader. Stale production scenes are rejected.

Facade attachments retain the padded simplified box union as double-sided triangle faces, grouped by 64 m cell and surfaceKind. Exact box-union consolidation removes contained boxes and joins equal cross-sections, preserving holes. Existing native glass and fire-escape faces are folded without simplifying or cutting their triangles. A triangle crossing a cell boundary is assigned by centroid.

Free-standing closed props use one convex hull only for the explicit simple-bin/hydrant/bollard/locker/newspaper/plain-planter allowlist and non-overhanging poles. Unknown props default to compound solids. Shelves, boards, displays, benches, rails, umbrella supports, mast arms and props with native glass preserve their openings. Compound boxes only merge when their union remains identical. Existing five-piece vehicle hulls stay intact because one global hull changes the hood/roof cover silhouette.

The first CPU review found real gaps that an unrestricted hull would close. Those assets now remain compound. Reviewer found no remaining blocking CPU issue after the allowlist and native-glass guard.

## Solid-volume query audit

| Query / input | Files | Facade attachment surfaces read? |
|---|---|---|
| Spawn capsule occupancy (intersect_shape) | game_world.ts: spawnOffsetStandable | No; WORLD_SOLID_MASK |
| Turret placement occupancy | server/crowd_weapons.ts: turretSite | No; WORLD_SOLID_MASK |
| Aircraft clearance intersect_shape/cast_motion | server/killstreaks.ts; client/killstreak_view.ts | No; WORLD_SOLID_MASK |
| RC ground motion clearance intersect_shape/cast_motion | client/killstreak_view.ts | No; WORLD_SOLID_MASK |
| Weapon barrel overlap/sweep | soldier_upper_native.gd | No; mask 1 |
| Environment collision fixture occupancy | fixtures/environment_detail_validation.ts; fixtures/prop_collision_audit.ts | No; mask 1 |
| Grunt-course clearance | server/grunt_course.ts | Fixture-only LEVEL layer, no arena facade skins |
| intersect_point / collide_shape / get_rest_info | No production call sites found in scripts | None |
| Solid/spawn reservations and cover layout | environment_modules/prop_safety.ts, placement_rules.ts, game-rules navigation/cover inputs | Authored envelopes, not packed facade triangles |
| Geographic Recast input | sands_pearl_bake.ts | Explicit surveyed collidable meshes plus rampJoinGeometry; no packed arena physics read |
| Module navigation obstacles | moduleSolidBox/shared placement envelopes | Authoring source unchanged; no finalized facade triangle read |

Layer 1 remains the existing world/solid-query layer; layer 21 contains attached facade surfaces. World rays and CharacterBody/RigidBody contacts include both. Cover contact/line-of-sight, shots, floor probes, ordnance, and impact projection retain surface access. Backing building walls (including NativeApertureWalls when present), terrain, containment, and standable ground envelopes stay separate from attached-prop skins. This does not convert existing backing-wall/terrain concaves into volumetric shapes. NativeApertureWalls is absent in this reference census.

## Counts and timing

| Metric | Client before | Client CPU projection | Server before | Server CPU projection |
|---|---:|---:|---:|---:|
| Total arena nodes | 415,000 | 125,939 | 364,122 | 75,061 |
| CollisionShape3D nodes | 358,475 | 71,039 | 358,478 | 71,042 |
| StaticBody3D nodes | 5,356 | 3,731 | 5,359 | 3,734 |
| Arena .scn bytes | 151,510,123 | Pending native pack | 134,209,754 | Pending native pack |
| Instantiate -> first gameplay frame (Windows) | Pending GO control | Pending GO candidate | Pending GO control | Pending GO candidate |

These are estimates from decoded saved geometry. Native-glass-only parts, floating-point joins, and regenerated authoring inputs can change final totals. They are not a claimed load-time or memory improvement. The 48,135 client geometry instances are unchanged. This first PR removes the dominant prop-box explosion and folds fire escapes; thousands of other world bodies remain outside this prop-focused merge.

The facade candidate retains about 11,743,454 collision triangles on the client, including existing native faces; the newly triangulated simplified box union contributes 2,797,716. Large concave BVHs may shift load work, so packed size, physics registration, memory and elapsed loading must be measured rather than inferred from node savings.

## Validation and next GPU run

CPU: TypeScript build passed; 72 focused collision/finalization/cover/ordnance/telemetry tests passed; lint passed with existing size warnings. Full pnpm test was run; the remaining failure is the invalidated enemy-aim bake. The earlier Windows fake-engine process-enumeration timeout passed on the final run. Changing game_world.ts invalidates the native enemy-aim bake, which cannot be refreshed until GO. No receipt was forged.

Prepared fixed shot file: 4,564 shots across facade/free-prop policies, plus the fixture samples native-glass targets and up to 256 existing fire-escape probe triangles. Client and authority will each be audited, and server before/after shots compared by hit/miss, position (5 mm tolerance), normal and exact surfaceKind. IDs and shot counts must match; collider paths are intentionally not compared because bodies are consolidated.

After GO: import generated UIDs, rebuild arena offline, refresh the invalidated aim bake, run native collision/traversal/cover/playability suites (including both opening seeds), verify nav checks, export Windows Playtest controls/candidate, and measure instantiate-begin through gameplay.presented (with instantiate slices per variant). Record cold and warm controls separately. Report actual packed client/server node counts and bytes. No new GO-LIVE driver is needed. Draft remains unready until these pass.
