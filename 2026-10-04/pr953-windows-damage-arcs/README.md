# PR #953 Windows validation

Exact PR head: f15a655dbf7c763bc3653206d4be5f906d363bdb.

PASS: pnpm build (including arena prebuild), full root pnpm test (13/13 steps), rendered hits from two directions. Both capture receipts show two active arcs. Newest bearings: -1.0024 and +0.8508 rad; health 90 then 82. These are real Soldier attacks, with invincibility disabled during capture; health is refilled only between hits to keep the run alive. No artificial damage/indicator injection. Windowed 1920x1080 offscreen at (-10000,-10000).

No SCRIPT ERROR, GODMODE_FRAME_ERROR or triangulation errors. Existing stale-lightmap warning and snapshot camera-projection diagnostics remain; navigation RID leaks appear at shutdown.
