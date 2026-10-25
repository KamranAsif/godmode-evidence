# BattleDuty - BF6 HUD - round 5

Exported build source: `46a2eaa3dde5b78e142d1189ab2762dfa33bf80b`
PR validation head: `d02653545ef7bf4b905eb69d87aace12ab9f49ea` (R5-authored runtime/assets byte-identical after upstream KDE rebase; see equivalence proof)
Windows Playtest EXE SHA-256: `d859ee7bedfc6c3b2a5d52637d427e48a7a69c29da61631ebaa43e3460e216c2`
Pinned GodotJS 4.6.1 v8-nopc revision 2, Windows Playtest debug export. All gameplay frames are native 1920x1080. Shader PRE-BAKING is disabled only for this preview: the two baked exports exceeded the ten-minute ticket. Normal runtime shader compilation and all visual settings remain unchanged; the tracked preset is restored byte-for-byte.

Fresh branch `hud/bf6-round5-20261025` from origin/main after #2260 merged. Previous scores: Claude 8.5, Codex 9. Both critics should judge this round against the same locked BF6 picks. Target remains 10/10; these captures do not assert a critic score.

## Changes from round 4

- Server-owned callsigns are unique within the run and consistently uppercase in feed and standings. The saved stream handle keeps its own case. Real opponents are retained across eight-row scoreboard pages with the player pinned; Page Up/Down are rebindable. The stream backing receives the displayed page count. Pure scoreboard stills use the existing debug pin so chat idle expiry cannot close the game table during a delayed screenshot.
- The R-47 uses the actual full weapon mesh profile as its original drawing reference: a connected stock/receiver/fore-end, one lower optic and deliberate grip/trigger/magazine openings. EMP hardware and the smaller irregular cloud use the same filled equipment family. Actual availability opacity and the picked ready edge remain.
- Feed rows hold at full opacity, then fade for 300 ms after compositing their fill, contour, shadow and icon as one CanvasGroup.
- Map geometry and spotting/Radar rules stay authoritative. A faint one-pixel roof perimeter follows the actual footprint mask; the real arena perimeter and known supply-drop markers are drawn. No N glyph, invented objectives or compass.
- Pause adds a real Controls shortcut with return-to-pause navigation and installed-upgrade tiles from the actual build table. Picker card summaries stay single-line; selected deployables retain their timings beneath the cards.

## Exported gameplay states

### bf6-fight-1080
![bf6-fight-1080](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/bf6-fight-1080-bbb878318b.png)
font=Rajdhani HUD; own kills=1; Radar server/client=False/False; contacts/living=3/27; paused=True.

### bf6-low-ammo-1080
![bf6-low-ammo-1080](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/bf6-low-ammo-1080-6713bff09f.png)
font=Rajdhani HUD; own kills=8; Radar server/client=False/False; contacts/living=3/20; paused=True.

### bf6-map-hidden-1080
![bf6-map-hidden-1080](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/bf6-map-hidden-1080-cd0dec4231.png)
font=Rajdhani HUD; own kills=8; Radar server/client=False/False; contacts/living=0/20; paused=True.

### bf6-radar-on-1080
![bf6-radar-on-1080](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/bf6-radar-on-1080-5836a2c33c.png)
font=Rajdhani HUD; own kills=8; Radar server/client=True/True; contacts/living=20/20; paused=True.

### bf6-overlay-on-1080
![bf6-overlay-on-1080](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/bf6-overlay-on-1080-b6d355ec94.png)
font=Rajdhani HUD; own kills=8; Radar server/client=False/False; contacts/living=3/20; paused=True.

### bf6-radar-on-live-1080
![bf6-radar-on-live-1080](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/bf6-radar-on-live-1080-dc6add03b7.png)
font=Rajdhani HUD; own kills=8; Radar server/client=True/True; contacts/living=20/20; paused=False.

