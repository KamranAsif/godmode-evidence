# Round 4 response

All four medium findings are accepted and fixed. Round 5 renders the frozen, pushed commit `fce672e9c`. The external verdict is still pending; this response does not claim auditor approval.

| Finding | Response |
| --- | --- |
| 1 - Categorized bar-only discoveries | Fixed. Expanded groups contain informative discoveries only. Bar-only items appear exclusively at the end of the main UPGRADES list. VIEW ALL counts the same informative items that the expanded group contains. |
| 2 - Tail appears to belong to Streak Rules | Fixed. A full-width divider and a larger gap separate the unnamed tail from the final named group. No category or identity is added to the bars. |
| 3 - Scripted receipt clipped by chat | Fixed. The scripted purchase suppresses its receipt. The wallet debit, $0 balance and ammo Rank 1/3 still confirm the actual purchase; ordinary shop purchases retain their receipt. |
| 4 - Picker selection ambiguity | Fixed. The card shown in the detail panel always has the purple selection outline, including an equipped card. Unselected Empty slot uses neutral grey dashes; selected Empty slot uses the same purple selection style as other cards. |
| 5 - Reset copy/counts | Fixed. The loss list counts purchases beyond the base kit, including higher ammo ranks, with no zero clauses. "Your starting kit stays." is a separate reassurance below the list. The mid fixture has three purchased entries beyond the retained kit: Lag Switch, Enemy Radar and the additional ammo rank, plus one channel upgrade. Counting only the two newly named cheats would omit the ammo rank that reset also removes. Unit tests cover this distinction. |
| 6 - LiveTube art and prices | Partly fixed. Price and description share the left margin; at $0, the disabled Need amount supplies the price once. Pushback on new art: keep the small, existing approved illustrations for this UI pass. They replace the unfinished letter tiles without introducing a separate asset project or paid generation. |
| 7 - Picker divider and repeated Empty copy | Fixed. The divider exists only when a comparison follows it. Empty slot has one explanation. |
| 8 - Scripted group heading | Fixed. The heading is indented to match the chat-clear purchase card. |
| 9 - Sparse Loadout panels | Retained. The common bottom edge is deliberate and keeps the operator composition stable. Extra weapon art belongs with the gun pass Kamran explicitly deferred. |
| 10 - Settings section weight | Fixed. Section headings use the existing semibold face and 17 px section size, distinct from regular 15 px rows. |
| 11 - Advanced tools leftovers | Fixed. TOOLS labels Tuning, the footer aligns to Settings' control edge, and the loose shortcut hint is removed. |
| 12 - Owned/maxed defaults | Fixed. Within each group, available purchases precede unavailable, owned and maxed entries. Discovery stages retain their reveal rules. A pure rules test covers ordering. |
| 13 - Zero followers | Fixed. The hardcoded zero-followers line is removed. The notice centers the actual last-stream audience count. |
| 14 - Repetition/divider fragment | Partly fixed. The decorative Content divider is removed. Pushback: picture-stage cards retain their individual requirements so each unknown item is understandable without revealing its identity. The seeded opening keeps its intentionally modest recurring title themes with distinct Day numbers; persisted player history is not rewritten. |
| 15 - START GAME focus at rest | Partly addressed, retained as nonblocking. Restoring the app no longer forces START GAME focus. The initial menu and scripted handoff still focus the primary action for keyboard access, so fresh-first-loadout retains its white focus ring. Removing that would change the initial Enter behavior; a full keyboard-versus-pointer focus policy is outside these four blocker fixes. |

## Real hover evidence

The round 4 hover evidence was inadequate. A normal injected motion briefly hovered BUY, but the offscreen window restored its OS cursor position before the image was drawn. The replacement uses the managed native Windows input path to position the real cursor over BUY without clicking, then captures the same 2560x1440 viewport as the other images. The native input path now supports bounded `pointAt` coordinates and retains PID ownership and foreground checks.

Round 5 includes paired `mid-upgrades-buy-rest.png` and `mid-upgrades-buy-hover.png`, plus `buy-hover-proof.json`. The runtime reports `ShopBuy_ammoPickup` and `hoveredButton: true` before and after the hover capture. The validation compares the button pixels as well as image hashes; it cannot pass from a clock or wallpaper change alone. No hover style or control state is forced for the evidence.

## Validation

`pnpm build`, `pnpm format`, `pnpm format:check`, `pnpm lint` (zero errors, 11 existing max-lines warnings), 61 targeted rules/desktop tests and three focused native-input tests passed. Native full-resolution captures and a headless desktop smoke are checked before publication. Final full tests, opening playability and the requested kamran-reviewer round remain for the externally approved result before opening the PR.

## Two-line PR answer

UPGRADES is the shop for buying permanent cheats and higher ranks.  
CHEATS shows your owned kit; a future Cheats screen with Shop and Owned views could make this clearer, but these tabs remain separate in this change.
