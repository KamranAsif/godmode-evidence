# Matched cropped lighting audit v4-crop-recovery

Main e26e95c61bc258b5acf0bd59701d49b25f98aa90; candidate f6a3c316688f98d59e7eb111077723011de728f6. Crop bounds -400,-395,25;-543,-361,25; both have 126 bound receivers and 1745601 placed triangles.

Main uses its 1 m density and bake ambient; the candidate applies the map-wide bounded-receiver 0.5 m rule and prototype 0.16 bake ambient. Runtime outdoor fallback, exposure, sun and SSAO remain readable baseline controls; candidate enables SSIL and lower material shade fill. Native bake environment proofs and full bake receipts are attached.

Matched native GPU audit crops only. The complete production atlas is restored after evidence; no full bake was run in this implementation lane.

| View | Main FPS | Candidate FPS | Main mean ms | Candidate mean ms |
|---|---:|---:|---:|---:|
| outdoor | 92.3 | 82.8 | 10.84 | 12.08 |
| covered | 32.6 | 25.1 | 30.64 | 39.85 |
| contact | 46.1 | 36.7 | 21.70 | 27.25 |
| gameplay | 86.2 | 48.0 | 11.60 | 20.84 |

All six native camera paths are recaptured on both sides. Close-tree uses a left-offset path outside the support beam; far-car uses a restrained right-offset path outside the foreground car. Combat transients expire before architectural pause. Native timestamp/drop receipts are attached; continuous native-speed shimmer acceptance requires a playback-capable reviewer.

FPS windows are uncapped and separate from recording, with ten-second warmup and ten-second samples. Crop timings compare only the matched crop pair. Per-view managed-peer records are included in the manifests.

- [recovery-state.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/recovery-state.json)
- [main-outdoor.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-outdoor.png)
- [main-outdoor-inventory.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-outdoor-inventory.json)
- [main-outdoor-capture.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-outdoor-capture.json)
- [main-outdoor-frames.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-outdoor-frames.json)
- [main-covered.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-covered.png)
- [main-covered-inventory.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-covered-inventory.json)
- [main-covered-capture.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-covered-capture.json)
- [main-covered-frames.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-covered-frames.json)
- [main-contact.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-contact.png)
- [main-contact-inventory.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-contact-inventory.json)
- [main-contact-capture.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-contact-capture.json)
- [main-contact-frames.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-contact-frames.json)
- [main-gameplay.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-gameplay.png)
- [main-gameplay-inventory.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-gameplay-inventory.json)
- [main-gameplay-capture.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-gameplay-capture.json)
- [main-gameplay-frames.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-gameplay-frames.json)
- [main-manifest.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-manifest.json)
- [main-bake.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-bake.json)
- [main-bake-proof.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-bake-proof.json)
- [main-atlas-import-proof.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-atlas-import-proof.json)
- [main-motion-tree-close.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-motion-tree-close.mp4)
- [main-motion-tree-close.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-motion-tree-close.json)
- [main-motion-tree-mid.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-motion-tree-mid.mp4)
- [main-motion-tree-mid.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-motion-tree-mid.json)
- [main-motion-tree-far.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-motion-tree-far.mp4)
- [main-motion-tree-far.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-motion-tree-far.json)
- [main-motion-car-close.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-motion-car-close.mp4)
- [main-motion-car-close.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-motion-car-close.json)
- [main-motion-car-mid.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-motion-car-mid.mp4)
- [main-motion-car-mid.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-motion-car-mid.json)
- [main-motion-car-far.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-motion-car-far.mp4)
- [main-motion-car-far.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-motion-car-far.json)
- [main-motion-tree-close-30fps.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-motion-tree-close-30fps.mp4)
- [main-motion-tree-close-30fps.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-motion-tree-close-30fps.json)
- [main-motion-tour-1080p30.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-motion-tour-1080p30.mp4)
- [main-motion-tour-1080p30.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/main-motion-tour-1080p30.json)
- [candidate-outdoor.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-outdoor.png)
- [candidate-outdoor-inventory.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-outdoor-inventory.json)
- [candidate-outdoor-capture.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-outdoor-capture.json)
- [candidate-outdoor-frames.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-outdoor-frames.json)
- [candidate-covered.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-covered.png)
- [candidate-covered-inventory.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-covered-inventory.json)
- [candidate-covered-capture.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-covered-capture.json)
- [candidate-covered-frames.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-covered-frames.json)
- [candidate-contact.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-contact.png)
- [candidate-contact-inventory.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-contact-inventory.json)
- [candidate-contact-capture.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-contact-capture.json)
- [candidate-contact-frames.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-contact-frames.json)
- [candidate-gameplay.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-gameplay.png)
- [candidate-gameplay-inventory.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-gameplay-inventory.json)
- [candidate-gameplay-capture.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-gameplay-capture.json)
- [candidate-gameplay-frames.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-gameplay-frames.json)
- [candidate-manifest.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-manifest.json)
- [candidate-bake.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-bake.json)
- [candidate-bake-proof.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-bake-proof.json)
- [candidate-atlas-import-proof.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-atlas-import-proof.json)
- [candidate-motion-tree-close.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-motion-tree-close.mp4)
- [candidate-motion-tree-close.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-motion-tree-close.json)
- [candidate-motion-tree-mid.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-motion-tree-mid.mp4)
- [candidate-motion-tree-mid.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-motion-tree-mid.json)
- [candidate-motion-tree-far.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-motion-tree-far.mp4)
- [candidate-motion-tree-far.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-motion-tree-far.json)
- [candidate-motion-car-close.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-motion-car-close.mp4)
- [candidate-motion-car-close.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-motion-car-close.json)
- [candidate-motion-car-mid.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-motion-car-mid.mp4)
- [candidate-motion-car-mid.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-motion-car-mid.json)
- [candidate-motion-car-far.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-motion-car-far.mp4)
- [candidate-motion-car-far.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-motion-car-far.json)
- [candidate-motion-tree-close-30fps.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-motion-tree-close-30fps.mp4)
- [candidate-motion-tree-close-30fps.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-motion-tree-close-30fps.json)
- [candidate-motion-tour-1080p30.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-motion-tour-1080p30.mp4)
- [candidate-motion-tour-1080p30.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v4-crop-recovery/candidate-motion-tour-1080p30.json)
