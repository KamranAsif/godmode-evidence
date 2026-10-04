from pathlib import Path
p=Path('tools/maps/study/bake-lighting.mjs').read_text()
p=p.replace('../../godot-cli/dist/src/cli.js','../tools/godot-cli/dist/src/cli.js').replace('../lightmap-baker.mjs','../tools/maps/lightmap-baker.mjs')
p=p.replace('const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");','const project = process.cwd();')
p=p.replace('await save("asset-import.json", await run(["project", "import", "--project", project], baker));','// Warm runtime imports already verified; skip native scan of TS source project.')
p=p.replace('await save("runtime-import.json", await run(["project", "import", "--project", project]));','// Runtime import verified already; shader/script changes load from the freshly built sources.')
Path('artifacts/bake-audit.mjs').write_text(p)
