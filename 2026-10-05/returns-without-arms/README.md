# Hands-free killstreak returns

Final game source: `1f1836e19098651c5158bf11d27f96b1537efc0a`, rebased onto main `ee04fac88` (#960 Assault Rifle rename).

First-person hands/arms are deliberately hidden during the return and its 350 ms landing recovery. No old HD helper or runtime hand-grip IK is included. Ordinary main presentation resumes after recovery; new authored viewmodel hands are future work. The world body retains ordinary native arm/weapon presentation and body-only native insertion animation.

## Rendered self-review

Every numbered clay frame was inspected in individually indexed panels, adjacent poses compared, and critical doorway/trigger/landing originals reopened at native 1920x1080. This is Lane D self-review of the hands-free scope, not an inherited arms-auditor PASS or finger-contact certification.

| Return | First person | Side | Self-review | Immutable capture source |
| --- | --- | --- | --- | --- |
| Van | 000-171, 172/172 | 000-171, 172/172 | PASS | de13e6a5967257ff731b48a3a0631e83e584b843 |
| Rappel | 000-171, 172/172 | 000-171, 172/172 | PASS | f9be1f90f5efed06cf94e422a2856d1ccd855064 |
| Parachute | 000-171, 172/172 | 000-171, 172/172 | PASS | f9be1f90f5efed06cf94e422a2856d1ccd855064 |

[Complete originals, pose JSON, trigger receipts and source pins](full-clay/) contain 1,032 native originals. Contact sheets and preview folders are selected views, never replacements for the complete originals. Review-progress files record coverage and findings. The earlier de13 rappel set was rejected for late explosion obstruction; its raw frames are excluded, and its rejected review panels are preserved separately. Dynamic alpha-effect suppression fixed the capture failure before the fresh aerial sets.

Van: approved street van and per-car paint shader, reproducibly split rear doors/hinges/interior sockets. Opens continuously, camera clears the sill and steps down with landing dip. Native body blends remove the former 050/051 discontinuity; root travel stops at street contact. Primary appears at 1850 ms. No primitive exterior van or invulnerability bubble.

Rappel: thin tan rope at the left of FP view, harness-to-helicopter world line, ordinary primary firing. Landing animation blends continuously; rope retracts independently after its 80 ms detach interval and helicopter flies away. No obstructing alpha cards or late explosion blocks in the fresh full set.

Parachute: faceted Tencent Hunyuan canopy and procedural suspension lines converge at the harness. Descends continuously, lands with native compression and stable street contact, retains canopy for two seconds after touchdown. No old hand helpers or primitive canopy. The tracked side camera prioritizes body/feet; the full canopy and helicopter silhouettes are shown in textured overviews.

## Textured and ordinary gameplay checks

[Textured samples](textured/) preserve five production-time samples per camera (FP/side/overview), 45 native images total. All were reviewed in indexed panels; full canopy overview and van exterior were reopened at native resolution. Selected full-resolution examples:

| Return | First person | Side | Full prop overview |
| --- | --- | --- | --- |
| Van | [interior exit](van-first-person.png) | [climb-out](van-side.png) | [SWAT van](van-overview.png) |
| Rappel | [primary descent](rappel-first-person.png) | [body descent](rappel-side.png) | [helicopter](rappel-overview.png) |
| Parachute | [primary descent](parachute-first-person.png) | [body/tethers](parachute-side.png) | [Hunyuan canopy](parachute-overview.png) |

The exact 60 Hz audit samples are settled production-presentation stills, not a consecutively recorded real-time movie. Native clips/body paths/assets are production implementations; shooting uses the ordinary gameplay clock independently of sampled path time. Clay converts assets while retaining the surrounding baked map; van side cutaway removes only near cargo wall/roof diagnostically. Transparent cards/particles are suppressed diagnostically.

The separate [ordinary-clock smoke](textured/ordinary-clock-smoke.json), without presentation pinning, proves van firing is blocked during climb-out and resumes at street contact, primary ammo decreases during both aerial descents with infiniteAmmo=false, all three reach landing and geometry cleanup, and the canopy disappears after landing. [Smoke log](ordinary-return-smoke.log). Rendered runs reached gameplay with zero GODMODE_FRAME_ERROR; routine bridge unproject warnings are not claimed absent.

## Verification

[pnpm test](test-returns-final-head.log): 13/13 steps PASS, including build, lint and format check. pnpm format run. [Arena cache regeneration/verification](arena-cache-report.json): PASS, matches=true. No hosted CI workflow exists in this repository. All owned engines and capture sessions stopped before publication. No lighting bake run.
