# BattleDuty BF6 HUD - round 6

Source / validation head: `2ab2f67b6a45c4cee0047f735c7b8238959ed975`
Windows Playtest EXE SHA-256: `2ea45618e836641fcba2da8dce419ee26d2bdd6a4ddc80510b083a6d914112dc`

Fresh branch `hud/bf6-round6-20261025` from origin/main after #2271 merged. R5 scores were Claude 9 and Codex 9.5. Target remains 10/10; R6 scores are pending. Rajdhani and the picked HUD layouts remain the target. No compass.

## Changes from round 5

- The authoritative arena polygon has a 2 px red perimeter and a 30% black outside region. The existing actual-overview/roof-role shader now exposes supported inner roof edges at 8% and real material/height breaks at 6.5%. No invented map geometry or random texture.
- Scoreboard pages reserve the same eight-row frame and shared Tab backing. Rules end with the final real row. Confirmed enemy victims carry an original KIA skull and 50% ink; scores remain 100 per kill. No fabricated rows, damage scores or gameplay stats.
- Ordinary enemy callsigns consume 48 distinct single-word names before numeric suffixes. Names remain run-long, canonical uppercase and shared by feed/scoreboard; the stream handle and authored rival/source names are retained.
- The ammo backing contains both R-47 and LOW AMMO with vertical padding. Reserve formatting is `/ 90`; the ammo-only weapon profile faces left, while the feed still points from killer to victim. The picked bracket and gadget baseline are retained.
- Pause Controls has an original keyboard glyph. Actual installed upgrades have larger named tiles in a separate right column. No invented campaign actions or progress.

## Exported native states

Pinned GodotJS 4.6.1 v8-nopc revision 2, Windows Playtest debug export, native 1920x1080. Preview shader pre-baking is disabled to fit a ten-minute ticket; normal runtime shader compilation and all authored visual settings remain active. The tracked export preset is restored byte-for-byte. No FSR2.

### bf6-fight-1080
![bf6-fight-1080](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-fight-1080-e8ec25f31e.png)
Radar server/client=False/False; contacts/living=4/27; paused=True; real supply markers=0.

### bf6-low-ammo-1080
![bf6-low-ammo-1080](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-low-ammo-1080-360149f9aa.png)
Radar server/client=False/False; contacts/living=3/20; paused=True; real supply markers=0.

### bf6-map-hidden-1080
![bf6-map-hidden-1080](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-map-hidden-1080-135512adee.png)
Radar server/client=False/False; contacts/living=0/20; paused=True; real supply markers=0.

### bf6-radar-on-1080
![bf6-radar-on-1080](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-radar-on-1080-400ea22ebf.png)
Radar server/client=True/True; contacts/living=20/20; paused=True; real supply markers=0.

### bf6-overlay-on-1080
![bf6-overlay-on-1080](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-overlay-on-1080-34aca2bef3.png)
Radar server/client=False/False; contacts/living=3/20; paused=True; real supply markers=0.

### bf6-radar-on-live-1080
![bf6-radar-on-live-1080](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-radar-on-live-1080-9379e58a79.png)
Radar server/client=True/True; contacts/living=20/20; paused=False; real supply markers=0.

### bf6-scoreboard-1080
![bf6-scoreboard-1080](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-scoreboard-1080-1d55202f9e.png)
Radar server/client=False/False; contacts/living=2/20; paused=True; real supply markers=0.
Actual page: `{"index": 0, "pages": 2, "names": ["xXnoscopeXx", "BIRCH", "CINDER", "MORROW", "NORTH", "OCHRE", "ONYX", "PRISM"]}`. Both pages retain the same eight-row surface; no blank stat rows are drawn.

### bf6-scoreboard-last-page-1080
![bf6-scoreboard-last-page-1080](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-scoreboard-last-page-1080-93a6451624.png)
Radar server/client=False/False; contacts/living=2/20; paused=True; real supply markers=0.
Actual page: `{"index": 1, "pages": 2, "names": ["xXnoscopeXx", "STATIC"]}`. Both pages retain the same eight-row surface; no blank stat rows are drawn.

