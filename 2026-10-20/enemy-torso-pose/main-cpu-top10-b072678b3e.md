# Main CPU diagnostic: 65 living riflemen

Main runtime reference: 02ba104dee9367ae715ab843bf24fbf9ae08d00d. The four
changed torso files were temporarily restored to that main and restored exactly
after the diagnostic. Only temporary all-frame trace emission was enabled.
Source and restoration hashes are in fullcpu-baseline-source.json and
fullcpu-restoration.json. No map authoring inputs changed.

Seed 1871, camera [-404,-15.58,-414], yaw PI, FOV 75, 2560x1440, production
D3D12 Forward+, scale 1, TAA off, uncapped, 60 Hz physics. Same fixed 65-rifleman
grid as PR #2150. Current verified production arena; no facade-candidate swap.
13 s settle, 3 s discarded warmup, 10 s sample. All 169 frame samples and CPU
contexts retained, 100% coverage, zero dropped frames. Single timing hold
09:44:24-09:46:16 UTC, then release. All temporary sources restored and rebuilt.

This fresh diagnostic was slower than #2150's saved 40.62 ms capture. Actual
mean frame 59.477 ms, process 56.326 ms, GPU 20.746 ms. Do not normalize it to
40 ms or transfer absolute costs between the two runs. Profiler self cost is
0.336 ms/frame and is retained in the other-scripts bucket.

| Main-thread script system | ms/frame | % of wall frame |
| --- | ---: | ---: |
| Weapon posing and fitting | 8.291 | 13.94% |
| Synchronous channel persistence | 6.972 | 11.72% |
| Other soldier presentation | 5.307 | 8.92% |
| AI and navigation | 4.718 | 7.93% |
| Movement and physics scripts | 4.276 | 7.19% |
| Other scripts and profiling | 2.331 | 3.92% |
| HUD and stream chat | 0.783 | 1.32% |
| VFX and projectiles | 0.774 | 1.30% |
| Audio and voice scripts | 0.765 | 1.29% |
| Snapshots and networking | 0.621 | 1.04% |

Disjoint exclusive selfMs buckets sum to 34.837 ms/frame. The remaining
24.640 ms is unassigned wall time, including engine/render/waits; it is not a
measured CPU system. Renderer CPU is separately 13.915 ms and overlaps engine
totals. Do not add process, physics and render CPU monitors to the table.
GodotJS bridge and synchronous native calls are inside their calling buckets,
not independently isolated. Native animation/skinning outside script spans is
not isolated. Animation LOD bookkeeping alone is 0.257 ms, inside other scripts.

Channel writes alone cost 6.950 ms/frame: nine writes in 169 frames, about
130.5 ms/write. This includes synchronous blocking, not just CPU execution.
The matched PR2150 saved trace had only 39/247 CPU contexts (15.79%); it is a
separate hitch-biased ranking and cannot supply whole-window script averages.

The strongest measured enemy targets are weapon fitting and other soldier
presentation (13.598 ms combined), followed by AI/navigation and body movement.
Synchronous persistence is another substantial main-thread stall. These are
costs to investigate, not a promise that all of them are recoverable savings.
