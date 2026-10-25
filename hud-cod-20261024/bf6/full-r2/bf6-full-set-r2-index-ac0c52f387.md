# BattleDuty - BF6 picked HUD - full set, round 2

PR: https://github.com/KamranAsif/Godmode.exe-roguelite/pull/2229
Source: `95943034b0881f637d8381fa9559a6682fa1c694`
Export: Windows Playtest, debug template, GodotJS 4.6.1 v8-nopc revision 2.
EXE SHA-256: `6b4154f0774de767abcd11b67cc4919ba08da09bd2c1f1fa7c2733841aea33ea`

Native client-window captures at 1920x1080 from the exported Windows binary. The runtime inspection bridge is excluded from this export. A finite one-shot Playtest review plan dispatches existing console, input and pause handlers. The CLI captures the verified rendered client with game capture --os-window; no foreground focus is required. The setup grants real inventory and ordinary enemies, and the server resolves ammunition, raycasts and kill receipts. No HUD values or names were painted or inserted. The debug-only whole-stream-overlay mask gives the pure game HUD. The overlay-on still is supplemental; that layer belongs to a separate lane.

Current picks: ammo 05 at 90%; feed 02; picker 07; scoreboard 08; compact boxed ribbon v1; square bottom-left map and five original solid-glyph gadget tiles joined to ammo on the right, following the picked real BF6 frame. Old full-frame concepts are comparison backdrops ONLY for the element named in each caption; their old map/streak positions are superseded. World, camera, VFX and audio are outside this UI comparison. All shipped icons are original geometry. HUD text uses OFL Barlow Condensed, the currently approved face.

## Picked references

- [Ammo 05](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-24/bf6-concept-05-offset-bracket-968c98306d.png)
- [Feed 02](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-24/bf6-concept-02-linear-signal-ff9397a20d.png)
- [Care picker 07](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-24/bf6-concept-07-upgrade-picker-72afdd5fbf.png)
- [Scoreboard 08](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-24/bf6-concept-08-scoreboard-0033a16495.png)
- [Gadget tiles and square map](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-24/bf6-ref-killstreak-gadget-slots-e8e6fb367c.png)
- [Ribbon v1](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-24/bf6-hud-r2-v1-ribbon-f5a726d66b.png)

## Exported views

The low-ammo frame is the common source for ammo, full feed, gadget cluster and minimap comparisons/crops. The opening fight frame supplies the exact HEADSHOT ribbon comparison. Both are intact captures from this same exported EXE.

- [bf6-fight-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r2/bf6-fight-1080-43e079d374.png)
- [bf6-low-ammo-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r2/bf6-low-ammo-1080-03947369f4.png)
- [bf6-scoreboard-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r2/bf6-scoreboard-1080-5479fabccd.png)
- [bf6-upgrade-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r2/bf6-upgrade-1080-b96f2c201f.png)
- [bf6-pause-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r2/bf6-pause-1080-0d1ede9be5.png)
- [bf6-overlay-on-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r2/bf6-overlay-on-1080-952582d909.png)
- [bf6-radar-on-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r2/bf6-radar-on-1080-4fa92c0eca.png)

## Side-by-side comparisons

- [bf6-ammo-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r2/bf6-ammo-vs-concept-1080-25b1dd0a0d.png)
- [bf6-ammo-vs-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r2/bf6-ammo-vs-concept-200pct-e121ef0eb1.png)
- [bf6-cluster-map-vs-reference.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r2/bf6-cluster-map-vs-reference-216a993d8e.png)
- [bf6-cluster-vs-reference-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r2/bf6-cluster-vs-reference-200pct-e3b8f41e20.png)
- [bf6-feed-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r2/bf6-feed-vs-concept-1080-05ad62c83d.png)
- [bf6-feed-vs-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r2/bf6-feed-vs-concept-200pct-558991f4a4.png)
- [bf6-minimap-vs-reference-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r2/bf6-minimap-vs-reference-200pct-bca12c969f.png)
- [bf6-pause-vs-reference.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r2/bf6-pause-vs-reference-92db5e68e8.png)
- [bf6-ribbon-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r2/bf6-ribbon-vs-concept-1080-8de95bac80.png)
- [bf6-ribbon-vs-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r2/bf6-ribbon-vs-concept-200pct-bbf04da5a5.png)
- [bf6-scoreboard-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r2/bf6-scoreboard-vs-concept-1080-b54bc530b0.png)
- [bf6-upgrade-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r2/bf6-upgrade-vs-concept-1080-40df85ef34.png)

