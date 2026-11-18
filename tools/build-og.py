# Social share images (1200x630), one per page, in the site's own style.
# usage (after a build): python3 tools/build-og.py
import asyncio, json, html, pathlib
from playwright.async_api import async_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
rows = json.loads((ROOT / '_site/og-data.json').read_text())
logo = (ROOT / 'src/favicon.svg').read_text()
font = (ROOT / 'src/fonts/archivo.woff2').as_uri()
e = html.escape

def page(r):
    photo = ''
    if r.get('photo'):
        m = json.loads((ROOT / 'src/_data/images.json').read_text())[r['photo']]
        src = (ROOT / f"src/img/{r['photo']}-960.{m['fallback']}").as_uri()
        photo = f'<div class="ph"><img src="{src}"></div>'
    cells = ''.join(f'<div><span>{e(k)}</span><b>{e(v)}</b></div>' for k, v in r['cells'])
    return f'''<!doctype html><html><head><style>
@font-face {{ font-family: A; src: url({font}); font-weight: 400 800; font-stretch: 75% 125%; }}
* {{ box-sizing: border-box; margin: 0; }}
body {{ width: 1200px; height: 630px; background: #eef3f2; color: #10292c; font-family: A; display: grid;
  grid-template-columns: {'1fr 380px' if photo else '1fr'}; gap: 48px; padding: 56px 64px; }}
.l {{ display: flex; flex-direction: column; min-width: 0; }}
.logo svg {{ width: 80px; height: 64px; }}
h1 {{ font-stretch: 125%; font-weight: 760; font-size: {'92px' if len(r['h']) < 16 else '70px'}; line-height: .95; letter-spacing: -.035em; margin-top: 36px; }}
p {{ font-size: 30px; color: #4a6260; margin-top: 18px; line-height: 1.25; }}
.tb {{ margin-top: auto; display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; border: 2px solid #10292c; background: #f8fbfa; }}
.tb div {{ padding: 14px 18px 18px; outline: 1px solid #10292c; display: flex; flex-direction: column; gap: 4px; min-width: 0; }}
.tb span {{ font-stretch: 82%; font-size: 18px; color: #4a6260; }}
.tb b {{ font-stretch: 85%; font-size: 24px; line-height: 1.2; }}
.ph {{ border: 2px solid #10292c; overflow: hidden; }}
.ph img {{ width: 100%; height: 100%; object-fit: cover; object-position: {'0 0' if r.get('photo','').startswith('vitals') else '50% 25%'}; }}
</style></head><body><div class="l"><div class="logo">{logo}</div><h1>{e(r['h'])}</h1><p>{e(r['s'])}</p><div class="tb">{cells}</div></div>{photo}</body></html>'''

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox', '--allow-file-access-from-files'])
        pg = await (await b.new_context(viewport={'width': 1200, 'height': 630})).new_page()
        for r in rows:
            f = ROOT / f"_site/og-{r['id']}.html"
            f.write_text(page(r))
            await pg.goto(f.as_uri(), wait_until='load')
            await pg.evaluate('document.fonts.ready')
            await pg.screenshot(path=str(ROOT / f"src/img/og/{r['id']}.png"))
            f.unlink()
        await b.close()
asyncio.run(main())
