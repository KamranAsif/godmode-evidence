# BattleDuty - BF6 picked HUD - full set, round 3

PR: https://github.com/KamranAsif/Godmode.exe-roguelite/pull/2229
Source: `96608f8687f88ce51cc57c580caae2564cbd479c`
Export: Windows Playtest, debug template, GodotJS 4.6.1 v8-nopc revision 2.
EXE SHA-256: `87839bab775bc859b85fb17918ab1cc30da4a958252b44301897fb9d48eb1399`

Native client-window captures at 1920x1080 from the exported Windows binary. The runtime inspection bridge is excluded from this export. A finite one-shot Playtest review plan dispatches existing console, input and pause handlers. The CLI captures the verified rendered client with game capture --os-window; no foreground focus is required. The setup grants real inventory and ordinary enemies, and the server resolves ammunition, raycasts and kill receipts. No HUD values or names were painted or inserted. The debug-only whole-stream-overlay mask gives the pure game HUD. The overlay-on still is supplemental; that layer belongs to a separate lane.

Current picks: ammo 05 at 90%; feed 02; picker 07; scoreboard 08; compact boxed ribbon v1; square bottom-left map and five original solid-glyph gadget tiles joined to ammo on the right, following the picked real BF6 frame. Old full-frame concepts are comparison backdrops ONLY for the element named in each caption; their old map/streak positions are superseded. World, camera, VFX and audio are outside this UI comparison. All shipped icons are original geometry. HUD and game-menu text use the selected Rajdhani, with documented metric-only tabular HUD variants and the retained OFL originals.

## Picked references

- [Ammo 05](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-24/bf6-concept-05-offset-bracket-968c98306d.png)
- [Feed 02](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-24/bf6-concept-02-linear-signal-ff9397a20d.png)
- [Care picker 07](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-24/bf6-concept-07-upgrade-picker-72afdd5fbf.png)
- [Scoreboard 08](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-24/bf6-concept-08-scoreboard-0033a16495.png)
- [Gadget tiles and square map](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-24/bf6-ref-killstreak-gadget-slots-e8e6fb367c.png)
- [Ribbon v1](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-24/bf6-hud-r2-v1-ribbon-f5a726d66b.png)

## Exported views

The low-ammo frame is the common source for ammo, full feed, gadget cluster and minimap comparisons/crops. The opening fight frame supplies the exact HEADSHOT ribbon comparison. Both are intact captures from this same exported EXE.

- [bf6-fight-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/bf6-fight-1080-2f0a22145d.png)
- [bf6-low-ammo-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/bf6-low-ammo-1080-7d09b1b013.png)
- [bf6-scoreboard-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/bf6-scoreboard-1080-dfc6a6d6e5.png)
- [bf6-upgrade-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/bf6-upgrade-1080-2f5e6601cd.png)
- [bf6-pause-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/bf6-pause-1080-63ebf0a22c.png)
- [bf6-overlay-on-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/bf6-overlay-on-1080-0d251cd481.png)
- [bf6-radar-on-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/bf6-radar-on-1080-6d8279cc8c.png)
- [bf6-radar-on-live-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/bf6-radar-on-live-1080-e11581e910.png)

## Side-by-side comparisons

- [bf6-ammo-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/bf6-ammo-vs-concept-1080-013e0552b6.png)
- [bf6-ammo-vs-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/bf6-ammo-vs-concept-200pct-9c45ae23bd.png)
- [bf6-cluster-map-vs-reference.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/bf6-cluster-map-vs-reference-82252e8a24.png)
- [bf6-cluster-vs-reference-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/bf6-cluster-vs-reference-200pct-ed04ecef10.png)
- [bf6-feed-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/bf6-feed-vs-concept-1080-1a3ed1cf49.png)
- [bf6-feed-vs-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/bf6-feed-vs-concept-200pct-996f44f3d7.png)
- [bf6-minimap-vs-reference-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/bf6-minimap-vs-reference-200pct-fd168e5141.png)
- [bf6-pause-vs-reference.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/bf6-pause-vs-reference-f1eb660ee8.png)
- [bf6-ribbon-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/bf6-ribbon-vs-concept-1080-916096faa0.png)
- [bf6-ribbon-vs-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/bf6-ribbon-vs-concept-200pct-fa92a26771.png)
- [bf6-scoreboard-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/bf6-scoreboard-vs-concept-1080-44917347f0.png)
- [bf6-upgrade-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/bf6-upgrade-vs-concept-1080-61a36c6a8d.png)

## Exact 200% native crops

- [ammo-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/ammo-200pct-9d7ac4249b.png)
- [feed-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/feed-200pct-1a1d67339c.png)
- [cluster-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/cluster-200pct-28be171459.png)
- [minimap-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/minimap-200pct-ed92ca250b.png)
- [ribbon-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/ribbon-200pct-67cd02529e.png)

All crops are nearest-neighbor 2x enlargements of the source rectangles. Native frames and the 2000x1125 real BF6 reference retain their original pixels; unequal-size pairs are padded, never stretched.

