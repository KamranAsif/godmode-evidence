# Pistol authored viewmodel pilot

Nine baked clips, 216 sampled poses, 432 clay images at 30 Hz (first person plus side), and 24 contact sheets. Every clay frame was visually inspected. Fixed 50-degree vertical viewmodel FOV.

[Six best](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/best-six.png) | [Six worst](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/worst-six.png) | [All raw URLs](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/index.json)

The weakest frames show readability/crop tradeoffs, the remaining donor glove bulk, and open sleeve cuts visible only in the side audit. No approval of the look is implied. Sprint sits very low; the reload off hand/magazine leave the frame during replacement. Swap endpoints retain a small gun tip until the runtime hides the outgoing model.

## Six best

- [Idle 000 fp](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/clay/Idle/fp-000.png): Compact hold.
- [ADS 012 fp](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/clay/ADS/fp-012.png): Centered sights.
- [FireADS 003 fp](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/clay/FireADS/fp-003.png): On-axis recoil.
- [Reload 021 side](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/clay/Reload/side-021.png): Magazine removal.
- [Reload 045 side](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/clay/Reload/side-045.png): Magazine return.
- [SprintIn 003 fp](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/clay/SprintIn/fp-003.png): Sprint transition.

## Six worst

- [Sprint 006 fp](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/clay/Sprint/fp-006.png): Low gun visibility.
- [Reload 030 fp](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/clay/Reload/fp-030.png): Off hand below frame.
- [Reload 036 side](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/clay/Reload/side-036.png): Cut sleeves visible in audit.
- [ADS 012 side](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/clay/ADS/side-012.png): Donor glove bulk.
- [SwapIn 000 fp](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/clay/SwapIn/fp-000.png): Tip still visible on entry.
- [SwapOut 012 fp](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/clay/SwapOut/fp-012.png): Tip still visible on exit.

## Textured game captures

- [pistol-ads.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/textured/pistol-ads.png)
- [pistol-fire.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/textured/pistol-fire.png)
- [pistol-hold.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/textured/pistol-hold.png)
- [pistol-reload-insert.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/textured/pistol-reload-insert.png)
- [pistol-reload-mid.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/textured/pistol-reload-mid.png)
- [pistol-reload-pull.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/textured/pistol-reload-pull.png)
- [pistol-sprint.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/textured/pistol-sprint.png)

Capture frames pin the actual runtime baked controller. Gameplay timing/ammo remain authoritative; the debug action only pins presentation.

[Four required textured poses](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/textured-four.png). The cold rendered client measured 1.35 fps over seven frames while the arena cache exporter was running; these are static pose evidence, not proof of smooth animation. [Raw timing receipt](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/pistol-authored-viewmodel-20261005/2026-10-05/pistol-authored-viewmodel/render-timing.json).
