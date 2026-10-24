# Issue 2221: console-open headless repro

Commit: `9fd44047cbd9face7ca1a0924c722d4facf14d8c`.
Machine: Windows 10 Home 10.0.19045, AMD RX 9070 XT.
Engine: patched GodotJS 4.6.1 V8 nopc revision 2 editor, debug build, headless.
Engine SHA-256: `0FD24B93F3A830E495A519CB6F4A56B5D5D8D64B5C6596F6A8D8AE88694C0E37`.
PID: 7940. Session/instance: `repro-2221`.
Run: 2026-10-24 06:15:35 through 06:18:45 UTC.

The real story cold open ran through E and the Cushion takeover. END STREAM used
REPRO-2221.md's permitted `pause` / `pause_leave` option. The developer console
was open on the end card before `run_summary_continue` returned to the desktop.
All six game actions were accepted: login, E input, pause, pause_leave,
debug_console, run_summary_continue. No game step was refused.

The log is one contiguous 12,301-byte slice of the pre-stop `game logs` output,
beginning with the first `[2221] summary show` line. All ERROR lines, at lines,
and backtraces are retained. The engine was stopped; `game ps` then reported
zero managed processes in the temporary project.

## Result and marker brackets

- Node3D `!is_inside_tree()` / `get_global_transform` errors: zero.
- `_texture_2d_update: empty image`: absent.
- `[2221] detached ... play` lines and companion JS stacks: absent.
- There are therefore no target-error marker brackets to assign in this run.
- `[2221] console setOpen true` is present at line 10, between `summary show`
  (line 1) and `afterMedia drain begin` (line 22). The action reply also reports
  `open: true` and `store.consoleOpen: true`.
- Four Control opposite-anchor size warnings occur between `swap queued free;
  instantiating next` (line 122) and `swap next added` (line 159).
- Both local Game disposal sequences complete between `swap remove_child` and
  `swap removed`. No `summary hide` or `console setOpen false` marker appears.
- `run_summary_continue` reports `accepted: true` and `store.mainMenuOpen: true`.

No returning DesktopBoot READY marker appears during the required 60-second
wait. The branch swaps to `res://scenes/main.tscn`, not desktop_boot.tscn; the
accepted return action, mainMenuOpen state and `swap next added` confirm the
desktop transition. This requested headless result does not test GPU image
capture or establish that the errors cannot occur in a rendered export.

## Protocol adaptations, without game-code edits

1. Direct `--fixture roguelite` bypasses the story's coldOpenScene flag. Normal
   headless boot plus login was used to exercise the user's required E link and
   takeover instead. The saved channel began in the real cold-open phase.
2. Unscoped inspection failed with `Cannot create a string longer than
   0x1fffffe8 characters` and a RAM spike. `runtime inspect --store-only` observed
   the same game state without serializing the huge scene tree.
3. The document's `debug_console {"run":"stream status"}` executes the command
   with `open: false`; it does not open the console. The completed run-only
   control is separately uploaded. This variant explicitly used
   `{"open":true,"run":"stream status"}` to exercise the requested open state.

Run-only control, also with no target errors:
https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/issue-2221/repro-2221-console-closed-control-28da98812a.log

Earlier setup attempts were aborted before a stream-end trace. One host-wrapper
call used the unsupported runtime-action `--payload-file` flag; it was rejected
by the CLI parser before a game action ran and corrected to structured argv
`--payload`. Those original replies and logs remain in the local audit artifacts.