### bf6-scoreboard-1080
![bf6-scoreboard-1080](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/bf6-scoreboard-1080-e2665efbee.png)
font=Rajdhani HUD; own kills=9; Radar server/client=False/False; contacts/living=3/19; paused=True.
Actual page: `{"index": 0, "pages": 2, "names": ["xXnoscopeXx", "ASH", "GLASS", "ORBIT", "ORBIT-5", "ROOK", "ROOK-2", "STATIC"]}`; full real roster: 10 rows.

### bf6-scoreboard-page2-1080
![bf6-scoreboard-page2-1080](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/bf6-scoreboard-page2-1080-5518cecf41.png)
font=Rajdhani HUD; own kills=9; Radar server/client=False/False; contacts/living=3/19; paused=True.
Actual page: `{"index": 1, "pages": 2, "names": ["xXnoscopeXx", "VANDAL", "VANDAL-2"]}`; full real roster: 10 rows.

### bf6-pause-1080
![bf6-pause-1080](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/bf6-pause-1080-b30d39d70a.png)
font=Rajdhani HUD; own kills=9; Radar server/client=False/False; contacts/living=3/19; paused=True.

### bf6-upgrade-1080
![bf6-upgrade-1080](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/bf6-upgrade-1080-37a1b5f42e.png)
font=Rajdhani HUD; own kills=9; Radar server/client=False/False; contacts/living=3/19; paused=True.

## Picked-reference pairs and exact 200% crops

- [ammo-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/ammo-200pct-ad572bf73f.png)
- [ammo-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/ammo-concept-200pct-3989fe36b3.png)
- [bf6-ammo-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/bf6-ammo-vs-concept-1080-761d8f8786.png)
- [bf6-ammo-vs-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/bf6-ammo-vs-concept-200pct-800e910d5a.png)
- [bf6-cluster-map-vs-reference.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/bf6-cluster-map-vs-reference-52724606f2.png)
- [bf6-cluster-vs-reference-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/bf6-cluster-vs-reference-200pct-3d65b13fc5.png)
- [bf6-feed-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/bf6-feed-vs-concept-1080-a6f0d6e5b5.png)
- [bf6-feed-vs-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/bf6-feed-vs-concept-200pct-f9248e8975.png)
- [bf6-map-vs-world-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/bf6-map-vs-world-200pct-c0474d8392.png)
- [bf6-map-world-vs-held-fight-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/bf6-map-world-vs-held-fight-1080-00620eeb04.png)
- [bf6-minimap-vs-reference-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/bf6-minimap-vs-reference-200pct-c305e15de8.png)
- [bf6-pause-focus-vs-reference-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/bf6-pause-focus-vs-reference-200pct-04ab470cf5.png)
- [bf6-pause-vs-reference.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/bf6-pause-vs-reference-c74ef0742e.png)
- [bf6-ribbon-combined-vs-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/bf6-ribbon-combined-vs-concept-200pct-693b11a213.png)
- [bf6-ribbon-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/bf6-ribbon-vs-concept-1080-ca3e375b2d.png)
- [bf6-ribbon-vs-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/bf6-ribbon-vs-concept-200pct-0ac691c715.png)
- [bf6-scoreboard-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/bf6-scoreboard-vs-concept-1080-25c0be4733.png)
- [bf6-upgrade-vs-concept-1080.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/bf6-upgrade-vs-concept-1080-0520c9c82a.png)
- [cluster-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/cluster-200pct-4940efe548.png)
- [cluster-reference-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/cluster-reference-200pct-80da1e5df0.png)
- [feed-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/feed-200pct-34c807a4f7.png)
- [feed-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/feed-concept-200pct-4aea3dff00.png)
- [map-world-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/map-world-200pct-02644accc8.png)
- [minimap-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/minimap-200pct-2cb5843405.png)
- [minimap-reference-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/minimap-reference-200pct-9c99386b0d.png)
- [pause-focus-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/pause-focus-200pct-ae7cbf29c0.png)
- [pause-focus-reference-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/pause-focus-reference-200pct-faebcdbe2c.png)
- [ribbon-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/ribbon-200pct-981a7a0315.png)
- [ribbon-combined-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/ribbon-combined-200pct-7a98920779.png)
- [ribbon-concept-200pct.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/ribbon-concept-200pct-daa8819f83.png)

