# Combat material texture batch, B strength

Stacked on draft #1011, which stacks on #1010. Kamran reviews the appearance and continuous playback before any merge. No auditor or temporal PASS is claimed.

42 close/mid/far checks: 36 combat, weapon/magazine and ground presentation checks plus six earlier B assets for context. Magazine focus views reuse the two native gun assets; support variants share their original airframes. AC-130 is an existing authored asset shown for material review: the current ride still uses its gunner view, with no new gameplay airframe added.

Each sheet contains three unscaled native 1920x1080 panels and a 50px label strip. Gallery models use actual production factories/materials, at their original scale. The floor follows each model lower bound; these are isolated gallery material views, not matched production lightmap or collision proofs. Ground sheets are rigidly translated, unedited triangle samples of native manhole/grate/casting/leaf batches; provenance is in the manifest.

New unchanged CC0 fabric maps: [Poly Haven Book Pattern](https://polyhaven.com/a/book_pattern). Authored body atlases, normal maps, roughness/metal channels, friendly paint and signal surfaces remain in use. A warm-colour skin mask and olive dog-vest mask keep grain targeted; these heuristics are tunable. Skinned grain follows authored UVs rather than swimming world coordinates. Facets, rigs, gameplay, hit/death state and approved phone pose are not changed.

The earlier gallery-floor warmup is excluded. The final batch resumed after discovering that the conditional casting mesh is absent in this production map; its exclusion is recorded, existing completed views retained, with no per-asset visual audit loops. Hidden magazine mesh ancestors were masked by render layer in the fixture; corrected two magazine sheets and their motion section supersede excluded blank attempts. Only the complete submitted batch is linked here.

## Six street views

| View | Raw native PNG |
|---|---|
| street-01-outdoor.png | [raw PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/street-01-outdoor.png) |
| street-02-cars-trees.png | [raw PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/street-02-cars-trees.png) |
| street-03-furniture.png | [raw PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/street-03-furniture.png) |
| street-04-planter-contact.png | [raw PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/street-04-planter-contact.png) |
| street-05-covered.png | [raw PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/street-05-covered.png) |
| street-06-waterfront.png | [raw PNG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/street-06-waterfront.png) |

## Close / mid / far checks

[Overview](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/contact-sheet-index.jpg) | [Native dimensions, poses, material names and hashes](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/manifest.json)

| Asset / presentation | Raw native sheet |
|---|---|
| soldier-rifle | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/soldier-rifle-close-mid-far.png) |
| soldier-shotgun | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/soldier-shotgun-close-mid-far.png) |
| soldier-pistol | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/soldier-pistol-close-mid-far.png) |
| soldier-shield | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/soldier-shield-close-mid-far.png) |
| soldier-heavy | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/soldier-heavy-close-mid-far.png) |
| soldier-marksman | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/soldier-marksman-close-mid-far.png) |
| soldier-grenadier | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/soldier-grenadier-close-mid-far.png) |
| soldier-cloaker | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/soldier-cloaker-close-mid-far.png) |
| soldier-medic | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/soldier-medic-close-mid-far.png) |
| soldier-smg | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/soldier-smg-close-mid-far.png) |
| soldier-rpg | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/soldier-rpg-close-mid-far.png) |
| soldier-minigun | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/soldier-minigun-close-mid-far.png) |
| soldier-officer | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/soldier-officer-close-mid-far.png) |
| soldier-commander | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/soldier-commander-close-mid-far.png) |
| enemy-drone | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/enemy-drone-close-mid-far.png) |
| enemy-kamikaze | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/enemy-kamikaze-close-mid-far.png) |
| enemy-rccar | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/enemy-rccar-close-mid-far.png) |
| enemy-sentry | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/enemy-sentry-close-mid-far.png) |
| enemy-helicopter | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/enemy-helicopter-close-mid-far.png) |
| aircraft-uav | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/aircraft-uav-close-mid-far.png) |
| aircraft-transport | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/aircraft-transport-close-mid-far.png) |
| aircraft-ac130 | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/aircraft-ac130-close-mid-far.png) |
| support-drone | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/support-drone-close-mid-far.png) |
| support-sentry | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/support-sentry-close-mid-far.png) |
| support-transport | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/support-transport-close-mid-far.png) |
| dog-hostile | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/dog-hostile-close-mid-far.png) |
| dog-friendly | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/dog-friendly-close-mid-far.png) |
| rcxd-friendly | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/rcxd-friendly-close-mid-far.png) |
| native-assault-rifle | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/native-assault-rifle-close-mid-far.png) |
| native-pistol | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/native-pistol-close-mid-far.png) |
| magazine-assault-rifle | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/magazine-assault-rifle-close-mid-far.png) |
| magazine-pistol | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/magazine-pistol-close-mid-far.png) |
| weapon-shotgun | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/weapon-shotgun-close-mid-far.png) |
| weapon-sniperRifle | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/weapon-sniperRifle-close-mid-far.png) |
| ground-metal | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/ground-metal-close-mid-far.png) |
| ground-leaf | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/ground-leaf-close-mid-far.png) |
| pickup-ammo-close | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/pickup-ammo-close-close-mid-far.png) |
| pickup-supply-close | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/pickup-supply-close-close-mid-far.png) |
| tablet-phone-housing | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/tablet-phone-housing-close-mid-far.png) |
| van-current-b | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/van-current-b-close-mid-far.png) |
| airstrike-current-b | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/airstrike-current-b-close-mid-far.png) |
| bomber-current-b | [close / mid / far](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/bomber-current-b-close-mid-far.png) |

## Native-speed motion

[Combined 1080p30 motion tour](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/motion-tour-1080p30.mp4)

Six real-time actor/material paths joined with hard cuts. CFR encoding holds or drops native captured frames using measured timestamps; no synthetic interpolation, resampling or fixed simulation stepping. The dog-run filename uses the original Walk clip at a 2m/s fixture input; it is not a new authored run animation. Readback/write stalls limit continuous smoothness and are disclosed below. This evidence supports Kamran review and does not certify shimmer.

| Path | Original 1080p30 clip | Timing receipt | Native samples / maximum gap |
|---|---|---|
| tour-rifle-walk.mp4 | [MP4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/tour-rifle-walk.mp4) | [JSON](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/tour-rifle-walk.json) | 88 / 116.9 ms |
| tour-commander-walk.mp4 | [MP4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/tour-commander-walk.mp4) | [JSON](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/tour-commander-walk.json) | 75 / 368.5 ms |
| tour-dog-run.mp4 | [MP4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/tour-dog-run.mp4) | [JSON](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/tour-dog-run.json) | 76 / 234.5 ms |
| tour-rcxd-wheels.mp4 | [MP4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/tour-rcxd-wheels.mp4) | [JSON](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/tour-rcxd-wheels.json) | 74 / 254.2 ms |
| tour-helicopter-rotors.mp4 | [MP4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/tour-helicopter-rotors.mp4) | [JSON](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/tour-helicopter-rotors.json) | 77 / 325.0 ms |
| tour-magazine-close.mp4 | [MP4](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/tour-magazine-close.mp4) | [JSON](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/867c44f60bfe6f2f0cdd719b862fc3c0442b4b8e/2026-10-07/combat-material-textures-b/combat/tour-magazine-close.json) | 87 / 141.8 ms |

Verification and exact owned-engine stop receipts are under `proof/`. Production build/format/lint, focused units and headless smoke results are recorded there. All receipt hashes use exact published LF bytes. No lightmap bake was performed.
