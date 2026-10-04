# Hunyuan batch 02 — concepts only

All fourteen #930 items covered. **14 concept images** (13 new objects plus the newspaper slate colourway), **15 fresh current captures**, measured source dimensions and exact prompts in [manifest.json](manifest.json). No 3D generation or game integration. New concepts await Kamran's approval before Tencent Hunyuan or Meshy.

Concepts use broad flat-shaded triangular facets, one flat colour per material, morning light, one isolated original object and a light background. Captures are native 1280×720 GodotJS output from source `333ab8333a60b319e8a873fd568fd392313164c2`, windowed off-screen at `[-10000,-10000]`.

| Item | Size W × H × D (metres) | Concept | Current |
|---|---|---|---|
| 1. Newspaper vending box | 0.58 × 1.05 × 0.564 | [concept](newspaper-vending-box-concept.png), [slate](newspaper-vending-box-slate-concept.png) | [current](newspaper-vending-box-current.png), [slate](newspaper-vending-box-slate-current.png) |
| 2. Utility cabinet | 0.85 × 1.46 × 0.6 | [concept](utility-cabinet-concept.png) | [current](utility-cabinet-current.png) |
| 3. Yard AC condenser | 1.315 × 1.34 × 1.205 | [concept](yard-ac-condenser-concept.png) | [current](yard-ac-condenser-current.png) |
| 4. Fire hydrant | 0.6 × 0.92 × 0.47 | Reuse approved hydrant; skipped | [current](fire-hydrant-current.png) |
| 5. Wheelie bin | 0.62 × 0.875 × 0.605 | [concept](wheelie-bin-concept.png) | [current](wheelie-bin-current.png) |
| 6. Simple park bench | 2.1 × 0.975 × 0.6 | [concept](simple-park-bench-concept.png) | [current](simple-park-bench-current.png) |
| 7. Street-lamp head | 0.44 × 0.28 × 0.49 | [concept](street-lamp-head-concept.png) | [current](street-lamp-head-current.png) |
| 8. Traffic signal head | 0.42 × 1.06 × 0.35 | [concept](traffic-signal-head-concept.png) | [current](traffic-signal-head-current.png) |
| 9. Landing service cabinet | 1.1 × 1.4 × 1.05 | [concept](landing-service-cabinet-concept.png) | [current](landing-service-cabinet-current.png) |
| 10. Roof HVAC basic unit | 2.2 × 1.712 × 1.665 | [concept](roof-hvac-basic-unit-concept.png) | [current](roof-hvac-basic-unit-current.png) |
| 11. Roof water tank | 2.38 × 4.15 × 2.388 | [concept](roof-water-tank-concept.png) | [current](roof-water-tank-current.png) |
| 12. Roof vent | 0.68 × 1.1 × 0.68 | [concept](roof-vent-concept.png) | [current](roof-vent-current.png) |
| 13. Landing rubber fender | 0.34 × 3.62 × 0.34 | [concept](landing-rubber-fender-concept.png) | [current](landing-rubber-fender-current.png) |
| 14. Garden shed | 2.2 × 2.4 × 1.9 | [concept](garden-shed-concept.png) | [current](garden-shed-current.png) |

The newspaper colourways share one model. Slate is an edit of the terracotta concept; use it as a material reference, not another mesh request. Yard AC and basic roof HVAC measurements include smaller variants in the manifest. Bench height above paving is 0.94 m; listed full bounds include buried feet. Lamp and traffic concepts cover heads only, retaining fitted poles and arms. Fenders are a single body repeated in pairs; nominal length with suspension is 4.42 m.

**Hydrant reuse:** `assets/props/street/hydrant.glb.bin` is already approved, 16,000 triangles, 0.50 × 0.68 × 0.38 m in Godot axes, foot at origin, with an existing loader and flat-colour treatment. Its cap and outlet silhouette suit all four primitive families. The manifest records fitting scales; no replacement was integrated in this concept task.

The [primitive audit](../primitive-audit/README.md) supplies placement context. Source measurement and current capture limitations are recorded per item. Concept geometry remains an artistic target for approval; later model fitting is still required.
