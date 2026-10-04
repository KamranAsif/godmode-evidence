# Load time: prebuilt survival arena

Release builds exported on this machine (Ryzen 7 9800X3D, RX 9070 XT), both from base `ac138defd`,
launched `-- --fixture roguelite`, window parked off-screen, three interleaved runs. Other agent
lanes held the CPU near 100% throughout (a Godot editor on ~10 cores, Blender), so absolute times
are inflated; the 0.29 playtest log on a quieter machine showed ~43 s for the same "before" path.

| first gameplay frame (game clock) | run 1 | run 2 | run 3 |
| --- | --- | --- | --- |
| before (main) | 109.96 s | 114.22 s | 110.08 s |
| after (prebuilt arena) | 6.59 s | 6.45 s | 6.45 s |

After, client arena: scene load 1.85 s (threaded), instantiate 0.25 s, shrub expansion 1.35 s, re-hook 0.1 s;
server arena 0.17 s.

Debug editor (`game run --offscreen`): before 192.5 s, after 13.0 s.

- `release-before/`, `release-after/`: the game's own client logs for those six runs.
- `measurement-rounds.txt`: the measuring script's output.
- `debug/`: the debug-editor logs (the before run also shows main's existing GodotJS
  `ref_count_` FATAL some time into play, which happens on both).
