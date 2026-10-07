import json, hashlib, statistics, subprocess, sys, shutil
from pathlib import Path
from PIL import Image, ImageDraw
import imageio_ffmpeg

root=Path(__file__).resolve().parent
dest=root/'publish-accepted'
dest.mkdir(exist_ok=True)
(dest/'.gdignore').write_text('')
ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def dump(p,data):p.write_text(json.dumps(data,indent=2)+'\n',encoding='utf-8',newline='\n')

# Restore untouched valid road capture; replacement terminated before finishing after
# an existing receipt was mistakenly treated as completion. Originals remain preserved.
original=root/'excluded-backface-coverage'/'tour-painted-road-contact'
shutil.copytree(original,root/'output'/'tour-painted-road-contact',dirs_exist_ok=True)
prior=json.loads((root/'publish'/'world'/'manifest.json').read_text())
paint=next(m for m in prior['motion'] if m['file']=='tour-painted-road-contact.mp4')
dump(root/'output'/'painted-road-contact-stage.json',paint['stage'])
for batch,folder in [('world',root/'output')]:
 target=dest/batch;target.mkdir(exist_ok=True)
 assets=json.loads((folder/'asset-manifest.json').read_text())
 manifest={'source':json.loads((folder/'batch-source.json').read_text()),'assets':[], 'streetViews':[], 'motion':[],'excluded':json.loads((folder/'excluded-assets.json').read_text()),'review':'Kamran reviews appearance and continuous temporal stability; no auditor verdict claimed.'}
 tiles=[]
 for asset in assets:
  name=asset['id'];sheet=Image.new('RGB',(5760,1130),(24,26,30));draw=ImageDraw.Draw(sheet);sources=[]
  for i,range_ in enumerate(['close','mid','far']):
   p=folder/f'asset-{name}-{range_}.png'
   with Image.open(p) as im:
    assert im.size==(1920,1080)
    sheet.paste(im.convert('RGB'),(1920*i,50))
   draw.text((1920*i+16,14),f'{name} | {range_} | native 1920x1080 pixels',(240,240,240))
   sources.append({'file':p.name,'sha256':sha(p),'capture':json.loads((folder/f'asset-{name}-{range_}-capture.json').read_text())})
  output=target/f'{name}-close-mid-far.png';sheet.save(output,compress_level=3)
  preview=sheet.copy();preview.thumbnail((640,126));tiles.append((name,preview))
  manifest['assets'].append({'asset':asset,'contactSheet':output.name,'sha256':sha(output),'composition':'Three unchanged native-resolution panels; 50px label strip added above.','sources':sources,'stage':json.loads((folder/f'asset-{name}.json').read_text())})
 overview=Image.new('RGB',(1920,((len(tiles)+2)//3)*154),(24,26,30));draw=ImageDraw.Draw(overview)
 for i,(name,tile) in enumerate(tiles):
  x=(i%3)*640;y=(i//3)*154;draw.text((x+5,y+5),name,(240,240,240));overview.paste(tile,(x,y+25))
 overview.save(target/'contact-sheet-index.jpg',quality=92)
 sections=[]
 for view in json.loads((folder/'street-views.json').read_text()):
  name=view['id'];p=folder/f'{name}.png';shutil.copyfile(p,target/p.name)
  manifest['streetViews'].append({'file':p.name,'sha256':sha(p),'pose':view,'capture':json.loads((folder/f'{name}-capture.json').read_text()),'inventory':json.loads((folder/f'{name}-inventory.json').read_text())})
 for path in json.loads((folder/'motion-paths.json').read_text()):
  name=path['id'];motion=folder/f'tour-{name}';receipt=json.loads((motion/'receipt.json').read_text());frames=receipt['frames'];entries=['ffconcat version 1.0'];gaps=[]
  for i,f in enumerate(frames):
   raw=motion/f'frame-{i:04d}.rgba';data=raw.read_bytes();assert len(data)==1920*1080*4
   png=motion/f'frame-{i:04d}.png'
   Image.frombytes('RGBA',(1920,1080),data).convert('RGB').save(png,compress_level=1)
   f['rawSha256']=hashlib.sha256(data).hexdigest()
   duration=frames[i+1]['seconds']-f['seconds'] if i+1<len(frames) else max(.001,receipt['elapsedSeconds']-f['seconds'])
   gaps.append(duration*1000);entries += [f"file '{png.as_posix()}'",'option framerate 1000',f'duration {duration:.6f}']
  listing=motion/'frames.ffconcat';listing.write_text('\n'.join(entries)+'\n')
  video=target/f'tour-{name}.mp4'
  cmd=[ffmpeg,'-hide_banner','-loglevel','error','-y','-f','concat','-safe','0','-i',str(listing),'-vf','fps=30','-c:v','libx264','-threads','2','-preset','fast','-crf','15','-pix_fmt','yuv420p','-movflags','+faststart',str(video)]
  subprocess.run(cmd,check=True)
  receipt['encoding']={'dimensions':[1920,1080],'fps':30,'sha256':sha(video),'nativeSpeed':True,'interpolation':False,'note':'Measured realtime capture timestamps retained; CFR output holds or drops native frames. No synthesized motion or resizing.','command':cmd}
  receipt['timing']={'frames':len(frames),'meanGapMs':statistics.mean(gaps),'maxGapMs':max(gaps)}
  dump(target/f'tour-{name}.json',receipt);manifest['motion'].append({'file':video.name,'sha256':sha(video),'receipt':f'tour-{name}.json','timing':receipt['timing'],'stage':json.loads((folder/f'{name}-stage.json').read_text())});sections.append(video)
  print(batch,name,'encoded',receipt['timing'],flush=True)
 listing=target/'tour-sections.ffconcat';listing.write_text('ffconcat version 1.0\n'+'\n'.join(f"file '{v.name}'" for v in sections)+'\n')
 tour=target/'motion-tour-1080p30.mp4'
 subprocess.run([ffmpeg,'-hide_banner','-loglevel','error','-y','-f','concat','-safe','0','-i',str(listing),'-c','copy','-movflags','+faststart',str(tour)],check=True)
 manifest['combinedTour']={'file':tour.name,'sha256':sha(tour),'sections':[v.name for v in sections],'nativeSpeed':True,'continuousCamera':False,'note':'Four valid realtime world/material paths joined by hard cuts; complete originals included. Skyline/bridge back-facing paths and aborted replacement are excluded.'}
 for name in ['launch','stop','launch-native-coverage','stop-native-coverage','launch-resume','stop-resume','launch-magazine-final','stop-magazine-final','logs','batch-source','peers-before','peers-before-resume','prop-locations','motion-paths','excluded-assets']:
  if (folder/f'{name}.json').exists(): shutil.copyfile(folder/f'{name}.json',target/f'{name}.json')
 dump(target/'manifest.json',manifest)
 print(batch,len(assets),'sheets packaged',flush=True)

for p in root.glob('*'):
 if p.is_file() and p.suffix in ['.ts','.gd','.tscn','.mjs','.py','.json']:
  shutil.copyfile(p,dest/p.name)
