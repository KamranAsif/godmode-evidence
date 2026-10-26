# PR #2301 matched timing rerun at 1ece78e1d

**The requested within-noise p95 criterion is not met.** The cover-cycle added p95 is +0.321 ms, above the 0.115 ms span between before controls. This is substantially smaller than the previously observed +3.287 ms, but it is not zero or within the observed control noise.

Before: `e53c4366bbe473ee5c07c19295f13b31a483661a` (matching main). After: `1ece78e1d1a6bb060753bf9dca9acb6df6aa6ca6`. Each workload ran before-1, after, before-2. No source changes during this dispatch; all checkouts were clean. All attempts completed successfully.

| Workload | Run | Enemies | Frames | Median ms | p95 ms | p99 ms |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| standard | before-1 | 65 | 1994 | 15.028 | 17.653 | 19.107 |
| standard | after | 65 | 1903 | 15.673 | 18.067 | 19.676 |
| standard | before-2 | 65 | 2017 | 14.781 | 17.637 | 19.622 |
| cover | before-1 | 1 | 748 | 10.807 | 11.604 | 12.661 |
| cover | after | 1 | 740 | 10.896 | 11.982 | 13.116 |
| cover | before-2 | 1 | 746 | 10.827 | 11.719 | 12.597 |

Standard firefight command: `node tools/performance/gameplay-benchmark.mjs run --project CHECKOUT --subset firefight-65 --enemies 65 --resolution 1440p --taa off --frames-only --warmup-ms 10000`. Same harness and seed `43BA771E`; 2560x1440/SMAA, 100% scale, Forward+/D3D12, RX 9070 XT, native threadModel2, 10 s warmup, 13 s crowd settling, 30 s measured. All boundaries required 65 living riflemen and matching camera pose. Workload and measurement hashes match. No dropped samples, caps, VSync, stopwatch profiling or per-frame engine-statistics collection. Standard median adds 0.769 ms (+5.16%) against mean controls; p95 adds 0.422 ms (+2.39%). Control spans are 0.247 ms median and 0.016 ms p95. The default comparator flags p95 only and both comparisons are within its 5% threshold; this does not mean the differences are within noise.

The focused cover scene is unchanged: full arena at 640x360, low graphics, seed 1871, one course rifleman, frame-only collection. Its eight-second windows start about +0.2 s after the native course marker and end about +8.2 s, covering entry/crouch, rise at +4 s and return at +6.5 s, before actor removal at +9 s. Each report includes the exact window and native marker receipts; counts stayed one and sample drops were zero. Against mean controls, median adds 0.079 ms (+0.73%), p95 adds 0.321 ms (+2.75%) and p99 adds 0.487 ms (+3.86%). Respective control spans are 0.020, 0.115 and 0.064 ms. The p95 goal therefore remains open.

The earlier pre-optimization cover added p95 was +3.287 ms on `1c890e645` against main `41e5803ca`. Current matching main has also advanced, so the absolute frame-time drop across dispatches must not be attributed solely to the optimization. This rerun records the residual cost against fresh controls rather than mixing older controls into the result.

Each run held the GPU exclusively. Scene content was matched: after removing only cache timestamp `stamps`, the full arena receipts are identical, and client/server scene bytes were rehashed in both checkouts and match. Full receipt file hashes can differ only because those stamps differ.

All raw timing samples, measurement conditions and comparator outputs are included. Public standard copies omit only local launch/inventory fields; raw console logs remain private because they can contain local audio-console credentials. SHA-256 values use canonical LF bytes as committed. All Godot processes started for preparation and measurement are closed; all owned sessions ended and GPU holds released before upload. No merge or new visual PASS is claimed.
