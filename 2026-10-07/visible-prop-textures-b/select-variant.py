import subprocess,sys
from pathlib import Path
mode=sys.argv[1]
source="c69e90aabcbd077a8095bd322aa41d29e1a7cad0" if mode=="before" else "HEAD"
files=["assets/maps/waterfront/pier-timber.gdshader","scripts/client/faceted_surface.ts","scripts/client/waterfront_batches.ts","scripts/client/western_block_materials.ts","scripts/environment_modules/furniture_materials.ts","scripts/environment_modules/module_meshes.ts","scripts/street_dressing.ts"]
subprocess.run(["git","restore","--source="+source,"--",*files],check=True)
print("Selected",mode,"source",source,"; atlas, geometry and camera paths unchanged")
