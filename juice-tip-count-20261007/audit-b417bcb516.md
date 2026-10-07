# Independent Codex tip-count audit

**ALL PASS. `allPass: true`; `mergeClearance: true` for the three-file tip-count delta at the final revision below. No real failure found; no merge performed.**

Final candidate/head: `9afaba9709fd9fb492b0c10df2bfda8b97d15a3d`; tree `e5a331642148e61cb26d7250409f6b244599be47`.
Final base: `08429cb224892e6fae2336eb03e61374a9ee6866`; tree `93fc2205441fbd1b78eba61618d84da6af1c4968`.

Actual capture and smoke candidate: `899732c4683887dc977ab4fee7ee8c91d52f330b`; tree `bc455736b3a95e8b3fe7a4516b4b95b19c29f50f`.
Actual capture base: `24bb855f4ad9f1aa5e12e67410fcfecfe92c25a6`; tree `ec1aabbfcf4364014ff67053db26787f74a41b1a`.
Control: `bfcb267190b4be15c72e4a196a44a202524ea83f`; tree `ec1aabbfcf4364014ff67053db26787f74a41b1a` (exactly the capture base tree).

The final candidate is a clean rebase. Its three tip files are byte-identical Git objects to the captured candidate; the final delta is still 47 insertions and 2 deletions. The base adds only 10 lines in combat_feel.ts and 1 in snapshot_renderer.ts for terminal-hit presentation. These are outside the tip code and no player gun is fired in the tip captures. Clearance does not relabel the capture or separately certify that combat change.

| Tip-scope file | Captured and final Git blob (identical) |
| --- | --- |
| `scripts/hud_layout.ts` | `9a12dfd743f1f6e0e535a2a1b0396469b73c9e4b` |
| `scripts/client/stream_overlay.ts` | `74df7e855b879d7480a5ac8b3318f0023e06d936` |
| `tests/unit/hud-layout.test.mjs` | `5d94ff1df0cd432531c73c723470e150ecd4c734` |

Read AGENTS, GAME, ART_STYLE, ARCHITECTURE, the networking ownership context and survival meta, plus the stream session/chat/overlay, console, gift rules and HUD helper. User-directed CPU-only audit overrides repository boilerplate about tests/reviewer rounds/PR creation. All writes stayed in audit-vision. Zero engine launches, imports, tests, source edits or PR actions.

Coverage: all 72 candidate and 80 control native PNGs and RGBA buffers; every one of 245 candidate and 241 control decoded MP4 label frames at unscaled 1:1. The strip ROI is native pixels (1470,280)-(1902,324). Every native full frame is present in contextual overview sheets; original-resolution candidate frames 0/7/25/47/71 and control 0/8/25/49/79 were inspected. Video context was checked every 15th frame, with original-resolution encoded candidate frames 27/244 and control 26/240. Overview sheets alone are downscaled review derivatives; native evidence and label crops are not resized.

Four accepted debug_console commands in each run use `stream tip 25/5/10/1`, scheduled at 300/600/2400/4800 ms. Source trace reaches LiveStream.gift, real chat, alert, TipBot and tip listeners, not overlay setters. The ignored harness instantiates scripts/game.ts and only reads the real Tips label/stream state while forwarding normal runtime actions.

Candidate donation deliveries occur at 0.365728/0.729452/2.542449/4.847676 s; control at 0.420337/0.640570/2.501849/4.845303 s. In the candidate, the second donation arrives while the actual label is $21; it remains $21 immediately across that action and subsequent sampled frames rise through $24/$27/$29 to $30. The complete observed progression is $0/$14/$21/$24/$27/$29/$30/$35/$38/$39/$40/$41. Control snaps $0/$25/$30/$40/$41. No recorded reversal or value above the actual stream total occurs. Candidate first exact $30/$40/$41 native frames are 10 at 1.328930 s, 25 at 3.078200 s, and 47 at 5.418973 s (receipt values govern); final native frame 71 is $41 and remains settled.

Source confirms the 450 ms bounded cubic ease, floor-to-integer display, retargeting from the currently evaluated animation amount without an integer jump, and immediate first-display/loss behavior. Hide and goLive clear the presentation state. These resets and nonzero first display are source/log coverage, not separate rendered trials. The economy total is immediate and untouched; only label presentation lags.

The real Tips rectangle remains [1156,192,102,17] in logical canvas coordinates (1.5x at 1080p), with scale [1,1] and visible throughout. The green right-aligned Inter text remains inside the strip with no clipping, overlap or footprint growth. Card styles, colors, font, placement and viewer pulse are unchanged. The game HUD, stream layer 7 and cheat-engine presentation remain distinct. Existing opener/trainer coverage of the centre is inherited, not a new obstruction. A challenge card is not active in this trial.

Native PNG pixels exactly match all RGBA buffers; all raw hashes match receipts. Published standalone before-tip.png exactly equals control frame 8 ($30, 0.884535 s); after-tip.png exactly equals candidate frame 7 ($27, 0.908483 s). These were selected by capture-time vicinity, not matched world locations. Seven raw URLs were downloaded once: HTTP 200 and byte-identical SHA-256 to local evidence. Full raw-frame hashes are in evidence-analysis.json, bound below.

