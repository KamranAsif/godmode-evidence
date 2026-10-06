# Export rope and launch checks — overnight 2026-10-05–06 (local)

Repository: KamranAsif/Godmode.exe-roguelite. Initial latest main: 7fbdbedbf. Final branch: 821098ce65ce6e392389e3361a7493e514df88e3, rebased onto 9c25255d6 (#979). Windows 11, GodotJS 4.6.1 custom 14d19694e, D3D12 Forward+, AMD Radeon RX 9070 XT. Peers continued working on this shared machine.

## Results

One physical faceted tan cable now connects the helicopter to a front-left torso/harness anchor in both first person and observer views. The old 8 mm observer cable became subpixel in the overview and was hidden in first person; the separate camera-local stand-in did not establish the complete connection. Diameter is a tunable 36 mm; offset is 0.25 m left, 0.38 m forward and 0.4 m above the player origin. Landing detachment and retraction stay on the existing path. No generated character/prop art or Meshy submission was needed.

The current-main export stalled before gameplay in every clean rendered baseline attempt. Loading the client/server native scenes serially fixes that observed stall. #947 also still rebuilt 15,120,000 static foliage vertices per client launch: that expansion now happens before native mesh resources are saved at build time. Release builds refuse a missing/unloadable prebuilt arena rather than building it during startup. The saved-scene comparison proves the final geometry matches the live builder.

| Export / seconds | Fresh game/shader cache, pairs 1/2/3 | Warm repeats, pairs 1/2/3 |
| --- | --- | --- |
| Stock initial main 7fbdbedbf | >90 timeout, >90 timeout, >90 timeout | >90 timeout, >90 timeout, >90 timeout |
| Fix on 1a7b3eee7, before #978 art rebase | 22.336, 21.833, 21.985 | 11.180, 11.388, 12.015 |
| Fix on a3e0715c9, under memory pressure | 60.059, 43.446, 38.418 | 57.558, 23.062, 11.611 |
| Final fix on 9c25255d6 | 20.986, 20.758, 20.577 | 11.023, 11.021, 11.008 |

Final medians: 20.758 s cold and 11.021 s warm. Intermediate fixed exports are included because #978/#979 changed assets while this task was running; do not attribute those upstream asset changes to this fix. In the contended cohort, free physical RAM before the first five launches was 1.403–8.616 GiB; the last warm launch started with 16.502 GiB free and returned to 11.611 s. Every result is retained; the raw JSON records free/total RAM for both later cohorts. The original 0.32.1 smoke's 15.41 s and 0.31's 6.94 s are historical, uncontrolled observations, not a reproduced same-cache comparison. No percentage improvement against those values is claimed.

## Timing and diagnosis

Each pair uses a new Godot custom user directory; its second launch retains that directory. OS filesystem and driver shader caches are not flushed. Runs are rendered/windowed at 1920×1080, placed offscreen without focus; they are not headless or minimized. Imports, export generation and SDK staging occur before the launch clock starts. The clock is Godot's process millisecond clock, rather than CLI probe time. Raw JSON also records wall time observed around the CLI invocation.

The old GODMODE_FIRST_GAMEPLAY_FRAME join marker precedes the first snapshot and native primary viewmodel. The new GODMODE_FIRST_PRESENTED_GAMEPLAY_FRAME waits until the local player is alive, menu/loading panel hidden and equipped rifle/pistol viewmodel visible, then logs from a one-shot frame_post_draw callback. This prevents reporting an early ready/menu frame as gameplay. Both markers remain in the raw logs.

For continuity with the historical smoke counter, final old-marker readings were cold 19.650, 19.381, 19.187 s (median 19.381) and warm 10.362, 9.756, 9.753 s (median 9.756). These are readiness readings, rather than completed gameplay draws.

Warm final native rifle arms/rig load: 550, 545, 546 ms; median 546 ms. Warm native client arena load: 4958, 4951, 4936 ms; median 4951 ms. The weapon mesh and its first draw occur after the arms/rig stage and are included in the presented-frame marker. Native viewmodel loading is measurable but does not explain a doubling by itself. Shader/cache state and the much larger current lighting/arena matter: cold draws cost more than warm draws. Lighting is preserved, including the four 8192² atlas layers and 1380 lightmapped meshes. Export integrity checks passed; missing imports are checked before export and are excluded from boot timings.

The interval between client arena instantiation and embedded-server arena instantiation (which includes initial city draw/startup work) is cold 10.999, 10.920, 10.820 s, versus warm 3.586, 3.582, 3.591 s. This locates most of the cold/warm difference before the primary viewmodel loads. Shader/first-draw cost is an inference from these timings, rather than an isolated lighting-disabled A/B experiment.

Native release-template logs also report missing pre-raster shader / null-pipeline diagnostics during startup: fixed-current-1-cold: 21; fixed-current-1-warm: 21; fixed-current-2-cold: 21; fixed-current-2-warm: 21; fixed-current-3-cold: 21; fixed-current-3-warm: 21. They do not prevent the gameplay marker, but are retained as an unresolved native renderer limitation. The exported-pack editor captures below verify the changed presentation; they do not establish that every release-template material renders correctly. No clean-renderer claim is made from a timing marker alone.

An external diagnostic preloaded the stock arena before Game._ready and recovered gameplay, isolating the loader ordering from content corruption. That diagnostic also exposed the runtime static expansion: 1.621–2.128 s in five runs, 6.479 s under paging. Its full startup timings were heavily affected by shared-machine contention and are not used as clean before/after benchmarks. A native model expansion no longer appears in final startup logs.

## Artifact and capture method

All exports were produced with godot-cli game export. Stock and fixed native release executables were driven by godot-cli game run with exact instance/session names through a local engine adapter. The release template ignores --path/--script overrides, so the timing adapter removes those switches and launches the actual exported executable. A helper moves only that child PID's window offscreen. These harnesses are evidence artifacts, never packaged game code.

For runtime actions and full-resolution rope captures, the pinned matching editor loads the exported release pack with an external godot-cli inspection bridge. The final captures use production return presentation, its exported native assets and normal materials; overview/side are pinned at 1300 ms for repeatable framing. First-person looking-up shows the complete cable into the helicopter. Captures are untouched 1920×1080 PNGs. The release pack itself ships no tools/, tests/, artifacts/, inspection bridge path or inspection bridge code; pack-check.json verifies this and confirms the normal action-handler literal as a positive scan control.

The Windows export excludes ASTC. During the earlier baseline/build imports the host wrapper disabled the unused ASTC import target to avoid expensive CPU compression and restored project.godot byte-for-byte afterward. Both baseline and fixed exports used the same wrapper and passed the normal lighting/export checks. #978 subsequently disabled that target on Windows on main. #978/#979 changed source-contour/import/environment hashes and invalidated the existing lighting receipt; the normal full native lighting bake was refreshed for both rebases. The initial Vulkan bake ran out of memory during 8192² atlas readback; the same prepared scene/settings were retried with official Godot's D3D12 driver. The final bake uses that driver from the outset. The failed log is retained in the ZIP. No lighting check was bypassed and no quality reduction is part of this change.

## Verification

pnpm format; pnpm test (all 13 stages, including build/lint and pure-logic tests); godot-cli game export; three cold/warm native rendered pairs; headless game run + runtime inspect/action smoke; release-pack rope first-person/overview/side captures; PCK boundary inspection. Headless shader enumeration prints a native custom-sampler warning, and full bridge snapshots can print existing Camera3D projection diagnostics; no script or GODMODE_FRAME_ERROR occurred during the checked gameplay startup. Forced shutdown diagnostics are not startup errors. The native lighting bake reported probe-triangulation consistency warnings; its completed receipt and the runtime visuals are retained for review.

Saved arena verification: client 24829 nodes, fingerprint 1266463152, 5 foliage soups, matches=true, differences=[]. Max reconstructed position difference 0.00006103515625 m; max normal difference 0.00022396445274353027. Server 4171 nodes, fingerprint 1276010704, matches=true, differences=[].

The attached ZIP contains raw measurements/logs, export/check results, capture snapshots and the local measurement adapters. No end-to-end suite or reviewer agent round was run. The remaining cold/warm gap is reported, rather than hidden by reusing a shader cache for the cold runs.
