# Skyline, shop interiors and van panels (#917)

Baseline `2aa799901957a8491db7cb1f957324690728190d`; after `39757b713ff0bbdec5548e090cac340791d63579`.

Seven matching cameras, 14 full-resolution 1920×1080 PNGs. Both sides unbaked (`GODMODE_STUDY_UNBAKED=1`), FOV 75, photo mode, HUD hidden, Windows RX 9070 XT, windowed at -10000,-10000. Camera definitions and per-view stats are in each folder; image sizes/hashes are in [manifest.json](manifest.json). Water animation phase is not synchronized. No lighting bake.

Compared with the retained 5B material reference and approved vehicle concept in the art-source archive recorded by `assets/props/street/provenance.json`, the approved waterfront 06/07 concepts in `docs/art/environment-concepts/waterfront`, and [chain31 audit/backlog](https://github.com/KamranAsif/godmode-evidence/blob/main/2026-10-03/chain31-audit/README.md).

- Skyline: height-scaled 3.6–6 m nominal bay rhythm with distance floors on pitch/member width, preserving each tower's tint, frame, banded/vertical grammar and crown. At the retained viewing range members stay about one pixel or wider; 06/07 show finer grids without visible comb aliasing.
- Shops: four position-seeded parallax layouts (cafe, grocery, clothing, bar) inside the existing glass draw. Gate05 shows clothing and a bar; gate08 shows the separated grocery bays. No per-shop models or lights.
- Vans: 58,457 painted source vertices faired before simplification, capped at 25 mm displacement, with welded area-weighted normals and a 45° crease guard. Trim, tyres, bounds, source texture bytes and UVs are retained. The paint-only normal depth is 0.12; trim remains 0.35. Approved albedo facet colouring remains visible. Van triangles: 171,622 → 171,566; sedan unchanged.

## Draw calls

Per-view `debug_render_stats` after capture. Total includes shadow and auxiliary draws. Same render surfaces; small differences at two views are runtime/culling variation (largest +0.085%). These counts measure draw calls, not frame-time improvement.

| Camera | Total before → after | Visible before → after | Shadow before → after | Captures |
| --- | ---: | ---: | ---: | --- |
| c06 | 230 → 230 | 66 → 66 | 156 → 156 | [before](before/c06.png) · [after](after/c06.png) · [comparison](c06-comparison.jpg) |
| c07 | 5559 → 5559 | 3605 → 3605 | 1946 → 1946 | [before](before/c07.png) · [after](after/c07.png) · [comparison](c07-comparison.jpg) |
| e01-street | 4642 → 4642 | 1424 → 1424 | 3210 → 3210 | [before](before/e01-street.png) · [after](after/e01-street.png) · [comparison](e01-street-comparison.jpg) |
| gate05 | 21431 → 21428 | 10457 → 10456 | 10966 → 10964 | [before](before/gate05.png) · [after](after/gate05.png) · [comparison](gate05-comparison.jpg) |
| gate08 | 19129 → 19129 | 4650 → 4650 | 14471 → 14471 | [before](before/gate08.png) · [after](after/gate08.png) · [comparison](gate08-comparison.jpg) |
| van-new-front | 18129 → 18129 | 7067 → 7067 | 11054 → 11054 | [before](before/van-new-front.png) · [after](after/van-new-front.png) · [comparison](van-new-front-comparison.jpg) |
| van-new-rear | 24608 → 24629 | 14627 → 14641 | 9973 → 9980 | [before](before/van-new-rear.png) · [after](after/van-new-rear.png) · [comparison](van-new-rear-comparison.jpg) |

## Validation

Passed `pnpm format`, `pnpm build`, `pnpm lint`, `pnpm format:check`, and `pnpm test` (all 13 steps); final targeted horizon/paint tests (10); `python tools/assets/build-vehicle-models.py --check`, `test-vehicle-panels.py` (2), and `test-vehicle-materials.py` (1). [Logs](validation). Final rendered and headless runs have zero `GODMODE_FRAME_ERROR`; headless inspection confirms one connected player. Both review instances and the smoke instance stopped.

The discarded initial fresh-import run started with an unimported chunk and emitted frame errors; it is not either comparison side. The cache was completed before baseline/final capture. The first vehicle fairing attempt revealed sub-millimetre bound drift; applying only welded displacement fixed deterministic regeneration.

Tunable defaults: distance pitch floor 0.005×distance, member width floor 0.0014×distance, 6 fairing passes/25 mm cap, van paint normal depth 0.12. Shop fixtures are inexpensive parallax silhouettes; final baked lighting remains outside this change.
