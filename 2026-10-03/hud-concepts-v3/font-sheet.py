from pathlib import Path
import urllib.request, hashlib, json
from PIL import Image,ImageDraw,ImageFont
root=Path(r"D:/work/godmode-roguelite-worktrees/hud-poc-20261003/artifacts/hud-concepts-v3")
root.mkdir(parents=True,exist_ok=True)
specs=[
("hud","Rajdhani","https://github.com/google/fonts/tree/main/ofl/rajdhani",{"Rajdhani-Regular.ttf":"https://raw.githubusercontent.com/google/fonts/main/ofl/rajdhani/Rajdhani-Regular.ttf","Rajdhani-SemiBold.ttf":"https://raw.githubusercontent.com/google/fonts/main/ofl/rajdhani/Rajdhani-SemiBold.ttf","Rajdhani-Bold.ttf":"https://raw.githubusercontent.com/google/fonts/main/ofl/rajdhani/Rajdhani-Bold.ttf","OFL.txt":"https://raw.githubusercontent.com/google/fonts/main/ofl/rajdhani/OFL.txt"}),
("chat","Inter","https://github.com/google/fonts/tree/main/ofl/inter",{"Inter-Variable.ttf":"https://raw.githubusercontent.com/google/fonts/main/ofl/inter/Inter%5Bopsz%2Cwght%5D.ttf","OFL.txt":"https://raw.githubusercontent.com/google/fonts/main/ofl/inter/OFL.txt"}),
("cheat","JetBrains Mono","https://www.jetbrains.com/lp/mono/",{"JetBrainsMono-Regular.ttf":"https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/fonts/ttf/JetBrainsMono-Regular.ttf","JetBrainsMono-Bold.ttf":"https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/fonts/ttf/JetBrainsMono-Bold.ttf","OFL.txt":"https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/OFL.txt"})]
manifest=[]
for layer,name,source,files in specs:
    folder=root/"fonts"/layer;folder.mkdir(parents=True,exist_ok=True)
    for filename,url in files.items():
        dest=folder/filename
        urllib.request.urlretrieve(url,dest)
        manifest.append(dict(layer=layer,family=name,filename=str(dest.relative_to(root)),source=source,download=url,licence="SIL Open Font License 1.1",sha256=hashlib.sha256(dest.read_bytes()).hexdigest()))
(root/"font-sources.json").write_text(json.dumps(manifest,indent=2),encoding="utf-8")
im=Image.new("RGB",(1920,1080),"#eef0f1");d=ImageDraw.Draw(im)
fonts=[root/"fonts/hud/Rajdhani-SemiBold.ttf",root/"fonts/chat/Inter-Variable.ttf",root/"fonts/cheat/JetBrainsMono-Regular.ttf"]
for i,(p,title,sample) in enumerate(zip(fonts,["GAME HUD — Rajdhani","STREAM CHAT — Inter","CHEAT ENGINE — JetBrains Mono"],["08 / 120   KILLS   AIRSTRIKE READY","Mint: nice shot!   Quay: reload!","$ inject --module drone   [ACTIVE]"])):
    y=45+i*345
    dark=i==2
    bg="#111415" if dark else ("#d6dce0" if i==0 else "#c3c9ce")
    fg="#e6edf7" if dark else "#14202b"
    d.rounded_rectangle((40,y,1880,y+305),radius=8,fill=bg)
    font=ImageFont.truetype(str(p),56)
    big=ImageFont.truetype(str(p),64)
    small=ImageFont.truetype(str(p),30)
    d.text((80,y+30),title,font=font,fill="#a6f040" if dark else fg)
    d.text((80,y+123),sample,font=big,fill=fg)
    d.text((80,y+240),"SIL OFL 1.1  |  Free commercial use & redistribution",font=small,fill=fg)
im.save(root/"three-fonts.png")
print("Downloaded",len(manifest),"font/licence files. Specimen rendered using actual font binaries.")

