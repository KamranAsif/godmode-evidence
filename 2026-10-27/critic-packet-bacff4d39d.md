Round 4 HIP framing critic packet - critics A and B independently

Candidate 2022cbcb4, branch codex/gun-hip-concept-20261026, baseline main 858db7663. R3 scored A 8.0 / B 8.0; target remains 9.9 from both. Exclude the gold finish: that is a separate main bug, with finish choice still pending.

R4 changes: +5 degrees camera yaw and +9 degrees clockwise cant around the previous front-sight landmark. Native observed front sight remains approximately (0.6000, 0.5900); R3-to-R4 landmark shift is about 0.055 px. The native support-arm solve opens the elbow 4.1 cm camera-left while preserving arm lengths and the sampled wrist/finger grip. Review this natural-length shift; the user chose it over stretching to reach the earlier 8-15 cm suggestion. Scale 1 and viewmodel FOV 65 remain unchanged. Weight kick and #2313 smoothing are untouched.

Every HIP sheet is concept first, main second, R4 third. All stills are 1920x1080 plain exported Windows Playtest debug builds.

| Pose | Concept-first HIP | Main vs R4 ADS | Max RGB difference / changed pixels |
|---|---|---|---|
| anchor | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/comparison-anchor-hip-e90080fed9.png) | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/comparison-anchor-ads-a9384a9aae.png) | 0 / 0 |
| avenue | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/comparison-avenue-hip-5dd908407b.png) | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/comparison-avenue-ads-f2df313a6f.png) | 0 / 0 |
| park | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/comparison-park-hip-bfba1ddc15.png) | [PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/comparison-park-ads-9c0168a260.png) | 0 / 0 |

ADS is pixel-identical at all three poses: untouched native PNG RGB, no alignment, resizing or correction. [Proof and binary hashes](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/ads-pixel-proof-bdd178872f.json).

Burst clips: [main normal](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/hip-burst-normal-b62faf2fb8.mp4), [R3 normal](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/hip-burst-normal-d8dbdf82f3.mp4), [R4 normal](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/hip-burst-normal-5125408117.mp4), [R4 quarter speed](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/hip-burst-quarter-speed-4e15971e55.mp4). Each is a real 11-round HIP burst, ammo 30 -> 19, aimBlend 0. Normal clips are 10 seconds / 300 frames; quarter speed is 39.9 seconds. Continuous acquisition, stable lead-in, no internal cuts; maximum R4 acquisition interval after endpoint trimming was 69.135 ms, so sampling cadence is not perfectly uniform.

Burst motion was measured in full-detail native Windows Game runs using a temporary read-only post-draw socket logger. Each build received the same 1100 ms bound fire input at the locked anchor. Peak is rear-sight displacement from the settled baseline. Accumulated travel is a common 30 Hz sample window from 0.5 s before to 2.5 s after the first accepted shot; behind-camera pairs are omitted.

| Build | Peak displacement | Accumulated travel | Settled drift |
|---|---:|---:|---:|
| Main | 13,561 px | 28,553 px | 0 px |
| R3 | 656 px | 3,858 px | 0 px |
| R4 | 889 px | 6,135 px | 0 px |

Metrics use unbounded projected socket coordinates, including positions outside the 1920x1080 frame. Main leaves the frame and passes behind the camera for one sampled frame; R3/R4 never pass behind it. Main has the larger peak and accumulated excursion. Per the constraint, approved Weight recoil is unchanged; no added transform drift was found. [Plot](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/recoil-excursion-6f54b3f617.png), [method and raw-data index](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/motion-summary-fd93fc10dd.json).

Active-HIP performance, main -> R4: mean 11.826 -> 11.820 ms; median 11.846 -> 11.828 ms; p95 12.874 -> 12.886 ms; p99 13.139 -> 13.340 ms. High 1920x1080, zero enemies, paused Idle with R4 elbow solve active, uncapped/vsync off, exclusive timing, 10 s warmup + 10 s measurement. One window per build without a bracketing control: no added whole-frame cost resolved by this pair. [Receipt](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/performance-summary-0db0d58741.json).

Each critic should return an overall HIP concept-match score /10 against 9.9, the weakest pose, and subscores /10 for (1) front-landmark/lower-right footprint, (2) receiver-to-handguard diagonal and near-end perspective, (3) support-forearm silhouette and grip plausibility. Return ranked top 3 remaining framing gaps, each with pose or clip timestamp, ROI, and smallest HIP-only edit; mark a slot none if no meaningful gap remains. Judge firing motion relative to main and flag any added excursion, not a request to weaken the approved Weight kick. Preserve ADS, gun scale/FOV and native arm lengths. End with 9.9 reached or another iteration needed.

Validation: 70 focused tests passed; no blocking technical-review findings. Full pnpm test passed 10/11 tiers, with two Windows process-ownership failures in godot-cli; its entire tier then passed serially. All Godot closed and GPU released. [Complete evidence index, including every individually uploaded frame](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-27/evidence-index-b29df82c05.json).
