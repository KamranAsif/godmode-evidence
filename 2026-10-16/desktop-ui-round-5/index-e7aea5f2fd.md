# Desktop UI audit - round 5

Branch `codex/desktop-progressive-ui` at `fce672e9c114ab6b95073a945cec71c7a874601a`. All 134 original 2560x1440 captures were rendered from this frozen, pushed source revision. Implementer verdict: APPROVED. External round 5 review is pending; no PR is open.

[Round 4 audit](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/round-4-audit-5678e01741.md) - [Response to every finding, including limited low-priority pushback](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/round-4-response-7072621a24.md) - [Native BUY-hover verification](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/buy-hover-proof-fee6fdc8e2.json) - [Capture hashes and dimensions](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/manifest-e9cfa42647.json)

## Changed screens to review first

The full set follows this focused list. These are links into that set, not duplicate images.

- [Expanded Combat: no bar-only items](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-upgrades-combat-page-2-3e821f8c58.png)
- [Expanded Killstreaks: eight informative items only](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-upgrades-killstreaks-6b4c943ca6.png)
- [Unnamed tail with divider and spacing](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-upgrades-page-4-1cfd5616d5.png)
- [Scripted purchase: chat-clear card and heading](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-install-purchase-8458b1d4d9.png)
- [Confirmed: wallet $0, Rank 1/3, no stray receipt](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-install-confirmed-7d213b78b2.png)
- [Equipped Predator selected; neutral Empty slot](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-killstreak-picker-96fa8f94c4.png)
- [Empty slot selected](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-killstreak-empty-feb818b4ec.png)
- [BUY at rest - same native window](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-upgrades-buy-rest-5307902cd3.png)
- [REAL native BUY hover - white label](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-upgrades-buy-hover-93c26e480c.png)
- [Fresh reset reassurance outside loss list](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-reset-confirm-d04fef4eb4.png)
- [Mid reset: purchased upgrades beyond the retained kit](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-reset-confirm-e1fca3c07b.png)
- [Stronger Settings headings](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-settings-8ebb9a20f9.png)
- [Advanced tools label and aligned footer](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-advanced-1d68c6b743.png)
- [Late buyable upgrades first](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-upgrades-897776cabc.png)
- [Login without zero followers](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-login-3eb7703ef3.png)
- [LiveTube prices aligned](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-livetube-shop-6e13de301b.png)
- [Content without divider fragment](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-livetube-content-page-2-120bd2b4c1.png)
- [Initial Loadout - retained keyboard focus noted in response](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-loadout-7cb9b29e5f.png)
- [First Loadout after scripted purchase](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-first-loadout-8e9b82c8db.png)


## Review and evidence notes

- All four round 4 mediums are fixed. Expanded groups exclude 1% discoveries, VIEW ALL counts match their informative items, and the bar-only tail is separated from the last group by a full-width rule and a larger gap. The scripted purchase omits its overlapping receipt. Picker selection always matches its detail, including equipped items.
- Cheap lows addressed: bought-only reset counts and separate starting-kit reassurance; aligned LiveTube prices with no duplicated $0-wallet amount; no orphan picker divider or repeated Empty explanation; indented story heading; semibold Settings groups; labelled Advanced tools and aligned footer; available upgrades first; no zero-followers line; no decorative Content divider; restoring the app no longer forces START GAME focus. The initial keyboard focus ring remains as a documented nonblocking low.
- The paired BUY captures use `game run --full` with an isolated mid profile and native `godot-cli game window-input` pointAt. Runtime reports `ShopBuy_ammoPickup`, `hoveredButton: true` both before and after capture. The SHA-256 hashes differ, and changed pixels are confined to the BUY button: `[447, 802, 784, 844]` in native pixels. No forced styles, replacement art or image edits. This fixes the round 4 evidence gap.
- The remaining captures use one `game run --full --offscreen --offscreen-size 2560x1440` renderer at a time under a capture GPU hold. They cover fresh/mid/late login, desktop, normal/maximized Loadout, picker/Empty, CHEATS categories, UPGRADES groups and scroll states, reveal details, Settings/Controls/reset hold/Advanced/Tuning, LiveTube Overview/My channel/Content/shop, messages, and the continuous first opening. Additional pages are kept only when the scroll position changes.
- Fresh: starting kit, $0 and no played streams. UPGRADES retains ammo Rank 1/3 and Need $75. The separate continuous opening shows the dealer's actual $50 purchase through confirmation and first Loadout. It is fiction/history UI only; START GAME was not activated.
- Mid: $900, six synthetic streams, two completed, 1,000 earned peak viewers. Stream Boost at 1% is bar only and nonselectable; Friendly Fire Off at 40% adds the requirement; Kevlar at 50% adds the picture; Faster Regen at 80% adds its identity. Nothing below 1% appears.
- Late: $18,000, 24 synthetic streams, 100,000 peak viewers, 16 owned cheat entries and six channel upgrades. CHEATS remains owned-only with no prices. Progression does not leak into the stream UI; achievement progress bars are the permitted exception.
- Existing fonts, look and approved illustrations are preserved. The response explains retaining the sparse aligned Loadout panels, small reused shop art, per-card unknown requirements the opening's recurring modest title themes and the initial keyboard focus ring. No paid APIs, new art, stashes or gameplay.

