import json,hashlib,concurrent.futures,urllib.request,subprocess,time
from pathlib import Path
root=Path(__file__).resolve().parent
repo=Path('../street-prop-textures-20261007/artifacts/prop-review/evidence/repo').resolve();prefix='2026-10-07/combat-material-textures-b'
revision=json.loads((root/'published-urls.json').read_text())['evidenceCommit']
files=subprocess.check_output(['git','-C',str(repo),'ls-tree','-r','--name-only',revision,'--',prefix]).decode().splitlines()
def verify(name):
 local=repo/name;expected=hashlib.sha256(local.read_bytes()).hexdigest()
 url=f'https://raw.githubusercontent.com/KamranAsif/godmode-evidence/{revision}/{name}'
 for attempt in range(4):
  try:
   h=hashlib.sha256();length=0
   with urllib.request.urlopen(url,timeout=90) as r:
    while chunk:=r.read(1024*1024):h.update(chunk);length+=len(chunk)
   actual=h.hexdigest();assert actual==expected,(name,expected,actual)
   return {'file':name,'bytes':length,'sha256':actual,'rawUrl':url}
  except Exception:
   if attempt==3:raise
   time.sleep(2*(attempt+1))
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:results=list(pool.map(verify,files))
(root/'raw-http-verification.json').write_text(json.dumps({'revision':revision,'allExactRawBytes':True,'files':results},indent=2)+'\n',encoding='utf-8',newline='\n')
print('Verified',len(results),'files',sum(r['bytes'] for r in results),'exact raw HTTP bytes',flush=True)
