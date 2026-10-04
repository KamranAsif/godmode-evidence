import json,csv,hashlib,math
from PIL import Image,ImageDraw,ImageFont
from pathlib import Path
src=Path('artifacts/assault-hd-clay');root=Path('artifacts/evidence-clay/2026-10-04/assault-hd-clay');font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',24);small=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',16)
manual=set(range(34,56));flags=json.loads((root/'problem-frames.json').read_text()); prior=set(flags['reload']['flaggedFrames']); allflags=sorted(prior|manual);flags['reload']['flaggedFrames']=allflags;flags['reload']['visualCuffPinchFrames']=list(range(34,56))
ranges=[]
for f in allflags:
 if ranges and f==ranges[-1][-1]+1:ranges[-1].append(f)
 else:ranges.append([f])
flags['reload']['flaggedRanges']=', '.join(f'{r[0]:04d}'+(f'-{r[-1]:04d}' if len(r)>1 else '') for r in ranges)
(root/'problem-frames.json').write_text(json.dumps(flags,indent=2)+'\n');rows=list(csv.DictReader((root/'joint-metrics.csv').open()));by={int(r['frame']):r for r in rows if r['clip']=='reload'}
for r in rows:
 if r['clip']=='reload' and int(r['frame']) in manual:r['flag']+='; Left wrist cuff pinch (visual)' if r['flag'] else 'Left wrist cuff pinch (visual)'
with (root/'joint-metrics.csv').open('w',newline='') as file:
 w=csv.DictWriter(file,fieldnames=rows[0].keys());w.writeheader();w.writerows(rows)
manifest=json.loads((root/'frames-manifest.json').read_text())
for camera in ['first-person','side']:
 cellh=300 if camera=='first-person' else 420;sheet=Image.new('RGB',(1920,math.ceil(100/4)*cellh),(28,28,28));sd=ImageDraw.Draw(sheet)
 for i in range(100):
  file=root/'reload'/camera/f'frame-{i:04d}.png';im=Image.open(file).convert('RGB')
  if i in manual-prior:
   d=ImageDraw.Draw(im);d.rectangle((0,1036,1920,1080),fill=(130,18,18));d.text((12,1045),'FLAG: Left wrist cuff pinch (visual) | procedural wrist bend / roll',fill='white',font=font);im.save(file)
  for r in manifest:
   if r['clip']=='reload' and r['camera']==camera and r['frame']==i:r['flag']=by[i]['flag'];r['sha256']=hashlib.sha256(file.read_bytes()).hexdigest()
  thumb=im.crop((450,0,1450,950)) if camera=='side' else im;thumb.thumbnail((480,cellh-30));x=i%4*480;y=i//4*cellh;sheet.paste(thumb,(x,y));bad=i in allflags;sd.rectangle((x,y,x+478,y+cellh-2),outline=(220,45,45) if bad else (75,75,75),width=3);sd.text((x+8,y+cellh-26),f'{i:04d} | {i/30:.3f}s'+(' | FLAG' if bad else ''),fill=(255,90,90) if bad else 'white',font=small)
 sheet.save(root/'reload'/f'{camera}-contact-sheet.png')
(root/'frames-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
for r in manifest:
 file=root/r['path'];assert Image.open(file).size==(1920,1080);assert hashlib.sha256(file.read_bytes()).hexdigest()==r['sha256']
print('Validated',len(manifest),'full-resolution frames; reload flags',flags['reload']['flaggedRanges'])
# Preserve the packaging recipe and all immutable records, avoid absolute local paths in public receipts.
recipe=root/'recipe';(recipe/'package-review.py').write_text((src/'package-review.py').read_text());records=json.loads((root/'receipts.json').read_text())
for r in records:
 if 'output' in r:r['output']=r['output'].split('artifacts/assault-hd-clay/',1)[-1]
(root/'receipts.json').write_text(json.dumps(records,separators=(',',':'))+'\n')
print('PNG bytes',sum(f.stat().st_size for f in root.rglob('*.png')))
