# BattleDuty facade variety comparisons

[Full labelled sheet](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/facets-variety-sheet.png) | [16 raw PNGs as ZIP](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/raw-frames.zip) | [Timing summary](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/summary.json)

![Overview](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/facets-variety-overview.jpg)

Each game cell is native 1920x1080. Raw filenames are `view-variant.png`. Columns are plain 1.2 m / V1 / V2 / V3 / concept reference. No PR yet; production choice pending.

| View | Labelled native row | plain | V1 | V2 | V3 | Concept crop |
| --- | --- | --- | --- | --- | --- | --- |
| 5m | [sheet](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/5m-sheet.png) | [plain](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/5m-plain.png) | [v1](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/5m-v1.png) | [v2](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/5m-v2.png) | [v3](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/5m-v3.png) | [reference](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/5m-concept.png) |
| 20m | [sheet](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/20m-sheet.png) | [plain](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/20m-plain.png) | [v1](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/20m-v1.png) | [v2](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/20m-v2.png) | [v3](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/20m-v3.png) | [reference](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/20m-concept.png) |
| shop | [sheet](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/shop-sheet.png) | [plain](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/shop-plain.png) | [v1](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/shop-v1.png) | [v2](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/shop-v2.png) | [v3](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/shop-v3.png) | [reference](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/shop-concept.png) |
| side | [sheet](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/side-sheet.png) | [plain](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/side-plain.png) | [v1](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/side-v1.png) | [v2](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/side-v2.png) | [v3](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/side-v3.png) | [reference](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/side-concept.png) |

[Raw-window readings and conditions](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/results.json) | [Frame hashes and crop rectangles](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/frames.json) | [Cache input proof](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/facets-variety-20261023/cache-input-proof.json)

# Facade variety study, 2026-10-23

Selection pending. Kamran chose the 1.2 m size with the note: "1.2 but it needs more variety...look at the concepts again". These are unselected map-wide generator rules. Production remains unchanged; no PR or release export is part of this choice study.

## Concept observations

Read the complete ART_STYLE.md, the 10-22 facet-size study, MESH_INTERSECTIONS.md, all five 10-08 world concepts, and the 10-12/R2 world comparisons. The latter use the same five concept images, rather than a new set of facade targets. The shop and intersection plaster is relatively quiet; the under-bridge concept 04 makes mixed triangular planes most explicit. Waterfront brick is quieter still. Tree/car facets are much stronger than most plaster facets and should not supply a wall contrast target.

- **Size on one wall:** concept 04's right wall mixes small triangles and broad, elongated planes, including beside the same window. With the nearby window opening assumed about 1.2 m wide, a visual estimate is roughly 0.3-0.8 m short edges alongside 1-2.5 m broad facets. These are scale estimates from a generated perspective raster, not measured mesh edges. Some apparent large regions are adjacent facets of similar tone. A useful generator hypothesis is a 4:1 range of nominal edge sizes, with a much wider area range, rather than one regular lattice at a smaller size.
- **Neighbour tones:** two manually selected same-plaster pairs in concept 04 have display-luminance differences of 3.1% and 4.5% relative to their pair mean. The 5x5 median RGB samples are (1570,40)=[154,120,94] versus (1565,95)=[151,116,90], and (1550,150)=[151,116,90] versus (1610,155)=[144,111,86]. Display luminance is 0.2126R+0.7152G+0.0722B, without linearizing sRGB. These sparse samples illustrate local value steps; they are not a global histogram or recovered albedo. Larger changes around openings include contact shadows and must not be attributed to facets.
- **Tilt:** the concepts retain straight wall silhouettes, crisp window cuts and quiet planes. They do not support bulging walls or displacement at apertures. Exact normal angles cannot be recovered from these lit rasters. Testing 4.3 degrees versus 8 degrees of shading-normal tilt is an implementation hypothesis, not a measured concept value.
- **Building and wall variation:** underlying plaster/brick colours and overall light exposure change between buildings and at corners. Local facet sizes vary within a wall. Existing building material assignments already provide the former. The study adds a deterministic plane-level tone offset for V1/V3: it can distinguish wall returns, and is consistent across cell batches and aperture cuts. Parallel coplanar buildings can share that offset; it is a wall-plane rule, not a recovered building-ID rule.
- **Storeys:** no convincing repeated per-storey reset or alternating stripe is visible. Broad facets pass across the height intervals between windows. The study therefore adds no floor bands.
- **Edges and corners:** tiny triangles occur near trim, openings and intersections of planes, alongside larger facets in the wall field. This does not establish a universal edge-density gradient. Clipping the varied lattice against the existing repaired source triangles supplies smaller boundary pieces without placing extra geometry over glass, doors or trim. No camera-dependent or hand-painted edge patches are added.
- **5 m versus 20 m:** the rasters do not encode actual camera distances. As a projection estimate at 1080 px height, vertical FOV 75, and a front-facing plane, a 1.2 m edge spans about 169 px at 5 m and 42 px at 20 m. A 0.6-2.4 m range spans about 84-338 px and 21-84 px respectively. At 5 m one should see individual planes and clean openings; at 20 m the broad/quiet patches and building identity should survive while fine pieces group together. Oblique foreshortening reduces these numbers.

