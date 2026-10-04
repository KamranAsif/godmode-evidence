from pathlib import Path
import json, hashlib, shutil
from PIL import Image, ImageDraw

root=Path('D:/work/Godmode.exe-art-source-worktrees/placeholder-models/derived/hud/placeholder-icons-20261004')
root.mkdir(parents=True,exist_ok=True)
approvals=json.loads(Path('D:/work/Godmode.exe-art-source-worktrees/placeholder-models/image-source/builtin/placeholder-replacement-concepts-20261004/approvals.json').read_text())
# Vector reconstruction of the approved silhouettes; no generated gradient or baked hue.
cross=[(106,73),(116,63),(140,63),(150,73),(150,106),(183,106),(193,116),(193,140),(183,150),(150,150),(150,183),(140,193),(116,193),(106,183),(106,150),(73,150),(63,140),(63,116),(73,106),(106,106)]
medic=[cross,[(40,68),(111,33),(111,45),(50,75),(50,183),(128,226),(206,183),(206,75),(145,45),(145,33),(216,68),(216,189),(128,239),(40,189)]]
officer=[[(76,83),(128,43),(180,83),(180,112),(128,72),(76,112)],[(76,139),(128,99),(180,139),(180,168),(128,128),(76,168)],[(38,63),(62,45),(62,58),(49,69),(49,166),(62,176),(62,189),(38,173)],[(218,63),(194,45),(194,58),(207,69),(207,166),(194,176),(194,189),(218,173)],[(114,182),(142,182),(128,203)]]
records=[]
for asset,polys,tint in [('medic',medic,(158,255,168)),('officer',officer,(255,189,61))]:
    svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">'+''.join('<polygon fill="white" points="'+' '.join(f'{x},{y}' for x,y in poly)+'"/>' for poly in polys)+'</svg>\n'
    (root/f'{asset}.svg').write_text(svg)
    for size in [256,64,32]:
        k=size*4/256
        mask=Image.new('L',(size*4,size*4),0);draw=ImageDraw.Draw(mask)
        for poly in polys: draw.polygon([(round(x*k),round(y*k)) for x,y in poly],fill=255)
        alpha=mask.resize((size,size),Image.Resampling.LANCZOS)
        im=Image.new('RGBA',(size,size),(255,255,255,0));im.putalpha(alpha)
        im.save(root/f'{asset}-{size}.png')
    records.append({'asset':asset,'approvedConceptSha256':next(a['sha256'] for a in approvals if a['asset']==asset),'method':'Original SVG silhouette reconstruction of approved concept; 4x polygon rasterization with Lanczos alpha antialiasing.','sizes':[256,64,32],'format':'RGBA8 PNG; white RGB plus straight alpha, engine tint supplies colour.','recommendedTint':list(tint),'outline':'Use a charcoal shader outline at runtime if needed; not baked into the tint mask.','files':[{ 'path':p.name,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in sorted(root.glob(f'{asset}*'))]})
(root/'provenance.json').write_text(json.dumps(records,indent=2)+'\n')
# Review sheet includes literal small-size samples against light and dark backings.
sheet=Image.new('RGB',(960,540),(230,233,236));d=ImageDraw.Draw(sheet)
for row,(asset,tint) in enumerate([('medic',(158,255,168)),('officer',(255,189,61))]):
    for col,bg in enumerate([(238,241,244),(25,31,38)]):
        x=col*480;y=row*270;d.rectangle((x,y,x+479,y+269),fill=bg)
        d.text((x+18,y+12),f'{asset} / 128, 64, 32, 24 px',fill=(255,189,61) if col else (20,25,31))
        for ox,size in [(24,128),(185,64),(285,32),(365,24)]:
            alpha=Image.open(root/f'{asset}-256.png').getchannel('A').resize((size,size),Image.Resampling.LANCZOS)
            image=Image.new('RGBA',(size,size),tint+(0,));image.putalpha(alpha)
            sheet.paste(image,(x+ox,y+80),image)
sheet.save(root/'icon-review.png')
print('Prepared tint masks and review sheet:',root)