## Exact 200% native crops

- [ammo-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r2/ammo-200pct-149cd571fc.png)
- [feed-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r2/feed-200pct-f2eedbcc17.png)
- [cluster-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r2/cluster-200pct-0b0a8f0957.png)
- [minimap-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r2/minimap-200pct-ea5261227e.png)
- [ribbon-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r2/ribbon-200pct-82c42687f5.png)

All crops are nearest-neighbor 2x enlargements of the source rectangles. Native frames and the 2000x1125 real BF6 reference retain their original pixels; unequal-size pairs are padded, never stretched.

- [full-r2-crops.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r2/full-r2-crops-dd80e5dea0.json)
- [capture-source.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r2/capture-source-91a1ab4869.json)
- [focus-free-plan.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r2/focus-free-plan-f16e345b6c.json)
- [validation-r2.txt](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r2/validation-r2-cc45bf8d49.txt)

## Round 1 review fixes

- Actual player handle in cyan and enemy handles in red, white weapon symbol, stable shared feed columns.
- Actual cached arena orthographic overview at 65% opacity, cool tint, soft 60-degree view cone, antialiased hostile triangles, lighter mixed-case area label.
- Original filtered 4x weapon, grenade, gadget and picker SVGs; filled gadget plates, legible idle states, local 38% ammo scrim inside the locked 05 bracket.
- Barlow Condensed Medium for small combat text, cool off-white neutrals, one restrained shadow, genuine key-chip reload prompt, R-47 model label, empty grenade dimming.
- Pause highlight/help agree; working Options entry and return; regular Noto Sans prose, original action/mode symbols, centred Paused header.
- Truthful named upgrade effects and stronger picker dimming; stronger scoreboard self-row fill/bar and rules ending at its real final row.
- Compact ribbon event gap reduced; crosshair ink strengthened over bright backgrounds; existing approved positions and hidden run-state list preserved.

## Enemy Radar check

Round 1 explicitly granted Enemy Radar. Default round-2 frames explicitly remove it and metadata records radarActive=false. Existing contact rules remain unchanged: recent attacks/firing reveal contacts; Enemy Radar reveals all. The supplementary Radar-on view toggles metadata while simulation is frozen; it retains cached contacts, so it is not a live Radar functional proof. Default views remain Radar off. No enemy positions/counts were reduced or moved to clean the map.

- bf6-fight-1080: Radar=False, markers=3, living enemies=26
- bf6-low-ammo-1080: Radar=False, markers=2, living enemies=19
- bf6-radar-on-1080: Radar=True, markers=2, living enemies=19
- bf6-overlay-on-1080: Radar=False, markers=2, living enemies=19
- bf6-scoreboard-1080: Radar=False, markers=2, living enemies=19
- bf6-pause-1080: Radar=False, markers=2, living enemies=19
- bf6-upgrade-1080: Radar=False, markers=2, living enemies=19

## Validation

Native Windows Playtest frames retain their complete source pixels. The manifest records source HEAD, executable SHA-256, replay plan SHA-256, frame dimensions and image hashes. See validation-r2.txt for final command results. All owned renderers are stopped and their tickets released before publication. Round 2 scores are pending; target remains 10/10 from both critics. Round 1 was Claude 6/10 and Codex 6.5/10. No compass has been added pending Kamran decision; the supplied Codex text ended at item 13 and the remainder has been requested.
Native runtime/script errors: 0; startup texture errors: 0.

[Shared conventions and tokens](https://github.com/KamranAsif/Godmode.exe-roguelite/blob/95943034b0881f637d8381fa9559a6682fa1c694/docs/bf6-ui-conventions.md)

[OFL font candidates beside BF6](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/font-candidates-cd7dc8be89.png)
