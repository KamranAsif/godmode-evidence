import { Weapon, WeaponCategory } from "../packages/game-rules/src/match";

export type Vector3Tuple = readonly [number, number, number];
export type QuaternionTuple = readonly [number, number, number, number];

interface WeaponPresentationBase {
    readonly displayName: string;
    readonly animationPrefix: "Pistol" | "Shotgun" | "MachineGun" | "SniperRifle";
    readonly modelScene: string;
    readonly modelNodeName: string;
    readonly heldNodeName: string;
    readonly firstPersonArmsNodeName: string;
    /**
     * How far past the muzzle socket the flash sits, in metres along the
     * model's own bore.
     *
     * A distance, not an offset: which way the bore runs is the model's to
     * say, and `placeMuzzleFlash` reads it from the socket pair the model
     * ships. This used to be a three-component offset authored against
     * whichever way the source asset happened to lay its axes out, and when
     * every weapon was re-exported into one canonical frame the pistol's
     * entry kept pointing the flash backwards into the slide. A scalar
     * cannot go stale that way.
     */
    readonly muzzleFlashStandoffMeters: number;
    readonly worldMuzzleFlashStandoffMeters?: number;
    readonly muzzleFlashDurationMs: number;
    readonly shootAnimationDurationMs: number;
    readonly adsFov: number;
    /**
     * How this weapon is carried. This is the whole of its screen placement:
     * the shared WEAPON_HOLD_POSES entry for this hold decides where it sits
     * at rest, in a sprint and down the sights, for every weapon alike.
     */
    readonly hold: WeaponHold;
    /**
     * The real firearm's overall length. Models are imported scaled to this,
     * so relative sizes come out right on their own and no weapon carries a
     * presentation scale of its own.
     */
    readonly lengthMeters: number;
    /**
     * A placeholder repaint: multiplies the model's own albedo, so a gun that
     * borrows another's model (the SMG and DMR the assault rifle's) reads as
     * its own. Absent draws the model as authored.
     */
    readonly tint?: Vector3Tuple;
}

export type WeaponPresentationDefinition = WeaponPresentationBase;

const radians = (degrees: number): number => (degrees * Math.PI) / 180;

export const WORLD_GRIP_QUATERNION: QuaternionTuple = [0.416735, -0.312957, -0.044705, 0.852286];
/**
 * The field of view the viewmodel pass renders with, independent of the
 * world's.
 *
 * A weapon at true size under the world's 75-degree view reads as a toy, and
 * scaling it up instead only drags its stock behind the eye where nothing can
 * draw it. Narrowing the viewmodel's own view magnifies the weapon without
 * moving it, which is how shooters have always squared this: separate weapon
 * FOV, weapon left at its real size. Roughly 1.6x the apparent size of the
 * world view, and it does not zoom with ADS — the sights are on the optical
 * axis either way, so only the world should appear to close in.
 */
export const VIEWMODEL_FOV = 50;
/**
 * Models are imported at true real-world size and rendered at it. VIEWMODEL_FOV
 * does the magnifying, so nothing here rescales a weapon and relative sizes
 * come straight from each weapon's own lengthMeters.
 */
export const VIEWMODEL_SCALE = 1;
/** Existing proximal support socket used by the first-person native arms. */
export const SUPPORT_GRIP_SOCKET = "WorldLeftGripSocket";

/**
 * How a hand sits on what it holds, as two directions in the weapon's canonical
 * frame (X right, Y up, -Z along the bore): which way the fingers run from the
 * wrist, and which way the forearm leaves the wrist.
 *
 * The model's grip/close socket pair sets the palm normal. Native finger
 * chains supply the first-person wrap. forearmDirection sets the resting
 * elbow pole; reloads retain the native clip's elbow plane.
 */
export interface HandGrip {
    readonly fingerDirection: Vector3Tuple;
    readonly forearmDirection: Vector3Tuple;
}

/** Native hand contact fit; these do not move the weapon or its sights. */
interface SupportHandFit {
    readonly palmRollDegrees?: number;
    readonly sprintPalmRollDegrees?: number;
    readonly sprintOffset?: Vector3Tuple;
    readonly sprintForearmDirection?: Vector3Tuple;
    readonly thumbDirection?: Vector3Tuple;
    readonly thumbTipDirection?: Vector3Tuple;
}

