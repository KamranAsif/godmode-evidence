Gun HIP round 7 - Critic A

Target: 9.9 from A followed by an independent fresh-context confirmation before PR. Kamran requested removal of the prior cant.

R7 removes HIP cant deterministically from the native sight-post +Y axes. The camera basis is yaw-only at -3.807747516 degrees; pitch and roll are zero. R6 translation remains [0.061894215, 0.052676249, -0.091243536] metres, retaining its 30 mm lift. Leveling pitch as well as roll is necessary for both off-axis sight posts to project vertically. CPU build, lint and 70 focused tests pass. CPU asset-derived test tolerance is 1e-6 radians (~0.000057 degrees); it passes. Native settled camera-up is [2.235e-8, 1, 0] at both sockets. A finite 30 mm endpoint sampled in global world coordinates has up to 0.077 px horizontal drift over a 96.31 px vector (max 0.0457 degrees); this float endpoint measurement is supplied separately from the camera-local axis proof. The fixed translation means the front landmark moves [-7.78, -84.25] px from R6. This shift is disclosed for review, not compensated by an unrequested translation.

Candidate 321b014a7; main 3f039e6f9; R6 49337f516. All HIP/ADS comparisons show the approved concept first, then main, R6 and R7. Each game frame is 1920x1080; comparison columns are downsampled only for display. Individually uploaded untouched source frames are linked in the evidence index.

Current art direction: the rifle must be upright, with iron-sight post up axes vertical on screen, perpendicular to the floor, at settled HIP. This replaces the previous clockwise-cant direction. The reference still supplies the footprint, depth and support-arm target; do not restore cant to chase its diagonal.

Keep fixed: R6 position/lift, approved Weight recoil and #2313 smoothing, native ADS, FOV 65, gun scale 1 and native arm lengths. Support forearm/grip settings are unchanged. Exclude the known gold/tan finish from HIP framing assessment; it is a separate finish choice. No stretch, hidden arms or ADS eye-relief override.

| Pose | Concept / main / R6 / R7 HIP | Concept / main / R6 / R7 ADS | R7 sight-up overlay | Max ADS channel difference |
|---|---|---|---|---:|
| anchor | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/comparison-anchor-hip-3a56b68997.png) | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/comparison-anchor-ads-3443f74ce9.png) | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/r7-anchor-sight-up-overlay-df6418c34a.png) | 0 |
| avenue | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/comparison-avenue-hip-858a158989.png) | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/comparison-avenue-ads-c12ff1a3b7.png) | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/r7-avenue-sight-up-overlay-dcb2ae4b22.png) | 1 |
| park | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/comparison-park-hip-9cdee8fcb2.png) | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/comparison-park-ads-5a363fae83.png) | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/r7-park-sight-up-overlay-60904d7b63.png) | 0 |

ADS main versus R6 and main versus R7: maximum channel difference 1 across the three poses, on untouched PNG RGB with no registration or resampling. Per-pose counts are in the proof. [Proof with exported binary hashes](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/ads-pixel-proof-4e9ee33101.json).

Avenue is not pixel-identical in this pass: R6 differs in 5 pixels and R7 in 4 pixels, each by 1 in one RGB channel; anchor and park have zero changed pixels. Camera, lighting and DOF receipts match. An older frame from the same R6 binary matches current main exactly, suggesting run/capture variation, but the cause is unconfirmed. A repeat could not be acquired because shared slots were full and Windows process enumeration failed while queued. No filtering or image replacement hides the discrepancy. [Repeat status](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/repeat-check-50649c4bdb.json).

Burst: [MAIN normal](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/hip-burst-normal-1a58453400.mp4), [R6 normal](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/hip-burst-normal-99c87677d1.mp4), [R7 normal](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/hip-burst-normal-658b27192a.mp4), [R7 quarter speed](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/hip-burst-quarter-speed-10440c1aa7.mp4). Each is a real 11-round HIP burst (ammo 30 -> 19, aimBlend 0), recorded continuously with stable lead-in; normal clips are 10 seconds / 300 frames, with no internal edits. Recording starts/tails were trimmed by 0.5 seconds only. Shared GPU capture is not a performance measurement.

| Rear-sight excursion | Main | R6 | R7 |
|---|---:|---:|---:|
| Peak, unbounded projection | 25,189.8 px | 1,168.2 px | 1,250.8 px |
| Accumulated travel, unbounded | 51,860.6 px | 5,577.8 px | 8,147.7 px |
| Peak, frame-clamped coordinates | 997.4 px | 737.2 px | 733.6 px |
| Accumulated travel, frame-clamped | 10,512.4 px | 4,853.5 px | 6,462.8 px |
| Settled drift | 0.0 px | 0.0 px | 0.0 px |

Main/R6 burst recordings and telemetry are reused from round 6 (main 858db7663, R6 49337f516); R7 is newly recorded. Current main 3f039e6f9 differs only by ignored archived tool art, with no runtime changes. Excursion uses identical 1100 ms bound fire input at the locked anchor. Peak is rear-sight displacement from the settled baseline; accumulated travel is measured on a common 30 Hz grid from -0.5 to +2.5 seconds around the first accepted shot. Behind-camera/nonfinite samples or pairs are omitted. Main can project far outside the frame, so frame-clamped values are supplied too. [Plot](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/recoil-excursion-c1c3c52f98.png), [raw samples and sight-up measurements](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/motion-summary-bacd79882a.json).

Acquisition intervals (maximum, retained 10-second clip): MAIN 50.8 ms, R6 51.6 ms, R7 58.7 ms. The encoder keeps the continuous timeline; this states actual capture cadence rather than claiming every acquired interval is exactly 33.3 ms. No frame-time comparison was run.

[All frames and receipts](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/evidence-index-b5a7bb2e38.json). All owned Godot processes closed and capture hold released. PR remains gated on art review, a fresh-context confirmation and final pre-PR checks. The avenue pixel-exact proof remains unresolved.

Return an overall HIP-match score /10, weakest pose, and footprint/upright-sight/forearm subscores. Rank the top 3 feasible remaining HIP-only fixes, each with pose or clip timestamp, ROI and smallest edit; mark a slot none if no meaningful gap remains. Inspect grip plausibility, support forearm, front/rear sight up axes and burst excursion. Respect the fixed constraints; do not recommend restoring cant or reducing approved recoil.

Judge the 9.9 bar honestly. End with bar reached or another iteration needed.
