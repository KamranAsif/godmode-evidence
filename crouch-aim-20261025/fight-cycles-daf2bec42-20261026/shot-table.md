# Authoritative rifle shot records aligned to the fight clip

Actor `soldier-e27`, captured build `daf2bec42`, same unchanged [20-second clip](fight-two-cycles-daf2bec42.mp4).

The retained record is the animation trace's `shot = admin.lastAttackAtMs`, replicated from authoritative rule state. The exported in-process server did not persist its full event ring buffer before shutdown, so these are **replicated server shot records, not recovered full `soldier.shot` event payloads**. No hit, damage, event sequence or burst-round payload has been invented.

At the captured source, `SoldierAi.fireRound` validates sight and reach, applies `systemAdminAttackRecorded` with `nowMs`, and records `soldier.shot` with that same `nowMs`. The reducer sets `lastAttackAtMs = action.nowMs`; the trace writes that exact field. Thus each new stamp below proves a fired round independently of a visible muzzle flash.

| Critic A clip window (s) | Server shot stamps (ms) | Shots aligned to clip wall time (s) | Strictly inside window |
| --- | --- | --- | --- |
| 4.07-5.03 | 753005, 753105, 753204 | 4.846, 4.946, 5.045 | 2 |
| 8.50-9.50 | 757439, 757539, 757639 | 9.280, 9.380, 9.480 | 3 |
| 13.00-13.90 | 761904, 762004, 762105 | 13.745, 13.845, 13.946 | 2 |
| 17.43-18.37 | 766339, 766439, 766539 | 18.180, 18.280, 18.380 | 2 |

Every audit window contains at least two distinct fired rounds. The last rounds of bursts 1, 3 and 4 trail the quoted window ends by 15, 46 and 10 ms respectively; the table preserves those values instead of forcing them inside the windows.

Alignment uses 135 paired UTC and engine-tick entries from the capture's own client log between engine ticks 740000 and 780000 ms. Median UTC minus engine ticks is 1793019162212 ms; the observed range is only 1 ms. The native master began 2026-10-26T13:05:07.3708951Z; the delivered clip starts at master frame 90, exactly 3.000 s later. Therefore `clipSeconds = (serverShotMs - 748158.8950195312) / 1000`. This is the authoritative shot's wall-time alignment; the drawn pose uses an interpolated render clock and the recording samples at 30 fps. Per-frame receipt timestamps remain in `master-timing.json`.

`shot-record-alignment.json` contains the source rows, provenance, clock calibration and exact values. Original logs are private because they include local console credentials. No new game launch, recapture, synthetic shot or game-code change was used to produce this table. Critic A's supplied result passes all four movement cycles with no pops, stance snaps, foot teleports or rifle penetration; the visible muzzle effect was its only objection.
