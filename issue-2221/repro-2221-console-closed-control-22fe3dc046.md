# Issue 2221: run-only console control

Commit: `9fd44047cbd9face7ca1a0924c722d4facf14d8c`.
Machine: Windows 10 Home 10.0.19045, AMD RX 9070 XT.
Engine: patched GodotJS 4.6.1 V8 nopc revision 2 editor, debug build, headless.
Engine SHA-256: `0FD24B93F3A830E495A519CB6F4A56B5D5D8D64B5C6596F6A8D8AE88694C0E37`.
PID: 32272. Session/instance: `repro-2221`.

The real story cold open ran through E and the Cushion takeover. END STREAM used
REPRO-2221.md's allowed `pause` / `pause_leave` option. Then the documented
`debug_console {"run":"stream status"}` and `run_summary_continue` actions ran.
All game actions in this completed run were accepted.

The unfiltered log is a contiguous 12,360-byte slice of `game logs`, starting with
the first `[2221] summary show` line and ending at the pre-stop log snapshot.
ERROR lines, at lines, and backtraces are retained. The engine was stopped and
`game ps` confirmed no managed game remained in this temporary project.

## Result

- Node3D `!is_inside_tree()` / `get_global_transform` assertions: zero.
- `_texture_2d_update: empty image`: absent.
- `[2221] detached ... play`: absent.
- Therefore there are no target-error marker brackets to assign in this control.
- Four Control anchor/size warnings occur between `swap queued free; instantiating
  next` and `swap next added`; these are preserved in the log.
- `run_summary_continue` returned `accepted: true` and `store.mainMenuOpen: true`.
- No returning DesktopBoot READY marker appeared in the 60-second wait. The swap
  destination on this branch is `res://scenes/main.tscn`, not desktop_boot.tscn.

## Important protocol observations

The documented run-only console payload did NOT open the console. Its reply was
`{"accepted":true,"freeFly":null,"open":false}` with `store.consoleOpen: false`.
There are no console setOpen markers. The action handler calls setWindowOpen only
when an `open` boolean is supplied. A separate console-open variant is being run
with `{"open":true,"run":"stream status"}`; do not treat this control as that state.

Two setup adaptations were required, without changing game code:

1. The unscoped full-scene inspection failed with `Cannot create a string longer
   than 0x1fffffe8 characters` and a large RAM spike. The documented store-only
   inspection was used to observe the same game state.
2. Direct `--fixture roguelite` skips the story's coldOpenScene flag. Normal
   headless boot plus the real login action was used to exercise the required E
   link and takeover. The isolated channel was initially in phase coldOpen.

Earlier aborted setup attempts are retained locally, including an unsupported
`--payload-file` parser rejection in the host wrapper. That wrapper was corrected
to structured argv `--payload`; no game action was executed by that rejected call.
