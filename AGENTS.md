# Repository Guidelines

## Project Structure & Module Organization
- Root: `index.html`, `blog.html`, `style.css`, `script.js`.
- Content: Markdown posts in `posts/` with YAML front matter.
- Data: `data/posts.json` (post slugs list), other CSV/JSON assets under `data/`.
- Assets: images in `images/`, icons like `favicon.ico`. GitHub Pages uses `.nojekyll` (no build step).

## Build, Test, and Development Commands
- Serve locally: `python3 -m http.server 8000` (from repo root), then visit `http://localhost:8000/`.
- Blog view: `http://localhost:8000/blog.html` or `.../blog.html?slug=<post-slug>`.
- No build tooling or package manager is required; this is a static site.

## Coding Style & Naming Conventions
- HTML/CSS/JS: keep existing style—HTML/CSS indented with 4 spaces; JS with 2 spaces, semicolons, single quotes.
- Filenames: lowercase with hyphens (e.g., `future-belongs-to-builders.md`).
- Posts: include YAML front matter with `title`, `date` (ISO, e.g., `2025-05-20`), and optional `excerpt`.
- Paths: reference assets relative to site root (e.g., `/images/...`, `/posts/<slug>.md`).

## Testing Guidelines
- Manual smoke test: load `index.html` and `blog.html`; check browser console has no errors.
- Blog list: ensure `data/posts.json` lists slugs; each `posts/<slug>.md` loads and renders.
- Post pages: verify title, date, and content render; Markdown is sanitized via DOMPurify.

## Commit & Pull Request Guidelines
- Commits: use clear, imperative subjects (e.g., "Add post: future-belongs-to-builders"); group related changes.
- PRs: include a concise description, before/after screenshots for visual changes, and reference issues when applicable.
- Scope: keep PRs small and focused (content vs. styling vs. scripts).

## Adding or Updating Blog Posts
- Create `posts/<slug>.md` with front matter:
  ---
  title: "My Title"
  date: 2025-05-20
  excerpt: "one-line summary"
  ---
- Append `<slug>` to `data/posts.json` (array order controls list order by date fallback).
- Test locally at `/blog.html?slug=<slug>`.
