# Collision source census and Option C scope

CPU-only decode of verified cached PackedScenes; no Godot/import/export/capture. Scene parser reads every stored node and shape. Counts are nodes, not unique Shape3D resources.

| Source | Static bodies | Areas | Shape nodes | Box | Concave | Convex | Cylinder |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| prop_collision.ts / placed props | 85 | 0 | 351866 | 351866 | 0 | 0 | 0 |
| module_collision.ts / retained module envelopes | 3188 | 0 | 3328 | 1306 | 2022 | 0 | 0 |
| module_collision.ts + vehicle_collision.ts | 299 | 0 | 1495 | 0 | 0 | 1495 | 0 |
| dumbo_survival_arena.ts / containment boxes | 554 | 0 | 554 | 554 | 0 | 0 | 0 |
| environment_detail.ts / model hulls | 432 | 0 | 432 | 18 | 9 | 0 | 405 |
| dumbo_survival_arena.ts / survey terrain | 398 | 0 | 398 | 0 | 398 | 0 | 0 |
| barrier_prop.ts / waterfront barrier props | 381 | 0 | 381 | 381 | 0 | 0 | 0 |
| environment_detail.ts / planting bases | 17 | 0 | 17 | 0 | 17 | 0 | 0 |
| native_glass_collision.ts | 1 | 1 | 2 | 0 | 2 | 0 | 0 |
| surface_intersections.ts + waterfront ledges | 1 | 0 | 1 | 0 | 1 | 0 | 0 |
| natural_impact_surfaces.ts / water | 0 | 1 | 1 | 0 | 1 | 0 | 0 |
| TOTAL | 5356 | 2 | 358475 | 354125 | 2450 | 1495 | 405 |

street_dressing.ts envelopes are retired by buildPlacedPropCollision and appear in that row. environment_detail.ts garden-rail site and brooklyn_ramp_join.ts contribute zero retained nodes in this reference. prebuilt_arena.ts rebinds entry material shapes and vehicle hulls before packing; these are counted under the owning module/vehicle rows, not twice. natural_impact_surfaces.ts also retags existing surfaces without adding nodes except its water area. surface_intersections.ts calls waterfront ledge/guard builders.

prop_collision.ts contributes 351,866 / 358,475 = 98.16% of client shape nodes, already held by 85 chunk bodies. It is the first small-PR target. Its top contributor is window frames/Juliet rails (146,611 shape nodes), followed by shopfront-family (28,830) and parapet-rail-open (20,032).

## Authority parity

| Count | Client | Server |
| --- | ---: | ---: |
| StaticBody3D | 5,356 | 5,359 |
| Area3D | 2 | 2 |
| CollisionShape3D | 358,475 | 358,478 |
| All scene nodes | 415,000 | 364,122 |

Both packed scenes contain the same 351,866 placed-prop boxes, 1,495 vehicle convex shapes and 405 cylinders. Global content/transform/surface/layer/mask comparison differs in concave geometry: NativeGlass differs, and authority has three additional concave shapes (two named pier guards and one anonymous concrete body whose builder ownership remains unconfirmed). These are baseline differences to retain and report separately, not merge regressions.

## Representation decision

There are 236 existing chunk/surface-kind groups: concrete 179,910 boxes; metal 144,106; wood 27,490; glass 360. A one-triangle-shape-per-group candidate would have 236 shape nodes rather than 351,866, projecting total scene nodes to client 63,370 / server 12,492 before other changes. This is a structural projection, NOT a built scene or a timing result. Naively triangulating every box creates 4,222,392 collision triangles; BVH construction cost and actual packed size are unknown.

Godot 4.6 ConcavePolygonShape3D is hollow even when closed; replacing solid boxes changes inside/penetration and inside-origin ray behavior. Convex-hulling disjoint rails would fill gameplay openings. The strict-equivalence route retains solid boxes and only merges demonstrably equivalent boxes, keeping additional shapes where needed. Exact duplicate removal alone finds just 33 redundant placed-prop box nodes, so deduplication alone cannot deliver this target.

[Concave shape semantics](https://docs.godotengine.org/en/4.6/classes/class_concavepolygonshape3d.html), [ray hit_from_inside semantics](https://docs.godotengine.org/en/4.6/classes/class_physicsrayqueryparameters3d.html). A user clarification is pending about solid-box preservation versus preparing the one-triangle-shape-per-kind test candidate. No collider conversion has been implemented or approved as equivalent.

## Offline-only implementation and verification contract

Implement in finalization before either scene is packed; bump ARENA_FINALIZATION_VERSION; ordinary load must reject stale arenas. Do not add geometry/shapes at load. Preserve impact surfaceKind, collision layers/masks, disabled state and containment policy. Compare each candidate with its own client/server reference, including fixed server ray hit position/normal/surface/blocking diffs, collision/entry/prop/vehicle tests, traversal, cover and first-run playability. Native/engine suites and regenerated resource UIDs wait for GPU GO. Measure arena.client.instance.begin through gameplay.presented and the server instantiation slice separately, with existing startup markers, not GO-LIVE guesses.

Option C visual building merge, far LOD, total node counts, ten-pose draw counts/captures, three heavy-pose frame medians, packed size and build timings remain pending. The branch is perf/building-merge-c-20261027 from origin/main 858db7663. No PR has been opened and no packed arena has been generated.