- [full-r3-crops.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/full-r3-crops-cd78230f40.json)
- [capture-source.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/capture-source-8239bf414a.json)
- [focus-free-plan.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/focus-free-plan-1459bcf17f.json)
- [validation-r3.txt](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/validation-r3-a5a538dff7.txt)

## Round 2 review corrections

- Radar was already functional in live play: the pre-fix native verification recorded server/client true and 23 contacts for 23 living enemies. The defect was stale paused map presentation. The paused path now refreshes contacts from the latest authoritative view without advancing its clock or changing visibility rules.
- The overview was regenerated without cast shadows. Bridge shadow bands and the hard diagonal split are gone; cyan boundary polylines were removed. The white 60-degree view cone fades radially and across a soft 6-degree edge. Actual roof edges remain part of the arena overview.
- Feed glyphs have a stronger soft dark shadow. The original rifle profile has white stock, barrel, optic and trigger-guard cut-outs, with a soft native-pixel icon shadow. The frag icon has larger optical bounds and transparent segment gaps.
- Reload starts 30px lower and retains at least 12px clearance below the lower tick through recoil bloom.
- Gadgets use filled borderless cells, a lit top edge when ready, no empty zero counters, and no plates/keys for unassigned slots. Assigned tiles stay joined to ammo; actual saved loadout changes are preserved.
- Server join, feed and scoreboard use the saved channel handle. The scoreboard frame and lower corner marks fit its truthful row count, and the own row has a brighter gold fill, ink and 4px bar.
- The picker has stronger perceptual world dimming, a matching original health-heart symbol, and shorter labelled turret copy. Pause report copy uses the regular prose face with plain labels and an exit-group separator.
- Kamran selected Rajdhani after the r2 reviews. Its OFL originals and metric-only tabular HUD variants are committed with provenance. Feed/ribbon/table text uses weight 600; body roles use 500/400, with title fitting for the wider family. All five original gadget silhouettes were refined, the map composite has stronger terrain separation with less world bleed, and already-permitted contacts retain legible ink without extra enemies or lifetime.
- Cool-white text remains #E6F0F5; r2 native opaque ammo/name pixels were already exactly RGB230,240,245. No extra tint was added based on the pure-white impression.

## Exported Enemy Radar checks

Every review marker records authoritative server Radar, received client Radar, simulation hold state, drawn contacts and living enemies. Both Radar-on views require server/client true, at least one living enemy, and markers equal to living enemies before the capture helper accepts them. The separate live view also requires simulationPaused=false. Default fight, low ammo, overlay and menu views require Radar off. No enemies were removed or repositioned to clean the map.

- bf6-fight-1080: server=False, client=False, paused=True, font=Rajdhani HUD, markers=2, living=27
- bf6-low-ammo-1080: server=False, client=False, paused=True, font=Rajdhani HUD, markers=2, living=21
- bf6-radar-on-1080: server=True, client=True, paused=True, font=Rajdhani HUD, markers=21, living=21
- bf6-overlay-on-1080: server=False, client=False, paused=True, font=Rajdhani HUD, markers=2, living=21
- bf6-radar-on-live-1080: server=True, client=True, paused=False, font=Rajdhani HUD, markers=21, living=21
- bf6-scoreboard-1080: server=False, client=False, paused=True, font=Rajdhani HUD, markers=2, living=21
- bf6-pause-1080: server=False, client=False, paused=True, font=Rajdhani HUD, markers=2, living=21
- bf6-upgrade-1080: server=False, client=False, paused=True, font=Rajdhani HUD, markers=2, living=21

The pre-fix native source verification is preserved for the diagnosis:
- [Live Radar on, 23 markers](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/radar-verification/radar-on-live-1080-133cf79358.png)
- [Server/client/live/frozen state checks](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r3/radar-verification/state-checks-9b0db70569.json)

## Validation

pnpm test passed 11/11 after the rebase. The final visual-token/corner source passed 10/11 gates: two Windows process-enumeration checks failed in godot-cli, then passed 2/2 when run sequentially in isolation. The final suite is not represented as an unconditional pass. Focused HUD/layout/replay checks passed 80/80. The pinned native importer refreshed the new SVG/shader/overview assets and generated their committed sidecars. The overview resource render had zero errors. The cheap headless setup failure from r2 was not represented as a pass; the actual Windows Playtest checks below are rendered native validation.
Exported capture errors: 0; startup texture errors: 0; native 1920x1080 captures: 8.
All owned renderers are stopped and their tickets released before publication. PR #2229 remains draft. Target is 10/10 from both critics; r2 Claude was 7/10 and r2 Codex was 7.5/10. Compass remains unchanged pending Kamran decision.

[Conventions and shared tokens](https://github.com/KamranAsif/Godmode.exe-roguelite/blob/96608f8687f88ce51cc57c580caae2564cbd479c/docs/bf6-ui-conventions.md)