## Verification

`pnpm build`, `pnpm format`, `pnpm format:check`, `pnpm lint` (zero errors, 11 existing max-lines warnings), 61 targeted rules/desktop tests, three focused native-input tests and a headless desktop smoke passed. Rendered engine logs were checked for script errors. Full tests, the opening playability check and the requested kamran-reviewer round remain for the externally approved result before opening the PR.

## Two-line PR answer

UPGRADES is the shop for buying permanent cheats and higher ranks.  
CHEATS shows your owned kit; a future Cheats screen with Shop and Owned views could make this clearer, but these tabs remain separate in this change.

## Complete full-resolution capture set

### Fresh

| Capture | URL |
| --- | --- |
| fresh-advanced-page-2.png | [fresh-advanced-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-advanced-page-2-199d27152e.png) |
| fresh-advanced-tuning-page-2.png | [fresh-advanced-tuning-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-advanced-tuning-page-2-a0eb3111d9.png) |
| fresh-advanced-tuning-page-3.png | [fresh-advanced-tuning-page-3.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-advanced-tuning-page-3-bd2070b2ef.png) |
| fresh-advanced-tuning-page-4.png | [fresh-advanced-tuning-page-4.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-advanced-tuning-page-4-ecdfdbe8c3.png) |
| fresh-advanced-tuning-page-5.png | [fresh-advanced-tuning-page-5.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-advanced-tuning-page-5-be94f61ddd.png) |
| fresh-advanced-tuning.png | [fresh-advanced-tuning.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-advanced-tuning-2e13303acf.png) |
| fresh-advanced.png | [fresh-advanced.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-advanced-34ae827879.png) |
| fresh-cheats-comfort.png | [fresh-cheats-comfort.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-cheats-comfort-3572a4c89f.png) |
| fresh-cheats-killstreak.png | [fresh-cheats-killstreak.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-cheats-killstreak-3511ab033b.png) |
| fresh-cheats.png | [fresh-cheats.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-cheats-cf52ffc64c.png) |
| fresh-controls.png | [fresh-controls.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-controls-e17b622140.png) |
| fresh-desktop.png | [fresh-desktop.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-desktop-af36f654db.png) |
| fresh-first-boot-login.png | [fresh-first-boot-login.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-first-boot-login-5240a2f07c.png) |
| fresh-first-loadout.png | [fresh-first-loadout.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-first-loadout-8e9b82c8db.png) |
| fresh-install-confirmation.png | [fresh-install-confirmation.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-install-confirmation-9ef3bc484b.png) |
| fresh-install-confirmed.png | [fresh-install-confirmed.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-install-confirmed-7d213b78b2.png) |
| fresh-install-purchase.png | [fresh-install-purchase.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-install-purchase-8458b1d4d9.png) |
| fresh-installer-complete.png | [fresh-installer-complete.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-installer-complete-4334946d2b.png) |
| fresh-installer-copying.png | [fresh-installer-copying.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-installer-copying-ce1ed1360e.png) |
| fresh-installer-preparing.png | [fresh-installer-preparing.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-installer-preparing-180f8f230c.png) |
| fresh-killstreak-empty.png | [fresh-killstreak-empty.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-killstreak-empty-feb818b4ec.png) |
| fresh-killstreak-picker.png | [fresh-killstreak-picker.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-killstreak-picker-96fa8f94c4.png) |
| fresh-livetube-channel.png | [fresh-livetube-channel.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-livetube-channel-8e647e9053.png) |
| fresh-livetube-content-page-2.png | [fresh-livetube-content-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-livetube-content-page-2-7d73f26068.png) |
| fresh-livetube-content-page-3.png | [fresh-livetube-content-page-3.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-livetube-content-page-3-3cd142ac48.png) |
| fresh-livetube-content-page-4.png | [fresh-livetube-content-page-4.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-livetube-content-page-4-b7eba3272d.png) |
| fresh-livetube-content-page-5.png | [fresh-livetube-content-page-5.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-livetube-content-page-5-7280952f8a.png) |
| fresh-livetube-content-page-6.png | [fresh-livetube-content-page-6.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-livetube-content-page-6-3291d2fcbd.png) |
| fresh-livetube-content.png | [fresh-livetube-content.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-livetube-content-b1c28382af.png) |
| fresh-livetube-overview.png | [fresh-livetube-overview.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-livetube-overview-52bbc00d9a.png) |
| fresh-livetube-shop.png | [fresh-livetube-shop.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-livetube-shop-6e13de301b.png) |
| fresh-loadout-maximized.png | [fresh-loadout-maximized.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-loadout-maximized-8ddfbd4f5f.png) |
| fresh-loadout.png | [fresh-loadout.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-loadout-7cb9b29e5f.png) |
| fresh-login.png | [fresh-login.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-login-37a4102d2a.png) |
| fresh-messages.png | [fresh-messages.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-messages-1aa7899b2d.png) |
| fresh-onboarding-messages.png | [fresh-onboarding-messages.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-onboarding-messages-492860f762.png) |
| fresh-onboarding-overview.png | [fresh-onboarding-overview.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-onboarding-overview-ad99918e33.png) |
| fresh-reset-confirm.png | [fresh-reset-confirm.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-reset-confirm-d04fef4eb4.png) |
| fresh-reset-holding.png | [fresh-reset-holding.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-reset-holding-de09583b95.png) |
| fresh-settings-page-2.png | [fresh-settings-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-settings-page-2-93eb5d7721.png) |
| fresh-settings.png | [fresh-settings.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-settings-145a91a1fa.png) |
| fresh-upgrades.png | [fresh-upgrades.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/fresh-upgrades-755f7519fb.png) |

