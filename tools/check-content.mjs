/* Checks the built site still says everything the old site said.
   Reads tools/facts.json and searches the text of every page in _site.
   Exit code 1 if a fact is missing or a forbidden string shows up. */
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const facts = JSON.parse(await readFile('tools/facts.json', 'utf8'));
const files = [];
const walk = async (d) => {
  for (const e of await readdir(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) await walk(p);
    else if (e.name.endsWith('.html')) files.push(p);
  }
};
await walk('_site');
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#39;|&rsquo;/g, '’').replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ');
let all = '';
for (const f of files) {
  const html = await readFile(f, 'utf8');
  all += ' ' + decode(html.replace(/<script(?![^>]*ld\+json)[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
  all += ' ' + (html.match(/href="[^"]+"/g) || []).join(' ');
}
const lower = all.toLowerCase();
const missing = facts.must.filter((f) => !lower.includes(f.toLowerCase()));
const found = facts.forbid.filter((f) => new RegExp(`\\b${f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(all));
console.log(`${files.length} pages, ${facts.must.length - missing.length}/${facts.must.length} facts present`);
if (missing.length) console.log('Missing:\n  ' + missing.join('\n  '));
if (found.length) console.log('Forbidden strings found:\n  ' + found.join('\n  '));
process.exit(missing.length || found.length ? 1 : 0);
