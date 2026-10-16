# Round 5 response

Both medium findings are accepted and fixed in `76634a09d`. Round 6 contains only the requested post-login screens and CHEATS hover captures. External approval is pending; no PR is open.

| Finding | Response |
| --- | --- |
| 1 - CHEATS tooltip obscures title | Fixed. Removed tooltip text from both the collection card panel and its button. The detail panel remains the source of full copy. Native hover captures dwell for 1,600 ms on Lag Switch, Stealth Bomber and Attack Helicopter, with runtime checks before and after each capture. |
| 2 - Initial LOADOUT focus box | Fixed. Tabs and START GAME retain their keyboard focus targets but begin with invisible focus outlines. Navigation keys reveal their original focus styles; pointer clicks hide them again. The active-tab underline remains independent of focus. The headless input check confirms initial hidden focus, visible keyboard focus and pointer reset. This also addresses the earlier initial START GAME ring. |
| 3 - Gated price resembles OWNED/MAX | Fixed. Gated prices have no border or filled button surface; card text is muted. The detail action uses the same borderless treatment when locked. |
| 4 - Mixed Advanced heading weights | Fixed. AUDIO, KILLSTREAKS, KILLSTREAK RIDES, STORY and TESTING use the same semibold section treatment as TOOLS and Settings. |
| 5 - LiveTube bar tail separation | Fixed. A rule and larger gap separate informative cards from the compact bar-only tail. |
| 6 - Content scroll sliver | Fixed. The Content top fade has an opaque leading section before its gradient, hiding the short previous-row fragment. Other scroll fades retain their existing treatment. |
| 7 - Empty backdated history | Fixed for newly generated opening histories. Ordinary peaks are 1-3, the two approved better days retain their 11-14 viewer markers, and each stream has a few kills. The latest stream has a varying sampled curve. These are fictional pre-patch records, not simulated current runs. They still award no money or earned progression. Existing saved records are preserved. Targeted tests cover positive peaks/kills and the latest curve. |
| 8 - Killstreak shop ordering | Fixed. Availability remains the first priority; kill cost sorts items within each state. A catalog-based unit test covers both states. |
| 9 - Mid fixture best peak | Fixed in the round 6 fixture generator. The latest archived stream and its samples now reach the declared 1,000-viewer peak. The previous round's files remain unchanged. |
| 10 - Reset count | Retained as accepted context: bought entries and extra ranks differ from the owned collection total, and the dialog states that the starting kit stays. |
| 11 - Picture-card whitespace | Retained as nonblocking. The fixed picture-stage height keeps art and the requirement readable on one consistent three-column grid. No layout change is needed for the two medium fixes. |
| 12 - Opening animation evidence | No additional opening capture in this round, following Kamran's explicit request to capture only CHEATS hovers and the first screen after login. The previous full set includes the animated opening; its Overview image is not a settled final-chart image. |

## Verification

`pnpm build`, `pnpm format`, `pnpm lint` (zero errors, 11 existing max-lines warnings), `pnpm format:check`, 73 targeted rules/desktop tests and the headless keyboard/pointer/UPGRADES/Controls check passed. Native captures use the frozen pushed revision, original 2560x1440 output and one rendered instance at a time under a capture hold. No gameplay or paid APIs.

Final full tests, the opening playability check and the requested kamran-reviewer round remain for the auditor-approved result before opening the PR against main. The PR will retain the requested two-line explanation of UPGRADES as the shop and CHEATS as the owned kit.
