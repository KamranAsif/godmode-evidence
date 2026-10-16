# Desktop UI audit - round 2

Branch `codex/desktop-progressive-ui` at `75d532d91`. Pushed for the external Mac auditor. No PR is open and no merge is authorized.

[Round 1 audit](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/round-1-audit-62ca45797f.md) - [Response to all 28 findings, including pushback](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/round-1-response-e97ea79fba.md)

The required misses are fixed: no LIVE/dot/READY in the tab bar; CHEATS is owned-only, with no prices. UPGRADES is the shop. START GAME remains in Loadout, with white bold text and keyboard focus styling. No gun Change button or armour picker.

## Review notes

Captures were rendered at `dfa37d196`. Follow-up `75d532d91` also removes next-rank price/budget metadata from owned CHEATS details when a higher rank is unaffordable; the captured selections remain visually identical. The follow-up is covered by the owned-collection unit test.

- Every linked PNG is an original 2560x1440 `godot-cli game run --full --offscreen` capture under a capture GPU hold. Existing fonts and illustrations remain. Ammo Pickup reuses the approved Supply Line crate illustration. No paid APIs or image generation were used. No gameplay was launched.
- Fresh: installed starting kit, no played streams, $0. First-boot captures cover login, the scripted opening and installer, using the same fictional history as the installed fresh profile. Before installation the story deliberately opens LiveTube; after installation login opens BattleDuty.
- Mid: synthetic six-stream save, 1,000 earned peak viewers, $900. Stream Boost is at 1% (bar only), Friendly Fire Off at 40% (requirement), Kevlar at 50% (picture), Faster Regen at 80% (identity). See the expanded Stat Boosts group and scrolled UPGRADES views. Under-1% achievements stay absent.
- Late: synthetic 24-stream save, 100,000 peak viewers, $18,000. CHEATS contains 16 owned kit entries. UPGRADES separately shows unmet purchase prerequisites such as the previous streak slot. Owned counts include the base-kit pair; shop counts include purchasable killstreaks only.
- Fixture VOD titles, dates and viewer samples are synthetic, clearly separated from real player data. New fictional failed intro streams last 5-28 minutes. Existing player history is retained. Missing capture media uses the offline presentation; no invented gameplay stills were added.
- All four LiveTube pages, visible collection categories, shop groups and scrolled pages, default/maximized loadout, picker/empty state, Settings, Controls, reset confirmation, taskbar messages, Advanced Tools and performance pages are included. Additional page captures occur only when scrolling changes the content position.
- Pushback: a 1% card remains only a bar, with no lock glyph; hidden upgrade names remain staged until 75%, including milestone-gated upgrades. The separate public channel ladder shows all rung names. An intentionally opened chat remains a floating desktop window and can overlap the app behind it; minimized chat never overlays an app.

## Two-line PR answer

UPGRADES is the shop for buying permanent cheats and higher ranks.  
CHEATS shows only your owned kit; combining Shop and Owned views in one future Cheats screen could make this clearer, but this change does not merge them.

## Verification

`pnpm build`, `pnpm lint` (0 errors, existing max-lines warnings), `pnpm format`, 49 targeted rules/desktop tests, and a headless desktop smoke passed. The full test suite, required opening playability check and one kamran-reviewer round remain for the final auditor-approved change before opening the PR. This round is ready for review, not a claim of approval.

## Full-resolution capture URLs

### Fresh