### Mid

| Capture | URL |
| --- | --- |
| mid-advanced-page-2.png | [mid-advanced-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-advanced-page-2-453fd84d31.png) |
| mid-advanced-tuning-page-2.png | [mid-advanced-tuning-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-advanced-tuning-page-2-727f7046ab.png) |
| mid-advanced-tuning-page-3.png | [mid-advanced-tuning-page-3.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-advanced-tuning-page-3-f0b180ebeb.png) |
| mid-advanced-tuning-page-4.png | [mid-advanced-tuning-page-4.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-advanced-tuning-page-4-23ee45f126.png) |
| mid-advanced-tuning-page-5.png | [mid-advanced-tuning-page-5.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-advanced-tuning-page-5-77da1005cd.png) |
| mid-advanced-tuning.png | [mid-advanced-tuning.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-advanced-tuning-c34e44be4a.png) |
| mid-advanced.png | [mid-advanced.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-advanced-1d68c6b743.png) |
| mid-cheats-comfort.png | [mid-cheats-comfort.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-cheats-comfort-857024d0ee.png) |
| mid-cheats-killstreak.png | [mid-cheats-killstreak.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-cheats-killstreak-02c9f700c0.png) |
| mid-cheats.png | [mid-cheats.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-cheats-807210bd8e.png) |
| mid-controls.png | [mid-controls.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-controls-2fb33892d1.png) |
| mid-desktop.png | [mid-desktop.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-desktop-a89c370018.png) |
| mid-discovery-bar-only.png | [mid-discovery-bar-only.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-discovery-bar-only-c397b87fd8.png) |
| mid-discovery-identity.png | [mid-discovery-identity.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-discovery-identity-0be4c58cd9.png) |
| mid-discovery-picture.png | [mid-discovery-picture.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-discovery-picture-c9af2f86b3.png) |
| mid-discovery-requirement.png | [mid-discovery-requirement.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-discovery-requirement-3af377233c.png) |
| mid-killstreak-empty.png | [mid-killstreak-empty.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-killstreak-empty-1f8ddeab3f.png) |
| mid-killstreak-picker.png | [mid-killstreak-picker.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-killstreak-picker-6ba47f7263.png) |
| mid-livetube-channel.png | [mid-livetube-channel.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-livetube-channel-cbc308b0c6.png) |
| mid-livetube-content.png | [mid-livetube-content.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-livetube-content-048fe5243e.png) |
| mid-livetube-overview.png | [mid-livetube-overview.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-livetube-overview-ce53ae331b.png) |
| mid-livetube-shop-page-2.png | [mid-livetube-shop-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-livetube-shop-page-2-4669bf8895.png) |
| mid-livetube-shop.png | [mid-livetube-shop.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-livetube-shop-7b4de86dd9.png) |
| mid-loadout-maximized.png | [mid-loadout-maximized.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-loadout-maximized-efa2a52c3c.png) |
| mid-loadout.png | [mid-loadout.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-loadout-83f5f14620.png) |
| mid-login.png | [mid-login.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-login-d7bb2cd39c.png) |
| mid-messages.png | [mid-messages.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-messages-7e963e2c74.png) |
| mid-reset-confirm.png | [mid-reset-confirm.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-reset-confirm-e1fca3c07b.png) |
| mid-reset-holding.png | [mid-reset-holding.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-reset-holding-7be8f16666.png) |
| mid-settings-page-2.png | [mid-settings-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-settings-page-2-32c16f9a91.png) |
| mid-settings.png | [mid-settings.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-settings-8ebb9a20f9.png) |
| mid-upgrades-buy-hover.png | [mid-upgrades-buy-hover.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-upgrades-buy-hover-93c26e480c.png) |
| mid-upgrades-buy-rest.png | [mid-upgrades-buy-rest.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-upgrades-buy-rest-5307902cd3.png) |
| mid-upgrades-Combat-page-2.png | [mid-upgrades-Combat-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-upgrades-combat-page-2-3e821f8c58.png) |
| mid-upgrades-Combat.png | [mid-upgrades-Combat.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-upgrades-combat-ba66dda665.png) |
| mid-upgrades-Killstreaks.png | [mid-upgrades-Killstreaks.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-upgrades-killstreaks-6b4c943ca6.png) |
| mid-upgrades-page-2.png | [mid-upgrades-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-upgrades-page-2-8e5b99c1a5.png) |
| mid-upgrades-page-3.png | [mid-upgrades-page-3.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-upgrades-page-3-7d7b6a09f2.png) |
| mid-upgrades-page-4.png | [mid-upgrades-page-4.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-upgrades-page-4-1cfd5616d5.png) |
| mid-upgrades.png | [mid-upgrades.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/mid-upgrades-64552a8f97.png) |