### bf6-supply-1080
![bf6-supply-1080](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-supply-1080-ed6a1f1784.png)
Radar server/client=False/False; contacts/living=4/20; paused=True; real supply markers=1.
Authoritative drop positions: `[{"x": -559.677140222687, "z": 586.1042325038652, "kind": "crate"}]`. Normal care-drone scheduling was reached with the existing `time 90` console command, then held for capture.

### bf6-pause-1080
![bf6-pause-1080](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-pause-1080-b3d9e6389c.png)
Radar server/client=False/False; contacts/living=4/20; paused=True; real supply markers=0.

### bf6-upgrade-1080
![bf6-upgrade-1080](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-upgrade-1080-f605636009.png)
Radar server/client=False/False; contacts/living=4/20; paused=True; real supply markers=0.

## Picked-reference comparisons and exact 200% crops

- [ammo-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/ammo-200pct-32ca579380.png)
- [ammo-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/ammo-concept-200pct-3989fe36b3.png)
- [bf6-ammo-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-ammo-vs-concept-1080-ef598072c8.png)
- [bf6-ammo-vs-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-ammo-vs-concept-200pct-44546bba7b.png)
- [bf6-cluster-map-vs-reference.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-cluster-map-vs-reference-c1758979cb.png)
- [bf6-cluster-vs-reference-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-cluster-vs-reference-200pct-7c7313033e.png)
- [bf6-feed-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-feed-vs-concept-1080-052743f3f7.png)
- [bf6-feed-vs-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-feed-vs-concept-200pct-47ee0d7f37.png)
- [bf6-map-vs-world-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-map-vs-world-200pct-f37c044d98.png)
- [bf6-map-world-vs-held-fight-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-map-world-vs-held-fight-1080-5587e76ba7.png)
- [bf6-minimap-vs-reference-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-minimap-vs-reference-200pct-8565010a76.png)
- [bf6-pause-focus-vs-reference-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-pause-focus-vs-reference-200pct-5117e6e582.png)
- [bf6-pause-vs-reference.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-pause-vs-reference-5814327d26.png)
- [bf6-ribbon-combined-vs-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-ribbon-combined-vs-concept-200pct-79a499e7d3.png)
- [bf6-ribbon-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-ribbon-vs-concept-1080-2aa2031dfe.png)
- [bf6-ribbon-vs-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-ribbon-vs-concept-200pct-0ec4f7cb16.png)
- [bf6-scoreboard-pages-native-pair.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-scoreboard-pages-native-pair-2ea8802d3d.png)
- [bf6-scoreboard-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-scoreboard-vs-concept-1080-0d58d96711.png)
- [bf6-upgrade-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-upgrade-vs-concept-1080-1e0f3cc44a.png)
- [cluster-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/cluster-200pct-4184bb0355.png)
- [cluster-reference-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/cluster-reference-200pct-80da1e5df0.png)
- [feed-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/feed-200pct-98e6420df2.png)
- [feed-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/feed-concept-200pct-4aea3dff00.png)
- [map-world-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/map-world-200pct-60af2dfb4f.png)
- [minimap-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/minimap-200pct-4ad9cb080a.png)
- [minimap-reference-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/minimap-reference-200pct-9c99386b0d.png)
- [pause-details-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/pause-details-200pct-bde9c71232.png)
- [pause-focus-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/pause-focus-200pct-3bc201a810.png)
- [pause-focus-reference-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/pause-focus-reference-200pct-faebcdbe2c.png)
- [ribbon-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/ribbon-200pct-e4090acf74.png)
- [ribbon-combined-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/ribbon-combined-200pct-972bc3800d.png)
- [ribbon-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/ribbon-concept-200pct-daa8819f83.png)
- [scoreboard-details-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/scoreboard-details-200pct-44262b04df.png)
- [supply-map-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/supply-map-200pct-c34232e661.png)

Pairs preserve native pixels and pad unequal dimensions. Crops are exact nearest-neighbor 200% enlargements, with source hashes and rectangles in the manifest. No HUD pixels are repainted.

## Source resource appendix