| Capture | URL |
| --- | --- |
| fresh-advanced-page-2.png | [fresh-advanced-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-advanced-page-2-901f0f841d.png) |
| fresh-advanced-performance-page-2.png | [fresh-advanced-performance-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-advanced-performance-page-2-89f3b4d2dc.png) |
| fresh-advanced-performance-page-3.png | [fresh-advanced-performance-page-3.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-advanced-performance-page-3-075b5e140b.png) |
| fresh-advanced-performance-page-4.png | [fresh-advanced-performance-page-4.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-advanced-performance-page-4-45244dcc6b.png) |
| fresh-advanced-performance.png | [fresh-advanced-performance.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-advanced-performance-e77dcd8dcd.png) |
| fresh-advanced.png | [fresh-advanced.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-advanced-dffbc4660f.png) |
| fresh-cheats-comfort.png | [fresh-cheats-comfort.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-cheats-comfort-96250e19d2.png) |
| fresh-cheats-killstreak.png | [fresh-cheats-killstreak.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-cheats-killstreak-6cbd29488e.png) |
| fresh-cheats.png | [fresh-cheats.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-cheats-eb577adb0c.png) |
| fresh-controls.png | [fresh-controls.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-controls-fedd54193f.png) |
| fresh-desktop.png | [fresh-desktop.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-desktop-2946d46526.png) |
| fresh-first-boot-login.png | [fresh-first-boot-login.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-first-boot-login-eaae28baaa.png) |
| fresh-first-loadout.png | [fresh-first-loadout.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-first-loadout-da675fe8de.png) |
| fresh-install-confirmation.png | [fresh-install-confirmation.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-install-confirmation-33967d9e24.png) |
| fresh-install-purchase.png | [fresh-install-purchase.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-install-purchase-85382b2c4f.png) |
| fresh-installer-complete.png | [fresh-installer-complete.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-installer-complete-11a151316f.png) |
| fresh-installer-copying.png | [fresh-installer-copying.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-installer-copying-8a51aa3c87.png) |
| fresh-installer-preparing.png | [fresh-installer-preparing.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-installer-preparing-dcbdc65db5.png) |
| fresh-killstreak-empty.png | [fresh-killstreak-empty.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-killstreak-empty-cf3569a4e9.png) |
| fresh-killstreak-picker.png | [fresh-killstreak-picker.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-killstreak-picker-a57db8b07f.png) |
| fresh-livetube-channel.png | [fresh-livetube-channel.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-livetube-channel-ce7dc56176.png) |
| fresh-livetube-content.png | [fresh-livetube-content.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-livetube-content-30a5663509.png) |
| fresh-livetube-overview.png | [fresh-livetube-overview.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-livetube-overview-e35b912297.png) |
| fresh-livetube-shop.png | [fresh-livetube-shop.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-livetube-shop-6d4ba54ed0.png) |
| fresh-loadout-maximized.png | [fresh-loadout-maximized.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-loadout-maximized-cbb84401f8.png) |
| fresh-loadout.png | [fresh-loadout.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-loadout-590826f3d5.png) |
| fresh-login.png | [fresh-login.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-login-78ea2f4b11.png) |
| fresh-messages.png | [fresh-messages.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-messages-8847456724.png) |
| fresh-onboarding-messages.png | [fresh-onboarding-messages.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-onboarding-messages-2fafd1d083.png) |
| fresh-onboarding-overview.png | [fresh-onboarding-overview.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-onboarding-overview-e66344e23f.png) |
| fresh-reset-confirm.png | [fresh-reset-confirm.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-reset-confirm-b1d3a0d08a.png) |
| fresh-settings.png | [fresh-settings.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/fresh-settings-fd42948159.png) |

### Mid

