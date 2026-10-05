# Pistol authored viewmodel pilot

Nine baked clips, 216 sampled poses, 432 clay images at 30 Hz (first person plus side), and 24 contact sheets. Every clay frame was visually inspected. Fixed 50-degree vertical viewmodel FOV.

[Six best](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/best-six.png) | [Six worst](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/worst-six.png) | [All raw URLs](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/index.json)

Revision: sprint now keeps the firing hand visible on the gun through the entire loop, and SwapIn frame 0 / SwapOut frame 12 put the complete gun below the viewport. Rerendered and visually reviewed all 122 images in SprintIn, Sprint, SwapIn and SwapOut. Two regression tests check every sprint frame and every pistol vertex at the hidden endpoints.

[Corrected sprint and both hidden swap endpoints](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/defects-fixed.png).

The lowest-readability frames show intermediate swap crops, remaining donor glove bulk, and open sleeve cuts visible only in the side audit. The reload off hand/magazine leave the frame during replacement.

## Six best

- [Idle 000 fp](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/clay/Idle/fp-000.png): Compact hold.
- [ADS 012 fp](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/clay/ADS/fp-012.png): Centered sights.
- [FireADS 003 fp](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/clay/FireADS/fp-003.png): On-axis recoil.
- [Reload 021 side](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/clay/Reload/side-021.png): Magazine removal.
- [Reload 045 side](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/clay/Reload/side-045.png): Magazine return.
- [Sprint 006 fp](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/clay/Sprint/fp-006.png): Visible sprint grip.

## Six worst

- [Sprint 006 side](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/clay/Sprint/side-006.png): Glove bulk at diagonal grip.
- [Reload 030 fp](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/clay/Reload/fp-030.png): Off hand below frame.
- [Reload 036 side](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/clay/Reload/side-036.png): Cut sleeves visible in audit.
- [ADS 012 side](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/clay/ADS/side-012.png): Donor glove bulk.
- [SwapIn 007 fp](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/clay/SwapIn/fp-007.png): Mid-entry crop.
- [SwapOut 006 fp](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/clay/SwapOut/fp-006.png): Mid-exit crop.

## Textured game captures

- [pistol-ads.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/textured/pistol-ads.png)
- [pistol-fire.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/textured/pistol-fire.png)
- [pistol-hold.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/textured/pistol-hold.png)
- [pistol-reload-insert.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/textured/pistol-reload-insert.png)
- [pistol-reload-mid.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/textured/pistol-reload-mid.png)
- [pistol-reload-pull.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/textured/pistol-reload-pull.png)
- [pistol-sprint.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/textured/pistol-sprint.png)
- [pistol-swap-in-hidden.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/textured/pistol-swap-in-hidden.png)
- [pistol-swap-out-hidden.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/textured/pistol-swap-out-hidden.png)

Capture frames pin the actual runtime baked controller. Gameplay timing/ammo remain authoritative; the debug action only pins presentation.

[Four required textured poses](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/textured-four.png). The cold rendered client measured 1.35 fps over seven frames while the arena cache exporter was running; these are static pose evidence, not proof of smooth animation. [Raw timing receipt](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/render-timing.json).

The corrected capture run, after cache generation, measured 57.21 fps across 287 frames over five seconds, with 60 Hz vsync enabled. [Revision timing receipt](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/defects-render-timing.json). The new captures verify the actual visible sprint grip and complete hiding at both swap endpoints.
