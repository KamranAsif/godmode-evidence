from pathlib import Path
import json, subprocess
root=Path(__file__).resolve().parent
repo=Path('../street-prop-textures-20261007/artifacts/prop-review/evidence/repo').resolve()
prefix='2026-10-07/combat-material-textures-b';dest=repo/prefix
revision=subprocess.check_output(['git','-C',str(repo),'rev-parse','HEAD']).decode().strip()
base=f'https://raw.githubusercontent.com/KamranAsif/godmode-evidence/{revision}/{prefix}'
manifest=json.loads((dest/'combat/manifest.json').read_text())
urls={'evidenceCommit':revision,'source':manifest['source'],'manifest':f'{base}/combat/manifest.json','contactIndex':f'{base}/combat/contact-sheet-index.jpg','motionTour':f'{base}/combat/motion-tour-1080p30.mp4','assets':{},'streets':{},'motion':{}}
rows=['# Combat material texture batch, B strength','', 'Stacked on draft #1011, which stacks on #1010. Kamran reviews the appearance and continuous playback before any merge. No auditor or temporal PASS is claimed.', '',
'42 close/mid/far checks: 36 combat, weapon/magazine and ground presentation checks plus six earlier B assets for context. Magazine focus views reuse the two native gun assets; support variants share their original airframes. AC-130 is an existing authored asset shown for material review: the current ride still uses its gunner view, with no new gameplay airframe added.', '',
'Each sheet contains three unscaled native 1920x1080 panels and a 50px label strip. Gallery models use actual production factories/materials, at their original scale. The floor follows each model lower bound; these are isolated gallery material views, not matched production lightmap or collision proofs. Ground sheets are rigidly translated, unedited triangle samples of native manhole/grate/casting/leaf batches; provenance is in the manifest.', '',
'New unchanged CC0 fabric maps: [Poly Haven Book Pattern](https://polyhaven.com/a/book_pattern). Authored body atlases, normal maps, roughness/metal channels, friendly paint and signal surfaces remain in use. A warm-colour skin mask and olive dog-vest mask keep grain targeted; these heuristics are tunable. Skinned grain follows authored UVs rather than swimming world coordinates. Facets, rigs, gameplay, hit/death state and approved phone pose are not changed.', '',
'The earlier gallery-floor warmup is excluded. The final batch resumed after discovering that the conditional casting mesh is absent in this production map; its exclusion is recorded, existing completed views retained, with no per-asset visual audit loops. Hidden magazine mesh ancestors were masked by render layer in the fixture; corrected two magazine sheets and their motion section supersede excluded blank attempts. Only the complete submitted batch is linked here.', '',
'## Six street views','', '| View | Raw native PNG |','|---|---|']
for street in manifest['streetViews']:
 url=f"{base}/combat/{street['file']}";urls['streets'][street['file']]=url;rows.append(f"| {street['file']} | [raw PNG]({url}) |")
rows+=['','## Close / mid / far checks','',f"[Overview]({urls['contactIndex']}) | [Native dimensions, poses, material names and hashes]({urls['manifest']})",'', '| Asset / presentation | Raw native sheet |','|---|---|']
for asset in manifest['assets']:
 name=asset['asset']['id'];url=f"{base}/combat/{asset['contactSheet']}";urls['assets'][name]=url;rows.append(f'| {name} | [close / mid / far]({url}) |')
rows+=['','## Native-speed motion','',f"[Combined 1080p30 motion tour]({urls['motionTour']})",'',
'Six real-time actor/material paths joined with hard cuts. CFR encoding holds or drops native captured frames using measured timestamps; no synthetic interpolation, resampling or fixed simulation stepping. The dog-run filename uses the original Walk clip at a 2m/s fixture input; it is not a new authored run animation. Readback/write stalls limit continuous smoothness and are disclosed below. This evidence supports Kamran review and does not certify shimmer.', '', '| Path | Original 1080p30 clip | Timing receipt | Native samples / maximum gap |','|---|---|---|']
for motion in manifest['motion']:
 name=motion['file'];url=f'{base}/combat/{name}';receipt=f"{base}/combat/{motion['receipt']}";urls['motion'][name]={'mp4':url,'receipt':receipt,'timing':motion['timing']};rows.append(f"| {name} | [MP4]({url}) | [JSON]({receipt}) | {motion['timing']['frames']} / {motion['timing']['maxGapMs']:.1f} ms |")
rows+=['','Verification and exact owned-engine stop receipts are under `proof/`. Production build/format/lint, focused units and headless smoke results are recorded there. All receipt hashes use exact published LF bytes. No lightmap bake was performed.']
(dest/'README.md').write_text('\n'.join(rows)+'\n',encoding='utf-8',newline='\n')
(dest/'urls.json').write_text(json.dumps(urls,indent=2)+'\n',encoding='utf-8',newline='\n')
(root/'published-urls.json').write_text(json.dumps(urls,indent=2)+'\n',encoding='utf-8',newline='\n')
print(revision)
