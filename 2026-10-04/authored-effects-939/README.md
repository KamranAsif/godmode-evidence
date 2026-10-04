# #939 authored asset effects

BattleDuty-aimbot, game commit `6046f7ae4098b5143f3e67809d05936cdce58e13` (rebased onto `e3b8f456b`). This lane covers audit items **8b, 14, 15, 16 and 20**. Approved runtime GLBs are the inputs; no new generated art or Meshy submissions.

The Blender 5.2.1 postprocess is `tools/assets/build-authored-effects.py`. It reads exact inputs at `cab48bf41`, partitions existing native faces into emissive surfaces, fits inner commander shells to the approved plates, and adds a single nine-round belt mesh with cases, bullets and connected links. `provenance.json` records input/output hashes, measurements, triangle counts and prior approvals. Family provenance records point to it.

Runtime spheres/boxes/cylinders for these items are deleted. Drone strobes retain 1.4 Hz / 30% duty; the lens changes white/red with hunting. Commander shells appear for broken plates or a stun. Helicopter engines light during hover and retain their native geometry when unlit. Friendly signals are cyan; event signals are red. Each changing actor owns its material. The minigun keeps its shot-driven index motion.

| Audit item | In-game capture | What to inspect |
| --- | --- | --- |
| 8b | [Drone lens](08b-drone.png), [rotor undersides](08b-drone-strobes.png) | Camera glass is emissive; red strobe surfaces occupy the native motor undersides. |
| 14 | [Intact](14-commander-intact.png), [broken plates](14-commander-broken.png) | Chest, helmet and left plate broken through the actual boss command; exposed targets follow armour contours. |
| 15 | [Closed](15-helicopter-closed.png), [hover](15-helicopter-hover.png) | Native orange engine surfaces, with the game's hover target prompt. |
| 16 | [UAV](16-event-uav.png), [event transport](16-event-transport.png) | Red sensor and belly beacon on the existing aircraft skin. |
| 16 | [Friendly drone](16-friendly-drone.png), [sentry](16-friendly-sentry.png), [supply transport](16-friendly-transport.png) | Cyan material signals on actual equipped supports and a supply flight. |
| 20 | [Minigun belt](20-minigun-belt.png) | Nine modeled rim/case/shoulder/bullet cartridges and dark steel links, beside the receiver. |

Each PNG has a matching `-state.json` with the inspection store and relevant native mesh nodes. All captures use `godot-cli game run --offscreen --offscreen-size 1920x1080 --fixture roguelite --inspect --allow-actions`, session `s-muuf3pdq-35cfddd1b0f2`, instance `authored-939-render`. Camera framing uses `debug_console` free flight; spawn/event/plate commands exercise the real simulation. A separate `authored-939-smoke` headless instance loaded a live player. Both were stopped. No lighting bake was run.

Validation logs are in [validation](validation). Final `pnpm test`: **13/13 steps passed** (including 635 game-rules tests). `pnpm build`, `pnpm lint` (0 errors, 5 existing max-lines warnings), and `pnpm format` completed; nine focused asset/signal/weapon-motion tests pass. `godot-cli project import --project .` refreshed the rebuilt assets and generated tracked script UIDs. The final full test rerun is recorded separately from the earlier baseline failures, which were resolved by main's #949. Builds skip automatic prebuilt arena generation with `GODMODE_PREBUILT_GENERATING=1`: this checkout builds the missing arena live. This is an arena startup warning, not a frame error. Final rendered, full capture, and headless logs each contain **zero `GODMODE_FRAME_ERROR`**.

Tunable defaults: signal emission strength 4–8 (drone strobes 5); commander inner shells use 80% of the approved plate contour; belt has nine rounds. No gameplay damage, hit zones or boss exposure windows changed.
