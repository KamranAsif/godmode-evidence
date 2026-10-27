Gun HIP round 5 - Critic A only

Candidate c59501512, branch codex/gun-hip-concept-20261026; baseline main 858db7663. Prior R4 score from A: 9.0 (footprint 9.1, diagonal 9.2, forearm 8.6). Target: 9.9 from A. After reaching 9.9, a fresh-context confirmation is required before opening the PR.

R5 narrows R4 camera yaw by 2.8 degrees about the forward anchor, then lifts the HIP assembly 30 mm. Measured settled change versus R4: rear sight 72.7 px left; front sight 35.6 px higher with only 0.08 px horizontal change. CPU projection puts the handguard about 50 px higher. Support forearm adds 2.5 degrees axial roll; the R4 elbow-pole setting and native arm lengths are retained, with sampled wrist/finger grip restored. No extra elbow translation or stretching. Weight recoil, #2313 smoothing, ADS, FOV 65 and gun scale 1 are fixed.

Gold/tan finish is excluded from the framing score; its separate finish choice remains pending. Current stills are plain exported Windows Playtest debug builds, 1920x1080. The approved concept is the first column in every HIP comparison.

| Pose | Concept / main / R5 HIP | Concept / R4 / R5 HIP | ADS main / R5 | Max difference |
|---|---|---|---|---:|
| anchor | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/comparison-anchor-hip-8f0bb1fcdc.png) | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/comparison-r4-r5-anchor-hip-37b0a631ce.png) | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/comparison-anchor-ads-5e538a1458.png) | 0 |
| avenue | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/comparison-avenue-hip-041863da18.png) | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/comparison-r4-r5-avenue-hip-b33bd14813.png) | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/comparison-avenue-ads-9fd91d5305.png) | 0 |
| park | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/comparison-park-hip-8a569e53d8.png) | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/comparison-r4-r5-park-hip-7617740d23.png) | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/comparison-park-ads-af0e55361d.png) | 0 |

ADS is pixel-identical at all three poses: max RGB difference 0, zero changed pixels. Metrics use untouched native PNGs with no resizing, alignment or correction. [Proof and binary hashes](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/ads-pixel-proof-490a36f141.json).

Burst: [main normal](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/hip-burst-normal-73e159066b.mp4), [R5 normal](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/hip-burst-normal-472dc7d21f.mp4), [R5 quarter speed](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/hip-burst-quarter-speed-13197b80e4.mp4). Both normal clips are real 11-round HIP bursts, ammo 30 -> 19, aimBlend 0, 10 seconds / 300 frames, continuously recorded with stable lead-in and no internal cuts. Only 0.5 seconds of startup and tail were trimmed. Quarter-speed clip is 39.9 seconds / 300 retained frames. R5 maximum acquisition interval after trimming: 55.6 ms; cadence is not perfectly uniform.

The burst comparison uses full-detail native Windows Game runs with a temporary read-only post-draw socket logger. Both builds receive the same 1100 ms bound fire input. Peak displacement is measured from the settled rear-sight baseline; accumulated travel uses a common 30 Hz window from -0.5 to +2.5 s around the first accepted shot. Behind-camera pairs are omitted.

| Rear-sight metric | Main | R5 |
|---|---:|---:|
| Peak, unbounded projection | 25,190 px | 1,130 px |
| Accumulated travel, unbounded | 47,523 px | 6,147 px |
| Peak, coordinates clamped to frame | 997 px | 744 px |
| Accumulated travel, frame-clamped | 9,423 px | 5,496 px |
| Settled drift | 0 px | 0 px |

Main leaves the viewport and passes behind the camera for one sampled frame, making unbounded projections very large. R5 never passes behind the camera. R5 remains below main by both peak and accumulated metrics, including the frame-clamped checks; approved recoil was not reduced. [Plot](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/recoil-excursion-2e357ea537.png), [measurement receipt](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/motion-summary-f67a5eaafb.json).

Active-HIP timing, main -> R5: mean 11.789 -> 11.841 ms; median 11.798 -> 11.881 ms (+0.083 ms, +0.70%); p95 12.678 -> 12.892 ms; p99 12.952 -> 13.210 ms. High 1920x1080, zero enemies, paused Idle with the forearm solve/roll active, uncapped/vsync off, exclusive timing, 10 s warmup + 10 s measurement per build. This is one pair without a bracketing control; it cannot attribute the small difference to the pose change. [Timing receipt](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/performance-summary-733728890e.json).

Return an overall HIP concept-match score /10 against the 9.9 bar, the weakest pose, and subscores /10 for footprint, receiver/handguard diagonal and perspective, and support-forearm silhouette/grip plausibility. Rank the top 3 remaining feasible HIP-only fixes with pose or clip timestamp, ROI, and smallest edit; mark a slot none if no meaningful gap remains. Preserve native geometry/reach, wrist grip, arm lengths, Weight recoil, ADS, FOV and scale. Judge firing framing relative to main; do not request lowering the approved kick. Do not round up to meet the bar. End with 9.9 reached or another iteration needed.

Validation: CPU build, lint and 70 focused tests passed at captured head. All owned Godot closed and GPU released. Full pre-PR checks remain a later gate. [All individually uploaded frames, raw samples and receipts](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/evidence-index-6667f962ae.json).
