# Viewmodel slider proof

[Blender 5.2 panel, Object Mode, nothing selected](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-05/viewmodel-slider-panel/viewmodel-panel-working-file-2-589a36bc16.png)

Scripted copy: both guns 125% scale, gun up 2 cm and pitch 5 degrees; left grip curl +12 degrees. Hip left 3 cm/up 4 cm; ADS right 2 cm/down 2 cm. The rifle at this deliberately enlarged setting reaches the camera; the permanent working file remains at 100% and zero deltas.

| Weapon / clip | Shipped | Imported slider copy |
| --- | --- | --- |
| pistol Idle | [Raw PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-05/viewmodel-slider-panel/pistol-idle-798c6572b0.png) | [Raw PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-05/viewmodel-slider-panel/pistol-hold-19de5b7c4b.png) |
| pistol ADS | [Raw PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-05/viewmodel-slider-panel/pistol-ads-3147500a51.png) | [Raw PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-05/viewmodel-slider-panel/pistol-ads-0d13c6cc70.png) |
| pistol Reload | [Raw PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-05/viewmodel-slider-panel/pistol-reload-617ed41316.png) | [Raw PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-05/viewmodel-slider-panel/pistol-reload-2548e462b6.png) |
| assault-rifle Idle | [Raw PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-05/viewmodel-slider-panel/assault-rifle-idle-65d2587306.png) | [Raw PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-05/viewmodel-slider-panel/assault-rifle-hold-dff0844376.png) |
| assault-rifle ADS | [Raw PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-05/viewmodel-slider-panel/assault-rifle-ads-c72a07b5b7.png) | [Raw PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-05/viewmodel-slider-panel/assault-rifle-ads-3d75662411.png) |
| assault-rifle Reload | [Raw PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-05/viewmodel-slider-panel/assault-rifle-reload-0127d66031.png) | [Raw PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-05/viewmodel-slider-panel/assault-rifle-reload-f0053fdcef.png) |

Verified every sample of all nine exported clips per weapon: 125% prop scale, exact Hip/ADS framing offsets, unchanged clip durations. Left finger slider deltas reach Reload. Explicit --from Idle and automatic panel import propagation reports match. The saved source file is read-only during import.

Validation: pnpm format; pnpm build (GODMODE_PREBUILT_GENERATING=1 skips unrelated arena prebuild); pnpm lint (five existing warnings); 8 Blender slider math tests; 11 shared importer delta tests; 40 Node viewmodel/asset tests on shipped assets; full saved-copy import including 648 game-rule tests, headless survival smoke, and six godot-cli captures. Scripted reset, scrubbing, save/reopen, and save while previewing Reload passed; Blender UI Play/Stop passed in Object Mode with no selection.
