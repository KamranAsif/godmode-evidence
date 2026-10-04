# PR #925, round two: pier timber

Source: `780d89d83f1fab94f746906720d28cce7e7438d6`, rebased on #924 (`8de60af96f6350292a0dfb9adc8125ecfa8e3b8c`). No lighting bake.

- `c07.png`: original pier/bulkhead play camera. Visible draw calls remain **3,605**, matching round one.
- `c03.png`: dock overview camera.
- `e03-front.png`: dock standing camera.
- `dock-timber.png`: added eight-metre dock-side view exposing wet/algae bases.

All four captures are unbaked 1920x1080 Godot viewport images from a windowed, unfocusable off-screen run. Poses and FOV are in views.json; inspections and counters accompany each image. The source shader matches manifest.json's hash. The approved water flecks and bridge courses are retained.

Passed pnpm format, build, lint and test (13/13 root steps), project import, rendered capture and headless smoke. Zero GODMODE_FRAME_ERROR, shader compilation failures or script errors. The inspection bridge emits existing Camera3D unproject_position `p.d == 0` warnings during capture snapshots; PNG dimensions and camera poses still validate.

Same mesh topology, material surfaces and MultiMesh batches (207 waterfront nodes, eight shared meshes). Timber uses centimetre-wide filtered fibres, fine brown fissures, mottled grey sun bleaching, olive wet bases, existing per-piece tone, and a 2.5% + 1.8% radial warp using existing vertices. No texture assets or draws added. Grain contrast, bleach and tide heights remain tunable defaults.

[Earlier round-one evidence](https://github.com/KamranAsif/godmode-evidence/tree/codex-917-structures-water-88ca0fa28/2026-10-04/917-structures-water)