| Capture | URL |
| --- | --- |
| mid-advanced-page-2.png | [mid-advanced-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-advanced-page-2-727a894ae4.png) |
| mid-advanced-performance-page-2.png | [mid-advanced-performance-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-advanced-performance-page-2-fe7f6a9b17.png) |
| mid-advanced-performance-page-3.png | [mid-advanced-performance-page-3.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-advanced-performance-page-3-4b75c79158.png) |
| mid-advanced-performance-page-4.png | [mid-advanced-performance-page-4.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-advanced-performance-page-4-3b491f793f.png) |
| mid-advanced-performance.png | [mid-advanced-performance.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-advanced-performance-331b88d37f.png) |
| mid-advanced.png | [mid-advanced.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-advanced-e4fae187ce.png) |
| mid-cheats-comfort-page-2.png | [mid-cheats-comfort-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-cheats-comfort-page-2-eccb76a927.png) |
| mid-cheats-comfort.png | [mid-cheats-comfort.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-cheats-comfort-4ad0b5205a.png) |
| mid-cheats-killstreak.png | [mid-cheats-killstreak.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-cheats-killstreak-412f2b69f7.png) |
| mid-cheats.png | [mid-cheats.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-cheats-2bca213407.png) |
| mid-controls.png | [mid-controls.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-controls-53f454b5de.png) |
| mid-desktop.png | [mid-desktop.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-desktop-97b767fa1f.png) |
| mid-killstreak-empty.png | [mid-killstreak-empty.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-killstreak-empty-5a9a947e85.png) |
| mid-killstreak-picker.png | [mid-killstreak-picker.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-killstreak-picker-dae63f9ec9.png) |
| mid-livetube-channel.png | [mid-livetube-channel.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-livetube-channel-1f56497852.png) |
| mid-livetube-content.png | [mid-livetube-content.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-livetube-content-a1ce6ef0db.png) |
| mid-livetube-overview.png | [mid-livetube-overview.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-livetube-overview-ffebf10cd8.png) |
| mid-livetube-shop-page-2.png | [mid-livetube-shop-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-livetube-shop-page-2-64f1238e46.png) |
| mid-livetube-shop-page-3.png | [mid-livetube-shop-page-3.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-livetube-shop-page-3-88a6f5cf6d.png) |
| mid-livetube-shop.png | [mid-livetube-shop.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-livetube-shop-2b490ed924.png) |
| mid-loadout-maximized.png | [mid-loadout-maximized.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-loadout-maximized-fdbc9e4a78.png) |
| mid-loadout.png | [mid-loadout.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-loadout-f94777ac92.png) |
| mid-login.png | [mid-login.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-login-c11aa5138c.png) |
| mid-messages.png | [mid-messages.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-messages-84db9af76e.png) |
| mid-reset-confirm.png | [mid-reset-confirm.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-reset-confirm-50014683da.png) |
| mid-settings.png | [mid-settings.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-settings-776c5ba618.png) |
| mid-upgrades-Killstreaks-page-2.png | [mid-upgrades-Killstreaks-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-upgrades-killstreaks-page-2-2dac823562.png) |
| mid-upgrades-Killstreaks.png | [mid-upgrades-Killstreaks.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-upgrades-killstreaks-1a74ed9f6e.png) |
| mid-upgrades-page-2.png | [mid-upgrades-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-upgrades-page-2-d636a2b093.png) |
| mid-upgrades-page-3.png | [mid-upgrades-page-3.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-upgrades-page-3-b10f9c64fe.png) |
| mid-upgrades-StatBoosts-page-2.png | [mid-upgrades-StatBoosts-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-upgrades-statboosts-page-2-5fc275dbbe.png) |
| mid-upgrades-StatBoosts-page-3.png | [mid-upgrades-StatBoosts-page-3.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-upgrades-statboosts-page-3-bf2230ce34.png) |
| mid-upgrades-StatBoosts.png | [mid-upgrades-StatBoosts.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-upgrades-statboosts-3ac336e325.png) |
| mid-upgrades.png | [mid-upgrades.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/mid-upgrades-ccdea5b728.png) |

### Late

