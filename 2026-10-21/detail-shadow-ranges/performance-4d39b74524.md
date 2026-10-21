Official benchmark: control 1 / candidate / control 2. Milliseconds.

| Phase | Median | p95 | p99 | Mean GPU | Shadow draws | Raw shadow primitives |
| --- | --- | --- | --- | --- | --- | --- |
| firefight-65 | 22.812 / 18.748 / 24.048 | 28.835 / 27.764 / 31.228 | 31.501 / 33.852 / 35.050 | 17.025 / 15.386 / 17.700 | 12546 / 8869 / 12541 | 22.243M / 21.792M / 22.169M |
| shopping-street | 11.415 / 11.014 / 11.429 | 14.695 / 14.123 / 14.641 | 15.448 / 14.893 / 16.402 | 10.449 / 9.963 / 10.416 | 2757 / 2493 / 2754 | 8.207M / 8.058M / 8.241M |
| under-bridge | 19.497 / 18.844 / 19.491 | 22.687 / 22.404 / 22.563 | 31.360 / 38.352 / 35.762 | 18.357 / 17.772 / 18.359 | 10256 / 6682 / 10259 | 16.693M / 16.322M / 16.924M |

Fixed views: before / after / before. 30 s each, 8 s warmup.

| View | Median | p95 | p99 | Shadow draws | Raw shadow primitives |
| --- | --- | --- | --- | --- | --- |
| street | 15.978 / 14.990 / 15.991 | 16.798 / 16.042 / 16.744 | 17.218 / 16.377 / 17.203 | 12355 / 8676 / 12355 | 18.724M / 18.151M / 18.724M |
| pier | 18.043 / 17.938 / 18.051 | 19.138 / 19.117 / 19.000 | 20.876 / 21.838 / 19.764 | 2332 / 2007 / 2332 | 4.205M / 4.114M / 4.205M |

- Three sequential official benchmark runs: control, candidate, control; median/p95/p99 are per-run, not pooled.
- Combat control median drift was 1.236 ms. Candidate median and mean GPU time improved against both controls.
- Under-bridge candidate p99 worsened versus both controls; combat p99 lies inside the control range. No universal tail-latency improvement claimed.
- Pier fixed median improved only 0.11 ms; p95 lies inside the control range and p99 worsened.
- Raw primitive counters do not multiply MultiMesh instance counts when mesh LOD is active. They are monitor values, not true weighted triangle totals.
- Diagnostic saved control/candidate geometry derived from verified cached arena and current static source; exact scene hashes and derivation are recorded separately from its unchanged base receipt. Official fresh-recipe production/export verification is a separate gate.
- Fixed views toggle shadow sources/copies in one loaded scene, with zero enemies; hidden extra copies remain present in fixed control. Camera submissions and sun settings are exact across variants.
- Production settings are currently SMAA2 and TAA false; all measurements use native 2560x1440, scale1, uninstrumented, uncapped.
