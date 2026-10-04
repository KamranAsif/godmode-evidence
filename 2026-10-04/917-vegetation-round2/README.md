# PR #921 vegetation, round two

Baseline `ca94233995e0c6bf04b3da26e4ccb9cf0c1b911b`; final `d329784841ccb1ab461adee69cbab865e968727a`, rebased onto `ece574640`.

122 unbaked native 1920x1080 captures at the original 61 cameras from the [earlier evidence](../../2026-10-03/917-vegetation/after/manifest.json). Position, yaw, pitch and FOV 75 were checked against runtime state on every capture. Windows D3D12, windowed off-screen at -10000,-10000, `GODMODE_STUDY_UNBAKED=1`; no lighting bake. Camera definitions, individual stats and image hashes are retained in the manifests and [metadata](metadata.json).

Tree crowns now have 56 smaller overlapping clumps, 80 flat facets each, with branch-end centres contracted into fuller rounded canopies. Shrubs have 25 smaller domed clumps with 320 facets each, gently varied greens through the same shared foliage shader. Existing palette, shrub group spacing, instancing, navigation and collision remain intact. These are map-wide family rules, shared by streets, parks, kerbs, planters and courtyards.

Mean visible draw calls: **5303.4 -> 5301.9 (-0.03%)**. Both logs report 46,999 module instances / 7,431 module nodes / six tree shapes / seven fitted shrub shapes; street dressing retains 235 placements / 137 render nodes / four shrub shapes / 385 shrub instances / 162 collision shapes. Small draw differences reflect culling and live actors. Foliage triangle counts increase (tree 160 -> 4,480; shrub 160 -> 8,000); draw-call count is preserved by shared surfaces and batches. Clump sizes and canopy contraction are tunable.

`pnpm format`, `pnpm build`, `pnpm lint`, `pnpm test` pass, all 13 root-suite steps. The vegetation tests verify closed outward-facing clumps, differing tree proportions, clearance bounds and unchanged navigation/placement rules. Successful complete rendered before/after sweeps and final headless smoke contain no `GODMODE_FRAME_ERROR`. An intermediate render hit the pre-existing GodotJS reference-count assertion; the complete final sweep is retained here. The initial fresh-cache attempt failed before loading gameplay; warm engine-generated cache restoration resolved the resource imports. Every owned run was stopped.

