PR #950 corrections, 2026-10-04

The van uses the approved 2 cm distance-outline reduction, 10-sided hub-and-tread
wheels and the per-car paint mask. The sedan remains Meshy low-poly. All 13 batch-2
props were rebuilt with dominant planar-face colour assignment: no texture-border
subdivision, light trim bleed removed, dark inset details preserved. The shed and
water tank have clean trim edges. The fender is rotated only in its review scene
and framed horizontally so it fills its tile. No batch-2 prop was placed in the map.

in-engine/ contains the van and sedan in the branch's existing faceted-review scene,
using the game's daylight and vehicle renderer. renders/ and batch02-props-sheet.png
show all 13 props in Godot. Every rendered launch was windowed and off-screen.
The sheet uses each model's own scale for legibility, rather than a shared world scale.

Validation: pnpm format; pnpm build (exit 0); full root pnpm test (13/13 steps passed);
colour regressions (2 passed); planar regressions (6 passed, 1 plain-Python skip);
Blender dissolve regressions (2 passed); source/derived hashes verified for all 17
records; Godot project import completed through an off-screen GPU wrapper; refreshed
native review and headless inspection smoke loaded without script errors. Godot emits
existing zero-denominator Point2 diagnostics in the native vehicle showcase.

The initial cold-cache build reported an optional arena-cache generation failure.
A post-import arena prebuild was stopped to stagger memory use with Lane D; the
optional prebuilt cache is not generated. No further arena/import retry was started.

For reproduction, run tools/assets/build-faceted-models.py in Blender with --runtime
(the van selects the reduction automatically; --reduce van also selects it explicitly),
then node tools/assets/western-block/build-vehicle-ground.mjs. Source hashes and
archive paths are in faceted-provenance.json. Copy the archived props as binary glTF
into artifacts/pr950/models/<name>.glb.bin; source/review.gd and its scene configurations
can be copied into artifacts/pr950. Use godot-cli game screenshot with --scene and a
named session; its runner enforces 640x360, windowed, off-screen captures.