![Native original icon resource check](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/bf6-icons-1080-8655b1ae63.png)
This labelled native source fixture checks original resources at their optical sizes. It is not exported gameplay or offer-state evidence. The fixture is strict-debug and excluded from every export.

## Validation

BattleDuty BF6 HUD round 6
Source: 2ab2f67b6a45c4cee0047f735c7b8238959ed975
Fresh branch from merged #2271, origin/main 80c3bcba2.
Rajdhani, pinned GodotJS 4.6.1 v8-nopc revision 2. No FSR2.
67 focused identity/HUD/Tab/export-boundary checks passed.
The single full pnpm test run executed all 11 gates: 10 passed. Root units: 2454 passed, one skipped. Game rules: 1009 passed. The Windows godot-cli suite had 289 passes, six skips and two failures caused by process-enumeration/ownership timeouts. Both exact cases passed their serial rerun (2/2), with no surviving fake engines. Full suite is not claimed wholly green.
pnpm install, godot-cli rebuild, imports:seed and native project import completed. Both new original SVG icon sidecars were generated by the native importer and committed.
Windows Playtest preview export succeeded. Shader pre-baking is disabled to fit a ten-minute ticket; normal runtime shader compilation and authored visual settings remain active. The tracked export preset is restored byte-for-byte. The matching verified arena passed export:check; shared publication is disabled for this unmerged preview.
EXE SHA-256: 2ea45618e836641fcba2da8dce419ee26d2bdd6a4ddc80510b083a6d914112dc
No audience or chat behavior was changed. Callsigns are display attribution; kills, score, performance events, chat reactions and audience rules are unchanged. The existing stream scene receives the stable eight-row scoreboard extent for backing geometry/message capacity. First-run playability remains a non-gate per the orchestrator and was not repeated.
Capture states use the finite debug-only local replay and godot-cli capture, without OS focus. No runtime inspection bridge or listener is exported. The source icon appendix is labelled separately and its fixture excluded from every export. Crops retain exact source pixels, with rectangles/hashes recorded. Raw engine logs are not uploaded.
After the final pause-count placement tweak, 46 focused HUD/Tab/replay checks passed. The final export completed after one native reimport retry; its preset hash and EXE bytes were verified.
Final native capture: 11 states at the exact source head, plus a labelled native source icon appendix. The final last page contains the player and one real opponent, while preserving the same eight-row frame. Low ammo: 04 / 90 with a real HEADSHOT and FRENZY KILL receipt. Radar on paused/live: 20/20 living enemies. The supplied care-drone state contains one authoritative drop and one drawn supply marker.
Captured states have zero script/runtime errors. One generic pre-gameplay engine error was recorded: Condition p_image.is_null() || p_image->is_empty(). It preceded the first gameplay frame; it is preserved separately in capture-source.json and is not represented as a clean engine log. All supplied HUD resources were visually checked.
The final cheap-profile headless smoke reached runtime inspection with zero script errors. Its exact instance and session were stopped; all owned Godot processes/holds were closed by 07:59:09 EDT, inside the reserved 07:50-08:00 turn.


Every exported marked frame waits for its exact local acknowledgement after godot-cli capture returns. No OS focus, inspection bridge or listening endpoint is needed. Raw engine logs are not uploaded.

- [capture-source.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/capture-source-13536b7680.json)
- [focus-free-plan.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/focus-free-plan-7ff8f711c2.json)
- [full-r6-crops.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/full-r6-crops-78d77457ad.json)
- [icon-sheet-source.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/icon-sheet-source-baea09b139.json)
- [preview-export-options.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/preview-export-options-294821e8f2.json)
- [validation-r6.txt](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/validation-r6-897d57ee24.txt)
- [headless-smoke.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r6/headless-smoke-d99b5f5c8b.json)

[Shared HUD conventions](https://github.com/KamranAsif/Godmode.exe-roguelite/blob/2ab2f67b6a45c4cee0047f735c7b8238959ed975/docs/bf6-ui-conventions.md)
[Rajdhani licence and provenance](https://github.com/KamranAsif/Godmode.exe-roguelite/blob/2ab2f67b6a45c4cee0047f735c7b8238959ed975/assets/fonts/ATTRIBUTION.md)