Both MP4s are silent native 1920x1080 H.264 yuv420p at 30 CFR, made by temporal holds/drops of actual captured frames. Candidate/control decode to 245/241 frames (8.167/8.033 s containers). Native capture elapsed is 8.131499 s for candidate; control elapsed and every timestamp are retained in JSON. Encoded time starts from the first sampled image, so MP4 time is not the donation wall clock. Native mean/max gaps are 112.136/173.301 ms candidate and 101.005/226.984 ms control; receipts estimate 164/173 missed target intervals. No generated interpolation or spatial resizing is used for the evidence.

Owner-produced verification logs independently read: original pnpm test 13/13, separate HUD tests 22/22, rebased pnpm-test-lethal-base.log (UTF16) 13/13. Original headless smoke PID 10320 has loaded/ready markers, actual stream tips 5 and no SCRIPT ERROR/TypeError/ReferenceError matches. Owner reports stopped forced:true; auditor neither ran tests nor controlled an engine.

Limits of clearance:

- Captures and smoke belong to 899732c/24bb855, never 9afaba9/08429cb. Final tip-scope clearance transfers through identical Git blobs and a read-only review of the unrelated base delta.
- Idle, invincible arena at normal timescale; donations are developer-triggered through normal gift pathways, not proof of tips earned by play.
- Control/candidate differ in world location, actors, random chat, viewers (47->42 versus 17->16), opener timing and capture cadence. Screenshots are near the same capture time, not pixel-matched scenes.
- Candidate native gaps mean/max 112.136/173.301 ms; control 101.005/226.984 ms. CFR30 holds/drops native frames. No generated interpolation, no spatial evidence resize, no continuous 1x or smooth-30fps claim.
- All label crops are reviewed at native 1:1. Full-frame overview sheets are downscaled audit derivatives; selected full frames are reviewed at original resolution. Not every full video frame was visually reviewed at full-frame 1:1.
- Silent videos establish no audible TTS quality. No player firing, reload, kill, active damage-fracture or triangle-signature motion is exercised; preservation is source-scope evidence.
- First nonzero display, loss, hide/show and goLive reset are source/log covered, not a separately rendered reset/loss trial. The 450 ms duration is source-confirmed; capture gaps cannot establish exact render-frame completion time.
- A one-dollar gain floors to its old integer until it reaches the target; visible candidate $40->41 settles at native frame 47. This is expected, not missing donation credit.
- Existing central go-live panel and trainer notice cover world pixels early; the tip change adds no new footprint or centre obstruction. Challenge card not active in these clips.
- Smoke stop forced:true is the owner-provided stop result, not evidence of graceful teardown. Auditor did not start or stop any engine or process belonging to the game.

Published evidence (independently verified full SHA-256):

| Evidence | SHA-256 |
| --- | --- |
| [before-tip.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/juice-tip-count-20261007/before-tip-12c566b60e.png) | `12c566b60efdabbf13b1d3b701a7fd1bc9cbe3b19bece76743695dc19cf3c8c6` |
| [after-tip.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/juice-tip-count-20261007/after-tip-66bd063c80.png) | `66bd063c80a3cc0587d4c4bc5a8a375b176e49fed93091a6aafddeb5f63807e6` |
| [before-tip.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/juice-tip-count-20261007/before-tip-02d88628e4.mp4) | `02d88628e438bd3a4d22d3832b7f841eab099af556d49b59c94a020dd148a19c` |
| [after-tip.mp4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/juice-tip-count-20261007/after-tip-c56206c836.mp4) | `c56206c8365dc05983f0328865f55e0faa38ff86b4b816255096d4f7cc086e01` |
| [before-tip.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/juice-tip-count-20261007/before-tip-1e46158f1f.json) | `1e46158f1f4009a64f583a2c1a44b81071c607037ce42f17b96b74a0dc410b60` |
| [after-tip.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/juice-tip-count-20261007/after-tip-9b17a331df.json) | `9b17a331dfe2c2bc09b03c6283b4f7bec300f96b1ff093f728cfa760e3ff5d66` |
| [tip-proof.json](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/juice-tip-count-20261007/tip-proof-794f4e51f0.json) | `794f4e51f0920aa89582033892809a146317fa9660319eb510c637f5b11fc4fe` |

Local integrity ledgers:

- `evidence-analysis.json` SHA-256 `cb50e79b67cb5db5adfaa9cef1d9e4366e24b38a225fafaa718b847b28f34295`
- `publication-verification.json` SHA-256 `3254dee6964ef2a547bb5c0c2d9c91c68bab8d68cf4ab68c12fcbbf5839cd387`
- `pnpm-test-lethal-base.log` SHA-256 `d7d71d1c4619f633c86214d08f35c62fd85977ff61d1d3e9b565e4aae654ae08`

Signed: **Codex (/root), independent vision/source auditor**
signedAt: **2026-10-07T07:50:04Z** (UTC)
Agent attestation of the stated source/visual scope and limitations. Machine-readable counterpart: audit.json.
