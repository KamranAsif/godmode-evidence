# BattleDuty - BF6 picked HUD - full set, round 1

PR: https://github.com/KamranAsif/Godmode.exe-roguelite/pull/2229
Source: `36a535c35e656e056b9b714d5e45a8204103fd8a`
Export: Windows Playtest, debug template, GodotJS 4.6.1 v8-nopc revision 2.
EXE SHA-256: `eeb61a5ccd82e6a0b383015d4675b5eb75847320239bfc9d3b7444e14dc20801`

Native client-window captures at 1920x1080 from the exported Windows binary. The runtime inspection bridge is excluded from this export. A finite one-shot Playtest review plan dispatches existing console, input and pause handlers. The CLI captures the verified rendered client with game capture --os-window; no foreground focus is required. The setup grants real inventory and ordinary enemies, and the server resolves ammunition, raycasts and kill receipts. No HUD values or names were painted or inserted. The debug-only whole-stream-overlay mask gives the pure game HUD. The overlay-on still is supplemental; that layer belongs to a separate lane.

Current picks: ammo 05 at 90%; feed 02; picker 07; scoreboard 08; compact boxed ribbon v1; square bottom-left map and five line-icon gadget tiles joined to ammo on the right, following the picked real BF6 frame. Old full-frame concepts are comparison backdrops ONLY for the element named in each caption; their old map/streak positions are superseded. World, camera, VFX and audio are outside this UI comparison. All shipped icons are original geometry. HUD text uses OFL Barlow Condensed, the currently approved face.

## Picked references

- [Ammo 05](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-24/bf6-concept-05-offset-bracket-968c98306d.png)
- [Feed 02](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-24/bf6-concept-02-linear-signal-ff9397a20d.png)
- [Care picker 07](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-24/bf6-concept-07-upgrade-picker-72afdd5fbf.png)
- [Scoreboard 08](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-24/bf6-concept-08-scoreboard-0033a16495.png)
- [Gadget tiles and square map](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-24/bf6-ref-killstreak-gadget-slots-e8e6fb367c.png)
- [Ribbon v1](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-24/bf6-hud-r2-v1-ribbon-f5a726d66b.png)

## Exported views

The low-ammo frame is the common source for ammo, full feed, gadget cluster and minimap comparisons/crops. The opening fight frame supplies the exact HEADSHOT ribbon comparison. Both are intact captures from this same exported EXE.

- [bf6-fight-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r1/bf6-fight-1080-4d3734ca38.png)
- [bf6-low-ammo-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r1/bf6-low-ammo-1080-5288648841.png)
- [bf6-scoreboard-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r1/bf6-scoreboard-1080-8c712c1966.png)
- [bf6-upgrade-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r1/bf6-upgrade-1080-6b9587607b.png)
- [bf6-pause-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r1/bf6-pause-1080-33a4e7728a.png)
- [bf6-overlay-on-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r1/bf6-overlay-on-1080-86e698a704.png)

## Side-by-side comparisons

- [bf6-ammo-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r1/bf6-ammo-vs-concept-1080-1e2ff34c44.png)
- [bf6-ammo-vs-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r1/bf6-ammo-vs-concept-200pct-81b91d47eb.png)
- [bf6-cluster-map-vs-reference.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r1/bf6-cluster-map-vs-reference-b92d0ba85a.png)
- [bf6-cluster-vs-reference-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r1/bf6-cluster-vs-reference-200pct-52327dfc80.png)
- [bf6-feed-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r1/bf6-feed-vs-concept-1080-0e73b811ad.png)
- [bf6-feed-vs-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r1/bf6-feed-vs-concept-200pct-987397bea0.png)
- [bf6-minimap-vs-reference-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r1/bf6-minimap-vs-reference-200pct-ed53e259ce.png)
- [bf6-pause-vs-reference.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r1/bf6-pause-vs-reference-f819a59e5a.png)
- [bf6-ribbon-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r1/bf6-ribbon-vs-concept-1080-842c9cd763.png)
- [bf6-ribbon-vs-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r1/bf6-ribbon-vs-concept-200pct-392790fc6c.png)
- [bf6-scoreboard-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r1/bf6-scoreboard-vs-concept-1080-a376162c44.png)
- [bf6-upgrade-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r1/bf6-upgrade-vs-concept-1080-c10daef74a.png)

## Exact 200% native crops

- [ammo-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r1/ammo-200pct-e24885f5d5.png)
- [feed-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r1/feed-200pct-f3a1ad3de1.png)
- [cluster-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r1/cluster-200pct-4588aaea8c.png)
- [minimap-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r1/minimap-200pct-b05a933e0e.png)
- [ribbon-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r1/ribbon-200pct-8ec48462a5.png)

All crops are nearest-neighbor 2x enlargements of the source rectangles. Native frames and the 2000x1125 real BF6 reference retain their original pixels; unequal-size pairs are padded, never stretched.

- [locked-crops.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r1/locked-crops-a75f785921.json)
- [capture-source.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r1/capture-source-9fcf9f9909.json)
- [focus-free-plan.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r1/focus-free-plan-d37d04cece.json)

## Validation

Build, lint and formatting pass. Focused HUD/menu/replay tests: 183/183; map/layout follow-up after the caption fix: 68/68. Last full pnpm test before the capture-fixture addition: 10/11 gates; the Windows process-enumeration timeout failed one CLI cleanup test during the parallel run, then the exact isolated test passed 1/1. No fake engines survived. An additional cheap/headless smoke stopped in cheap-arena preparation before game startup. Prior native validation checked normal Tab, scoreboard pin, map expansion and modal hiding. The final exported six-view pass has zero script/runtime errors and zero startup texture errors; every image is 1920x1080 and has a recorded SHA-256. The owned renderer is stopped and the hold released. Both human-relayed BF6 critic scores are pending. The target is 10/10 from each; 8/10 from both is only the PR landing checkpoint, and rounds continue after landing.

[Shared conventions and tokens](https://github.com/KamranAsif/Godmode.exe-roguelite/blob/36a535c35e656e056b9b714d5e45a8204103fd8a/docs/bf6-ui-conventions.md)

[OFL font candidates beside BF6](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/font-candidates-cd7dc8be89.png)