export const FIRST_PERSON_SUPPORT_FITS: Readonly<Record<Weapon, SupportHandFit>> = {
    pistol: {},
    shotgun: {
        palmRollDegrees: 25,
        sprintPalmRollDegrees: 25,
        thumbDirection: [0.05, 1, -0.1],
        thumbTipDirection: [0, 0.3, -0.95],
    },
    machineGun: { sprintPalmRollDegrees: 15 },
    smg: { sprintPalmRollDegrees: 15 },
    dmr: { sprintPalmRollDegrees: 15 },
    // The shotgun's model, so the shotgun's pump grip.
    grenadeLauncher: {
        palmRollDegrees: 25,
        sprintPalmRollDegrees: 25,
        thumbDirection: [0.05, 1, -0.1],
        thumbTipDirection: [0, 0.3, -0.95],
    },
    sniperRifle: {
        sprintPalmRollDegrees: 25,
        sprintOffset: [-0.01, 0, 0],
        sprintForearmDirection: [0, -1, 0.5],
    },
};

/** The native pistol hands differ in palm width and finger rigging. */
export const PISTOL_NATIVE_HAND_FITS: Readonly<Record<WeaponCategory, { readonly offset?: Vector3Tuple; readonly thumbDirection?: Vector3Tuple }>> = {
    assault: {},
    breach: { thumbDirection: [0.15, -0.06, -0.99] },
    marksman: { offset: [-0.008, 0, 0] },
};

/** How a weapon is carried, which is what decides where it sits on screen. */
export type WeaponHold = "oneHanded" | "shouldered";

interface HoldPose {
    /** Camera-local position for the weapon's own RightGripSocket. */
    readonly gripTarget: Vector3Tuple;
    /** Camera-local direction the bore points, normalized on use. */
    readonly boreDirection: Vector3Tuple;
    /** Cant about the bore. */
    readonly boreRollRadians: number;
}

/**
 * Where a carried weapon sits on screen, authored once for the whole game
 * rather than per weapon.
 *
 * Every model is imported into one canonical frame at its true real-world size
 * (see tools/assets/build-meshy-weapons.py), so a pose expressed as "put the
 * firing grip here and point the bore there" resolves correctly for any weapon
 * held that way — a longer barrel simply reaches further, exactly as it should.
 * Nothing below is tuned per weapon, and adding one requires no addition here.
 */
export const WEAPON_HOLD_POSES: Readonly<
    Record<
        WeaponHold,
        {
            readonly rest: HoldPose;
            readonly sprint: HoldPose;
            /** Camera-local distance from the eye to the rear sight while aimed. */
            readonly adsEyeRelief: number;
            /** Cant applied to the aimed pose, shared by every weapon held this way. */
            readonly adsBoreRollRadians: number;
            /** The firing hand on the pistol grip (a rifle's pistol grip is a pistol grip). */
            readonly firingGrip: HandGrip;
            /**
             * The support hand. Stated per hold because these are genuinely different
             * grips: a rifle's support hand cups a horizontal fore-end from underneath,
             * while a handgun has no fore-end and the support hand closes over the
             * firing hand. Null means one-handed and the support arm keeps its clip.
             */
            readonly supportGrip: HandGrip | null;
        }
    >