### Late

| Capture | URL |
| --- | --- |
| late-advanced-page-2.png | [late-advanced-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-advanced-page-2-ec7e56cf81.png) |
| late-advanced-tuning-page-2.png | [late-advanced-tuning-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-advanced-tuning-page-2-50e5c229f0.png) |
| late-advanced-tuning-page-3.png | [late-advanced-tuning-page-3.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-advanced-tuning-page-3-678da8cd60.png) |
| late-advanced-tuning-page-4.png | [late-advanced-tuning-page-4.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-advanced-tuning-page-4-1c57f5947e.png) |
| late-advanced-tuning-page-5.png | [late-advanced-tuning-page-5.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-advanced-tuning-page-5-98e9d0daf5.png) |
| late-advanced-tuning.png | [late-advanced-tuning.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-advanced-tuning-88f27ea266.png) |
| late-advanced.png | [late-advanced.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-advanced-45c024d8c1.png) |
| late-cheats-channel.png | [late-cheats-channel.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-cheats-channel-57d94d8d5c.png) |
| late-cheats-combat.png | [late-cheats-combat.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-cheats-combat-c86789547a.png) |
| late-cheats-comfort.png | [late-cheats-comfort.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-cheats-comfort-5057bffbec.png) |
| late-cheats-killstreak.png | [late-cheats-killstreak.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-cheats-killstreak-be210364fe.png) |
| late-cheats.png | [late-cheats.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-cheats-a1e60ca623.png) |
| late-controls.png | [late-controls.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-controls-8bccd0c757.png) |
| late-desktop.png | [late-desktop.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-desktop-d192af1530.png) |
| late-killstreak-empty.png | [late-killstreak-empty.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-killstreak-empty-fb628522b5.png) |
| late-killstreak-picker-page-2.png | [late-killstreak-picker-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-killstreak-picker-page-2-d520f084af.png) |
| late-killstreak-picker.png | [late-killstreak-picker.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-killstreak-picker-8323977e1f.png) |
| late-livetube-channel.png | [late-livetube-channel.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-livetube-channel-4b4021bf54.png) |
| late-livetube-content-page-2.png | [late-livetube-content-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-livetube-content-page-2-120bd2b4c1.png) |
| late-livetube-content.png | [late-livetube-content.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-livetube-content-6b2ec44167.png) |
| late-livetube-overview.png | [late-livetube-overview.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-livetube-overview-bf66a4eae1.png) |
| late-livetube-shop-page-2.png | [late-livetube-shop-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-livetube-shop-page-2-8c2c93fd04.png) |
| late-livetube-shop.png | [late-livetube-shop.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-livetube-shop-5f06c92a14.png) |
| late-loadout-maximized.png | [late-loadout-maximized.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-loadout-maximized-ec392160dc.png) |
| late-loadout.png | [late-loadout.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-loadout-8bf63b5133.png) |
| late-login.png | [late-login.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-login-3eb7703ef3.png) |
| late-messages.png | [late-messages.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-messages-3e4d9febc8.png) |
| late-reset-confirm.png | [late-reset-confirm.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-reset-confirm-9c78545f58.png) |
| late-reset-holding.png | [late-reset-holding.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-reset-holding-3c36a4e3de.png) |
| late-settings-page-2.png | [late-settings-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-settings-page-2-aac591dc69.png) |
| late-settings.png | [late-settings.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-settings-c3204817a3.png) |
| late-upgrades-Channel-page-2.png | [late-upgrades-Channel-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-upgrades-channel-page-2-94ced60de0.png) |
| late-upgrades-Channel.png | [late-upgrades-Channel.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-upgrades-channel-ed65cb797a.png) |
| late-upgrades-Combat-page-2.png | [late-upgrades-Combat-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-upgrades-combat-page-2-65b6e46897.png) |
| late-upgrades-Combat.png | [late-upgrades-Combat.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-upgrades-combat-37641c06fd.png) |
| late-upgrades-Comfort&Utility-page-2.png | [late-upgrades-Comfort&Utility-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-upgrades-comfort-utility-page-2-051895a050.png) |
| late-upgrades-Comfort&Utility.png | [late-upgrades-Comfort&Utility.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-upgrades-comfort-utility-3ac55aa181.png) |
| late-upgrades-Killstreaks-page-2.png | [late-upgrades-Killstreaks-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-upgrades-killstreaks-page-2-d4788d167a.png) |
| late-upgrades-Killstreaks-page-3.png | [late-upgrades-Killstreaks-page-3.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-upgrades-killstreaks-page-3-0a550bdfb5.png) |
| late-upgrades-Killstreaks.png | [late-upgrades-Killstreaks.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-upgrades-killstreaks-1690fa5e1e.png) |
| late-upgrades-LootPool-page-2.png | [late-upgrades-LootPool-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-upgrades-lootpool-page-2-38de443d7c.png) |
| late-upgrades-LootPool.png | [late-upgrades-LootPool.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-upgrades-lootpool-3de193e01d.png) |
| late-upgrades-page-2.png | [late-upgrades-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-upgrades-page-2-e9569fa53e.png) |
| late-upgrades-page-3.png | [late-upgrades-page-3.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-upgrades-page-3-8b059d428c.png) |
| late-upgrades-page-4.png | [late-upgrades-page-4.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-upgrades-page-4-857067af7a.png) |
| late-upgrades-page-5.png | [late-upgrades-page-5.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-upgrades-page-5-09abfa2cc5.png) |
| late-upgrades-page-6.png | [late-upgrades-page-6.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-upgrades-page-6-a04f0ad182.png) |
| late-upgrades-Runtools-page-2.png | [late-upgrades-Runtools-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-upgrades-runtools-page-2-38758e78b8.png) |
| late-upgrades-Runtools.png | [late-upgrades-Runtools.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-upgrades-runtools-b431b43262.png) |
| late-upgrades-StreakRules-page-2.png | [late-upgrades-StreakRules-page-2.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-upgrades-streakrules-page-2-4c9a3b2e76.png) |
| late-upgrades-StreakRules.png | [late-upgrades-StreakRules.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-upgrades-streakrules-d813d02a01.png) |
| late-upgrades.png | [late-upgrades.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-16/desktop-ui-round-5/late-upgrades-897776cabc.png) |

