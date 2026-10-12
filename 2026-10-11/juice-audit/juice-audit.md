# Juice audit: Godmode.exe roguelite (survival run)

*2026-10-11. Audited at `origin/main` 7054c742e (#1750). Design research only; no game code was changed.*

**Method.** Four read-only code sweeps (movement and weapons; enemies and player damage; killstreaks, cheats and loot; stream, UI and environment), each citing what exists by file and line. Then two rendered `godot-cli game run --full --offscreen` sessions driven with `runtime action` (instance `juice-cap`, `--fixture roguelite`, each under a GPU hold of a few minutes, renderer stopped straight after), capturing the moments listed in [the screenshots section](#weakest-10-moments-screenshots). The Reddit thread could not be fetched (reddit.com, old.reddit.com and `.json` all block this machine), so I used the standard juice checklist as the cross-check instead: hitstop, screenshake, particles at every contact, squash and stretch, easing, anticipation and follow-through, disappearance effects, escalation, layered audio, and rumble.

**Reading the tables.** Each row is one idea. **Impact**: H = the player feels it on every run, M = noticeable, L = polish. **Effort**: S = under a day, often wiring something that already exists; M = 1-3 days; L = a week or more, or needs new art or mechanics. **Perf**: risk to frame time (none, low, med, high). File references are relative to the repo root.

**Corrections to the brief.** Some things the brief names don't exist in this build:
- **Retired or missing mechanics.** The System Admins (Daemon, Hunter, Enforcer) are retired. There is no slide, lean, stamina, ladder or water wading, and no wallhack or aimbot cheat as a player-toggled card. Aimbot and Wallhack Lenses exist as upgrades and exclusives.
- **Renamed.** The "lag switch" is a cheat-app card, and the old Lag Switch exclusive is now Freeze Frame.
- **Not in the game.** There are no birds, physics props, doors or destructibles.

I've written rows for the moments that would exist if those were added only where cheap. Elsewhere I've pointed at the nearest existing verb.

---

## Top 25: best impact per effort

| # | Idea | Section | Impact | Effort | Why it ranks |
|---|---|---|---|---|---|
| 1 | Read `survivalSurface` when `surfaceKind` is missing at the impact lookup (`scripts/game_world.ts:1523`) so trees, benches, bins, dumpsters and rails stop spraying concrete dust | Impacts | H | S | One-line fix that switches on wood splinters and metal sparks that are already authored, everywhere in the street |
| 2 | Tag facade and shop glass as `glass` (`scripts/dumbo_survival_arena.ts:302` tags every shell chunk concrete) | Impacts | H | S | `GlassImpactMark` and `impact-glass` exist but can't be reached in survival |
| 3 | Supply crate: play the unused `crate-open` on open and `reveal-tick`/`reveal-low`/`reveal-high`/`reveal-gold` per card by rarity | Loot | H | S | Assets are declared in `streak_audio.ts:58` and never played; the rarity reveal is currently silent |
| 4 | Tactical Nuke audio: siren at activation, a countdown tick per second, a low boom with a sub-bass tail, then a 1.5 s high-ring with world low-pass | Streaks | H | S | The top killstreak is completely silent |
| 5 | RC-XD engine loop pitched 0.8 to 1.6 by wheel speed, a whine layer on boost, tyre scrub when turning, and `rccar-beep` speeding up over the last 5 s | Streaks | H | S-M | The car has dust and suspension but no sound at all |
| 6 | Player grenade-launcher round: pyro burst, `blast` cue and a distance shake at the impact (reuse `grenade_view.ts`/`pyro_explosion.ts`) | Weapons | H | S | Code shows a plain bullet impact for a 3.5 m blast, and the capture shows no blast |
| 7 | Attack Dogs: reuse `dog-step`/`dog-snap`/`dog-yelp`/`dog-rev` for the player's dogs, plus a 6-puff dust pop and bark on arrival | Streaks | H | S | The dogs are completely silent and pop into existence |
| 8 | EMP: a cyan shockwave ring expanding 0→40 m over 0.4 s, a `blast-big` pitched to 0.6 under an electric crackle, the existing stun rim on every frozen enemy, and a cue when they unfreeze | Streaks | H | S | The flash exists; the freeze itself can't be seen |
| 9 | Money pickup: "+$N" world-space pop that flies to the wallet, a gold light flash like ammo's, and the floor-cash total shown in the HUD | Economy | H | S | Floor cash is first seen on the results screen |
| 10 | Wire up `audienceChange()` (`hud_layout.ts:435`) so viewer gains and losses show "+N"/"-N" beside the count | Stream | H | S | The function exists and nothing calls it |
| 11 | Re-enable the hype bar and sheen (forced hidden at `stream_overlay.ts:995,998`) and the follower pulse (hard-coded to 1 at `:1025`) | Stream | M | S | Already built, just switched off |
| 12 | Body-shot kills get 12-18 ms hitstop at time scale 0.35; headshot and boss stay longer | Hit feedback | H | S | Only headshot, boss and armour-break kills stop time; the common kill feels lighter |
| 13 | Dash: FOV +8° punch out and back over 230 ms, 2° roll into the strafe direction, a viewmodel lag of 0.04 m, and a "dash ready" tick when the 1.5 s cooldown ends | Movement | H | S | The dash currently has a sound and nothing else |
| 14 | Supply crate opens instead of vanishing: lid pops up 0.4 m with spin, 8-12 faceted splinters, a gold or rarity-tinted light burst for 250 ms, then the crate fades out over 0.6 s | Loot | H | S | Currently `queue_free` on open (`supply_drop_view.ts:317`) |
| 15 | Feat (achievement) unlock: a toast slides in on the stream overlay, a `reveal-gold` sting plays, chat spams "POG" for 2 s, and the summary lists feats earned this run | Meta | M | S | Feats unlock silently (`achievement_stats.ts:92-98`) |
| 16 | Player death: the camera drops 1.2 m and rolls 25° over 0.6 s, time slows to 0.3 for 400 ms, the screen desaturates to 20%, then a "KILLED BY <kind>" card appears before the summary | Player damage | H | M | Death currently freezes the wash and cuts to the summary |
| 17 | Landing: scale the dip with fall speed (0.35° up to 3°), add a 4-puff dust ring at the feet above 6 m/s and a weapon-clatter layer on hard landings | Movement | M | S | The current 0.35° dip is barely visible |
| 18 | Mantle: grab, scrape and effort sounds at the authored phases, plus a camera pitch of -4° → +2° then settle | Movement | M | S | Mantling is completely silent |
| 19 | Water: a surface type for the river; bullets throw a 0.6 m white splash column, a ring decal and a `splash` cue; blasts throw a 3 m plume | Impacts | H | M | Also fixes rounds probably stopping mid-air on the invisible waterfront walls |
| 20 | Big tips escalate: under $50 a coin chime; $50-99 a cash register; $100+ the register plus a crowd cheer, a 4-frame gold border flash and a coin-burst particle from the alert card | Stream | H | S | Every tip size shares one re-pitched `ui-confirm` |
| 21 | Attack Helicopter: hook up the unused `heli-cannon.ogg` for the door gun, add a spin-up/down whine and a low-health warning beep under 30% | Streaks | M | S | The asset exists and the gun borrows the AC-130 sound |
| 22 | Adrenaline: an activation heartbeat thump, an FOV +4° hold, a warm vignette at 0.15, a faster heartbeat loop and an exhale on expiry | Streaks | M | S | Activation is currently a banner only |
| 23 | Ban-wave payday ("STREAM COMPLETE"): a sting, a cash count-up tick and confetti from the top of the overlay | Stream | H | S | The run's win moment has no sound cue |
| 24 | Parked cars: glass shatter on the windows, an alarm (two-tone, 6 s, one car at a time) on the first hit, and a 2-5 cm suspension bob per hit | Environment | H | M | Cars are the most common big object players shoot |
| 25 | Base rumble layer: fire (weak motor 0.15-0.6 by weapon, 40-90 ms), damage taken (strong motor by damage), landing, blasts by distance, and killstreak rides | Haptics | M | M | There is no `start_joy_vibration` anywhere |

---

## 1. Movement

| What the player does | Feedback today | Proposed juice | Impact | Effort | Perf |
|---|---|---|---|---|---|
| Walk | Vertical sine bob, 10 rad/s × 0.025 m (`client/client_loop.ts:592`); concrete/metal/glass footsteps, 8 takes | Add a lateral sway at half the bob frequency (0.012 m) and a 0.3° roll so steps read left and right; scale the bob with speed | M | S | none |
| Walk on wood, plastic, fabric or rubber | Plays concrete steps (`packages/game-rules/src/movement.ts:37`) | Add wood (hollow knock) and soft (fabric/rubber muffle) footstep families, 6 takes each | M | M | none |
| Walk on grass, dirt or planting beds | No surface type exists; concrete steps play | Add a `dirt` surface type (planting beds, park, sandbags) with crunch steps and a 2-puff dust kick at sprint speed | M | M | low |
| Walk through puddles or near the water's edge | Nothing | Splash steps plus a 0.2 m droplet burst per footfall on wet decals | L | M | low |
| Strafe | Viewmodel roll only | 1.2° camera roll into the strafe direction, eased at rate 8 | M | S | none |
| Sprint start | FOV +7°, carry pose, cloth rustle, holster sound | Add an exertion breath at sprint start and a breath loop after 3 s of sprint, fading out 1 s after stopping | M | S | none |
| Sprint (sustained) | Bob 14 rad/s × 0.035 m | Add 0.4° roll alternating per footstep, heavier sprint-specific footstep takes, and a faint wind layer above 7 m/s | M | S | none |
| Sprint stop | Weapon-ready sound | Add a 0.08 m viewmodel forward lurch with spring settle (overshoot 15%) | L | S | none |
| Jump take-off | `player-jump` push-off sound; JumpStart clip | Add a 0.6° pitch-up camera nudge and lift the viewmodel 0.02 m, lagging the camera | M | S | none |
| Airborne | JumpLoop clip | Let the weapon float up 0.01 m with the sway multiplier at 1.5 while in the air | L | S | none |
| Land, light | Sound above 2.5 m/s fall; 0.35° dip over 280 ms; viewmodel dip 0.018 m | Scale the dip with fall speed (0.35° → 3°), add per-surface landing takes, and eject 2 dust puffs | M | S | low |
| Land, heavy (over 6 m/s) | Same as light | Add a 4-puff dust ring, a 120 ms 0.012 rad shake, a weapon clatter and a grunt; landing from the supply heli or roofs should feel heavy | M | S | low |
| Dash (17 m/s for 230 ms) | `player-dash` sound only | FOV +8° punch out and back, 2° roll into the direction, 6 speed-line streaks at the screen edges for 180 ms, and a short air-whoosh tail | H | S | low |
| Dash cooldown ready | Nothing | A soft tick and a 120 ms pulse on a small dash pip next to the crosshair | M | S | none |
| Dash into an enemy or wall | Nothing | A 25 ms hitstop and a 0.02 rad shake on a wall bump; the Landing Stomp ripple already exists for the enemy case | L | S | none |
| Crouch toggle | Re-pitched grenade whoosh at -29 dB; eye height snaps 0.65 → 0.15 m | Ease the eye height over 120 ms with a 4% overshoot, play a cloth and kit-rattle cue, and lower the viewmodel 0.015 m | M | S | none |
| Crouch-walk | Walk cue | Quieter, slower footsteps (-6 dB) and a slower bob (7 rad/s × 0.015 m) | L | S | none |
| Mantle grab | Animation only; silent | A hand slap on concrete/metal at grab, a scrape during the pull, and an effort exhale; camera pitch -4° then +2° then settle | M | S | none |
| Mantle top-out | Nothing | Settle the weapon raise with a `weapon-ready` click and a 0.15° dip on the plant | L | S | none |
| Idle | Idle sway | A breath-synced sway (0.25 Hz) and a weapon-check fidget clip after 8 s idle | L | M | none |
| Stamina / exertion | Doesn't exist; low-health breathing only | If no stamina system is added, tie breathing loudness to the recent dash and sprint load so the body feels used | L | S | none |

## 2. Shooting: firing, per weapon

The 7 player weapons are pistol, shotgun, machineGun (shown as "Assault Rifle"), sniperRifle, smg, dmr and grenadeLauncher (`scripts/weapon_catalog.ts:264-383`).

| What the player does | Feedback today | Proposed juice | Impact | Effort | Perf |
|---|---|---|---|---|---|
| Fire any weapon | Recoil travel, lift and roll; view kick; flash; smoke; casing; report with wall tail | A tiny fire shake per weapon on top of the view kick: pistol 0.004 rad, rifle 0.003, SMG 0.002, shotgun 0.012, sniper 0.015, launcher 0.014, all 60 ms, scaled by the shake setting | H | S | none |
| Fire heavy weapons (shotgun, sniper, launcher) | Pitch and yaw kick only | FOV punch -1.5° for 90 ms, 1.5° camera roll, and a sub-bass thump layer under the report | H | S | none |
| Fire automatics (rifle, SMG) | Same report per shot | A mechanical bolt layer per shot, a 3-take round-robin, and a stopping "tail" sample on trigger release | M | S | none |
| Fire (all) | Recoil returns exponentially | A spring with 10-15% overshoot on recovery so the weapon "settles" | M | S | none |
| Muzzle flash | Three crossed planes; per-weapon size and duration; a pooled light | A per-weapon flash colour temperature, shotgun side-ports wider, and a 1-frame light flare to 2× on the first shot of a burst | M | S | low |
| Muzzle flash, rifle | Front plane pinned at 0.028 (`combat_vfx.ts:370`) | Unpin it and scale it by weapon like the others | L | S | none |
| Sustained burst | 4 smoke puffs per shot; no buildup | Barrel smoke accumulates over a burst (up to 3× the puff count) and leaves a 1.2 s wisp from the crown after release; heat shimmer over 15 rounds | M | S | low |
| Shell casings | RigidBody casings, per-weapon physics; one `casing` take at first contact | Surface-aware tinkle (concrete brass ring, metal clank, dirt thud) and a quieter second-bounce take | M | S | low |
| Shotgun pump | Pump sound at 420 ms; hull ejects | A viewmodel shove back 0.03 m on the pump, and a hull with a red plastic tint | M | S | none |
| Sniper bolt | `chamber` at 360 ms | A camera drift of 0.5° during the bolt, a brass "ping" on eject, and a scope-glint light on the lens when aimed | M | S | none |
| Grenade launcher fire | Big hull ejects every shot (wrong for a breech loader); the 700 ms "pump" is silent | Remove the per-shot eject, play a "thoonk" plus breech-break sound at 700 ms, and eject the hull on reload | M | S | none |
| Grenade launcher round lands | Plain surface impact plus a lattice ripple sized to the 3.5 m radius; no explosion (code) | Pyro burst (scaled down from the kamikaze one), `blast` cue, shake by distance, scorch decal, and a dust ring | H | S | med |
| Tracers | One shared thermal tracer: 0.016 wide, 80 ms | Per-weapon tracers: sniper 0.03 with a 250 ms trail, SMG every 2nd round, shotgun pellets short at 0.008; and a tracer that ricochets off metal | M | S | low |
| ADS in/out | FOV ease, ADS sounds at -18 dB | A 0.6° camera drift settling on ADS, and a cloth plus scope-click layer | L | S | none |
| ADS with sniper | FOV 32°; no vignette | A scope vignette with a lens edge, breath sway (0.3° at 0.3 Hz), and hold-breath on sprint-key with an inhale/exhale | M | M | none |
| Reload start | Staged mag-out/in/chamber sounds | A magazine prop drops out of the viewmodel, falls and clatters (casing pool reuse) | M | M | low |
| Reload, shotgun | One mag-style cycle | Per-shell insert sounds and per-shell clip loop; interruptible | M | M | none |
| Reload complete | `reload-ready` | A 150 ms ammo-counter flash and 1.15× scale bump; a crisp "chk" for the last stage | M | S | none |
| Low ammo | Pitched dry-fire tick at threshold | Ammo counter pulses amber below 25%; the report gets a hollow, lighter layer over the last 3 rounds | M | S | none |
| Dry fire | `dry-fire` click | A 1-frame viewmodel trigger twitch, a "RELOAD" pulse under the crosshair, and slide-lock visuals for pistol | M | S | none |
| Weapon swap | Holster then weapon-ready; rises from 0.82 m below | Per-weapon draw sound (pistol slide rack, shotgun pump, rifle charging handle) and a 3° tilt-in flourish | M | S | none |
| Knife swing | 600 ms slash, `knife-slash` sound | A camera lunge of 0.04 m forward on the slash and a 2° yaw sweep | M | S | none |
| Knife connects | Server `knife-hit` sound | A 40 ms hitstop, a 0.02 rad shake, a flesh-spray burst at the blade tip and a blunt "thwack" low layer | H | S | low |
| Knife whiffs | Same as connect locally | A lighter whoosh only, so hit and miss feel different | L | S | none |
| Rail Rounds evolution | Report layer added | An electric tracer with a 0.4 s afterglow, plus a hum while equipped | L | S | low |
| Overheat / spin-up | Doesn't exist for the player | If the minigun cheat or heli gun are counted: barrel glow from 0 to 1 over sustained fire, plus a spin-up whine | L | M | low |

## 3. Impacts and surfaces

| What the player does | Feedback today | Proposed juice | Impact | Effort | Perf |
|---|---|---|---|---|---|
| Shoot a tree, bench, bin, dumpster or rail | Concrete dust and sound, because only `surfaceKind` is read (`game_world.ts:1523`) and these set `survivalSurface` | Read `survivalSurface` as a fallback; wood and metal debris profiles already exist | H | S | none |
| Shoot a shop window or facade glass | Concrete; every shell chunk is tagged concrete (`dumbo_survival_arena.ts:302`) | Tag glass meshes `glass`: the crack mark and `impact-glass` light up | H | S | none |
| Shoot sandbags | Tagged `"dirt"`, which isn't a valid type, so concrete | Add `dirt`: brown puff, falling grit, soft thud | M | S | none |
| Shoot the tarp fence | Tagged metal; sparks | Retag as `fabric`: a fabric flutter puff and a tarp-slap sound | L | S | none |
| Shoot concrete | Decal, lit mark, debris, 2 impact takes | Add a 30% chance of a ricochet whine, and a fine dust "hang" that lingers 1.2 s and drifts | M | S | low |
| Shoot metal | Sparks and clang | A ricochet spark streak toward the shooter's reflection angle at 20%; a ping vs clang pitch by thickness | M | S | low |
| Shoot wood | Concrete sound plays | Wood impact takes; splinter shards rotate and bounce once | M | S | low |
| Shoot plastic | Concrete sound | A hollow plastic tick | L | S | none |
| Shoot paper, fabric or rubber | Silent (null sound) | Soft "thup" takes | L | S | none |
| Shoot foliage | Leaf cards only sway in wind | A 6-10 leaf burst at the hit, a brief 0.2 s branch shudder via the wind channel, and a rustle | M | M | low |
| Shoot the river | Probably hits the invisible 160 m `WaterfrontEdge` walls, leaving floating holes and dust (`dumbo_survival_arena.ts:232-240`) | Exclude edge walls from player hitscan, then add a `water` surface: splash column, ring decal, plop sound | H | M | low |
| Shoot the ground at range | Decals at 60 s, 128 max | Scale the dust puff with distance so long shots stay readable (min screen size) | M | S | none |
| Shotgun into a wall | Pellets deduped 50 ms / 1 m | A single big "pattern" puff plus pellet decals, and a heavier concrete chunk take | M | S | low |
| Sniper into a wall | Debris scale 1.5 | A spall "chunk" that falls and a 2 s dust plume | M | S | low |
| Bullet decals in general | 60 s, 128 max | Faceted per-material decals: concrete star chips, metal bright dents with a dark ring, wood splinter holes, glass spider cracks | M | M | low |
| Near miss past the player | Peripheral pulse 0.22, whiz | Per-calibre whiz (snap for sniper/MG, whistle for pistol); a crack layer within 1 m | M | S | none |

## 4. Hit, kill and headshot confirmation

| What the player does | Feedback today | Proposed juice | Impact | Effort | Perf |
|---|---|---|---|---|---|
| Body hit | Hit tint 140 ms, 6% scale pulse, lattice ripple, contact particles, white marker 140 ms, `hit-confirm` | Scale the marker size by damage (0.85-1.25×) and pitch the `hit-confirm` up by damage too | M | S | none |
| Headshot | Headshot marker 240 ms, `headshot-ding` | Head-pop: a 0.08 s white flash at the head bone, a gold spark crown, and the head snaps back 0.15 rad | H | S | low |
| Body-shot kill | Red marker 320 ms, kill thump, FOV punch 2.5° 180 ms, kill pop ribbons | 12-18 ms hitstop at 0.35 time scale | H | S | none |
| Headshot kill | 35 ms hitstop at 0.2, gold kill | Add a "HEADSHOT" ribbon in the kill feed and a +1 viewer ticker popping from the body | M | S | none |
| Multi-kill | Callout plus rising sting | Escalate the callout size and add chat line-rate burst; at 4+, a 0.3 s slow-mo | M | S | none |
| Room / wave clear | 80 ms hitstop, 9° punch, flash | Combine with a music stinger and a chat emote waterfall | M | S | none |
| Damage numbers | Elites, armour and bosses only | An opt-in setting for numbers on all enemies; a yellow crit style; headshot numbers 1.3× size | M | S | low |
| Overkill | Nothing | Excess damage over 2× health shows as a bigger kill-pop (2× ribbons) and a "wet" kill sound | L | S | low |
| Last enemy of a group | Nothing | A 0.25 s slow-mo on the kill and a camera-centred zoom 2° | M | S | none |
| Kill feed | 0.14 alpha under chat; shows the held weapon not the killing one | Raise to 0.6 for 1.5 s then fade; show the actual weapon or streak icon; add headshot, elite and boss tags | M | S | none |

## 5. Enemies (soldiers, specials, dogs, bosses)

| What the player does | Feedback today | Proposed juice | Impact | Effort | Perf |
|---|---|---|---|---|---|
| Hit a soldier | Directional hit clips, 250 ms flinch, calibre-scaled hit layer | A knockback stagger step on heavy calibre (shotgun, sniper): 0.3 m back over 200 ms | H | M | none |
| Hit a soldier's legs | Lower body stays in the gait | A leg-hit stumble: one-step limp, 300 ms | M | M | none |
| Stun | Stun rim and fragments; silent | A tinnitus-like stun buzz at the enemy and orbiting faceted stars | M | S | low |
| Break enemy armour | `armour-break-confirm`, 35 ms hitstop, forced number | 6-10 faceted armour plates shatter off the torso, plus a blue flash | H | S | low |
| Kill a soldier | Death clip by direction, kick travel 0.18-0.65 m, kill pop, tint | Add a weapon drop that clatters and stays for the corpse life; an "exit spray" puff behind the body | M | M | low |
| Corpse lifetime | Clip, 600 ms hold, 500 ms sink, freed | A 30% longer hold and a faceted fragment dissolve (the lattice theme) instead of sinking through the floor | M | S | low |
| Enemy arrival | None by design: never seen spawning | Off-screen arrival audio: a door slam, boots running and a radio shout from the arrival side 1.5 s before contact | H | M | none |
| Alert / spotted | Radio `picket-chirp` | Short human barks: "Contact!", "Reloading!", "Grenade!", "Man down!", 3 voices × 6 lines | H | M | none |
| Enemy reloads | Nothing | A mag-change sound at the enemy so the player hears the opening | M | S | none |
| Enemy pain | Nothing | Grunt takes on hit, rate-limited 1 per enemy per 1.2 s | M | S | none |
| Enemy fires (rifle bursts) | Flash, tracers, near-miss whiz | A 1-frame muzzle glint at the start of each burst, visible at range | M | S | none |
| Marksman aiming | Red laser and scope glint | A rising tone as the laser holds on the player, and a laser flicker 300 ms before the shot | H | S | none |
| Shield soldier hit | Spall and `shield-clang` | Cracks appear at 50% and 25% shield health; the shield breaks into 8 shards on break | M | M | low |
| Heavy hit | Same as soldier, heavies ×0.55 death kick | Heavier hit clang on armour, a 2 cm screen shake when they stomp within 6 m | M | S | none |
| Kamikaze approach | Rotor loop | Accelerating beep (like the RC car) and a red blink on approach | M | S | none |
| Drone killed | `drone-crash`, spiral | A spark trail during the spiral and a small bounce on landing | L | S | low |
| Cloaker | Shimmer loop | A shimmer distortion edge when the cloak breaks and a "decloak" whoosh | M | S | low |
| Medic | Heal icons, hum | On medic death: icons shatter off nearby enemies with a "power-down" cue | M | S | low |
| Sentry | Swept beam | A lock-on tone when the beam crosses the player | M | S | none |
| Grenadier throw | Grenade ring icon | A "throw" grunt and a pin-pull sound at the enemy | M | S | none |
| RPG enemy | Wind-up sound | A whoosh plus a visible rocket smoke trail for the incoming rocket | M | S | low |
| Minigun enemy | Spin-up | A barrel glow ramp, and spent brass waterfall | L | S | low |
| Officer commanding | Amber icons over commanded enemies | A whistle or shout at the command moment | L | S | none |
| Dog hunting | Gait, `dog-rev` crouch, `dog-snap` bite | A growl/bark loop while hunting (the doc already lists it, `enemies.md:147`) and a whimper on hit | H | S | none |
| Dog bites the player | Generic damage response | A downward camera yank of 0.04 rad, a red claw-slash overlay for 300 ms, and a bite crunch | H | S | none |
| Rival streamer boss arrives | LiveTube "RIVAL STREAMER JOINED", `boss-danger` sting | A boss name card slides in, music shifts to a boss stem, and a heavy footstep stomp | H | M | none |
| Rival boss health | Text status "NAME x% · ARMOUR n" | A segmented health bar at the top that shakes on hit, with armour as a blue overlay | H | S | none |
| Rival boss phases | None | At 66% and 33%: a stagger, a shout, and an armour flare-up | M | M | none |
| Boss killed | Gold marker, 55 ms hitstop, 4° punch | Add a 0.5 s slow-mo, a gold confetti burst, chat explosion and a viewer steal animation (icons fly to your count) | H | S | low |
| Helicopter damaged | Nothing until death | Smoke at 50%, fire and sputter at 25% | M | S | low |

## 6. Player damage, death and respawn

| What the player does | Feedback today | Proposed juice | Impact | Effort | Perf |
|---|---|---|---|---|---|
| Get shot | Directional arc 900 ms, edge vignette 0.32, `combat-player-hit`, damage-scaled shake with directed kick, lattice view pass | A viewmodel flinch of 0.02 m down and a 2° tilt; a 60 ms audio duck of everything but the hit | M | S | none |
| Get hit by a blast with no clear source | No arc (blasts and mortars lack a source) | A full-ring arc for blasts, positioned by the blast centre | M | S | none |
| Armour absorbs a hit | Same `combat-player-hit` as flesh | A separate plate "clank" with a blue edge flash | M | S | none |
| Armour breaks | "ARMOUR BROKEN" pop; `armor-break` sound | Shards fly from the screen edges and a 30 ms hitstop | M | S | low |
| Low health | Blood wash, heartbeat 72→132 bpm, heavy breathing | 30% desaturation and a slight tunnel vignette below 25%; also check the heartbeat fallback (`hud_controller.ts:300-305`) that may never run | H | S | none |
| Regenerate | Wash fades | A rising "recovery" tone and a brief edge glow when crossing back over the threshold | M | S | none |
| Die | `death-fall`, wash held, chat line, summary | A death camera fall and roll, a 400 ms slow-mo, desaturation, then a "KILLED BY" card (`kill_cam_view.ts` is referenced at `game_world.ts:423` but doesn't exist) | H | M | none |
| Extra Life / Second Life fires | Banner only | Rewind glitch: a 0.4 s VHS tear, a reverse whoosh, a white flash and a heartbeat restart | H | S | low |
| Respawn | Wash cut clean | A 1.5 s spawn shimmer on the viewmodel and a "back live" sting | M | S | low |
| Invincible | 4 px gold edge (INVINCIBILITY.EXE) | Pulse the gold edge, and play an on/off sound with a 3 s countdown blink | M | S | none |

## 7. Killstreaks

Shared today: an earned sound, a "READY" banner, a pill pop, the tablet raise, ride fades, static on exit, and a kill-tally banner after rides.

| What the player does | Feedback today | Proposed juice | Impact | Effort | Perf |
|---|---|---|---|---|---|
| Earn any streak | Earned sound, banner, pill pop | A per-streak icon flourish and voice line ("Predator missile ready") | M | M | none |
| Non-ride streak ends | No tally | A tally banner like the rides: "NAPALM — 7 KILLS" | M | S | none |
| Predator missile boost | `missile-boost` | A 0.02 rad shake and an FOV narrow of 4° on boost | M | S | none |
| Predator missile impact | Cuts to static | Hold the final frame for 120 ms with a white flash, then static | M | S | none |
| RC-XD drive | Wheel dust (48 puffs), suspension, fisheye feed, LED blink | An engine loop pitched by speed, tyre scrub, a boost whine (stop borrowing `missile-boost`), and a thud on hops | H | S | none |
| RC-XD hits a wall | The car just stops | A bump sound, a 0.05 rad feed shake and 2 dust puffs | M | S | none |
| RC-XD timer ending | Fuel bar | `rccar-beep` speeding up over the last 5 s and the LED going solid red | M | S | none |
| RC-XD detonate | Pyro (10 debris, 4 smoke), `blast` at 0.95, cut to static | A distinct bigger RC blast cue, the final frame flashes, and when the player's view returns the blast smoke and scorch are visible | M | S | low |
| Airstrike confirm | Line preview, "AIRSTRIKE INBOUND" | A radio voice "Copy, inbound" and a confirm sting | M | S | none |
| Airstrike/bomber pass | Jets, contrails, flyby, `blast-big` | A ground-level dust wave following the blast line | M | S | med |
| Napalm | Bursts, flames, lights, scorches | A fire crackle/roar loop, an ignite whoomp on each enemy, and heat-haze distortion | H | S | low |
| Attack Helicopter gun | Borrows the AC-130's `ac25` | The unused `heli-cannon.ogg`, spin-up/down whine, and a low-health beep | M | S | none |
| AC-130 gun switch | Nothing | A gun-switch clunk and a reticle swap animation | L | S | none |
| AC-130 magazine empty | Nothing | An empty click and a "RELOADING" reticle sweep | L | S | none |
| Adrenaline | Banner, label, faster reload sound | A heartbeat thump, FOV +4°, a warm vignette and an exhale on expiry | M | S | none |
| Attack Dogs | Models, bite, banner; silent; pop in; freed on expiry | Reuse the enemy dog cues, add a dust pop and bark on arrival, and have them run off-screen on expiry | H | S | low |
| EMP | Banner and pale flash | A shockwave ring, an electric crackle, a stun rim on frozen enemies, and an unfreeze cue | H | S | low |
| Juggernaut on | Suit sound, visor bars | A 0.2 s camera drop and heavier footsteps and fire | M | S | none |
| Juggernaut off | Visor vanishes | Visor lift animation and a suit-off hiss | M | S | none |
| Tactical Nuke | Countdown label, flash, mushroom, single shake; silent | A siren, countdown ticks, a boom, a long rumble shake, an ear-ring with low-pass, and a cue when the no-spawn window ends | H | S | none |

## 8. Cheats, upgrades, perks and exclusives

| What the player does | Feedback today | Proposed juice | Impact | Effort | Perf |
|---|---|---|---|---|---|
| Pick a card (any) | Table row sheen 320 ms, chord | An in-world pulse after the window closes: a 0.3 s cyan glyph ring at the player and a "+NAME" HUD line | M | S | low |
| Level up a cheat weapon | Row sheen | Show the new level number pop above the weapon's HUD icon | M | S | none |
| Evolve a cheat weapon | "EVOLVED: NAME" banner, gold row | A 0.5 s slow-mo, a gold particle helix at the player and a unique sting | H | S | low |
| Drone cheat deploys | Model, hover loop | A deploy sound and a spin-up | L | S | none |
| Lag Bullets slow ends | Nothing | A "resync" glitch on the enemy and a cue | L | S | low |
| Claymore expires or is replaced | Nothing | A fizzle puff and a beep | L | S | low |
| Flashbang | Particle, pop, stun rim | A short tinnitus whine for the player if close | L | S | none |
| Freeze Frame | Banner says "LAG SWITCH" (`exclusive_upgrades.ts:355`) | Fix the label; add a freeze shockwave and paint frozen enemies (separate `crate.frozen` list) | M | S | low |
| Undo Death | Banner; teleport | A VHS rewind tear and reverse sound | H | S | low |
| Overclock 5 s shutoff | Invisible | A HUD countdown and a power-down cue | M | S | none |
| Kill Feed Farm stacks | No HUD | A stack counter next to the kill feed | L | S | none |
| Bootleg Copy / Stolen Mod ghost weapons | No ghost tint | A translucent cyan ghost tint on the ghost weapon | L | S | low |
| Aimbot snap | `roguelite.aimbot` decides; no snap feedback found in this sweep | A 60 ms reticle lock-on bracket, a quiet "lock" tick, and a thin red line from reticle to target for 1 frame | H | S | none |
| Wallhack Lenses | Boxes through walls | A brief scan-line sweep on activation and a box flicker on new contacts | M | S | none |
| Enemy Radar card | Minimap shows all | A radar sweep line and a ping per new contact | M | S | none |
| Speed Hack | Banner | Speed lines at sprint speed and a higher FOV cap | M | S | none |
| Glass Cannon | Banner | A cracked-glass HUD frame while active | L | S | none |
| Crit (perk) | Not distinct | A yellow crit number and a sharper crit sound | M | S | none |
| Shield regenerates | Not verified | A blue shimmer and a recharge tone | M | S | none |
| Card rerolled / banished | Lime or red sheen; click/deny | A card shuffle sound per card and a burn-away on banish | L | S | none |

## 9. Supply drops, crates and pickups

| What the player does | Feedback today | Proposed juice | Impact | Effort | Perf |
|---|---|---|---|---|---|
| Supply drop inbound | Banner, edge chevron with distance, minimap icon, heli flyby, smoke and hiss | An ETA countdown in the chevron and a radio voice "Package inbound" | M | S | none |
| Crate falls | Position replay only; no rotation | Tumble 10-20°/s, a fall whistle, and a flare trail | M | S | low |
| Crate lands | 8-puff dust ring on first impact; `crate-land` per bounce | A 0.015 rad shake within 15 m, a light flash, and 3 puffs on later bounces | M | S | low |
| Hold to open | Prompt and amber fill | A rising tone while holding, and a crate shudder at 50% and 90% | H | S | none |
| Crate opens | Crate freed instantly | Lid pop, splinters, a rarity-tinted light burst, `crate-open` | H | S | low |
| Rarity reveal | Per-card sheen 260 ms; silent | `reveal-*` per rarity, a hold-beat before gold or red, a gold card that flips last, and a screen-edge glow in rarity colour | H | S | none |
| Rarity hint before opening | Nothing | Beacon smoke tinted by the best rarity inside | M | S | none |
| Pick from the crate | Click, chord, row sheen | A world-space glyph burst on resume | M | S | low |
| Ammo box drops | Bob and spin, magnet | A spawn pop scale 0 → 1.2 → 1 over 200 ms | L | S | none |
| Ammo box about to expire | Vanishes at 20 s | Blink from 15 s, faster from 18 s | M | S | none |
| Pick up ammo | Sound with chain pitch, light flash, "+30" | Fine; add a viewmodel tap | L | S | none |
| Pick up money | Sound only | "+$N" pop, gold flash, wallet tick | H | S | low |
| Pick up armour | `armor-gain` | Blue edge flash and "+N" | M | S | none |
| Map hack / Second life / Lucky special | Light flash, success sound, banner | A unique sting per special | L | S | none |

## 10. Economy and stream

| What the player does | Feedback today | Proposed juice | Impact | Effort | Perf |
|---|---|---|---|---|---|
| Get a tip | Alert card, $ count-up, sheen, TipBot, train | A tiered sound by size, coin-burst particles and tips-label pulse | H | S | low |
| A kill pays | Only the corner alert | A "$" and viewer icon float from the kill site to the overlay | H | M | low |
| Viewers up | Count-up, 1.06 pulse, throttled cue | "+N" from `audienceChange()` | H | S | none |
| Viewers down | 1.5 s red tint, instant drop | "-N" red with a downward slide and a 1-frame overlay jitter | M | S | none |
| Hype rises | Hidden bar | Show the bar; at 75 and 100 a flash, a music layer and a chat speed-up | M | S | none |
| Followers change | Count-up, colour; pulse disabled | Re-enable the pulse | L | S | none |
| Follower milestone | Gold seal alert, generic cue | A fanfare, confetti and a chat emote waterfall | M | S | low |
| 1M followers | Moment card, blips | A unique win sting, slow-mo and confetti | H | S | low |
| Challenge issued | Card arrival and sheen | A distinct "challenge" cue | M | S | none |
| Challenge done | "+$" count-up | A stamp "COMPLETE" slam with a 30 ms hitstop | M | S | none |
| Challenge missed | Settle | A "fail" buzzer and a card crumple | L | S | none |
| Tip train levels | Glow, bonus count-up, one cue | Raise the pitch a semitone per level | M | S | none |
| Steal viewers from a rival | Pulse, cue | Viewer icons burst off the rival's nameplate | M | M | low |
| Chat reacts to a big play | Rows arrive at 1.025 scale | A line-rate spike and emote spam for 2 s after multi-kills and boss kills | H | M | none |
| Clip captured | Card fade | A shutter sound and a white flash on the overlay | M | S | none |
| Ad break | Notice | A short ad jingle and a "brb" overlay sting | L | S | none |
| Ban wave warning | `boss-danger`, ticks | A red screen-edge crawl and glitch bands on the gameplay view | M | S | low |
| Stream complete payday | Silent | A sting, rolling cash tick and confetti | H | S | low |
| Revocation | Red card, `boss-danger` | A glitch on the revoked item's HUD icon and a "detected" sound | M | S | none |
| Death penalty | Chat line | Viewer number drops with an emphasised red slide | M | S | none |
| Audience falling toward zero (stream about to fail) | Silent until the "STREAM DISCONNECTED" card (seen in play at 1:16) | Below 3 viewers: the count blinks red, a "signal lost" crackle plays, and chat posts "is he lagging?" lines, so the failure is foreshadowed | H | S | none |
| Big streak kills (10 from a nuke in play) | Chat reacts; viewers and $ unchanged on the HUD in the first-stream fixture | Each streak kill sends a viewer icon to the count; a 5+ kill streak pays a "CLIP IT" tip with a coin burst | H | S | low |
| Music | Four phases crossfade | Stingers on kills and clears, and a layer that rises with hype | M | M | none |

## 11. Environment interaction

| What the player does | Feedback today | Proposed juice | Impact | Effort | Perf |
|---|---|---|---|---|---|
| Shoot a parked car | Metal box; sparks | Window shatter, an alarm, a suspension bob and a tyre hiss on wheel hits | H | M | low |
| Blast near a car | Nothing | The car rocks 4° and settles, windows blow out, and the alarm starts | H | M | low |
| Shoot a burnt sedan | Metal | Hollow clang and ash puff | L | S | none |
| Shoot a bus shelter | Visual glass, no reaction | Glass cracks, then shatters with a falling glass shower | M | M | low |
| Shoot signs | Static | A 2-4° wobble on a spring and a metal ping | M | M | low |
| Shoot trash bags / litter | Static | Paper and plastic scatter (a short particle burst) | M | S | low |
| Shoot bins / dumpsters | Concrete (tag bug) | Metal clang with a lid bounce | M | S | none |
| Blast near foliage | Nothing | Leaf burst and a branch shudder | M | M | low |
| Blast near the river | Nothing | A 3 m plume and a spray ring | M | M | low |
| Gunfire near birds | No birds | Pigeons on rooftops scatter on the first shot within 30 m (12 instanced flappers) | M | L | med |
| Explosion near props | Scorch and smoke only | A radial dust wave and small debris kick | M | M | med |
| Physics props | Only casings are RigidBodies | 20-30 knockable props (cones, bins) that react to blasts | M | L | med |
| Walk into props | Nothing | Cones rock and scrape | L | M | low |

## 12. UI, HUD and menus

| What the player does | Feedback today | Proposed juice | Impact | Effort | Perf |
|---|---|---|---|---|---|
| Hover/press a button | Hover, focus and click sounds; instant style swap | A 0.96 press scale and an 80 ms hover tween | M | S | none |
| Story desktop and bug-report buttons | No sounds | `giveButtonSounds` | M | S | none |
| Boot screen | Image, spinner, fade | A boot chime and BIOS-style typed lines | M | S | none |
| Open a desktop window | Alpha fade | A scale pop from 0.94 → 1 with a slide from the icon | M | S | none |
| Double-click a desktop icon | No sound | A double-click tick | L | S | none |
| Panel transitions | Alpha fade in only | Panels slide 24 px out and in, with a whoosh | M | S | none |
| PLAY → run | Static loading card | A "GOING LIVE" countdown 3-2-1, a LIVE stamp, and a crowd swell | H | S | none |
| Pause | Sounds and fade | The loot overlay's blur and muffle | L | S | low |
| Cheat engine card APPLY | Click, chord | A 1.08 slam scale and a 20 ms hitstop | M | S | none |
| Shop purchase | `ui-confirm`, wallet scale | A coin drain sound and a register clunk | M | S | none |
| Results screen totals | Count-up with no sound | A rolling tick and a "NEW BEST" fanfare | M | S | none |
| Settings volume | No preview | Play a preview cue on slider change | L | S | none |
| Settings reset hold | No sound at completion | A fill tone and a completion click | L | S | none |
| Bug report sent | Status text | A shutter flash at capture and a "SENT" stamp | L | S | none |
| Ammo counter | Static | Each shot ticks the counter with a 1.05 scale | M | S | none |
| Crosshair | Static | Bloom-linked spread and a hit "squeeze" | M | S | none |

## 13. Audio, globally

| What the player does | Feedback today | Proposed juice | Impact | Effort | Perf |
|---|---|---|---|---|---|
| Any stream event | Re-pitched `ui-confirm`/`pickup-success`/`dialogue-blip`/`ui-click` | A bespoke stream sound kit: coin, register, crowd, sub alert, raid horn | H | M | none |
| Remote shooters | One `weapon-remote` sound for all | Per-weapon distant reports by enemy kind | M | M | none |
| Interior vs exterior | Wall tail only | A short reverb send by enclosure (subway, worksite, open street) | M | M | low |
| Unused assets | `heli-cannon`, `crate-open`, `reveal-tick`, `reveal-low` | Wire all four (see above) | H | S | none |

## 14. Haptics / rumble

There are no calls to `Input.start_joy_vibration` anywhere in the repo.

| What the player does | Feedback today | Proposed juice | Impact | Effort | Perf |
|---|---|---|---|---|---|
| Fire | None | Weak motor 0.15-0.6 by weapon, 40-90 ms | M | S | none |
| Take damage | None | Strong motor scaled by damage, 120 ms | M | S | none |
| Land hard | None | Both motors at 0.4 for 80 ms | L | S | none |
| Blasts | None | Distance-scaled both motors, 200-400 ms | M | S | none |
| Killstreak ride | None | Engine rumble loop for the RC-XD and helicopter; a strong pulse for the nuke | M | S | none |
| Crate open / rarity | None | Pulse per card, stronger on gold | L | S | none |
| Settings | None | A rumble toggle and strength slider | M | S | none |

---

## Weakest 10 moments: screenshots

These are from two rendered `game run --full --offscreen` sessions (1280×720) on `--fixture roguelite`, driven with `runtime action`. The images are in the `godmode-evidence` repo under `2026-10-11/juice-audit/`; I uploaded them with one git push rather than `pr-image`, following the standing rule against per-file API uploads.

A still image can't show missing audio. Where silence is the gap, the caption says so.

1. **Player grenade launcher round, 100 ms after the tap.** There is no blast, flash, dust or scorch at the aim point on the slab. Compare the cheat RPG's pyro burst in the same session. (Ideas: §2 launcher row; Top-25 #6.)
   ![launcher impact](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/juice-audit/juice-02-launcher-impact.png)
2. **Eight assault-rifle rounds into the concrete slab.** The holes and dust are barely readable at 10 m once the burst ends, with no lingering dust and no chips. (§3 concrete and decal rows.)
   ![rifle impacts](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/juice-audit/juice-03b-rifle-impacts.png)
3. **Dash, 110 ms into a 230 ms burst at 17 m/s.** The frame is indistinguishable from standing: no FOV punch, roll, speed lines or weapon lag. (Top-25 #13.)
   ![dash](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/juice-audit/juice-05-dash.png)
4. **Hold F to open the supply drop.** The world blurs straight into the Loot box window. The crate never shudders or builds up, and the three BASIC cards land silently with no rarity sound. (Top-25 #3, #14; §9 hold-to-open.)
   ![crate holding](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/juice-audit/juice-07-crate-holding.png)
5. **After the pick.** The crate has simply vanished: no lid, splinters or light. The only acknowledgement is the "RPG 1 INSTALLED · BASIC" card. (Top-25 #14; §8 "pick a card".)
   ![after pick](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/juice-audit/juice-09-after-pick.png)
6. **Attack Dogs active ("DOGS 28").** The pack is nowhere in view and makes no sound. They popped in off-screen and are only legible as cyan dots on the minimap. (Top-25 #7.)
   ![dogs](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/juice-audit/juice-11b-dogs-active.png)
7. **EMP, 2.4 s after launch, with enemies frozen nearby.** Nothing in the frame says anything is frozen: no ring, no rim on enemies, no HUD state. The 0.7 s flash is already gone. (Top-25 #8.)
   ![emp](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/juice-audit/juice-20b-emp-frozen.png)
8. **RC-XD detonation, 150 ms after the trigger.** The feed fades to a black "BATTLEDUTY / RC-XD" title card, so the player never sees their own blast. The body view also skips the ground shake. (§7 RC-XD detonate.)
   ![rcxd blast](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/juice-audit/juice-21b-rcxd-blast.png)
9. **Just after a Tactical Nuke kill wave.** Chat says "10 FROM ONE STREAK", yet the overlay still reads "1 watching · $0". There are no viewer or $ gains in the world or on the HUD, and the nuke itself was silent. This is the first-stream fixture; check that its audience rules aren't what's muting this. (Top-25 #4, #9, #10.)
   ![after nuke](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/juice-audit/juice-22b-nuke-later.png)
10. **Player death, 300 ms after the killing hit.** It cuts straight from the low-health wash to an "ENDLESS ENDED" card: no fall, roll, slow-mo, desaturation or "killed by". (Top-25 #16.)
    ![death](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/juice-audit/juice-24-death-instant.png)

**Also observed in play:**
- **The first stream fails fast.** The first session's stream failed at 1:16 ("audience hit zero") with 1 kill credited, and the viewer count sat at 1 throughout. The "STREAM DISCONNECTED" card is one of the better-staged moments, but nothing builds toward it: no falling-viewer alarm before zero. The idea is a §10 row.
- **The low-health blood wash reads well** (capture `23-low-health`, not uploaded).
- **The cheat RPG's explosion is the best impact moment in the session.** It's the right reference for the player's launcher.