> = {
    // The initial framing used the reference weapon's muzzle and
    // butt measured off the Call of Duty 4 captures, back-solved into
    // the grip target and bore direction that land them there, given that
    // weapon's own geometry and VIEWMODEL_FOV. The shouldered hold brings
    // the grip closer so the shortest native arms can reach the fore-end.
    //
    // The weapon's two extremes are the anchor rather than its sights: where a
    // model puts its sights varies, but every firearm has a muzzle and a butt,
    // so pinning those frames any proportions the same way. Anchoring on the
    // sights instead matched them exactly and still sent our machine gun's
    // whole rear half off-screen, because it carries more receiver behind the
    // rear sight than the reference weapon does. Re-derive rather than nudge.
    oneHanded: {
        // A pistol is pushed out toward the target rather than tucked in, so
        // its grip sits further from the eye and closer to the centre line.
        //
        // Both entries put the weapon's own grip and muzzle on the exact screen
        // positions measured off the reference capture, and that framing holds
        // at any distance along those two rays — the distance only decides how
        // foreshortened the weapon is and how large the hands holding it come
        // out. It was solved at 0.33 m, where the framing was right but the
        // hands were nearly twice the size of the reference's, filling the
        // middle of the view. Re-solved at 0.48 m: the weapon lands in exactly
        // the same place on screen and the hands come back to the reference's
        // scale.
        //
        // The grip sits at the reference's screen height (0.757), no lower.
        // Dropping it to hide the sleeve overlap below the hands put the grip
        // at 0.87, and looking that steeply down onto a level gun makes it
        // converge on the vanishing point hard enough to read as slanting
        // down and to the right — measured level, seen as forty-five degrees.
        //
        // Fourteen degrees of pitch and ten of yaw, no cant, at 0.42 m. Measured
        // off the reference: its slide foreshortens to 0.19 screen-heights
        // for a 0.217 m gun at that distance, which is a view about 22 degrees
        // off the bore, and its muzzle sits 0.06 screen-heights above its
        // hammer, which at these distances takes fourteen degrees of pitch. The grip sits nine centimetres right of the eye, which
        // alone views it from twelve degrees; the yaw makes up the rest. With
        // no yaw the view is dead-rear, and on this model — whose sights stand
        // six centimetres over the bore — the near end then towers over the
        // muzzle and the gun reads as a vertical bar. Every earlier verdict on
        // these numbers was taken while the model was rolled 42 and then 27
        // degrees by two separate importer faults, so none of them meant what
        // they seemed to.
        rest: { gripTarget: [0.087, -0.1, -0.42], boreDirection: [-0.168, 0.242, -0.956], boreRollRadians: 0 },
        sprint: { gripTarget: [0.0465, -0.15, -0.3807], boreDirection: [-0.6157, 0.1415, -0.7751], boreRollRadians: radians(24) },
        adsEyeRelief: 0.3,
        adsBoreRollRadians: radians(4),
        // Fingers wrap forward from each side of the grip. Elbows stay back,
        // down and apart so the wrist can meet the palm without folding back.
        firingGrip: { fingerDirection: [0, -0.15, -0.99], forearmDirection: [0.4, -0.45, 0.8] },
        // Both hands on the grip: the support palm covers the firing fingers
        // from the left and its fingers run forward over them; its forearm
        // drops down and out to the left, mirroring the firing arm, so the two
        // sleeves leave the frame apart instead of across each other.
        supportGrip: { fingerDirection: [0, -0.15, -0.99], forearmDirection: [-0.4, -0.45, 0.8] },
    },
    shouldered: {
        // A long gun is braced against the shoulder, so the grip comes back and
        // to the right and the muzzle crosses toward the centre of the screen.
        //
        // A shared 36 cm grip depth leaves the shortest native arms enough
        // reach for the proximal fore-end socket in both hip and sprint holds.
        rest: { gripTarget: [0.1895, -0.1919, -0.36], boreDirection: [-0.1017, 0.0536, -0.9934], boreRollRadians: radians(5) },
        sprint: { gripTarget: [0.0788, -0.1974, -0.36], boreDirection: [-0.5209, -0.0979, -0.848], boreRollRadians: radians(26) },
        adsEyeRelief: 0.09,
        adsBoreRollRadians: radians(2),
        // Same hand on the rifle's pistol grip; the forearm drops under the
        // stock rather than crossing it, elbow tucked against the body.
        firingGrip: { fingerDirection: [0, -0.15, -0.99], forearmDirection: [0.1, -0.92, 0.38] },
        // Cupping the fore-end from below: the palm is under it, the fingers
        // run across to the right to close over the top, and the forearm comes
        // in from below and a little to the left — steeply, so the elbow is
        // out of frame rather than lying across the middle of the view.
        supportGrip: { fingerDirection: [0.95, 0, -0.3], forearmDirection: [-0.4, -0.88, 0.26] },
    },
};

