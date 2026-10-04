# PR #926 / #917: van round two — reverted

Final code: `a5e7e03a1d6d8565658a7b28fdd681ddcbf07668`. The approved skyline and shop changes remain byte-for-byte at PR round-one state. All van changes introduced by PR #926 were reverted to its parent, including the 25 mm fairing and paint-only normal-depth change. Approved texture bytes and #912 per-car paint remain intact. This is the requested fallback, **not a claim that the van panels are fixed**.

## One source repair attempt

The approved source has 327,436 vertices / 500,010 triangles. Coincident UV-seam normals agree (dot products 1); face-to-authored normal agreement has median 0.990, with 90% above 0.925. Cross-sections show uneven skin geometry. The previous six topological smoothing steps cover very little distance in densely tessellated regions and veto updates where authored normals differ most.

The attempted repair used four normal-direction passes over an 18 cm physical radius with 25 mm spatial samples, a 35-degree panel guard and a 60 mm displacement ceiling. It recomputed and spatially averaged painted normals across UV seams; source textures, UVs, trim, tyre floor and bounds stayed unchanged. It passed four panel tests, material checks and deterministic regeneration, but rendered review still showed the hood/fender dent and uneven paint/trim joins. The source skin combines panel edges and trim in one textured surface; stronger broad fairing does not reconstruct clean panel boundaries. A local panel reconstruction would need more authored geometry work than this bounded attempt. The attempt was discarded as requested.

## Unbaked 1920×1080 captures

Every PNG is a native viewport capture from GodotJS on the Windows GPU, windowed/off-screen at -10000,-10000, FOV 75, photo mode, HUD hidden, `GODMODE_STUDY_UNBAKED=1`. No bake was run. Front and rear use the original review cameras; the final side is a true broadside camera. The attempt's third camera is an opposite front-quarter view, labelled accordingly. Definitions and image hashes accompany the images.

| State | Front | Side / other front quarter | Rear |
| --- | --- | --- | --- |
| Discarded repair | [front](attempt/front.png) | [opposite front](attempt/opposite-front.png) | [rear](attempt/rear.png) |
| Final rollback | [front](final/front.png) | [side](final/side.png) | [rear](final/rear.png) |

## Validation

`pnpm format`, `pnpm build`, `pnpm lint`, `pnpm format:check`, `pnpm test` all pass (13/13 steps). Restored vehicle regeneration `--check` and material tests pass. Final rendered and headless runs report zero `GODMODE_FRAME_ERROR`, `SHADER ERROR` or `SCRIPT ERROR`; headless inspection confirms one connected player. All three owned instances stopped. [Logs](validation).

The first fresh import was stopped while compressing a restored lightmap atlas; the atlas was moved beneath ignored artifacts and imports completed without it. This was import compression, not a bake. Import/capture download hooks were temporarily disabled for the unbaked review and restored; `package.json` is unchanged.
