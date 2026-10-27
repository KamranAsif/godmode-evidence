# Arena GPU pass costs and setting ablations, 2026-10-27

Opaque, depth prepass and shadow-map work account for about 81-83% of GPU frame time across the three requested poses. No production settings were changed.

Windows RX 9070 XT / Ryzen 7 9800X3D; pinned GodotJS 4.6.1 V8-nopc-2; exported Windows Playtest debug; frozen main e0bc87e1a plus the same private measurement overlay and original verified arena used for the earlier 7-14 ms results. A/B merges are absent. High, actual 2560x1440 3D viewport, SMAA, VSync off, unlimited FPS, exclusive timing hold, no simultaneous capture/import/export.

These are static benchmark camera poses with ZERO living enemies, not the 65-enemy gameplay workload or active firefights. Pipeline compilation counters changed by zero in all 58 measured windows (51 clean, 3 baseline GPU and 4 confirmation GPU). Every run restored its settings and stopped its process.

## Baselines

| Measure | Intersection | Under bridge | Firefight |
| --- | ---: | ---: | ---: |
| Clean whole-frame median | 14.06 ms | 13.68 ms | 13.06 ms |
| Range of 9 baseline medians | 14.02-14.08 ms | 13.66-13.72 ms | 13.02-13.08 ms |
| Profiled GPU frame timestamp | 14.13 ms | 13.80 ms | 13.16 ms |

GPU task times below are means of complete one-second print intervals inside the measured window (5 accepted intervals per baseline). Percentages use the reported total-GPU frame timestamps; they are approximate. GPU time and CPU/frame time overlap and must not be added. Godot suppresses tasks below 0.01 ms; an absent marker alone is not proof of zero cost.

## Full GPU breakdown

| GPU task | Intersection ms (% GPU frame) | Under bridge | Firefight |
| --- | ---: | ---: | ---: |
| Opaque | 5.28 (37.4%) | 4.87 (35.3%) | 4.29 (32.6%) |
| Depth prepass | 4.19 (29.6%) | 3.95 (28.6%) | 3.44 (26.1%) |
| Shadow-map work / setup | 2.17 (15.4%) | 2.60 (18.8%) | 2.95 (22.4%) |
| SSAO compute | 0.45 (3.2%) | 0.45 (3.2%) | 0.46 (3.5%) |
| SSIL compute | 0.40 (2.8%) | 0.40 (2.9%) | 0.41 (3.1%) |
| Prepare depth for SSAO/SSIL | 0.05 (0.4%) | 0.05 (0.4%) | 0.05 (0.4%) |
| SSIL/SSR final framebuffer copy | 0.12 (0.9%) | 0.12 (0.9%) | 0.13 (1.0%) |
| Glow | 0.29 (2.1%) | 0.30 (2.1%) | 0.30 (2.2%) |
| SMAA | 0.27 (1.9%) | 0.25 (1.8%) | 0.27 (2.0%) |
| Tonemap | 0.19 (1.4%) | 0.19 (1.4%) | 0.20 (1.5%) |
| UI: CanvasItems | 0.33 (2.4%) | 0.34 (2.5%) | 0.34 (2.6%) |
| UI: canvas tree span | 0.04 (0.3%) | 0.04 (0.3%) | 0.04 (0.3%) |
| Transparent 3D | 0.04 (0.3%) | 0.03 (0.2%) | 0.05 (0.4%) |
| SDFGI | disabled | disabled | disabled |
| Volumetric fog | disabled | disabled | disabled |

The environment confirms SSAO/SSIL/glow enabled, SDFGI and volumetric fog disabled, ordinary fog enabled, and one shadow-enabled light. Ordinary fog is shader work within 3D passes; no independent volumetric pass is present. The shadow row combines Godot's Render Shadows and Render OmniLight Shadows timestamp spans, including setup; it does not imply an active omni-shadow light. Secondary viewport and weapon work are included in engine-wide timestamp groups.

## Clean whole-frame removal ceilings

