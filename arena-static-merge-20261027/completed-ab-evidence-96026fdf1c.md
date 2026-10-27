# Main / A / B exported arena evidence

Frozen main reference e0bc87e1a plus the same finite measurement overlay. GodotJS 4.6.1, Forward+, D3D12, RX 9070 XT, High, 2560x1440, SMAA, 100% scale. Static map only: zero living enemies, no actual streak events. Two main controls bracket one A and one B run. Counts are world visible/shadow pass snapshots; timings are uncapped median wall-frame ms.

## Walks

- [Main: aligned 26 s bush walk, 1080p](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/main-bush-walk-1080p-437211e388.mp4)
- [A: aligned 26 s bush walk, 1080p](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/a-bush-walk-1080p-e902ea0e1b.mp4)
- [B: aligned 26 s bush walk, 1080p](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/b-bush-walk-1080p-0095b9ab8f.mp4)

Review copies retain every captured frame within the walk, crop only the two-pixel non-rendered client edge, and scale to 1080p. Original 1440p recordings and frame timing sidecars are retained locally. Stills below are individual full-resolution originals.

## Nodes

| Build | Geometry nodes | All arena nodes |
|---|---:|---:|
| Main | 48,135 | 415,000 |
| A, exact LOD centers | 48,124 | 414,989 |
| B, 32 m bush domains | 43,936 | 410,801 |

All 358,475 collision-shape nodes and 1,145 occluders remain unchanged.

## Frame times and world draw calls

Each cell is **median ms; visible/shadow draws**. Main time is the median of its two control medians.

| Pose | Main | A | B |
|---|---:|---:|---:|
| bush-walk | 7.13; 868/837 | 7.04; 868/837 | 7.28; 932/837 |
| firefight-65 | 12.99; 3377/7145 | 12.91; 3377/7141 | 13.19; 3620/7141 |
| shopping-street | 8.68; 1350/2331 | 8.68; 1350/2331 | 8.79; 1402/2331 |
| firefight | 12.99; 3377/7145 | 12.93; 3377/7141 | 13.21; 3620/7141 |
| intersection-explosions | 14.04; 5382/4019 | 14.02; 5382/4019 | 14.45; 5470/4019 |
| under-bridge | 13.74; 5204/5184 | 13.68; 5204/5180 | 14.01; 5343/5180 |
| waterfront-rcxd | 7.85; 1832/1099 | 7.85; 1832/1099 | 7.92; 1853/1099 |
| park-foliage | 7.43; 1139/1029 | 7.43; 1139/1029 | 7.65; 1268/1029 |
| chopper-gunner | 10.17; 5879/1478 | 10.12; 5877/1478 | 10.28; 5875/1478 |
| bridge-view-nuke | 10.16; 5879/1478 | 10.15; 5877/1478 | 10.31; 5875/1478 |

A changes very little. B increases visible draws in most views and is slower despite reducing geometry nodes. Its fades and larger culling/LOD domains have a cost. B retains original bush shadows.

## Matched pose stills

Main is the first comparison column. Click any image for its original. UI chat and wind timing differ naturally.

| Pose | Main | A | B |
|---|---|---|---|
| firefight-65 | <a href="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/firefight-65-437e98a1d7.png"><img src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/firefight-65-437e98a1d7.png" width="320"></a> | <a href="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/firefight-65-f81112a24e.png"><img src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/firefight-65-f81112a24e.png" width="320"></a> | <a href="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/firefight-65-47e6f1bf95.png"><img src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/firefight-65-47e6f1bf95.png" width="320"></a> |
| shopping-street | <a href="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/shopping-street-88c56fd66c.png"><img src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/shopping-street-88c56fd66c.png" width="320"></a> | <a href="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/shopping-street-2f035e8406.png"><img src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/shopping-street-2f035e8406.png" width="320"></a> | <a href="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/shopping-street-8a020b276e.png"><img src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/shopping-street-8a020b276e.png" width="320"></a> |
| firefight | <a href="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/firefight-51ecbefeed.png"><img src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/firefight-51ecbefeed.png" width="320"></a> | <a href="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/firefight-1e3fd6f9e0.png"><img src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/firefight-1e3fd6f9e0.png" width="320"></a> | <a href="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/firefight-38c70beefe.png"><img src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/firefight-38c70beefe.png" width="320"></a> |
| intersection-explosions | <a href="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/intersection-explosions-7c5a9fa30b.png"><img src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/intersection-explosions-7c5a9fa30b.png" width="320"></a> | <a href="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/intersection-explosions-d3a66d78c4.png"><img src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/intersection-explosions-d3a66d78c4.png" width="320"></a> | <a href="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/intersection-explosions-e6e034556b.png"><img src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/intersection-explosions-e6e034556b.png" width="320"></a> |
| under-bridge | <a href="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/under-bridge-9121b01da6.png"><img src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/under-bridge-9121b01da6.png" width="320"></a> | <a href="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/under-bridge-9f41aeeecd.png"><img src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/under-bridge-9f41aeeecd.png" width="320"></a> | <a href="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/under-bridge-f878346ca5.png"><img src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/under-bridge-f878346ca5.png" width="320"></a> |
| waterfront-rcxd | <a href="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/waterfront-rcxd-55c3e2e692.png"><img src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/waterfront-rcxd-55c3e2e692.png" width="320"></a> | <a href="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/waterfront-rcxd-88f9113eb7.png"><img src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/waterfront-rcxd-88f9113eb7.png" width="320"></a> | <a href="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/waterfront-rcxd-702e4fc3f7.png"><img src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/waterfront-rcxd-702e4fc3f7.png" width="320"></a> |
| park-foliage | <a href="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/park-foliage-5658151b79.png"><img src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/park-foliage-5658151b79.png" width="320"></a> | <a href="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/park-foliage-233e89e0fb.png"><img src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/park-foliage-233e89e0fb.png" width="320"></a> | <a href="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/park-foliage-621e9fe520.png"><img src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/park-foliage-621e9fe520.png" width="320"></a> |
| chopper-gunner | <a href="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/chopper-gunner-e198e47ecc.png"><img src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/chopper-gunner-e198e47ecc.png" width="320"></a> | <a href="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/chopper-gunner-069fe1de8d.png"><img src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/chopper-gunner-069fe1de8d.png" width="320"></a> | <a href="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/chopper-gunner-6456e02155.png"><img src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/chopper-gunner-6456e02155.png" width="320"></a> |
| bridge-view-nuke | <a href="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/bridge-view-nuke-48ecde1260.png"><img src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/bridge-view-nuke-48ecde1260.png" width="320"></a> | <a href="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/bridge-view-nuke-0e4df6e15c.png"><img src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/bridge-view-nuke-0e4df6e15c.png" width="320"></a> | <a href="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/bridge-view-nuke-f9ec47eff6.png"><img src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/arena-static-merge-20261027/poses/bridge-view-nuke-f9ec47eff6.png" width="320"></a> |
