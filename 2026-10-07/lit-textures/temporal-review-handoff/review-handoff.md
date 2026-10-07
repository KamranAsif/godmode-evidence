# Continuous temporal review handoff

ALL PASS is held. These twelve original clips are the complete required review set. No further GPU capture is needed to resolve the auditor's capability gap.

1. Identify reviewer and video-capable playback method; no decoded-still or metadata-only verdict.
2. Watch all twelve named original MP4s completely, at native 1920x1080 pixels and normal 1x speed.
3. Record per-path main/candidate PASS or FAIL for shimmer, temporal grid, seams and detail stability.
4. Report every defect with clip time and image location, plus any playback stalls or coverage limits.
5. Reference exact immutable evidence commits and SHA256 hashes. No temporal waiver.

Download originals and verify their SHA256 hashes. Play at 100% native pixels without downscaling or upscaling, normal 1x speed, from start through end. Complete verdict-template.json; only an actual human or continuous-video-capable reviewer may enter PASS.

| Path / label | Original MP4 | SHA256 | Captured elapsed time | Largest capture gap |
| --- | --- | --- | --- | --- |
| tree-close / main | [main-motion-tree-close.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/6a67de7fe0fb79d77465dfae5d07599135cfeea7/2026-10-06/lit-textures/v4-crop-recovery/main-motion-tree-close.mp4) | `d1d7e7a4be6e996643b79c51eda4eb5353a6ebc1adbfee487fec0aad0982c65c` | 5.019 s | 221.364 ms |
| tree-close / candidate | [candidate-motion-tree-close.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/6a67de7fe0fb79d77465dfae5d07599135cfeea7/2026-10-06/lit-textures/v4-crop-recovery/candidate-motion-tree-close.mp4) | `1ed5946e6515baece56cd637eb8a9de35d5103bcb28636b4d7dbe8c49808f0fc` | 5.009 s | 178.028 ms |
| tree-mid / main | [main-motion-tree-mid.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/6a67de7fe0fb79d77465dfae5d07599135cfeea7/2026-10-06/lit-textures/v4-crop-recovery/main-motion-tree-mid.mp4) | `81ea17f58eec33b3579f72da88b499fa8ffbc42faf10194fb8dc816b9e5dd02f` | 5.013 s | 211.776 ms |
| tree-mid / candidate | [candidate-motion-tree-mid.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/6a67de7fe0fb79d77465dfae5d07599135cfeea7/2026-10-06/lit-textures/v4-crop-recovery/candidate-motion-tree-mid.mp4) | `56ff6f5728f750937d334709532f52c7829e4668e91de9ee2bcd883e6aa4e3ec` | 5.003 s | 134.973 ms |
| tree-far / main | [main-motion-tree-far.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/6a67de7fe0fb79d77465dfae5d07599135cfeea7/2026-10-06/lit-textures/v4-crop-recovery/main-motion-tree-far.mp4) | `d5782982ec4655c10738fdd059cd579a61821bb7aada51a01a228eb99ae0391f` | 5.041 s | 299.716 ms |
| tree-far / candidate | [candidate-motion-tree-far.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/6a67de7fe0fb79d77465dfae5d07599135cfeea7/2026-10-06/lit-textures/v4-crop-recovery/candidate-motion-tree-far.mp4) | `6aedd5d48542ac7a4c4f60121208c4b3d7af96c04e45197c920f51c13d8a9155` | 5.007 s | 88.295 ms |
| car-close / main | [main-motion-car-close.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/6a67de7fe0fb79d77465dfae5d07599135cfeea7/2026-10-06/lit-textures/v4-crop-recovery/main-motion-car-close.mp4) | `a9bd166df057a285cdb5c113e3c8aafea88fb8a94d1b369ebbb553effb36657e` | 5.023 s | 185.605 ms |
| car-close / candidate | [candidate-motion-car-close.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/6a67de7fe0fb79d77465dfae5d07599135cfeea7/2026-10-06/lit-textures/v4-crop-recovery/candidate-motion-car-close.mp4) | `94fa912987fe4641487d227ed162a365ce2859158dcd263648324567533dd616` | 5.036 s | 201.063 ms |
| car-mid / main | [main-motion-car-mid.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/6a67de7fe0fb79d77465dfae5d07599135cfeea7/2026-10-06/lit-textures/v4-crop-recovery/main-motion-car-mid.mp4) | `99ef73596ab0dfb6feff07ab971110ef8ad4b387b86f34f55d5211adcd6f6abe` | 5.038 s | 207.418 ms |
| car-mid / candidate | [candidate-motion-car-mid.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/6a67de7fe0fb79d77465dfae5d07599135cfeea7/2026-10-06/lit-textures/v4-crop-recovery/candidate-motion-car-mid.mp4) | `ad108922e04d13c2de685090726d5e232a8138f4a6075274cf96c85d17ea3560` | 5.031 s | 157.095 ms |
| car-far / main | [main-motion-car-far.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01c28d7529f91d1944675053bb5e32e459cb204a/2026-10-06/lit-textures/v5-far-car-clear/main-motion-car-far.mp4) | `a572af5bdfc7ed17b534149539ac8ae1b87531541a16c89cf15bb0b44eb3fe94` | 5.016 s | 111.512 ms |
| car-far / candidate | [candidate-motion-car-far.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01c28d7529f91d1944675053bb5e32e459cb204a/2026-10-06/lit-textures/v5-far-car-clear/candidate-motion-car-far.mp4) | `07984abd4c578a77818c56fdfbc6c772a63df41b9a2268d71f675e2b080ab3a2` | 5.028 s | 120.161 ms |

Actual elapsed-time VFR viewport readbacks, not offline fixed simulation. Capture gaps and one terminal duplicate are disclosed in each receipt. No interpolation, scaling or speed change. Do not confuse capture stalls with shader shimmer; disclose any limit that prevents a verdict.

Excluded: V4 far-car originals and V4 tours containing them; all older V2 motion. Use V5 originals for car-far.

The corrected V5 CFR30 tours are navigation aids: [main tour](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01c28d7529f91d1944675053bb5e32e459cb204a/2026-10-06/lit-textures/v5-far-car-clear/main-motion-tour-1080p30.mp4), [candidate tour](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/01c28d7529f91d1944675053bb5e32e459cb204a/2026-10-06/lit-textures/v5-far-car-clear/candidate-motion-tour-1080p30.mp4). Their duplication/drop conversion does not establish a temporal verdict.

[Retained spatial report](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/633268315899d9f69689a81473587dbb1f2c1f13/2026-10-06/lit-textures/v5-spatial-review/auditor-results.md). Once a complete temporal verdict exists, send it to %141 for overall ALL PASS; then open the source PR against main. Do not merge before Kamran approves the look.
