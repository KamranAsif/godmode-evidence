Fresh-context confirmation - Critic A only

Evaluate candidate 49337f516 independently against the approved concept and fixed native constraints. No earlier score or review is provided here. Assess the 9.9 bar honestly; do not infer approval from this handoff.

Keep fixed: approved Weight recoil, #2313 smoothing, native ADS, viewmodel FOV 65, gun scale 1 and native arm lengths. Exclude the known gold/tan finish from the HIP framing score; it is a separate finish decision.

All HIP comparisons have the approved concept first. The stills are 1920x1080 plain exported Windows Playtest debug builds.

| Pose | Concept / main / R6 HIP | ADS main / R6 | Max RGB difference |
|---|---|---|---:|
| anchor | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/comparison-anchor-hip-d17501c59e.png) | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/comparison-anchor-ads-ff679a59cb.png) | 0 |
| avenue | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/comparison-avenue-hip-bde138456f.png) | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/comparison-avenue-ads-133fc58733.png) | 0 |
| park | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/comparison-park-hip-3e44c311cd.png) | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/comparison-park-ads-9588cd5564.png) | 0 |

ADS is pixel-identical at anchor, avenue and park: max difference 0, zero changed pixels. Differences use untouched native PNG RGB without resizing, alignment or colour correction. [Proof and binary hashes](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/ads-pixel-proof-a9ffb468bc.json).

Burst clips: [main normal](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/hip-burst-normal-1a58453400.mp4), [R5 normal](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/hip-burst-normal-5e23666f9e.mp4), [R6 normal](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/hip-burst-normal-99c87677d1.mp4), [R6 quarter speed](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/hip-burst-quarter-speed-9341588355.mp4). Each is a real 11-round HIP burst, ammo 30 -> 19, aimBlend 0. Normal clips are 10 seconds / 300 frames, continuously acquired with stable lead-in and no internal cuts; only 0.5 seconds of startup/tail were trimmed. R6 maximum acquisition interval after trimming: 51.6 ms, so cadence is not perfectly uniform.

Motion uses full-detail native Windows Game with a temporary read-only post-draw socket logger and the same 1100 ms bound fire input. Peak is rear-sight displacement from the settled baseline; accumulated travel uses a common 30 Hz window, -0.5 to +2.5 seconds around the first accepted shot. Behind-camera/nonfinite samples or pairs are omitted.

| Rear-sight metric | Main | R5 | R6 |
|---|---:|---:|---:|
| Peak, unbounded projection | 25,190 px | 1,200 px | 1,168 px |
| Accumulated travel, unbounded | 51,861 px | 7,241 px | 5,578 px |
| Peak, frame-clamped coordinates | 997 px | 767 px | 737 px |
| Accumulated travel, frame-clamped | 10,512 px | 6,313 px | 4,854 px |
| Settled drift | 0 px | 0 px | 0 px |

Main leaves the frame and passes behind the camera for one sampled frame, making unbounded projections very large. R5/R6 do not pass behind it. R6 is below main on both peak and accumulated metrics, including the frame-clamped checks; approved recoil was not reduced. [Plot](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/recoil-excursion-c69cd7e7da.png), [measurement and grip receipt](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/motion-summary-a3e659d18e.json).

Active-HIP timing, main -> R6: mean 11.835 -> 11.882 ms; median 11.830 -> 11.893 ms (+0.063 ms, +0.53%); p95 12.825 -> 12.869 ms; p99 13.036 -> 13.108 ms. High 1920x1080, zero enemies, paused Idle with support-arm solve active, exclusive uncapped timing/vsync off, 10-second warmup and 10-second window per build. One unbracketed pair cannot attribute the small difference. [Receipt](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/performance-summary-e2e740d339.json).

Return an overall HIP concept-match score /10 against 9.9, the weakest pose, and footprint/diagonal/forearm subscores. Rank the top 3 remaining feasible HIP-only fixes with pose or clip timestamp, ROI and smallest edit; mark a slot none if no meaningful gap remains. Preserve the fixed constraints above; do not request arm stretching or a weaker approved kick. Do not round up to meet the bar. End with 9.9 reached or another iteration needed.

Validation: build/lint/diff checks and 70 focused tests passed at captured head. All owned Godot closed and GPU released. [All individually uploaded frames, raw samples and receipts](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/evidence-index-bddda3c3ac.json). PR not opened; final pre-PR checks remain.
