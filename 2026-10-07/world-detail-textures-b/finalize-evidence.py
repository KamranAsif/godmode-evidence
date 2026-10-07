from pathlib import Path
import json, subprocess
root=Path(__file__).resolve().parent
repo=Path('../street-prop-textures-20261007/artifacts/prop-review/evidence/repo').resolve()
prefix='2026-10-07/world-detail-textures-b';dest=repo/prefix
revision=subprocess.check_output(['git','-C',str(repo),'rev-parse','HEAD']).decode().strip()
base=f'https://raw.githubusercontent.com/KamranAsif/godmode-evidence/{revision}/{prefix}'
manifest=json.loads((dest/'world/manifest.json').read_text())
urls={'evidenceCommit':revision,'source':manifest['source'],'manifest':f'{base}/world/manifest.json','contactIndex':f'{base}/world/contact-sheet-index.jpg','motionTour':f'{base}/world/motion-tour-1080p30.mp4','assets':{},'streets':{},'motion':{}}
rows=['# World detail textures, B strength','',
'Batch 3 rebased onto main after #1012 merged. Thirty visible material and asset checks: twenty-nine accepted contact sheets, one isolated pier sample excluded for coverage, plus six production views. Existing B roof and waterfront materials are retained as context; this is not a claim of thirty entirely new assets.', '',
'New routes cover skyline brick/stone/plaster and trim, bridge steel, worn road paint and kerbs, timber shop fronts and canvas, service panels, roof finishes, ray-traced shop interiors, physical reward cores, crate fallback panels and concrete debris. Existing authored textures and emissive signals remain in use. Synthetic facet lattices are disabled while actual geometry facets remain.', '',
'Each contact sheet contains three unchanged native 1920x1080 panels, with a 50px label strip. Actual production factory models retain scale/materials. Native city/road/bridge/pier samples preserve original triangles, normals and vertex colours and are rigidly translated into the gallery; their exact scene paths and crop provenance appear in the manifest. Gallery images are material checks, not production lightmap proofs.', '',
'The initial warmup produced no images because an old imported phone cache lacked the approved baked tracks. A real project import fixed it. That failed warmup is excluded. Final review found back-facing one-sided native gallery samples; their camera follows a representative production face normal in corrected replacements. All nineteen factory checks and six production views were retained. This is a coverage correction, with no texture design iteration. No auditor verdict is claimed.', '',
'## Six production views','', '| View | Raw native PNG |','|---|---|']
for street in manifest['streetViews']:
 url=f"{base}/world/{street['file']}";urls['streets'][street['file']]=url;rows.append(f"| {street['file']} | [PNG]({url}) |")
rows+=['','## Close / mid / far checks','',f"[Overview]({urls['contactIndex']}) | [Poses, native provenance, material parameters and hashes]({urls['manifest']})",'', '| Check | Raw native sheet |','|---|---|']
for asset in manifest['assets']:
 name=asset['asset']['id'];url=f"{base}/world/{asset['contactSheet']}";urls['assets'][name]=url;rows.append(f'| {name} | [close / mid / far]({url}) |')
rows+=['','## Native-speed motion','',f"[Combined 1080p30 motion tour]({urls['motionTour']})",'',
'Four valid realtime paths joined by hard cuts. Skyline/bridge back-facing motion and the aborted stale-receipt replacement are excluded. Native capture timestamps drive CFR encoding: original frames may be held or dropped; no interpolation, image resizing or fixed simulation stepping. GPU readback/write gaps are disclosed below. The original retained motion window also overlapped a peer compiler from09:52:09 to09:52:21; no zero-CPU claim is made. This publication does not certify continuous temporal shimmer.', '', '| Path | 1080p30 clip | Receipt | Samples / maximum gap |','|---|---|---|']
for motion in manifest['motion']:
 name=motion['file'];url=f'{base}/world/{name}';receipt=f"{base}/world/{motion['receipt']}";urls['motion'][name]={'mp4':url,'receipt':receipt,'timing':motion['timing']};rows.append(f"| {name} | [MP4]({url}) | [JSON]({receipt}) | {motion['timing']['frames']} / {motion['timing']['maxGapMs']:.1f} ms |")
rows+=['','Verification, default pnpm test 13/13, import/cache comparison and exact owned-engine stop receipts are under `proof/`. No lightmap bake was performed. Published receipt hashes use the exact Git/raw HTTP bytes.']
(dest/'README.md').write_text('\n'.join(rows)+'\n',encoding='utf-8',newline='\n')
(dest/'urls.json').write_text(json.dumps(urls,indent=2)+'\n',encoding='utf-8',newline='\n')
(root/'published-urls.json').write_text(json.dumps(urls,indent=2)+'\n',encoding='utf-8',newline='\n')
print(revision)