## Candidate parameters

| Rule | Nominal edge sizes | Tone spread | Tilt cap | Jitter | Wall tone spread |
| --- | --- | ---: | ---: | ---: | ---: |
| plain | 1.2 m | 0.28 | 0.075 rad / 4.3 deg | 0.28 | 0 |
| V1: bold tone | 1.2 m | 0.85 | 0.075 rad / 4.3 deg | 0.28 | 0.24 |
| V2: mixed topology | 0.6 / 1.2 / 2.4 m | 0.28 | 0.075 rad / 4.3 deg | 0.60 | 0 |
| V3: combined | 0.6 / 1.2 / 2.4 m | 0.50 | 0.140 rad / 8.0 deg | 0.60 | 0.18 |

Tone is a full multiplicative gain spread around 1, not a display-pixel contrast percentage. Plain is 0.86-1.14; V1's per-facet gain is 0.575-1.425 before the wall's 0.88-1.12 multiplier; V3 is 0.75-1.25 before 0.91-1.09. V1 intentionally exceeds the quiet plaster target so the choice starts visibly bold. The unchanged production facade shader amplifies deviation from gain 1 by 2 for modeled wall palette slots, with a 0.2 minimum tint; these profile gains are therefore not final pixel or material-tint limits. This same material rule applies to every candidate, including plain. Normal tilt changes shading only; all positions stay on their source planes.

Mixed topology starts with a jittered 2.4 m parent lattice. Deterministic parent-region fractions are 30% unsplit, 60% split once, 10% split twice, yielding nominal 2.4/1.2/0.6 m regions on the same wall. Edge splits use fractions 0.35-0.65, producing unequal triangles rather than a regular nested grid. These are parent-area probabilities, not percentages of final triangles. Expected interior density is 4.3 leaves per parent versus 4 for plain 1.2 m (+7.5% before clipping). Exact native arena totals are checked against plain +10% during the study. A 100 x 100 m right-triangle wall fixture produces 8,694 plain triangles and 9,228 mixed triangles (+6.14%, including clipped boundaries). Its area-equivalent equilateral edge p10/p50/p90/p99 values are 0.974/1.179/1.317/1.414 m for plain and 0.469/0.940/1.546/2.768 m for mixed. These are fixture statistics, not concept measurements or native whole-arena counts.

All profiles use world geometry and a deterministic plane key. No camera, distance, view ID, per-view seed, material exposure change or lighting retune enters generation. The old 240 m near/far handoff and shading settle stay fixed. The source starts at main's #2213/#2216 intersection repairs, including the raised-base opening footprints and actual crown widths. This subdivision does not repair or waive the remaining source intersections recorded in the earlier audit.

## Method and reproduction

Fresh worktree from origin/main, patched revision-2 engine hash 0fd24b93f3a830e495a519cb6f4a56b5d5d8d64b5c6596f6a8d8ae88694c0e37. pnpm install, CLI rebuild, imports:seed and project import were run. The importer completed all resource outputs, then faulted during post-import cleanup; the CLI verified the outputs and completed successfully.

The attempted fresh live-generator audit stopped at its RAM guard when two peers' headless games reduced free physical RAM below 3 GiB (minimum observed 2.67 GiB). It produced no accepted captures or timings. Only the owned renderer was stopped; its partial chunk cache remains local. Its initial free RAM was 19.7 GiB.

Accepted evidence instead uses verified arena cache `0e4d9e9827c1ce127b8e7cc1fe1e518d73cdcef79768c004fa2bccaae34b695c`. Comparing every current map input to that receipt found only the two study-modified files, ground_facets.ts and western_block_pavement.ts. Both receipt hashes exactly match their original files at sampled main `5adf922cf`; every other map input matches current source. Thus the cached source includes the #2213/#2216 intersection repairs and approved V2 lighting. `cache-input-proof.json` retains these checks. No older geometry is silently substituted.

The existing native visual-copy helper packed and verified 16,538 visual nodes with their transforms, meshes, materials and lighting unchanged, omitting 363,939 physics nodes. The first trim attempt lacked its output directory; the directory was created and the successful second copy verified/saved with error 0. The native dummy renderer reports resource/RID cleanup leaks on trim exit; the accepted copy itself passed the visual equality check. This is a still-image/render-cost fixture, not a gameplay or release verification.

