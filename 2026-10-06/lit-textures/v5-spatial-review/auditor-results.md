# V5 far-car spatial audit

Evidence: `01c28d7529f91d1944675053bb5e32e459cb204a`, `2026-10-06/lit-textures/v5-far-car-clear`.

All 34 indexed evidence files downloaded and hash checked. All ten original 1920×1080 PNGs and twelve decoded native-resolution motion samples were individually inspected at original resolution. No engine or GPU used.

| Original image | Verdict | Finding and location |
| --- | --- | --- |
| main-car-far.png | PASS | Central van around x880–1040/y530–595 has clear roof, body and both wheels; baseline control is readable. |
| candidate-car-far.png | PASS | Central van remains readable with subdued paint variation and distinct wheels/lower panels. No visible repeat, seam, grid, stretched UVs or excessive relief. Cooler/deeper shade remains readable. |
| main-preflight-start.png | PASS | Central van clear; foreground lamp/hydrant/sedan and nearby tree remain outside its silhouette. |
| main-preflight-right.png | PASS | Right bound retains clear van body and both wheels; no obstruction or captured lattice. |
| main-preflight-left.png | PASS | Left bound retains clear van body and both wheels; no obstruction or captured lattice. |
| main-preflight-end.png | PASS | End retains clear van body and both wheels; baseline materials readable. |
| candidate-preflight-start.png | PASS | Central van clear; muted paint, foliage and brown trunks retain material identity and facet hierarchy. |
| candidate-preflight-right.png | PASS | Right bound clear; van lower paint/wheels readable, no visible repeat/grid/seam or lighting defect. |
| candidate-preflight-left.png | PASS | Left bound clear; van lower paint/wheels readable, no visible repeat/grid/seam or lighting defect. |
| candidate-preflight-end.png | PASS | End clear; no obstruction, captured lattice, palette defect or shade crush. |

| Original clip | Spatial verdict | Individually inspected native samples |
| --- | --- | --- |
| main-motion-car-far.mp4 | PASS | Frames 0,24,47,70,94,117 at 0.012103,0.986856,1.995134,3.011165,4.004601,4.981450 seconds. Van body/roof/both wheels clear in all six; no sampled material defect. |
| candidate-motion-car-far.mp4 | PASS | Frames 0,22,46,69,91,114 at 0.013293,0.987839,2.009392,2.991421,4.018584,4.992851 seconds. Van body/roof/both wheels clear in all six; paint detail subdued, lower panels correctly distinct from tyres, no sampled repeat/grid/seam or excessive relief. |

The remaining foreground lamp is approximately x640–710, well left of the van. The hydrant, sedan and nearby tree also stay outside the van silhouette at the inspected extrema and samples. The previous far-car coverage failure is resolved.

Main/candidate crop import proofs are identical to their respective v4 proofs: source MD5 matches imported-cache source MD5, with unchanged source/cache SHA256 values. V4 matched-density spatial PASS, eight architectural PNG PASS, ten other clip spatial PASS, and v3 44-image spatial PASS remain retained. V4 far-car originals and tours remain excluded; v5 supplies the corrected paths/tours.

Both originals decoded completely: main 119 encoded frames / 118 captured receipts, candidate 116 / 115, each with the disclosed terminal duplicate. Maximum capture gaps are about 0.112s main and 0.120s candidate. Only the twelve named decoded frames were visually inspected; this is spatial coverage/material review, not continuous playback or shimmer clearance. CFR copies and corrected tours were downloaded but not certified as continuous temporal evidence here.

Overall ALL PASS remains held until a human/video-capable reviewer supplies continuous native-pixel 1× temporal verdicts for all six matched tree/car paths, using the corrected v5 far-car pair. No temporal waiver or full production-atlas rebake approval is implied.
