import { Mesh, MeshInstance3D, Node3D, PackedVector3Array, Transform3D, Vector3 } from "godot";

const radii = new WeakMap<Node3D, Map<string, number>>();
/** Cross-section of the actual foreend mesh near this body's support grip. */
export function foreendGripRadius(weapon: Node3D, grip: Vector3, palmWidth: number): number {
    const key = `${grip.z.toFixed(3)}:${palmWidth.toFixed(3)}`;
    let cached = radii.get(weapon);
    if (!cached) {
        cached = new Map();
        radii.set(weapon, cached);
    }
    const previous = cached.get(key);
    if (previous !== undefined) return previous;
    let low = Infinity,
        high = -Infinity;
    const inverse = weapon.global_transform.affine_inverse();
    const sample = (node: Node3D): void => {
        if (String(node.get_name()) === "MagazineSocket") return;
        if (node instanceof MeshInstance3D && node.mesh) {
            const t = Transform3D.MULTIPLY(inverse, node.global_transform),
                b = t.basis,
                o = t.origin;
            for (let surface = 0; surface < node.mesh.get_surface_count(); surface++) {
                const array = node.mesh.surface_get_arrays(surface).get(Mesh.ArrayType.ARRAY_VERTEX) as PackedVector3Array;
                const points = new Float32Array(array.to_byte_array().to_array_buffer());
                for (let i = 0; i < points.length; i += 3) {
                    const x = points[i],
                        y = points[i + 1],
                        z = points[i + 2];
                    const modelY = b.x.y * x + b.y.y * y + b.z.y * z + o.y;
                    const modelZ = b.x.z * x + b.y.z * y + b.z.z * z + o.z;
                    if (Math.abs(modelZ - grip.z) > palmWidth * 0.45 || modelY < grip.y - 0.002 || modelY > grip.y + palmWidth * 0.8) continue;
                    const modelX = b.x.x * x + b.y.x * y + b.z.x * z + o.x;
                    low = Math.min(low, modelX);
                    high = Math.max(high, modelX);
                }
            }
        }
        for (const child of node.get_children()) if (child instanceof Node3D) sample(child);
    };
    sample(weapon);
    const radius = Number.isFinite(low) ? Math.max(0.012, Math.min(palmWidth * 0.65, (high - low) / 2)) : palmWidth * 0.4;
    cached.set(key, radius);
    weapon.set_meta("supportGripRadius", radius);
    return radius;
}

const rearClearances = new WeakMap<Node3D, Map<number, number>>();

/** Distance behind the rear sight occupied by the closed weapon mesh. */
export function rearWeaponClearance(root: Node3D, weapon: Node3D, rear: Vector3, bore: Vector3, scale: number): number {
    let cached = rearClearances.get(weapon);
    if (!cached) {
        cached = new Map();
        rearClearances.set(weapon, cached);
    }
    const previous = cached.get(scale);
    if (previous !== undefined) return previous;
    const direction = bore.normalized();
    const inverse = root.global_transform.affine_inverse();
    let clearance = 0;
    const sample = (node: Node3D): void => {
        if (String(node.get_name()) === "MagazineSocket") return;
        if (node instanceof MeshInstance3D && node.mesh) {
            const t = Transform3D.MULTIPLY(inverse, node.global_transform),
                b = t.basis,
                o = t.origin;
            for (let surface = 0; surface < node.mesh.get_surface_count(); surface++) {
                const array = node.mesh.surface_get_arrays(surface).get(Mesh.ArrayType.ARRAY_VERTEX) as PackedVector3Array;
                const points = new Float32Array(array.to_byte_array().to_array_buffer());
                for (let i = 0; i < points.length; i += 3) {
                    const x = points[i],
                        y = points[i + 1],
                        z = points[i + 2];
                    const px = (b.x.x * x + b.y.x * y + b.z.x * z + o.x) * scale;
                    const py = (b.x.y * x + b.y.y * y + b.z.y * z + o.y) * scale;
                    const pz = (b.x.z * x + b.y.z * y + b.z.z * z + o.z) * scale;
                    clearance = Math.max(clearance, (rear.x - px) * direction.x + (rear.y - py) * direction.y + (rear.z - pz) * direction.z);
                }
            }
        }
        for (const child of node.get_children()) if (child instanceof Node3D) sample(child);
    };
    sample(weapon);
    cached.set(scale, clearance + 0.02);
    return clearance + 0.02;
}
