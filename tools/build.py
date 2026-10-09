"""Builds index.html from tools/index.src.html by inlining Simple Icons glyphs.
Usage:  python tools/build.py
Tokens in the template:  {{i:react}}  ->  inline brand-coloured SVG icon
"""
import json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, '..')
ICONS = json.load(open(os.path.join(HERE, 'icons.json'), encoding='utf-8'))


def colour(hexcol):
    r, g, b = (int(hexcol[i:i + 2], 16) for i in (0, 2, 4))
    return '#e7e9f5' if 0.2126 * r + 0.7152 * g + 0.0722 * b < 60 else '#' + hexcol


def icon(m):
    slug = m.group(1)
    ic = ICONS[slug]
    return (f'<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" focusable="false">'
            f'<path fill="{colour(ic["hex"])}" d="{ic["path"]}"/></svg>')


src = open(os.path.join(HERE, 'index.src.html'), encoding='utf-8').read()
out = re.sub(r'\{\{i:([a-z0-9]+)\}\}', icon, src)
assert '{{' not in out, 'unresolved token'
open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf-8').write(out)
print('index.html', len(out) // 1024, 'KB')
