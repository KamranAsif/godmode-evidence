from pathlib import Path
p=Path('scripts/study_lighting_preview.ts')
s=p.read_text()
s=s.replace('    MeshInstance3D,','    MeshInstance3D,\n    MultiMeshInstance3D,\n    ShaderMaterial,')
s=s.replace('/** Native camera-matched','import { applyWallTexture } from "./client/faceted_surface";\nimport { MATERIAL_SLOTS } from "./environment_modules/module_contract";\nimport { loadShared } from "./shared_resources";\n\n/** Native camera-matched')
marker='        if (name === "debug_lighting"'
assert marker in s
s=s.replace(marker,Path('artifacts/preview-trials.txt').read_text()+'\n'+marker)
p.write_text(s)
