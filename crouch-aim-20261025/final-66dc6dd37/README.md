Crouch-to-aim exported A/B - 2026-10-25

Before: 31835dd27ee616c82f2167df61ff43a6cb6c840a, merged cover AI with no crouch-to-aim presentation changes. After: 66dc6dd377fe95c630edbd365ce417e181f57dfe. Both are fresh Windows Playtest exports.

Videos: BEFORE ABOVE, AFTER BELOW. Still sheets: BEFORE LEFT, AFTER RIGHT. Original captures are 1280x720 High, fresh settings, 30 FPS capture holds, safe render thread, real time and silent. FSR2 was never enabled. Course site and framing are matched; fight uses the same HUD scenario plus six riflemen and automatic side framing at 6 m / FOV45. Live AI and placement can diverge in a fight.

Course: low wall at 10 m, normal player view followed by side view. Opening frames are retained. Each course source recording has 1050 frames over 35 seconds; each fight source has 900 frames over 30 seconds. Timing receipts and full course animation traces are included. Raw client logs are excluded. Every owned Godot process and GPU hold was closed before publishing.

Audit focus: side 0.00-0.20 seconds (spawn/reset shins) and around 3.4 seconds (kneeling muzzle against cover). cover-opening-sheet.png shows 0/0.033/0.067/0.10/0.20/0.30 seconds; cover-muzzle-sheet.png shows 3.2/3.4/3.6 seconds. The earlier audit passed the cover cycle but failed those two details.

The after head contains a8d311002 plus a course-fixture correction: visible client course boxes now have matching level collision, allowing the same muzzle/foot probes used in a real fight. The server course and AI decisions are unchanged. The requested exact a8 capture is preserved separately; it showed that the leg reset worked but the muzzle hold never activated against a visual-only client block.

After opening 200 ms: 6 posed samples, maximum foot-lock pull 0.001 m, maximum upper/lower leg length ratio versus rest 1.042. After crouch hold: maximum muzzle lowering 1.045 radians. These are diagnostics; visual clip audit is pending Kamran's relay. Full traces include other body phases; ankle motion is not equivalent to toe-ground sliding.

No new frame-cost measurement was taken in this capture dispatch. The older one-grunt CPU comparison was inconclusive and belongs to the earlier source revision.
