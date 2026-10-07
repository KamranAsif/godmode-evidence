# World detail textures, B strength

Batch 3 rebased onto main after #1012 merged. Thirty visible material and asset checks: twenty-nine accepted contact sheets, one isolated pier sample excluded for coverage, plus six production views. Existing B roof and waterfront materials are retained as context; this is not a claim of thirty entirely new assets.

New routes cover skyline brick/stone/plaster and trim, bridge steel, worn road paint and kerbs, timber shop fronts and canvas, service panels, roof finishes, ray-traced shop interiors, physical reward cores, crate fallback panels and concrete debris. Existing authored textures and emissive signals remain in use. Synthetic facet lattices are disabled while actual geometry facets remain.

Each contact sheet contains three unchanged native 1920x1080 panels, with a 50px label strip. Actual production factory models retain scale/materials. Native city/road/bridge/pier samples preserve original triangles, normals and vertex colours and are rigidly translated into the gallery; their exact scene paths and crop provenance appear in the manifest. Gallery images are material checks, not production lightmap proofs.

The initial warmup produced no images because an old imported phone cache lacked the approved baked tracks. A real project import fixed it. That failed warmup is excluded. Final review found back-facing one-sided native gallery samples; their camera follows a representative production face normal in corrected replacements. All nineteen factory checks and six production views were retained. This is a coverage correction, with no texture design iteration. No auditor verdict is claimed.

## Six production views

| View | Raw native PNG |
|---|---|
| street-01-outdoor.png | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/street-01-outdoor.png) |
| street-02-fronts-doors.png | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/street-02-fronts-doors.png) |
| street-03-roof-parapets.png | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/street-03-roof-parapets.png) |
| street-04-bridge-covered.png | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/street-04-bridge-covered.png) |
| street-05-pier-water-edge.png | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/street-05-pier-water-edge.png) |
| street-06-skyline.png | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/street-06-skyline.png) |

## Close / mid / far checks

[Overview](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/contact-sheet-index.jpg) | [Poses, native provenance, material parameters and hashes](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/manifest.json)

| Check | Raw native sheet |
|---|---|
| skyline-wallBrick | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/skyline-wallBrick-close-mid-far.png) |
| skyline-wallStone | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/skyline-wallStone-close-mid-far.png) |
| skyline-wallPlaster | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/skyline-wallPlaster-close-mid-far.png) |
| skyline-trimWarm | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/skyline-trimWarm-close-mid-far.png) |
| skyline-trimCool | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/skyline-trimCool-close-mid-far.png) |
| skyline-roofMembrane | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/skyline-roofMembrane-close-mid-far.png) |
| street-white | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/street-white-close-mid-far.png) |
| street-yellow | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/street-yellow-close-mid-far.png) |
| street-kerb | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/street-kerb-close-mid-far.png) |
| shopfront-0 | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/shopfront-0-close-mid-far.png) |
| shopfront-1 | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/shopfront-1-close-mid-far.png) |
| shopfront-2 | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/shopfront-2-close-mid-far.png) |
| shopfront-3 | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/shopfront-3-close-mid-far.png) |
| shopfront-4 | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/shopfront-4-close-mid-far.png) |
| shopfront-5 | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/shopfront-5-close-mid-far.png) |
| service-bay-0 | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/service-bay-0-close-mid-far.png) |
| service-bay-1 | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/service-bay-1-close-mid-far.png) |
| service-bay-2 | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/service-bay-2-close-mid-far.png) |
| service-bay-3 | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/service-bay-3-close-mid-far.png) |
| reward-special | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/reward-special-close-mid-far.png) |
| reward-cache | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/reward-cache-close-mid-far.png) |
| reward-upgrade | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/reward-upgrade-close-mid-far.png) |
| parapet-rail-open | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/parapet-rail-open-close-mid-far.png) |
| parapet-rail-coping | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/parapet-rail-coping-close-mid-far.png) |
| roof-ac-single-grille | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/roof-ac-single-grille-close-mid-far.png) |
| roof-duct-elbow-compact | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/roof-duct-elbow-compact-close-mid-far.png) |
| roof-hatch-raised | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/roof-hatch-raised-close-mid-far.png) |
| supply-crate-beacon | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/supply-crate-beacon-close-mid-far.png) |
| bridge-steel-native | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/bridge-steel-native-close-mid-far.png) |

## Native-speed motion

[Combined 1080p30 motion tour](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/motion-tour-1080p30.mp4)

Four valid realtime paths joined by hard cuts. Skyline/bridge back-facing motion and the aborted stale-receipt replacement are excluded. Native capture timestamps drive CFR encoding: original frames may be held or dropped; no interpolation, image resizing or fixed simulation stepping. GPU readback/write gaps are disclosed below. The original retained motion window also overlapped a peer compiler from09:52:09 to09:52:21; no zero-CPU claim is made. This publication does not certify continuous temporal shimmer.

| Path | 1080p30 clip | Receipt | Samples / maximum gap |
|---|---|---|
| tour-shop-timber-awning.mp4 | [MP4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/tour-shop-timber-awning.mp4) | [JSON](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/tour-shop-timber-awning.json) | 89 / 97.0 ms |
| tour-painted-road-contact.mp4 | [MP4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/tour-painted-road-contact.mp4) | [JSON](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/tour-painted-road-contact.json) | 70 / 546.6 ms |
| tour-reward-core-spin.mp4 | [MP4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/tour-reward-core-spin.mp4) | [JSON](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/tour-reward-core-spin.json) | 69 / 513.0 ms |
| tour-waterfront-street.mp4 | [MP4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/tour-waterfront-street.mp4) | [JSON](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01643705f6e78f5e0d80c57dd9cbf123b5f014e2/2026-10-07/world-detail-textures-b/world/tour-waterfront-street.json) | 68 / 564.2 ms |

Verification, default pnpm test 13/13, import/cache comparison and exact owned-engine stop receipts are under `proof/`. No lightmap bake was performed. Published receipt hashes use the exact Git/raw HTTP bytes.