Comparison pairs preserve native pixels; unequal dimensions are padded, never stretched. Crops are exact nearest-neighbor 200% enlargements with source hashes and rectangles in the manifest. No HUD pixels are painted over.

## Native resource appendix

![Original icons at equal ready ink](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/bf6-icons-1080-8655b1ae63.png)
This is a labelled native SOURCE fixture, not an exported gameplay state. It uses the same original assets, with both rifle optical sizes and all five gadget glyphs at equal enabled ink for art comparison. The debug-only fixture is excluded from every export.

## Validation

Exported views: 10; script/runtime errors: 0; startup texture errors: 0.
101 affected identity/keybinding/HUD/export-boundary/spawn checks passed. Full pnpm test ran all 11 gates: 9 passed initially, with two stale HUD mocks and one Windows CLI process-test timeout. Both mocks were updated: all 2,443 root unit tests then passed (one skipped); the CLI failing case passed its serial rerun. The full suite was not represented as wholly green.
Fresh-profile seed 1871 previously produced 61 own kills / 61 distinct canonical victim names but failed the two-minute audience assertion. The first-run check is NOT a merge gate (dropped October 14, per the orchestrator). A controlled main run failed earlier in restart setup; its active-fight diagnostic failed at 50.385 seconds. R5 reached two minutes but failed the audience assertion. These are different failure points, not proof of the same assertion on main. A subsequent source audit took under five minutes: callsigns change display attribution only, numeric kill/performance records and chat reactions are unchanged, and audience/chat implementations are unchanged. The existing Tab/chat backing receives displayed scoreboard-row count for geometry and message capacity only. No audience thresholds or rules were relaxed; see the sanitized audit and comparison.
Post-rebase targeted checks: 62/62 passed. Capture ACK/export-boundary checks: 24/24 passed. The ten exported states were captured between 06:06 and 06:07 EDT during the reserved window; all owned engines and the GPU hold were released by 06:07:31.
Captures use the finite debug-only Playtest review dispatcher with existing console/input handlers and godot-cli capture, without OS focus. Each marked state waits for its exact local file acknowledgement before the finite replay advances; held states therefore survive a screenshot waiting on the shared window lock. The runtime inspection bridge is excluded from the export. All owned renderers and holds are closed before publication.

- [capture-source.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/capture-source-cc68e7a45b.json)
- [focus-free-plan.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/focus-free-plan-b2a0e39c79.json)
- [full-r5-crops.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/full-r5-crops-24105ab0ee.json)
- [icon-sheet-source.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/icon-sheet-source-fea41ebaa3.json)
- [validation-r5.txt](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/validation-r5-0b78bddf2e.txt)
- [callsign-proof.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/callsign-proof-22e1fefe52.json)
- [preview-export-options.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/preview-export-options-54eec6f3ad.json)
- [hud-source-equivalence.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/hud-source-equivalence-b8e2d446c0.json)
- [audience-comparison-results.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/audience-comparison-results-178ca12d15.json)
- [audience-comparison-method.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/audience-comparison-method-477636cae6.json)
- [audience-chat-audit.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/bf6/full-r5/audience-chat-audit-cc6c75c7a0.json)

[Shared HUD conventions](https://github.com/KamranAsif/Godmode.exe-roguelite/blob/46a2eaa3dde5b78e142d1189ab2762dfa33bf80b/docs/bf6-ui-conventions.md)
[Rajdhani licence and provenance](https://github.com/KamranAsif/Godmode.exe-roguelite/blob/46a2eaa3dde5b78e142d1189ab2762dfa33bf80b/assets/fonts/ATTRIBUTION.md)