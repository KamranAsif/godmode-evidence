# Desktop UI audit - round 6

Branch `codex/desktop-progressive-ui` at `76634a09d46f822683628d05d44b801da30982d3`. All six original 2560x1440 captures below were rendered from this frozen, pushed revision. Implementer verdict: APPROVED. External approval is pending; no PR is open.

[Round 5 audit](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-6/round-5-audit-433320f473.md) - [Response to both mediums and all lows](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-6/round-5-response-f9735de524.md)

## Requested changed screens only

| Screen | Full-resolution capture |
| --- | --- |
| Fresh: first screen after login | [fresh-first-after-login.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-6/fresh-first-after-login-71fa4b4940.png) |
| Mid: first screen after login | [mid-first-after-login.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-6/mid-first-after-login-76f3ed5085.png) |
| Late: first screen after login | [late-first-after-login.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-6/late-first-after-login-2f82186beb.png) |
| CHEATS: real hover on Lag Switch | [late-cheats-lag-switch-hover.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-6/late-cheats-lag-switch-hover-60054f001a.png) |
| CHEATS: real hover on Stealth Bomber | [late-cheats-stealth-bomber-hover.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-6/late-cheats-stealth-bomber-hover-bb51bf5cf2.png) |
| CHEATS: real hover on Attack Helicopter | [late-cheats-attack-helicopter-hover.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-6/late-cheats-attack-helicopter-hover-853cc501ae.png) |

## Verification

- CHEATS card and button tooltip text is removed. Each hover used native `godot-cli game window-input` positioning and a 1,600 ms dwell, followed by a native viewport capture. Runtime checks before and after each capture identify the correct card, confirm `hoveredButton: true`, and report empty tooltip text. [Hover proof](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-6/cheats-hover-proof-eb5c66e8d3.json)
- Initial focus targets remain available for keyboard use, but tabs and START GAME show no focus rectangle until keyboard navigation. The LOADOUT underline remains. Pointer clicks hide keyboard outlines again. [Headless input proof](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-6/focus-input-proof-c67f0db2bc.json)
- `pnpm build`, `pnpm format`, `pnpm lint` (zero errors, 11 existing max-lines warnings), `pnpm format:check`, 73 targeted rules/desktop tests and the headless keyboard/pointer/UPGRADES/Controls smoke passed. Captured engine logs contain no script errors. [Dimensions, source revision and SHA-256 hashes](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-6/manifest-adcb983cfc.json)
- Cheap lows addressed: borderless gated prices, consistent Advanced headings, a separator above LiveTube bar discoveries, stronger Content top fade, nonempty newly generated opening history, kill-cost ordering within availability, and a mid fixture whose latest stream reaches its declared best peak. The response documents the remaining cosmetic spacing and narrowed opening-evidence scope.
- Exactly the six requested screens were recaptured. The prior [round 5 full set](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/index-e7aea5f2fd.md) remains available for context. Fonts and look are retained. No gameplay, paid APIs or edited images. All owned runs are stopped and the GPU hold released.

After auditor approval, the final checks and requested kamran-reviewer round precede the PR against main. The PR will explain UPGRADES as the permanent shop and CHEATS as the owned kit. The tabs remain separate; merging them is only a proposal for a future pass.
