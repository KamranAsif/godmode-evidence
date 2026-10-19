# Audio audit - 2026-10-18

Source: origin/main `0bbaa6f1f`; 716 files. FFmpeg 7.1 decoded float32 at native rate/channels; peak=max absolute sample, mean=RMS dBFS. belowMinus60Fraction: duration when ALL channels below amplitude 0.001; additional duration-weighted 10ms RMS fraction provided. Flags: peak<=-40 or RMS<=-55 near-silent; >=80% sample-frame duration mostly silence; lead>=1s or >=250ms and >=25% duration long lead-in. Compressed priming included as decoded by FFmpeg.

No fully silent or near-silent source files. Quietest peak: -33.417 dBFS.

## Source flags

| File | Flags | Duration s | Peak dBFS | RMS dBFS | Below -60 sample % / 10ms RMS % | Lead s |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| `assets/audio/cheats/cheat-rail-layer-01.ogg` | mostly-silence | 0.597 | -5.30 | -31.85 | 81.5 / 78.2 | 0.000 |
| `assets/audio/classic/cheats/cheat-claymore-plant-01.ogg` | mostly-silence | 0.382 | -13.87 | -39.77 | 81.3 / 73.8 | 0.006 |
| `assets/audio/classic/combat/combat-pistol-windup.ogg` | mostly-silence | 0.697 | -8.26 | -29.79 | 81.5 / 78.5 | 0.000 |
| `assets/audio/sfx/machine-fire-01.ogg` | long-lead-in | 1.500 | -1.51 | -21.84 | 57.5 / 55.3 | 0.403 |
| `assets/audio/sfx/ui-hover-01.ogg` | mostly-silence | 0.597 | -16.71 | -42.47 | 91.3 / 90.0 | 0.000 |
| `assets/audio/sfx/ui-zen-typing-01.ogg` | mostly-silence | 0.082 | -16.44 | -34.48 | 82.2 / 75.7 | 0.000 |
| `assets/audio/swaps/restored-ambience-heavy-breathing-loop.ogg` | decoded-over-full-scale | 4.940 | 0.57 | -18.59 | 4.4 / 0.8 | 0.000 |
| `assets/audio/swaps/restored-cheats-cheat-claymore-blast-01.mp3` | decoded-over-full-scale | 1.080 | 1.07 | -14.79 | 20.7 / 15.7 | 0.000 |
| `assets/audio/swaps/restored-cheats-cheat-claymore-blast-02.mp3` | decoded-over-full-scale | 1.080 | 1.07 | -14.79 | 20.7 / 15.7 | 0.000 |
| `assets/audio/swaps/restored-cheats-cheat-claymore-plant-01.mp3` | decoded-over-full-scale | 0.880 | 0.75 | -21.65 | 36.7 / 30.7 | 0.000 |
| `assets/audio/swaps/restored-cheats-cheat-drone-swarm-hover-loop.ogg` | decoded-over-full-scale | 4.940 | 1.88 | -11.79 | 0.0 / 0.0 | 0.000 |
| `assets/audio/swaps/restored-cheats-cheat-flashbang-pop-01.mp3` | decoded-over-full-scale | 0.880 | 0.76 | -17.79 | 11.5 / 10.2 | 0.000 |
| `assets/audio/swaps/restored-cheats-cheat-grenade-blast-01.mp3` | decoded-over-full-scale | 1.200 | 0.57 | -11.18 | 27.5 / 25.8 | 0.000 |
| `assets/audio/swaps/restored-cheats-cheat-grenade-blast-02.mp3` | decoded-over-full-scale | 1.200 | 0.57 | -11.18 | 27.5 / 25.8 | 0.000 |
| `assets/audio/swaps/restored-cheats-cheat-lag-hit-01.mp3` | decoded-over-full-scale | 0.800 | 2.66 | -12.84 | 12.6 / 12.5 | 0.000 |
| `assets/audio/swaps/restored-cheats-cheat-lag-hit-02.mp3` | decoded-over-full-scale | 0.800 | 2.66 | -12.84 | 12.6 / 12.5 | 0.000 |
| `assets/audio/swaps/restored-cheats-cheat-rail-layer-01.mp3` | mostly-silence | 0.600 | -8.13 | -34.64 | 81.8 / 80.0 | 0.000 |
| `assets/audio/swaps/restored-cheats-cheat-rpg-blast-01.mp3` | decoded-over-full-scale | 1.200 | 1.24 | -10.89 | 1.0 / 0.8 | 0.000 |
| `assets/audio/swaps/restored-cheats-cheat-rpg-blast-02.mp3` | decoded-over-full-scale | 1.200 | 1.24 | -10.89 | 1.0 / 0.8 | 0.000 |
| `assets/audio/swaps/restored-cheats-cheat-rpg-launch-01.mp3` | decoded-over-full-scale | 1.080 | 2.05 | -11.73 | 20.3 / 19.4 | 0.000 |
| `assets/audio/swaps/restored-cheats-cheat-rpg-launch-02.mp3` | decoded-over-full-scale | 1.080 | 2.05 | -11.73 | 20.3 / 19.4 | 0.000 |
| `assets/audio/swaps/restored-cheats-cheat-turret-deploy-01.mp3` | decoded-over-full-scale | 1.200 | 0.04 | -13.41 | 27.8 / 25.8 | 0.000 |
| `assets/audio/swaps/restored-cheats-cheat-turret-network-deploy-01.mp3` | decoded-over-full-scale | 1.360 | 0.78 | -26.56 | 42.1 / 39.0 | 0.000 |
| `assets/audio/swaps/restored-cheats-cheat-turret-shot-01.mp3` | decoded-over-full-scale | 0.680 | 0.88 | -20.78 | 17.1 / 16.2 | 0.000 |
| `assets/audio/swaps/restored-cheats-cheat-turret-shot-02.mp3` | decoded-over-full-scale | 0.680 | 0.88 | -20.78 | 17.1 / 16.2 | 0.000 |
| `assets/audio/swaps/restored-cheats-cheat-turret-shot-03.mp3` | decoded-over-full-scale | 0.680 | 0.88 | -20.78 | 17.1 / 16.2 | 0.000 |
| `assets/audio/swaps/restored-combat-combat-shotgun-windup.mp3` | decoded-over-full-scale | 0.800 | 0.13 | -22.25 | 66.2 / 61.3 | 0.004 |
| `assets/audio/swaps/restored-enemies-dog-yelp.mp3` | decoded-over-full-scale | 0.800 | 0.10 | -13.46 | 33.1 / 30.0 | 0.004 |
| `assets/audio/swaps/restored-enemies-drone-sputter.mp3` | decoded-over-full-scale | 1.000 | 2.15 | -11.14 | 6.8 / 6.0 | 0.000 |
| `assets/audio/swaps/restored-enemies-minigun-fire-loop.ogg` | decoded-over-full-scale | 1.990 | 1.83 | -11.24 | 0.0 / 0.0 | 0.000 |
| `assets/audio/swaps/restored-sfx-armor-break-01.mp3` | decoded-over-full-scale | 0.880 | 1.29 | -21.42 | 56.1 / 56.8 | 0.000 |
| `assets/audio/swaps/restored-sfx-casing-01.ogg` | long-lead-in | 2.000 | -1.03 | -25.82 | 68.1 / 67.5 | 1.000 |
| `assets/audio/swaps/restored-sfx-chamber-01.mp3` | decoded-over-full-scale | 0.880 | 0.37 | -23.88 | 62.9 / 60.2 | 0.000 |
| `assets/audio/swaps/restored-sfx-death-fall-01.mp3` | decoded-over-full-scale | 1.000 | 0.23 | -12.12 | 18.3 / 16.0 | 0.000 |
| `assets/audio/swaps/restored-sfx-dry-fire-01.mp3` | decoded-over-full-scale | 0.600 | 0.08 | -28.30 | 66.8 / 68.3 | 0.000 |
| `assets/audio/swaps/restored-sfx-grunt-m4a1-burst-01.mp3` | decoded-over-full-scale | 0.880 | 2.03 | -13.47 | 9.3 / 9.1 | 0.000 |
| `assets/audio/swaps/restored-sfx-hit-confirm-01.ogg` | decoded-over-full-scale | 0.597 | 0.55 | -23.73 | 23.1 / 24.7 | 0.000 |
| `assets/audio/swaps/restored-sfx-impact-glass-01.mp3` | decoded-over-full-scale | 0.800 | 0.85 | -22.16 | 36.4 / 36.2 | 0.000 |
| `assets/audio/swaps/restored-sfx-impact-metal-01.mp3` | decoded-over-full-scale | 0.800 | 0.00 | -22.25 | 10.0 / 11.2 | 0.000 |
| `assets/audio/swaps/restored-sfx-machine-fire-01.ogg` | decoded-over-full-scale | 0.837 | 2.88 | -14.05 | 14.1 / 12.8 | 0.002 |
| `assets/audio/swaps/restored-sfx-mag-in-01.mp3` | decoded-over-full-scale | 0.800 | 0.80 | -27.39 | 39.6 / 33.8 | 0.000 |
| `assets/audio/swaps/restored-sfx-reload-cancel-01.mp3` | decoded-over-full-scale | 0.680 | 1.34 | -24.32 | 23.0 / 25.0 | 0.000 |
| `assets/audio/swaps/restored-sfx-shotgun-fire-01.mp3` | decoded-over-full-scale | 0.880 | 1.33 | -17.29 | 36.1 / 35.2 | 0.196 |
| `assets/audio/swaps/restored-sfx-ui-click-01.mp3` | mostly-silence | 0.600 | -9.68 | -39.05 | 82.6 / 81.7 | 0.027 |
| `assets/audio/swaps/restored-sfx-ui-zen-typing-01.ogg` | mostly-silence | 0.082 | -16.43 | -34.44 | 90.0 / 87.8 | 0.000 |
| `assets/audio/swaps/restored-streaks-ac-reload.mp3` | decoded-over-full-scale | 1.080 | 0.18 | -22.48 | 33.7 / 27.8 | 0.001 |
| `assets/audio/swaps/restored-streaks-blast-big.mp3` | decoded-over-full-scale | 1.760 | 1.49 | -12.50 | 41.7 / 40.3 | 0.000 |
| `assets/audio/swaps/restored-streaks-jet-flyby.mp3` | decoded-over-full-scale | 2.760 | 1.02 | -11.48 | 0.5 / 0.0 | 0.000 |
| `assets/audio/swaps/restored-streaks-juggernaut-breath.mp3` | decoded-over-full-scale | 1.760 | 0.26 | -13.63 | 20.7 / 11.4 | 0.000 |
| `assets/audio/swaps/restored-streaks-missile-boost.mp3` | decoded-over-full-scale | 0.800 | 1.57 | -8.27 | 25.9 / 22.5 | 0.000 |
| `assets/audio/swaps/restored-streaks-missile-launch.mp3` | decoded-over-full-scale | 1.200 | 1.13 | -11.93 | 12.4 / 10.8 | 0.000 |
| `assets/audio/swaps/restored-streaks-missile-wind-loop.ogg` | decoded-over-full-scale | 4.940 | 1.43 | -13.61 | 0.0 / 0.0 | 0.000 |
| `assets/audio/swaps/restored-streaks-smoke-hiss-loop.ogg` | decoded-over-full-scale | 4.940 | 0.82 | -13.25 | 0.0 / 0.0 | 0.000 |
| `assets/audio/swaps/restored-streaks-streak-earned.mp3` | decoded-over-full-scale | 1.000 | 0.10 | -22.02 | 50.6 / 46.0 | 0.000 |
| `assets/audio/swaps/restored-streaks-supply-heli-flyby.mp3` | decoded-over-full-scale | 3.000 | 0.06 | -13.54 | 13.2 / 11.7 | 0.000 |