Each cell is milliseconds saved / percent of its adjacent-baseline mean. Eight-second windows, four seconds settling per change, all counters checked outside the timed frame loop. One bracketed observation per setting/pose; these are not confidence intervals or additive promises.

| Ablation | Intersection | Under bridge | Firefight |
| --- | ---: | ---: | ---: |
| no-shadows | 2.19 / 15.6% | 2.52 / 18.4% | 2.95 / 22.6% |
| no-ssao | 0.46 / 3.3% | 0.47 / 3.4% | 0.48 / 3.7% |
| no-ssil | 0.54 / 3.9% | 0.55 / 4.0% | 0.55 / 4.2% |
| no-ao-il | 3.13 / 22.3% | 3.03 / 22.2% | 2.73 / 20.9% |
| no-glow | 0.33 / 2.4% | 0.33 / 2.4% | 0.34 / 2.6% |
| no-smaa | 0.16 / 1.1% | 0.17 / 1.2% | 0.16 / 1.2% |
| no-ui | 0.24 / 1.7% | 0.25 / 1.8% | 0.26 / 2.0% |
| half-resolution | 1.97 / 14.0% | 1.96 / 14.3% | 1.95 / 15.0% |

Half-resolution is 0.5 on each 3D axis (75% fewer pixels); output/UI stay at 1440p. Its modest whole-frame saving suggests geometry/vertex/submission work is a better next target than output-resolution reduction alone. That is an inference, not a per-source mesh attribution.

## Causal check at intersection

A separate GPU-profiled run checked baseline, both SSAO/SSIL off, shadows off, and half resolution. It is for attribution, not the headline saving.

| Variant | Depth GPU ms | Opaque GPU ms | Shadow-map GPU ms | SSAO+SSIL compute ms | Total GPU ms |
| --- | ---: | ---: | ---: | ---: | ---: |
| baseline | 4.24 | 5.34 | 2.18 | 0.87 | 14.22 |
| no-ao-il | 2.22 | 5.23 | 2.16 | 0.00 | 10.96 |
| no-shadows | 4.23 | 5.20 | 0.00 | 0.87 | 11.95 |
| half-resolution | 3.72 | 4.67 | 2.16 | 0.50 | 12.29 |

Both SSAO and SSIL off remove about 2.02 ms from depth alone (4.24 -> 2.22 ms), plus their compute and framebuffer preparation/copy work. Turning only one off retains the expensive shared normal prepass. A lower compute quality is therefore not entitled to the joint 2.73-3.13 ms clean ceiling.

## Ranked next work; no implementation

1. Opaque (4.29-5.28 ms, 32.6-37.4% GPU frame): isolate mesh/vertex and material workloads, then use source mesh simplification and map-wide LODs at unreadable distances. Half-resolution reduces opaque by only about 13% in the confirmation, supporting a geometry/vertex focus. Preserve materials and authored AO; use matched play-distance/ADS checks. No measured gain is promised for a particular asset family. Coarser batching is already rejected by A/B evidence.
2. Depth prepass (3.44-4.19 ms, 26.1-29.6%): reducing the same geometry helps both depth and opaque. Removing SSAO and SSIL together has a 2.73-3.13 ms whole-frame ceiling, but loses contact shading and screen-space bounce; retain as a lower-quality-preset option for Kamran, not an identical-look optimization. Individual removal saves only 0.46-0.55 ms.
3. Shadow maps (2.17-2.95 ms, 15.4-22.4%): measure shadow-only LODs, unnecessary small/far caster removal, atlas/distance/cascade choices as separate candidates. All-shadows-off saves 2.19-2.95 ms and destroys lighting structure; smaller approved changes get only a fraction of that ceiling. Occlusion culling the camera pass is not evidence of shadow-pass savings.

Glow removal saves 0.33-0.34 ms, SMAA 0.16-0.17 ms, and UI 0.24-0.26 ms. These do not explain the heavy poses; preserve them ahead of expensive geometry work. SDFGI/volumetric-fog toggles cannot save an already disabled feature. No Mac or 8 GB memory/playability gain was measured here.