Reproduce after preparing this worktree and restoring that matching verified cache: create artifacts/facet-study, run arena_mesh_audit.tscn headless/full with GODMODE_MESH_AUDIT_TRIM=1, then clear that environment override. Under an owned exclusive timing hold, run:

```powershell
node tools/maps/measure-facet-variety.mjs --captures
```

The tool starts and stops exactly one rendered full-detail fixture. It applies the same production groundFacetMesh generator rules to every architectural near mesh, from the saved arena's original far sources. LODs, compact opaque shadow buffers and shared culling bounds retain production preparation. Packed-float32 source planes can introduce tiny topology-count differences from the earlier live-source study. This publishes no prebuilt arena or release receipt.

The first two cameras are byte-for-byte poses from facade-study-views.json (5 m / 20 m, FOV 75). Shop and side-street cameras are the calibrated 03/05 concept poses (FOV 55 / 70). Every raw game cell is native 1920x1080. Concept images are explicitly reference crops/scales, not native game frames. Labels sit outside game pixels on the sheets.

Sequence: plain / V1 / plain / V2 / plain / V3 / plain. Each 5 m / 20 m window discards 5 seconds and measures 10 seconds. Captures, normal/ADS renderer counters and mesh generation happen outside timed windows. Paired deltas subtract the mean of the two adjacent plain medians. One variant window per view is exploratory; differences inside the control drift are inconclusive. This is a zero-enemy visual fixture with physics omitted, not a combat benchmark. Full detail, native scale 1, SMAA, no TAA/FSR2, D3D12 Forward+, RX 9070 XT, no frame profiler or recording, uncapped with vsync off under the timing hold.

## Results

All 16 game frames decoded at native 1920x1080, with SHA-256 hashes in frames.json. The 9600x4736 labelled sheet retains every game cell at native size, and separate per-view sheets make close comparison easier. Concept cells are explicitly resampled references. All 14 timed windows have no CLI caveats. The owned renderer stopped and its timing hold was released.

| Rule | Near architecture triangles | Change vs plain | 5 m median | 20 m median | Paired delta 5 m / 20 m |
| --- | ---: | ---: | ---: | ---: | ---: |
| plain | 6,761,315 | +0.00% | 6.434 ms | 6.616 ms | control |
| v1 | 6,761,315 | +0.00% | 6.494 ms | 6.632 ms | +0.0795 ms / +0.0275 ms |
| v2 | 6,676,716 | -1.25% | 6.420 ms | 6.613 ms | -0.0140 ms / -0.0080 ms |
| v3 | 6,676,716 | -1.25% | 6.507 ms | 6.659 ms | +0.0705 ms / +0.0395 ms |

Plain medians above are the median of four control-window medians. Control ranges were 0.040 ms at 5 m and 0.033 ms at 20 m. V2 differences are inside those ranges. V1/V3 show small close-view increases; each variant still has only one window per view, so these are exploratory observations rather than repeatability claims. Raw samples and every window receipt are retained beside summary.json and results.json.

The triangle counts cover all near architecture, not every prop/ground triangle in the arena. All four candidates retain 237 architecture surfaces. One-off whole-camera counters were 294 draw calls at 5 m and 1,510 at 20 m for every variant; shadow primitives/calls stayed fixed within each view. Native automatic LOD generation can retain different levels after a colour/normal change; that is why V1/V3 camera primitive counters rise despite identical full-detail topology. MultiMesh counter limitations from PERF.md still apply. These counters were sampled outside timing windows.

The native counter helper reports the logical get_visible_rect size of 1280x720 under the project's canvas_items stretch. The root window/frame engine size and all unresized PNGs are 1920x1080; 3D scale is 1.0. No game cell was enlarged by composition.

Visual assessment: V1 visibly overshoots the quiet concept plaster and is useful as the bold contrast bound. V2 gives broad quiet planes beside small facets with the baseline tone. V3 is the stronger combined candidate: mixed sizes, wall-level tone shifts and more light response, clearly legible at both distances without V1's deepest patches. Its triangle count is 1.25% below plain because reduced boundary-clipping overhead outweighs the fine regions. The concepts remain quieter and less orange than this lighting/material state; only facet rules vary in this comparison. No window, doorway, trim or surveyed position is displaced.

Validation: pnpm build, pnpm lint (11 existing file-length warnings, no errors), targeted Prettier checks, and all 12 ground-facet tests passed. Tests include mixed-size area/plane coverage, no extension across aperture cuts, deterministic generation and a representative density bound. Resource import and native visual-copy equality passed. Full pnpm test and a Windows Playtest export are deferred until a production choice/PR; no PR has been opened.
