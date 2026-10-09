# amyrouge.github.io

Personal portfolio for **Akeshi Dewmini**, Software Engineer. Plain HTML, CSS and a little JavaScript, hosted free on GitHub Pages at <https://amyrouge.github.io>.

## Edit the content

`index.html` is generated. Edit `tools/index.src.html`, then rebuild:

```bash
python tools/build.py
```

`{{i:react}}` tokens in the template become inline brand icons (Simple Icons, paths in `tools/icons.json`). Styles are in `styles.css`, behaviour in `script.js`.

## Preview locally

```bash
python -m http.server 8000   # then open http://localhost:8000
```

## Deploy

Repo name must be `AmyRouge.github.io`. Settings, Pages, Source: *Deploy from a branch*, `main` / `(root)`.
