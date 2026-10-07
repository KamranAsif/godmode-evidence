# V4 recovery vision audit

Evidence commit: `6a67de7fe0fb79d77465dfae5d07599135cfeea7`.
Captured baseline: `e26e95c61bc258b5acf0bd59701d49b25f98aa90`.
Captured candidate: `f6a3c316688f98d59e7eb111077723011de728f6`.
Final source commit reported by the validation receipt: `669f0c2a1f77130d4edc528f29d4232d4d3bafaa`. Presentation equivalence is the implementing lane's assertion; this audit judges the captured candidate.

Downloaded all 73 indexed captures/receipts. Individually inspected all eight original PNGs at 1920x1080 with original image detail. Decoded all twelve original VFR movies without resizing/interpolation, and individually inspected six native-resolution spatial samples per movie: opening, nearest captured timestamps to 1/2/3/4 seconds, and last actual captured frame. `motion-frames/decode-manifest.json` records exact indices/times. This is 72 inspected motion samples, not continuous video playback or an inspection of every intervening frame. CFR clips/tours were downloaded but do not receive a continuous temporal verdict here.

## Original PNG verdicts

| Image | Verdict | Defect/location or inspected finding |
| --- | --- | --- |
| main-outdoor.png | PASS, control | Pavement, shop fronts, tree silhouettes and shade remain readable; usable matched control. |
| candidate-outdoor.png | PASS, spatial | Cooler/deeper shaded pavement retains surface and path readability. Trees retain green facets and brown trunk identity; no visible texture repeat, seam, sampler grid or UV stretch. Outdoor composition remains baseline-good. |
| main-covered.png | PASS, control | Bridge underside, truss, vehicles and street remain readable; usable matched control. |
| candidate-covered.png | PASS, spatial | Darker bridge underside retains truss/form separation. Street, paint and foliage remain readable and within the muted palette; no washed-out fill or global shade crush. |
| main-contact.png | PASS, control | Usable planter/wall/ground contact control; no capture contamination. |
| candidate-contact.png | PASS, spatial | Planter edge, adjacent wall base and ground shadow have defined contact without an excessive black halo/blob. Texture continuity and material separation remain clear. |
| main-gameplay.png | PASS, control | Clean live-player view without red damage tint or TRAINER overlay; usable comparison. |
| candidate-gameplay.png | PASS, spatial | Clean player view. Shaded path and shop fronts remain readable; leaf/bark detail respects the broad forms and palette. No observed repeat, seam, sampler grid or stretched material. |

## Original motion clip verdicts

Every PASS below applies only to the six decoded spatial samples. Continuous native-speed shimmer/temporal stability is **UNVERIFIED for every clip**.

| Original clip | Spatial/evidence verdict | Defect/location or inspected finding |
| --- | --- | --- |
| main-motion-tree-close.mp4 | PASS, control samples | Near canopy/trunk visible at every inspected sample; previous central beam obstruction absent. |
| candidate-motion-tree-close.mp4 | PASS, spatial samples | Near canopy/trunk clear throughout inspected samples. Natural subdued leaf/bark detail; geometry facets remain dominant; no visible repeat/seam/grid/stretch. |
| main-motion-tree-mid.mp4 | PASS, control samples | Target tree remains clear and readable; usable mid-distance control samples. |
| candidate-motion-tree-mid.mp4 | PASS, spatial samples | Mid tree retains muted green/brown material identity, trunk branching and canopy forms. No visible spatial tiling or detail overload. |
| main-motion-tree-far.mp4 | PASS, control samples | Far trees and surrounding street remain readable in the sampled views. |
| candidate-motion-tree-far.mp4 | PASS, spatial samples | Far canopy detail blends into forms without an observed repeat/grid. Shaded street stays readable against the control; visible prop materials remain coherent. |
| main-motion-car-close.mp4 | PASS, control samples | Van paint, lower panels, tyres and wheel geometry visible; no triangular lattice overlay in inspected samples. |
| candidate-motion-car-close.mp4 | PASS, spatial samples | Van broad paint planes remain dominant; macro variation/normal relief subdued. Lower panels retain smooth painted/trim identity rather than hammered rubber. Tyres and steel remain distinct; no visible texture repeat/seam/grid. |
| main-motion-car-mid.mp4 | PASS, control samples | Mid van and sedan remain sufficiently visible despite live-actor differences; usable control samples. |
| candidate-motion-car-mid.mp4 | PASS, spatial samples | Vehicle silhouettes, broad paint facets and lower panels remain readable. No coarse cloudy/stucco appearance, off-palette tint or visible sampler repeat in inspected samples. |
| main-motion-car-far.mp4 | FAIL, evidence coverage | Full-height foreground lamp post, approximately x645-975 at 0.010s and x920-1240 at 4.993s, hides most/all of the distant van. It crosses the target again near 4.001s. Camera stays outside the foreground sedan, but far-vehicle coverage is obstructed. Visible material portions show no identified spatial defect. |
| candidate-motion-car-far.mp4 | FAIL, evidence coverage | Same full-height foreground lamp obstruction: approximately x645-975 at 0.009s and x920-1240 at 4.978s, with renewed target occlusion near 3.970s. Needs a clear paired far-car recapture. Visible material portions show no identified spatial defect. |

## Matched density crop

**PASS, visual crop comparison.** Four main/candidate camera inventories match exactly, and each reports 126 bound lightmap users. The evidence records equal 1,745,601 placed triangles. Control bake ambient proof is 1.5; candidate is approximately 0.16. Both imported-source MD5 receipts equal their corresponding actual source MD5 and report matching imported cache, with different source/cache SHA256 values between passes. The supplied density comparison is control 1m against candidate bounded 0.5m.

Candidate contact definition and lower fill are acceptable in this crop; no observed lightmap seam/grid, excessive halo, washed-out lighting or unreadable shade. Density, ambient and material settings vary together, so these views do not isolate the contribution of density alone. This verdict covers the audited crop, not a fresh full production atlas bake; the original production atlas was restored and a full rebake is release-owned.

V3's 44 original PNG spatial PASS remains retained. Overall **ALL PASS is withheld** until the paired far-car coverage is corrected and a human/video-capable reviewer returns continuous native-pixel, normal-speed temporal verdicts for the valid tree/car near-mid-far paths. Recorded capture stalls remain disclosed; decoded samples and CFR conversion do not certify shimmer absence.

Findings delivered to recovery lane `%154@windows`. No game code edited, raw third-party packages accessed, or engine/GPU work performed by the auditor.
