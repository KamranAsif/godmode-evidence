// Rebuild selected native rigs from owner-supplied meshes and Mixamo downloads.
import { spawnSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { readFileSync } from "node:fs";
import { modelBuilds } from "./mixamo/model-definitions.mjs";

const { values } = parseArgs({
    options: {
        sources: { type: "string" },
        downloads: { type: "string" },
        model: { type: "string" },
        blender: { type: "string", default: "blender" },
        "models-file": { type: "string" },
        "output-directory": { type: "string" },
        "clip-data-output": { type: "string" },
        "dry-run": { type: "boolean", default: false },
    },
});
if (!values.sources || !values.downloads) throw new Error("Usage: build-mixamo.mjs --sources DIR --downloads DIR [--model NAME] [--blender PATH]");
const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const modelsFile = resolve(root, values["models-file"] ?? "tools/assets/mixamo/models.json");
const models = JSON.parse(readFileSync(modelsFile, "utf8"));
const outputDirectory = resolve(root, values["output-directory"] ?? "assets/characters/mixamo");
const builds = modelBuilds(models, { root, sources: values.sources, downloads: values.downloads, outputDirectory, model: values.model });
function run(command, args) {
    if (values["dry-run"]) return console.log(JSON.stringify({ command, args }));
    const result = spawnSync(command, args, { cwd: root, stdio: "inherit" });
    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error(`${command} exited ${result.status}`);
}
for (const build of builds) {
    const { model, output } = build;
    run(values.blender, [
        "--background",
        "--python-exit-code",
        "1",
        "--python",
        "tools/assets/build-mixamo-character.py",
        "--",
        "--model",
        model,
        "--walk",
        build.rig,
        "--source-mesh",
        build.source,
        "--clips-dir",
        build.clips,
        "--clip-manifest",
        build.manifest,
        "--output",
        output,
        "--texture-max-size",
        String(build.textureMaxSize),
        ...(build.requireFullFingers ? ["--require-full-fingers"] : []),
        ...(build.materialMap ? ["--material-map", build.materialMap] : []),
    ]);
    run(process.execPath, ["tools/assets/compile-mixamo-catalog.mjs", output, build.catalog]);
    if (build.wristCuffRepair)
        run(values.blender, [
            "--background",
            "--python-exit-code",
            "1",
            "--python",
            "tools/assets/repair-assault-wrists.py",
            "--",
            output,
            output,
            "--model",
            model,
            ...(build.elbowOverlapRepair ? ["--elbow-overlap"] : []),
        ]);
    // Only the player bodies are ever seen in first person; the Daemon is only a strike donor (presentation.ts).
    if (build.firstPersonArms) {
        run(process.execPath, ["tools/assets/extract-mixamo-arms.mjs", output, resolve(outputDirectory, `character-${model}-arms.glb`)]);
        run(process.execPath, ["tools/assets/extract-mixamo-arms.mjs", output, resolve(outputDirectory, `character-${model}-knife-arms.glb`), "Right"]);
    }
}
run(process.execPath, [
    "tools/assets/build-mixamo-clip-data.mjs",
    "--models-file",
    modelsFile,
    "--directory",
    outputDirectory,
    "--output",
    resolve(root, values["clip-data-output"] ?? (values["output-directory"] ? resolve(outputDirectory, "mixamo_clip_data.ts") : "scripts/mixamo_clip_data.ts")),
]);
