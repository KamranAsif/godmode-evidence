# Exported menu callback failure and plain resize check

Exact native log lines (preserved locally in full):

```text
ERROR: multi-threaded call not supported yet
   at: jsb::Environment::check_internal_state (D:\toolchains\godot\src\modules\GodotJS\bridge\jsb_environment.h:419)
```

Affected binary: Windows Playtest debug, pinned GodotJS 4.6.1 V8-nopc-2, main e0bc87e1a plus the finite review overlay; Separate render thread.

Observed sequence: launch exported game in its menu at High/1440p, VSync off, frame limit 0, startup phase logging enabled, isolated already-onboarded profile; finite menu review triggers login then GO LIVE. An initial five-step plan included scripted Window.size changes at 1 and 2 seconds. The native process exited with the error before GO LIVE. A later two-step plan (login at 0, play at 2000 ms) contained NO resize and failed with the same error before GO LIVE. An intervening run with that two-step plan succeeded (24.457 s GO LIVE to gameplay). This is intermittent; a resize-specific cause is not established. The failed native logs have no JS stack identifying a callback.

Plain exported-menu check WITHOUT the review/benchmark/replay harness: launch the same binary, startup profiler off, frame limit 30, press Enter normally to dismiss login, then use ordinary native OS window resizes: 1920x1082, 2560x1442, 1280x722, 1600x902, 1920x1082, 1280x722; wait 2 seconds after each. All six completed, process remained alive and there was no multi-threaded-call error. Before/after captures and the full native log are saved. This short capped check does not rule out an uncapped player-facing callback crash.

Two further GO-LIVE attempts were the limit: first reached gameplay but the collector followed the client log closed on scene swap and timed out; second died with the native fatal error. The full native log from the first preserves its timeline. No more GO-LIVE driver retries were made. Loading comparisons use the separate existing direct-start fixture and the engine startup clock; they are not wall-clock process-launch or GO-LIVE intervals.
