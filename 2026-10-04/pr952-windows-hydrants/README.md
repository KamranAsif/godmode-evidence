# PR #952 Windows validation

Source: 71a61a0fb57d8c911a94262de1cfe26fd1aecbfd (exact PR head).

PASS: pnpm build, including arena prebuild; pnpm test, all 13 root steps. The rendered 1920x1080 window ran offscreen at (-10000,-10000). Three approved hydrant model placements captured through godot-cli. No SCRIPT ERROR or GODMODE_FRAME_ERROR. The inspection bridge emitted Camera3D.unproject_position p.d==0 diagnostics during snapshots; navigation RIDs were reported at shutdown. Existing stale-lightmap warning remains.
