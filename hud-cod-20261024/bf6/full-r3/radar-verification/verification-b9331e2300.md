# Enemy Radar live verification before round 3

Source: 95943034b0881f637d8381fa9559a6682fa1c694, with read-only server/client Radar fields added to runtime inspection. Native Windows rendered source run under a capture GPU ticket; this is not the final round-3 exported build.

Radar OFF live: server false, client false, 3 drawn contacts, 23 living enemies.
Radar ON live: server true, client true, 23 drawn contacts, 23 living enemies. The still visibly shows the red triangles.
Frozen ON: 23 contacts. Toggle OFF while frozen: server/client false but 23 cached contacts. Resume: 1 contact of 23 enemies.

The paid cheat works in live play. The r2 toggle happened after HUD freeze and the paused presentation path did not refresh the map. That was invalid evidence for live Radar. Round 3 will refresh the map while paused and repeat this check in the Windows Playtest export. Contact visibility rules are unchanged. Owned renderer stopped and GPU ticket released.
