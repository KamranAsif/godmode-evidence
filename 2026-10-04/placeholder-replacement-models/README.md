# Placeholder replacement models — approval gate

Kamran approved all four exact concepts on 2026-10-04: **“The concepts looks fine”**. [Per-asset approvals](approvals.json) bind that quote to the original evidence commit and PNG SHA-256 before either Hunyuan submission.

Generated through `pnpm assets:hunyuan-3d`, Tencent Hunyuan 3D V3.1, 500k selection. **Two generations, one per prop; no variants.** Reused the approved waterfront profile sequentially, checking it was unused before each launch. No Meshy calls.

## Ammo crate

[Angle 1](ammo-crate-01.png) · [Angle 2](ammo-crate-02.png) · [Angle 3](ammo-crate-03.png) · [Angle 4](ammo-crate-04.png)

500,000 triangles, one material, three embedded texture images. Handle, front latches, rear hinge plates, ribs and pickup band are intact. Raw XYZ bounds are 0.99346 × 0.49210 × 0.63448 provider units. Uniformly scaling its width to the intended 0.50 m would give approximately **0.50 × 0.248 × 0.319 m**: about 17% shorter than the 0.30 m placeholder height. No scale or geometry modification has been applied. Planar reduction and flat-colour material preparation remain deferred until model approval.

[Untouched raw model](https://github.com/KamranAsif/Godmode.exe-art-source/blob/assets/placeholder-models-20261004/3d-source/hunyuan/placeholder-ammo-crate-20261004/model.glb) · [Provider provenance](ammo-crate-hunyuan-provenance.json) · [Render manifest](ammo-crate-render-manifest.json)

## Killstreak tablet

[Angle 1](killstreak-tablet-01.png) · [Angle 2](killstreak-tablet-02.png) · [Angle 3](killstreak-tablet-03.png) · [Angle 4](killstreak-tablet-04.png)

500,000 triangles, one material, three embedded texture images. Keep its detailed case and textures for first-person use. **Review caveat: Hunyuan duplicated the front screen treatment onto the rear face** (angles 3–4); the front is usable, but the rear is not a conventional solid tablet back. Some fine case joins are softened. The model is rotated within the provider axes, so its raw AABB depth is not the physical case thickness. No corrective editing or reduction was applied. First-person scale/orientation, a flat live-UI screen surface, and approved arms remain future integration work.

[Untouched raw model](https://github.com/KamranAsif/Godmode.exe-art-source/blob/assets/placeholder-models-20261004/3d-source/hunyuan/placeholder-killstreak-tablet-20261004/model.glb) · [Provider provenance](killstreak-tablet-hunyuan-provenance.json) · [Render manifest](killstreak-tablet-render-manifest.json)

## Prepared icon textures

[Icon review sheet](icons/icon-review.png) · [Heal mask](icons/medic-256.png) · [Commanded mask](icons/officer-256.png) · [Icon provenance](icons/provenance.json)

Clean SVG reconstructions of the approved silhouettes, rasterized into white RGBA tint masks at 256, 64 and 32 pixels. Alpha is transparent and antialiased; no generated gradient, baked colour or typography. Tint in-engine: medic mint `#9EFFA8`, commanded amber `#FFBD3D`. Use a charcoal runtime shader outline where needed for light backgrounds. Review sheet shows 128/64/32/24 px on light and dark backings. Source SVGs and the preparation script are included. No game wiring or importer sidecars yet: these are staged outside the runtime project.

## Validation and retention

- All eight renders verified at **1920×1080**, four 90-degree-separated azimuths per raw model, using Blender 5.2.1 Cycles, 24 samples, AgX and neutral studio lighting. Geometry/materials were not altered. No game or Godot was launched.
- Raw model hashes, approved input hashes and exactly 500,000 triangles verified for both runs. All six icon PNGs verified as RGBA, white RGB, alpha 0–255. `pnpm test:hunyuan-3d`: 7 passed.
- Original concepts, per-asset approvals, untouched models, provider previews, diagnostics and provenance retained on the `assets/placeholder-models-20261004` branch of the private art-source repository. Icon sources and derivatives retained under `derived/hud/placeholder-icons-20261004/`.
- [Delivery manifest](manifest.json). **Model approvals are pending. Nothing is integrated.**