| Capture | URL |
| --- | --- |
| late-advanced-page-2.png | [late-advanced-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-advanced-page-2-36296ae062.png) |
| late-advanced-performance-page-2.png | [late-advanced-performance-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-advanced-performance-page-2-a5d5a85898.png) |
| late-advanced-performance-page-3.png | [late-advanced-performance-page-3.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-advanced-performance-page-3-78da32a45c.png) |
| late-advanced-performance-page-4.png | [late-advanced-performance-page-4.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-advanced-performance-page-4-1d567dcac6.png) |
| late-advanced-performance.png | [late-advanced-performance.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-advanced-performance-123ce4586b.png) |
| late-advanced.png | [late-advanced.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-advanced-fad96da5e1.png) |
| late-cheats-comfort-page-2.png | [late-cheats-comfort-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-cheats-comfort-page-2-9f713d3703.png) |
| late-cheats-comfort.png | [late-cheats-comfort.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-cheats-comfort-2dea84387a.png) |
| late-cheats-killstreak-page-2.png | [late-cheats-killstreak-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-cheats-killstreak-page-2-b6f50853f8.png) |
| late-cheats-killstreak.png | [late-cheats-killstreak.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-cheats-killstreak-38a9c10afd.png) |
| late-cheats-stat-page-2.png | [late-cheats-stat-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-cheats-stat-page-2-0322a6fb9d.png) |
| late-cheats-stat.png | [late-cheats-stat.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-cheats-stat-98cc876262.png) |
| late-cheats.png | [late-cheats.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-cheats-3bc3fc70a7.png) |
| late-controls.png | [late-controls.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-controls-7e82ee0991.png) |
| late-desktop.png | [late-desktop.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-desktop-ae53c9a0b4.png) |
| late-killstreak-empty.png | [late-killstreak-empty.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-killstreak-empty-5d96b56a03.png) |
| late-killstreak-picker-page-2.png | [late-killstreak-picker-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-killstreak-picker-page-2-d8b782223a.png) |
| late-killstreak-picker.png | [late-killstreak-picker.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-killstreak-picker-edaa2e631a.png) |
| late-livetube-channel.png | [late-livetube-channel.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-livetube-channel-94df80e8fe.png) |
| late-livetube-content.png | [late-livetube-content.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-livetube-content-4e7cb0bb35.png) |
| late-livetube-overview.png | [late-livetube-overview.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-livetube-overview-a135943ab2.png) |
| late-livetube-shop-page-2.png | [late-livetube-shop-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-livetube-shop-page-2-b37cbd6374.png) |
| late-livetube-shop-page-3.png | [late-livetube-shop-page-3.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-livetube-shop-page-3-ab8032adf1.png) |
| late-livetube-shop.png | [late-livetube-shop.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-livetube-shop-fee7400f26.png) |
| late-loadout-maximized.png | [late-loadout-maximized.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-loadout-maximized-f390cec4d3.png) |
| late-loadout.png | [late-loadout.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-loadout-976bf8025c.png) |
| late-login.png | [late-login.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-login-29154cf60c.png) |
| late-messages.png | [late-messages.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-messages-896b069f26.png) |
| late-reset-confirm.png | [late-reset-confirm.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-reset-confirm-e21b631c1a.png) |
| late-settings.png | [late-settings.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-settings-b45c0db777.png) |
| late-upgrades-Comfort&Utility-page-2.png | [late-upgrades-Comfort&Utility-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-upgrades-comfort-utility-page-2-6852480f67.png) |
| late-upgrades-Comfort&Utility.png | [late-upgrades-Comfort&Utility.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-upgrades-comfort-utility-de750aa205.png) |
| late-upgrades-Killstreaks-page-2.png | [late-upgrades-Killstreaks-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-upgrades-killstreaks-page-2-a7b35308e1.png) |
| late-upgrades-Killstreaks-page-3.png | [late-upgrades-Killstreaks-page-3.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-upgrades-killstreaks-page-3-467d27d7e7.png) |
| late-upgrades-Killstreaks.png | [late-upgrades-Killstreaks.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-upgrades-killstreaks-bd8fd703c6.png) |
| late-upgrades-LootPool-page-2.png | [late-upgrades-LootPool-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-upgrades-lootpool-page-2-2d48956f48.png) |
| late-upgrades-LootPool.png | [late-upgrades-LootPool.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-upgrades-lootpool-aa437d10df.png) |
| late-upgrades-page-2.png | [late-upgrades-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-upgrades-page-2-f0fa003fcf.png) |
| late-upgrades-page-3.png | [late-upgrades-page-3.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-upgrades-page-3-9d8ed58f6e.png) |
| late-upgrades-page-4.png | [late-upgrades-page-4.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-upgrades-page-4-0ae00a9697.png) |
| late-upgrades-StatBoosts-page-2.png | [late-upgrades-StatBoosts-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-upgrades-statboosts-page-2-caf3cd6522.png) |
| late-upgrades-StatBoosts-page-3.png | [late-upgrades-StatBoosts-page-3.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-upgrades-statboosts-page-3-a9effab9fc.png) |
| late-upgrades-StatBoosts-page-4.png | [late-upgrades-StatBoosts-page-4.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-upgrades-statboosts-page-4-4b7b01c405.png) |
| late-upgrades-StatBoosts-page-5.png | [late-upgrades-StatBoosts-page-5.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-upgrades-statboosts-page-5-7c924d82a3.png) |
| late-upgrades-StatBoosts.png | [late-upgrades-StatBoosts.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-upgrades-statboosts-66e8222b43.png) |
| late-upgrades-StreakRules-page-2.png | [late-upgrades-StreakRules-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-upgrades-streakrules-page-2-1d10600583.png) |
| late-upgrades-StreakRules.png | [late-upgrades-StreakRules.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-upgrades-streakrules-13dcd233b0.png) |
| late-upgrades.png | [late-upgrades.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-2/late-upgrades-4bafb250e5.png) |