Mostly-silence flags are a screening threshold, not proof of a broken transient. Dead lead-ins and missing/duplicate content go to the sound owner. 45 codec sources decode above full scale in float; this does not imply every playback clips because authored gains provide headroom. No asset samples were edited.

## Runtime - every tested weapon/layer

Native GodotJS headless AudioEffectRecord Master PCM plus actual AudioStreamPlayer bus/send gains; 100% volume, committed tuning.json and swaps, no saved/live human overrides. Isolated 46-case before and intermediate after. Final 10-case subset retested headroom and auditions after gain changes; final burst is 12 shots vs 4 baseline (stronger stress). First baseline near-pistol echo was dropped because test scheduled before a costly sound-set switch; fresh setup clock retest produces PCM, so this is not a game defect. Default empty mechanical/sub are tested solo. New machine-fire direct case is an API diagnostic: normal New-mode gameplay uses the five-layer rifle instead. Secondary audit adds 74 cheat/enemy cue, support-loop and enemy-gun cases in both sound sets, plus actual console auditions. World sources are at their authored unit_size (unity distance gain); cheat one-shots use the production flat actor path. First recorder/decoder warmup can miss a short drone cue; warmed retry produces PCM. New officer radio is deliberately muted by profile newMutedPaths. The final mortar/browser corrections have their own native retries. No warmup case is treated as a content defect.

