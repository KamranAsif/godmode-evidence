# BattleDuty: V2 mixed facets in production

10-23: 1.2 m facets with mixed 2.4/1.2/0.6 m regions; Kamran picked V2.

[Native labelled sheet](facets-v2-playtest-sheet.png), [smaller overview](facets-v2-playtest-overview.jpg), [eight raw native PNGs](raw-frames.zip).
Each raw frame is 1920x1080; sheet cells retain those pixels with labels outside them. Names are VIEW-before.png and VIEW-after.png (5m, 20m, shop, side). The ordinary run stays live, so enemies and corpses can differ between frames.

Before uses the verified original production 2.4 m arena; after uses the ONE regenerated and reloaded V2 arena. Both use ordinary exported Windows Playtest binaries, the shipped roguelite entry, perf replay and photo mode, and CLI OS-window capture. No facade fixture or runtime inspection bridge is packed. Existing unrelated prop-AO fixture helper dependencies remain in the ordinary pack. Binary hashes, actual native camera/resolution markers and capture receipts are retained. Full-detail HIGH quality, scale 1, identical projection/clip planes, lens correction OFF on both sides (matching the original study), no FSR2. Capture frame limit is 30; these screenshots are not timing measurements.

Map-wide V2: base 1.2 m, nominal 2.4/1.2/0.6 m parent-region probabilities 30/60/10 percent; tone 0.28, shading-normal tilt 0.075 radians, jitter 0.60. Unequal split fractions 0.35-0.65. Positions stay in each source triangle. No camera enters generation.

Saved near architecture triangles: 3,360,671 before; 6,676,716 after. V2 is 1.25 percent below the selected study's plain 1.2 m reference of 6,761,315. Far triangles remain 284,797 and near/far pairs 237. All 59,998 non-near instance geometry buffers, poses and material names are unchanged. One far culling-center component shifts 0.0153 mm; all 237 near/far pairs retain common centers and their 240 m handoff. Server content hash is unchanged.

The complete facade intersection audit retains ALL findings, including self/material contacts and every facade neighbour. Same algorithm and 389,422 candidate pairs. Before: 34,439 offending pairs, 296,951,653 triangle tests. After: 34,474 pairs, 332,471,904 tests. BOTH strict gates exit 1; there is no baseline allowance. 39 new pair signatures and four removed; new signatures comprise 32 coplanar self/material pairs, three inter-instance coplanar pairs, four quoin crossings 0.115-0.150 mm deep. All sampled new architecture triangles lie within 0.0649 mm of one original far-source triangle. This supports subdivision/float32 sensitivity, but does not waive findings or prove invisibility. Full ranked reports are gzip-compressed beside the comparison and packing diagnostic. Facade-opening pairs remain 678; repaired buildings_48791 window/facade pairs remain zero. All 506 fitted belts and window/door geometry remain unchanged.

One incremental arena pipeline generated fingerprint 91a1c1d9ec84289c511407beb4828ca2d6d05aca5f20dbf4bf6fdc12598d9e39. Reload verification matched client and server; free RAM started 20.85 GiB and bottomed at 4.03 GiB. No arena rebuild followed rebasing; exports reused this verified fingerprint. Engine: patched GodotJS 4.6.1 v8-nopc revision 2.

The original concept comparison and exploratory paired timings remain in [the choice study](../facets-variety-20261023/). Those were a visual fixture, not these exported gameplay captures.
