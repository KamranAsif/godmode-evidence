# BattleDuty A/B/C look-dev - 2026-10-22

36 complete native comparison sheets: Panini plus all 19 try and 16 optional/optional_expensive experiments. FSR2 is blocked by Kamran after repeated AMD driver recoveries. No PR or game change was published.

All normal sheets have A/B/C columns and Shop, Facade, Bridge, Fight, Side street and Wide rows. Cells are untouched 1920x1080 renders, seed 0x43BA771E, FOV 75. Panini adds D at plain FOV 70 and a HUD diagnostic row. A keeps the requested V2 lighting and material-override fix. Actors are frozen within each view; identical A captures are reused within a batch. The fight view stages 12 riflemen.

- [Panini A/B/C/D](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/panini-six-views-1b1bb4f322.png): A current; B 0.3; C 0.7; D plain FOV 70. The world-only pass leaves arms and HUD unwarped. The center crosshair stays fixed; off-center world markers need matching projection to follow warped targets.
- [FSR2 incident and crash diagnosis](https://github.com/KamranAsif/godmode-evidence/blob/main/video-audit-20261022/fsr2-incident-961722f373.md): blocked; no complete comparison or valid timing set. No further FSR2 runs in any mode were made after Kamran stopped this work.
- [Native SMAA motion reference, A only](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/fsr2-motion-a-82bce15ac2.gif): two seconds at 30 frames/s. FSR2 B/C clips are blocked.
- [Full settings and source-video timestamps](https://github.com/KamranAsif/godmode-evidence/blob/main/video-audit-20261022/executed-settings-c5ba90924d.json).

## Try experiments

- 1. [Material response](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/material-response-six-views-2a7970bc33.png): Absolute paint/metal/wood roughness: B 0.64/0.60/0.85; C 0.52/0.45/0.78. A retains heterogeneous source values.
- 2. [Gradient grade](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/gradient-grade-six-views-bea72c8c10.png): Pinned graph gradient lookup isolated in one pass; B 6%, C 14%.
- 3. [Local reflection probe](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/local-reflection-probe-six-views-ed19dac066.png): One grounded Shop-frontage probe, intensity B 0.35 / C 0.70; placement approved by Kamran.
- 4. [Exposure](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/exposure-six-views-5fc37b06f0.png): Exposure A 0.70, B 0.73, C 0.78.
- 5. [Tone curve](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/tone-curve-six-views-1d98066717.png): AgX contrast A 1.15, B 1.20, C 1.30.
- 6. [Main temperature](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/main-temperature-six-views-091556e5f3.png): Overall source color transform A 4500, B 4400, C 4200; lower values warm this graph.
- 9. [Main contrast](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/main-contrast-six-views-2ef4a042c2.png): Environment adjustment contrast A 1.08, B 1.10, C 1.14.
- 10. [Main saturation](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/main-saturation-six-views-8f8aa9d703.png): Environment saturation A 1.08, B 1.11, C 1.16.
- 11. [Zoned temperature](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/zoned-temperature-six-views-8f5cf99867.png): Cooler shadows / warmer highlights; B +2/-1 and C +5/-3 on the source graph sliders.
- 13. [Zoned brightness](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/zoned-brightness-six-views-bc30411626.png): Shadow brightness B 1.03 / C 1.08; mids and highlights stay at 1.
- 16. [Sky backdrop](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/sky-backdrop-six-views-f5be7670f9.png): Panorama energy / blue: A 1.60/0.90, B 1.50/0.85, C 1.35/0.75.
- 17. [Sky radiance](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/sky-radiance-six-views-9577941aa2.png): Sky reflection cubemap size A 128, B 256, C 512.
- 18. [Key fill balance](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/key-fill-balance-six-views-ce5f6338a3.png): Ambient fill A 0.75, B 0.70, C 0.60.
- 19. [Ssao](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/ssao-six-views-1c4020cdfb.png): Radius/intensity: A 3/5, B 2.5/5, C 2/6; power stays at 2.
- 20. [Ssil](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/ssil-six-views-ea43638e5a.png): Screen-space bounce intensity A 2.70, B 2.85, C 3.10.
- 21. [Distance fog](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/distance-fog-six-views-a39ffb6743.png): Density / aerial perspective: B 0.00012/0.06, C 0.00020/0.10; sky affect stays at 0.
- 26. [Sun softness](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/sun-softness-six-views-c9989600b9.png): Angular size / shadow blur: B 0.40/1.15, C 0.50/1.35.
- 35. [Debanding](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/debanding-six-views-96d7d984fc.png): A off; B and C both on. This boolean has no stronger C value in the supplied spec.
- 36. [Glow](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/glow-six-views-389b5c134b.png): Intensity A 0.12, B 0.16, C 0.24; threshold 2.2 and no bloom boost.

## Optional experiments

- 7. [Main green tint](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/main-green-tint-six-views-b775201118.png): Overall green tint slider B -1 / C -3.
- 8. [Main brightness](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/main-brightness-six-views-366b344bfa.png): Environment brightness A 1.00, B 1.02, C 1.05.
- 12. [Zoned tint](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/zoned-tint-six-views-89d3dd903a.png): Shadow green tint B -1 / C -3; mids and highlights unchanged.
- 14. [Zoned contrast](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/zoned-contrast-six-views-765887a82f.png): Midtone contrast B 1.03 / C 1.08; shadows and highlights unchanged.
- 15. [Zoned saturation](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/zoned-saturation-six-views-15ff8e61ec.png): Highlight saturation B 0.95 / C 0.85; shadows and mids unchanged.
- 22. [Volumetric fog](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/volumetric-fog-six-views-60a8083ff8.png): One 24x6x24 m box under the bridge, density B 0.001 / C 0.003; global density 0. B is effectively unchanged in these views; C is faint.
- 23. [Light shafts](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/light-shafts-six-views-4296eb4b21.png): Same B fog volume with sun volumetric energy B 1.5 / C 3.0; other lights muted for this test. No meaningful visible beam response at the supplied fog density.
- 24. [Ssr](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/ssr-six-views-a16ae9a703.png): Screen-space reflections enabled with B 32 / C 64 ray steps.
- 27. [Cascade distribution](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/cascade-distribution-six-views-ebc4f1b327.png): Second directional shadow split B 0.17 / C 0.20; other splits retain V2.
- 28. [Practical pools](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/practical-pools-six-views-de2f74f41b.png): Existing WesternPractical lights at energy B 2.5 / C 3.0; shadows remain off.
- 29. [Shadow bias](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/shadow-bias-six-views-8617310a2f.png): Sun bias / normal bias: B 0.04/1.2, C 0.035/1.0.
- 32. [Screen effect quality](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/screen-effect-quality-six-views-d026f38caf.png): B High SSAO at full resolution and High SSIL at half resolution; C Ultra both at full resolution.
- 33. [Anti aliasing](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/anti-aliasing-six-views-36bd0b6425.png): SMAA retained; add B 2x / C 4x MSAA. No FSR2.
- 34. [Anisotropic filtering](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/anisotropic-filtering-six-views-835f5d3fd2.png): Fresh processes at A 4x, B 8x, C 16x anisotropic filtering. Compare static oblique surfaces; fight actor poses vary between processes.
- 38. [Sharpen](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/sharpen-six-views-5e23a9fa63.png): Source blur amount B -0.10 / C -0.25 with centered strength 0.75.
- 42. [Vignette](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/video-audit-20261022/vignette-six-views-8f4e00d2bf.png): Source vignette strength B 0.05 / C 0.12.

## Timing and execution notes

Main versus V2 uses a matched code snapshot for PR #2209, three interleaved repeats per variant, one exclusive timing hold per run. Full 2560x1440, SMAA, FOV 75, seed 0x43BA771E, uncapped and VSync off; profiling and per-frame engine statistics off. Fight uses the standard 65-enemy benchmark; street and bridge use 16 enemies. Shader/native arena caches are retained.

Captures use the requested V2 snapshot b3b709f67 plus the material-override fix. Timing isolates the V2 lighting changes on main c210195fb using V2 749cf090c. All runs share the same verified arena and measurement harness.

The complete pinned Ultimate shader at neutral produced byte-identical Shop PNGs in A/neutral/A controls. Uninstrumented static-Shop medians were 11.019 / 11.112 / 10.984 ms; the neutral graph added about 0.11 ms versus the surrounding controls in this one diagnostic. This is a whole-frame static view result.

The gradient trial isolates the pinned graph lookup using HSV value (maximum RGB), matching generated source rather than the audit report wording about luminance. Other source-graph sliders use the full graph with all other uniforms neutral. The MIT source is [Godot-4-Color-Correction-and-Screen-Effects, c8b16be](https://github.com/ArseniyMirniy/Godot-4-Color-Correction-and-Screen-Effects/tree/c8b16be48448f6aca056f1c240f1804f288a9e65).

The approved probe is at (-411, -14.14901, -400), grounded 3 m above the Shop frontage. The supplied far-away anchor was intentionally replaced with this approved location. Material options set absolute roughness; for example, source wood is 0.62 and becomes rougher at 0.85/0.78. A retains the source materials.

Raw engine logs remain local because they can contain runtime service tokens. The final local archive includes native captures, receipts, timing reports and reproduction tools. Worktrees and owned sessions are removed after completion.

Verification: all 630 experiment cells and 28 Panini/HUD cells match their native source PNGs pixel-for-pixel. Camera poses, FOV, native SMAA controls, candidate readbacks and restored V2 lighting were checked before upload.

[Timing report with all per-run medians and receipts](https://github.com/KamranAsif/godmode-evidence/blob/main/video-audit-20261022/timing-summary-b71a679962.json).

Each statistic below is the median of that statistic across three runs. Values are milliseconds.

| Scenario | Main p50 / p95 / p99 | V2 p50 / p95 / p99 | V2 p50 change |
| --- | ---: | ---: | ---: |
| firefight-65 | 15.35 / 18.93 / 20.59 | 15.89 / 19.63 / 20.99 | +0.54 ms |
| shopping-street | 10.59 / 13.64 / 14.58 | 11.20 / 14.22 / 15.09 | +0.62 ms |
| under-bridge | 17.94 / 20.20 / 27.74 | 18.68 / 21.41 / 38.25 | +0.74 ms |
