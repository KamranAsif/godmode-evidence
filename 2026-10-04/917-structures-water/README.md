# #917 structures and water

Source `88ca0fa28ba49e8d12196d4a962cabb628132781`, baseline `20776686de2991c2e7037e2730050c493daa4ebd`. Six matching 1920 x 1080 views on the Windows GPU, windowed at -10000,-10000, FOV 75, photo mode and free camera. Both sides explicitly UNBAKED (`GODMODE_STUDY_UNBAKED=1`); no lighting bake. Water simulation keeps running, so wave phases differ between captures.

The approved waterfront morning 06/07 concepts and their map-art/5B material guidance informed the quiet brown timber and soft foam. Compared against [chain31 audit](https://github.com/KamranAsif/godmode-evidence/blob/main/2026-10-03/chain31-audit/README.md), especially backlog items 2, 4 and 5. The c06/c07, underbridge, e02-front and pier-path poses come from that audit; bridge-close is a documented additional tower view at waterfront play distance. These are review cameras only; every fix is a shared map-wide material rule.

River: unchanged faceted wave mesh and pause-aware animation; soft, filtered crest/shore foam and continuous optical-ripple sun glints. Timber: restrained longitudinal grain, local bleaching, end-grain rings, soft tide zone, retained per-instance tone; deck timber bents use the same finish. Existing concrete decks and steel gangway retain their material identity. Bridge: remove coarse base louvre strips; 0.6 m ashlar beds with 1.8 m staggered blocks, low joint contrast and derivative filtering on both towers, pilasters and recesses. No added draw surfaces or per-piece nodes. The coursing settles before it becomes subpixel; wide and near renders show no visible course aliasing.

[Comparison sheet](comparison.jpg). Full-size originals below. [Camera definitions](views.json), [hashes, camera assertions and render counters](manifest.json).

| View | Visible before | Visible after | Total before | Total after | Full-resolution captures |
| --- | ---: | ---: | ---: | ---: | --- |
| c06 | 66 | 66 | 230 | 230 | [before](before/c06.png) / [after](after/c06.png) |
| c07 | 3605 | 3605 | 5559 | 5559 | [before](before/c07.png) / [after](after/c07.png) |
| e02-front | 3942 | 3931 | 7134 | 7122 | [before](before/e02-front.png) / [after](after/e02-front.png) |
| pier-path | 144 | 144 | 496 | 496 | [before](before/pier-path.png) / [after](after/pier-path.png) |
| underbridge | 14164 | 14162 | 25622 | 25620 | [before](before/underbridge.png) / [after](after/underbridge.png) |
| bridge-close | 13688 | 13697 | 22266 | 22277 | [before](before/bridge-close.png) / [after](after/bridge-close.png) |

Counters are from `debug_render_stats` after matching camera placement and clearing enemies. Total includes shadows and other viewports. Small fluctuations reflect the live survival simulation; material batches and draw surfaces remain unchanged. Bridge base geometry is reduced.

Validation: `pnpm format`, `pnpm build`, `pnpm lint`, `pnpm test` (13/13 root steps), plus the focused four-test bridge regression after explicitly preserving the cloned material's zero facet strengths. Rendered capture run and headless roguelite smoke run loaded successfully with no GODMODE_FRAME_ERROR, script errors or shader compilation failure. See retained logs. Existing inspection-bridge zero-plane errors during node-tree capture and NavMap/NavRegion shutdown leak warnings occur on both heads; these are not frame errors.

Reproduce: build/import with an owned GODMODE_SESSION_ID, launch `godot-cli game run --fixture roguelite --offscreen --offscreen-size 1920x1080 --inspect --allow-actions --instance NAME --session ID` with `GODMODE_STUDY_UNBAKED=1`. Enable free camera/photo mode, apply the positions and yaw/pitch in views.json via debug_console, clear enemies, inspect/debug_render_stats, and `game capture --allow-unchecked`; stop only the owned instance/session. The cold review import temporarily excluded the lighting atlas directory to avoid needless atlas compression; this exclusion is absent from the source commit.
