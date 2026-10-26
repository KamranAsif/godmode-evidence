# Same-grunt fight cycles: daf2bec42

[fight-two-cycles-daf2bec42.mp4](fight-two-cycles-daf2bec42.mp4) is a continuous 20 s / 600-frame excerpt from the retained exported Windows Playtest build. One foreground grunt, `soldier-e27`, uses the existing sedan as low cover. The camera is fixed; its head, rifle, knees and both feet remain visible.

The clip begins standing, ducks behind the car near 0.8 s, then contains four full held-crouch -> rise/aim -> burst -> held-crouch cycles. Approximate burst times in the delivered clip are 4.8-5.0, 9.2-9.4, 13.7-13.9 and 18.1-18.3 s. Inspect the returns near 5.5, 9.9, 14.4 and 18.8 s. These navigation times are rounded; use the video and trace together.

This is a staged ordinary-AI encounter, not the grunt course. Setup teleported the invincible player, queued six riflemen and paused further spawns. Other director enemies are present in the surrounding fight. The subject selected the real car cover and chose its own movement, crouch, aim and shots. No enemy goals, postures, cadence or fire times were forced. No game code or export changed. F5 photo mode hides the HUD without pausing the simulation.

The requested source is `daf2bec42d0f5e46d646b2110fc7021fcedfe61d`. The retained executable is 2,611,418,220 bytes, SHA-256 `849d377268d7e9deb49f67ce59dfd5e6a313164d1fce7edc78fea81e4cca19c3`.

The delivered clip uses master frames 90 through 689, without retiming or interpolation. Only the blank native-window right/bottom margins were cropped: output is 1264x678 at native pixel scale. The uncut 30 s, 1280x720 master and its complete native capture timing receipt are included. The excerpt has two capture gaps just above 66.7 ms (maximum 67.0 ms), none above 100 ms; nominal video cadence is 30 fps. There is no audio.

`camera-before-after.json` brackets the master and identifies the same soldier mesh at both ends with identical camera transforms. `camera-continuity.json` checks all 599 adjacent output pairs against static building features: maximum median background flow 0.01266 native pixels, no pair above 2 pixels. This diagnostic supports the fixed-camera setup; it is not a substitute for reviewing the video.

`subject-trace.jsonl.gz` contains the existing animation trace for that actor over the retained interval with margins. `cycle-qualification.json` finds four cycles in render clock 748000..768000 ms, including settled crouch, windup, drawn standing pose, new authoritative shot timestamps, and settled return. Trace render-clock timestamps are not video seconds; approximate video alignment has sub-second uncertainty. Firing is supported by the shot stamps and visible recoil. The body/feet sheets cover the excerpt at 2 fps; the cycle sheets retain consecutive native-pixel crops around the first two master firing/return intervals. Sheet timestamps explicitly say master or clip.

All Godot processes started for this dispatch were closed and the capture hold released before upload. The game worktree remains clean at the requested commit. Prior accepted course and fixed-fight evidence is unchanged.