export const WEAPON_PRESENTATION: Readonly<Record<Weapon, WeaponPresentationDefinition>> = {
    pistol: {
        displayName: "Pistol",
        animationPrefix: "Pistol",
        modelScene: "res://assets/weapons/generated/pistol.glb",
        modelNodeName: "PistolModel",
        heldNodeName: "HeldPistol",
        firstPersonArmsNodeName: "PistolFirstPersonArmsMesh",
        muzzleFlashStandoffMeters: 0.07,
        muzzleFlashDurationMs: 150,
        shootAnimationDurationMs: 633,
        hold: "oneHanded",
        // Approved fictional pistol, normalized by the asset builder.
        lengthMeters: 0.26,
        adsFov: 52,
    },
    shotgun: {
        displayName: "Shotgun",
        animationPrefix: "Shotgun",
        modelScene: "res://assets/weapons/generated/shotgun.glb",
        modelNodeName: "ShotgunModel",
        heldNodeName: "HeldShotgun",
        firstPersonArmsNodeName: "ShotgunFirstPersonArmsMesh",
        muzzleFlashStandoffMeters: 0.075,
        muzzleFlashDurationMs: 150,
        shootAnimationDurationMs: 633,
        hold: "shouldered",
        lengthMeters: 1.0,
        // Unlike the rest and sprint poses above, ADS is not stated as a
        // grip target plus a bore direction: it uses the hold's eyeRelief
        // form, because true aim needs both the rear AND front sight on
        // the camera's exact optical axis, which only a single on-axis
        // anchor plus forced bore-parallel alignment can guarantee. A
        // two-point target gets close but cannot force both points onto
        // the axis at once.
        adsFov: 52,
    },
    machineGun: {
        displayName: "Assault Rifle",
        animationPrefix: "MachineGun",
        modelScene: "res://assets/weapons/generated/assault-rifle.glb",
        modelNodeName: "MachineGunModel",
        heldNodeName: "HeldMachineGun",
        firstPersonArmsNodeName: "MachineGunFirstPersonArmsMesh",
        // The first-person entry also carried a 5 cm rise, which floated the
        // flash above the barrel of a model whose muzzle socket now sits on
        // the bore line itself. The bore is where the flash belongs.
        muzzleFlashStandoffMeters: 0.14,
        worldMuzzleFlashStandoffMeters: 0.04,
        // Short enough to read as a single ignition pulse and clear well
        // before the 100 ms automatic cadence.
        muzzleFlashDurationMs: 70,
        shootAnimationDurationMs: 633,
        hold: "shouldered",
        lengthMeters: 0.9,
        // See the shotgun's ADS comment above — true aim needs the
        // guaranteed-on-axis eyeRelief form, not a two-point target.
        adsFov: 45,
    },
    sniperRifle: {
        displayName: "Sniper Rifle",
        animationPrefix: "SniperRifle",
        modelScene: "res://assets/weapons/generated/sniperRifle.glb",
        modelNodeName: "SniperRifleModel",
        heldNodeName: "HeldSniperRifle",
        firstPersonArmsNodeName: "SniperRifleFirstPersonArmsMesh",
        muzzleFlashStandoffMeters: 0.085,
        muzzleFlashDurationMs: 120,
        shootAnimationDurationMs: 633,
        hold: "shouldered",
        lengthMeters: 1.15,
        adsFov: 32,
    },
    // Approved distinct bodies retain the existing native carry/reload clips.
    smg: {
        displayName: "SMG",
        animationPrefix: "MachineGun",
        modelScene: "res://assets/weapons/production/smg.glb.bin",
        modelNodeName: "SmgModel",
        heldNodeName: "HeldSmg",
        firstPersonArmsNodeName: "SmgFirstPersonArmsMesh",
        muzzleFlashStandoffMeters: 0.14,
        worldMuzzleFlashStandoffMeters: 0.04,
        // Clears well inside the 65 ms cadence.
        muzzleFlashDurationMs: 50,
        shootAnimationDurationMs: 633,
        hold: "shouldered",
        lengthMeters: 0.9,
        adsFov: 50,
    },
    dmr: {
        displayName: "DMR",
        animationPrefix: "MachineGun",
        modelScene: "res://assets/weapons/production/dmr.glb.bin",
        modelNodeName: "DmrModel",
        heldNodeName: "HeldDmr",
        firstPersonArmsNodeName: "DmrFirstPersonArmsMesh",
        muzzleFlashStandoffMeters: 0.14,
        worldMuzzleFlashStandoffMeters: 0.04,
        muzzleFlashDurationMs: 60,
        shootAnimationDurationMs: 633,
        hold: "shouldered",
        lengthMeters: 0.9,
        adsFov: 38,
    },
    grenadeLauncher: {
        displayName: "Grenade Launcher",
        animationPrefix: "Shotgun",
        modelScene: "res://assets/weapons/production/grenade-launcher.glb.bin",
        modelNodeName: "GrenadeLauncherModel",
        heldNodeName: "HeldGrenadeLauncher",
        firstPersonArmsNodeName: "GrenadeLauncherFirstPersonArmsMesh",
        muzzleFlashStandoffMeters: 0.075,
        muzzleFlashDurationMs: 110,
        shootAnimationDurationMs: 633,
        hold: "shouldered",
        lengthMeters: 1.0,
        adsFov: 55,
    },
};

export const weaponAnimation = (weapon: Weapon, suffix: string): string => `${WEAPON_PRESENTATION[weapon].animationPrefix}${suffix}`;
