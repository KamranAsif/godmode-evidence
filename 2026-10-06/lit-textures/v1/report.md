# Lit materials and shaded depth

Main c4f581d9f0970d71828572c16abc84d0bb488d55; candidate 50555ce41a47aa76ecc8f504d394280babd5f9b5. Map-wide ambient 0.16, shade fill 0.2, SSIL radius 5/intensity 1. Exposure 0.5 ACES, dynamic sun and SSAO retained. Trees and visible timber/metal/paint take CC0 layered maps through the existing hex functions. Facets and palette remain.

All images are native 1920×1080. The prototype reference uses its own baked lighting and original material profile.

Production comparison retains current main full atlas. Denser cropped bake is separate audit evidence; the release lane performs the full bake.

Eight sequential viewport captures with camera stepped 2.5 cm per capture; timestamp/pose receipts. These are stepped-camera diagnostics, not consecutive real-time video frames.

10 s samples after 5 s warmup, uncapped vsync off. Uncoordinated peer game instances existed during later samples. These observed machine FPS values are not a clean isolated regression estimate.

| View | Main FPS | New FPS | Main mean ms | New mean ms |
|---|---:|---:|---:|---:|
| outdoor | 88.1 | 15.8 | 11.35 | 63.31 |
| covered | 16.6 | 11.7 | 60.17 | 85.54 |
| contact | 16.6 | 15.2 | 60.23 | 65.92 |
| gameplay | 45.3 | 12.7 | 22.06 | 78.62 |

## Full resolution comparisons

- outdoor: [main](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/main-outdoor.png), [new](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/candidate-outdoor.png)
- covered: [main](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/main-covered.png), [new](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/candidate-covered.png)
- contact: [main](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/main-contact.png), [new](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/candidate-contact.png)
- gameplay: [main](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/main-gameplay.png), [new](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/candidate-gameplay.png)
- tree-close: [main](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/main-tree-close.png), [new](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/candidate-tree-close.png)
- tree-mid: [main](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/main-tree-mid.png), [new](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/candidate-tree-mid.png)
- tree-far: [main](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/main-tree-far.png), [new](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/candidate-tree-far.png)
- bark-close: [main](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/main-bark-close.png), [new](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/candidate-bark-close.png)
- street-cars-trees: [main](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/main-street-cars-trees.png), [new](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/candidate-street-cars-trees.png)
- car-close: [main](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/main-car-close.png), [new](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/candidate-car-close.png)
- car-mid: [main](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/main-car-mid.png), [new](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/candidate-car-mid.png)
- car-far: [main](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/main-car-far.png), [new](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/candidate-car-far.png)

## Sequential diagnostics and prototype

- [main-shimmer-00.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/main-shimmer-00.png)
- [main-shimmer-01.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/main-shimmer-01.png)
- [main-shimmer-02.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/main-shimmer-02.png)
- [main-shimmer-03.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/main-shimmer-03.png)
- [main-shimmer-04.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/main-shimmer-04.png)
- [main-shimmer-05.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/main-shimmer-05.png)
- [main-shimmer-06.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/main-shimmer-06.png)
- [main-shimmer-07.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/main-shimmer-07.png)
- [candidate-shimmer-00.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/candidate-shimmer-00.png)
- [candidate-shimmer-01.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/candidate-shimmer-01.png)
- [candidate-shimmer-02.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/candidate-shimmer-02.png)
- [candidate-shimmer-03.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/candidate-shimmer-03.png)
- [candidate-shimmer-04.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/candidate-shimmer-04.png)
- [candidate-shimmer-05.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/candidate-shimmer-05.png)
- [candidate-shimmer-06.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/candidate-shimmer-06.png)
- [candidate-shimmer-07.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/candidate-shimmer-07.png)
- [prototype-baked-car.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/prototype-baked-car.png)
- [prototype-baked-street.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/prototype-baked-street.png)
- [prototype-baked-car-sunlit.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/prototype-baked-car-sunlit.png)
- [prototype-baked-car-taxi.png](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-06/lit-textures/v1/prototype-baked-car-taxi.png)