| Camera | Before | After | Before draws | After draws |
| --- | --- | --- | ---: | ---: |
| c01 | [PNG](before/c01.png) | [PNG](after/c01.png) | 5107 | 5087 |
| c02 | [PNG](before/c02.png) | [PNG](after/c02.png) | 2104 | 2104 |
| c03 | [PNG](before/c03.png) | [PNG](after/c03.png) | 5757 | 5776 |
| c04 | [PNG](before/c04.png) | [PNG](after/c04.png) | 9947 | 9962 |
| c05 | [PNG](before/c05.png) | [PNG](after/c05.png) | 5949 | 5955 |
| c06 | [PNG](before/c06.png) | [PNG](after/c06.png) | 66 | 66 |
| c07 | [PNG](before/c07.png) | [PNG](after/c07.png) | 3606 | 3606 |
| old01 | [PNG](before/old01.png) | [PNG](after/old01.png) | 4705 | 4705 |
| old02 | [PNG](before/old02.png) | [PNG](after/old02.png) | 95 | 95 |
| old03 | [PNG](before/old03.png) | [PNG](after/old03.png) | 2687 | 2687 |
| old04 | [PNG](before/old04.png) | [PNG](after/old04.png) | 3454 | 3454 |
| old05 | [PNG](before/old05.png) | [PNG](after/old05.png) | 69 | 69 |
| e01-street | [PNG](before/e01-street.png) | [PNG](after/e01-street.png) | 1424 | 1424 |
| e01-front | [PNG](before/e01-front.png) | [PNG](after/e01-front.png) | 14977 | 14913 |
| e02-street | [PNG](before/e02-street.png) | [PNG](after/e02-street.png) | 10911 | 10883 |
| e02-front | [PNG](before/e02-front.png) | [PNG](after/e02-front.png) | 3933 | 3978 |
| e03-street | [PNG](before/e03-street.png) | [PNG](after/e03-street.png) | 1701 | 1701 |
| e03-front | [PNG](before/e03-front.png) | [PNG](after/e03-front.png) | 15439 | 15457 |
| e04-street | [PNG](before/e04-street.png) | [PNG](after/e04-street.png) | 4286 | 4262 |
| e04-front | [PNG](before/e04-front.png) | [PNG](after/e04-front.png) | 8457 | 8455 |
| e05-street | [PNG](before/e05-street.png) | [PNG](after/e05-street.png) | 209 | 207 |
| e05-front | [PNG](before/e05-front.png) | [PNG](after/e05-front.png) | 14264 | 14262 |
| gate01 | [PNG](before/gate01.png) | [PNG](after/gate01.png) | 176 | 176 |
| gate02 | [PNG](before/gate02.png) | [PNG](after/gate02.png) | 1337 | 1337 |
| gate03 | [PNG](before/gate03.png) | [PNG](after/gate03.png) | 4778 | 4778 |
| gate04 | [PNG](before/gate04.png) | [PNG](after/gate04.png) | 11493 | 11493 |
| gate05 | [PNG](before/gate05.png) | [PNG](after/gate05.png) | 10464 | 10509 |
| gate06 | [PNG](before/gate06.png) | [PNG](after/gate06.png) | 6801 | 6801 |
| gate07 | [PNG](before/gate07.png) | [PNG](after/gate07.png) | 5487 | 5487 |
| gate08 | [PNG](before/gate08.png) | [PNG](after/gate08.png) | 4650 | 4650 |
| gate09 | [PNG](before/gate09.png) | [PNG](after/gate09.png) | 4237 | 4237 |
| gate10 | [PNG](before/gate10.png) | [PNG](after/gate10.png) | 9318 | 9318 |
| gate11 | [PNG](before/gate11.png) | [PNG](after/gate11.png) | 12763 | 12721 |
| gate12 | [PNG](before/gate12.png) | [PNG](after/gate12.png) | 5836 | 5836 |
| gate13 | [PNG](before/gate13.png) | [PNG](after/gate13.png) | 9682 | 9670 |
| gate14 | [PNG](before/gate14.png) | [PNG](after/gate14.png) | 6349 | 6349 |
| gate15 | [PNG](before/gate15.png) | [PNG](after/gate15.png) | 540 | 540 |
| gate16 | [PNG](before/gate16.png) | [PNG](after/gate16.png) | 2536 | 2536 |
| park-east | [PNG](before/park-east.png) | [PNG](after/park-east.png) | 2967 | 3011 |
| park-west | [PNG](before/park-west.png) | [PNG](after/park-west.png) | 8340 | 8397 |
| pier-path | [PNG](before/pier-path.png) | [PNG](after/pier-path.png) | 144 | 144 |
| underbridge | [PNG](before/underbridge.png) | [PNG](after/underbridge.png) | 14244 | 14249 |
| shore-01 | [PNG](before/shore-01.png) | [PNG](after/shore-01.png) | 191 | 191 |
| shore-02 | [PNG](before/shore-02.png) | [PNG](after/shore-02.png) | 324 | 324 |
| shore-03 | [PNG](before/shore-03.png) | [PNG](after/shore-03.png) | 69 | 69 |
| shore-04 | [PNG](before/shore-04.png) | [PNG](after/shore-04.png) | 98 | 98 |
| shore-05 | [PNG](before/shore-05.png) | [PNG](after/shore-05.png) | 107 | 107 |
| shore-06 | [PNG](before/shore-06.png) | [PNG](after/shore-06.png) | 3586 | 3609 |
| shore-07 | [PNG](before/shore-07.png) | [PNG](after/shore-07.png) | 16842 | 16838 |
| shore-08 | [PNG](before/shore-08.png) | [PNG](after/shore-08.png) | 1605 | 1605 |
| shore-09 | [PNG](before/shore-09.png) | [PNG](after/shore-09.png) | 64 | 64 |
| sedan-front | [PNG](before/sedan-front.png) | [PNG](after/sedan-front.png) | 7757 | 7685 |
| sedan-side | [PNG](before/sedan-side.png) | [PNG](after/sedan-side.png) | 1851 | 1825 |
| sedan-rear | [PNG](before/sedan-rear.png) | [PNG](after/sedan-rear.png) | 2491 | 2520 |
| van-front | [PNG](before/van-front.png) | [PNG](after/van-front.png) | 8206 | 8117 |
| van-rear | [PNG](before/van-rear.png) | [PNG](after/van-rear.png) | 1765 | 1802 |
| trim-old-fulton | [PNG](before/trim-old-fulton.png) | [PNG](after/trim-old-fulton.png) | 6865 | 6863 |
| trim-furman | [PNG](before/trim-furman.png) | [PNG](after/trim-furman.png) | 3713 | 3713 |
| trim-east | [PNG](before/trim-east.png) | [PNG](after/trim-east.png) | 4876 | 4874 |
| van-new-front | [PNG](before/van-new-front.png) | [PNG](after/van-new-front.png) | 7109 | 7069 |
| van-new-rear | [PNG](before/van-new-rear.png) | [PNG](after/van-new-rear.png) | 14698 | 14697 |