| Case | Resolved physical recording(s) | Effective gain(s) dB including sends | Master peak dBFS | Full-scale PCM samples |
| --- | --- | --- | ---: | ---: |
| classic-pistol-fire | `res://assets/audio/swaps/restored-sfx-pistol-fire-01.mp3` | -7 | -23.85 | 0 |
| classic-machine-fire | `res://assets/audio/swaps/restored-sfx-machine-fire-01.ogg` | -4 | -1.22 | 0 |
| classic-shotgun-fire | `res://assets/audio/swaps/restored-sfx-shotgun-fire-01.mp3` | -8.7 | -7.39 | 0 |
| classic-sniper-fire | `res://assets/audio/sfx/sniper-fire-01.ogg` | -4 | -6.38 | 0 |
| classic-combat-smg | `res://assets/audio/combat/combat-smg.ogg` | -11 | -12.70 | 0 |
| classic-combat-dmr | `res://assets/audio/combat/combat-dmr.ogg` | -8 | -14.31 | 0 |
| classic-combat-launcher | `res://assets/audio/combat/combat-launcher.ogg` | -8 | -9.45 | 0 |
| classic-shotgun-pump | `res://assets/audio/sfx/shotgun-pump-04.ogg` | -5 | -7.18 | 0 |
| classic-chamber | `res://assets/audio/swaps/restored-sfx-chamber-01.mp3` | -19.6 | -19.23 | 0 |
| classic-mag-out | `res://assets/audio/swaps/restored-sfx-mag-out-01.mp3` | -14.9 | -18.40 | 0 |
| classic-mag-in | `res://assets/audio/swaps/restored-sfx-mag-in-01.mp3` | -20 | -19.20 | 0 |
| classic-reload-ready | `res://assets/audio/swaps/restored-sfx-reload-ready-01.mp3` | -16.1 | -18.69 | 0 |
| classic-dry-fire | `res://assets/audio/swaps/restored-sfx-dry-fire-01.mp3` | -7.1 | -7.13 | 0 |
| new-pistol-fire | `res://assets/audio/swaps/restored-sfx-pistol-fire-01.mp3` | -7 | -23.85 | 0 |
| new-machine-fire | `res://assets/audio/swaps/restored-sfx-machine-fire-01.ogg` | -4 | -1.22 | 0 |
| new-shotgun-fire | `res://assets/audio/swaps/restored-sfx-shotgun-fire-01.mp3` | -8.7 | -7.49 | 0 |
| new-sniper-fire | `res://assets/audio/sfx/sniper-fire-01.ogg` | -4 | -6.38 | 0 |
| new-combat-smg | `res://assets/audio/combat/combat-smg.ogg` | -11 | -12.58 | 0 |
| new-combat-dmr | `res://assets/audio/combat/combat-dmr.ogg` | -8 | -14.29 | 0 |
| new-combat-launcher | `res://assets/audio/combat/combat-launcher.ogg` | -8 | -9.45 | 0 |
| new-shotgun-pump | `res://assets/audio/sfx/shotgun-pump-03.ogg` | -5 | -6.86 | 0 |
| new-chamber | `res://assets/audio/swaps/restored-sfx-chamber-01.mp3` | -19.6 | -19.23 | 0 |
| new-mag-out | `res://assets/audio/swaps/restored-sfx-mag-out-01.mp3` | -14.9 | -18.40 | 0 |
| new-mag-in | `res://assets/audio/swaps/restored-sfx-mag-in-01.mp3` | -20 | -19.20 | 0 |
| new-reload-ready | `res://assets/audio/swaps/restored-sfx-reload-ready-01.mp3` | -16.1 | -18.69 | 0 |
| new-dry-fire | `res://assets/audio/swaps/restored-sfx-dry-fire-01.mp3` | -7.1 | -6.95 | 0 |
| classic-pistol-fire-tail-near | `res://assets/audio/swaps/restored-sfx-pistol-fire-01.mp3` | -24 | -40.85 | 0 |
| classic-pistol-fire-tail-far | `res://assets/audio/swaps/restored-sfx-pistol-fire-01.mp3` | -28 | -44.87 | 0 |
| classic-machine-fire-tail-near | `res://assets/audio/swaps/restored-sfx-machine-fire-01.ogg` | -33.5 | -30.76 | 0 |
| classic-machine-fire-tail-far | `res://assets/audio/swaps/restored-sfx-machine-fire-01.ogg` | -37.5 | -34.76 | 0 |
| classic-shotgun-fire-tail-near | `res://assets/audio/swaps/restored-sfx-shotgun-fire-01.mp3` | -25.7 | -24.45 | 0 |
| classic-shotgun-fire-tail-far | `res://assets/audio/swaps/restored-sfx-shotgun-fire-01.mp3` | -29.7 | -28.44 | 0 |
| classic-sniper-fire-tail-near | `res://assets/audio/sfx/sniper-fire-01.ogg` | -21 | -23.28 | 0 |
| classic-sniper-fire-tail-far | `res://assets/audio/sfx/sniper-fire-01.ogg` | -25 | -27.31 | 0 |
| classic-combat-smg-tail-near | `res://assets/audio/combat/combat-smg.ogg` | -33 | -34.53 | 0 |
| classic-combat-smg-tail-far | `res://assets/audio/combat/combat-smg.ogg` | -37 | -38.47 | 0 |
| classic-combat-dmr-tail-near | `res://assets/audio/combat/combat-dmr.ogg` | -25 | -31.29 | 0 |
| classic-combat-dmr-tail-far | `res://assets/audio/combat/combat-dmr.ogg` | -29 | -35.30 | 0 |
| classic-combat-launcher-tail-near | `res://assets/audio/combat/combat-launcher.ogg` | -25 | -26.45 | 0 |
| classic-combat-launcher-tail-far | `res://assets/audio/combat/combat-launcher.ogg` | -29 | -30.45 | 0 |
| new-rifle-burst | `res://assets/audio/swaps/restored-sfx-machine-fire-01.ogg` | -38.5, -35.5, -32.5, -31.59, -30.57, -30.52, -29.5, -29.06, -25.5, -10.5, -7.5 | -0.34 | 0 |
| new-rifle-mechanical | none | n/a | silent | 0 |
| new-rifle-body | `res://assets/audio/swaps/restored-sfx-machine-fire-01.ogg` | -7.5 | -4.72 | 0 |
| new-rifle-sub | none | n/a | silent | 0 |
| new-rifle-reflections | `res://assets/audio/swaps/restored-sfx-machine-fire-01.ogg` | -32.12 | -28.42 | 0 |
| new-rifle-tail | `res://assets/audio/swaps/restored-sfx-machine-fire-01.ogg` | -25.5 | -30.12 | 0 |
| classic-cheat-drone-shot | `res://assets/audio/swaps/restored-cheats-cheat-drone-shot-03.mp3` | -0.1 | -22.29 | 0 |
| classic-cheat-rpg-launch | `res://assets/audio/swaps/restored-cheats-cheat-rpg-launch-02.mp3` | -6.4 | -4.35 | 0 |
| classic-cheat-rpg-blast | `res://assets/audio/swaps/restored-cheats-cheat-rpg-blast-02.mp3` | -5.5 | -4.26 | 0 |
| classic-cheat-ricochet | `res://assets/audio/swaps/restored-cheats-cheat-ricochet-01.mp3` | 0 | -14.76 | 0 |
| classic-cheat-mortar-whistle | `res://assets/audio/swaps/restored-cheats-cheat-mortar-whistle-01.mp3` | -3.7 | -4.41 | 0 |
| classic-cheat-mortar-impact | `res://assets/audio/swaps/restored-cheats-cheat-mortar-impact-01.mp3` | -4.2 | -4.30 | 0 |
| classic-cheat-grenade-drop | `res://assets/audio/cheats/cheat-grenade-drop-01.ogg` | 0 | -16.10 | 0 |
| classic-cheat-grenade-clink | `res://assets/audio/cheats/cheat-grenade-clink-01.ogg` | 0 | -23.38 | 0 |
| classic-cheat-grenade-blast | `res://assets/audio/swaps/restored-cheats-cheat-grenade-blast-02.mp3` | -4.4 | -3.83 | 0 |
| classic-cheat-lag-hit | `res://assets/audio/swaps/restored-cheats-cheat-lag-hit-01.mp3` | -8.4 | -5.74 | 0 |
| classic-cheat-turret-deploy | `res://assets/audio/swaps/restored-cheats-cheat-turret-deploy-01.mp3` | -4.6 | -4.57 | 0 |
| classic-cheat-turret-network-deploy | `res://assets/audio/swaps/restored-cheats-cheat-turret-network-deploy-01.mp3` | -5.6 | -4.82 | 0 |
| classic-cheat-turret-shot | `res://assets/audio/swaps/restored-cheats-cheat-turret-shot-02.mp3` | -5.9 | -5.02 | 0 |
| classic-cheat-turret-expire | `res://assets/audio/swaps/restored-cheats-cheat-turret-expire-01.mp3` | -2.6 | -4.32 | 0 |
| classic-cheat-knife-throw | `res://assets/audio/swaps/restored-cheats-cheat-knife-throw-02.mp3` | -2.3 | -4.68 | 0 |
| classic-cheat-knife-hit | `res://assets/audio/swaps/restored-cheats-cheat-knife-hit-02.mp3` | -4.2 | -4.42 | 0 |
| classic-cheat-flashbang-pop | `res://assets/audio/swaps/restored-cheats-cheat-flashbang-pop-01.mp3` | -5.4 | -4.64 | 0 |
| classic-cheat-claymore-plant | `res://assets/audio/swaps/restored-cheats-cheat-claymore-plant-01.mp3` | -5.1 | -4.35 | 0 |
| classic-cheat-claymore-blast | `res://assets/audio/swaps/restored-cheats-cheat-claymore-blast-01.mp3` | -5.8 | -4.73 | 0 |
| classic-cheat-betty-pop | `res://assets/audio/swaps/restored-cheats-cheat-betty-pop-01.mp3` | -2.3 | -4.53 | 0 |
| classic-cheat-rail | `res://assets/audio/swaps/restored-cheats-cheat-rail-layer-01.mp3` | -0.2 | -8.33 | 0 |
| classic-enemy-officer-radio | `res://assets/audio/swaps/restored-cheats-enemy-officer-radio-01.mp3` | -4.3 | -4.68 | 0 |
| classic-enemy-uav-online | `res://assets/audio/swaps/restored-cheats-enemy-uav-online-01.mp3` | -4.3 | -4.64 | 0 |
| classic-enemy-plate-break | `res://assets/audio/cheats/enemy-plate-break-01.ogg` | 0 | -10.89 | 0 |
| classic-enemy-commander-roar | `res://assets/audio/cheats/enemy-commander-roar-01.ogg` | 0 | -11.84 | 0 |
| classic-cheat-drone-hover | `res://assets/audio/swaps/restored-cheats-cheat-drone-hover-loop.ogg` | -1.3 | -13.81 | 0 |
| classic-cheat-drone-swarm-hover | `res://assets/audio/swaps/restored-cheats-cheat-drone-swarm-hover-loop.ogg` | -6.5 | -13.25 | 0 |
| classic-cheat-turret-idle | `res://assets/audio/swaps/restored-cheats-cheat-turret-idle-loop.ogg` | -6.1 | -19.46 | 0 |
| classic-enemy-heli-rotor | `res://assets/audio/swaps/restored-cheats-enemy-heli-rotor-loop.ogg` | -0.6 | -16.07 | 0 |
| classic-combat-enemy-rifle | `res://assets/audio/swaps/restored-sfx-weapon-remote-01.mp3` | -1.2 | -16.20 | 0 |
| classic-combat-enemy-pistol | `res://assets/audio/swaps/restored-sfx-weapon-remote-01.mp3` | -2.2 | -17.34 | 0 |
| classic-combat-enemy-shotgun | `res://assets/audio/swaps/restored-sfx-weapon-remote-01.mp3` | -0.2 | -15.28 | 0 |
| classic-combat-enemy-launcher | `res://assets/audio/swaps/restored-sfx-weapon-remote-01.mp3` | -1.2 | -16.28 | 0 |
| classic-soldier-fire-rifle | `res://assets/audio/swaps/restored-sfx-weapon-remote-01.mp3` | -3.2 | -18.19 | 0 |
| classic-soldier-fire-pistol | `res://assets/audio/swaps/restored-sfx-weapon-remote-01.mp3` | -3.2 | -18.34 | 0 |
| classic-soldier-fire-shotgun | `res://assets/audio/swaps/restored-sfx-weapon-remote-01.mp3` | -1.2 | -16.28 | 0 |
| classic-grunt-m4a1-burst | `res://assets/audio/swaps/restored-sfx-grunt-m4a1-burst-01.mp3` | -13.6 | -15.21 | 0 |
| new-cheat-drone-shot | `res://assets/audio/swaps/restored-cheats-cheat-drone-shot-01.mp3` | -0.1 | -22.29 | 0 |
| new-cheat-rpg-launch | `res://assets/audio/swaps/restored-cheats-cheat-rpg-launch-02.mp3` | -6.4 | -4.35 | 0 |
| new-cheat-rpg-blast | `res://assets/audio/swaps/restored-cheats-cheat-rpg-blast-01.mp3` | -5.5 | -4.26 | 0 |
| new-cheat-ricochet | `res://assets/audio/swaps/restored-cheats-cheat-ricochet-03.mp3` | 0 | -14.76 | 0 |
| new-cheat-mortar-whistle | `res://assets/audio/swaps/restored-cheats-cheat-mortar-whistle-01.mp3` | -3.7 | -4.41 | 0 |
| new-cheat-mortar-impact | `res://assets/audio/swaps/restored-cheats-cheat-mortar-impact-02.mp3` | -1.2 | -1.30 | 0 |
| new-cheat-grenade-drop | `res://assets/audio/cheats/cheat-grenade-drop-01.ogg` | 0 | -16.10 | 0 |
| new-cheat-grenade-clink | `res://assets/audio/cheats/cheat-grenade-clink-02.ogg` | 0 | -16.00 | 0 |
| new-cheat-grenade-blast | `res://assets/audio/swaps/restored-cheats-cheat-grenade-blast-02.mp3` | -4.4 | -3.83 | 0 |
| new-cheat-lag-hit | `res://assets/audio/swaps/restored-cheats-cheat-lag-hit-02.mp3` | -8.4 | -5.74 | 0 |
| new-cheat-turret-deploy | `res://assets/audio/swaps/restored-cheats-cheat-turret-deploy-01.mp3` | -4.6 | -4.57 | 0 |
| new-cheat-turret-network-deploy | `res://assets/audio/swaps/restored-cheats-cheat-turret-network-deploy-01.mp3` | -5.6 | -4.82 | 0 |
| new-cheat-turret-shot | `res://assets/audio/swaps/restored-cheats-cheat-turret-shot-02.mp3` | -5.9 | -5.02 | 0 |
| new-cheat-turret-expire | `res://assets/audio/swaps/restored-cheats-cheat-turret-expire-01.mp3` | -2.6 | -4.32 | 0 |
| new-cheat-knife-throw | `res://assets/audio/swaps/restored-cheats-cheat-knife-throw-02.mp3` | -2.3 | -4.68 | 0 |
| new-cheat-knife-hit | `res://assets/audio/swaps/restored-cheats-cheat-knife-hit-01.mp3` | -4.2 | -4.42 | 0 |
| new-cheat-flashbang-pop | `res://assets/audio/swaps/restored-cheats-cheat-flashbang-pop-01.mp3` | -5.4 | -4.64 | 0 |
| new-cheat-claymore-plant | `res://assets/audio/swaps/restored-cheats-cheat-claymore-plant-01.mp3` | -5.1 | -4.35 | 0 |
| new-cheat-claymore-blast | `res://assets/audio/swaps/restored-cheats-cheat-claymore-blast-02.mp3` | -5.8 | -4.73 | 0 |
| new-cheat-betty-pop | `res://assets/audio/swaps/restored-cheats-cheat-betty-pop-01.mp3` | -2.3 | -4.53 | 0 |
| new-cheat-rail | `res://assets/audio/swaps/restored-cheats-cheat-rail-layer-01.mp3` | -0.2 | -8.33 | 0 |
| new-enemy-officer-radio | none | n/a | silent | 0 |
| new-enemy-uav-online | `res://assets/audio/swaps/restored-cheats-enemy-uav-online-01.mp3` | -4.3 | -4.64 | 0 |
| new-enemy-plate-break | `res://assets/audio/cheats/enemy-plate-break-01.ogg` | 0 | -10.89 | 0 |
| new-enemy-commander-roar | `res://assets/audio/cheats/enemy-commander-roar-01.ogg` | 0 | -11.84 | 0 |
| new-cheat-drone-hover | `res://assets/audio/swaps/restored-cheats-cheat-drone-hover-loop.ogg` | -1.3 | -13.81 | 0 |
| new-cheat-drone-swarm-hover | `res://assets/audio/swaps/restored-cheats-cheat-drone-swarm-hover-loop.ogg` | -6.5 | -13.25 | 0 |
| new-cheat-turret-idle | `res://assets/audio/swaps/restored-cheats-cheat-turret-idle-loop.ogg` | -6.1 | -23.04 | 0 |
| new-enemy-heli-rotor | `res://assets/audio/swaps/restored-cheats-enemy-heli-rotor-loop.ogg` | -0.6 | -16.07 | 0 |
| new-combat-enemy-rifle | `res://assets/audio/swaps/restored-sfx-weapon-remote-01.mp3` | -1.2 | -16.20 | 0 |
| new-combat-enemy-pistol | `res://assets/audio/swaps/restored-sfx-weapon-remote-01.mp3` | -2.2 | -17.34 | 0 |
| new-combat-enemy-shotgun | `res://assets/audio/swaps/restored-sfx-weapon-remote-01.mp3` | -0.2 | -15.28 | 0 |
| new-combat-enemy-launcher | `res://assets/audio/swaps/restored-sfx-weapon-remote-01.mp3` | -1.2 | -16.28 | 0 |
| new-soldier-fire-rifle | `res://assets/audio/swaps/restored-sfx-weapon-remote-01.mp3` | -3.2 | -18.20 | 0 |
| new-soldier-fire-pistol | `res://assets/audio/swaps/restored-sfx-weapon-remote-01.mp3` | -3.2 | -18.34 | 0 |
| new-soldier-fire-shotgun | `res://assets/audio/swaps/restored-sfx-weapon-remote-01.mp3` | -1.2 | -16.28 | 0 |
| new-grunt-m4a1-burst | `res://assets/audio/swaps/restored-sfx-grunt-m4a1-burst-01.mp3` | -13.6 | -15.21 | 0 |
| new-preview-rifle-mechanical | none | n/a | silent | 0 |
| new-preview-rifle-body | `res://assets/audio/swaps/restored-sfx-machine-fire-01.ogg` | -6 | -3.22 | 0 |
| new-preview-rifle-sub | none | n/a | silent | 0 |
| new-preview-rifle-reflections | `res://assets/audio/swaps/restored-sfx-machine-fire-01.ogg` | -16.5 | -13.60 | 0 |
| new-preview-rifle-tail | `res://assets/audio/swaps/restored-sfx-machine-fire-01.ogg` | -16.5 | -13.60 | 0 |

