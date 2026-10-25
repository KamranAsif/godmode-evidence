# BattleDuty - BF6 HUD - round 4 candidate

Source: `f9e52e5f611cacf0d7a92f7c089ff2523615c6ad`
Windows Playtest EXE SHA-256: `763b8c815ca021f979ea76c1a9335f05de834313906a7c6c21cbe53213555551`
Pinned GodotJS 4.6.1 v8-nopc revision 2; debug export; native 1920x1080.

[Accepted round 3](https://github.com/KamranAsif/godmode-evidence/blob/main/hud-cod-20261024/bf6/full-r3/bf6-full-set-r3-index-4b74ae335f.md): Claude 8/10, Codex 8.5/10. PR #2229 merged as c3351e4f3. This R4 candidate is on fresh branch hud/bf6-climb-10-20261025 from merged main; it contains only follow-up changes, including the current Tab/KDE integration.
Round 4 is a separate follow-up candidate. Target remains 10/10 from both critics. These views are not a claim that either critic has passed round 4.

The selected layouts and Rajdhani remain. World/camera/VFX/audio and the separate stream layer are outside this UI review. Every icon is original. All numbers/names/offers derive from real game state. No HUD values are painted into the frames.

## Forwarded round-3 tells addressed

- Shared rifle: one optic, continuous rail/barrel and deliberate stock/guard/magazine separation; the RC-XD, EMP case and nuke have revised filled silhouettes.
- Map: the existing building footprint data defines roof masses in the native overview coordinate bounds. Derivative-aware mip filtering suppresses fixture noise without duplicated offset edges. Ground/roof/fixture ink uses three restrained families over a blurred local backing. Actual large roof outlines remain.
- Feed: cyan/red columns retained; stronger dark shadow and a restrained 1px contour support names on orange walls. Existing top-ready edges remain on the picked gadgets; surrounding gadget frames stay disabled.
- Upgrade picker: distinct returning stopwatch and burst-round icons; a new claymore symbol and labelled radius/interval/capacity copy; a 1x20 footer divider with 16px gutters and tracked medium SELECT text.
- Pause: 36px Rajdhani 600 hero, original larger chevron, separate 1px focus perimeter with 2px clear space, 10px secondary-action gaps and a faint original dot texture under the left column. Focus help/hit areas are unchanged.
- Ribbon: HEADSHOT and chain labels share 28px boxes and 20px Rajdhani 600. The low-ammo capture requires the authoritative latest receipt to be a headshot and the live HUD report to contain a chain award and score. Bounded ordinary aim/fire windows exercise the combined state without painting award values.
- Depleted frag: icon remains dim at 40%; zero uses weight 600 and 60% opacity. Equipment plates are darker on bright ground.
- Enemy scoreboard rows are uppercase with 0.1em tracking; the saved player handle keeps its case. Picker/scoreboard blur is reduced to retain scene structure.
- No compass was added pending Kamran decision. HUD neutral remains #E6F0F5; the prior pure-white impression is not addressed by an arbitrary additional tint.

## Native exported views

- [bf6-fight-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/bf6-fight-1080-0893356dcf.png)
- [bf6-low-ammo-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/bf6-low-ammo-1080-e4170003cb.png)
- [bf6-map-hidden-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/bf6-map-hidden-1080-a22ab4af47.png)
- [bf6-overlay-on-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/bf6-overlay-on-1080-27294322c4.png)
- [bf6-pause-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/bf6-pause-1080-93310a08c9.png)
- [bf6-radar-on-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/bf6-radar-on-1080-b6e6193f04.png)
- [bf6-radar-on-live-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/bf6-radar-on-live-1080-68d95b0926.png)
- [bf6-scoreboard-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/bf6-scoreboard-1080-a93ba3033b.png)
- [bf6-upgrade-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/bf6-upgrade-1080-7ed38e9f74.png)

## Picked-reference comparisons and exact crops

- [ammo-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/ammo-200pct-500bfa991c.png)
- [ammo-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/ammo-concept-200pct-3989fe36b3.png)
- [bf6-ammo-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/bf6-ammo-vs-concept-1080-25ab0df2ba.png)
- [bf6-ammo-vs-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/bf6-ammo-vs-concept-200pct-b426aa2b40.png)
- [bf6-cluster-map-vs-reference.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/bf6-cluster-map-vs-reference-a1435adaf6.png)
- [bf6-cluster-vs-reference-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/bf6-cluster-vs-reference-200pct-777a60bc9b.png)
- [bf6-feed-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/bf6-feed-vs-concept-1080-60c3564786.png)
- [bf6-feed-vs-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/bf6-feed-vs-concept-200pct-c8d3c6f4fe.png)
- [bf6-map-vs-world-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/bf6-map-vs-world-200pct-8f272d4059.png)
- [bf6-map-world-vs-held-fight-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/bf6-map-world-vs-held-fight-1080-a2544f4cf2.png)
- [bf6-minimap-vs-reference-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/bf6-minimap-vs-reference-200pct-9db96eb995.png)
- [bf6-pause-focus-vs-reference-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/bf6-pause-focus-vs-reference-200pct-fee93da8c4.png)
- [bf6-pause-vs-reference.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/bf6-pause-vs-reference-6bdf94f99c.png)
- [bf6-ribbon-combined-vs-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/bf6-ribbon-combined-vs-concept-200pct-f0d566f7c6.png)
- [bf6-ribbon-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/bf6-ribbon-vs-concept-1080-56fb2e86a0.png)
- [bf6-ribbon-vs-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/bf6-ribbon-vs-concept-200pct-3d721f9f82.png)
- [bf6-scoreboard-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/bf6-scoreboard-vs-concept-1080-8852564571.png)
- [bf6-upgrade-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/bf6-upgrade-vs-concept-1080-f60d98221f.png)
- [cluster-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/cluster-200pct-f124194d08.png)
- [cluster-reference-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/cluster-reference-200pct-80da1e5df0.png)
- [feed-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/feed-200pct-a2a32deec8.png)
- [feed-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/feed-concept-200pct-4aea3dff00.png)
- [map-world-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/map-world-200pct-ade45ca135.png)
- [minimap-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/minimap-200pct-a69eaff98a.png)
- [minimap-reference-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/minimap-reference-200pct-9c99386b0d.png)
- [pause-focus-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/pause-focus-200pct-90183399c6.png)
- [pause-focus-reference-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/pause-focus-reference-200pct-faebcdbe2c.png)
- [ribbon-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/ribbon-200pct-07fdddde61.png)
- [ribbon-combined-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/ribbon-combined-200pct-e253744dde.png)
- [ribbon-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/ribbon-concept-200pct-daa8819f83.png)

Comparison frames retain original pixels; unequal native dimensions are padded, not stretched. Crops are exact nearest-neighbor 200% enlargements. The crop manifest records rectangles and source hashes.

## Native icon appendix - source fixture, not gameplay

The icon sheet uses the same original assets and optical scale as the real picker. It contains no game-state values or forced offers. It was rendered from the debug-only source fixture, which is excluded from every export; it is separately labelled and is not represented as an exported gameplay frame.
- [Native icon resource check](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/bf6-icons-1080-c20157a6c0.png)
- [Icon-sheet provenance](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/icon-sheet-source-ef11f24c05.json)

## Authoritative Radar and held-frame diagnostic

Default views require Radar off. Paused-on and live-on require both server/client enabled and drawn contacts equal living enemies. Live-on additionally requires simulationPaused=false. The map-hidden diagnostic toggles only corner-map visibility during the same held low-ammo fight, without changing enemies or UI values.

- bf6-fight-1080: font=Rajdhani HUD, server=False, client=False, paused=True, contacts=4, living=25
- bf6-low-ammo-1080: font=Rajdhani HUD, server=False, client=False, paused=True, contacts=1, living=20
- bf6-map-hidden-1080: font=Rajdhani HUD, server=False, client=False, paused=True, contacts=0, living=20
- bf6-radar-on-1080: font=Rajdhani HUD, server=True, client=True, paused=True, contacts=20, living=20
- bf6-overlay-on-1080: font=Rajdhani HUD, server=False, client=False, paused=True, contacts=1, living=20
- bf6-radar-on-live-1080: font=Rajdhani HUD, server=True, client=True, paused=False, contacts=20, living=20
- bf6-scoreboard-1080: font=Rajdhani HUD, server=False, client=False, paused=True, contacts=3, living=20
- bf6-pause-1080: font=Rajdhani HUD, server=False, client=False, paused=True, contacts=3, living=20
- bf6-upgrade-1080: font=Rajdhani HUD, server=False, client=False, paused=True, contacts=3, living=20

## Validation and reproduction

Script/runtime errors: 0; startup texture errors: 0; native views: 9.
Build and affected HUD/Tab/streak/layout/replay/export-boundary checks: 214/214. Full pnpm test passed all 11 gates (216.7 s) on the fresh main-based branch. See validation-r4.txt for the complete final verification record. The runtime inspection bridge is absent from the export; a finite debug-only local review plan dispatches existing game handlers and godot-cli captures the verified rendered client without OS focus.
All owned renderers are stopped and tickets released before publication. The overlay-on capture now uses merged main, including the current stream/Tab layer. It is a separate top layer and is excluded from the game-HUD realism score.

- [capture-source.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/capture-source-4a603cda89.json)
- [focus-free-plan.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/focus-free-plan-cf208b41a5.json)
- [full-r4-crops.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/full-r4-crops-6c681f5a01.json)
- [validation-r4.txt](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r4/validation-r4-892a957527.txt)

[Shared conventions](https://github.com/KamranAsif/Godmode.exe-roguelite/blob/f9e52e5f611cacf0d7a92f7c089ff2523615c6ad/docs/bf6-ui-conventions.md)
[Rajdhani licence and provenance](https://github.com/KamranAsif/Godmode.exe-roguelite/blob/f9e52e5f611cacf0d7a92f7c089ff2523615c6ad/assets/fonts/ATTRIBUTION.md)
