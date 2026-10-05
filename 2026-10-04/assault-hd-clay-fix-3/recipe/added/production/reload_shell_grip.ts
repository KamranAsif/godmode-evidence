import { Basis, MeshInstance3D, Node3D, Transform3D, Vector3 } from "godot";

export interface ReloadShellGrip {
    readonly shellInPalm: Transform3D;
    readonly radius: number;
    readonly centreInPalm: Vector3;
}

/** The #943 shell runs along local -Z; hold its exterior above the palm. */
export function reloadShellGrip(shell: Node3D, palmWidth: number): ReloadShellGrip {
    const bounds = shell instanceof MeshInstance3D ? shell.get_aabb() : null;
    const centre = bounds ? Vector3.ADD(bounds.position, Vector3.MULTIPLY(bounds.size, 0.5)) : Vector3.ZERO;
    const radius = bounds ? Math.max(bounds.size.x, bounds.size.y) * 0.5 : 0.009;
    const basis = Basis.from_euler(new Vector3(Math.PI / 2, 0, 0));
    // X is the left palm's outward normal. The centre must be one shell
    // radius beyond the skin, rather than embedded at the palm origin.
    const centreInPalm = new Vector3(radius + palmWidth * 0.04, palmWidth * 0.15, 0);
    return {
        radius,
        centreInPalm,
        shellInPalm: new Transform3D(basis, Vector3.SUBTRACT(centreInPalm, Basis.MULTIPLY(basis, centre))),
    };
}