At 100% default volume there are no assigned starts at/below -40 dB effective gain. Tail decay can intentionally fade below that floor; the late reflections are intentionally quiet. Pistol near/far echoes produce very quiet PCM (-40.85/-44.85 dBFS), with -24/-28 dB effective gains.

## Fixes

- Empty effect previews now resolve the same body recording as gameplay (tail/reflection HTTP 404 -> 200); mechanical/sub stay empty until sound owner supplies recordings.
- Starts with explicit authored values cannot accidentally recover a prior pooled sound base (e.g. pistol -5 plus -2 trim equals rifle authored -7).
- Local Classic direct rifle adds -3 dB headroom after its proper authored -7 dB base; +6 saved trim unchanged. Measured direct gain +1 -> -4 dB in the pooled reproduction.
- New rifle body base -7 -> -15 dB. Saved +6 trim and first/sustained accents unchanged: first effective +0.5 -> -7.5 dB. Tail/reflection gains unchanged. Single-shot clipping and a stronger 12-shot burst now have zero full-scale PCM samples.
- Raw decodes, committed swaps and duplicated effect streams retain physical source identity separately from the virtual tuning key.

## Byte-identical groups

36 groups: 23 numbered variation groups; 13 intentional asset-set/swap mirrors. Exact SHA-256 groups below.


