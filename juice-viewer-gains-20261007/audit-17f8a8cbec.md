# Independent Codex vision audit: juice lane147 viewer-count pulse

**SCOPED ALL PASS** for the six observed-fixture presentation gates below. No unqualified gameplay, lifecycle, audio or continuous-motion signoff.

Candidate **bfcb267190b4be15c72e4a196a44a202524ea83f**; base **bfce057de19529c66d193f7b69a103e099575e2a (#1001)**. Read candidate AGENTS.md, GAME.md and ART_STYLE.md. BattleDuty-aimbot survival is the current game direction; LiveTube remains its separate stream layer. Explicit user audit authority overrides stale reviewer/evidence boilerplate.

| Gate | Verdict | Observation |
|---|---|---|
| Layout | PASS | No clipping, count/LIVE/tips/chat overlap or changed corner anchoring. |
| Readability | PASS | Two-/three-digit count and watching remain legible at peak and sampled settle, native and encoded. |
| Settle | PASS | Three bounded gains decay to exact scale1 with no overshoot/lingering pulse in captured samples. |
| Neutral loss | PASS | Settled197->50 loss remains1; ordinary decay inside a gain continues that settle without restart. |
| Style separation | PASS | Inter stream chrome remains distinct from condensed combat data and visible monospace trainer. Font/palette/layer and cheat-engine style source unchanged. |
| Combat visibility | PASS | Count pulse remains peripheral; gun/crosshair/radar/ammo/damage lattice keep their existing presentation and space. Scope is no pulse-driven obstruction. |

## Exact inspection coverage

- **191 distinct native PNGs:** control frames0000-0095 (96), candidate0000-0092 (93), and both standalone before-viewer.png/after-viewer.png.
- All189 recorded native full fields inspected in640x360 overview tiles, every native viewer ROI at**1:1**, and standalone1920x1080 PNGs at original detail. Candidate frame0005 additionally inspected at original full detail.
- **402 decoded MP4 viewer ROIs:** control decoded indices0-205 (206), candidate0-195 (196), every frame at**1:1**, no skipping. ffmpeg PNG filenames start at0001 for decoded index0.
- ROI is**x1440..1919,y250..344**,480x95 pixels, copied unchanged into ordered strips.54 original-detail review pages total. Complete field overviews are reduced1:3; the viewer ROI is never spatially resized.
- RawRGBA->nativePNG RGB pixels and receipt hashes match for all189 frames. viewer-proof.json labels/timestamps match every receipt frame. All four console actions in each run are accepted.
- The generated decoded full-field grids and extra unscaled full-native grids were**not reviewed**. No claim of1:1 inspection outside the viewer ROI on every frame, or of continuous1x playback.

## Gains, loss and actual timing

| Gain | Native onset | First sampled scale1 | Sampled elapsed | Last active / first neutral bounds |
|---|---|---|---:|---:|
|100 watching | f5 at0.366413s | f15 at1.059746s |693.333ms |619.196..693.333ms |
|200 watching | f29 at2.070528s | f39 at2.768953s |698.425ms |630.852..698.425ms |
|299 watching after request300 | f67 at4.779329s | f77 at5.442850s |663.521ms |599.313..663.521ms |

Peak is1.05999994277954 (float representation of1.06). Each sampled sequence decreases monotonically. Bounds bracket the source's650ms cubic settle; footage does not establish sub-frame expiry. Max sample gaps within these settle windows are74.137/106.705/81.778ms.

The explicit loss first appears at**f48,3.370280s**,197->50 watching, scale1. Existing decay also overlaps gain settles:100->99 atf10 scale1.006446;200->199 atf31 scale1.029496;299->298 atf70 scale1.019513. These continue the earlier settle, never begin a new loss pulse. Initial/final captured labels are neutral; control scale is always1.

## Gaps and scope limits

- Controlled ordinary debug-console jumps exercise the production overlay; they do not prove naturally earned audience, tipping or economy behavior. Actual delivery differs slightly from scheduled300/2000/3300/4700ms.
- Native cadence is sparse: control mean/max**67.00/421.94ms**,120 target intervals missed; candidate**70.10/231.77ms**,101 missed. CFR30 holds/drops native samples without interpolation. No uninterrupted motion, temporal-stability or performance claim.
- Control capture elapsed6.626061s, encoded206 frames/6.8667s; candidate capture6.501125s, encoded196 frames/6.5333s. Use native receipt timestamps for event timing.
- **Silent video only:** no TTS/audio/mix regression claim.
- Captured first/last neutral frames do not show actual initial goLive, hidden/reveal or restart transitions. Their neutral reset is source-supported only.
- Gains are1704.115ms and2708.801ms apart. No repeated gain inside1500ms or exact cooldown boundary is visually exercised. Source and reported unit assertions support that rule.
- World/camera, chat, initial audience21 vs15 and damage timing differ. Gun/camera are mostly stationary and magazine remains30. No claim of pixel-matched combat, shooting/recoil/reload/kill behavior equivalence.
- Full cheat-engine menus are absent; the visible third text family is the trainer monospace strip. Menu style source is unchanged, but full menu appearance is not visually revalidated.
- Larger count widths and other resolutions are not covered.
- Final UTF16 pnpm-test-reset.log reports**13/13 passed**. No tests/build/import/engine/smoke or cleanup executed by this auditor; supplied smoke/cleanup status is not independently reproduced.

No visual blocker was found within this fixture's scope. Source unchanged at audited HEAD. Audit writes and CPU-only media processing only;**zero engine/GPU/PR actions**.

Signed:**Codex / independent vision auditor / root**
Signed UTC:2026-10-07T06:35:00.205561+00:00
Named auditor attestation with SHA256 integrity digest, not a public-key signature.
audit.json SHA256:4e05d902dcf936e201664bf420e3dbce764722036fa0df7792b76731a7f5aab6

Exact file/frame hashes and page coverage:media-inventory.json,telemetry-analysis.json,visual-review-manifest.json. Previous pending source-preparation audit retained separately.
