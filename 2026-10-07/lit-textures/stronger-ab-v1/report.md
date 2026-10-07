# Stronger material A/B

A reproduces the original #1005 material settings; B applies the separate stronger commit. Both native captures use main base 08429cb22, the same cameras, environment, sun and frozen candidate crop atlas. The branch was subsequently rebased onto d69194b2c; only the unrelated tip-count overlay, HUD layout and its unit test changed. Captured material files remain byte-identical, and the rebased branch received a full build and headless smoke check.

B doubles bark/leaf contrast and fine normals, deepens crown light/shade variation, and gives cars and street props richer roughness/metallic/clearcoat response. Geometry, palette, texture scales, hex sampling and lighting remain fixed.

Shared hex rotation/offset/triplanar blending, texture scale and mip/gradient sampling unchanged. Full production atlas restored after capture. This is a material A/B on one fixed audit crop, not a new bake or full-production lighting approval.

Eight sequential native moving-camera stills per variant are spatial samples, not a continuous motion verdict. No new MP4 is claimed for this variant; Kamran reviews the look.

A/B each contain ten original 1920x1080 views and eight native moving-camera stills. Earlier import diagnostics and interrupted B-v3 are retained locally and excluded. Do not merge either variant before Kamran chooses and approves the look.