New mortar accent +6 -> +3 dB; with saved -4.2 dB trim effective gain +1.8 -> -1.2 dB, Master peak now -1.30 dBFS and zero full-scale samples. Browser unplayed audition defaults 0 dB / Master -> -12 dB / GameplaySfx, matching F4. Actual console auditions produced PCM for body/reflections/tail (-3.22/-13.60/-13.60 dBFS); empty mechanical/sub stayed silent.

- Mirror `ba333830bbceffe75808938ed887eab4c3b8cb1fed95a7a4f0ecb6cc0d757917`: `assets/audio/ambience/pa-murmur.ogg`, `assets/audio/classic/ambience/pa-murmur.ogg`
- Mirror `444baba1e1d71cf017a42248df8306cc8954da119f3bf7c0e7f78f2d4904bf47`: `assets/audio/classic/sfx/dialogue-blip-01.ogg`, `assets/audio/sfx/dialogue-blip-01.ogg`
- Mirror `9dc812d556bd387b0b3b1057b15be17ff7b95cc7454604a3b464f51c30e0b703`: `assets/audio/classic/sfx/dialogue-blip-garbled-01.ogg`, `assets/audio/sfx/dialogue-blip-garbled-01.ogg`
- Mirror `be5f63217da372d9e1beb459d11c91a335ac2841e8d125aee145f416861974e2`: `assets/audio/classic/sfx/grenade-whoosh-01.ogg`, `assets/audio/sfx/grenade-whoosh-01.ogg`
- Mirror `11b6785b09bda94271d1cdca7e7af3633a7fdf0c9b487a0f81f9935f7066948b`: `assets/audio/classic/sfx/pickup-success-01.ogg`, `assets/audio/sfx/pickup-success-01.ogg`
- Mirror `73406ff13f78b3e713b4294a347a974d39471ed99f39c40ed194d543031035f7`: `assets/audio/classic/sfx/score-fight-sting-01.ogg`, `assets/audio/sfx/score-fight-sting-01.ogg`
- Mirror `5de38aaf3b1dc29ef8d29ed5cac18bf2726adb5baa9cfeda24c5c1fd8e96d86d`: `assets/audio/classic/sfx/ui-close-01.ogg`, `assets/audio/sfx/ui-close-01.ogg`
- Mirror `2f7d3008bc8b74062b51dbf27c0c49c0b3c503ea77b0d1f25f0144312ea888fe`: `assets/audio/classic/sfx/ui-confirm-01.ogg`, `assets/audio/sfx/ui-confirm-01.ogg`
- Mirror `b2915096f066a23303999c31c2f8a0569ad9fd7fe54d0ddbf6e05f6078d837e0`: `assets/audio/classic/sfx/ui-open-01.ogg`, `assets/audio/sfx/ui-open-01.ogg`
- Mirror `c81c50304d7902793cd06ddb214b651703d9d0d84a489a8549e5f837ec3b03c8`: `assets/audio/enemies/grunt-contact.ogg`, `assets/audio/swaps/grunt-contact.ogg`
- Mirror `bb6ce1df961e08f10d7ccaac19319cfad3871d6c50c9f428d239992745bbbed2`: `assets/audio/enemies/grunt-rifle-rack.ogg`, `assets/audio/swaps/grunt-rifle-rack.ogg`
- Mirror `23164d6914c7fbe205c2520d34a88418bf4e015db813d108258dd9670efeb0be`: `assets/audio/enemies/grunt-run-gear.ogg`, `assets/audio/swaps/grunt-run-gear.ogg`
- Mirror `21c258fdd5d4f7b36953d648884f1b4b699fb7fafa0ebe7f27a93b6cbb79ec4c`: `assets/audio/enemies/grunt-squad-whistle.ogg`, `assets/audio/swaps/grunt-squad-whistle.ogg`
- Variation `8e48e71dff1c326c6719b2e1a0ddf463630d494eb4c9da76d910fb2f1eb85736`: `assets/audio/swaps/restored-cheats-cheat-claymore-blast-01.mp3`, `assets/audio/swaps/restored-cheats-cheat-claymore-blast-02.mp3`
- Variation `60d1df19d6f673cc5790606dfd01e34a623ae18853e1deb721bcb3efdcce0313`: `assets/audio/swaps/restored-cheats-cheat-drone-shot-01.mp3`, `assets/audio/swaps/restored-cheats-cheat-drone-shot-02.mp3`, `assets/audio/swaps/restored-cheats-cheat-drone-shot-03.mp3`
- Variation `daba87ff0b0de8577e5683d5d4465a9528a0920dffc74384015e0fea107dbcb8`: `assets/audio/swaps/restored-cheats-cheat-grenade-blast-01.mp3`, `assets/audio/swaps/restored-cheats-cheat-grenade-blast-02.mp3`
- Variation `d5eba8d9b5a692ba9bcf1ed77dd1339f55e9caf7c1adb2e6ebd025e5680ddf01`: `assets/audio/swaps/restored-cheats-cheat-knife-hit-01.mp3`, `assets/audio/swaps/restored-cheats-cheat-knife-hit-02.mp3`, `assets/audio/swaps/restored-cheats-cheat-knife-hit-03.mp3`
- Variation `6e07d19edb7635df4a5c7d6a7e4db439c4375421fd36d20716a19680975b24dd`: `assets/audio/swaps/restored-cheats-cheat-knife-throw-01.mp3`, `assets/audio/swaps/restored-cheats-cheat-knife-throw-02.mp3`
- Variation `3a489d92c571ab567f2eda01abf028da41943a6c93fccd2ebc416c9b604f763d`: `assets/audio/swaps/restored-cheats-cheat-lag-hit-01.mp3`, `assets/audio/swaps/restored-cheats-cheat-lag-hit-02.mp3`
- Variation `030d577842e62c7a04f1e47e907ee2935bd607fc7b83d1920781ab40a328f294`: `assets/audio/swaps/restored-cheats-cheat-mortar-impact-01.mp3`, `assets/audio/swaps/restored-cheats-cheat-mortar-impact-02.mp3`
- Variation `fe10c033e1279d35b5e6e8074407bde50445e9cfa9421c001ebd486711239bf9`: `assets/audio/swaps/restored-cheats-cheat-ricochet-01.mp3`, `assets/audio/swaps/restored-cheats-cheat-ricochet-02.mp3`, `assets/audio/swaps/restored-cheats-cheat-ricochet-03.mp3`
- Variation `59c783c3eca026642dc97b8cc582d8a4d08edb6103706e984870b02d3e344c9f`: `assets/audio/swaps/restored-cheats-cheat-rpg-blast-01.mp3`, `assets/audio/swaps/restored-cheats-cheat-rpg-blast-02.mp3`
- Variation `5684f8eaa21d60124a5ac30b07c947e009f672f470b94dfe8887b564e52aa6cd`: `assets/audio/swaps/restored-cheats-cheat-rpg-launch-01.mp3`, `assets/audio/swaps/restored-cheats-cheat-rpg-launch-02.mp3`
- Variation `f1962f1b3fea50fa34ba0ced28c550ab8a29538c66fc36de9adf06de751b1c34`: `assets/audio/swaps/restored-cheats-cheat-turret-shot-01.mp3`, `assets/audio/swaps/restored-cheats-cheat-turret-shot-02.mp3`, `assets/audio/swaps/restored-cheats-cheat-turret-shot-03.mp3`
- Variation `6cb83a4547b202698fbaa452b1621122d60cf88da15300fecfe8393b689a7d38`: `assets/audio/swaps/restored-enemies-dog-step-01.mp3`, `assets/audio/swaps/restored-enemies-dog-step-02.mp3`, `assets/audio/swaps/restored-enemies-dog-step-03.mp3`, `assets/audio/swaps/restored-enemies-dog-step-04.mp3`
- Variation `cfaf5b3b0bd46697983412d12129056306e1f94b0156d81fad30bf26417e6bfc`: `assets/audio/swaps/restored-enemies-heavy-step-01.mp3`, `assets/audio/swaps/restored-enemies-heavy-step-02.mp3`, `assets/audio/swaps/restored-enemies-heavy-step-03.mp3`, `assets/audio/swaps/restored-enemies-heavy-step-04.mp3`
- Variation `7c44c19146c804ba0d077ad43da52e56724b44d8bbfd16a2e9732a2a0e252b1f`: `assets/audio/swaps/restored-enemies-soldier-step-01.mp3`, `assets/audio/swaps/restored-enemies-soldier-step-02.mp3`, `assets/audio/swaps/restored-enemies-soldier-step-03.mp3`, `assets/audio/swaps/restored-enemies-soldier-step-04.mp3`
- Variation `5b6baafe994246e989da2c8e2c852381559a45a0f377a7e387c5cb5b02dee88e`: `assets/audio/swaps/restored-sfx-clothing-01.mp3`, `assets/audio/swaps/restored-sfx-clothing-02.mp3`, `assets/audio/swaps/restored-sfx-clothing-03.mp3`, `assets/audio/swaps/restored-sfx-clothing-04.mp3`
- Variation `b01aa34646a8a7a0112f5777664a60a950bfa4caf3cf9461efee7314f27d84d3`: `assets/audio/swaps/restored-sfx-enemy-death-01.mp3`, `assets/audio/swaps/restored-sfx-enemy-death-02.mp3`
- Variation `d05948f0d1b6e8aabac98cf19f14079bf85324cd427c1cd9dfe4bddae15fcde2`: `assets/audio/swaps/restored-sfx-impact-concrete-01.mp3`, `assets/audio/swaps/restored-sfx-impact-concrete-02.mp3`
- Variation `89e99788ea7a30d4c40655cb2f43629932436455f214c055450748ae803946a0`: `assets/audio/swaps/restored-sfx-knife-hit-01.mp3`, `assets/audio/swaps/restored-sfx-knife-hit-02.mp3`
- Variation `55b945cbd92a6c7ccea7cc102d3c9c012f6f8520eea9720490d0acfe3c008d00`: `assets/audio/swaps/restored-sfx-knife-slash-01.mp3`, `assets/audio/swaps/restored-sfx-knife-slash-02.mp3`
- Variation `9147d7f68a02a52919209927127cfad1af554100b838f3006aec6c1b6c1738f2`: `assets/audio/swaps/restored-sfx-landing-01.mp3`, `assets/audio/swaps/restored-sfx-landing-02.mp3`, `assets/audio/swaps/restored-sfx-landing-03.mp3`, `assets/audio/swaps/restored-sfx-landing-04.mp3`, `assets/audio/swaps/restored-sfx-landing-05.mp3`, `assets/audio/swaps/restored-sfx-landing-06.mp3`
- Variation `b5ba8c185ed8f013aaad1585df5f047d5c430d9fe5a437d9ee059c0dc85ed2ab`: `assets/audio/swaps/restored-sfx-step-concrete-01.mp3`, `assets/audio/swaps/restored-sfx-step-concrete-02.mp3`, `assets/audio/swaps/restored-sfx-step-concrete-03.mp3`, `assets/audio/swaps/restored-sfx-step-concrete-04.mp3`, `assets/audio/swaps/restored-sfx-step-concrete-05.mp3`, `assets/audio/swaps/restored-sfx-step-concrete-06.mp3`, `assets/audio/swaps/restored-sfx-step-concrete-07.mp3`, `assets/audio/swaps/restored-sfx-step-concrete-08.mp3`
- Variation `1f64cc9cb8bb074847edf40f27262cd45195376f3ace09fbc6a1483378e1a854`: `assets/audio/swaps/restored-sfx-step-glass-01.mp3`, `assets/audio/swaps/restored-sfx-step-glass-02.mp3`, `assets/audio/swaps/restored-sfx-step-glass-03.mp3`, `assets/audio/swaps/restored-sfx-step-glass-04.mp3`, `assets/audio/swaps/restored-sfx-step-glass-05.mp3`, `assets/audio/swaps/restored-sfx-step-glass-06.mp3`, `assets/audio/swaps/restored-sfx-step-glass-07.mp3`, `assets/audio/swaps/restored-sfx-step-glass-08.mp3`
- Variation `5c28f7a9dc1ab36b38eb0bb34de2698a20396cc0f5c03a8baa286c70730c35b3`: `assets/audio/swaps/restored-sfx-step-metal-01.mp3`, `assets/audio/swaps/restored-sfx-step-metal-02.mp3`, `assets/audio/swaps/restored-sfx-step-metal-03.mp3`, `assets/audio/swaps/restored-sfx-step-metal-04.mp3`, `assets/audio/swaps/restored-sfx-step-metal-05.mp3`, `assets/audio/swaps/restored-sfx-step-metal-06.mp3`, `assets/audio/swaps/restored-sfx-step-metal-07.mp3`, `assets/audio/swaps/restored-sfx-step-metal-08.mp3`
