# #917 vegetation: unbaked before / after

Baseline `899611bc7db10d586dc85fa6be0470f9957487ff`; vegetation change `ca94233995e0c6bf04b3da26e4ccb9cf0c1b911b`.

122 native 1920�1080 PNGs at all 61 [chain31 auditor cameras](../chain31-audit/views.json). Camera position, yaw, pitch and FOV 75 were checked against those definitions on every capture. Both sides use Windows D3D12 off-screen, windowed at -10000,-10000, photo mode with HUD hidden and GODMODE_STUDY_UNBAKED=1. No lighting bake was run. [Image hashes and metrics](metadata.json).

The approved [morning concepts](https://github.com/KamranAsif/Godmode.exe-roguelite/tree/main/docs/art/environment-concepts) and [audit vegetation finding](../chain31-audit/README.md) guide the pass: broad angular overlapping crown masses, six silhouettes with independently varied size/rotation/tone, restrained grey-green leaves, and unequal overlapping shrub clusters with gaps across planters, kerbs, park beds and courtyards. Foliage remains flat-colour and texture-free.

Mean visible viewport draw calls across these 61 cameras: **5307.1 ? 5299.0 (-0.15%)**. Camera-specific readings are below; small differences follow changed vegetation bounds/culling and live actors. The render batch budget is unchanged: main modules 46,999 instances / 7,431 nodes / 6 tree shapes / 7 fitted shrub shapes; street dressing 235 placements / 137 render nodes / 4 shrub shapes / 385 shrub instances / 162 collision shapes. Each leaf mass drops from 80 to 20 broad triangles.

Navigation and gameplay collision data/footprints remain unchanged. Pure tests verify closed outward-facing lobes, bounded crowns, identical visual/nonvisual navigation keep-outs, clustered plant counts and sloping soil root heights. `pnpm format`, `pnpm build`, `pnpm lint`, and `pnpm test` passed; root suite 13/13 steps. [Test output](test.log), [headless gameplay inspection](smoke/inspection.json), [headless log](smoke/logs.json), [before log](before/logs.json), [after log](after/logs.json). Successful rendered and headless runs reached gameplay without GODMODE_FRAME_ERROR. All owned instances were stopped.

The after sweep resumed after one native GodotJS reference-count assertion during concurrent validation; already verified PNGs were retained. No such assertion appears in the successful final capture run.

| Camera | Before 1920�1080 | After 1920�1080 | Before visible draws | After visible draws |
| --- | --- | --- | ---: | ---: |
| c01 | [PNG](before/c01.png) | [PNG](after/c01.png) | 5102 | 5091 |
| c02 | [PNG](before/c02.png) | [PNG](after/c02.png) | 2109 | 2104 |
| c03 | [PNG](before/c03.png) | [PNG](after/c03.png) | 5760 | 5761 |
| c04 | [PNG](before/c04.png) | [PNG](after/c04.png) | 9966 | 9951 |
| c05 | [PNG](before/c05.png) | [PNG](after/c05.png) | 5949 | 5949 |
| c06 | [PNG](before/c06.png) | [PNG](after/c06.png) | 66 | 66 |
| c07 | [PNG](before/c07.png) | [PNG](after/c07.png) | 3608 | 3612 |
| old01 | [PNG](before/old01.png) | [PNG](after/old01.png) | 4709 | 4705 |
| old02 | [PNG](before/old02.png) | [PNG](after/old02.png) | 95 | 95 |
| old03 | [PNG](before/old03.png) | [PNG](after/old03.png) | 2687 | 2687 |
| old04 | [PNG](before/old04.png) | [PNG](after/old04.png) | 3454 | 3454 |
| old05 | [PNG](before/old05.png) | [PNG](after/old05.png) | 69 | 69 |
| e01-street | [PNG](before/e01-street.png) | [PNG](after/e01-street.png) | 1428 | 1429 |
| e01-front | [PNG](before/e01-front.png) | [PNG](after/e01-front.png) | 14970 | 14915 |
| e02-street | [PNG](before/e02-street.png) | [PNG](after/e02-street.png) | 10899 | 10887 |
| e02-front | [PNG](before/e02-front.png) | [PNG](after/e02-front.png) | 3929 | 3977 |
| e03-street | [PNG](before/e03-street.png) | [PNG](after/e03-street.png) | 1701 | 1707 |
| e03-front | [PNG](before/e03-front.png) | [PNG](after/e03-front.png) | 15434 | 15396 |
| e04-street | [PNG](before/e04-street.png) | [PNG](after/e04-street.png) | 4308 | 4323 |
| e04-front | [PNG](before/e04-front.png) | [PNG](after/e04-front.png) | 8457 | 8457 |
| e05-street | [PNG](before/e05-street.png) | [PNG](after/e05-street.png) | 209 | 209 |
| e05-front | [PNG](before/e05-front.png) | [PNG](after/e05-front.png) | 14264 | 14272 |
| gate01 | [PNG](before/gate01.png) | [PNG](after/gate01.png) | 176 | 176 |
| gate02 | [PNG](before/gate02.png) | [PNG](after/gate02.png) | 1337 | 1341 |
| gate03 | [PNG](before/gate03.png) | [PNG](after/gate03.png) | 4778 | 4778 |
| gate04 | [PNG](before/gate04.png) | [PNG](after/gate04.png) | 11495 | 11493 |
| gate05 | [PNG](before/gate05.png) | [PNG](after/gate05.png) | 10491 | 10449 |
| gate06 | [PNG](before/gate06.png) | [PNG](after/gate06.png) | 6803 | 6799 |
| gate07 | [PNG](before/gate07.png) | [PNG](after/gate07.png) | 5487 | 5487 |
| gate08 | [PNG](before/gate08.png) | [PNG](after/gate08.png) | 4650 | 4650 |
| gate09 | [PNG](before/gate09.png) | [PNG](after/gate09.png) | 4237 | 4237 |
| gate10 | [PNG](before/gate10.png) | [PNG](after/gate10.png) | 9318 | 9318 |
| gate11 | [PNG](before/gate11.png) | [PNG](after/gate11.png) | 12773 | 12721 |
| gate12 | [PNG](before/gate12.png) | [PNG](after/gate12.png) | 5848 | 5834 |
| gate13 | [PNG](before/gate13.png) | [PNG](after/gate13.png) | 9715 | 9668 |
| gate14 | [PNG](before/gate14.png) | [PNG](after/gate14.png) | 6349 | 6349 |
| gate15 | [PNG](before/gate15.png) | [PNG](after/gate15.png) | 540 | 540 |
| gate16 | [PNG](before/gate16.png) | [PNG](after/gate16.png) | 2534 | 2536 |
| park-east | [PNG](before/park-east.png) | [PNG](after/park-east.png) | 2993 | 2994 |
| park-west | [PNG](before/park-west.png) | [PNG](after/park-west.png) | 8358 | 8335 |
| pier-path | [PNG](before/pier-path.png) | [PNG](after/pier-path.png) | 144 | 144 |
| underbridge | [PNG](before/underbridge.png) | [PNG](after/underbridge.png) | 14231 | 14200 |
| shore-01 | [PNG](before/shore-01.png) | [PNG](after/shore-01.png) | 193 | 191 |
| shore-02 | [PNG](before/shore-02.png) | [PNG](after/shore-02.png) | 322 | 324 |
| shore-03 | [PNG](before/shore-03.png) | [PNG](after/shore-03.png) | 69 | 69 |
| shore-04 | [PNG](before/shore-04.png) | [PNG](after/shore-04.png) | 98 | 98 |
| shore-05 | [PNG](before/shore-05.png) | [PNG](after/shore-05.png) | 107 | 107 |
| shore-06 | [PNG](before/shore-06.png) | [PNG](after/shore-06.png) | 3570 | 3561 |
| shore-07 | [PNG](before/shore-07.png) | [PNG](after/shore-07.png) | 16853 | 16842 |
| shore-08 | [PNG](before/shore-08.png) | [PNG](after/shore-08.png) | 1607 | 1605 |
| shore-09 | [PNG](before/shore-09.png) | [PNG](after/shore-09.png) | 64 | 64 |
| sedan-front | [PNG](before/sedan-front.png) | [PNG](after/sedan-front.png) | 7766 | 7693 |
| sedan-side | [PNG](before/sedan-side.png) | [PNG](after/sedan-side.png) | 1864 | 1843 |
| sedan-rear | [PNG](before/sedan-rear.png) | [PNG](after/sedan-rear.png) | 2513 | 2527 |
| van-front | [PNG](before/van-front.png) | [PNG](after/van-front.png) | 8246 | 8156 |
| van-rear | [PNG](before/van-rear.png) | [PNG](after/van-rear.png) | 1765 | 1785 |
| trim-old-fulton | [PNG](before/trim-old-fulton.png) | [PNG](after/trim-old-fulton.png) | 6884 | 6865 |
| trim-furman | [PNG](before/trim-furman.png) | [PNG](after/trim-furman.png) | 3715 | 3713 |
| trim-east | [PNG](before/trim-east.png) | [PNG](after/trim-east.png) | 4876 | 4876 |
| van-new-front | [PNG](before/van-new-front.png) | [PNG](after/van-new-front.png) | 7113 | 7067 |
| van-new-rear | [PNG](before/van-new-rear.png) | [PNG](after/van-new-rear.png) | 14681 | 14691 |
