import { resolve } from "node:path";
import { resolveArtSource } from "../art-source.mjs";

export function validateDefinitions(definitions) {
    if (!definitions || Array.isArray(definitions) || typeof definitions !== "object" || !Object.keys(definitions).length)
        throw new Error("Expected a nonempty model definition object");
    for (const [model, definition] of Object.entries(definitions)) {
        if (!/^[a-z0-9][a-z0-9-]*$/.test(model) || model.endsWith("-arms") || /^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/.test(model))
            throw new Error(`Invalid model slug: ${model}`);
        if (!definition || typeof definition.source !== "string" || !definition.source.endsWith(".glb") || typeof definition.manifest !== "string")
            throw new Error(`${model}: source GLB and clip manifest are required`);
        if (!["player", "daemon"].includes(definition.catalog) || typeof definition.firstPersonArms !== "boolean")
            throw new Error(`${model}: explicit catalog and firstPersonArms are required`);
        if (definition.materialMap !== undefined && typeof definition.materialMap !== "string") throw new Error(`${model}: materialMap must name a JSON file`);
        if (definition.textureMaxSize !== undefined && ![1024, 2048, 4096, 8192].includes(definition.textureMaxSize))
            throw new Error(`${model}: textureMaxSize must be 1024, 2048, 4096 or 8192`);
        if (definition.requireFullFingers !== undefined && typeof definition.requireFullFingers !== "boolean")
            throw new Error(`${model}: requireFullFingers must be boolean`);
        if (
            definition.wristCuffRepair !== undefined &&
            (typeof definition.wristCuffRepair !== "boolean" || (definition.wristCuffRepair && model !== "assault-hd"))
        )
            throw new Error(`${model}: wristCuffRepair is only supported for the native assault-hd rig`);
        if (
            definition.elbowOverlapRepair !== undefined &&
            (typeof definition.elbowOverlapRepair !== "boolean" || (definition.elbowOverlapRepair && (model !== "assault-hd" || !definition.wristCuffRepair)))
        )
            throw new Error(`${model}: elbowOverlapRepair requires the native assault-hd wrist repair`);
        for (const key of ["rig", "clips"])
            if (definition[key] !== undefined && typeof definition[key] !== "string") throw new Error(`${model}: ${key} must name a path`);
    }
    return definitions;
}

export function modelBuilds(definitions, { root, sources, downloads, outputDirectory, model }) {
    validateDefinitions(definitions);
    if (model && !definitions[model]) throw new Error(`Unknown model: ${model}`);
    return Object.entries(definitions)
        .filter(([name]) => !model || name === model)
        .map(([name, definition]) => ({
            model: name,
            source: definition.source.startsWith("art-source://") ? resolveArtSource(definition.source) : resolve(sources, definition.source),
            rig: resolve(downloads, definition.rig ?? `${name}-walk.fbx`),
            clips: resolve(downloads, definition.clips ?? `clips/${name}`),
            manifest: resolve(root, definition.manifest),
            output: resolve(outputDirectory, `character-${name}.glb`),
            catalog: definition.catalog,
            firstPersonArms: definition.firstPersonArms,
            materialMap: definition.materialMap ? resolve(root, definition.materialMap) : null,
            textureMaxSize: definition.textureMaxSize ?? 1024,
            requireFullFingers: definition.requireFullFingers ?? false,
            wristCuffRepair: definition.wristCuffRepair ?? false,
            elbowOverlapRepair: definition.elbowOverlapRepair ?? false,
        }));
}
