# billwear.github.io — minimal, fully-transparent starter

this is a bare-bones github pages site using jekyll with **no external theme**,
so you can see everything end-to-end.

## quickstart (fresh repo)

1) create a repo named `billwear.github.io` (public).
2) push these files to the default branch (usually `main`).
3) settings -> pages -> build and deployment:
   - source: `deploy from a branch`
   - branch: `main`, folder: `/` (root)
4) wait for the build (a minute or two), then visit:
   https://billwear.github.io

## local dev (optional but recommended)

- install ruby (3.x) and bundler.
- run:

```bash
bundle install
bundle exec jekyll serve --livereload
# open http://127.0.0.1:4000
```

## how this works

- github pages runs jekyll on your repo and serves the generated `_site` folder.
- pages ignores directories that start with `_` except for jekyll's special folders.
- urls map to files:
  - `/` -> `index.md` rendered via `_layouts/default.html`
  - `/about/` -> `about.md` (permalink via front matter)
  - `/blog/first-post/` -> `_posts/2025-10-20-first-post.md`

## where to change things

- site config: `_config.yml`
- default html shell: `_layouts/default.html`
- head meta, css link, and fonts: `_includes/head.html`
- global styles: `assets/css/main.css`
- home page: `index.md`
- an example page: `about.md`
- a sample post: `_posts/2025-10-20-first-post.md`

## deploy flow in plain english

1) you push to `main`.
2) pages runs jekyll using `_config.yml` and your files.
3) jekyll parses front matter, applies layouts, and writes html into `_site/`.
4) pages serves `_site/` at billwear.github.io.

## custom domain (later)

- buy a domain and add a `CNAME` record pointing to `billwear.github.io`.
- create a file `CNAME` at the repo root with your domain (single line).
- enable https in settings -> pages.

## troubleshooting

- site 404s: confirm repo name is `billwear.github.io` and pages is enabled.
- css not loading: check `<link>` path in `_includes/head.html` matches `assets/css/main.css`.
- layout not applied: ensure front matter has `layout: default` at the top of each page.
