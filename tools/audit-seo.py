# Quick SEO + link audit of _site. python3 -I tools/audit-seo.py
import re, os, html, json, sys
from html.parser import HTMLParser
ROOT, PREFIX = '_site', '/jc-portfolio-v2'
class P(HTMLParser):
    def __init__(s):
        super().__init__(); s.meta={}; s.links=[]; s.h=[]; s.imgs=[]; s.title=''; s._t=False; s.ld=[]; s._ld=False; s.canon=None; s.ids=set()
    def handle_starttag(s,t,a):
        a=dict(a)
        if 'id' in a: s.ids.add(a['id'])
        if t=='title': s._t=True
        if t=='meta': s.meta[a.get('name') or a.get('property')]=a.get('content')
        if t=='link' and a.get('rel')=='canonical': s.canon=a.get('href')
        if t in ('a','link') and a.get('href'): s.links.append(a['href'])
        if t in ('img','source'): s.links += [x.strip().split(' ')[0] for x in (a.get('srcset') or '').split(',') if x.strip()] + ([a['src']] if a.get('src') else [])
        if t=='img': s.imgs.append(a)
        if re.fullmatch(r'h[1-6]',t): s.h.append(int(t[1]))
        if t=='script' and a.get('type')=='application/ld+json': s._ld=True
    def handle_endtag(s,t):
        if t=='title': s._t=False
        if t=='script': s._ld=False
    def handle_data(s,d):
        if s._t: s.title+=d
        if s._ld: s.ld.append(d)
pages={}
for dp,_,fs in os.walk(ROOT):
    for f in fs:
        if f.endswith('.html'): pages[os.path.join(dp,f)]=open(os.path.join(dp,f)).read()
issues=[]; titles={}; descs={}
for path,src in sorted(pages.items()):
    p=P(); p.feed(src); u=path[len(ROOT):].replace('index.html','')
    t=html.unescape(p.title); d=p.meta.get('description') or ''
    titles.setdefault(t,[]).append(u); descs.setdefault(d,[]).append(u)
    if not (25<=len(t)<=65): issues.append(f'{u}: title {len(t)} chars "{t}"')
    if not (70<=len(d)<=165): issues.append(f'{u}: description {len(d)} chars')
    for k in ['og:title','og:description','og:image','og:url','twitter:card']:
        if not p.meta.get(k): issues.append(f'{u}: missing {k}')
    img=(p.meta.get('og:image') or '').replace('https://jc-portfolio.codes','')
    if img and not os.path.exists(ROOT+img[len(PREFIX):]): issues.append(f'{u}: og:image file missing {img}')
    if not p.canon: issues.append(f'{u}: no canonical')
    if p.h.count(1)!=1: issues.append(f'{u}: {p.h.count(1)} h1')
    for a,b in zip(p.h,p.h[1:]):
        if b>a+1: issues.append(f'{u}: heading skip h{a}->h{b}')
    for i in p.imgs:
        if i.get('alt') is None: issues.append(f'{u}: img without alt {i.get("src")}')
        if not i.get('width') and 'svg' not in (i.get('src') or ''): issues.append(f'{u}: img without size {i.get("src")}')
    for ld in p.ld:
        try: json.loads(ld)
        except Exception as e: issues.append(f'{u}: bad JSON-LD {e}')
    for l in p.links:
        if l.startswith(('http','mailto:','tel:','#','data:')): 
            if l.startswith('#') and len(l)>1 and l[1:] not in p.ids: issues.append(f'{u}: broken anchor {l}')
            continue
        if not l.startswith(PREFIX+'/'): issues.append(f'{u}: unprefixed link {l}'); continue
        q=l[len(PREFIX):].split('?')[0].split('#')[0]
        f=ROOT+q+('index.html' if q.endswith('/') else '')
        if not os.path.exists(f): issues.append(f'{u}: broken link {l}')
for t,us in titles.items():
    if len(us)>1: issues.append(f'duplicate title "{t}" on {us}')
for d,us in descs.items():
    if len(us)>1: issues.append(f'duplicate description on {us}')
print(f'{len(pages)} pages'); print('\n'.join(sorted(set(issues))) or 'no issues')
