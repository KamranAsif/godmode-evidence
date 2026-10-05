# Machine-gun peep fix after #949

Source commit: 7b266a53a9e418d086385f731cc219c6af79b448.

Opened the filled rear peep in both machine-gun meshes with a 6 mm bore, as explicitly approved in chat. The rear socket now measures the enclosed aperture centroid; the front socket stays on the measured physical post tip. Rear and front project to screen centre in ADS. Sight-line rise: 2.072 degrees.

Four fresh 1920x1080 ADS captures use the production Game/WeaponView on the weapons review floor, windowed offscreen at (-10000,-10000). pnpm format, build (arena current), lint, full pnpm test (13/13), mesh sight checks, and actual roguelite headless smoke passed. No SCRIPT ERROR or GODMODE_FRAME_ERROR in rendered or smoke logs.
